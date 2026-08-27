import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-3 my-2 border-primary border-2 shadow-sm position-relative">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="badge bg-primary fs-6">Footer / Pie de Página</span>
        <button class="btn btn-sm btn-outline-primary fw-bold" (click)="abrirConfig()">
          ⚙ Configurar Footer
        </button>
      </div>

      <footer class="p-3 bg-dark text-white text-center rounded">
        <h5 class="fw-bold m-0">{{ localProps.brand || 'Gran Imperial' }}</h5>
        <p class="small text-light mb-1">{{ localProps.description }}</p>
        <p class="small text-muted mb-0">{{ localProps.copyright }}</p>
      </footer>

      <!-- Modal de Configuración -->
      <div *ngIf="mostrarConfig" class="modal d-block" style="background: rgba(0,0,0,0.6);" (click)="cerrarConfig()">
        <div class="modal-dialog modal-lg modal-dialog-centered" (click)="$event.stopPropagation()">
          <div class="modal-content text-dark">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title fw-bold">⚙ Configurar Pie de Página (Footer)</h5>
              <button type="button" class="btn-close btn-close-white" (click)="cerrarConfig()"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-bold">Nombre de la Marca</label>
                <input type="text" class="form-control" [(ngModel)]="localProps.brand" (ngModelChange)="onPropsChange()">
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Descripción del Footer</label>
                <textarea class="form-control" rows="2" [(ngModel)]="localProps.description" (ngModelChange)="onPropsChange()"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Texto de Copyright / Legales</label>
                <input type="text" class="form-control" [(ngModel)]="localProps.copyright" (ngModelChange)="onPropsChange()">
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
export class FooterComponent implements OnInit {
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
