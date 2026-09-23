import { useState } from 'react';
import { FAQ_SECTIONS, TICKET_URL } from '../data/faq';

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      borderBottom: '1px solid #e2e6e8',
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0', gap: 12, cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: 15, fontWeight: 500, color: '#1c2838', lineHeight: 1.5,
          fontFamily: "'Titillium Web', sans-serif",
        }}>
          {item.q}
        </span>
        <span className="material-symbols-rounded" aria-hidden="true" style={{
          fontSize: 20, color: '#009ca6', flexShrink: 0,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          expand_more
        </span>
      </button>

      {open && (
        <div style={{
          paddingBottom: 20, paddingRight: 32,
          fontSize: 14, lineHeight: 1.75, color: '#3d4f5c',
        }}>
          {item.a.split('\n').map((line, i) => {
            if (!line.trim()) return <br key={i} />;
            const bold = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            return (
              <p key={i} style={{ margin: '0 0 6px' }}
                dangerouslySetInnerHTML={{ __html: bold }} />
            );
          })}

          <a
            href={TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 12, fontSize: 13, color: '#009ca6',
              textDecoration: 'none', fontWeight: 600,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#007880'}
            onMouseLeave={e => e.currentTarget.style.color = '#009ca6'}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>confirmation_number</span>
            Si esto no resolvió tu problema, abre un ticket aquí
          </a>
        </div>
      )}
    </div>
  );
}

function FaqSection({ section }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e6e8',
      borderRadius: 12,
      padding: '4px 24px 8px',
      marginBottom: 16,
    }}>
      <h2 style={{
        fontFamily: "'Titillium Web', sans-serif",
        fontWeight: 700, fontSize: 17,
        color: '#1c2838', margin: '20px 0 4px',
        paddingBottom: 12, borderBottom: '2px solid #009ca6',
        display: 'inline-block',
      }}>
        {section.title}
      </h2>
      {section.items.map(item => (
        <FaqItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default function FAQ({ onGoHome }) {
  const [q, setQ] = useState('');

  const filtered = q.trim().length < 2
    ? FAQ_SECTIONS
    : FAQ_SECTIONS.map(sec => ({
        ...sec,
        items: sec.items.filter(item =>
          item.q.toLowerCase().includes(q.toLowerCase()) ||
          item.a.toLowerCase().includes(q.toLowerCase())
        ),
      })).filter(sec => sec.items.length > 0);

  return (
    <div style={{ background: '#f6f8fa', minHeight: '100vh' }}>
      {/* Banner */}
      <div style={{
        background: '#1c2838', color: '#ffffff',
        padding: '40px 20px 44px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <button
            onClick={onGoHome}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: '#7fccd1', fontSize: 14, fontWeight: 600,
              marginBottom: 20, padding: 0,
              fontFamily: "'Titillium Web', sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#b9e3e6'}
            onMouseLeave={e => e.currentTarget.style.color = '#7fccd1'}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_back</span>
            Volver al inicio
          </button>

          <h1 style={{
            fontFamily: "'Titillium Web', sans-serif",
            fontWeight: 700, fontSize: 'clamp(24px, 5vw, 36px)',
            margin: '0 0 12px', color: '#ffffff',
          }}>
            Preguntas Frecuentes
          </h1>
          <p style={{ fontSize: 16, color: '#c9d2da', margin: '0 0 28px', maxWidth: '60ch' }}>
            Respuestas a las dudas más comunes sobre el uso de la plataforma de gestión documental KOF.
          </p>

          {/* Buscador */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#ffffff', borderRadius: 10,
            padding: '10px 16px', maxWidth: 520,
          }}>
            <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#7c878e' }}>search</span>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Busca una pregunta, ej: IPERC, permiso, colaborador..."
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: 15, color: '#1c2838', background: 'transparent',
                fontFamily: 'inherit',
              }}
            />
            {q && (
              <button onClick={() => setQ('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#7c878e' }}>close</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px 60px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#7c878e' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 48, marginBottom: 12, display: 'block' }}>search_off</span>
            <p style={{ fontSize: 16 }}>No se encontraron resultados para "{q}"</p>
          </div>
        ) : (
          filtered.map(section => (
            <FaqSection key={section.id} section={section} />
          ))
        )}

        {/* Ticket CTA */}
        <div style={{
          marginTop: 32, background: '#e6f5f6',
          border: '1px solid #b3dfe1', borderRadius: 12,
          padding: '24px 28px', display: 'flex',
          alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <span className="material-symbols-rounded" style={{ fontSize: 36, color: '#009ca6', flexShrink: 0 }}>support_agent</span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#1c2838', fontSize: 16, fontFamily: "'Titillium Web', sans-serif" }}>
              ¿No encontraste la respuesta?
            </p>
            <p style={{ margin: 0, fontSize: 14, color: '#3d4f5c' }}>
              Abre un ticket y el equipo de soporte te atenderá a la brevedad.
            </p>
          </div>
          <a
            href={TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#009ca6', color: '#ffffff',
              padding: '12px 20px', borderRadius: 8,
              fontWeight: 600, fontSize: 15, textDecoration: 'none',
              fontFamily: "'Titillium Web', sans-serif",
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#007880'}
            onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}
          >
            Abrir ticket
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}
