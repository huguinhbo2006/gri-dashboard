// Build: 2026-08-06
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Builder } from '../../servicios/builder';
import { PagesService } from '../../servicios/page';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PageElement } from '../../models/element.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit {

  pages: any[] = [];
  selectedPageId: string | null = null;

  constructor(
    private builder: Builder,
    private pagesService: PagesService
  ) {}

  ngOnInit() {
    // Obtener listado de páginas desde backend
    this.pagesService.mostrar().subscribe((res: any) => {
      let rawPages = res.data || res;
      if (Array.isArray(rawPages)) {
        rawPages.sort((a: any, b: any) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          
          if (nameA === 'home' || a.slug === '/home') return -1;
          if (nameB === 'home' || b.slug === '/home') return 1;
          
          return nameA.localeCompare(nameB);
        });
        this.pages = rawPages;
      } else {
        this.pages = rawPages;
      }
    });
  }

  /** Seleccionar página y cargarla en el builder */
  selectPage(pageId: string | null) {
    if (!pageId) return; // ignora si es null
    this.selectedPageId = pageId;
    this.builder.loadPage(pageId);
  }

  /** Agregar un nuevo elemento a la página activa */
  addElement(type: PageElement['type']) {
    this.builder.addElement(type);
  }

  /** Guardar la página activa */
  guardarConfiguracion() {
    this.builder.saveCurrentPage();
    alert('Página guardada correctamente ✅');
  }

  recargarConfiguracion() {

  if (!this.selectedPageId) return;

    const confirmar = confirm(
      "Al traer la configuración actual se perderán los cambios no guardados.\n\n¿Deseas continuar?"
    );
  
    if (!confirmar) return;
  
    // volver a cargar desde BD
    this.builder.loadPage(this.selectedPageId);
  
  }

  limpiarPagina() {
    const confirmar = confirm(
      "¿Estás seguro de que deseas limpiar la página? Esto quitará todos los componentes de la interfaz. Los cambios no se guardarán en la base de datos a menos que hagas clic en 'Guardar Configuración'."
    );

    if (!confirmar) return;

    this.builder.updateElements([]);
  }

  descargarConfiguracion() {
    const page = this.builder.getCurrentPageValue();
    if (!page || !page.elements) {
      alert("No hay elementos para descargar");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(page.elements, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadAnchor.setAttribute("download", `configuracion_lumiere_${page.slug || 'pagina'}_${dateStr}.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  cargarConfiguracion(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const elements = JSON.parse(e.target.result);
        if (Array.isArray(elements)) {
          this.builder.updateElements(elements);
          alert("Configuración cargada correctamente ✅ (Se ha guardado automáticamente en la base de datos)");
        } else {
          alert("Formato de archivo inválido. Debe ser una lista de elementos.");
        }
      } catch (err) {
        alert("Error al leer el archivo. Asegúrate de que sea un archivo de configuración válido.");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

}
