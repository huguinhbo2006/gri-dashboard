import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-3 my-2 border-primary border-2 shadow-sm position-relative">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="badge bg-primary fs-6">Formulario de Contacto</span>
        <button class="btn btn-sm btn-outline-primary fw-bold" (click)="abrirConfig()">
          ⚙ Configurar Formulario
        </button>
      </div>

      <div class="p-3 bg-light text-center rounded border">
        <h4 class="fw-bold m-0">{{ localProps.title || 'Contáctanos' }}</h4>
        <p class="text-muted small mb-3">{{ localProps.subtitle }}</p>
        <div class="w-75 mx-auto">
          <input class="form-control mb-2 form-control-sm" placeholder="Nombre Completo" disabled>
          <input class="form-control mb-2 form-control-sm" placeholder="Correo Electrónico" disabled>
          <button class="btn btn-warning btn-sm w-100 fw-bold">{{ localProps.buttonText || 'SOLICITAR COTIZACIÓN' }}</button>
        </div>
      </div>

      <!-- Modal de Configuración -->
      <div *ngIf="mostrarConfig" class="modal d-block" style="background: rgba(0,0,0,0.6);" (click)="cerrarConfig()">
        <div class="modal-dialog modal-lg modal-dialog-centered" (click)="$event.stopPropagation()">
          <div class="modal-content text-dark">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title fw-bold">⚙ Configurar Formulario de Contacto</h5>
              <button type="button" class="btn-close btn-close-white" (click)="cerrarConfig()"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-bold">Título Principal</label>
                <input type="text" class="form-control" [(ngModel)]="localProps.title" (ngModelChange)="onPropsChange()">
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Subtítulo / Bajada</label>
                <textarea class="form-control" rows="2" [(ngModel)]="localProps.subtitle" (ngModelChange)="onPropsChange()"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Texto del Botón de Envío</label>
                <input type="text" class="form-control" [(ngModel)]="localProps.buttonText" (ngModelChange)="onPropsChange()">
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
export class ContactComponent implements OnInit {
  @Input() props: any;
  @Output() actualizarProps = new EventEmitter<any>();

  localProps: any = {};
  mostrarConfig = false;

  ngOnInit() {
    this.localProps = JSON.parse(JSON.stringify(this.props || {}));
  }

  abrirConfig() {
    this.mostrarConfig = true;
  }

  cerrarConfig() {
    this.mostrarConfig = false;
  }

  onPropsChange() {
    this.actualizarProps.emit(this.localProps);
  }
}
