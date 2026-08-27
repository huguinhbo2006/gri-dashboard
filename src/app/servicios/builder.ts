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
    // Cargar estilo del menú global de la página de inicio al inicializar
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

    const page = this.getCurrentPageValue(); // 🔥 usar getter
  
    if (!page) return;

    // Normalizar: si algún elemento no tiene col, asignar 12 por default
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
      case 'navbar':
        return {
          brand: 'Gran Imperial',
          links: [
            { label: 'Inicio', url: '#hero' },
            { label: 'Eventos', url: '#events' },
            { label: 'Servicios', url: '#services' },
            { label: 'Contacto', url: '#contact' }
          ]
        };
      case 'hero':
        return {
          title: 'Gran Imperial Casino Events',
          lead: 'Noches Elegantes, Memorias Inolvidables.',
          backgroundImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1600',
          overlayOpacity: 0.65,
          primaryBtnText: 'Explorar Eventos',
          primaryBtnUrl: '#events',
          secondaryBtnText: 'Solicitar Cotización',
          secondaryBtnUrl: '#contact'
        };
      case 'events-grid':
        return {
          title: 'Nuestras Celebraciones',
          subtitle: 'Diseñamos la experiencia perfecta para cada hito de tu vida.',
          events: [
            { title: 'BODAS', description: 'Experiencia sofisticada.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600', buttonText: 'SABER MÁS' },
            { title: 'XV AÑOS', description: 'Fiesta glamorosa al estilo casino.', image: 'https://images.unsplash.com/photo-1613110903322-861c8c880199?q=80&w=600', buttonText: 'PLANEA TUS XV' }
          ]
        };
      case 'services':
        return {
          services: [
            { id: 'limosinas', title: 'Limosinas de Lujo', text: 'Traslados exclusivos en vehículos de gama alta.', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800', buttonText: 'Ver Galería' }
          ]
        };
      case 'contact':
        return {
          title: 'Contáctanos',
          subtitle: 'Haz realidad el evento de tus sueños.',
          buttonText: 'SOLICITAR COTIZACIÓN'
        };
      case 'footer':
        return {
          brand: 'Gran Imperial',
          description: 'Elegancia y entretenimiento exclusivo para tus eventos.',
          copyright: '© 2026 Gran Imperial Casino Events. Todos los derechos reservados.'
        };
      default:
        return {};
    }
  }

  // OLD_METHODS_REST_REMOVED
}