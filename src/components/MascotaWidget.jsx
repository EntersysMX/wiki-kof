"use client";
import { useState, useRef, useEffect } from 'react';
import Mascota from './Mascota';

const API_URL     = 'https://api.scram2k.com/v1/chat/mascot';
const SITE_ORIGIN = 'wiki-kof';
const SESSION_KEY = 'kof_mascot_session';

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const WELCOME = '¡Hola! Soy Júpiter 🐾 ¿En qué paso del proceso de validación con KOF te puedo ayudar?';

export default function MascotaWidget() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState([{ role: 'bot', text: WELCOME }]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [barkTick, setBarkTick] = useState(0);
  const [wagFast,  setWagFast]  = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const sessionId = useRef(getSessionId());

  const bark = () => setBarkTick(t => t + 1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  function handleFabClick() {
    bark();
    setOpen(o => !o);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text }]);
    setLoading(true);
    bark();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message:        text,
          session_id:     sessionId.current,
          siteOrigin:     SITE_ORIGIN,
          currentSection: 'kof-contratistas',
          lang:           'es',
        }),
      });
      const data = await res.json();
      const reply = data.reply ?? data.message ?? data.text ?? 'Sin respuesta del servidor.';
      setMsgs(m => [...m, { role: 'bot', text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'No pude conectarme. Revisa tu conexión e intenta de nuevo.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
    }}>

      {/* ── Panel de chat ───────────────────────────────────── */}
      {open && (
        <div style={{
          width: 320, background: '#1c2838',
          border: '1px solid rgba(0,156,166,.35)',
          borderRadius: 16,
          boxShadow: '0 12px 40px rgba(0,0,0,.55)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'mascotaSlideUp .22s ease',
        }}>
          <style>{`
            @keyframes mascotaSlideUp {
              from { opacity:0; transform:translateY(14px) }
              to   { opacity:1; transform:translateY(0) }
            }
          `}</style>

          {/* Header */}
          <div style={{
            background: '#009ca6', padding: '11px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🐾</span>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>Júpiter</div>
                <div style={{ color: 'rgba(255,255,255,.75)', fontSize: 11 }}>Guía de validación KOF</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: '0 2px' }}
              aria-label="Cerrar chat"
            >×</button>
          </div>

          {/* Mensajes */}
          <div style={{
            flex: 1, padding: '14px 14px 8px',
            display: 'flex', flexDirection: 'column', gap: 10,
            maxHeight: 340, overflowY: 'auto',
          }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: m.role === 'user' ? '#009ca6' : '#243448',
                  color: '#f0f4f8',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                  padding: '8px 12px',
                  maxWidth: '82%',
                  fontSize: 13,
                  lineHeight: 1.55,
                  wordBreak: 'break-word',
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: '#243448', color: '#6b8899',
                  borderRadius: '4px 16px 16px 16px',
                  padding: '8px 14px', fontSize: 18, letterSpacing: 4,
                }}>···</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '10px 12px',
            borderTop: '1px solid rgba(255,255,255,.08)',
            display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Escribe tu pregunta…"
              disabled={loading}
              style={{
                flex: 1, background: '#243040',
                border: '1px solid rgba(255,255,255,.12)',
                color: '#f0f4f8', borderRadius: 10,
                padding: '8px 12px', fontSize: 13, outline: 'none',
                opacity: loading ? 0.6 : 1,
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                background: '#009ca6', color: '#fff',
                border: 'none', borderRadius: 10,
                padding: '8px 14px', cursor: 'pointer',
                fontSize: 17, fontWeight: 700, lineHeight: 1,
                opacity: loading || !input.trim() ? 0.45 : 1,
                transition: 'opacity .15s',
              }}
              aria-label="Enviar"
            >↑</button>
          </div>
        </div>
      )}

      {/* ── Botón FAB: perrito ───────────────────────────────── */}
      <div
        onClick={handleFabClick}
        onMouseEnter={() => setWagFast(true)}
        onMouseLeave={() => setWagFast(false)}
        title={open ? 'Cerrar chat' : 'Abrir chat con la mascota'}
        style={{ cursor: 'pointer', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,.5))' }}
      >
        <Mascota size={280} barkTick={barkTick} wagFast={wagFast} />
      </div>

    </div>
  );
}
