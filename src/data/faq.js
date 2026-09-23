export const FAQ_SECTIONS = [
  {
    id: 'plataforma',
    title: '1) Uso de la plataforma',
    items: [
      {
        id: '1-1',
        q: '1.1 No carga la página de Smartsheet y el internet es de alta velocidad',
        a: `Proceso de limpieza de caché y cookies:\n\n**Google Chrome**\n- Opción 1: Atajo de teclado (Ctrl/Comando + Shift + Supr)\n- Opción 2: Menú del navegador (⋮ > Configuración > Privacidad y seguridad)\n\n**Microsoft Edge**\n- Pasos a través del menú de Configuración.\n\n**Recomendaciones adicionales:**\n- Desconectar y volver a conectar la red Wi-Fi.\n- Probar con una red diferente.\n- Conectarse mediante cable Ethernet.`,
      },
      {
        id: '1-2',
        q: '1.2 No visualizo la información para la carga de documentos (no tengo acceso a mi módulo de Terceros)',
        a: `1. Accede al portal: https://entersys.mx/Gestion_Contratistas.html\n2. Genera tu usuario con el correo del Representante del Contratista.\n3. Una vez aceptada la invitación, accede al WorkApp de Smartsheet.`,
      },
      {
        id: '1-3',
        q: '1.3 ¿Cómo ingresar al portal de internet?',
        a: `- Mediante tu Técnico de Seguridad.\n- Acceso directo: https://entersys.mx/Gestion_Contratistas.html`,
      },
      {
        id: '1-4',
        q: '1.4 ¿Cómo ingreso a mi módulo de Terceros?',
        a: `1. Accede al portal para cargar documentos.\n2. Sube tus Documentos Generales (esto genera tu usuario).\n3. Espera y acepta el correo de invitación.\n4. Accede al WorkApp de Terceros.`,
      },
      {
        id: '1-5',
        q: '1.5 ¿Pueden trabajar dos personas o más en el módulo de Terceros?',
        a: `Política: Solo se permite una cuenta de correo electrónico por contratista.\n\nOpciones para ingresar:\n- Usar la cuenta actual (compartir contraseña).\n- Restablecer la contraseña.\n- Actualizar el correo registrado.\n\nPara colaborar en equipo:\n- Usar el mismo usuario y contraseña.\n- Cargar desde el enlace público con RFC y Orden de Compra.`,
      },
    ],
  },
  {
    id: 'documentos-generales',
    title: '2) Documentos Generales',
    items: [
      {
        id: '2-1',
        q: '2.1 ¿Cómo subo mis documentos generales?',
        a: `1. Ingresa al enlace proporcionado por tu Técnico de Seguridad.\n2. Haz clic en "Alta de Contratista".\n3. Localiza la sección "Documentos Generales" e ingresa.\n4. Completa el formulario y adjunta la documentación requerida.\n\nEste registro solo es necesario realizarlo una vez.`,
      },
      {
        id: '2-2',
        q: '2.2 ¿Cómo actualizo mi documentación general?',
        a: `Ingresa a tu Módulo de Terceros y dirígete a "Consultar Mis Documentos Grales. y D. Jurada". Desde ahí podrás visualizar y actualizar los archivos adjuntos cuando sea necesario.`,
      },
    ],
  },
  {
    id: 'proyectos',
    title: '3) Alta y gestión de proyectos',
    items: [
      {
        id: '3-1',
        q: '3.1 ¿Cómo puedo dar de alta un proyecto?',
        a: `Opción 1 — Portal de Terceros:\n1. Accede al Portal de Terceros Contratistas.\n2. Ve al apartado "Alta de Proyecto (formulario)" y registra la información.\n\nOpción 2 — Enlace del Técnico:\n1. Ingresa al enlace compartido por tu Técnico de Seguridad.\n2. Haz clic en "Alta de Contratista".\n3. Selecciona "Alta de Proyecto" y completa el formulario.`,
      },
      {
        id: '3-2',
        q: '3.2 ¿Cómo puedo consultar mi proyecto?',
        a: `Ingresa al Portal de Terceros Contratistas y busca el proyecto en tu listado de proyectos activos.`,
      },
      {
        id: '3-3',
        q: '3.3 ¿Cómo doy de baja un proyecto?',
        a: `La baja debe ser solicitada por el Técnico de Seguridad de tu Unidad Operativa.\n\n- Solicita al Técnico la eliminación del proyecto.\n- Proporciona los detalles necesarios (duplicidad, error, etc.).`,
      },
      {
        id: '3-4',
        q: '3.4 ¿Cómo actualizo la evidencia de la Orden de Compra de mi proyecto?',
        a: `1. Ingresa al Portal de Terceros Contratistas.\n2. Haz clic en el proyecto que deseas actualizar.\n3. En el panel de detalles, selecciona la sección "Adjuntos".\n4. Usa "Adjuntar un archivo" para cargar el nuevo documento.\n\nPara reemplazar un archivo existente, carga el nuevo con el mismo nombre para que el sistema lo reemplace automáticamente.`,
      },
    ],
  },
  {
    id: 'personal',
    title: '4) Listado de personal',
    items: [
      {
        id: '4-1',
        q: '4.1 ¿Cómo subo a mi listado de colaboradores?',
        a: `Opción 1 — Enlace del Técnico:\n1. Ingresa al enlace proporcionado por tu Técnico de Seguridad.\n2. Haz clic en "Alta de Contratista".\n3. Localiza "Información del Personal" y completa el formulario por cada colaborador.\n\nOpción 2 — Módulo de Terceros:\n1. Ingresa a tu Módulo de Terceros.\n2. Ve a "Listado de Personal".\n3. Haz clic en "Formulario de Registro de Personal" y completa la información.`,
      },
      {
        id: '4-2',
        q: '4.2 Consultas sobre estados y rechazos de personal por documentos vencidos',
        a: `Cuando un colaborador aparece con estado "No apto" o "Pendiente", las fechas no están registradas o están desactualizadas.\n\nPara actualizar:\n1. Haz clic sobre el colaborador a editar.\n2. En el panel de detalles, ve a la sección Datos.\n3. Ingresa las fechas faltantes.\n\nSolo así el estado cambiará a "Apto" y será visible para el Técnico de Seguridad.`,
      },
      {
        id: '4-3',
        q: '4.3 Problemas para asociar colaboradores al proyecto',
        a: `Si aparece un mensaje de registro previo existente, el colaborador está asociado a otra empresa contratista. El sistema no permite duplicados.\n\nDebes validar con el equipo SQE a qué empresa está asociado el NSS del colaborador y solicitar el ajuste correspondiente.`,
      },
      {
        id: '4-4',
        q: '4.4 Ya cargué a mis colaboradores, ¿por qué no los ve el Técnico?',
        a: `Es necesario asociarlos al proyecto específico desde "Asociar colaboradores por proyecto" en el portal del contratista.\n\nPasos:\n1. Ingresa a tu Módulo de Terceros.\n2. Ve a "Asociar colaboradores a un proyecto".\n3. Completa el formulario por cada persona.\n\nImportante: Dar de alta en el Listado de Personal NO es lo mismo que asociarlos a un proyecto.`,
      },
      {
        id: '4-5',
        q: '4.5 ¿Cómo asociar un colaborador a un proyecto?',
        a: `1. Ingresa al portal de terceros.\n2. Ve a "Asociar colaboradores a un proyecto".\n3. Haz clic en "Formulario para asociar colaboradores".\n4. Completa con el RFC, la orden de compra y el NSS del colaborador.\n5. Registra el formulario por cada colaborador.\n\nNota: No es posible asociar a alguien si no fue previamente dado de alta en el Listado de Personal.`,
      },
      {
        id: '4-6',
        q: '4.6 ¿Cómo doy de baja a un colaborador asociado a un proyecto?',
        a: `1. Ingresa al portal de terceros.\n2. Ve a "Asociar colaboradores a un proyecto".\n3. Selecciona la línea del colaborador a desasociar.\n4. En el panel de detalles, desplázate hacia abajo.\n5. Marca "Desasociar a mi trabajador del proyecto".\n6. Haz clic en Guardar y actualiza la página.`,
      },
    ],
  },
  {
    id: 'alcance',
    title: '5) Alcance / Procedimiento Operativo',
    items: [
      {
        id: '5-1',
        q: '5.1 ¿Cómo registrar el alcance de un proyecto?',
        a: `Opción 1 — Página Web:\n1. Ingresa al enlace proporcionado por tu Técnico de Seguridad.\n2. Haz clic en "Requisitos de Trabajos de Alto Riesgo".\n3. Localiza "Alcance, Desarrollo, Herramientas y Equipos, y Procedimiento Operativo".\n4. Completa el formulario.\n\nOpción 2 — Módulo de Terceros:\n1. Ingresa a tu Módulo de Terceros.\n2. Ve a "Alcance / Procedimiento Operativo".\n3. Completa el formulario de registro.`,
      },
      {
        id: '5-2',
        q: '5.2 ¿Cómo actualizar datos del alcance de un proyecto?',
        a: `Haz clic en el registro del informe de Alcance que deseas modificar y edita los datos en el panel de detalles (Objetivos, Alcance, Equipos y Materiales).\n\nPara agregar o ajustar actividades en el IPERC, ingresa a la sección IPERC del módulo.`,
      },
    ],
  },
  {
    id: 'iperc',
    title: '6) Análisis de riesgos / IPERC',
    items: [
      {
        id: '6-1',
        q: '6.1 ¿Cómo cargo mi IPERC?',
        a: `1. Primero registra el Formulario de Alcance.\n2. Espera unos minutos y actualiza la página. Las actividades registradas se mostrarán automáticamente en el informe IPERC.\n3. Filtra por proyecto para ver la información correspondiente.\n4. Si necesitas agregar o modificar una actividad, hazlo directamente desde el informe IPERC.`,
      },
      {
        id: '6-2',
        q: '6.2 ¿Cómo realizo el análisis de mi registro IPERC?',
        a: `1. Ingresa al informe IPERC.\n2. Haz clic en cada actividad y completa los campos solicitados.\n3. El AST se genera automáticamente al finalizar el registro IPERC y queda disponible para el Técnico de Seguridad.`,
      },
      {
        id: '6-3',
        q: '6.3 No veo mis actividades en el IPERC después de registrar el Alcance, ¿qué hago?',
        a: `Esto es normal. Después de enviar el Formulario de Alcance:\n- Espera unos minutos y actualiza la página.\n- Las actividades se mostrarán automáticamente una vez procesada la información.`,
      },
      {
        id: '6-4',
        q: '6.4 ¿Puedo registrar actividades directamente en el IPERC sin completar el Formulario de Alcance?',
        a: `No. Es importante no registrar actividades directamente en el IPERC antes de haber completado el Formulario de Alcance. Hacerlo puede generar errores en la información.`,
      },
      {
        id: '6-5',
        q: '6.5 ¿Cómo puedo modificar o agregar actividades en el IPERC?',
        a: `- Para agregar una nueva actividad, haz clic en el botón "Nuevo".\n- Para modificar una actividad, haz clic sobre ella y actualiza los datos en el panel de detalles.\n- Asegúrate de que el Formulario de Alcance esté completo antes de hacer cualquier modificación.`,
      },
    ],
  },
  {
    id: 'plan-rescate',
    title: '7) Plan de rescate',
    items: [
      {
        id: '7-1',
        q: '7.1 ¿Cómo registrar el plan de rescate?',
        a: `Opción 1 — Portal de Terceros:\n1. Ingresa al módulo de Terceros.\n2. Ve al apartado Plan de Rescate.\n3. Selecciona "Formulario de registro Plan de Rescate".\n4. Completa la información y adjunta el documento.\n5. Envía y actualiza la pestaña para visualizar el registro.\n\nOpción 2 — Página Web:\n1. Ingresa al enlace compartido por tu Técnico de Seguridad.\n2. Ve a "Requisitos de Trabajos de Alto Riesgo".\n3. Accede al apartado "Plan de Rescate" y carga tu documento.`,
      },
      {
        id: '7-2',
        q: '7.2 ¿Cómo puedo actualizar el plan de rescate?',
        a: `Solo debe mantenerse una versión vigente. Para actualizar:\n\n1. Ingresa al módulo de Terceros.\n2. Ve al apartado Plan de Rescate.\n3. Localiza el informe y haz clic sobre el plan a editar.\n4. En el panel de detalles, edita los contactos de emergencia.\n5. Para actualizar el archivo, ve a "Adjuntos", carga el nuevo documento con el mismo nombre del anterior.`,
      },
      {
        id: '7-3',
        q: '7.3 ¿Cómo puedo modificar los contactos de emergencia del plan de rescate?',
        a: `1. Ingresa al módulo de Terceros.\n2. Ve al apartado Plan de Rescate.\n3. Haz clic sobre el plan asociado al proyecto.\n4. En el panel de detalles, edita directamente los contactos de emergencia.\n5. Para actualizar el archivo, usa "Adjuntos" y carga el nuevo con el mismo nombre.\n6. Actualiza la página para visualizar los cambios.`,
      },
    ],
  },
  {
    id: 'permisos',
    title: '8) Permisos de trabajo',
    items: [
      {
        id: '8-1',
        q: '8.1 ¿Cómo puedo subir a la plataforma un permiso de trabajo?',
        a: `Opción 1 — Portal de Terceros:\n1. Ingresa al módulo de Terceros Contratistas.\n2. Ve a "Permisos de trabajo" en la barra de navegación izquierda.\n3. Accede a "Formulario de registro de permisos de trabajo" y completa la información.\n4. El permiso aparece en el informe "Permisos de Trabajo terceros".\n\nOpción 2 — Página Web:\n- Ingresa al enlace compartido por tu Técnico de Seguridad.\n- Ve a "Requisitos de Trabajos de Alto Riesgo".\n- Accede a "Carga de permisos" y sube tu permiso.`,
      },
      {
        id: '8-2',
        q: '8.2 ¿Cómo puedo ver mis permisos de trabajo?',
        a: `1. Ingresa al módulo de Terceros Contratistas.\n2. Ve a "Permisos de trabajo" en la barra de navegación izquierda.\n3. Selecciona "Informe de permisos de trabajo".\n4. Revisa la lista de permisos registrados.`,
      },
    ],
  },
];

export const TICKET_URL = 'https://app.smartsheet.com/b/form/823e0c2ea50044358ab576d5c74ba383';
