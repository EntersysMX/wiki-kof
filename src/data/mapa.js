const YT = (id, i) => `https://www.youtube.com/watch?v=${id}&list=PL8fOd8ZLdcVZJbKU4qHFf94MVRMjHC--p&index=${i}`;
const DRIVE = id => `https://drive.google.com/file/d/${id}/view`;
const vid = (title, id, i) => ({ type: 'video', title, url: YT(id, i), status: 'disponible' });
const pdf = (title, id) => ({ type: 'pdf', title, url: DRIVE(id), status: 'disponible' });
const prep = (type, title) => ({ type, title, status: 'preparacion' });

const PREP_ONB = [prep('video', 'Video: Certificación de Onboarding'), prep('pdf', 'Manual: Certificación de Onboarding')];
const PREP_CRED = [prep('video', 'Video: Credencial Digital'), prep('pdf', 'Manual: Credencial Digital')];

export const RECURSOS = {
  start: [prep('video', 'Video: Clasificación del trabajo'), prep('pdf', 'Guía: Clasificación del trabajo')],
  d_alto: [], fuera1: [], d_rut: [], fuera2: [],
  registro: PREP_ONB, foto: PREP_ONB, modulos: PREP_ONB, evaluacion: PREP_ONB, d_aprobo: [], d_intentos: [], bloqueo: [], certificado: PREP_ONB,
  p1: [pdf('Manual: Documentación General', '1sBIQhZTi6zmhuPUBTk4z_FGkIdMhJLSz'), vid('Video: Documentación General', 'taCq6OkOwsA', 2), vid('Video: Consulta y actualización', 'O9RJa_kuC2c', 3)],
  p2: [pdf('Manual: Alta de Proyecto', '1YzQI_Pf6OpTVe1fhRBIq7uMsqSJrVNky'), vid('Video: Alta de Proyecto', 'GcGVEcU6BwY', 4)],
  p3: [pdf('Manual: Listado de Personal', '1AWz4LG6HOuJOLFJYsTYmXNBoMCsG6H_o'), vid('Video: Listado de Personal', 'q9p7v_QiL_s', 5), vid('Video: Asociar colaboradores al proyecto', 'W-AdqZJ8XuM', 6)],
  asociar: [vid('Video: Asociar colaboradores al proyecto', 'W-AdqZJ8XuM', 6)],
  cred1: PREP_CRED, cred2: PREP_CRED, cred3: PREP_CRED, cred4: PREP_CRED,
  p4: [pdf('Manual: Alcance y Procedimiento Operativo', '1n2yMzAJHDwswIy4k1dto13B49q30HTwZ'), vid('Video: Alcance / Procedimiento Operativo', 'DB0poqi-gVA', 7), vid('Video: Actualización y consulta', 'CORVpZmIPYM', 8)],
  p5: [pdf('Manual: Análisis de Riesgos IPERC', '12CFy6Do719QnHtlvLskLYNk6t97rphHs'), vid('Video: Matriz IPERC', 'HFU5EzbRy7o', 9)],
  p6: [pdf('Manual: Plan de Rescate', '1YX8vH_tZg77MKRITpTuVx7Bb3jakPFH3'), vid('Video: Plan de Rescate', 'C5ZzssfDs74', 10), vid('Video: Actualización y consulta', 'Qq-GfJneDNo', 11)],
  p7: [prep('video', 'Video: Evaluación de Precalificación'), prep('pdf', 'Manual: Evaluación de Precalificación')],
  habilitado: [],
  permisos: [pdf('Manual: Permisos de Trabajo', '1hxdk-JNP6qLBBnIaJq8KbPcNJ6y2JONv'), vid('Video: Permisos de Trabajo', 'usvORZPq9Dg', 12)],
  diarias: [prep('video', 'Video: Evaluaciones diarias'), prep('pdf', 'Guía: Evaluaciones diarias')],
  final: [prep('video', 'Video: Evaluación final'), prep('pdf', 'Guía: Evaluación final')],
  cerrado: [],
};

export const ACTORS = {
  contratista: { label: 'Contratista / Colaborador', chip: 'Contratista', short: 'Contratista', icon: 'engineering', bg: '#ffffff', border: '#7c878e', chipBg: '#f1f3f4', chipFg: '#454d52', borderStyle: 'solid' },
  coordinador: { label: 'Coordinador de Seguridad', chip: 'Coordinador valida', short: 'Coordinador', icon: 'verified_user', bg: '#ffffff', border: '#009ca6', chipBg: '#e6f5f6', chipFg: '#00646b', borderStyle: 'solid' },
  sistema: { label: 'Sistema / Plataforma', chip: 'Sistema', short: 'Sistema', icon: 'settings_suggest', bg: '#ffffff', border: '#1c2838', chipBg: '#1c2838', chipFg: '#ffffff', borderStyle: 'solid' },
  resultado: { label: 'Resultado / Punto de conexión', chip: 'Resultado', short: 'Resultado', icon: 'flag', bg: '#fdfaf3', border: '#c2a56d', chipBg: '#f2ead9', chipFg: '#5f4a12', borderStyle: 'solid' },
  fuera: { label: 'Fuera del alcance actual', chip: 'Fuera de alcance', short: 'Fuera de alcance', icon: 'block', bg: '#fafafa', border: '#a7b1b6', chipBg: '#f1f3f4', chipFg: '#5f696f', borderStyle: 'dashed' },
  decision: { label: 'Decisión (sí / no)', chip: 'Decisión', short: 'Decisión', icon: 'alt_route', bg: '#ffffff', border: '#c2a56d', chipBg: '#f2ead9', chipFg: '#5f4a12', borderStyle: 'solid' },
};

export const STATIONS = [
  { id: 's1', n: 1, short: 'Onboarding', label: 'Certificación de Onboarding', note: 'Obligatorio para todo tercero contratista que ingresa a planta' },
  { id: 's0', n: 0, short: 'Clasificación', label: 'Clasificación del trabajo', note: 'Punto de entrada: sólo trabajos de alto riesgo no rutinarios' },
  { id: 's2', n: 2, short: 'Doc. / Proyecto', label: 'Documentación General / Alta de Proyecto', note: 'Documentación pre-ejecución · Fase 1' },
  { id: 's3', n: 3, short: 'Personal / Credencial', label: 'Listado de Personal y Credencialización', note: 'La credencial es rama paralela: no es requisito para la etapa 4' },
  { id: 's4', n: 4, short: 'Alcance / IPERC', label: 'Alcance · IPERC · Rescate · Precalificación', note: 'Documentación pre-ejecución · Fase 1' },
  { id: 's5', n: 5, short: 'Ejecución', label: 'Permisos · Evaluaciones · Cierre', note: 'Ejecución en sitio y cierre · Fase 2' },
];

const COORD = 'Técnico o Coordinador de Seguridad de la unidad operativa';
const RECHAZO = 'El contratista corrige y reenvía. No puede avanzar al siguiente paso hasta la aprobación del Coordinador.';

const Y = 320, YD = 307;
const ST_OF = { registro: 's1', foto: 's1', modulos: 's1', evaluacion: 's1', d_aprobo: 's1', d_intentos: 's1', bloqueo: 's1', certificado: 's1', start: 's0', d_alto: 's0', fuera1: 's0', d_rut: 's0', fuera2: 's0', p1: 's2', p2: 's2', p3: 's3', asociar: 's3', cred1: 's3', cred2: 's3', cred3: 's3', cred4: 's3', p4: 's4', p5: 's4', p6: 's4', p7: 's4', habilitado: 's4', permisos: 's5', diarias: 's5', final: 's5', cerrado: 's5' };
const OFF = { start: 80, d_alto: 80, fuera1: 80, d_rut: 80, fuera2: 80, p1: 160, p2: 160, p3: 240, asociar: 240, cred1: 240, cred2: 240, cred3: 240, cred4: 240, p4: 320, p5: 420, p6: 500, p7: 500, habilitado: 600, permisos: 760, diarias: 760, final: 760, cerrado: 760 };
const NW = 220, NH = 124, DW = 150;

export const NODES = [
  { id: 'registro', actor: 'contratista', x: 40, y: Y, label: 'Registro', title: 'Registro en la plataforma', tag: 'Onboarding · 1', body: 'Es el primer proceso que debe registrar todo tercero contratista que ingrese a planta. El colaborador se registra en la plataforma con sus datos personales: RFC y nombre completo.', ejecuta: 'Colaborador', valida: '—' },
  { id: 'foto', actor: 'contratista', x: 300, y: Y, label: 'Fotografía de verificación', title: 'Fotografía de verificación', tag: 'Onboarding · 2', body: 'Toma una fotografía de verificación antes de iniciar la evaluación, para validar que quien presenta el curso es una persona real (no un tercero).', ejecuta: 'Colaborador', valida: '—' },
  { id: 'modulos', actor: 'contratista', x: 560, y: Y, label: 'Cursar los 3 módulos', title: 'Cursar los 3 módulos obligatorios', tag: 'Onboarding · 3', body: 'Cursa los 3 módulos obligatorios: Ambiental, Seguridad e Inocuidad. Cada módulo tiene su propia sección de evaluación.', ejecuta: 'Colaborador', valida: '—' },
  { id: 'evaluacion', actor: 'sistema', x: 820, y: Y, label: 'Evaluación', title: 'Evaluación de los 3 módulos', tag: 'Onboarding · 4', body: 'El sistema evalúa las 3 secciones. Para aprobar el curso completo se deben aprobar las 3 secciones de los 3 módulos. El colaborador cuenta con 3 intentos para aprobar el curso completo.', ejecuta: 'Sistema / Plataforma', valida: 'Sistema / Plataforma (automático)' },
  { id: 'd_aprobo', actor: 'decision', x: 1090, y: YD, label: '¿Aprobó?', title: '¿Aprobó las 3 secciones de los 3 módulos?', body: 'Para aprobar el curso completo se deben aprobar las 3 secciones de los 3 módulos. Al aprobar, el sistema emite el Certificado de Onboarding.', ejecuta: 'Sistema / Plataforma', valida: '—' },
  { id: 'd_intentos', actor: 'decision', x: 1090, y: 520, label: '¿Le quedan intentos?', title: '¿Le quedan intentos?', body: 'El colaborador cuenta con 3 intentos para aprobar el curso completo. Si le quedan intentos, vuelve a presentar el curso.', ejecuta: 'Sistema / Plataforma', valida: '—' },
  { id: 'bloqueo', actor: 'sistema', x: 1055, y: 720, label: 'Bloqueo automático 6 meses', title: 'Bloqueo automático de 6 meses', body: 'Si reprueba las 3 veces, el sistema genera automáticamente un bloqueo de 6 meses, durante el cual no puede volver a presentar el curso.', ejecuta: 'Sistema / Plataforma', valida: '—' },
  { id: 'certificado', actor: 'resultado', x: 1330, y: Y, label: 'Certificado de Onboarding', title: 'Certificado de Onboarding', tag: 'Resultado', body: 'Al aprobar, el sistema emite el Certificado de Onboarding, que alimenta tanto el Listado de Personal (Paso 3) como la Generación de Credencial Digital.', ejecuta: 'Sistema / Plataforma', valida: '—' },
  { id: 'start', actor: 'resultado', x: 1630, y: Y, label: 'Trabajo a ejecutar en KOF', title: 'Trabajo a ejecutar en instalaciones de KOF', tag: 'Punto de entrada', body: 'Con el Onboarding completado, el contratista identifica el trabajo a ejecutar. KOF clasifica los trabajos en riesgo bajo, medio y alto.', ejecuta: 'KOF (clasificación del trabajo)', valida: '—' },
  { id: 'd_alto', actor: 'decision', x: 1910, y: YD, label: '¿Es de riesgo alto?', title: '¿Es un trabajo de riesgo alto?', body: 'KOF clasifica los trabajos en riesgo bajo, medio y alto. Sólo los trabajos de alto riesgo se gestionan a través de la plataforma.', ejecuta: 'KOF (clasificación del trabajo)', valida: '—' },
  { id: 'fuera1', actor: 'fuera', x: 1875, y: 520, label: 'Riesgo bajo o medio', title: 'Trabajo de riesgo bajo o medio', tag: 'Fuera del alcance actual', body: 'Los trabajos de riesgo bajo o medio hoy no se gestionan dentro de la plataforma.', ejecuta: '—', valida: '—' },
  { id: 'd_rut', actor: 'decision', x: 2150, y: YD, label: '¿Es rutinario?', title: '¿Es un trabajo rutinario?', body: 'Dentro de los trabajos de alto riesgo existen trabajos rutinarios y no rutinarios. Actualmente, sólo los trabajos de alto riesgo no rutinarios deben registrarse en la plataforma.', ejecuta: 'KOF (clasificación del trabajo)', valida: '—' },
  { id: 'fuera2', actor: 'fuera', x: 2115, y: 520, label: 'Alto riesgo rutinario', title: 'Trabajo de alto riesgo rutinario', tag: 'Fuera del alcance actual', body: 'Los trabajos de alto riesgo rutinarios hoy no se registran en la plataforma.', ejecuta: '—', valida: '—' },
  { id: 'p1', actor: 'coordinador', actors: ['contratista', 'coordinador'], interviene: true, x: 2370, y: Y, label: 'Documentación General', title: 'Documentación General de la empresa contratista', tag: 'Paso 1', body: 'El contratista registra a su empresa y sube la documentación específica. El Coordinador de Seguridad la valida.', ejecuta: 'Contratista', valida: COORD, revisas: 'Que la empresa haya subido los siete documentos y que cada uno acredite lo que indica la tabla. La identidad de quien firma la declaración jurada se valida con la identificación del representante legal.', docsCol2: 'Para qué sirve', docs: [['RFC', 'Identifica fiscalmente a la empresa contratista.'], ['Cédula de determinación de cuota', 'Acredita el cálculo de cuotas obrero-patronales vigente.'], ['Comprobante de pago de SUA', 'Acredita el pago del Sistema Único de Autodeterminación.'], ['Identificación del representante legal', 'Valida que quien firma la declaración jurada es el representante legal responsable.'], ['Opinión de cumplimiento del IMSS', 'Acredita que la empresa está al corriente ante el IMSS.'], ['Última declaración de grado de riesgo', 'Acredita el grado de riesgo de la empresa registrado ante el IMSS.'], ['Declaración jurada', 'Documento firmado y nombrado por el representante legal, cuya identidad se valida con su identificación.']], rechazo: RECHAZO },
  { id: 'p2', actor: 'coordinador', actors: ['contratista', 'coordinador'], interviene: true, x: 2630, y: Y, label: 'Alta de Proyecto', title: 'Alta de Proyecto', tag: 'Paso 2', body: 'El contratista da de alta el proyecto, indicando la unidad operativa y la orden de compra correspondiente.', ejecuta: 'Contratista', valida: COORD, revisas: 'Que la Orden de Compra y el RFC de la empresa coincidan con la unidad operativa antes de aprobar el registro.', keywords: 'Orden de Compra OC unidad operativa RFC', rechazo: RECHAZO },
  { id: 'p3', actor: 'coordinador', actors: ['contratista', 'coordinador', 'sistema'], interviene: true, x: 2890, y: Y, label: 'Listado de Personal', title: 'Listado de Personal', tag: 'Paso 3', body: 'Por cada colaborador, el contratista registra su NSS y nombre, junto con su documentación. El Certificado de Onboarding se obtiene automáticamente por match NSS + RFC. Una vez validado, el contratista asocia a los colaboradores al proyecto.', ejecuta: 'Contratista (el sistema hace el match del Certificado de Onboarding)', valida: COORD, revisas: 'La documentación de cada colaborador registrado. El Certificado de Onboarding lo toma el sistema automáticamente si ya está aprobado. Cuando el colaborador tiene el Onboarding aprobado y su documentación validada, el sistema genera su Credencial Digital.', docsCol2: 'Nota', docs: [['NSS y nombre', 'Número de Seguro Social y nombre del colaborador.'], ['DC3 asociado(s) al colaborador', 'Constancias de competencias o habilidades laborales.'], ['Pago de seguro social', 'Vigencia de aseguramiento del colaborador.'], ['Pago de SUA', 'Comprobante correspondiente al colaborador.'], ['Credencial de la empresa contratista', 'Identificación del colaborador como personal de la empresa.'], ['Certificado de Onboarding', 'Se obtiene automáticamente: match por NSS + RFC contra el módulo de Onboarding.'], ['Certificado médico', 'Aptitud médica del colaborador.'], ['Antidoping', 'Resultado del examen antidoping del colaborador.']], rechazo: RECHAZO },
  { id: 'asociar', actor: 'contratista', x: 3150, y: Y, label: 'Asociar colaboradores al proyecto', title: 'Asociar colaboradores al proyecto', body: 'Una vez validado el Listado de Personal, el contratista asocia a los colaboradores al proyecto.', ejecuta: 'Contratista', valida: '—' },
  { id: 'cred1', actor: 'sistema', x: 2890, y: 620, label: 'Verificación continua', title: 'Verificación continua de requisitos', tag: 'Credencial · 1', body: 'El sistema verifica de forma continua si un colaborador cumple ambos criterios: Onboarding aprobado + documentación de personal validada.', ejecuta: 'Sistema / Plataforma', valida: 'Sistema / Plataforma (automático)' },
  { id: 'cred2', actor: 'sistema', x: 3150, y: 620, label: 'Generación automática', title: 'Generación automática de la credencial', tag: 'Credencial · 2', body: 'En cuanto se cumplen ambos criterios, el sistema genera automáticamente la credencial digital, sin intervención manual adicional.', ejecuta: 'Sistema / Plataforma', valida: '—' },
  { id: 'cred3', actor: 'sistema', x: 3150, y: 860, label: 'Enlace en informe', title: 'Enlace publicado en informe', tag: 'Credencial · 3', body: 'El sistema publica un enlace dentro de un informe, visible en el módulo del Tercero Contratista y en el módulo del Coordinador de Seguridad.', ejecuta: 'Sistema / Plataforma', valida: '—' },
  { id: 'cred4', actor: 'resultado', x: 2890, y: 860, label: 'Credencial en PDF 6×9', title: 'Credencial Digital en PDF 6×9', tag: 'Resultado', body: 'Al abrir el enlace se visualiza la credencial digital, la cual puede descargarse en PDF tamaño 6×9, para impresión y uso dentro de sitio.', ejecuta: 'Sistema / Plataforma', valida: '—', sample: true },
  { id: 'p4', actor: 'coordinador', actors: ['contratista', 'coordinador'], interviene: true, x: 3410, y: Y, label: 'Alcance / Procedimiento Operativo', title: 'Alcance / Procedimiento Operativo', tag: 'Paso 4', body: 'El contratista describe los pasos de las actividades a ejecutar. Este alcance detona automáticamente los pasos base de la Matriz de Análisis de Riesgo del Paso 5.', ejecuta: 'Contratista', valida: COORD, revisas: 'Los pasos de las actividades que se van a ejecutar: sobre ellos se construye la Matriz de Análisis de Riesgo del Paso 5.', rechazo: RECHAZO },
  { id: 'p5', actor: 'coordinador', actors: ['contratista', 'coordinador'], interviene: true, x: 3670, y: Y, label: 'Matriz de Análisis de Riesgo', title: 'Matriz de Análisis de Riesgo', tag: 'Paso 5', body: 'Con base en los pasos del alcance, el contratista identifica los riesgos y peligros de cada paso, registra los controles para mitigarlos y asigna al personal responsable.', ejecuta: 'Contratista', valida: COORD, revisas: 'Que para cada paso del alcance estén identificados los riesgos y peligros, registrados los controles para mitigarlos y asignado el personal responsable.', rechazo: RECHAZO },
  { id: 'p6', actor: 'coordinador', actors: ['contratista', 'coordinador'], interviene: true, x: 3930, y: Y, label: 'Plan de Rescate', title: 'Plan de Rescate', tag: 'Paso 6', body: 'El contratista registra el plan de rescate aplicable al trabajo de alto riesgo.', ejecuta: 'Contratista', valida: COORD, revisas: 'El plan de rescate aplicable al trabajo de alto riesgo.', rechazo: RECHAZO },
  { id: 'p7', actor: 'coordinador', actors: ['contratista', 'coordinador'], interviene: true, x: 4190, y: Y, label: 'Evaluación de Precalificación', title: 'Evaluación de Precalificación', tag: 'Paso 7', body: 'El contratista completa formularios de precalificación que validan que se cumplen todos los requisitos para ejecutar el trabajo de alto riesgo de forma segura. Sólo al aprobarse el Paso 7 el proyecto queda habilitado para la Fase 2.', ejecuta: 'Contratista', valida: COORD, revisas: 'Los formularios de precalificación: que se cumplan todos los requisitos para ejecutar el trabajo de forma segura. Su aprobación habilita el proyecto para la Fase 2.', rechazo: RECHAZO },
  { id: 'habilitado', actor: 'resultado', x: 4450, y: Y, label: 'Proyecto habilitado para Fase 2', title: 'Proyecto habilitado para ejecución en sitio (Fase 2)', tag: 'Resultado', body: 'Sólo al aprobarse el Paso 7 el proyecto queda habilitado para su ejecución en sitio (Fase 2).', ejecuta: 'Sistema / Plataforma', valida: '—' },
  { id: 'permisos', actor: 'coordinador', actors: ['contratista', 'coordinador'], interviene: true, x: 4710, y: 220, label: 'Permisos de trabajo', title: 'Permisos de trabajo', tag: 'Fase 2', body: 'En sitio, el contratista sube a la plataforma los permisos de trabajo requeridos para cada actividad; el Coordinador los valida.', ejecuta: 'Contratista (sube en sitio)', valida: COORD, revisas: 'Los permisos de trabajo requeridos para cada actividad, conforme el contratista los va subiendo en sitio.', rechazo: 'El contratista corrige y reenvía el permiso de trabajo de esa actividad.' },
  { id: 'diarias', actor: 'coordinador', actors: ['coordinador'], interviene: true, x: 4710, y: 440, label: 'Evaluaciones diarias', title: 'Evaluaciones diarias', tag: 'Fase 2', body: 'Se realizan mientras continúa la ejecución del trabajo, en paralelo a la gestión de permisos.', ejecuta: COORD, valida: COORD, revisas: 'Las evaluaciones diarias mientras continúa la ejecución del trabajo.' },
  { id: 'final', actor: 'coordinador', actors: ['coordinador'], interviene: true, x: 5050, y: Y, label: 'Evaluación final', title: 'Evaluación final', tag: 'Fase 2 · Cierre', body: 'Se realiza al cierre del proyecto, dando por finalizado el desarrollo de los requisitos documentales del trabajo de alto riesgo.', ejecuta: COORD, valida: COORD, revisas: 'Al cierre del proyecto, que el desarrollo de los requisitos documentales quede finalizado.' },
  { id: 'cerrado', actor: 'resultado', x: 5310, y: Y, label: 'Proyecto cerrado', title: 'Proyecto cerrado', tag: 'Resultado', body: 'Con la evaluación final se da por finalizado el desarrollo de los requisitos documentales y el proyecto queda cerrado.', ejecuta: '—', valida: '—' },
];

NODES.forEach(n => {
  const d = n.actor === 'decision';
  n.w = d ? DW : NW; n.h = d ? DW : NH;
  n.st = ST_OF[n.id];
  n.x += OFF[n.id] || 0;
  if (!n.actors) n.actors = [n.actor];
});

export const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]));

export const EDGES = [
  { from: 'start', to: 'd_alto', fs: 'r', ts: 'l', type: 'main' },
  { from: 'd_alto', to: 'd_rut', fs: 'r', ts: 'l', type: 'main', label: 'Sí' },
  { from: 'd_alto', to: 'fuera1', fs: 'b', ts: 't', type: 'fuera', label: 'No' },
  { from: 'd_rut', to: 'p1', fs: 'r', ts: 'l', type: 'main', label: 'No, es no rutinario' },
  { from: 'd_rut', to: 'fuera2', fs: 'b', ts: 't', type: 'fuera', label: 'Sí, es rutinario' },
  { from: 'registro', to: 'foto', fs: 'r', ts: 'l' },
  { from: 'foto', to: 'modulos', fs: 'r', ts: 'l' },
  { from: 'modulos', to: 'evaluacion', fs: 'r', ts: 'l' },
  { from: 'evaluacion', to: 'd_aprobo', fs: 'r', ts: 'l' },
  { from: 'd_aprobo', to: 'certificado', fs: 'r', ts: 'l', type: 'main', label: 'Sí' },
  { from: 'd_aprobo', to: 'd_intentos', fs: 'b', ts: 't', type: 'main', label: 'No' },
  { from: 'd_intentos', to: 'bloqueo', fs: 'b', ts: 't', type: 'main', label: 'No' },
  { from: 'd_intentos', to: 'modulos', fs: 'l', ts: 'b', type: 'main', label: 'Sí, vuelve a presentar' },
  { from: 'certificado', to: 'start', fs: 'r', ts: 'l', type: 'main', label: 'Ingreso a planta' },
  { from: 'certificado', to: 'p3', fs: 't', ts: 't', type: 'cross', label: 'Match por NSS + RFC' },
  { from: 'p1', to: 'p2', fs: 'r', ts: 'l' },
  { from: 'p2', to: 'p3', fs: 'r', ts: 'l' },
  { from: 'p3', to: 'asociar', fs: 'r', ts: 'l' },
  { from: 'asociar', to: 'p4', fs: 'r', ts: 'l' },
  { from: 'p3', to: 'cred1', fs: 'b', ts: 't', type: 'cross', label: 'Documentación de personal validada' },
  { from: 'certificado', to: 'cred1', fs: 'b', ts: 'b', type: 'cross', label: 'Onboarding aprobado', via: 820, at: 0.7 },
  { from: 'cred1', to: 'cred2', fs: 'r', ts: 'l' },
  { from: 'cred2', to: 'cred3', fs: 'b', ts: 't' },
  { from: 'cred3', to: 'cred4', fs: 'l', ts: 'r' },
  { from: 'p4', to: 'p5', fs: 'r', ts: 'l', type: 'main', label: 'Detona pasos base' },
  { from: 'p5', to: 'p6', fs: 'r', ts: 'l' },
  { from: 'p6', to: 'p7', fs: 'r', ts: 'l' },
  { from: 'p7', to: 'habilitado', fs: 'r', ts: 'l', type: 'main', label: 'Aprobado' },
  { from: 'habilitado', to: 'permisos', fs: 'r', ts: 'l' },
  { from: 'habilitado', to: 'diarias', fs: 'r', ts: 'l' },
  { from: 'permisos', to: 'final', fs: 'r', ts: 'l' },
  { from: 'diarias', to: 'final', fs: 'r', ts: 'l' },
  { from: 'final', to: 'cerrado', fs: 'r', ts: 'l' },
].map(e => ({ type: 'main', label: '', ...e }));

export const GLOSSARY = [
  { term: 'NSS', def: 'Número de Seguro Social del colaborador.' },
  { term: 'RFC', def: 'Registro Federal de Contribuyentes.' },
  { term: 'SUA', def: 'Sistema Único de Autodeterminación (pago de cuotas IMSS/INFONAVIT).' },
  { term: 'DC3', def: 'Constancia de competencias o habilidades laborales.' },
  { term: 'OC', def: 'Orden de Compra.' },
  { term: 'Trabajo no rutinario', def: 'Actividad de alto riesgo fuera de la operación habitual, que hoy es la única que se registra en la plataforma.' },
];

export const VIEWS = [
  { id: 'todo', label: 'Todo el proceso', icon: 'account_tree' },
  { id: 'coordinador', label: 'Coordinador', icon: 'person_check' },
  { id: 'contratista', label: 'Contratista', icon: 'engineering' },
  { id: 'sistema', label: 'Sistema', icon: 'settings_suggest' },
];

export const PROCEDIMIENTOS = [
  { code: 'PR-KOF-001', title: 'Curso de Inducción (Onboarding)', pdf: '/docs/PR-KOF-001_Curso_Induccion_Onboarding.pdf', fileName: 'PR-KOF-001_Curso_Induccion_Onboarding.pdf', desc: 'Establece cómo todo colaborador de un tercero contratista acredita el Curso de Inducción antes de ingresar a una planta o unidad operativa de KOF, para que conozca las reglas y requisitos de seguridad, inocuidad y ambientales. Cubre desde la entrega de la liga del curso hasta la verificación del certificado vigente en sitio.' },
  { code: 'PR-KOF-002', title: 'Documentación General y Alta de Proyecto', pdf: '/docs/PR-KOF-002_Documentacion_General_Alta_de_Proyecto.pdf', fileName: 'PR-KOF-002_Documentacion_General_Alta_de_Proyecto.pdf', desc: 'Establece cómo el tercero contratista registra su Documentación General y da de alta sus proyectos de trabajo de alto riesgo no rutinario, y cómo el coordinador de seguridad valida esa información para que cada proyecto quede asociado a la orden de compra y a la unidad operativa correctas. Incluye la modificación y la baja de proyectos.' },
  { code: 'PR-KOF-003', title: 'Listado de Personal, Asociación de Colaboradores y Credencialización', pdf: '/docs/PR-KOF-003_Listado_Personal_Asociacion_Credencializacion.pdf', fileName: 'PR-KOF-003_Listado_Personal_Asociacion_Credencializacion.pdf', desc: 'Establece cómo el tercero contratista registra a sus colaboradores y los asocia a sus proyectos, cómo el coordinador valida su documentación y cómo el sistema genera la Credencial Digital sólo a quienes tienen el curso aprobado y la documentación validada.' },
  { code: 'PR-KOF-004', title: 'Alcance, Procedimiento Operativo, IPERC y AST', pdf: '/docs/PR-KOF-004_Alcance_Procedimiento_Operativo_IPERC_AST.pdf', fileName: 'PR-KOF-004_Alcance_Procedimiento_Operativo_IPERC_AST.pdf', desc: 'Establece cómo el tercero contratista registra el alcance y el procedimiento operativo de su proyecto y el análisis de riesgos (IPERC) de cada paso de la actividad, y cómo el coordinador los valida, aprueba y da seguimiento al Análisis de Seguridad en el Trabajo (AST).' },
  { code: 'PR-KOF-005', title: 'Plan de Rescate y Precalificación Outside', pdf: '/docs/PR-KOF-005_Plan_de_Rescate_Precalificacion_Outside.pdf', fileName: 'PR-KOF-005_Plan_de_Rescate_Precalificacion_Outside.pdf', desc: 'Establece cómo el tercero contratista registra el Plan de Rescate de su proyecto y los formularios de la Precalificación Outside, y cómo el coordinador revisa, valida y aprueba ambos registros antes de que el contratista ingrese a ejecutar el trabajo de alto riesgo.' },
  { code: 'PR-KOF-006', title: 'Permisos de Trabajo, Evaluación Diaria y Evaluación Final', pdf: '/docs/PR-KOF-006_Permisos_Evaluacion_Seguridad.pdf', fileName: 'PR-KOF-006_Permisos_Evaluacion_Seguridad.pdf', desc: 'Establece la operación, validación y supervisión de los Permisos de Trabajo, las Evaluaciones Diarias y la Evaluación Final en la plataforma. Coordina el flujo del contratista (carga y ejecución) con el del coordinador (consulta, validación y cierre), desde la carga inicial de permisos hasta el cierre formal del proyecto.' },
];
