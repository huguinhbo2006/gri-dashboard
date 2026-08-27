import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { PageElement } from '../models/element.model';
import { map } from 'rxjs/operators';
import { PagesService } from './page';

@Injectable({ providedIn: 'root' })
export class Builder {

  private currentPage$ = new BehaviorSubject<Page | null>(null);
  private menuStyle$ = new BehaviorSubject<string>('capsule');
  private menuSinTransparencia$ = new BehaviorSubject<boolean>(false);

  constructor(private pagesService: PagesService) {
    this.pagesService.traer({ id: '215b86d9-b308-43f5-b649-d8d234580607' }).subscribe((res: any) => {
      const elements = res?.content?.elements || [];
      const menuEl = elements.find((el: any) => el.type === 'menu');
      if (menuEl) {
        this.menuStyle$.next(menuEl.props?.styleType || 'capsule');
        this.menuSinTransparencia$.next(menuEl.props?.sinTransparencia ?? false);
      }
    });
  }

  getCurrentPage(): Observable<Page | null> {
    return this.currentPage$.asObservable();
  }

  getCurrentPageValue(): Page | null {
    return this.currentPage$.value;
  }

  getMenuStyle(): Observable<string> {
    return this.menuStyle$.asObservable();
  }

  getMenuStyleValue(): string {
    return this.menuStyle$.value;
  }

  getMenuSinTransparenciaValue(): boolean {
    return this.menuSinTransparencia$.value;
  }

  saveGlobalMenu(styleType: string, sinTransparencia: boolean = false) {
    this.menuStyle$.next(styleType);
    this.menuSinTransparencia$.next(sinTransparencia);
    this.pagesService.traer({ id: '215b86d9-b308-43f5-b649-d8d234580607' }).subscribe((res: any) => {
      const elements = res?.content?.elements || [];
      let menuEl = elements.find((el: any) => el.type === 'menu');
      if (menuEl) {
        menuEl.props = { styleType, sinTransparencia };
      } else {
        elements.unshift({
          type: 'menu',
          props: { styleType, sinTransparencia }
        });
      }
      this.pagesService.contenido({ id: '215b86d9-b308-43f5-b649-d8d234580607', content: { elements } }).subscribe(() => {
        console.log("💾 Menú global guardado en Home (Página de inicio)");
      });
    });
  }

  loadPage(pageId: string) {
    this.pagesService.traer({ id: pageId })
      .pipe(
        map((res: any) => ({
          id: res.id,
          name: res.name,
          slug: res.slug,
          elements: res.content?.elements || []
        } as Page))
      )
      .subscribe(page => {
        console.log("📥 Página cargada desde BD:", page);
        this.currentPage$.next(page);
      });
  }

  addElement(type: PageElement['type'], props?: any) {
    const page = this.currentPage$.value;
    if (!page) return;
    const newElement: PageElement = {
      id: crypto.randomUUID(),
      type,
      col: 12,
      props: props || this.getDefaultProps(type)
    };
    const updatedPage: Page = {
      ...page,
      elements: [...page.elements, newElement]
    };
    this.currentPage$.next(updatedPage);
    this.saveCurrentPage();
  }

  saveCurrentPage() {
    const page = this.getCurrentPageValue();
    if (!page) return;
    const elements = page.elements.map(el => ({
      ...el,
      col: el.col ?? 12
    }));
    const payload = {
      id: page.id,
      content: { elements }
    };
    this.pagesService.contenido(payload).subscribe(
      res => {
        console.log("✅ RESPUESTA BACKEND:", res);
      },
      err => {
        console.error("❌ ERROR GUARDANDO CONFIGURACIÓN:", err);
      }
    );
  }

  updateElements(elements: PageElement[]) {
    const page = this.getCurrentPageValue();
    if (!page) return;
    const updatedPage: Page = {
      ...page,
      elements: [...elements]
    };
    this.currentPage$.next(updatedPage);
    this.saveCurrentPage();
  }

  private getDefaultProps(type: PageElement['type']): any {
    switch (type) {
      case 'ejemplo':
        return {
          titulo: 'Mi Componente Ejemplo',
          contenido: 'Este es un contenido de prueba.'
        };
      case 'imagen-texto':
        return {
          titulo: 'Título del Componente Imagen y Texto',
          contenido: 'Este es el texto descriptivo que acompaña a la imagen.',
          imagenUrl: 'https://via.placeholder.com/600x400',
          alineacion: 'izquierda'
        };
      case 'banner':
        return {
          "titulo": "Banner Principal",
          "subtitulo": "Aprende con los mejores expertos de la industria.",
          "imagenUrl": "https://via.placeholder.com/1200x400",
          "botonTexto": "Ver Cursos",
          "botonLink": "/cursos"
};
      case 'hero':
        return {
          "titulo": "Lumiere Educación",
          "subtitulo": "Tu futuro profesional empieza hoy mismo.",
          "imagenUrl": "https://via.placeholder.com/1920x800",
          "botonTexto": "Comenzar Ahora",
          "botonLink": "/registro"
};
      case 'simulador':
        return {
          "titulo": "Simulador de Examen",
          "descripcion": "Prueba tus conocimientos con nuestro simulador dinámico.",
          "urlExamen": "https://examen.lumiere.com"
};
      case 'cursos-udg':
        return {
          "titulo": "Cursos de Admisión UDG",
          "descripcion": "Prepara tu examen de ingreso a la Universidad de Guadalajara."
};
      case 'muro-opiniones':
        return {
          "titulo": "Lo que dicen nuestros alumnos",
          "opinionesJson": "[\n  {\n    \"nombre\": \"Sofía Martínez\",\n    \"rating\": 5,\n    \"comentario\": \"Excelente curso, obtuve mi puntaje deseado.\"\n  },\n  {\n    \"nombre\": \"Carlos Ruiz\",\n    \"rating\": 4.8,\n    \"comentario\": \"Los profesores son muy dedicados y explican increíble.\"\n  }\n]"
};
      case 'badge-flotante':
        return {
          "texto": "¡Nuevo Examen Disponible!",
          "link": "/examenGratis",
          "icono": "fas fa-bell"
};
      case 'whatsapp':
        return {
          "telefono": "523300000000",
          "mensajePredefinido": "Hola, me gustaría recibir informes sobre los cursos."
};
      case 'faq':
        return {
          "titulo": "Preguntas Frecuentes",
          "faqsJson": "[\n  {\n    \"pregunta\": \"¿Cuándo inician los cursos?\",\n    \"respuesta\": \"Tenemos inicios cada mes para modalidades presenciales y virtuales.\"\n  },\n  {\n    \"pregunta\": \"¿Qué formas de pago aceptan?\",\n    \"respuesta\": \"Aceptamos transferencias bancarias, pagos con tarjeta y depósitos en Oxxo.\"\n  }\n]"
};
      case 'foto-planteles':
        return {
          "titulo": "Nuestras Instalaciones",
          "fotosJson": "[\n  {\n    \"nombre\": \"Plantel Centro\",\n    \"imagenUrl\": \"https://via.placeholder.com/600x400\"\n  },\n  {\n    \"nombre\": \"Plantel Américas\",\n    \"imagenUrl\": \"https://via.placeholder.com/600x400\"\n  }\n]"
};
      case 'mensaje':
        return {
          "titulo": "Aviso Importante",
          "texto": "Las inscripciones para el próximo ciclo cierran el 30 de Septiembre. Asegura tu lugar."
};
      case 'numeros':
        return {
          "titulo": "Nuestros Logros",
          "itemsJson": "[\n  {\n    \"numero\": \"95%\",\n    \"etiqueta\": \"Aprobados\"\n  },\n  {\n    \"numero\": \"10k+\",\n    \"etiqueta\": \"Alumnos Egresados\"\n  },\n  {\n    \"numero\": \"15\",\n    \"etiqueta\": \"Sedes en el país\"\n  }\n]"
};
      case 'profesores':
        return {
          "titulo": "Conoce a nuestro equipo docente",
          "profesoresJson": "[\n  {\n    \"nombre\": \"Dr. Alejandro Gomez\",\n    \"materia\": \"Matemáticas y Lógica\",\n    \"foto\": \"https://via.placeholder.com/150\"\n  },\n  {\n    \"nombre\": \"Mtra. Elena Ramos\",\n    \"materia\": \"Español y Comprensión\",\n    \"foto\": \"https://via.placeholder.com/150\"\n  }\n]"
};
      case 'testimonios':
        return {
          "titulo": "Opiniones y Testimonios reales",
          "testimoniosJson": "[\n  {\n    \"nombre\": \"Daniela Torres\",\n    \"testimonio\": \"Gracias a Lumiere ingresé a Medicina en mi primer intento.\",\n    \"foto\": \"https://via.placeholder.com/150\"\n  }\n]"
};
      case 'menu':
        return {
          "logoUrl": "https://via.placeholder.com/150x50",
          "enlacesJson": "[\n  {\n    \"texto\": \"Inicio\",\n    \"link\": \"/home\"\n  },\n  {\n    \"texto\": \"Licenciaturas\",\n    \"link\": \"/licenciatura\"\n  },\n  {\n    \"texto\": \"Contacto\",\n    \"link\": \"/contacto\"\n  }\n]"
};
      case 'cursos':
        return {
          "titulo": "Catálogo General de Cursos",
          "categoria": "todos"
};
      case 'streaming':
        return {
          "titulo": "Clase en Vivo",
          "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
};
      case 'experiencia-evento':
        return {
          "titulo": "Cómo se viven nuestras clases",
          "descripcion": "Una experiencia dinámica que te prepara para el éxito.",
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
};
      case 'categorias':
        return {
          "titulo": "Explora por Categorías",
          "categoriasJson": "[\n  {\n    \"nombre\": \"Salud\",\n    \"icono\": \"fas fa-heartbeat\"\n  },\n  {\n    \"nombre\": \"Ingenierías\",\n    \"icono\": \"fas fa-cog\"\n  },\n  {\n    \"nombre\": \"Administración\",\n    \"icono\": \"fas fa-briefcase\"\n  }\n]"
};
      case 'modalidades':
        return {
          "titulo": "Elige tu modalidad preferida",
          "modalidadesJson": "[\n  {\n    \"nombre\": \"Presencial\",\n    \"descripcion\": \"Asiste a nuestras sucursales y convive con profesores y compañeros.\"\n  },\n  {\n    \"nombre\": \"Online\",\n    \"descripcion\": \"Clases 100% en vivo a distancia desde cualquier dispositivo.\"\n  }\n]"
};
      case 'minibanner':
        return {
          "texto": "⚡ Descuento del 15% válido hasta este fin de semana.",
          "colorFondo": "#ffc107"
};
      case 'galeria-carrusel':
        return {
          "titulo": "Nuestra Galería",
          "imagenesJson": "[\n  {\n    \"imagenUrl\": \"https://via.placeholder.com/800x500\"\n  },\n  {\n    \"imagenUrl\": \"https://via.placeholder.com/800x500\"\n  }\n]"
};
      case 'video-texto':
        return {
          "titulo": "Vídeo Informativo",
          "descripcion": "Observa una explicación detallada del proceso.",
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "alineacion": "derecha"
};
      case 'tabla-admitidos':
        return {
          "titulo": "Resultados de Alumnos Admitidos",
          "ciclo": "2026-A"
};
      case 'kommo-form':
        return {
          "titulo": "Regístrate para recibir asesoría personalizada",
          "formId": "form-12345",
          "scriptUrl": ""
};
      case 'banner-descripcion':
        return {
          "titulo": "Preguntas sobre la convocatoria",
          "descripcion": "Conoce las fechas, puntajes mínimos e inscripciones oficiales.",
          "imagenUrl": "https://via.placeholder.com/800x300"
};
      case 'imagen':
        return {
          "imagenUrl": "https://via.placeholder.com/600x400",
          "alto": "auto",
          "ancho": "100%"
};
      case 'documentos-pdf':
        return {
          "titulo": "Descarga Guías de Estudio en PDF",
          "archivosJson": "[\n  {\n    \"nombre\": \"Guía EXANI-II Temario Oficial\",\n    \"pdfUrl\": \"https://www.orimi.com/pdf-test.pdf\"\n  }\n]"
};
      case 'tabla-carreras':
        return {
          "titulo": "Puntajes Mínimos por Carrera"
};
      case 'form-imagen':
        return {
          "titulo": "Llena tus datos para descargar",
          "imagenUrl": "https://via.placeholder.com/500x500",
          "formId": "form-descarga"
};
      case 'espacio-menu':
        return {
          "alto": 80
};
      case 'examen-gratis':
        return {
          "titulo": "Realiza un Examen de Diagnóstico Gratis",
          "descripcion": "Evalúa tu nivel con 50 reactivos y obtén tus resultados al instante.",
          "duracionMinutos": 90
};
      default:
        return {};
    }
  }
}
