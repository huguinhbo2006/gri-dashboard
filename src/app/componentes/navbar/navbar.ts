import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-3 my-2 border-primary border-2 shadow-sm position-relative">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="badge bg-primary fs-6">Menú / Navbar</span>
        <button class="btn btn-sm btn-outline-primary fw-bold" (click)="abrirConfig()">
          ⚙ Configurar Menú
        </button>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light p-2 bg-light rounded border">
        <div class="container-fluid">
          <span class="navbar-brand fw-bold fs-4">{{ localProps.brand || 'Gran Imperial' }}</span>
          <div class="d-flex gap-3">
            <span *ngFor="let link of localProps.links" class="text-secondary fw-semibold">
              {{ link.label }}
            </span>
          </div>
        </div>
      </nav>

      <!-- Modal de Configuración -->
      <div *ngIf="mostrarConfig" class="modal d-block" style="background: rgba(0,0,0,0.6);" (click)="cerrarConfig()">
        <div class="modal-dialog modal-lg modal-dialog-centered" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title fw-bold">⚙ Configurar Navbar / Menú</h5>
              <button type="button" class="btn-close btn-close-white" (click)="cerrarConfig()"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-bold">Nombre de la Marca / Logo</label>
                <input type="text" class="form-control" [(ngModel)]="localProps.brand" (ngModelChange)="onPropsChange()">
              </div>

              <hr>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <label class="form-label fw-bold m-0">Enlaces del Menú</label>
                <button type="button" class="btn btn-sm btn-success" (click)="agregarLink()">+ Agregar Enlace</button>
              </div>

              <div *ngFor="let link of localProps.links; let idx = index" class="row g-2 align-items-center mb-2 p-2 bg-light rounded border">
                <div class="col-md-5">
                  <input type="text" class="form-control form-control-sm" placeholder="Texto (ej. Inicio)" [(ngModel)]="link.label" (ngModelChange)="onPropsChange()">
                </div>
                <div class="col-md-5">
                  <input type="text" class="form-control form-control-sm" placeholder="URL (ej. #hero)" [(ngModel)]="link.url" (ngModelChange)="onPropsChange()">
                </div>
                <div class="col-md-2 text-end">
                  <button type="button" class="btn btn-sm btn-outline-danger" (click)="eliminarLink(idx)">✖</button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" (click)="cerrarConfig()">Guardar y Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NavbarComponent implements OnInit {
  @Input() props: any;
  @Output() actualizarProps = new EventEmitter<any>();

  localProps: any = { brand: '', links: [] };
  mostrarConfig = false;

  ngOnInit() {
    this.localProps = JSON.parse(JSON.stringify(this.props || { brand: 'Gran Imperial', links: [] }));
  }

  abrirConfig() {
    this.mostrarConfig = true;
  }

  cerrarConfig() {
    this.mostrarConfig = false;
  }

  agregarLink() {
    if (!this.localProps.links) this.localProps.links = [];
    this.localProps.links.push({ label: 'Nuevo Enlace', url: '#' });
    this.onPropsChange();
  }

  eliminarLink(index: number) {
    this.localProps.links.splice(index, 1);
    this.onPropsChange();
  }

  onPropsChange() {
    this.actualizarProps.emit(this.localProps);
  }
}
