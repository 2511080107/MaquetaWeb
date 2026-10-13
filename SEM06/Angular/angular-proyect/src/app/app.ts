import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface EnlaceRapido {
  texto: string;
  url: string;
}

interface ItemMenu {
  texto: string;
  url: string;
  hijos?: { texto: string; url: string }[];
}

interface Programa {
  id: string;
  carrera: string;
  facultad: string;
  siglaFacultad: string;
  imagen: string;
  titulo: string;
  descripcion: string;
  campo: string[];
}

interface Noticia {
  fecha: string;
  categoria: string;
  titulo: string;
  resumen: string;
  imagen: string;
  url: string;
}

interface Cifra {
  valor: number;
  etiqueta: string;
  detalle: string;
}

interface Integrante {
  nombre: string;
  cargo: string;
  detalle: string;
}

interface EtapaAdmision {
  numero: string;
  titulo: string;
  descripcion: string;
}

interface Valor {
  titulo: string;
  descripcion: string;
  icono: string;
}

interface Sede {
  nombre: string;
  tipo: string;
  direccion: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly destroyRef = inject(DestroyRef);
  private readonly zonaCifras = viewChild<ElementRef<HTMLElement>>('zonaCifras');

  /* ===================== Estado reactivo ===================== */

  protected readonly menuAbierto = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly slideActual = signal(0);
  protected readonly tabActiva = signal<'mision' | 'vision' | 'valores'>('mision');
  protected readonly filtroFacultad = signal<'todas' | 'FCE' | 'FI' | 'FCA'>('todas');
  protected readonly correoSuscripcion = signal('');
  protected readonly suscripcionEnviada = signal(false);

  protected readonly anioActual = new Date().getFullYear();
  protected readonly aniosDeCreacion = this.anioActual - 2009;

  /* ===================== Datos institucionales ===================== */

  protected readonly enlacesRapidos: EnlaceRapido[] = [
    { texto: 'Libro de Reclamaciones', url: 'https://reclamos.servicios.gob.pe/?institution_id=234' },
    { texto: 'Transparencia Universitaria', url: 'https://web.undc.edu.pe/transparencia-universitaria/' },
    { texto: 'Portal de Transparencia', url: 'https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=15357' },
    { texto: 'Denuncias', url: 'https://denuncias.undc.edu.pe/denuncias' },
    { texto: 'gob.pe UNDC', url: 'https://www.gob.pe/unicanete' },
  ];

  protected readonly menu: ItemMenu[] = [
    {
      texto: 'Universidad',
      url: '#institucional',
      hijos: [
        { texto: 'Reseña histórica', url: '#institucional' },
        { texto: 'Misión y visión', url: '#mision-vision' },
        { texto: 'Comisión Organizadora', url: '#autoridades' },
        { texto: 'Documentos UNDC', url: '#transparencia' },
      ],
    },
    {
      texto: 'Facultades',
      url: '#facultades',
      hijos: [
        { texto: 'Ciencias Empresariales', url: '#facultades' },
        { texto: 'Ingeniería', url: '#facultades' },
        { texto: 'Ciencias Agrarias', url: '#facultades' },
      ],
    },
    {
      texto: 'Posgrado',
      url: '#servicios',
      hijos: [
        { texto: 'Escuela de Posgrado UNDC', url: '#servicios' },
        { texto: 'Revistas científicas', url: '#noticias' },
        { texto: 'Repositorio institucional', url: '#noticias' },
      ],
    },
    {
      texto: 'Investigación',
      url: '#institucional',
      hijos: [
        { texto: 'Vicerrectorado de Investigación', url: '#autoridades' },
        { texto: 'Centro de Sustentabilidad (CIIS)', url: '#sedes' },
        { texto: 'Estación Meteorológica', url: '#sedes' },
      ],
    },
    { texto: 'Admisión', url: '#admision' },
    { texto: 'Servicios', url: '#servicios' },
    { texto: 'Contacto', url: '#contacto' },
  ];

  protected readonly banners = [
    {
      etiqueta: 'Licenciada por la SUNEDU',
      titulo: 'Comunidad académica al servicio de Cañete',
      texto:
        'Formación profesional, investigación y extensión universitaria con sello de calidad, bajo el marco de la Ley Universitaria N.° 30220.',
      cta: 'Conoce la historia',
      ctaUrl: '#institucional',
      clase: 'banner--azul',
    },
    {
      etiqueta: 'Proceso de admisión abierto',
      titulo: 'Tu futuro profesional empieza en la UNDC',
      texto:
        'Seis programas académicos en Administración, Contabilidad, Derecho, Turismo y Hotelería, Agronomía e Ingeniería de Sistemas.',
      cta: 'Ver proceso de admisión',
      ctaUrl: '#admision',
      clase: 'banner--verde',
    },
    {
      etiqueta: 'Desarrollo sostenible',
      titulo: 'Investigación con raíz en el territorio',
      texto:
        'El Centro Internacional de Investigación para la Sustentabilidad, en Lunahuaná, conecta ciencia, costa y economía circular.',
      cta: 'Conocer las facultades',
      ctaUrl: '#facultades',
      clase: 'banner--vino',
    },
  ];

  protected readonly programas: Programa[] = [
    {
      id: 'administracion',
      carrera: 'Administración',
      facultad: 'Facultad de Ciencias Empresariales',
      siglaFacultad: 'FCE',
      imagen: 'assets/logo-ep-admin.png',
      titulo: 'Gestión para el desarrollo territorial',
      descripcion:
        'Formula y mejora procesos, administra los recursos de las organizaciones y evalúa el efecto de las políticas públicas en la generación de bienestar social.',
      campo: ['Gestión pública', 'Finanzas', 'Marketing', 'Emprendimiento'],
    },
    {
      id: 'contabilidad',
      carrera: 'Contabilidad',
      facultad: 'Facultad de Ciencias Empresariales',
      siglaFacultad: 'FCE',
      imagen: 'assets/logo-ep-contabilidad.jpeg',
      titulo: 'Información financiera para la decisión',
      descripcion:
        'Elabora y audita estados financieros, aplica el sistema tributario y certifica la razonabilidad de la información económica de las empresas.',
      campo: ['Auditoría', 'Tributación', 'Finanzas corporativas'],
    },
    {
      id: 'derecho',
      carrera: 'Derecho y Ciencias Políticas',
      facultad: 'Facultad de Ciencias Empresariales',
      siglaFacultad: 'FCE',
      imagen: 'assets/logo-ep-derecho.jpeg',
      titulo: 'Justicia, Estado y ciudadanía',
      descripcion:
        'Analiza el ordenamiento jurídico, defender derechos y diseña políticas públicas con enfoque de derechos humanos y desarrollo local.',
      campo: ['Penal', 'Civil', 'Laboral', 'Derecho público'],
    },
    {
      id: 'turismo',
      carrera: 'Administración de Turismo y Hotelería',
      facultad: 'Facultad de Ciencias Empresariales',
      siglaFacultad: 'FCE',
      imagen: 'assets/logo-ep-turismo.jpg',
      titulo: 'El mar y la costa de Cañete como patrimonio',
      descripcion:
        'Gestiona destinos, hoteles y servicios turísticos con enfoque sostenible, valorando los recursos costeros de la región.',
      campo: ['Hotelería', 'Turismo de playa', 'Gestión de destinos'],
    },
    {
      id: 'sistemas',
      carrera: 'Ingeniería de Sistemas',
      facultad: 'Facultad de Ingeniería',
      siglaFacultad: 'FI',
      imagen: 'assets/logo-ep-sistemas.png',
      titulo: 'Tecnología al servicio de la comunidad',
      descripcion:
        'Diseña, desarrolla e implementa sistemas de información y soluciones tecnológicas con estándares de calidad, seguridad e innovación.',
      campo: ['Desarrollo de software', 'Redes', 'Ciencia de datos', 'Inteligencia artificial'],
    },
    {
      id: 'agronomia',
      carrera: 'Agronomía',
      facultad: 'Facultad de Ciencias Agrarias',
      siglaFacultad: 'FCA',
      imagen: 'assets/logo-ep-agronomia.png',
      titulo: 'Producción sostenible en el agro cañetano',
      descripcion:
        'Maneja los recursos naturales, mejora la productividad agrícola y aplica tecnologías de manejo sostenible en el valle de Cañete.',
      campo: ['Agropecuaria', 'Riegos', 'Sanidad vegetal', 'Agroindustria'],
    },
  ];

  protected readonly programasFiltrados = computed(() => {
    const filtro = this.filtroFacultad();
    return filtro === 'todas' ? this.programas : this.programas.filter((p) => p.siglaFacultad === filtro);
  });

  private readonly valoresCifras = signal<number[]>([0, 0, 0, 0, 0]);

  protected readonly cifras = computed<Cifra[]>(() => [
    { valor: 3, etiqueta: 'Facultades', detalle: 'Empresarial, Ingeniería y Agrarias' },
    { valor: this.programas.length, etiqueta: 'Programas académicos', detalle: 'Todos licenciados por la SUNEDU' },
    { valor: 2, etiqueta: 'Locales licenciados', detalle: 'Resolución N.° 116-2018-SUNEDU/CD' },
    { valor: 5, etiqueta: 'Sedes', detalle: 'Administrativas, académicas y de investigación' },
    { valor: this.aniosDeCreacion, etiqueta: 'Años de trayectoria', detalle: 'Creada por la Ley N.° 29488' },
  ]);

  protected readonly cifrasAnimadas = computed(() =>
    this.cifras().map((c, i) => ({ ...c, valor: this.valoresCifras()[i] ?? 0 })),
  );

  protected readonly hitos = [
    {
      anio: '2007',
      titulo: 'La iniciativa legislativa',
      texto: 'La Municipalidad Provincial de Cañete presenta ante el Congreso de la República la creación de la universidad.',
    },
    {
      anio: '2009',
      titulo: 'Nace la UNDC',
      texto: 'La Ley N.° 29488, del 22 de diciembre, crea la Universidad Nacional de Cañete.',
    },
    {
      anio: '2014',
      titulo: 'Primer ingreso',
      texto: 'El 13 de abril se realiza el primer examen de admisión con 400 ingresantes.',
    },
    {
      anio: '2016',
      titulo: 'Sede en Cañete',
      texto: 'La Ley N.° 30515 fija el domicilio de la UNDC en la provincia de Cañete, departamento de Lima.',
    },
    {
      anio: '2018',
      titulo: 'Licenciamiento',
      texto: 'La SUNEDU otorga la licencia institucional para sus dos locales académicos.',
    },
    {
      anio: '2026',
      titulo: 'Consolidación',
      texto: 'Seis programas académicos, posgrado y el CIIS en Lunahuaná.',
    },
  ];

  protected readonly valores: Valor[] = [
    {
      titulo: 'Ética',
      descripcion: 'Actuamos con honestidad y responsabilidad en el desempeño de la función académica y administrativa.',
      icono: 'M12 3 4 7v6c0 4.4 3.8 7.9 8 9 4.2-1.1 8-4.6 8-9V7z',
    },
    {
      titulo: 'Calidad',
      descripcion: 'Sostenemos estándares académicos y de gestión alineados a las condiciones básicas de la SUNEDU.',
      icono: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
    },
    {
      titulo: 'Identidad cultural',
      descripcion: 'Reafirmamos el compromiso con la historia, el territorio y los valores del pueblo cañetano.',
      icono: 'M12 2 2 9l10 22L22 9z M12 6.2 18.9 11H5.1z',
    },
    {
      titulo: 'Responsabilidad social',
      descripcion: 'La investigación y la extensión se proyectan en respuesta a las necesidades del territorio.',
      icono: 'M12 21s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9',
    },
  ];

  protected readonly autoridades: Integrante[] = [
    { nombre: 'Dr. Mauro Juan Ramírez Herrera', cargo: 'Presidente', detalle: 'Presidencia de la Comisión Organizadora' },
    { nombre: 'PhD. Juvenal Castromonte Salinas', cargo: 'Vicepresidente Académico', detalle: 'Dirección de Gestión Académica' },
    { nombre: 'Dr. Jorge Rafael Díaz Dumont', cargo: 'Vicepresidente de Investigación', detalle: 'Vicerrectorado de Investigación' },
  ];

  protected readonly etapasAdmision: EtapaAdmision[] = [
    { numero: '01', titulo: 'Registro del postulante', descripcion: 'Descarga el prospecto, completa la ficha de inscripción y cancela el derecho de matrícula.' },
    { numero: '02', titulo: 'Examen de admisión', descripcion: 'Rinde el examen de aptitude y conocimiento en la sede académica que se le asigne.' },
    { numero: '03', titulo: 'Resultados y matrícula', descripcion: 'Consulta el ranking de admitidos y formaliza su matrícula dentro del plazo establecido.' },
    { numero: '04', titulo: 'Inicio de actividades', descripcion: 'Ingresa a la sede con inducción académica, tutorías y apoyo estudiantil institucional.' },
  ];

  protected readonly servicios = [
    { titulo: 'Campus Virtual', detalle: 'Aulas virtuales y evaluaciones en línea', url: 'https://aula.undc.edu.pe/' },
    { titulo: 'Biblioteca', detalle: 'Fondo bibliográfico actualizado y acceso a bases de datos', url: 'https://biblioteca.undc.edu.pe/' },
    { titulo: 'Centro de Idiomas', detalle: 'Formación en inglés para la comunidad universitaria', url: 'https://idiomas.undc.edu.pe/' },
    { titulo: 'Centro Preuniversitario', detalle: 'Academia de preparación para el ingreso a la UNDC', url: 'https://www.undc.edu.pe/cepre/' },
    { titulo: 'Bolsa de Trabajo', detalle: 'Oportunidades laborales para estudiantes y egresados', url: 'https://dbu.undc.edu.pe/bolsa-de-trabajo/' },
    { titulo: 'Repositorio', detalle: 'Producción científica y tesis de la UNDC', url: 'https://repositorio.undc.edu.pe/home' },
  ];

  protected readonly noticias: Noticia[] = [
    {
      fecha: '20 de febrero, 2026',
      categoria: 'Académico',
      titulo: 'Invitación a la ceremonia de graduación 2026',
      resumen: 'La Casa de Estudios refuerza su compromiso con la formación integral de sus egresados.',
      imagen: 'assets/noticia-1.jpg',
      url: 'https://web.undc.edu.pe/',
    },
    {
      fecha: '2 de febrero, 2026',
      categoria: 'Responsabilidad Social',
      titulo: 'Día Mundial de los Humedales',
      resumen: 'La comunidad académica participa en la jornada por la conservación de los humedales costeros.',
      imagen: 'assets/noticia-2.jpeg',
      url: 'https://web.undc.edu.pe/',
    },
    {
      fecha: '11 de setiembre, 2025',
      categoria: 'Investigación',
      titulo: 'Resultados del concurso Historia, Acervo Cultural y Himno',
      resumen: 'La Vicepresidencia de Investigación aprobó los resultados del concurso institucional.',
      imagen: 'assets/noticia-3.jpg',
      url: 'https://web.undc.edu.pe/',
    },
    {
      fecha: '22 de diciembre, 2025',
      categoria: 'Institucional',
      titulo: 'Aniversario de creación institucional',
      resumen: 'La comunidad universitaria recuerda la fecha histórica de creación de la Universidad.',
      imagen: 'assets/noticia-4.jpg',
      url: 'https://web.undc.edu.pe/',
    },
  ];

  protected readonly sedes: Sede[] = [
    { nombre: 'Sede Administrativa Central', tipo: 'Administrativa', direccion: 'Jr. San Agustín 124, San Vicente de Cañete' },
    { nombre: 'Sede Administrativa Hualcará', tipo: 'Administrativa', direccion: 'Mariano Ramos Dammert s/n, Urb. Santa Rosa de Hualcará' },
    { nombre: 'Local Académico Casa de la Cultura', tipo: 'Académica', direccion: 'Av. Mariscal Benavides N.° 1370, San Vicente' },
    { nombre: 'Local Académico Fundo Don Luis', tipo: 'Académica', direccion: 'Panamericana Sur km 139, Mz. A Lt. 1, San Luis' },
    { nombre: 'Centro Internacional de Investigación para la Sustentabilidad', tipo: 'Investigación', direccion: 'Prolongación Santa Rosa s/n, Lunahuaná' },
  ];

  protected readonly contacto = {
    telefono: '+51 949 027 044',
    telefonoEnlace: 'tel:+51949027044',
    correo: 'tramite@undc.edu.pe',
    cepres: '+51 967 279 159',
    admision: '+51 967 279 139',
    horario: 'Lunes a viernes, 8:00 a. m. a 5:00 p. m.',
  };

  /* ===================== Lógica de la vista ===================== */

  constructor() {
    const intervalo = setInterval(() => {
      this.slideActual.update((i) => (i + 1) % this.banners.length);
    }, 7000);
    this.destroyRef.onDestroy(() => clearInterval(intervalo));

    const alDesplazar = () => this.scrolled.set(window.scrollY > 24);
    window.addEventListener('scroll', alDesplazar, { passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', alDesplazar));

    afterNextRender(() => this.activarObservadores());
  }

  protected irASlide(indice: number): void {
    this.slideActual.set(indice);
  }

  protected siguienteSlide(): void {
    this.slideActual.update((i) => (i + 1) % this.banners.length);
  }

  protected slideAnterior(): void {
    this.slideActual.update((i) => (i - 1 + this.banners.length) % this.banners.length);
  }

  protected alternarMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  protected irAAncla(id: string, event: Event): void {
    event.preventDefault();
    this.cerrarMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected enviarSuscripcion(event: Event): void {
    event.preventDefault();
    if (this.correoSuscripcion().trim().length > 3) {
      this.suscripcionEnviada.set(true);
    }
  }

  private activarObservadores(): void {
    const objetivos = document.querySelectorAll<HTMLElement>('[data-reveal]');

    if (typeof IntersectionObserver === 'undefined') {
      objetivos.forEach((el) => el.classList.add('es-visible'));
      this.valoresCifras.set(this.cifras().map((c) => c.valor));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('es-visible');
            observador.unobserve(entrada.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    objetivos.forEach((el) => observador.observe(el));

    const zona = this.zonaCifras()?.nativeElement;
    if (zona) {
      const observadorCifras = new IntersectionObserver(
        (entradas) => {
          if (entradas.some((e) => e.isIntersecting)) {
            this.animarCifras();
            observadorCifras.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      observadorCifras.observe(zona);
    }
  }

  private animarCifras(): void {
    const destino = this.cifras().map((c) => c.valor);
    const duracion = 1400;
    const inicio = performance.now();

    const paso = (ahora: number) => {
      const avance = Math.min((ahora - inicio) / duracion, 1);
      const suavizado = 1 - Math.pow(1 - avance, 3);
      this.valoresCifras.set(destino.map((v) => Math.round(v * suavizado)));
      if (avance < 1) {
        requestAnimationFrame(paso);
      }
    };
    requestAnimationFrame(paso);
  }
}
