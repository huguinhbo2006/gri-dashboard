import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Builder } from '../../servicios/builder';
import { PageElement } from '../../models/element.model';

import { ElementHost } from '../element-host/element-host';

import { PagesService } from '../../servicios/page';
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
    ElementHost
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
