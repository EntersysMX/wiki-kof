import { STEPS } from '../data/steps';

function completedCountFor(step, docs) {
  return step.docs.reduce((acc, _, i) => acc + (docs[`${step.n}-${i}`] ? 1 : 0), 0);
}

export default function StepDetail({ stepN, docs, seen, onToggleDoc, onGoHome, onGoStep, fechaRevision }) {
  const step = STEPS[stepN - 1];
  const completedCount = STEPS.filter(s => completedCountFor(s, docs) === s.docs.length).length;
  const doneCount = completedCountFor(step, docs);

  return (
    <main style={{ flex: 1 }}>
      {/* Progress bar header */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e6e8' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '12px 16px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={onGoHome}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                border: 'none', background: 'transparent', color: '#008089',
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
                padding: '8px 10px 8px 4px', borderRadius: 8, minHeight: 40,
                transition: 'background var(--dur-base), color var(--dur-base)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e6f5f6'; e.currentTarget.style.color = '#00646b'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#008089'; }}
            >
              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20 }}>arrow_back</span>
              Todos los pasos
            </button>
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14, color: '#1c2838' }}>
              Paso {stepN} de 7
            </span>
          </div>

          {/* Progress bar */}
          <div
            role="progressbar"
            aria-valuemin={0} aria-valuemax={7} aria-valuenow={completedCount}
            aria-label="Pasos completados"
            style={{ height: 6, borderRadius: 999, background: '#e2e6e8', margin: '8px 0 4px', overflow: 'hidden' }}
          >
            <div style={{
              height: '100%', borderRadius: 999, background: '#009ca6',
              width: `${Math.round(completedCount / 7 * 100)}%`,
              transition: 'width var(--dur-slow)',
            }} />
          </div>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: '#7c878e' }}>
            {completedCount} de 7 pasos completados — un paso cuenta como completado cuando marcas toda su lista.
          </p>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {STEPS.map(s => {
              const isDone = completedCountFor(s, docs) === s.docs.length;
              const isCurrent = s.n === stepN;
              let bg = '#ffffff', color = '#5f696f', border = '#cdd4d7';
              if (isDone && !isCurrent) { bg = '#009ca6'; color = '#ffffff'; border = '#009ca6'; }
              if (isCurrent) { bg = '#1c2838'; color = '#ffffff'; border = '#1c2838'; }

              return (
                <button
                  key={s.n}
                  onClick={() => onGoStep(s.n)}
                  aria-label={`Ir al paso ${s.n}: ${s.title}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  title={s.title}
                  style={{
                    flexShrink: 0, width: 34, height: 34, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 14,
                    cursor: 'pointer', background: bg, color, border: `2px solid ${border}`,
                    boxSizing: 'border-box', transition: 'border-color var(--dur-fast)',
                  }}
                  onMouseEnter={e => !isCurrent && (e.currentTarget.style.borderColor = '#009ca6')}
                  onMouseLeave={e => !isCurrent && (e.currentTarget.style.borderColor = isDone ? '#009ca6' : '#cdd4d7')}
                >
                  {isDone && !isCurrent
                    ? <span className="material-symbols-rounded" style={{ fontSize: 17 }}>check</span>
                    : s.n
                  }
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step content */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '28px 16px 8px' }}>
        {step.badge && (
          <p style={{ margin: '0 0 10px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#f2ead9', color: '#7a6023',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
              padding: '5px 10px', borderRadius: 999,
            }}>
              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 15 }}>event_repeat</span>
              {step.badge}
            </span>
          </p>
        )}

        <h1 style={{
          margin: '0 0 8px',
          fontFamily: "'Titillium Web', sans-serif", fontWeight: 700,
          fontSize: 'clamp(26px, 5vw, 36px)', lineHeight: 1.15, color: '#1c2838',
        }}>
          {step.title}
        </h1>
        <p style={{ margin: '0 0 18px', fontSize: 13, color: '#7c878e', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 16, flexShrink: 0 }}>update</span>
          <span>Última actualización: {fechaRevision}</span>
        </p>
        <p style={{ margin: '0 0 22px', fontSize: 16, lineHeight: 1.65, color: '#454d52' }}>{step.desc}</p>

        {/* Warning box */}
        <div role="note" style={{
          display: 'flex', gap: 12,
          background: '#fdf6e7', border: '1px solid #ecd9ab',
          borderRadius: 12, padding: 16, margin: '0 0 22px',
        }}>
          <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 24, color: '#8a6a1d', flexShrink: 0 }}>warning</span>
          <div>
            <p style={{ margin: '0 0 4px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15, color: '#5f4a12' }}>
              Importante: si omites este paso
            </p>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#5c4a15' }}>{step.warn}</p>
          </div>
        </div>

        {/* Info box */}
        {step.info && (
          <div role="note" style={{
            display: 'flex', gap: 12,
            background: '#e6f5f6', border: '1px solid #b9e3e6',
            borderRadius: 12, padding: 16, margin: '0 0 22px',
          }}>
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 24, color: '#00646b', flexShrink: 0 }}>info</span>
            <div>
              <p style={{ margin: '0 0 4px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15, color: '#084c52' }}>
                Toma en cuenta
              </p>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#0b5560' }}>{step.info}</p>
            </div>
          </div>
        )}

        {/* Docs checklist */}
        <section style={{
          background: '#ffffff', border: '1px solid #e2e6e8',
          borderRadius: 12, boxShadow: '0 1px 3px rgba(28,40,56,0.05)',
          margin: '0 0 26px', overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 16px', borderBottom: '1px solid #e2e6e8', background: '#fafafa',
          }}>
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 20, color: '#008089' }}>checklist</span>
            <h2 style={{ margin: 0, flex: 1, fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 16, color: '#1c2838' }}>
              {step.docsLabel}
            </h2>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#5f696f' }}>{doneCount} de {step.docs.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {step.docs.map((label, i) => {
              const key = `${stepN}-${i}`;
              const done = !!docs[key];
              return (
                <button
                  key={i}
                  onClick={() => onToggleDoc(key)}
                  role="checkbox"
                  aria-checked={done}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    width: '100%', textAlign: 'left',
                    background: 'transparent', border: 'none',
                    borderBottom: '1px solid #f1f3f4',
                    padding: '13px 16px', minHeight: 48, cursor: 'pointer',
                    transition: 'background var(--dur-fast)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 24, flexShrink: 0, color: done ? '#008089' : '#a7b1b6' }}>
                    {done ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span style={{ flex: 1, minWidth: 0, fontSize: 15, lineHeight: 1.55, paddingTop: 1, color: done ? '#7c878e' : '#1c2838' }}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
          <p style={{ margin: 0, padding: '10px 16px', fontSize: 12.5, color: '#7c878e', background: '#fafafa' }}>
            Marca lo que ya tengas listo: al completar la lista, el paso se marca como completado. Tu avance se guarda solo en este dispositivo.
          </p>
        </section>

        {/* Resources */}
        <h2 style={{ margin: '0 0 4px', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 20, color: '#1c2838' }}>
          Manuales y videos de este paso
        </h2>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: '#5f696f', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 16, flexShrink: 0 }}>open_in_new</span>
          <span>Se abren en una pestaña nueva.</span>
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 14, alignItems: 'start', margin: '0 0 30px',
        }}>
          {step.resources.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', flexDirection: 'column',
                background: '#ffffff', border: '1px solid #e2e6e8',
                borderRadius: 12, overflow: 'hidden', textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(28,40,56,0.05)',
                transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#009ca6';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(28,40,56,0.10)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e6e8';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(28,40,56,0.05)';
              }}
            >
              <span style={{ display: 'flex', gap: 12, padding: 14, alignItems: 'flex-start' }}>
                <span aria-hidden="true" style={{
                  flexShrink: 0, width: 46, height: 46, borderRadius: 10,
                  background: '#e6f5f6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 26, color: '#00646b' }}>
                    {r.type === 'pdf' ? 'picture_as_pdf' : 'smart_display'}
                  </span>
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    display: 'block',
                    fontFamily: "'Titillium Web', sans-serif", fontWeight: 700,
                    fontSize: 15, lineHeight: 1.3, color: '#1c2838',
                  }}>{r.name}</span>
                  <span style={{ display: 'block', marginTop: 4, fontSize: 12.5, color: '#5f696f' }}>
                    {r.type === 'video' ? 'Video tutorial · YouTube · pestaña nueva' : 'Manual PDF · Google Drive · pestaña nueva'}
                  </span>
                </span>
                <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 18, color: '#008089', flexShrink: 0 }}>open_in_new</span>
              </span>
            </a>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <nav aria-label="Navegación entre pasos" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '0 0 34px' }}>
          {stepN > 1 && (
            <button
              onClick={() => onGoStep(stepN - 1)}
              style={{
                flex: 1, minWidth: 200,
                display: 'flex', alignItems: 'center', gap: 10,
                background: '#ffffff', border: '1px solid #cdd4d7',
                borderRadius: 10, padding: '12px 16px', textAlign: 'left',
                cursor: 'pointer', minHeight: 60,
                transition: 'border-color var(--dur-base), background var(--dur-base)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#009ca6'; e.currentTarget.style.background = '#fafafa'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#cdd4d7'; e.currentTarget.style.background = '#ffffff'; }}
            >
              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 22, color: '#5f696f' }}>arrow_back</span>
              <span>
                <span style={{ display: 'block', fontSize: 12, color: '#7c878e', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Paso anterior</span>
                <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15, color: '#1c2838' }}>
                  {STEPS[stepN - 2].title}
                </span>
              </span>
            </button>
          )}
          {stepN < 7 ? (
            <button
              onClick={() => onGoStep(stepN + 1)}
              style={{
                flex: 1, minWidth: 200,
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10,
                background: '#009ca6', border: 'none',
                borderRadius: 10, padding: '12px 16px', textAlign: 'right',
                cursor: 'pointer', minHeight: 60,
                transition: 'background var(--dur-base)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#008089'}
              onMouseLeave={e => e.currentTarget.style.background = '#009ca6'}
            >
              <span>
                <span style={{ display: 'block', fontSize: 12, color: '#b9e3e6', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Paso siguiente</span>
                <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15, color: '#ffffff' }}>
                  {STEPS[stepN].title}
                </span>
              </span>
              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 22, color: '#ffffff' }}>arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={onGoHome}
              style={{
                flex: 1, minWidth: 200,
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10,
                background: '#1c2838', border: 'none',
                borderRadius: 10, padding: '12px 16px', textAlign: 'right',
                cursor: 'pointer', minHeight: 60,
                transition: 'background var(--dur-base)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#26374b'}
              onMouseLeave={e => e.currentTarget.style.background = '#1c2838'}
            >
              <span>
                <span style={{ display: 'block', fontSize: 12, color: '#8b98a5', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Fin del recorrido</span>
                <span style={{ display: 'block', fontFamily: "'Titillium Web', sans-serif", fontWeight: 700, fontSize: 15, color: '#ffffff' }}>
                  Volver al mapa del proceso
                </span>
              </span>
              <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 22, color: '#ffffff' }}>map</span>
            </button>
          )}
        </nav>
      </article>
    </main>
  );
}
