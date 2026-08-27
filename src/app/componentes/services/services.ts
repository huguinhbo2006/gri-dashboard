import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-3 my-2 border-primary border-2 shadow-sm position-relative">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="badge bg-primary fs-6">Bloques de Servicios</span>
        <button class="btn btn-sm btn-outline-primary fw-bold" (click)="abrirConfig()">
          ⚙ Configurar Servicios
        </button>
      </div>

      <div class="py-2">
        <div *ngFor="let s of localProps.services" class="p-3 my-2 border rounded bg-white">
          <div class="row align-items-center">
            <div class="col-md-7">
              <h5 class="fw-bold m-0">{{ s.title }}</h5>
              <p class="small text-muted mb-1">{{ s.subtitle }}</p>
              <p class="small text-secondary mb-2">{{ s.text }}</p>
              <span class="badge bg-outline-dark border text-dark">{{ s.buttonText || 'Ver Galería' }}</span>
            </div>
            <div class="col-md-5">
              <img [src]="s.image" class="img-fluid rounded" style="max-height: 120px; object-fit: cover;">
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de Configuración -->
      <div *ngIf="mostrarConfig" class="modal d-block" style="background: rgba(0,0,0,0.6);" (click)="cerrarConfig()">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" (click)="$event.stopPropagation()">
          <div class="modal-content text-dark">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title fw-bold">⚙ Configurar Bloques de Servicios</h5>
              <button type="button" class="btn-close btn-close-white" (click)="cerrarConfig()"></button>
            </div>
            <div class="modal-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold m-0">Lista de Servicios</h6>
                <button type="button" class="btn btn-sm btn-success" (click)="agregarServicio()">+ Agregar Servicio</button>
              </div>

              <div *ngFor="let s of localProps.services; let idx = index" class="p-3 mb-3 bg-light rounded border">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="fw-bold">Servicio #{{ idx + 1 }}</span>
                  <button type="button" class="btn btn-sm btn-outline-danger" (click)="eliminarServicio(idx)">Eliminar</button>
                </div>
                <div class="row g-2">
                  <div class="col-md-6">
                    <label class="form-label small fw-bold">Título del Servicio</label>
                    <input type="text" class="form-control form-control-sm" [(ngModel)]="s.title" (ngModelChange)="onPropsChange()">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small fw-bold">Subtítulo / Bajada</label>
                    <input type="text" class="form-control form-control-sm" [(ngModel)]="s.subtitle" (ngModelChange)="onPropsChange()">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small fw-bold">Imagen del Servicio</label>
                    <div class="d-flex gap-2 align-items-center">
                      <button type="button" class="btn btn-sm btn-outline-primary" (click)="fileInputServ.click()">📷 Seleccionar Imagen</button>
                      <input type="file" #fileInputServ accept="image/*" class="d-none" (change)="seleccionarImagenServicio($event, idx)">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small fw-bold">Texto del Botón</label>
                    <input type="text" class="form-control form-control-sm" [(ngModel)]="s.buttonText" (ngModelChange)="onPropsChange()">
                  </div>
                  <div class="col-md-12" *ngIf="s.image">
                    <img [src]="s.image" style="max-height: 80px; object-fit: cover;" class="img-thumbnail mt-1">
                  </div>
                  <div class="col-md-12">
                    <label class="form-label small fw-bold">Texto Explicativo</label>
                    <textarea class="form-control form-control-sm" rows="3" [(ngModel)]="s.text" (ngModelChange)="onPropsChange()"></textarea>
                  </div>
                  <div class="col-md-12 form-check ms-2 mt-2">
                    <input class="form-check-input" type="checkbox" [(ngModel)]="s.reversed" (ngModelChange)="onPropsChange()" [id]="'rev-' + idx">
                    <label class="form-check-label small fw-bold" [for]="'rev-' + idx">Invertir posición de imagen (imagen a la izquierda)</label>
                  </div>
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
export class ServicesComponent implements OnInit {
  @Input() props: any;
  @Output() actualizarProps = new EventEmitter<any>();

  localProps: any = { services: [] };
  mostrarConfig = false;

  ngOnInit() {
    this.localProps = JSON.parse(JSON.stringify(this.props || { services: [] }));
  }

  abrirConfig() {
    this.mostrarConfig = true;
  }

  cerrarConfig() {
    this.mostrarConfig = false;
  }

  seleccionarImagenServicio(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localProps.services[index].image = e.target.result;
        this.onPropsChange();
      };
      reader.readAsDataURL(file);
    }
  }

  agregarServicio() {
    if (!this.localProps.services) this.localProps.services = [];
    this.localProps.services.push({
      id: 'servicio-' + Date.now(),
      title: 'Nuevo Servicio',
      subtitle: 'Subtítulo del servicio.',
      text: 'Descripción completa del servicio ofrecido.',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800',
      buttonText: 'Ver Galería',
      reversed: false
    });
    this.onPropsChange();
  }

  eliminarServicio(index: number) {
    this.localProps.services.splice(index, 1);
    this.onPropsChange();
  }

  onPropsChange() {
    this.actualizarProps.emit(this.localProps);
  }
}
