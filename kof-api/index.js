import express from 'express';
import Anthropic from '@anthropic-ai/sdk';

const app  = express();
const PORT = process.env.PORT || 3100;

app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  next();
});
app.options('*', (_req, res) => res.sendStatus(204));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// In-memory session store: sessionId -> Message[]
// Bounded to 20 turns per session, cleaned up after 4 hours of inactivity
const sessions = new Map();
const SESSION_TTL_MS = 4 * 60 * 60 * 1000;

function getSession(id) {
  const now = Date.now();
  const entry = sessions.get(id) ?? { messages: [], lastSeen: now };
  entry.lastSeen = now;
  sessions.set(id, entry);
  return entry.messages;
}

// Purge stale sessions every 30 min
setInterval(() => {
  const cutoff = Date.now() - SESSION_TTL_MS;
  for (const [id, entry] of sessions) {
    if (entry.lastSeen < cutoff) sessions.delete(id);
  }
}, 30 * 60 * 1000);

const SYSTEM = `Eres Júpiter 🐾, la mascota y guía oficial del portal wiki-kof de Entersys.
Tu misión: ayudar a contratistas a completar los 7 pasos del proceso de validación para operar en plantas de Coca-Cola FEMSA (KOF).

## Tu personalidad
- Amigable, directo y muy práctico. Sin rodeos.
- Respondes en español, máximo 3 oraciones por respuesta.
- Si el usuario pregunta algo fuera del proceso KOF, lo rediriges amablemente.

## El proceso de validación tiene 7 pasos:

### Paso 1 — Documentación General
Alta legal y de seguridad de la empresa. Se hace una sola vez pero debe mantenerse vigente.
Documentos: Declaración Jurada, REPSE, Cédula SUA, Pago SUA, ID del representante legal, Opinión de cumplimiento IMSS, Última declaración de Grado de Riesgo.
⚠️ Sin este paso NO puedes dar de alta ningún proyecto.

### Paso 2 — Alta de Proyecto
Registra cada trabajo antes de ejecutarlo con su Orden de Compra o Servicio.
Documentos: Evidencia de la Orden de Compra o Servicio.
⚠️ Sin adjuntar la OC/OS el proyecto no puede validarse. Si es garantía, usa el sufijo _G en la OC.

### Paso 3 — Listado de Personal
Registra a tus trabajadores con sus competencias y estado de salud, y asócialos al proyecto.
Documentos por colaborador: DC-3, Pago de Seguridad Social, Comprobante de domicilio, Credencial de la empresa, Certificado médico/estudios clínicos, Antidoping.
⚠️ Si no asocias al personal al proyecto, el Técnico de Seguridad no los verá y no podrán ingresar.

### Paso 4 — Alcance / Procedimiento Operativo
Describe el trabajo paso a paso con evidencia fotográfica del área. Alimenta la Matriz IPERC.
Documentos: Evidencia fotográfica del área, Procedimiento Operativo en formato libre (no es el AST).
⚠️ Si los pasos no son claros y en orden lógico, no se puede evaluar el IPERC.

### Paso 5 — Análisis de Riesgos IPERC
Identifica peligros, evalúa riesgos y define controles. Su aprobación genera el AST automáticamente.
Debes completar: clasificación del trabajo, análisis de riesgos por paso, asignación de personal.
⚠️ Sin IPERC aprobado no se genera el AST y el trabajo no puede autorizarse.

### Paso 6 — Plan de Rescate
Define protocolos y recursos ante emergencias en trabajos de alto riesgo.
Documentos: Plan de Rescate en formato libre con todos los procedimientos de emergencia.
⚠️ Requisito indispensable. Sin él el proyecto no puede aprobarse.

### Paso 7 — Permisos de Trabajo (recurrente, cada día)
Carga el permiso firmado por KOF cada día antes de iniciar labores.
Documentos: Formato de Permiso firmado (foto o escaneo), documentación complementaria.
⚠️ Sin el permiso cargado en la plataforma, las labores no quedan autorizadas ese día.

## Cómo guiar al usuario
- Si pregunta por un paso específico, da los documentos clave y la advertencia principal.
- Si está atascado, pregunta en qué paso está para orientarlo.
- Si pregunta qué sigue, dile el paso siguiente y qué necesita preparar.`;

app.post('/v1/chat/mascot', async (req, res) => {
  try {
    const { message, session_id } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }

    const sid     = session_id || 'anon';
    const history = getSession(sid);

    history.push({ role: 'user', content: message.slice(0, 1000) });

    const response = await client.messages.create({
      model:      'claude-haiku-4-5-20251001',
      max_tokens: 350,
      system:     SYSTEM,
      messages:   history.slice(-16), // last 8 turns
    });

    const reply = response.content[0]?.text ?? 'No pude generar una respuesta.';
    history.push({ role: 'assistant', content: reply });

    // Bound history to 20 messages
    if (history.length > 20) history.splice(0, 2);

    res.json({ reply, animation_state: 'talking', open_chat: false });
  } catch (err) {
    console.error('Mascot API error:', err.message);
    res.status(500).json({ reply: 'No pude conectarme. Intenta de nuevo en un momento.' });
  }
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`KOF Mascot API listening on port ${PORT}`));
