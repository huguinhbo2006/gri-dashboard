import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Builder } from '../../servicios/builder';
import { PageElement } from '../../models/element.model';

import { PagesService } from '../../servicios/page';
import { Ejemplo } from '../../componentes/ejemplo/ejemplo';
import { ImagenTexto } from '../../componentes/imagen-texto/imagen-texto';
import { Banner } from '../../componentes/banner/banner';
import { Hero } from '../../componentes/hero/hero';
import { Simulador } from '../../componentes/simulador/simulador';
import { CursosUdg } from '../../componentes/cursos-udg/cursos-udg';
import { MuroOpiniones } from '../../componentes/muro-opiniones/muro-opiniones';
import { BadgeFlotante } from '../../componentes/badge-flotante/badge-flotante';
import { Whatsapp } from '../../componentes/whatsapp/whatsapp';
import { Faq } from '../../componentes/faq/faq';
import { FotoPlanteles } from '../../componentes/foto-planteles/foto-planteles';
import { Mensaje } from '../../componentes/mensaje/mensaje';
import { Numeros } from '../../componentes/numeros/numeros';
import { Profesores } from '../../componentes/profesores/profesores';
import { Testimonios } from '../../componentes/testimonios/testimonios';
import { Menu } from '../../componentes/menu/menu';
import { Cursos } from '../../componentes/cursos/cursos';
import { Streaming } from '../../componentes/streaming/streaming';
import { ExperienciaEvento } from '../../componentes/experiencia-evento/experiencia-evento';
import { Categorias } from '../../componentes/categorias/categorias';
import { Modalidades } from '../../componentes/modalidades/modalidades';
import { Minibanner } from '../../componentes/minibanner/minibanner';
import { GaleriaCarrusel } from '../../componentes/galeria-carrusel/galeria-carrusel';
import { VideoTexto } from '../../componentes/video-texto/video-texto';
import { TablaAdmitidos } from '../../componentes/tabla-admitidos/tabla-admitidos';
import { KommoForm } from '../../componentes/kommo-form/kommo-form';
import { BannerDescripcion } from '../../componentes/banner-descripcion/banner-descripcion';
import { ImagenComponent } from '../../componentes/imagen/imagen';
import { DocumentosPdf } from '../../componentes/documentos-pdf/documentos-pdf';
import { TablaCarreras } from '../../componentes/tabla-carreras/tabla-carreras';
import { FormImagen } from '../../componentes/form-imagen/form-imagen';
import { EspacioMenu } from '../../componentes/espacio-menu/espacio-menu';
import { ExamenGratisComponent } from '../../componentes/examen-gratis/examen-gratis';

import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    Ejemplo,
    ImagenTexto,
    Banner,
    Hero,
    Simulador,
    CursosUdg,
    MuroOpiniones,
    BadgeFlotante,
    Whatsapp,
    Faq,
    FotoPlanteles,
    Mensaje,
    Numeros,
    Profesores,
    Testimonios,
    Menu,
    Cursos,
    Streaming,
    ExperienciaEvento,
    Categorias,
    Modalidades,
    Minibanner,
    GaleriaCarrusel,
    VideoTexto,
    TablaAdmitidos,
    KommoForm,
    BannerDescripcion,
    ImagenComponent,
    DocumentosPdf,
    TablaCarreras,
    FormImagen,
    EspacioMenu,
    ExamenGratisComponent,
  ],
  templateUrl: './canvas.html',
  styleUrls: ['./canvas.css']
})
export class Canvas implements OnInit {
  cursos: any;
  elements: PageElement[] = [];
  colOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(
    private builder: Builder,
    private servicio: PagesService
  ) {}

  getGlobalMenuStyle(): string {
    return this.builder.getMenuStyleValue();
  }

  getGlobalMenuSinTransparencia(): boolean {
    return this.builder.getMenuSinTransparenciaValue();
  }

  saveGlobalMenuStyle(event: any) {
    if (event && event.styleType) {
      this.builder.saveGlobalMenu(event.styleType, event.sinTransparencia ?? false);
    }
  }

  ngOnInit() {
    this.builder.getCurrentPage().subscribe(page => {
      if (!page) return;
      this.elements = [...page.elements];
    });
  }

  eliminarElemento(index: number) {
    const page = this.builder.getCurrentPageValue();
    if (!page) return;
    const updated = [...page.elements];
    updated.splice(index, 1);
    this.builder.updateElements(updated);
    this.elements = updated;
  }

  actualizarProps(index: number, props: any) {
    const page = this.builder.getCurrentPageValue();
    if (!page) return;
    const updated = [...page.elements];
    updated[index] = {
      ...updated[index],
      props
    };
    this.builder.updateElements(updated);
    this.elements = updated;
  }

  drop(event: CdkDragDrop<PageElement[]>) {
    const page = this.builder.getCurrentPageValue();
    if (!page) return;
    const updated = [...page.elements];
    moveItemInArray(
      updated,
      event.previousIndex,
      event.currentIndex
    );
    this.builder.updateElements(updated);
    this.elements = updated;
  }

  cambiarCol(index: number, col: number) {
    const page = this.builder.getCurrentPageValue();
    if (!page) return;
    const updated = [...page.elements];
    updated[index] = { ...updated[index], col };
    this.builder.updateElements(updated);
    this.elements = updated;
  }

  trackById(index: number, el: PageElement) {
    return el.id;
  }
}
