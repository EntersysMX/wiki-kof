import { useState } from 'react';

/**
 * Avatar SVG del perro — siluetas trazadas con OpenCV + diseño interior
 * con posiciones detectadas automáticamente del PNG real (dog_body.png 387×712).
 *
 * Coordenadas clave en viewBox 0 0 200 368:
 *   Oreja izq  rosa: cx=58  cy=38  rx=9  ry=23
 *   Oreja der  rosa: cx=129 cy=30  rx=9  ry=23
 *   Ojo izq:   cx=71  cy=84
 *   Ojo der:   cx=117 cy=84
 *   Nariz:     cx=95  cy=110  rx=19 ry=13
 *   Boca:      y≈128
 *   Ruff ini:  y≈136
 *   Sombra L:  x≈31  |  Sombra R: x≈138
 */

const SRC_W = 387, SRC_H = 712;

const P = {
  body:
    'M 29.2,8.0 L 24.6,59.9 L 30.9,73.0 L 24.6,93.5 L 13.2,110.3 L 19.5,111.9 ' +
    'L 13.2,131.8 L 21.2,130.2 L 21.2,144.4 L 26.3,158.6 L 16.6,187.4 L 15.5,215.7 ' +
    'L 18.3,214.2 L 28.1,254.6 L 12.6,266.1 L 8.0,287.6 L 18.3,308.1 L 30.4,321.2 ' +
    'L 13.7,329.0 L 12.0,340.6 L 18.3,344.8 L 29.2,345.8 L 34.4,355.8 L 58.4,360.0 ' +
    'L 79.7,352.7 L 83.7,331.7 L 94.6,333.8 L 115.8,331.7 L 118.6,349.5 L 122.6,354.8 ' +
    'L 142.1,360.0 L 158.8,358.4 L 167.4,354.8 L 171.4,345.8 L 182.8,344.3 L 188.6,339.5 ' +
    'L 185.7,328.0 L 170.2,320.7 L 181.7,308.6 L 189.1,289.7 L 192.0,288.7 L 188.6,267.1 ' +
    'L 170.8,254.0 L 177.1,231.0 L 177.7,215.2 L 180.5,215.7 L 177.1,182.2 L 167.9,158.6 ' +
    'L 172.5,147.0 L 172.5,130.8 L 180.5,132.3 L 174.2,111.3 L 180.5,109.8 L 170.2,95.1 ' +
    'L 163.3,75.7 L 169.1,59.4 L 165.1,8.0 L 128.9,8.0 L 112.9,36.3 L 98.6,38.4 ' +
    'L 81.9,36.9 L 64.7,8.0 Z',

  tailBase:
    'M 120.7,8.0 L 107.5,63.7 L 86.9,97.4 L 75.6,88.3 L 64.3,113.0 L 56.8,106.5 ' +
    'L 8.0,144.1 L 51.2,118.1 L 54.9,127.2 L 75.6,101.3 L 77.5,110.4 L 111.3,67.6 ' +
    'L 120.7,26.1 L 131.9,40.4 L 130.0,15.8 L 177.0,58.5 L 169.5,103.9 L 190.1,90.9 ' +
    'L 182.6,115.5 L 154.4,140.2 L 180.7,133.7 L 160.1,150.5 L 124.4,159.6 L 150.7,155.7 ' +
    'L 141.3,163.5 L 88.7,173.9 L 109.4,181.6 L 8.0,186.8 L 70.0,192.0 L 109.4,185.5 ' +
    'L 190.1,129.8 L 192.0,71.5 L 186.4,78.0 L 162.0,31.3 Z',

  tailWagL:
    'M 9.3,12.4 L 8.0,92.7 L 13.1,104.4 L 8.0,98.5 L 8.0,123.4 L 34.8,154.0 ' +
    'L 25.9,155.5 L 38.7,168.6 L 70.6,183.2 L 97.4,183.2 L 93.6,189.1 L 98.7,192.0 ' +
    'L 115.3,190.5 L 138.3,175.9 L 142.2,181.8 L 161.3,170.1 L 192.0,132.1 L 186.9,97.1 ' +
    'L 157.5,104.4 L 137.1,102.9 L 103.8,86.9 L 101.3,95.6 L 82.1,72.3 L 80.8,89.8 ' +
    'L 41.2,50.3 L 22.1,13.8 L 16.9,25.5 L 14.4,8.0 Z',

  tailRaised:
    'M 157.3,14.3 L 145.3,8.0 L 146.7,23.0 L 140.0,15.5 L 132.0,55.6 L 108.0,96.9 ' +
    'L 102.7,84.4 L 89.3,109.4 L 85.3,103.1 L 65.3,123.2 L 48.0,133.2 L 8.0,141.9 ' +
    'L 18.7,172.0 L 68.0,190.7 L 85.3,192.0 L 85.3,185.7 L 110.7,188.2 L 132.0,179.5 ' +
    'L 124.0,179.5 L 121.3,174.5 L 152.0,165.7 L 178.7,141.9 L 186.7,125.7 L 178.7,126.9 ' +
    'L 190.7,104.4 L 192.0,76.8 L 184.0,81.9 L 186.7,66.8 L 182.7,49.3 L 172.0,29.3 Z',

  jawTongue:
    'M 33.1,10.3 L 16.4,19.6 L 8.0,31.3 L 16.4,33.6 L 28.9,24.3 L 45.6,47.6 ' +
    'L 41.5,56.9 L 45.6,52.3 L 58.2,66.2 L 49.8,68.6 L 45.6,61.6 L 66.5,101.2 ' +
    'L 116.7,152.4 L 166.9,182.7 L 192.0,192.0 L 192.0,178.0 L 175.3,171.0 ' +
    'L 179.5,168.7 L 192.0,171.0 L 192.0,61.6 L 179.5,61.6 L 125.1,45.3 ' +
    'L 112.5,45.3 L 49.8,15.0 L 54.0,8.0 Z',

  pawWave:
    'M 87.5,8.0 L 64.5,15.1 L 56.1,23.0 L 37.3,27.5 L 28.9,36.3 L 43.5,70.8 ' +
    'L 41.5,92.9 L 26.8,127.4 L 8.0,144.2 L 16.4,143.3 L 16.4,160.2 L 37.3,179.6 ' +
    'L 70.7,190.2 L 106.3,192.0 L 139.7,184.9 L 143.9,188.5 L 162.7,169.9 ' +
    'L 160.6,165.5 L 169.0,167.2 L 171.1,164.6 L 169.0,86.7 L 192.0,36.3 L 150.2,11.5 Z',
};

const ns  = { vectorEffect: 'non-scaling-stroke' };
const out = { fill: 'none', stroke: '#22202e', strokeWidth: 2, strokeLinejoin: 'round', ...ns };
const lin = { fill: 'none', stroke: '#22202e', strokeWidth: 1.5, strokeLinecap: 'round', ...ns };

export default function DogAvatar({ size = 270, action: actionProp, showButtons = true }) {
  const [actionInner, setActionInner] = useState('idle');
  const action = actionProp ?? actionInner;
  const setAction = actionProp !== undefined ? () => {} : setActionInner;

  const dH = size;
  const dW = Math.round(dH * SRC_W / SRC_H);
  const sx  = n => Math.round(n * dW / SRC_W);
  const sy  = n => Math.round(n * dH / SRC_H);

  const tailPath = action === 'wag'
    ? P.tailWagL
    : (action === 'bark' || action === 'wave')
      ? P.tailRaised
      : P.tailBase;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      <style>{`
        @keyframes dogFloat   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-9px)} }
        @keyframes dogBreathe { 0%,100%{transform:scaleY(1)}       50%{transform:scaleY(1.015) translateY(-1px)} }
        @keyframes dogShadow  { 0%,100%{transform:scaleX(1);opacity:.2} 50%{transform:scaleX(.72);opacity:.08} }
        @keyframes tailWag    { 0%{transform:rotate(-4deg)} 100%{transform:rotate(-28deg)} }
        @keyframes jawBark    { 0%,100%{transform:scaleY(.2) translateY(14px);opacity:.2}
                                50%{transform:scaleY(1) translateY(0);opacity:1} }
        @keyframes pawWave    { 0%,100%{transform:rotate(0) translateY(0)}
                                50%{transform:rotate(-55deg) translateY(-18px)} }
        .dog-float   { animation: dogFloat   3.5s ease-in-out infinite }
        .dog-breathe { transform-origin: 50% 100%; animation: dogBreathe 2.2s ease-in-out infinite }
        .dog-shadow  { animation: dogShadow  3.5s ease-in-out infinite; transform-origin: center }
        .dbtn {
          background: rgba(255,255,255,.1); color: #fff;
          border: 1.5px solid rgba(255,255,255,.2); padding: 6px 14px;
          border-radius: 99px; cursor: pointer; font-size: 11px; font-weight: 700;
          font-family: 'Titillium Web', sans-serif; transition: background .15s; user-select: none;
        }
        .dbtn:hover { background: rgba(255,255,255,.22) }
        .dbtn.on    { background: rgba(0,156,166,.42); border-color: #009ca6 }
      `}</style>

      <div className="dog-shadow" style={{
        width: dW * 0.58, height: 10, borderRadius: '50%',
        background: 'rgba(0,0,0,.24)', filter: 'blur(5px)', marginBottom: -4,
      }} />

      <div className="dog-float" style={{ position: 'relative', width: dW, height: dH }}>

        {/* ══ COLA ══ detrás del cuerpo */}
        <div style={{
          position: 'absolute', right: -sx(18), bottom: sy(68), width: sx(145),
          transformOrigin: 'bottom left',
          animation: action === 'wag' ? 'tailWag 0.42s ease-in-out infinite alternate' : 'none',
          transform: (action === 'bark' || action === 'wave') ? 'rotate(-18deg) translateY(-12px)' : 'none',
          zIndex: 0, pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto', display: 'block' }} overflow="visible">
            <path d={tailPath} fill="#f0ece0" stroke="#22202e" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        {/* ══ CUERPO ══ */}
        <svg
          viewBox="0 0 200 368"
          style={{ position: 'absolute', top: 0, left: 0, width: dW, height: dH, overflow: 'visible' }}
          className="dog-breathe"
        >
          <defs>
            <clipPath id="bodyClip"><path d={P.body} /></clipPath>
          </defs>

          {/* Base blanco */}
          <path d={P.body} fill="#ffffff" />

          {/* ══ OREJAS ══ fuera del clipPath para que no se corten arriba */}
          {/* Oreja izquierda — base gris */}
          <ellipse cx="58" cy="22" rx="14" ry="26" fill="#c8b89a" />
          {/* Oreja derecha — base gris */}
          <ellipse cx="141" cy="22" rx="14" ry="26" fill="#c8b89a" />
          {/* Oreja izquierda — rosa interior */}
          <ellipse cx="57" cy="29" rx="7" ry="20" fill="#e8a8b8" />
          {/* Oreja derecha — rosa interior */}
          <ellipse cx="141" cy="29" rx="7" ry="20" fill="#e8a8b8" />

          {/* ══ INTERIOR DEL CUERPO (clippeado) ══ */}
          <g clipPath="url(#bodyClip)">

            {/* Cara — relleno piel suave */}
            <ellipse cx="97" cy="95" rx="42" ry="42" fill="#f5f0e8" />

            {/* Ojos */}
            <circle cx="71"  cy="83" r="8.5" fill="#5a3c1e" />
            <circle cx="116" cy="83" r="8.5" fill="#5a3c1e" />
            {/* Brillo ojos */}
            <circle cx="74"  cy="79" r="2.5" fill="#ffffff" />
            <circle cx="119" cy="79" r="2.5" fill="#ffffff" />
            {/* Iris */}
            <circle cx="71"  cy="84" r="4" fill="#3a2510" />
            <circle cx="116" cy="84" r="4" fill="#3a2510" />

            {/* Nariz */}
            <ellipse cx="94" cy="109" rx="18" ry="12" fill="#2a1f1a" />
            <ellipse cx="91" cy="106" rx="5"  ry="3"  fill="#4a3530" />

            {/* Boca */}
            <path d="M 84,122 Q 94,132 104,122" fill="none" stroke="#22202e" strokeWidth={1.8} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <line x1="94" y1="120" x2="94" y2="128" stroke="#22202e" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />

            {/* ══ RUFF / CUELLO ══ zigzag en la base del cuello */}
            <path
              d="M 38,148 L 52,136 L 66,148 L 80,136 L 94,148 L 108,136 L 122,148 L 136,136 L 150,148 L 155,142"
              fill="none" stroke="#22202e" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"
            />
            {/* V del pecho */}
            <path d="M 46,155 Q 94,210 142,155" fill="none" stroke="#22202e" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />

            {/* ══ LÍNEAS DE PATAS DELANTERAS ══ */}
            {/* División entre patas delanteras */}
            <line x1="90" y1="260" x2="90" y2="335" stroke="#22202e" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {/* Contorno pata izquierda delantera */}
            <path d="M 40,260 Q 38,310 40,335" {...lin} />
            {/* Contorno pata derecha delantera */}
            <path d="M 152,260 Q 154,310 152,335" {...lin} />

            {/* ══ ANCAS TRASERAS ══ */}
            <path d="M 40,258 Q 32,285 38,310" {...lin} />
            <path d="M 152,258 Q 160,285 154,310" {...lin} />

            {/* ══ DEDOS / ALMOHADILLAS ══ pata izquierda */}
            <ellipse cx="46" cy="352" rx="6" ry="5" fill="#d4a8a0" />
            <ellipse cx="60" cy="354" rx="6" ry="5" fill="#d4a8a0" />
            <ellipse cx="74" cy="352" rx="6" ry="5" fill="#d4a8a0" />

            {/* ══ DEDOS / ALMOHADILLAS ══ pata derecha */}
            <ellipse cx="120" cy="352" rx="6" ry="5" fill="#d4a8a0" />
            <ellipse cx="134" cy="354" rx="6" ry="5" fill="#d4a8a0" />
            <ellipse cx="148" cy="352" rx="6" ry="5" fill="#d4a8a0" />

          </g>

          {/* Contorno exterior encima de todo */}
          <path d={P.body} {...out} />

          {/* Contorno orejas encima */}
          <ellipse cx="58"  cy="22" rx="14" ry="26" fill="none" stroke="#22202e" strokeWidth={1.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <ellipse cx="141" cy="22" rx="14" ry="26" fill="none" stroke="#22202e" strokeWidth={1.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* ══ MANDÍBULA (bark) ══ */}
        {action === 'bark' && (
          <div style={{
            position: 'absolute', left: sx(72), top: sy(290), width: sx(200),
            transformOrigin: 'top center',
            animation: 'jawBark 0.28s ease-in-out infinite',
            zIndex: 2, pointerEvents: 'none',
          }}>
            <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto', display: 'block' }} overflow="visible">
              {/* Lengua */}
              <path d={P.jawTongue} fill="#e05870" stroke="#22202e" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {/* Dientes */}
              <path d="M 60,30 L 75,55 L 90,30 L 105,55 L 120,30 L 135,55 L 150,30" fill="none" stroke="#ffffff" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        )}

        {/* ══ PATA (wave) ══ */}
        {action === 'wave' && (
          <div style={{
            position: 'absolute', left: sx(15), bottom: sy(80), width: sx(120),
            transformOrigin: 'bottom center',
            animation: 'pawWave 0.65s ease-in-out infinite',
            zIndex: 2, pointerEvents: 'none',
          }}>
            <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto', display: 'block' }} overflow="visible">
              <path d={P.pawWave} fill="#f0ece0" stroke="#22202e" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {/* Almohadillas en la pata */}
              <ellipse cx="80"  cy="170" rx="9" ry="8" fill="#d4a8a0" />
              <ellipse cx="100" cy="175" rx="9" ry="8" fill="#d4a8a0" />
              <ellipse cx="120" cy="170" rx="9" ry="8" fill="#d4a8a0" />
            </svg>
          </div>
        )}
      </div>

      {/* Botones */}
      {showButtons && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { k: 'idle', l: '😴 Idle' },
            { k: 'bark', l: '🔊 Ladrar' },
            { k: 'wag',  l: '🐾 Cola' },
            { k: 'wave', l: '👋 Saludar' },
          ].map(({ k, l }) => (
            <button key={k}
              className={`dbtn${action === k ? ' on' : ''}`}
              onClick={() => setAction(action === k && k !== 'idle' ? 'idle' : k)}>
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
