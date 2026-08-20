import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StepList from './components/StepList';
import StepDetail from './components/StepDetail';
import HelpSection from './components/HelpSection';
import Footer from './components/Footer';
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

export default function App() {
  const [view, setView] = useState('home');      // 'home' | 'step'
  const [stepN, setStepN] = useState(null);
  const [seen, setSeen] = useState(loadSeen);
  const [docs, setDocs] = useState(loadDocs);
  const [q, setQ] = useState('');

  const topRef = useRef(null);

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
    setView('home');
    setStepN(null);
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
    // Scroll to first pending step or first step
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

  if (view === 'step' && stepN) {
    const step = STEPS.find(s => s.n === stepN);
    return (
      <>
        <Header onGoHome={goHome} q={q} onQ={setQ} />
        <StepDetail
          step={step}
          docs={docs}
          onToggleDoc={toggleDoc}
          onGoBack={goHome}
          onGoToStep={goToStep}
          totalSteps={STEPS.length}
        />
        <HelpSection />
        <Footer fechaRevision={FECHA_REVISION} />
      </>
    );
  }

  return (
    <>
      <Header onGoHome={goHome} q={q} onQ={setQ} />
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
    </>
  );
}
