import { useState } from 'react'
import './App.css'

const datos = {
  universidad: {
    nombre: 'Universidad Nacional de Cañete',
    sigla: 'UNDC',
    lema: 'LEMA',
    fundacion: '2009',
  },
  contacto: {
    direccion: 'Av. Mariscal Benavides 1370, San Vicente de Cañete.',
    telefono: '(+51) 949 027 044',
    email: 'tramite@undc.edu.pe',
    horarios: 'Lunes a viernes, 8:00 a 18:00 h',
  },
  documentos: [
    { titulo: 'Reglamento de la Universidad', href: 'https://web.undc.edu.pe/reglamentos-2/' },
    { titulo: 'Informe de Autoevaluación', href: 'https://web.undc.edu.pe/test-de-autoevaluacion-artistica-undc-2022-i/' },
  ],
}

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [email, setEmail] = useState('')
  const [suscrito, setSuscrito] = useState(false)

  return (
    <div className="universidad">
      <header className="cabecera">
        <div className="barra-institucional">
          <div className="contenedor barra-institucional__contenido">
            <p>{datos.universidad.lema}</p>
            <nav aria-label="Enlaces institucionales">
              <a href="#contacto">Campus Central</a>
              <a href="#bibliotecas">Bibliotecas</a>
              <a href="#noticias">Noticias</a>
            </nav>
          </div>
        </div>

        <div className="cabecera__principal">
          <div className="contenedor cabecera__fila">
            <a className="marca" href="#inicio">
              <img
                src="/imagenes/logo-undc.png"
                alt="Escudo de la universidad"
                width="56"
                height="60"
              />
              <span className="marca__texto">
                <strong>{datos.universidad.nombre}</strong>
                <small>
                  {datos.universidad.sigla} · Fundada en {datos.universidad.fundacion}
                </small>
              </span>
            </a>

            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuAbierto}
              aria-controls="navegacion-principal"
              onClick={() => setMenuAbierto((v) => !v)}
            >
              <span className="menu-toggle__barra" />
              <span className="menu-toggle__barra" />
              <span className="menu-toggle__barra" />
              <span className="sr-only">Abrir menú</span>
            </button>

            <nav
              id="navegacion-principal"
              className={`navegacion ${menuAbierto ? 'navegacion--abierta' : ''}`}
              aria-label="Navegación principal"
            >
              <a href="#inicio">Inicio</a>
              <a href="#universidad">La Universidad</a>
              <a href="#facultades">Facultades</a>
              <a href="#investigacion">Investigación</a>
              <a href="#admisiones">Admisiones</a>

              <span className="navegacion__documentos">
                {datos.documentos.map((doc) => (
                  <a key={doc.href} href={doc.href} target="_blank" rel="noreferrer">
                    {doc.titulo}
                  </a>
                ))}
              </span>

              <a className="boton boton--primario" href="#admisiones">
                Postular
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main id="inicio">
        <section className="portada">
          <img
            className="portada__imagen"
            src="/imagenes/images.jpg"
            alt="Edificio principal de la universidad al atardecer"
          />
          <div className="portada__contenido contenedor">
            <p className="portada__antetitulo">Comunidad universitaria</p>
            <h1>Educación pública de calidad para el desarrollo del país</h1>
            <p className="portada__texto">
              Formamos profesionales, investigamos y transferimos conocimiento al territorio.
              Una universidad pública, abierta y comprometida con su comunidad.
            </p>
            <div className="portada__acciones">
              <a className="boton boton--primario" href="#admisiones">
                Conocé el proceso de admisión
              </a>
              <a className="boton boton--secundario" href="#facultades">
                Ver carreras
              </a>
            </div>
          </div>

          <dl className="cifras contenedor">
            <div className="cifras__dato">
              <dt>Estudiantes</dt>
              <dd>62.400</dd>
            </div>
            <div className="cifras__dato">
              <dt>Docentes</dt>
              <dd>7.850</dd>
            </div>
            <div className="cifras__dato">
              <dt>Carreras de grado</dt>
              <dd>128</dd>
            </div>
            <div className="cifras__dato">
              <dt>Facultades</dt>
              <dd>17</dd>
            </div>
          </dl>
        </section>

        <section className="seccion" id="universidad">
          <div className="contenedor institucion">
            <div className="institucion__texto">
              <p className="antetitulo">Quiénes somos</p>
              <h2>Una universidad pública con tradición y proyección</h2>
              <p>
                Fundada en {datos.universidad.fundacion}, la {datos.universidad.nombre} es la casa
                de estudios de referencia del país. A lo largo de más de un siglo ha sostenido su
                compromiso con la enseñanza gratuita, la investigación aplicada y la renovación
                permanente del conocimiento.
              </p>
              <p>
                Nuestra comunidad reúne a estudiantes, docentes, investigadoras,
                investigadores, graduados y organismos de la sociedad en torno a proyectos
                académico, Extension y desarrollo territorial.
              </p>
              <ul className="lista-valor">
                <li>Formación profesional de grado y posgrado</li>
                <li>Investigación, ciencia y transferencia tecnológica</li>
                <li>Extensión universitaria y servicio a la comunidad</li>
                <li>Bienestar estudiantil e inclusión</li>
              </ul>
              <a className="enlace-flecha" href="#historia">
                Conocé nuestra historia
              </a>
            </div>

            <figure className="institucion__imagen">
              <img
                src="/imagenes/images2.jpg"
                alt="Sala de lectura de la biblioteca central"
                loading="lazy"
              />
              <figcaption>Biblioteca Central — sala de lectura</figcaption>
            </figure>
          </div>
        </section>

        <section className="seccion seccion--gris" id="facultades">
          <div className="contenedor">
            
            <header className="seccion__cabecera">
              <div>
                <p className="antetitulo">Áreas del conocimiento</p>
                <h2>Escuela Profesionales</h2>
              </div>
              <a className="enlace-flecha" href="#todas-las-carreras">
                Ver todas las carreras
              </a>
            </header>

            <div className="rejilla-facultades">

              <article className="tarjeta-facultad">
                <img src="/imagenes/ing.jpg" alt="Escuela Profesional de Ingeniería de Sistemas" loading="lazy" />
                <div className="tarjeta-facultad__cuerpo">
                  <h3>Escuela Profesional de Ingeniería de Sistermas</h3>
                  <p>
                    Ingenierías, arquitectura y tecnologías de la información, con un fuerte
                    vínculo con la industria y la innovación tecnológica.
                  </p>
                  <a className="enlace-flecha" href="#ingenieria">
                    Conocer la facultad
                  </a>
                </div>
              </article>

              <article className="tarjeta-facultad">
                <img src="/imagenes/agro.jpg" alt="Escuela Profesional de Agronomia" loading="lazy" />
                <div className="tarjeta-facultad__cuerpo">
                  <h3>Escuela Profesional de Agronomia</h3>
                  <p>
                    Formación práctica en producción agrícola, manejo de cultivos, investigación agraria y conservación de los recursos naturales.
                  </p>
                  <a className="enlace-flecha" href="#medicina">
                    Conocer la facultad
                  </a>
                </div>
              </article>

              <article className="tarjeta-facultad">
                <img src="/imagenes/derecho.jpg" alt="Escuela Profesional de Derecho y Ciencias Politicas" loading="lazy" />
                <div className="tarjeta-facultad__cuerpo">
                  <h3>Escuela Profesional de Derecho y Ciencias Politicas</h3>
                  <p>
                    Derecho y Ciencias Sociales con perspectiva de derechos humanos, justicia
                    social y acceso a la justicia.
                  </p>
                  <a className="enlace-flecha" href="#derecho">
                    Conocer la facultad
                  </a>
                </div>
              </article>

              <article className="tarjeta-facultad">
                <img
                  src="/imagenes/admin.jpg"
                  alt="Escuela Profesional de Administracion"
                  loading="lazy"
                />
                <div className="tarjeta-facultad__cuerpo">
                  <h3>Escuela Profesional de Administracion</h3>
                  <p>
                     Matemática, economía, contabilidad y gestión: la base que impulsa la toma de decisiones y el desarrollo empresarial.
                  </p>
                  <a className="enlace-flecha" href="#exactas">
                    Conocer la facultad
                  </a>
                </div>
              </article>

            </div>
          </div>
        </section>

        <section className="seccion seccion--gris" id="admisiones">
          <div className="contenedor">
            <header className="seccion__cabecera">
              <div>
                <p className="antetitulo">Ingresá a la universidad</p>
                <h2>Admisiones 2027</h2>
              </div>
              <a className="enlace-flecha" href="#bases">
                Bases y cronograma
              </a>
            </header>

            <ol className="pasos">
              <li className="paso">
                <span className="paso__numero">01</span>
                <h3>Preinscripción</h3>
                <p>
                  Completá el formulario en línea entre el 1 de septiembre y el 30 de noviembre.
                </p>
              </li>
              <li className="paso">
                <span className="paso__numero">02</span>
                <h3>Documentación</h3>
                <p>Presentá DNI, constancia de estudios y certificado de secundaria.</p>
              </li>
              <li className="paso">
                <span className="paso__numero">03</span>
                <h3>Examen de ingreso</h3>
                <p>
                  Las carreras que lo requieren convocan a una instancia de evaluación.
                </p>
              </li>
              <li className="paso">
                <span className="paso__numero">04</span>
                <h3>Matriculación</h3>
                <p>Confirmás tu lugar y completás la inscripción a materias.</p>
              </li>
            </ol>

            <div className="callout">
              <div>
                <h3>¿Necesitás orientación para estudiar?</h3>
                <p>
                  La central de admisiones tiene un chat de ayuda, un servicio de atención a
                  personas sordas y un área de acompañamiento para estudiantes de bajos recursos.
                </p>
              </div>
              <a className="boton boton--claro" href="#contacto">
                Comunicarse por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="seccion" id="noticias">
          <div className="contenedor">
            <header className="seccion__cabecera">
              <div>
                <p className="antetitulo">Actualidad universitaria</p>
                <h2>Noticias</h2>
              </div>
              <a className="enlace-flecha" href="#todas-las-noticias">
                Ver todas las noticias
              </a>
            </header>

            <div className="rejilla-noticias">
              <article className="noticia">
                <img src="/imagenes/noticia-1.svg" alt="Noticia de investigación" loading="lazy" />
                <div className="noticia__cuerpo">
                  <p className="etiqueta">Investigación</p>
                  <h3>
                    <a href="#noticia-investigacion">
                      Un equipo universitario desarrolla un sensor para la calidad del agua
                    </a>
                  </h3>
                  <p className="noticia__fecha">12 de septiembre de 2026</p>
                </div>
              </article>

              <article className="noticia">
                <img src="/imagenes/noticia-2.svg" alt="Noticia de extensión" loading="lazy" />
                <div className="noticia__cuerpo">
                  <p className="etiqueta">Extensión</p>
                  <h3>
                    <a href="#noticia-extension">
                      La comunidad reúne a más de 3.000 jóvenes en talleres de ciencia abierta
                    </a>
                  </h3>
                  <p className="noticia__fecha">5 de septiembre de 2026</p>
                </div>
              </article>

              <article className="noticia">
                <img src="/imagenes/noticia-3.svg" alt="Noticia de docencia" loading="lazy" />
                <div className="noticia__cuerpo">
                  <p className="etiqueta">Docencia</p>
                  <h3>
                    <a href="#noticia-docencia">
                      Se aprobará un nuevo plan de estudios de Ingeniería en Alimentos
                    </a>
                  </h3>
                  <p className="noticia__fecha">28 de agosto de 2026</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="suscripcion">
          <div className="contenedor suscripcion__fila">
            <div>
              <h2>Recibí el boletín de la comunidad</h2>
              <p>
                Novedades de investigación, convocatorias, admisiones y agenda cultural, una
                vez al mes.
              </p>
            </div>
            <form
              className="suscripcion__formulario"
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSuscrito(true)
              }}
            >
              <label className="sr-only" htmlFor="correo">
                Correo electrónico
              </label>
              <input
                id="correo"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                  setSuscrito(false)
                }}
              />
              <button className="boton boton--primario" type="submit">
                {suscrito ? '¡Listo!' : 'Suscribirme'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="pie" id="contacto">
        <div className="contenedor pie__rejilla">
          <div className="pie__columna pie__columna--marca">
            <img src="/imagenes/logo-undc.png" alt="Escudo de la universidad" width="48" height="52" />
            <p className="pie__nombre">{datos.universidad.nombre}</p>
            <p>{datos.universidad.lema}</p>
          </div>

          <div className="pie__columna">
            <h3>Universidad</h3>
            <ul>
              <li>
                <a href="#autoridades">Autoridades</a>
              </li>
              <li>
                <a href="#historia">Historia</a>
              </li>
              <li>
                <a href="#transparencia">Transparencia</a>
              </li>
              <li>
                <a href="#trabaja-con-nosotros">Trabaja con nosotros</a>
              </li>
            </ul>
          </div>

          <div className="pie__columna">
            <h3>Estudiantes</h3>
            <ul>
              <li>
                <a href="#admisiones">Admisiones</a>
              </li>
              <li>
                <a href="#becas">Becas y Scholarships</a>
              </li>
              <li>
                <a href="#bienestar">Bienestar estudiantil</a>
              </li>
              <li>
                <a href="#bibliotecas">Bibliotecas</a>
              </li>
            </ul>
          </div>

          <div className="pie__columna">
            <h3>Contacto</h3>
            <address>
              <p>{datos.contacto.direccion}</p>
              <p>{datos.contacto.telefono}</p>
              <p>
                <a href={`mailto:${datos.contacto.email}`}>{datos.contacto.email}</a>
              </p>
              <p>{datos.contacto.horarios}</p>
            </address>
          </div>
        </div>

        <div className="contenedor pie__legal">
          <p>© 2026 {datos.universidad.nombre}. Todos los derechos reservados.</p>
          <ul className="pie__legal-enlaces">
            {datos.documentos.map((doc) => (
              <li key={doc.href}>
                <a href={doc.href} target="_blank" rel="noreferrer">
                  {doc.titulo}
                </a>
              </li>
            ))}
            <li>
              <a href="#privacidad">Privacidad</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default App
