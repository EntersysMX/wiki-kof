import { useEffect, useRef, useState } from 'react';

// Spring physics
const mk  = (v = 0) => ({ v, vel: 0 });
function spr(s, target, k = 0.07, d = 0.80) {
  s.vel = (s.vel + (target - s.v) * k) * d;
  s.v  += s.vel;
}

let _uid = 0;

/**
 * Mascota animada con spring physics.
 * Props:
 *   size     — ancho/alto en px (viewBox 506×500)
 *   barkTick — número que incrementa para disparar ladrido
 *   wagFast  — boolean, agita la cola rápido
 */
export default function Mascota({ size = 420, barkTick = 0, wagFast = false }) {
  // ID único por instancia (safe en StrictMode)
  const [uid] = useState(() => `mc${++_uid}`);

  // Referencia mutable al estado de la animación (no causa re-renders)
  const [anim] = useState(() => ({
    sp: {
      breath: mk(), bark: mk(), tail: mk(), browY: mk(),
      eL: mk(), eR: mk(), hRot: mk(), pX: mk(), pY: mk(),
      bodyX: mk(), bodyY: mk(), noseS: mk(1), collar: mk(),
    },
    t: 0, barkSeq: 0, barkTgt: 0, barkHold: 0,
    blinkTimer: 150 + Math.random() * 180, blinkF: 0, blinkDir: 0,
    glanceTimer: 200 + Math.random() * 260,
    glanceTgtX: 0, glanceTgtY: 0, glanceHold: 0,
    rafId: null,
  }));

  // Disparar ladrido cuando barkTick incrementa
  useEffect(() => {
    if (barkTick > 0) anim.barkSeq = 1 + Math.floor(Math.random() * 2);
  }, [barkTick, anim]);

  // Ref para que el loop RAF lea el valor actualizado sin reiniciarse
  const wagFastRef = useRef(wagFast);
  useEffect(() => { wagFastRef.current = wagFast; }, [wagFast]);

  // Loop de animación
  useEffect(() => {
    const a  = anim;
    const $  = id => document.getElementById(`${uid}${id}`);

    function loop() {
      a.t++;
      const { sp, t } = a;

      const idleBreath = Math.sin(t * 0.022) * 2.5;
      const isBarking  = a.barkSeq > 0 || sp.bark.v > 0.1;
      const tailFreq   = isBarking ? 0.18 : wagFastRef.current ? 0.14 : 0.065;
      const idleTail   = -18 + Math.sin(t * tailFreq) * 22;
      const idleHRot   = Math.sin(t * 0.013) * 2.5;
      const bk         = sp.bark.v;
      const idleEL     = Math.sin(t * 0.038 + 1.0) * 5 - bk * 7;
      const idleER     = Math.sin(t * 0.038 + 2.6) * 5 + bk * 7;
      const idleBodyX  = Math.sin(t * 0.017 + 0.8) * 1.8;
      const idleBodyY  = Math.sin(t * 0.025 + 1.5) * 1.2;
      const idleNoseS  = 1 + Math.sin(t * 0.06 + 0.3) * 0.035;

      // Bark sequencer
      if (a.barkHold > 0) a.barkHold--;
      else if (a.barkSeq > 0) {
        if (a.barkTgt === 0) { a.barkTgt = 1; a.barkHold = 10; }
        else { a.barkTgt = 0; a.barkHold = 6; a.barkSeq--; }
      }

      // Blink
      if (a.blinkDir === 0) {
        if (--a.blinkTimer <= 0) { a.blinkDir = 1; a.blinkTimer = 120 + Math.random() * 220; }
      } else if (a.blinkDir === 1) {
        a.blinkF = Math.min(1, a.blinkF + 0.22);
        if (a.blinkF >= 1) a.blinkDir = -1;
      } else {
        a.blinkF = Math.max(0, a.blinkF - 0.16);
        if (a.blinkF <= 0) a.blinkDir = 0;
      }

      // Glance
      if (a.glanceHold > 0) a.glanceHold--;
      else if (--a.glanceTimer <= 0) {
        a.glanceTgtX = (Math.random() - 0.5) * 6;
        a.glanceTgtY = (Math.random() - 0.5) * 3;
        a.glanceHold = 50 + Math.random() * 70;
        a.glanceTimer = 160 + Math.random() * 260;
      }

      spr(sp.breath, idleBreath,            0.06, 0.86);
      spr(sp.bark,   a.barkTgt,             0.20, 0.62);
      spr(sp.tail,   idleTail,              0.04, 0.90);
      spr(sp.browY,  bk * -9 + Math.sin(t * 0.018), 0.09, 0.80);
      spr(sp.eL,     idleEL,                0.07, 0.78);
      spr(sp.eR,     idleER,                0.07, 0.78);
      spr(sp.hRot,   idleHRot + bk * 3,    0.03, 0.90);
      spr(sp.pX,     a.glanceTgtX,          0.09, 0.76);
      spr(sp.pY,     a.glanceTgtY,          0.09, 0.76);
      spr(sp.bodyX,  idleBodyX,             0.04, 0.92);
      spr(sp.bodyY,  idleBodyY,             0.04, 0.92);
      spr(sp.noseS,  idleNoseS,             0.06, 0.88);
      const idleCollar = Math.sin(t * 0.019 + 2.1) * 2.5 + (isBarking ? Math.sin(t * 0.14) * 14 : 0);
      spr(sp.collar, idleCollar,            0.05, 0.84);

      $('bodyGrp')?.setAttribute('transform', `translate(${sp.bodyX.v.toFixed(2)},${sp.bodyY.v.toFixed(2)})`);
      const ns = sp.noseS.v;
      $('nose')?.setAttribute('transform', `scale(${ns.toFixed(4)}) translate(${(260*(1-ns)).toFixed(2)},${(222*(1-ns)).toFixed(2)})`);
      $('head')?.setAttribute('transform', `translate(0,${(sp.breath.v + bk*7).toFixed(2)}) rotate(${sp.hRot.v.toFixed(2)},260,220)`);
      $('earL')?.setAttribute('transform', `rotate(${sp.eL.v.toFixed(2)},220,140)`);
      $('earR')?.setAttribute('transform', `rotate(${sp.eR.v.toFixed(2)},293,140)`);
      $('pupilL')?.setAttribute('transform', `translate(${sp.pX.v.toFixed(2)},${sp.pY.v.toFixed(2)})`);
      $('pupilR')?.setAttribute('transform', `translate(${sp.pX.v.toFixed(2)},${sp.pY.v.toFixed(2)})`);
      $('muzzle')?.setAttribute('ry', (46 + bk*14).toFixed(2));
      $('mouthClosed')?.setAttribute('opacity', Math.max(0, 1 - bk*3.5).toFixed(2));
      $('mouthOpen')?.setAttribute('opacity',   Math.min(1, Math.max(0, (bk-0.05)*2.2)).toFixed(2));
      const lidH = (a.blinkF * 37).toFixed(1);
      $('lidL')?.setAttribute('height', lidH);
      $('lidR')?.setAttribute('height', lidH);
      $('browL')?.setAttribute('transform', `translate(0,${sp.browY.v.toFixed(2)})`);
      $('browR')?.setAttribute('transform', `translate(0,${sp.browY.v.toFixed(2)})`);
      $('tail')?.setAttribute('transform', `rotate(${sp.tail.v.toFixed(2)},348,393)`);
      $('collar')?.setAttribute('transform', `rotate(${sp.collar.v.toFixed(2)},260,288)`);
      const ssc = 1 + sp.breath.v * 0.006;
      $('shadow')?.setAttribute('transform', `scale(${ssc.toFixed(4)},1) translate(${(-(ssc-1)*283).toFixed(2)},0)`);

      a.rafId = requestAnimationFrame(loop);
    }

    a.rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(a.rafId);
  }, [uid, anim]);

  const u = uid;
  const F = name => `url(#${u}${name})`;

  return (
    <svg viewBox="0 0 506 500" width={size} height={size}
      xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <radialGradient id={`${u}fur`} cx="40%" cy="30%" r="80%">
          <stop offset="0%"   stopColor="#ffffff"/>
          <stop offset="60%"  stopColor="#f4f5f3"/>
          <stop offset="100%" stopColor="#e6e8e4"/>
        </radialGradient>
        <radialGradient id={`${u}fur2`} cx="55%" cy="60%" r="90%">
          <stop offset="0%"   stopColor="#c8ccc6" stopOpacity="0.38"/>
          <stop offset="100%" stopColor="#c8ccc6" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id={`${u}pink`} cx="50%" cy="70%" r="80%">
          <stop offset="0%"   stopColor="#f8cfc7"/>
          <stop offset="100%" stopColor="#e8a8a0"/>
        </radialGradient>
        <radialGradient id={`${u}iris`} cx="38%" cy="32%" r="72%">
          <stop offset="0%"   stopColor="#7e5030"/>
          <stop offset="55%"  stopColor="#543018"/>
          <stop offset="100%" stopColor="#2c1408"/>
        </radialGradient>
        <radialGradient id={`${u}contact`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#8090a0" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#8090a0" stopOpacity="0"/>
        </radialGradient>
        <clipPath id={`${u}clipEyeL`}><circle cx="232" cy="163" r="18"/></clipPath>
        <clipPath id={`${u}clipEyeR`}><circle cx="288" cy="163" r="18"/></clipPath>
      </defs>

      {/* Shadow */}
      <ellipse id={`${u}shadow`} cx="283" cy="460" rx="72" ry="9" fill={F('contact')}/>

      {/* Tail */}
      <g id={`${u}tail`}>
        <path d="M 345,393 C 349,389 360,392 366,388 C 373,384 380,376 384,371 C 388,366 390,367 391,359 C 393,351 395,332 393,321 C 391,310 385,301 381,295 C 377,289 372,286 368,284 C 364,282 359,279 356,284 C 353,289 353,305 351,312 C 315,335 315,375 345,393 Z"
          fill={F('fur')} stroke="#b8bdb6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M 345,393 C 349,389 360,392 366,388 C 373,384 380,376 384,371 C 388,366 390,367 391,359 C 393,351 395,332 393,321 C 391,310 385,301 381,295 C 377,289 372,286 368,284 C 364,282 359,279 356,284 C 353,289 353,305 351,312 C 315,335 315,375 345,393 Z"
          fill={F('fur2')}/>
      </g>

      {/* Body Group */}
      <g id={`${u}bodyGrp`}>
        <path d="M 201,58 C 197,60 194,65 192,70 C 190,75 188,76 187,88 C 186,101 184,133 184,145 C 184,157 190,152 189,159 C 188,166 178,175 176,185 C 174,195 176,214 177,220 C 178,226 181,217 182,221 C 184,225 186,238 186,246 C 186,254 181,262 180,271 C 179,280 180,293 180,298 C 181,303 182,295 183,299 C 184,303 188,315 187,320 C 186,325 179,325 176,329 C 174,333 173,338 172,344 C 171,350 172,362 172,366 C 173,370 174,364 175,367 C 176,370 180,378 180,385 C 180,392 177,404 177,409 C 177,414 178,414 181,415 C 184,416 193,415 196,416 C 199,417 196,421 198,423 C 200,425 199,427 207,427 C 215,428 239,427 246,426 C 254,425 251,423 252,420 C 253,417 250,411 253,409 C 256,407 265,407 268,409 C 271,411 269,418 270,421 C 271,424 270,425 276,426 C 282,427 297,428 305,428 C 313,428 319,427 322,425 C 326,423 324,418 326,416 C 329,415 334,417 337,416 C 340,415 343,416 344,412 C 345,408 341,397 345,393 C 318,390 320,315 351,312 C 349,319 348,325 345,326 C 342,327 335,325 334,320 C 333,315 339,306 340,298 C 341,290 341,281 340,272 C 339,263 335,254 334,245 C 334,237 336,225 337,221 C 338,217 341,226 342,220 C 343,214 345,194 343,184 C 341,174 332,166 331,160 C 330,154 335,161 335,147 C 335,133 332,93 330,78 C 328,64 326,63 322,60 C 318,57 309,57 304,58 C 299,60 297,62 291,69 C 285,76 276,97 269,102 C 262,108 258,109 250,102 C 242,95 228,69 222,62 C 216,55 220,59 216,58 C 213,57 205,56 201,58 Z"
          fill={F('fur')} stroke="#b8bdb6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M 201,58 C 197,60 194,65 192,70 C 190,75 188,76 187,88 C 186,101 184,133 184,145 C 184,157 190,152 189,159 C 188,166 178,175 176,185 C 174,195 176,214 177,220 C 178,226 181,217 182,221 C 184,225 186,238 186,246 C 186,254 181,262 180,271 C 179,280 180,293 180,298 C 181,303 182,295 183,299 C 184,303 188,315 187,320 C 186,325 179,325 176,329 C 174,333 173,338 172,344 C 171,350 172,362 172,366 C 173,370 174,364 175,367 C 176,370 180,378 180,385 C 180,392 177,404 177,409 C 177,414 178,414 181,415 C 184,416 193,415 196,416 C 199,417 196,421 198,423 C 200,425 199,427 207,427 C 215,428 239,427 246,426 C 254,425 251,423 252,420 C 253,417 250,411 253,409 C 256,407 265,407 268,409 C 271,411 269,418 270,421 C 271,424 270,425 276,426 C 282,427 297,428 305,428 C 313,428 319,427 322,425 C 326,423 324,418 326,416 C 329,415 334,417 337,416 C 340,415 343,416 344,412 C 345,408 341,397 345,393 C 318,390 320,315 351,312 C 349,319 348,325 345,326 C 342,327 335,325 334,320 C 333,315 339,306 340,298 C 341,290 341,281 340,272 C 339,263 335,254 334,245 C 334,237 336,225 337,221 C 338,217 341,226 342,220 C 343,214 345,194 343,184 C 341,174 332,166 331,160 C 330,154 335,161 335,147 C 335,133 332,93 330,78 C 328,64 326,63 322,60 C 318,57 309,57 304,58 C 299,60 297,62 291,69 C 285,76 276,97 269,102 C 262,108 258,109 250,102 C 242,95 228,69 222,62 C 216,55 220,59 216,58 C 213,57 205,56 201,58 Z"
          fill={F('fur2')}/>

        {/* Fur texture */}
        <g fill="none" strokeLinecap="round">
          <g stroke="#8a9298" strokeWidth="1.4" opacity="0.70">
            <path d="M 188,158 C 184,162 182,167 184,171"/><path d="M 186,178 C 182,182 180,187 182,191"/>
            <path d="M 184,200 C 180,204 178,209 180,213"/><path d="M 182,222 C 178,226 176,231 178,235"/>
            <path d="M 180,245 C 176,250 174,254 176,258"/><path d="M 179,266 C 175,271 173,276 175,280"/>
            <path d="M 178,288 C 174,293 172,298 174,302"/><path d="M 177,312 C 173,317 171,322 173,326"/>
            <path d="M 176,334 C 172,339 170,344 172,348"/><path d="M 175,355 C 171,360 169,365 171,369"/>
            <path d="M 175,374 C 171,379 169,384 171,388"/><path d="M 176,393 C 172,398 170,403 172,407"/>
          </g>
          <g stroke="#8a9298" strokeWidth="1.4" opacity="0.70">
            <path d="M 325,158 C 329,162 331,167 329,171"/><path d="M 327,178 C 331,182 333,187 331,191"/>
            <path d="M 329,200 C 333,204 335,209 333,213"/><path d="M 331,222 C 335,226 337,231 335,235"/>
            <path d="M 332,245 C 336,250 338,254 336,258"/><path d="M 333,266 C 337,271 339,276 337,280"/>
            <path d="M 334,288 C 338,293 340,298 338,302"/><path d="M 335,312 C 339,317 341,322 339,326"/>
            <path d="M 336,334 C 340,339 342,344 340,348"/><path d="M 338,355 C 342,360 344,365 342,369"/>
            <path d="M 340,374 C 344,379 346,384 344,388"/><path d="M 339,393 C 343,398 345,403 343,407"/>
          </g>
          <g stroke="#9aa2aa" strokeWidth="1.2" opacity="0.65">
            <path d="M 193,360 C 191,364 190,369 192,373"/><path d="M 195,378 C 193,382 192,387 194,391"/>
            <path d="M 198,394 C 196,398 195,403 197,407"/><path d="M 202,410 C 200,414 200,418 202,420"/>
          </g>
          <g stroke="#9aa2aa" strokeWidth="1.2" opacity="0.65">
            <path d="M 318,360 C 320,364 321,369 319,373"/><path d="M 316,378 C 318,382 319,387 317,391"/>
            <path d="M 313,394 C 315,398 316,403 314,407"/><path d="M 309,410 C 311,414 311,418 309,420"/>
          </g>
          <g stroke="#b0b8c0" strokeWidth="1.2" opacity="0.55">
            <path d="M 215,342 C 213,347 213,352 215,355"/><path d="M 222,358 C 220,363 220,368 222,371"/>
            <path d="M 230,372 C 228,377 228,382 230,385"/><path d="M 280,372 C 282,377 282,382 280,385"/>
            <path d="M 288,358 C 290,363 290,368 288,371"/><path d="M 295,342 C 297,347 297,352 295,355"/>
          </g>
        </g>

        {/* Ruff */}
        <path d="M 205,262 Q 253,318 301,262 Q 278,328 253,340 Q 228,328 205,262 Z" fill="#c4c8c2" opacity="0.55"/>
        <path d="M 200,260 Q 253,322 306,260" fill="none" stroke="#9aa0a6" strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M 215,268 Q 253,314 291,268" fill="none" stroke="#a8aeb4" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 228,282 Q 253,316 278,282" fill="none" stroke="#b8bcb6" strokeWidth="1.3" strokeLinecap="round" opacity="0.75"/>
        <g stroke="#9aa0a6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.65">
          <path d="M 210,270 C 208,275 208,280 210,283"/><path d="M 220,285 C 218,290 218,295 220,298"/>
          <path d="M 285,285 C 287,290 287,295 285,298"/><path d="M 296,270 C 298,275 298,280 296,283"/>
        </g>

        {/* Paws */}
        <ellipse cx="215" cy="428" rx="40" ry="9" fill="#c8ccc4" opacity="0.4"/>
        <ellipse cx="296" cy="428" rx="40" ry="9" fill="#c8ccc4" opacity="0.4"/>
        <g stroke="#8a9298" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.90">
          <path d="M 192,423 C 191,427 191,430 193,430"/><path d="M 200,425 C 199,429 199,432 201,432"/>
          <path d="M 209,426 C 208,430 208,433 210,433"/><path d="M 218,425 C 217,429 217,432 219,432"/>
          <path d="M 226,423 C 225,427 225,430 227,430"/><path d="M 274,423 C 273,427 273,430 275,430"/>
          <path d="M 282,425 C 281,429 281,432 283,432"/><path d="M 291,426 C 290,430 290,433 292,433"/>
          <path d="M 300,425 C 299,429 299,432 301,432"/><path d="M 308,423 C 307,427 307,430 309,430"/>
        </g>
      </g>

      {/* Head */}
      <g id={`${u}head`}>
        <g id={`${u}earL`}>
          <path d="M 209,64 C 206,63 205,64 202,68 C 200,72 196,77 194,90 C 192,103 191,142 191,144 C 191,147 192,111 193,105 C 194,99 196,101 198,106 C 200,112 204,135 207,138 C 211,141 217,128 219,124 C 221,120 220,114 221,112 C 222,110 228,117 227,111 C 226,105 215,77 217,75 C 219,74 237,96 240,102 C 243,108 235,109 236,110 C 238,111 248,109 249,108 C 250,107 246,111 242,106 C 238,101 229,83 223,76 C 218,69 213,65 209,64 Z"
            fill={F('fur')} stroke="#b8bdb6" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M 207,72 C 204,73 201,82 199,89 C 198,96 198,109 198,116 C 198,123 198,127 201,129 C 204,131 213,130 216,129 C 219,128 218,126 218,124 C 218,122 216,118 216,116 C 216,115 219,116 220,115 C 221,114 220,109 221,108 C 222,107 227,113 226,108 C 225,104 220,87 217,81 C 214,75 210,71 207,72 Z"
            fill={F('pink')} opacity="0.9"/>
        </g>
        <g id={`${u}earR`}>
          <path d="M 310,64 C 303,71 283,100 275,108 C 267,116 259,110 260,110 C 261,110 279,111 282,109 C 285,108 277,107 280,101 C 283,96 300,74 302,76 C 304,78 294,105 293,111 C 293,117 298,109 299,111 C 300,113 299,120 301,124 C 303,129 310,142 313,138 C 316,134 319,108 321,102 C 323,96 325,94 326,101 C 327,108 328,145 328,144 C 328,143 328,106 326,93 C 324,81 321,74 318,69 C 315,64 317,58 310,64 Z"
            fill={F('fur')} stroke="#b8bdb6" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M 310,73 C 308,74 306,76 304,79 C 302,83 298,89 296,94 C 294,99 293,105 294,107 C 295,109 298,104 300,108 C 302,112 301,126 304,129 C 307,133 315,131 318,129 C 321,128 320,125 321,120 C 322,115 323,104 322,97 C 321,90 318,81 317,77 C 316,73 315,74 314,73 C 313,72 312,72 310,73 Z"
            fill={F('pink')} opacity="0.9"/>
        </g>

        <ellipse cx="259" cy="120" rx="64" ry="25" fill="#c8ccc4" opacity="0.14"/>

        {/* Eyes */}
        <circle cx="232" cy="163" r="18" fill="white" stroke="#252018" strokeWidth="2.2"/>
        <circle cx="232" cy="167" r="11" fill={F('iris')}/>
        <g id={`${u}pupilL`}>
          <circle cx="232" cy="167" r="6" fill="#1a0c06"/>
          <ellipse cx="234" cy="163" rx="2.2" ry="2.8" fill="white" opacity="0.93" transform="rotate(-15,234,163)"/>
        </g>
        <circle cx="288" cy="163" r="18" fill="white" stroke="#252018" strokeWidth="2.2"/>
        <circle cx="288" cy="167" r="11" fill={F('iris')}/>
        <g id={`${u}pupilR`}>
          <circle cx="288" cy="167" r="6" fill="#1a0c06"/>
          <ellipse cx="290" cy="163" rx="2.2" ry="2.8" fill="white" opacity="0.93" transform="rotate(-15,290,163)"/>
        </g>

        {/* Eyebrows */}
        <g id={`${u}browL`}>
          <path d="M 222,142 Q 232,135 242,141" fill="none" stroke="#8a9098" strokeWidth="4.5" strokeLinecap="round" opacity="0.70"/>
          <path d="M 222,142 Q 232,135 242,141" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" opacity="0.95"/>
        </g>
        <g id={`${u}browR`}>
          <path d="M 278,141 Q 288,134 298,141" fill="none" stroke="#8a9098" strokeWidth="4.5" strokeLinecap="round" opacity="0.70"/>
          <path d="M 278,141 Q 288,134 298,141" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" opacity="0.95"/>
        </g>

        {/* Eyelids */}
        <rect id={`${u}lidL`} x="214" y="145" width="36" height="0" fill={F('fur')} clipPath={`url(#${u}clipEyeL)`}/>
        <rect id={`${u}lidR`} x="270" y="145" width="36" height="0" fill={F('fur')} clipPath={`url(#${u}clipEyeR)`}/>

        {/* Muzzle + nose + mouth */}
        <ellipse id={`${u}muzzle`} cx="260" cy="258" rx="56" ry="46" fill="#f0f2f0" opacity="0.60"/>
        <ellipse id={`${u}nose`} cx="260" cy="222" rx="22" ry="17" fill="#3a2010"/>
        <ellipse cx="253" cy="215" rx="7" ry="5" fill="white" opacity="0.28"/>
        <g id={`${u}mouthClosed`}>
          <path d="M 230,257 C 234,276 248,264 260,263 C 272,264 286,276 290,257" fill="none" stroke="#4a3e38" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 233,277 Q 260,294 287,277" fill="none" stroke="#4a3e38" strokeWidth="1.9" strokeLinecap="round"/>
        </g>
        <g id={`${u}mouthOpen`} opacity="0">
          <ellipse cx="260" cy="261" rx="26" ry="22" fill="#1a0808"/>
          <ellipse cx="260" cy="274" rx="16" ry="13" fill="#eaa090"/>
          <line x1="260" y1="264" x2="260" y2="285" stroke="#c87868" strokeWidth="2" strokeLinecap="round" opacity="0.50"/>
          <path d="M 234,261 A 26,22 0 0 1 286,261" fill="none" stroke="#3a1808" strokeWidth="4" strokeLinecap="round"/>
          <path d="M 234,261 A 26,22 0 0 0 286,261" fill="none" stroke="#3a1808" strokeWidth="3" strokeLinecap="round"/>
        </g>

        <ellipse cx="207" cy="208" rx="20" ry="12" fill="#f0c0b8" opacity="0.20"/>
        <ellipse cx="313" cy="208" rx="20" ry="12" fill="#f0c0b8" opacity="0.20"/>
      </g>

      {/* Collar Entersys */}
      <g id={`${u}collar`}>
        <path d="M 208,288 A 54,12 0 0 0 312,288" fill="none" stroke="#009ca6" strokeWidth="15" strokeLinecap="round"/>
        <path d="M 220,290 A 42,9 0 0 0 300,290" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.20"/>
        <ellipse cx="260" cy="297" rx="5" ry="4" fill="none" stroke="#a07008" strokeWidth="2.8"/>
        <circle cx="260" cy="323" r="27" fill="#7a5800"/>
        <circle cx="260" cy="323" r="25.5" fill="#d4a820"/>
        <circle cx="260" cy="323" r="23" fill="#e8be38" opacity="0.55"/>
        <ellipse cx="254" cy="313" rx="9" ry="6.5" fill="white" opacity="0.25"/>
        <path d="M 246,322 C 240,317 240,314 244,312 C 247,309 252,312 252,315 C 252,318 246,322 244,325 C 240,329 242,333 246,335 C 249,337 254,335 254,331" fill="none" stroke="#7a4800" strokeWidth="3.2" strokeLinecap="round"/>
        <path d="M 255,312 L 260,320 L 265,312 M 260,320 L 260,335" fill="none" stroke="#7a4800" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 274,322 C 280,317 280,314 276,312 C 273,309 268,312 268,315 C 268,318 274,322 276,325 C 279,329 278,333 274,335 C 270,337 266,335 266,331" fill="none" stroke="#7a4800" strokeWidth="3.2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
