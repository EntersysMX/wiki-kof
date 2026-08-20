import { STEPS } from '../data/steps';

function getStepState(step, seen, docs) {
  const doneCount = step.docs.reduce((acc, _, i) => acc + (docs[`${step.n}-${i}`] ? 1 : 0), 0);
  const isDone = doneCount === step.docs.length;
  const isStarted = !isDone && (seen.includes(step.n) || doneCount > 0);
  return { isDone, isStarted, doneCount };
}

export default function StepList({ seen, docs, onOpenStep, q, fechaRevision }) {
  const filtered = q.trim()
    ? STEPS.filter(s => (s.title + ' ' + s.short).toLowerCase().includes(q.trim().toLowerCase()))
    : STEPS;

  const completedCount = STEPS.filter(s => {
    const dc = s.docs.reduce((acc, _, i) => acc + (docs[`${s.n}-${i}`] ? 1 : 0), 0);
    return dc === s.docs.length;
  }).length;

  const firstPending = STEPS.find(s => {
    const dc = s.docs.reduce((acc, _, i) => acc + (docs[`${s.n}-${i}`] ? 1 : 0), 0);
    return dc < s.docs.length;
  });

  return (
    <main style={{ flex: 1 }}>
      <section id="proceso" style={{ padding: '40px 16px 8px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{
            margin: '0 0 6px',
            fontFamily: "'Titillium Web', sans-serif", fontWeight: 700,
            fontSize: 'clamp(22px, 4vw, 28px)', color: '#1c2838',
          }}>
            El proceso completo, en orden
          </h2>
          <p style={{ margin: '0 0 6px', fontSize: 15, lineHeight: 1.6, color: '#5f696f' }}>
            Complétalo paso por paso: cada uno es requisito del siguiente. Puedes entrar a cualquier paso para consultar sus documentos y recursos.
          </p>
          <p style={{ margin: '0 0 24px', fontSize: 13, color: '#7c878e', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 16, color: '#2f9e6f', flexShrink: 0 }}>verified</span>
            <span>Contenido vigente · última revisión: {fechaRevision}</span>
          </p>

          {filtered.length === 0 && (
            <p style={{ margin: '0 0 24px', padding: 16, background: '#f1f3f4', borderRadius: 10, fontSize: 14, color: '#5f696f' }}>
              No encontramos pasos con ese texto. Borra la búsqueda para ver los 7 pasos.
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.map((step, idx) => {
              const { isDone, isStarted, doneCount } = getStepState(step, seen, docs);
              const isCurrent = firstPending && step.n === firstPending.n;

              let circBg = '#ffffff', circColor = '#5f696f', circBorder = '#cdd4d7';
              let chipBg = '#f1f3f4', chipColor = '#454d52', statusLabel = 'Pendiente', chipIcon = '';

              if (isStarted) {
                circColor = '#00646b'; circBorder = '#009ca6';
                chipBg = '#e6f5f6'; chipColor = '#00646b';
                statusLabel = `En progreso: ${doneCount} de ${step.docs.length}`;
                chipIcon = 'timelapse';
              }
              if (isDone) {
                circBg = '#009ca6'; circColor = '#ffffff'; circBorder = '#009ca6';
                chipBg = '#e6f5f6'; chipColor = '#00646b';
                statusLabel = 'Completado'; chipIcon = 'check_circle';
              }
              if (isCurrent && !isDone) {
                chipBg = '#1c2838'; chipColor = '#ffffff';
                statusLabel = isStarted ? `Sigue aquí: ${doneCount} de ${step.docs.length}` : 'Sigue aquí';
                chipIcon = '';
              }

              const nVids = step.resources.filter(r => r.type === 'video').length;
              const meta = `${step.docs.length} ${step.docs.length === 1 ? 'documento' : 'documentos'} · 1 manual${nVids ? ` · ${nVids} ${nVids === 1 ? 'video' : 'videos'}` : ''}`;

              return (
                <div key={step.n} style={{ display: 'flex', gap: 14 }}>
                  {/* Timeline column */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
                    <div aria-hidden="true" style={{
                      width: 40, height: 40, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 17,
                      background: circBg, color: circColor,
                      border: `2px solid ${circBorder}`, boxSizing: 'border-box',
                    }}>
                      {isDone
                        ? <span className="material-symbols-rounded" style={{ fontSize: 22 }}>check</span>
                        : step.n
                      }
                    </div>
                    {idx < filtered.length - 1 && (
                      <div aria-hidden="true" style={{ width: 2, flex: 1, minHeight: 16, background: '#e2e6e8' }} />
                    )}
                  </div>

                  {/* Card */}
                  <button
                    onClick={() => onOpenStep(step.n)}
                    style={{
                      flex: 1, textAlign: 'left',
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      background: '#ffffff',
                      border: `1px solid ${isCurrent && !isDone ? '#009ca6' : '#e2e6e8'}`,
                      borderRadius: 12, padding: 16, marginBottom: 12,
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(28,40,56,0.05)',
                      transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#009ca6';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(28,40,56,0.10)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = isCurrent && !isDone ? '#009ca6' : '#e2e6e8';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(28,40,56,0.05)';
                    }}
                  >
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 16, color: '#1c2838' }}>
                          {step.title}
                        </span>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                          padding: '3px 8px', borderRadius: 999,
                          background: chipBg, color: chipColor,
                        }}>
                          {chipIcon && <span className="material-symbols-rounded" style={{ fontSize: 13 }} aria-hidden="true">{chipIcon}</span>}
                          {statusLabel}
                        </span>
                      </span>
                      <span style={{ display: 'block', fontSize: 14, lineHeight: 1.55, color: '#5f696f' }}>{step.short}</span>
                      <span style={{ display: 'block', marginTop: 6, fontSize: 12.5, color: '#7c878e' }}>{meta}</span>
                    </span>
                    <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 22, color: '#a7b1b6', flexShrink: 0, marginTop: 2 }}>
                      chevron_right
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
