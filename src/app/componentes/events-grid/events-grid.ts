import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-3 my-2 border-primary border-2 shadow-sm position-relative">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="badge bg-primary fs-6">Grid de Eventos / Celebraciones</span>
        <button class="btn btn-sm btn-outline-primary fw-bold" (click)="abrirConfig()">
          ⚙ Configurar Tarjetas de Eventos
        </button>
      </div>

      <div class="py-3 text-center">
        <h4 class="fw-bold">{{ localProps.title || 'Nuestras Celebraciones' }}</h4>
        <p class="text-muted small" *ngIf="localProps.subtitle">{{ localProps.subtitle }}</p>
        <div class="row g-3 mt-2">
          <div class="col-md-4" *ngFor="let ev of localProps.events">
            <div class="card h-100 shadow-sm border">
              <img [src]="ev.image" class="card-img-top" style="height: 140px; object-fit: cover;">
              <div class="card-body p-3">
                <h6 class="card-title fw-bold mb-1">{{ ev.title }}</h6>
                <p class="card-text small text-muted mb-2">{{ ev.description }}</p>
                <span class="badge bg-secondary">{{ ev.buttonText || 'SABER MÁS' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de Configuración -->
      <div *ngIf="mostrarConfig" class="modal d-block" style="background: rgba(0,0,0,0.6);" (click)="cerrarConfig()">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" (click)="$event.stopPropagation()">
          <div class="modal-content text-dark">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title fw-bold">⚙ Configurar Grid de Eventos</h5>
              <button type="button" class="btn-close btn-close-white" (click)="cerrarConfig()"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-bold">Título de la Sección</label>
                <input type="text" class="form-control" [(ngModel)]="localProps.title" (ngModelChange)="onPropsChange()">
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Subtítulo</label>
                <input type="text" class="form-control" [(ngModel)]="localProps.subtitle" (ngModelChange)="onPropsChange()">
              </div>

              <hr>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold m-0">Tarjetas de Eventos</h6>
                <button type="button" class="btn btn-sm btn-success" (click)="agregarEvento()">+ Agregar Evento</button>
              </div>

              <div *ngFor="let ev of localProps.events; let idx = index" class="p-3 mb-3 bg-light rounded border">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="fw-bold">Tarjeta #{{ idx + 1 }}</span>
                  <button type="button" class="btn btn-sm btn-outline-danger" (click)="eliminarEvento(idx)">Eliminar</button>
                </div>
                <div class="row g-2">
                  <div class="col-md-6">
                    <label class="form-label small fw-bold">Título del Evento</label>
                    <input type="text" class="form-control form-control-sm" [(ngModel)]="ev.title" (ngModelChange)="onPropsChange()">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small fw-bold">Imagen del Evento</label>
                    <div class="d-flex gap-2 align-items-center">
                      <button type="button" class="btn btn-sm btn-outline-primary" (click)="fileInputEv.click()">📷 Seleccionar Imagen</button>
                      <input type="file" #fileInputEv accept="image/*" class="d-none" (change)="seleccionarImagenEvento($event, idx)">
                    </div>
                  </div>
                  <div class="col-md-12" *ngIf="ev.image">
                    <img [src]="ev.image" style="max-height: 80px; object-fit: cover;" class="img-thumbnail mt-1">
                  </div>
                  <div class="col-md-8">
                    <label class="form-label small fw-bold">Descripción</label>
                    <textarea class="form-control form-control-sm" rows="2" [(ngModel)]="ev.description" (ngModelChange)="onPropsChange()"></textarea>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label small fw-bold">Texto del Botón</label>
                    <input type="text" class="form-control form-control-sm" [(ngModel)]="ev.buttonText" (ngModelChange)="onPropsChange()">
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
export class EventsGridComponent implements OnInit {
  @Input() props: any;
  @Output() actualizarProps = new EventEmitter<any>();

  localProps: any = { title: '', subtitle: '', events: [] };
  mostrarConfig = false;

  ngOnInit() {
    this.localProps = JSON.parse(JSON.stringify(this.props || { events: [] }));
  }

  abrirConfig() {
    this.mostrarConfig = true;
  }

  cerrarConfig() {
    this.mostrarConfig = false;
  }

  seleccionarImagenEvento(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localProps.events[index].image = e.target.result;
        this.onPropsChange();
      };
      reader.readAsDataURL(file);
    }
  }

  agregarEvento() {
    if (!this.localProps.events) this.localProps.events = [];
    this.localProps.events.push({
      title: 'NUEVO EVENTO',
      description: 'Descripción breve del nuevo evento.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
      buttonText: 'SABER MÁS'
    });
    this.onPropsChange();
  }

  eliminarEvento(index: number) {
    this.localProps.events.splice(index, 1);
    this.onPropsChange();
  }

  onPropsChange() {
    this.actualizarProps.emit(this.localProps);
  }
}
