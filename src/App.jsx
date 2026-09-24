import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StepList from './components/StepList';
import StepDetail from './components/StepDetail';
import HelpSection from './components/HelpSection';
import Footer from './components/Footer';
import MascotaWidget from './components/MascotaWidget';
import FAQ from './components/FAQ';
import IntroSection from './components/IntroSection';
import MapaCoordinadores from './components/MapaCoordinadores';
import ProcedimientosKOF from './components/ProcedimientosKOF';
import { STEPS } from './data/steps';

const FECHA_REVISION = 'julio 2025';
const LS_SEEN = 'kof_seen';
const LS_DOCS = 'kof_docs';

function loadSeen() {
  try { return JSON.parse(localStorage.getItem(LS_SEEN)) || []; } catch { return []; }
}
function loadDocs() {
  try { return JSON.parse(localStorage.getItem(LS_DOCS)) || {}; } catch { return {}; }
}

function getViewFromPath() {
  const p = window.location.pathname;
  if (p === '/coordinadores/mapa' || p === '/coordinadores/mapa') return 'mapa';
  return 'home';
}

export default function App() {
  const [view, setView] = useState(() => getViewFromPath());
  const [stepN, setStepN] = useState(null);
  const [seen, setSeen] = useState(loadSeen);
  const [docs, setDocs] = useState(loadDocs);
  const [q, setQ] = useState('');

  useEffect(() => {
    const handler = () => setView(getViewFromPath());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_SEEN, JSON.stringify(seen));
  }, [seen]);

  useEffect(() => {
    localStorage.setItem(LS_DOCS, JSON.stringify(docs));
  }, [docs]);

  function openStep(n) {
    setSeen(prev => prev.includes(n) ? prev : [...prev, n]);
    setStepN(n);
    setView('step');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goHome() {
    window.history.pushState({}, '', '/');
    setView('home');
    setStepN(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goFaq() {
    setView('faq');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goIntro() {
    setView('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goMapa() {
    window.history.pushState({}, '', '/coordinadores/mapa');
    setView('mapa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goProcedimientos() {
    setView('procedimientos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToStep(n) {
    if (n < 1 || n > STEPS.length) return;
    openStep(n);
  }

  function toggleDoc(key) {
    setDocs(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function handleStart() {
    const firstPending = STEPS.find(s => {
      const dc = s.docs.reduce((acc, _, i) => acc + (docs[`${s.n}-${i}`] ? 1 : 0), 0);
      return dc < s.docs.length;
    });
    if (firstPending) {
      openStep(firstPending.n);
    } else {
      document.getElementById('proceso')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (view === 'faq') {
    return (
      <>
        <Header onGoHome={goHome} q={q} onQ={setQ} onGoFaq={goFaq} onGoIntro={goIntro} onGoMapa={goMapa} />
        <FAQ onGoHome={goHome} />
        <Footer fechaRevision={FECHA_REVISION} />
      </>
    );
  }

  if (view === 'intro') {
    return (
      <>
        <Header onGoHome={goHome} q={q} onQ={setQ} onGoFaq={goFaq} onGoIntro={goIntro} onGoMapa={goMapa} />
        <IntroSection onGoHome={goHome} />
        <Footer fechaRevision={FECHA_REVISION} />
      </>
    );
  }

  if (view === 'mapa') {
    return (
      <MapaCoordinadores onGoHome={goHome} onGoProcedimientos={goProcedimientos} />
    );
  }

  if (view === 'procedimientos') {
    return (
      <ProcedimientosKOF onGoHome={goHome} onGoMapa={goMapa} />
    );
  }

  if (view === 'step' && stepN) {
    return (
      <>
        <Header onGoHome={goHome} q={q} onQ={setQ} onGoFaq={goFaq} onGoIntro={goIntro} onGoMapa={goMapa} />
        <MascotaWidget />
        <StepDetail
          stepN={stepN}
          docs={docs}
          onToggleDoc={toggleDoc}
          onGoHome={goHome}
          onGoStep={goToStep}
          fechaRevision={FECHA_REVISION}
        />
        <HelpSection />
        <Footer fechaRevision={FECHA_REVISION} />
      </>
    );
  }

  return (
    <>
      <Header onGoHome={goHome} q={q} onQ={setQ} onGoFaq={goFaq} onGoIntro={goIntro} onGoMapa={goMapa} />
      <Hero onStart={handleStart} fechaRevision={FECHA_REVISION} />
      <StepList
        seen={seen}
        docs={docs}
        onOpenStep={openStep}
        q={q}
        fechaRevision={FECHA_REVISION}
      />
      <HelpSection />
      <Footer fechaRevision={FECHA_REVISION} />
      <MascotaWidget />
    </>
  );
}
