import { useState, useEffect, useRef, useCallback } from 'react';
import { NODES, NODE_MAP, EDGES, STATIONS, ACTORS, RECURSOS, GLOSSARY, VIEWS } from '../data/mapa';
import entersysLogo from '../assets/entersys-logo.png';

// ── Helpers de geometría ─────────────────────────────────────────
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const anchor = (n, s) => {
  const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
  return s === 'l' ? [n.x, cy] : s === 'r' ? [n.x + n.w, cy] : s === 't' ? [cx, n.y] : [cx, n.y + n.h];
};
const dir = s => s === 'l' ? [-1, 0] : s === 'r' ? [1, 0] : s === 't' ? [0, -1] : [0, 1];
function ortho(a, b, fs, ts, via, at) {
  const pts = [a];
  const hv = s => s === 'l' || s === 'r';
  if (hv(fs) && hv(ts)) {
    if (Math.abs(a[1] - b[1]) < 1) { pts.push(b); }
    else { const mx = via != null ? via : fs === ts ? (fs === 'r' ? Math.max(a[0], b[0]) + 40 : Math.min(a[0], b[0]) - 40) : (a[0] + b[0]) / 2; pts.push([mx, a[1]], [mx, b[1]], b); }
  } else if (!hv(fs) && !hv(ts)) {
    if (Math.abs(a[0] - b[0]) < 1) { pts.push(b); }
    else { const my = via != null ? via : fs === ts ? (fs === 't' ? Math.min(a[1], b[1]) - 60 : Math.max(a[1], b[1]) + 60) : (a[1] + b[1]) / 2; pts.push([a[0], my], [b[0], my], b); }
  } else if (hv(fs)) {
    if (via != null) pts.push([via, a[1]], [via, b[1]], b); else pts.push([b[0], a[1]], b);
  } else {
    if (via != null) pts.push([a[0], via], [b[0], via], b); else pts.push([a[0], b[1]], b);
  }
  const d = 'M' + pts.map(p => p.join(' ')).join(' L');
  let best = 0, mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const t = at == null ? 0.5 : at;
  for (let i = 0; i < pts.length - 1; i++) {
    const len = Math.hypot(pts[i+1][0] - pts[i][0], pts[i+1][1] - pts[i][1]);
    if (len > best) { best = len; mid = [pts[i][0] + (pts[i+1][0] - pts[i][0]) * t, pts[i][1] + (pts[i+1][1] - pts[i][1]) * t]; }
  }
  return { d, mid };
}
function bbox(list) {
  const x0 = Math.min(...list.map(n => n.x)), y0 = Math.min(...list.map(n => n.y));
  const x1 = Math.max(...list.map(n => n.x + n.w)), y1 = Math.max(...list.map(n => n.y + n.h));
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

const PANEL_W = 420;

// ── Panel de detalle del nodo ─────────────────────────────────────
function NodePanel({ nodeId, onClose, onNavigate, view }) {
  const n = nodeId ? NODE_MAP[nodeId] : null;
  const idx = nodeId ? NODES.indexOf(NODE_MAP[nodeId]) : -1;
  if (!n) return null;

  const a = ACTORS[n.actor];
  const deps = EDGES.filter(e => e.to === n.id && !(e.from === 'd_intentos' && e.to === 'modulos')).map(e => e.from);
  const outs = EDGES.filter(e => e.from === n.id).map(e => e.to);
  const res = (RECURSOS[n.id] || []).map(r => ({ ...r, isPdf: r.type === 'pdf', isVideo: r.type === 'video', meta: r.status === 'disponible' ? (r.type === 'video' ? 'Video tutorial · YouTube' : 'Manual PDF · Google Drive') : (r.type === 'video' ? 'Video tutorial' : 'Manual PDF') }));

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', height: '100%', outline: 'none' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px 10px', borderBottom: '1px solid #e2e6e8' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999, background: '#f1f3f4', color: '#454d52' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 13 }}>location_on</span>
            {STATIONS.find(s => s.id === n.st)?.short}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999, background: a.chipBg, color: a.chipFg }}>
            <span className="material-symbols-rounded" style={{ fontSize: 13 }}>{a.icon}</span>
            {a.chip}
          </span>
          {n.interviene && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999, background: '#009ca6', color: '#ffffff' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 13 }}>person_check</span>
              Interviene el Coordinador
            </span>
          )}
        </div>
        <button onClick={onClose} style={{ width: 36, height: 36, flex: 'none', border: 'none', background: 'transparent', borderRadius: 8, cursor: 'pointer', color: '#5f696f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f1f3f4'; e.currentTarget.style.color = '#1c2838'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5f696f'; }}>
          <span className="material-symbols-rounded" style={{ fontSize: 20 }}>close</span>
        </button>
      </div>

      {/* Scroll body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          {n.tag && <p style={{ margin: '0 0 3px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c878e' }}>{n.tag}</p>}
          <h2 style={{ margin: 0, fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.15, color: '#1c2838' }}>{n.title}</h2>
        </div>

        <section>
          <h3 style={{ margin: '0 0 5px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5f696f' }}>Qué sucede</h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#454d52' }}>{n.body}</p>
        </section>

        {n.id.startsWith('cred') && (
          <div style={{ display: 'flex', gap: 10, background: '#e6f5f6', border: '1px solid #b9e3e6', borderRadius: 10, padding: '10px 12px' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#00646b', flex: 'none' }}>info</span>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: '#0b5560' }}>El Coordinador no valida la credencial: se genera automáticamente y se destraba al validarse el Paso 3 · Listado de Personal.</p>
          </div>
        )}

        {n.sample && (
          <section>
            <h3 style={{ margin: '0 0 8px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5f696f' }}>Muestra de la credencial (6 × 9)</h3>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div aria-label="Muestra ilustrativa de la credencial digital" role="img" style={{ flex: 'none', width: 160, aspectRatio: '6/9', background: '#ffffff', border: '1px solid #111111', borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ background: '#c8102e', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 700, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Credencial digital</div>
                <div style={{ flex: 1, padding: 10, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                  <div style={{ width: 72, height: 86, border: '1.5px dashed #111111', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#111111' }}>[Foto]</div>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 5, fontSize: 9, color: '#111111', lineHeight: 1.35 }}>
                    <span style={{ borderBottom: '1px solid #111111', paddingBottom: 2 }}>[Nombre del colaborador]</span>
                    <span style={{ borderBottom: '1px solid #111111', paddingBottom: 2 }}>[NSS]</span>
                    <span style={{ borderBottom: '1px solid #111111', paddingBottom: 2 }}>[Empresa contratista]</span>
                  </div>
                </div>
                <div style={{ background: '#111111', height: 12 }} />
              </div>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: '#5f696f', flex: 1, minWidth: 120 }}>Muestra ilustrativa. El diseño oficial de la credencial se define por separado.</p>
            </div>
          </section>
        )}

        <section>
          <h3 style={{ margin: '0 0 8px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5f696f' }}>Quién ejecuta / quién valida</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['Ejecuta', n.ejecuta], ['Valida', n.valida]].map(([label, val]) => (
              <div key={label} style={{ background: '#fafafa', border: '1px solid #e2e6e8', borderRadius: 10, padding: '8px 10px' }}>
                <span style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#7c878e', marginBottom: 3 }}>{label}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: '#1c2838' }}>{val}</span>
              </div>
            ))}
          </div>
        </section>

        {n.revisas && (
          <section style={{ background: '#e6f5f6', border: '1px solid #b9e3e6', borderRadius: 12, padding: '12px 14px' }}>
            <h3 style={{ margin: '0 0 5px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14, color: '#084c52' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>fact_check</span>
              Qué revisa el Coordinador
            </h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#0b5560' }}>{n.revisas}</p>
          </section>
        )}

        {n.docs && (
          <section>
            <h3 style={{ margin: '0 0 8px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5f696f' }}>Documentos involucrados</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 12.5, border: '1px solid #e2e6e8', borderRadius: 10, overflow: 'hidden', borderSpacing: 0, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#fafafa' }}>
                    <th style={{ textAlign: 'left', padding: '7px 10px', fontWeight: 600, color: '#5f696f', borderBottom: '1px solid #e2e6e8', width: '42%' }}>Documento</th>
                    <th style={{ textAlign: 'left', padding: '7px 10px', fontWeight: 600, color: '#5f696f', borderBottom: '1px solid #e2e6e8' }}>{n.docsCol2 || 'Nota'}</th>
                  </tr>
                </thead>
                <tbody>
                  {n.docs.map(([name, note]) => (
                    <tr key={name}>
                      <td style={{ padding: '7px 10px', borderBottom: '1px solid #f1f3f4', fontWeight: 600, color: '#1c2838', verticalAlign: 'top' }}>{name}</td>
                      <td style={{ padding: '7px 10px', borderBottom: '1px solid #f1f3f4', color: '#454d52', lineHeight: 1.5, verticalAlign: 'top' }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {n.rechazo && (
          <div style={{ display: 'flex', gap: 10, background: '#fdf6e7', border: '1px solid #ecd9ab', borderRadius: 12, padding: '12px 14px' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#8a6a1d', flex: 'none' }}>replay</span>
            <div>
              <p style={{ margin: '0 0 2px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14, color: '#5f4a12' }}>Si el Coordinador rechaza</p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#5c4a15' }}>{n.rechazo}</p>
            </div>
          </div>
        )}

        <section>
          <h3 style={{ margin: '0 0 8px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5f696f' }}>Conexiones</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[['Depende de', deps, 'login', 'Inicio del proceso'], ['Alimenta a', outs, 'logout', 'Fin del proceso']].map(([label, ids, icon, empty]) => (
              <div key={label}>
                <p style={{ margin: '0 0 5px', fontSize: 11.5, fontWeight: 600, color: '#7c878e', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>{icon}</span>{label}
                </p>
                {ids.length === 0 ? (
                  <p style={{ margin: 0, fontSize: 12.5, color: '#7c878e' }}>{empty}</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {ids.map(id => (
                      <button key={id} onClick={() => onNavigate(id)} style={{ display: 'flex', alignItems: 'center', gap: 5, textAlign: 'left', border: '1px solid #cdd4d7', background: '#ffffff', borderRadius: 8, padding: '6px 8px', fontSize: 12.5, fontWeight: 600, color: '#008089', cursor: 'pointer', minHeight: 36 }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#009ca6'; e.currentTarget.style.background = '#e6f5f6'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#cdd4d7'; e.currentTarget.style.background = '#ffffff'; }}>
                        <span className="material-symbols-rounded" style={{ fontSize: 14 }}>my_location</span>
                        <span style={{ flex: 1 }}>{(NODE_MAP[id].tag ? NODE_MAP[id].tag + ' · ' : '') + NODE_MAP[id].label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {res.length > 0 && (
          <section>
            <h3 style={{ margin: '0 0 5px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5f696f' }}>Recursos</h3>
            <p style={{ margin: '0 0 8px', fontSize: 12, color: '#7c878e', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>open_in_new</span>Los disponibles abren en pestaña nueva.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {res.map((r, i) => r.status === 'disponible' ? (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px', background: '#ffffff', border: '1px solid #e2e6e8', borderRadius: 10, textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#009ca6'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(28,40,56,0.10)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e6e8'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 8, background: '#e6f5f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#00646b' }}>{r.isPdf ? 'picture_as_pdf' : 'smart_display'}</span>
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 13, lineHeight: 1.3, color: '#1c2838' }}>{r.title}</span>
                    <span style={{ display: 'block', marginTop: 2, fontSize: 11.5, color: '#5f696f' }}>{r.meta}</span>
                  </span>
                  <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#008089', flex: 'none' }}>open_in_new</span>
                </a>
              ) : (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px', background: '#fafafa', border: '1px dashed #cdd4d7', borderRadius: 10, opacity: 0.85 }}>
                  <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 8, background: '#f1f3f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#7c878e' }}>{r.isPdf ? 'picture_as_pdf' : 'smart_display'}</span>
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 13, color: '#5f696f' }}>{r.title}</span>
                    <span style={{ display: 'block', marginTop: 2, fontSize: 11.5, color: '#7c878e' }}>{r.meta}</span>
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', color: '#5f696f', background: '#e2e6e8', padding: '3px 7px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 13 }}>hourglass_top</span>En preparación
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Anterior / Siguiente */}
      <nav style={{ display: 'flex', gap: 8, padding: '10px 14px', borderTop: '1px solid #e2e6e8', background: '#fafafa' }}>
        {idx > 0 && (
          <button onClick={() => onNavigate(NODES[idx - 1].id)} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', border: '1px solid #cdd4d7', borderRadius: 10, padding: '7px 10px', textAlign: 'left', cursor: 'pointer', minHeight: 48 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#009ca6'; e.currentTarget.style.background = '#e6f5f6'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#cdd4d7'; e.currentTarget.style.background = '#ffffff'; }}>
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#5f696f' }}>arrow_back</span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 10, color: '#7c878e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Anterior</span>
              <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 12.5, color: '#1c2838', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{NODES[idx - 1].label}</span>
            </span>
          </button>
        )}
        {idx < NODES.length - 1 && (
          <button onClick={() => onNavigate(NODES[idx + 1].id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, background: '#009ca6', border: 'none', borderRadius: 10, padding: '7px 10px', textAlign: 'right', cursor: 'pointer', minHeight: 48 }}
            onMouseEnter={e => e.currentTarget.style.background = '#008089'} onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 10, color: '#b9e3e6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Siguiente</span>
              <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 12.5, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{NODES[idx + 1].label}</span>
            </span>
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#ffffff' }}>arrow_forward</span>
          </button>
        )}
      </nav>
    </aside>
  );
}

// ── Vista móvil/tablet: lista vertical por estaciones ────────────
function MobileView({ onGoHome, onGoProcedimientos }) {
  const [activeSt, setActiveSt] = useState('s1');
  const [sel, setSel] = useState(null);
  const [view, setView] = useState('todo');
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const stationNodes = NODES.filter(n => n.st === activeSt && (view === 'todo' || n.actors.includes(view)));
  const selNode = sel ? NODE_MAP[sel] : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa' }}>
      {/* Header */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e6e8', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52 }}>
          <button onClick={onGoHome} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 4, borderRadius: 8, color: '#5f696f' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 22 }}>arrow_back</span>
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c878e' }}>Portal KOF · Coordinadores</span>
            <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 13.5, color: '#1c2838', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Mapa del proceso</span>
          </div>
          <button onClick={() => setGlossaryOpen(true)} style={{ background: 'none', border: '1px solid #cdd4d7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', borderRadius: 7, color: '#5f696f', fontSize: 12, fontWeight: 600 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>menu_book</span>
            Glosario
          </button>
        </div>

        {/* Filtro */}
        <div style={{ padding: '0 12px 10px', display: 'flex', gap: 6, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {VIEWS.map(v => (
            <button key={v.id} onClick={() => setView(v.id)} style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, height: 30, padding: '0 10px', borderRadius: 999, border: 'none', background: view === v.id ? '#1c2838' : '#f1f3f4', color: view === v.id ? '#ffffff' : '#454d52', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {v.id === 'coordinador' && <span className="material-symbols-rounded" style={{ fontSize: 14 }}>person_check</span>}
              {v.label}
            </button>
          ))}
        </div>

        {view === 'coordinador' && (
          <div style={{ background: '#e6f5f6', borderTop: '1px solid #b9e3e6', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 700, color: '#00646b' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>person_check</span>
            Intervienes en 10 puntos del ciclo
          </div>
        )}
      </header>

      {/* Estaciones — scroll horizontal */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e6e8', padding: '10px 12px', display: 'flex', gap: 6, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {STATIONS.map(st => (
          <button key={st.id} onClick={() => { setActiveSt(st.id); setSel(null); }} style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 10px', borderRadius: 999, border: `1px solid ${activeSt === st.id ? '#1c2838' : '#cdd4d7'}`, background: activeSt === st.id ? '#1c2838' : '#ffffff', color: activeSt === st.id ? '#ffffff' : '#454d52', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {st.n > 0 && (
              <span style={{ width: 18, height: 18, borderRadius: '50%', background: activeSt === st.id ? '#009ca6' : '#f1f3f4', color: activeSt === st.id ? '#ffffff' : '#454d52', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, flex: 'none' }}>{st.n}</span>
            )}
            {st.short}
          </button>
        ))}
      </div>

      {/* Nodos de la estación activa */}
      <main style={{ flex: 1, padding: '12px 12px 80px' }}>
        <p style={{ margin: '0 0 10px', fontSize: 12, color: '#7c878e', padding: '0 4px' }}>
          {STATIONS.find(s => s.id === activeSt)?.note}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {stationNodes.length === 0 && (
            <p style={{ margin: 0, padding: 20, textAlign: 'center', fontSize: 14, color: '#7c878e' }}>
              No hay nodos del actor seleccionado en esta estación.
            </p>
          )}
          {stationNodes.map(n => {
            const a = ACTORS[n.actor];
            const isOpen = sel === n.id;
            return (
              <div key={n.id} style={{ background: '#ffffff', border: `1px solid ${isOpen ? '#009ca6' : a.border}`, borderStyle: a.borderStyle, borderRadius: 12, overflow: 'hidden', boxShadow: isOpen ? '0 4px 12px rgba(28,40,56,0.10)' : '0 1px 3px rgba(28,40,56,0.05)', transition: 'border-color 0.15s' }}>
                <button
                  onClick={() => setSel(isOpen ? null : n.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '12px 14px', cursor: 'pointer', minHeight: 56 }}
                >
                  <span style={{ flex: 'none', width: 28, height: 28, borderRadius: 8, background: a.chipBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 16, color: a.chipFg === '#ffffff' ? '#7c878e' : a.chipFg }}>{n.actor === 'decision' ? 'alt_route' : a.icon}</span>
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    {n.tag && <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#7c878e' }}>{n.tag}</span>}
                    <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14.5, lineHeight: 1.25, color: '#1c2838' }}>{n.label}</span>
                  </span>
                  {n.interviene && (
                    <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 3, background: '#009ca6', color: '#ffffff', borderRadius: 999, padding: '3px 7px', fontSize: 10.5, fontWeight: 700 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 13 }}>person_check</span>
                      Coordina
                    </span>
                  )}
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#7c878e', flex: 'none', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: '1px solid #e2e6e8' }}>
                    <NodePanel nodeId={n.id} onClose={() => setSel(null)} onNavigate={id => { setSel(id); const targetSt = NODE_MAP[id].st; if (targetSt !== activeSt) setActiveSt(targetSt); }} view={view} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* FAB procedimientos */}
      <button
        onClick={onGoProcedimientos}
        style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 50, display: 'flex', alignItems: 'center', gap: 6, background: '#009ca6', color: '#ffffff', fontWeight: 700, fontSize: 13, fontFamily: "'Titillium Web', sans-serif", padding: '12px 18px', borderRadius: 999, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,156,166,0.35)' }}
        onMouseEnter={e => e.currentTarget.style.background = '#008089'} onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 20 }}>list_alt_check</span>
        Procedimientos
      </button>

      {/* Glosario modal */}
      {glossaryOpen && (
        <div onClick={() => setGlossaryOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(28,40,56,0.5)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Glosario" style={{ width: '100%', maxWidth: 560, maxHeight: '80vh', background: '#ffffff', borderRadius: '14px 14px 0 0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '1px solid #e2e6e8' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#008089' }}>menu_book</span>
              <h2 style={{ margin: 0, flex: 1, fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 18, color: '#1c2838' }}>Glosario rápido</h2>
              <button onClick={() => setGlossaryOpen(false)} style={{ width: 36, height: 36, border: 'none', background: 'transparent', borderRadius: 8, cursor: 'pointer', color: '#5f696f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20 }}>close</span>
              </button>
            </div>
            <div style={{ overflowY: 'auto', padding: '6px 18px 20px' }}>
              {GLOSSARY.map(g => (
                <div key={g.term} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid #f1f3f4' }}>
                  <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14.5, color: '#1c2838' }}>{g.term}</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#454d52' }}>{g.def}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Vista desktop: canvas interactivo ───────────────────────────
function DesktopCanvas({ onGoHome, onGoProcedimientos }) {
  const [state, setState] = useState({ view: 'todo', sel: null, panelOpen: false, scale: 0.25, tx: 0, ty: 0, dragging: false, vw: 1200, vh: 600, q: '', searchOpen: false, legendOpen: true, glossaryOpen: false });
  const vpRef = useRef(); const panelRef = useRef(); const suppressRef = useRef(false);

  const visibleW = useCallback(() => state.vw - (state.panelOpen ? PANEL_W : 0), [state.vw, state.panelOpen]);

  const fitBox = useCallback((b, pad, maxS) => {
    const vw = state.vw - (state.panelOpen ? PANEL_W : 0), vh = state.vh;
    const s = clamp(Math.min((vw - pad * 2) / b.w, (vh - pad * 2) / b.h), 0.12, maxS);
    setState(prev => ({ ...prev, scale: s, tx: (vw - b.w * s) / 2 - b.x * s, ty: (vh - b.h * s) / 2 - b.y * s }));
  }, [state.vw, state.vh, state.panelOpen]);

  const fitAll = useCallback(() => fitBox(bbox(NODES), 36, 1), [fitBox]);

  useEffect(() => {
    const el = vpRef.current; if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setState(prev => ({ ...prev, vw: r.width, vh: r.height }));
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    const b = bbox(NODES.filter(n => n.st === 's1'));
    const s = clamp(Math.min((r.width - 90) / b.w, (r.height - 90) / b.h), 0.12, 0.95);
    setState(prev => ({ ...prev, vw: r.width, vh: r.height, scale: s, tx: (r.width - b.w * s) / 2 - b.x * s, ty: (r.height - b.h * s) / 2 - b.y * s }));
    const wheel = e => {
      e.preventDefault();
      const rc = el.getBoundingClientRect();
      setState(prev => {
        const ns = clamp(prev.scale * (e.deltaY < 0 ? 1.12 : 1 / 1.12), 0.12, 1.8);
        const px = e.clientX - rc.left, py = e.clientY - rc.top;
        return { ...prev, scale: ns, tx: px - (px - prev.tx) * ns / prev.scale, ty: py - (py - prev.ty) * ns / prev.scale };
      });
    };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => { ro.disconnect(); el.removeEventListener('wheel', wheel); };
  }, []);

  const onDown = e => {
    if (e.button !== 0) return;
    const st0 = { x: e.clientX, y: e.clientY, tx: state.tx, ty: state.ty, moved: false };
    const move = ev => {
      const dx = ev.clientX - st0.x, dy = ev.clientY - st0.y;
      if (!st0.moved && Math.hypot(dx, dy) > 4) { st0.moved = true; setState(prev => ({ ...prev, dragging: true })); }
      if (st0.moved) setState(prev => ({ ...prev, tx: st0.tx + dx, ty: st0.ty + dy }));
    };
    const up = () => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
      if (st0.moved) { suppressRef.current = true; setTimeout(() => { suppressRef.current = false; }, 0); }
      setState(prev => ({ ...prev, dragging: false }));
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };

  const zoomAt = (ns, px, py) => setState(prev => { const s = clamp(ns, 0.12, 1.8); return { ...prev, scale: s, tx: px - (px - prev.tx) * s / prev.scale, ty: py - (py - prev.ty) * s / prev.scale }; });
  const zoomCenter = f => setState(prev => { const vw = prev.vw - (prev.panelOpen ? PANEL_W : 0); const ns = clamp(prev.scale * f, 0.12, 1.8); return { ...prev, scale: ns, tx: vw / 2 - (vw / 2 - prev.tx) * ns / prev.scale, ty: prev.vh / 2 - (prev.vh / 2 - prev.ty) * ns / prev.scale }; });

  const openNode = id => setState(prev => ({ ...prev, sel: id, panelOpen: true, searchOpen: false }));
  const closePanel = () => setState(prev => ({ ...prev, panelOpen: false }));
  const navigateNode = id => {
    const n = NODE_MAP[id];
    setState(prev => {
      const panel = true;
      const vw = prev.vw - PANEL_W;
      const s = Math.max(prev.scale, 0.8);
      return { ...prev, sel: id, panelOpen: true, scale: s, tx: vw / 2 - (n.x + n.w / 2) * s, ty: prev.vh / 2 - (n.y + n.h / 2) * s };
    });
  };
  const fitStation = id => { const b = bbox(NODES.filter(n => n.st === id)); fitBox(b, 90, 0.95); };

  const onCanvasKey = e => {
    if (e.target.tagName === 'INPUT') return;
    const step = 90; const m = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] }[e.key];
    if (m) { e.preventDefault(); setState(prev => ({ ...prev, tx: prev.tx + m[0], ty: prev.ty + m[1] })); }
    else if (e.key === 'Escape' && state.panelOpen) closePanel();
  };

  const matches = n => state.view === 'todo' || n.actors.includes(state.view);
  const results = (() => {
    const q = state.q.trim().toLowerCase(); if (q.length < 2) return [];
    const out = [];
    NODES.forEach(n => {
      const doc = (n.docs || []).find(d => d[0].toLowerCase().includes(q));
      if ((n.title + ' ' + n.label + ' ' + (n.tag || '')).toLowerCase().includes(q)) out.push({ n, why: n.tag || 'Paso del proceso', icon: 'account_tree' });
      else if (doc) out.push({ n, why: 'Documento: ' + doc[0], icon: 'description' });
      else if ((n.keywords || '').toLowerCase().includes(q)) out.push({ n, why: 'Criterio de validación', icon: 'fact_check' });
    });
    return out;
  })();
  const hits = new Set(results.map(r => r.n.id));

  // Banda activa por posición del centro del viewport
  const cx = (visibleW() / 2 - state.tx) / state.scale, cy = (state.vh / 2 - state.ty) / state.scale;
  const bandList = STATIONS.map(s => { const b = bbox(NODES.filter(n => n.st === s.id)); return { ...s, bx: b.x - 30, by: b.y - 30, bw: b.w + 60, bh: b.h + 108 }; });
  let active = bandList.find(b => cx >= b.bx && cx <= b.bx + b.bw && cy >= b.by && cy <= b.by + b.bh);
  if (!active) active = bandList.reduce((best, b) => { const d = Math.hypot(b.bx + b.bw / 2 - cx, b.by + b.bh / 2 - cy); return !best || d < best.d ? { b, d } : best; }, null)?.b;

  // Computar aristas
  const edgePaths = EDGES.map(e => {
    const A = NODE_MAP[e.from], B = NODE_MAP[e.to];
    const cross = e.type === 'cross', fuera = e.type === 'fuera';
    const { d, mid } = ortho(anchor(A, e.fs), anchor(B, e.ts), e.fs, e.ts, e.via, e.at);
    const on = matches(A) && matches(B);
    return { d, mid, on, stroke: cross ? '#009ca6' : fuera ? '#a7b1b6' : '#7c878e', sw: cross ? 2.5 : 2, dash: cross ? '8 5' : fuera ? '4 5' : 'none', marker: cross ? 'url(#arw-teal)' : fuera ? 'url(#arw-light)' : 'url(#arw-slate)', label: e.label };
  });
  // Ciclos de rechazo
  const rejectLoops = NODES.filter(n => n.rechazo).map(n => {
    const x0 = n.x + n.w - 44, x1 = n.x + 44, y = n.y;
    return { d: `M${x0} ${y} L${x0} ${y - 40} L${x1} ${y - 40} L${x1} ${y + 1}`, on: matches(n), mid: [n.x + n.w / 2, y - 40], label: 'rechazo → corrección → reenvío', lfs: '10.5px' };
  });

  return (
    <div style={{ minWidth: 1200, height: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa', color: '#454d52' }} onKeyDown={e => { if (e.key === 'Escape') { if (state.glossaryOpen) setState(p => ({ ...p, glossaryOpen: false })); else if (state.searchOpen) setState(p => ({ ...p, searchOpen: false })); else if (state.panelOpen) closePanel(); } }}>
      {/* Header */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e6e8', flex: 'none', position: 'relative', zIndex: 60 }}>
        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 14, height: 58 }}>
          <button onClick={onGoHome} style={{ display: 'flex', alignItems: 'center', minHeight: 44, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'none' }}>
            <img src={entersysLogo} alt="Entersys" style={{ height: 26, display: 'block' }} />
          </button>
          <span style={{ width: 1, height: 24, background: '#e2e6e8' }} />
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c878e' }}>Portal KOF · Coordinadores de Seguridad</span>
            <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15, color: '#1c2838', whiteSpace: 'nowrap' }}>Mapa del proceso para Coordinadores de Seguridad</span>
          </div>
          <span style={{ flex: 1 }} />
          {/* Búsqueda */}
          <div style={{ position: 'relative', width: 340 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #cdd4d7', borderRadius: 8, background: '#ffffff', padding: '0 12px', height: 40 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#7c878e' }}>search</span>
              <input value={state.q} onChange={e => setState(p => ({ ...p, q: e.target.value, searchOpen: true }))} onFocus={() => setState(p => ({ ...p, searchOpen: true }))} onKeyDown={e => { if (e.key === 'Enter' && results.length) navigateNode(results[0].n.id); if (e.key === 'Escape') setState(p => ({ ...p, searchOpen: false })); }} placeholder="Buscar paso o documento, p. ej. SUA, DC3" style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13.5, fontFamily: 'inherit', color: '#1c2838', background: 'transparent', minWidth: 0 }} />
              {state.q && <button onClick={() => setState(p => ({ ...p, q: '', searchOpen: false }))} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#7c878e', display: 'flex', padding: 4, borderRadius: 6 }}><span className="material-symbols-rounded" style={{ fontSize: 17 }}>close</span></button>}
            </label>
            {state.searchOpen && state.q.trim().length >= 2 && (
              <div role="listbox" style={{ position: 'absolute', top: 46, left: 0, right: 0, background: '#ffffff', border: '1px solid #e2e6e8', borderRadius: 10, boxShadow: '0 8px 24px rgba(28,40,56,0.14)', overflow: 'hidden', maxHeight: 360, overflowY: 'auto', zIndex: 20 }}>
                {results.length === 0 ? (
                  <p style={{ margin: 0, padding: '12px 14px', fontSize: 13.5, color: '#5f696f' }}>Sin coincidencias.</p>
                ) : results.map(r => (
                  <button key={r.n.id} onClick={() => { navigateNode(r.n.id); setState(p => ({ ...p, searchOpen: false })); }} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%', textAlign: 'left', border: 'none', borderBottom: '1px solid #f1f3f4', background: '#ffffff', padding: '9px 13px', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e6f5f6'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                    <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#008089', marginTop: 1 }}>{r.icon}</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 13.5, color: '#1c2838' }}>{(r.n.tag ? r.n.tag + ' · ' : '') + r.n.title}</span>
                      <span style={{ display: 'block', fontSize: 12, color: '#5f696f', marginTop: 1 }}>{r.why}</span>
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#7c878e', whiteSpace: 'nowrap' }}>{STATIONS.find(s => s.id === r.n.st)?.short}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={onGoProcedimientos} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 40, padding: '0 12px', border: '1px solid #cdd4d7', borderRadius: 8, background: '#ffffff', color: '#1c2838', fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f1f3f4'; e.currentTarget.style.borderColor = '#a7b1b6'; }} onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cdd4d7'; }}>
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#008089' }}>list_alt_check</span>Procedimientos
          </button>
        </div>
      </header>

      {/* Barra estaciones + filtro */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e6e8', flex: 'none', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 50 }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {STATIONS.map(s => {
            const a = active && active.id === s.id;
            return (
              <button key={s.id} onClick={() => fitStation(s.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 10px', borderRadius: 999, border: `1px solid ${a ? '#1c2838' : '#cdd4d7'}`, background: a ? '#1c2838' : '#ffffff', color: a ? '#ffffff' : '#454d52', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { if (!a) e.currentTarget.style.borderColor = '#009ca6'; }} onMouseLeave={e => { if (!a) e.currentTarget.style.borderColor = '#cdd4d7'; }}>
                {s.n > 0 && <span style={{ width: 18, height: 18, borderRadius: '50%', background: a ? '#009ca6' : '#f1f3f4', color: a ? '#ffffff' : '#454d52', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700 }}>{s.n}</span>}
                {s.short}
              </button>
            );
          })}
        </nav>
        <span style={{ flex: 1 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5f696f' }}>Filtrar por intervención:</span>
          <div style={{ display: 'inline-flex', border: '1px solid #cdd4d7', borderRadius: 8, overflow: 'hidden', background: '#ffffff' }}>
            {VIEWS.map(v => {
              const p = state.view === v.id;
              return (
                <button key={v.id} onClick={() => setState(prev => ({ ...prev, view: v.id }))} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 30, padding: '0 10px', border: 'none', borderRight: '1px solid #e2e6e8', background: p ? '#1c2838' : '#ffffff', color: p ? '#ffffff' : '#454d52', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { if (!p) e.currentTarget.style.background = '#e6f5f6'; }} onMouseLeave={e => { if (!p) e.currentTarget.style.background = '#ffffff'; }}>
                  {v.id === 'coordinador' && <span className="material-symbols-rounded" style={{ fontSize: 16 }}>person_check</span>}
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {state.view === 'coordinador' && (
        <div style={{ flex: 'none', background: '#e6f5f6', borderBottom: '1px solid #b9e3e6', padding: '0 20px', height: 34, display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 13.5, color: '#00646b', position: 'relative', zIndex: 50 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 16 }}>person_check</span>
          El Coordinador de Seguridad interviene en 10 puntos del ciclo
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12.5, color: '#0b5560', marginLeft: 4 }}>· Los demás nodos se atenúan para conservar el contexto.</span>
        </div>
      )}

      {/* Lienzo */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
        <div
          ref={vpRef} tabIndex={0} role="application"
          aria-label="Lienzo del mapa del proceso. Se desplaza arrastrando o con las flechas del teclado."
          onPointerDown={onDown} onKeyDown={onCanvasKey}
          style={{ position: 'absolute', inset: 0, overflow: 'hidden', cursor: state.dragging ? 'grabbing' : 'grab', backgroundImage: 'radial-gradient(circle, #cdd4d7 1px, transparent 1.2px)', backgroundSize: '32px 32px', touchAction: 'none', userSelect: 'none' }}
        >
          <div style={{ position: 'absolute', left: 0, top: 0, width: 6500, height: 1080, transformOrigin: '0 0', transform: `translate(${state.tx}px,${state.ty}px) scale(${state.scale})`, transition: state.dragging ? 'none' : 'transform .28s cubic-bezier(.4,0,.2,1)', willChange: 'transform' }}>
            {/* Bandas de estación */}
            {bandList.map(s => (
              <div key={s.id} aria-hidden="true" style={{ position: 'absolute', left: s.bx, top: s.by, width: s.bw, height: s.bh, border: '1.5px dashed #cdd4d7', borderRadius: 18, background: 'rgba(255,255,255,0.55)' }}>
                <span style={{ position: 'absolute', left: 18, right: 18, bottom: 12, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15.5, color: '#1c2838', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                    {s.n > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: '#1c2838', color: '#ffffff', fontSize: 12, flex: 'none' }}>{s.n}</span>}
                    {s.label}
                  </span>
                  {s.note && <span style={{ fontSize: 12, color: '#5f696f', paddingLeft: s.n > 0 ? 30 : 0, whiteSpace: 'nowrap' }}>{s.note}</span>}
                </span>
              </div>
            ))}

            {/* SVG aristas */}
            <svg aria-hidden="true" width="6500" height="1080" viewBox="0 0 6500 1080" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' }}>
              <defs>
                <marker id="arw-slate" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#7c878e" /></marker>
                <marker id="arw-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#009ca6" /></marker>
                <marker id="arw-light" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#a7b1b6" /></marker>
              </defs>
              {edgePaths.map((e, i) => (
                <g key={i} style={{ opacity: e.on ? 1 : 0.28 }}>
                  <path d={e.d} fill="none" stroke={e.stroke} strokeWidth={e.sw} strokeDasharray={e.dash} markerEnd={e.marker} />
                  {e.label && <text x={e.mid[0]} y={e.mid[1] - 6} textAnchor="middle" fontSize="13" fontFamily="Inter,sans-serif" fontWeight="600" fill={e.stroke === '#009ca6' ? '#00646b' : '#454d52'} style={{ background: '#f4f6f7' }}>{e.label}</text>}
                </g>
              ))}
              {rejectLoops.map((e, i) => (
                <g key={'rl' + i} style={{ opacity: e.on ? 1 : 0.28 }}>
                  <path d={e.d} fill="none" stroke="#7c878e" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arw-slate)" />
                  <text x={e.mid[0]} y={e.mid[1]} textAnchor="middle" fontSize="10.5" fontFamily="Inter,sans-serif" fontWeight="600" fill="#5f696f">{e.label}</text>
                </g>
              ))}
            </svg>

            {/* Nodos */}
            {NODES.map(n => {
              const a = ACTORS[n.actor];
              const on = matches(n);
              const isSel = state.panelOpen && state.sel === n.id;
              const isHit = hits.has(n.id);
              const shadow = isSel ? '0 0 0 3px #1c2838, 0 8px 20px rgba(28,40,56,0.22)' : isHit ? '0 0 0 3px #c2a56d' : '0 1px 3px rgba(28,40,56,0.08)';
              const op = on ? 1 : 0.32;

              if (n.actor === 'decision') {
                return (
                  <button key={n.id} data-node-id={n.id} onClick={() => { if (suppressRef.current) return; openNode(n.id); }} style={{ position: 'absolute', left: n.x, top: n.y, width: n.w, height: n.h, border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', opacity: op, transition: 'opacity .2s' }}>
                    <span aria-hidden="true" style={{ position: 'absolute', inset: 24, transform: 'rotate(45deg)', background: '#ffffff', border: '2.5px solid #c2a56d', borderRadius: 10, boxShadow: shadow }} />
                    <span style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '0 30px', textAlign: 'center' }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#8a6a1d' }}>alt_route</span>
                      <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 12, lineHeight: 1.2, color: '#1c2838' }}>{n.label}</span>
                    </span>
                  </button>
                );
              }

              return (
                <button key={n.id} data-node-id={n.id} onClick={() => { if (suppressRef.current) return; openNode(n.id); }} style={{ position: 'absolute', left: n.x, top: n.y, width: n.w, height: n.h, boxSizing: 'border-box', textAlign: 'left', display: 'flex', flexDirection: 'column', padding: 0, borderRadius: 12, background: a.bg, border: `1.5px ${a.borderStyle} ${a.border}`, cursor: 'pointer', opacity: op, boxShadow: shadow, overflow: 'hidden', transition: 'opacity .2s, box-shadow .15s, transform .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 18px rgba(28,40,56,0.20)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = shadow; e.currentTarget.style.transform = 'none'; }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 10px 0', minWidth: 0 }}>
                    <span aria-hidden="true" style={{ flex: 'none', width: 26, height: 26, borderRadius: 7, background: a.chipBg, color: a.chipFg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 15 }}>{a.icon}</span>
                    </span>
                    <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                      <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1c2838', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.tag && n.tag !== a.label && n.tag !== a.short ? n.tag : a.short}</span>
                      {n.tag && n.tag !== a.label && n.tag !== a.short && <span style={{ fontSize: 9.5, fontWeight: 600, color: '#5f696f', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.short}</span>}
                    </span>
                  </span>
                  <span style={{ flex: 1, minHeight: 0, padding: '5px 10px 8px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14.5, lineHeight: 1.2, color: '#1c2838', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>{n.label}</span>
                  {n.interviene && (
                    <span style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 5, background: '#009ca6', color: '#ffffff', fontSize: 10.5, fontWeight: 700, padding: '0 10px', height: 24 }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 13 }}>person_check</span>
                      Interviene el Coordinador
                    </span>
                  )}
                  {isHit && <span style={{ position: 'absolute', top: -12, right: 10, display: 'inline-flex', alignItems: 'center', gap: 4, background: '#c2a56d', color: '#1c2838', fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 999 }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 12 }}>search</span>Coincidencia
                  </span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Leyenda */}
        <div style={{ position: 'absolute', left: 16, bottom: 16, zIndex: 20, background: '#ffffff', border: '1px solid #e2e6e8', borderRadius: 12, boxShadow: '0 4px 12px rgba(28,40,56,0.08)', width: state.legendOpen ? 'auto' : 132, overflow: 'hidden', transition: 'width .2s cubic-bezier(.4,0,.2,1)' }}>
          <button onClick={() => setState(p => ({ ...p, legendOpen: !p.legendOpen }))} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', border: 'none', background: '#ffffff', padding: '9px 13px', cursor: 'pointer', textAlign: 'left', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 13.5, color: '#1c2838', minHeight: 44 }}
            onMouseEnter={e => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#008089' }}>legend_toggle</span>
            <span style={{ flex: 1 }}>Leyenda</span>
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#7c878e' }}>{state.legendOpen ? 'expand_more' : 'expand_less'}</span>
          </button>
          {state.legendOpen && (
            <>
              <button onClick={() => setState(p => ({ ...p, glossaryOpen: true }))} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', border: 'none', borderTop: '1px solid #e2e6e8', background: '#ffffff', padding: '7px 13px', cursor: 'pointer', textAlign: 'left', fontSize: 12.5, fontWeight: 600, color: '#008089', minHeight: 38 }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e6f5f6'; e.currentTarget.style.color = '#00646b'; }} onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#008089'; }}>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>spellcheck</span>
                Glosario (NSS, RFC, SUA, DC3, OC…)
              </button>
              <div style={{ borderTop: '1px solid #e2e6e8', padding: '8px 13px 10px', display: 'grid', gridTemplateColumns: 'auto auto', gap: '6px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7c878e' }}>Actores</p>
                  {['contratista', 'coordinador', 'sistema', 'resultado', 'fuera'].map(k => (
                    <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#454d52', whiteSpace: 'nowrap' }}>
                      <span style={{ width: 26, height: 17, borderRadius: 5, background: ACTORS[k].bg, border: `1.5px ${ACTORS[k].borderStyle} ${ACTORS[k].border}`, boxSizing: 'border-box', flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-rounded" style={{ fontSize: 12, color: ACTORS[k].border }}>{ACTORS[k].icon}</span>
                      </span>
                      {ACTORS[k].label}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7c878e' }}>Símbolos</p>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, whiteSpace: 'nowrap' }}><span style={{ width: 26, height: 17, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#009ca6', borderRadius: 5 }}><span className="material-symbols-rounded" style={{ fontSize: 12, color: '#ffffff' }}>person_check</span></span>Intervención del Coordinador</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, whiteSpace: 'nowrap' }}><span style={{ width: 26, height: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><span style={{ width: 11, height: 11, transform: 'rotate(45deg)', border: '2px solid #c2a56d', borderRadius: 2, background: '#ffffff' }} /></span>Decisión (sí / no)</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, whiteSpace: 'nowrap' }}><svg width="26" height="17"><line x1="0" y1="8" x2="26" y2="8" stroke="#7c878e" strokeWidth="2" /></svg>Flujo principal</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, whiteSpace: 'nowrap' }}><svg width="26" height="17"><line x1="0" y1="8" x2="26" y2="8" stroke="#009ca6" strokeWidth="2" strokeDasharray="5 3" /></svg>Conexión entre procesos</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Zoom */}
        <div style={{ position: 'absolute', right: state.panelOpen ? PANEL_W + 16 : 16, bottom: 16, zIndex: 20, display: 'flex', alignItems: 'center', gap: 5, background: '#ffffff', border: '1px solid #e2e6e8', borderRadius: 10, boxShadow: '0 4px 12px rgba(28,40,56,0.08)', padding: 4, transition: 'right .28s cubic-bezier(.4,0,.2,1)' }}>
          {[['remove', 1 / 1.25, 'Alejar'], ['add', 1.25, 'Acercar']].map(([icon, f, label], i) => (
            <button key={icon} onClick={() => zoomCenter(f)} aria-label={label} style={{ width: 38, height: 38, border: 'none', background: 'transparent', borderRadius: 8, cursor: 'pointer', color: '#1c2838', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>{icon}</span>
            </button>
          ))}
          <button onClick={() => setState(prev => { const vw = prev.vw - (prev.panelOpen ? PANEL_W : 0); return { ...prev, scale: 1, tx: vw / 2 - (6500 / 2), ty: prev.vh / 2 - (1080 / 2) }; })} style={{ minWidth: 52, height: 38, border: 'none', background: 'transparent', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13, color: '#1c2838' }} onMouseEnter={e => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{Math.round(state.scale * 100)} %</button>
          <span style={{ width: 1, height: 24, background: '#e2e6e8' }} />
          <button onClick={fitAll} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 38, padding: '0 10px', border: 'none', borderRadius: 8, background: '#1c2838', color: '#ffffff', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background = '#26374b'} onMouseLeave={e => e.currentTarget.style.background = '#1c2838'}>
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>fit_screen</span>Ajustar
          </button>
        </div>

        {/* Panel lateral */}
        {state.panelOpen && (
          <aside ref={panelRef} tabIndex={-1} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: PANEL_W, background: '#ffffff', borderLeft: '1px solid #e2e6e8', boxShadow: '-8px 0 24px rgba(28,40,56,0.10)', zIndex: 30, display: 'flex', flexDirection: 'column' }}>
            <NodePanel nodeId={state.sel} onClose={closePanel} onNavigate={navigateNode} view={state.view} />
          </aside>
        )}

        {/* Glosario */}
        {state.glossaryOpen && (
          <div onClick={() => setState(p => ({ ...p, glossaryOpen: false }))} style={{ position: 'absolute', inset: 0, background: 'rgba(28,40,56,0.5)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Glosario" style={{ width: 520, maxHeight: '80%', background: '#ffffff', borderRadius: 14, boxShadow: '0 16px 40px rgba(28,40,56,0.25)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '1px solid #e2e6e8' }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#008089' }}>menu_book</span>
                <h2 style={{ margin: 0, flex: 1, fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 19, color: '#1c2838' }}>Glosario rápido</h2>
                <button onClick={() => setState(p => ({ ...p, glossaryOpen: false }))} style={{ width: 38, height: 38, border: 'none', background: 'transparent', borderRadius: 8, cursor: 'pointer', color: '#5f696f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 20 }}>close</span>
                </button>
              </div>
              <div style={{ overflowY: 'auto', padding: '6px 18px 18px' }}>
                {GLOSSARY.map(g => (
                  <div key={g.term} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid #f1f3f4' }}>
                    <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14.5, color: '#1c2838' }}>{g.term}</span>
                    <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#454d52' }}>{g.def}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer ayuda */}
      <footer id="ayuda" style={{ flex: 'none', background: '#093d53', color: '#fafafa', padding: '0 20px', height: 54, display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 60 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#7fccd1' }}>support_agent</span>
        <p style={{ margin: 0, fontSize: 13.5, color: '#ffffff' }}><strong style={{ fontFamily: "'Titillium Web', sans-serif" }}>¿Alguna duda?</strong> <span style={{ color: '#c9d2da' }}>Entersys acompaña el proceso. Solo en horario hábil.</span></p>
        <span style={{ flex: 1 }} />
        <a href="mailto:soporte@entersys.mx" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 8, padding: '0 12px', height: 36, color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
          <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#7fccd1' }}>mail</span>soporte@entersys.mx
        </a>
        <a href="https://wa.me/5256258366" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 8, padding: '0 12px', height: 36, color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
          <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#7fccd1' }}>chat</span>WA +52 56 2568 3662
        </a>
      </footer>
    </div>
  );
}

// ── Tutorial ──────────────────────────────────────────────────────
const TUTORIAL_STEPS = [
  { icon: 'account_tree', title: 'Mapa del proceso para Coordinadores de Seguridad', body: 'Este mapa interactivo muestra el ciclo completo de gestión de un tercero contratista en KOF: desde el Onboarding hasta el cierre del trabajo de alto riesgo.' },
  { icon: 'touch_app', title: 'Haz clic en cualquier paso para ver sus detalles', body: 'Al seleccionar un nodo verás su descripción, quién lo ejecuta, qué valida el Coordinador, los documentos que aplican y los recursos de apoyo (videos y manuales).' },
  { icon: 'person_check', title: 'Filtra por intervención del Coordinador', body: 'Usa el filtro "Solo Coordinador" para resaltar únicamente los pasos en los que tú intervienes directamente. Los demás nodos se atenúan para mantener el contexto.' },
  { icon: 'view_column', title: 'Navega entre las 6 estaciones del proceso', body: 'El proceso está dividido en 6 estaciones. Usa las pestañas para ir directo a una estación, o usa el zoom y el arrastre para explorar el mapa completo.' },
];

function TutorialModal({ onClose }) {
  const [step, setStep] = useState(0);
  const s = TUTORIAL_STEPS[step];
  const isLast = step === TUTORIAL_STEPS.length - 1;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(28,40,56,0.80)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#ffffff', borderRadius: 16, maxWidth: 480, width: '100%', overflow: 'hidden', boxShadow: '0 20px 60px rgba(28,40,56,0.35)' }}>
        <div style={{ background: '#1c2838', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 28, color: '#7fccd1', flex: 'none' }}>{s.icon}</span>
          <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#dcc9a1' }}>
            Tutorial · Paso {step + 1} de {TUTORIAL_STEPS.length}
          </span>
        </div>
        <div style={{ padding: '24px 24px 16px' }}>
          <h2 style={{ margin: '0 0 12px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 19, lineHeight: 1.3, color: '#1c2838' }}>{s.title}</h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#454d52' }}>{s.body}</p>
        </div>
        <div style={{ padding: '0 24px 16px', display: 'flex', gap: 6 }}>
          {TUTORIAL_STEPS.map((_, i) => (
            <button key={i} onClick={() => setStep(i)} style={{ width: i === step ? 20 : 8, height: 8, borderRadius: 999, background: i === step ? '#009ca6' : '#e2e6e8', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.2s, background 0.2s' }} />
          ))}
        </div>
        <div style={{ borderTop: '1px solid #e2e6e8', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5f696f', fontSize: 14, fontWeight: 600, padding: '8px 4px', fontFamily: 'inherit' }}>
            Saltar tutorial
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#f1f3f4', color: '#1c2838', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                <span className="material-symbols-rounded" style={{ fontSize: 17 }}>arrow_back</span>
                Anterior
              </button>
            )}
            <button onClick={() => isLast ? onClose() : setStep(s => s + 1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#009ca6', color: '#ffffff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Titillium Web', sans-serif" }}>
              {isLast ? 'Comenzar' : 'Siguiente'}
              <span className="material-symbols-rounded" style={{ fontSize: 17 }}>{isLast ? 'check' : 'arrow_forward'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TutorialPrompt({ onView, onSkip }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(28,40,56,0.60)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
    <div style={{ background: '#1c2838', color: '#ffffff', borderRadius: 14, padding: '24px 24px', width: 320, boxShadow: '0 12px 40px rgba(28,40,56,0.45)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#7fccd1', flex: 'none' }}>school</span>
        <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>¿Ver el tutorial del mapa?</span>
      </div>
      <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.5, color: '#c9d2da' }}>Aprende a navegar el proceso en 4 pasos rápidos.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onSkip} style={{ flex: 1, background: 'rgba(255,255,255,0.10)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.20)', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          Saltar
        </button>
        <button onClick={onView} style={{ flex: 1, background: '#009ca6', color: '#ffffff', border: 'none', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Titillium Web', sans-serif" }}>
          Ver tutorial
        </button>
      </div>
    </div>
    </div>
  );
}

// ── Componente principal: elige vista según ancho ─────────────────
export default function MapaCoordinadores({ onGoHome, onGoProcedimientos }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const [tutorialState, setTutorialState] = useState('prompt'); // 'prompt' | 'tutorial' | 'done'

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <>
      {isMobile
        ? <MobileView onGoHome={onGoHome} onGoProcedimientos={onGoProcedimientos} />
        : <DesktopCanvas onGoHome={onGoHome} onGoProcedimientos={onGoProcedimientos} />
      }
      {tutorialState === 'prompt' && (
        <TutorialPrompt
          onView={() => setTutorialState('tutorial')}
          onSkip={() => setTutorialState('done')}
        />
      )}
      {tutorialState === 'tutorial' && (
        <TutorialModal onClose={() => setTutorialState('done')} />
      )}
    </>
  );
}
