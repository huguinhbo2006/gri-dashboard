import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-3 my-2 border-primary border-2 shadow-sm position-relative">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="badge bg-primary fs-6">Hero / Banner Principal</span>
        <button class="btn btn-sm btn-outline-primary fw-bold" (click)="abrirConfig()">
          ⚙ Configurar Hero (Fondo y Textos)
        </button>
      </div>

      <div class="p-5 text-center text-white rounded position-relative" [ngStyle]="getHeroStyle()">
        <h2 class="fw-bold display-6 mb-3" style="text-shadow: 0 2px 4px rgba(0,0,0,0.6);">
          {{ localProps.title || 'Gran Imperial Casino Events' }}
        </h2>
        <p class="lead mb-4" style="text-shadow: 0 1px 3px rgba(0,0,0,0.6);">
          {{ localProps.lead || 'Noches Elegantes, Memorias Inolvidables.' }}
        </p>
        <div class="d-flex justify-content-center gap-2 mt-3">
          <button *ngIf="localProps.primaryBtnText" class="btn btn-warning fw-bold">{{ localProps.primaryBtnText }}</button>
          <button *ngIf="localProps.secondaryBtnText" class="btn btn-outline-light">{{ localProps.secondaryBtnText }}</button>
        </div>
      </div>

      <!-- Modal de Configuración -->
      <div *ngIf="mostrarConfig" class="modal d-block" style="background: rgba(0,0,0,0.6);" (click)="cerrarConfig()">
        <div class="modal-dialog modal-lg modal-dialog-centered" (click)="$event.stopPropagation()">
          <div class="modal-content text-dark">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title fw-bold">⚙ Configurar Hero Section (Imagen de Fondo & Transparencia)</h5>
              <button type="button" class="btn-close btn-close-white" (click)="cerrarConfig()"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label fw-bold">Imagen de Fondo</label>
                <div class="d-flex gap-2 align-items-center mb-2">
                  <button type="button" class="btn btn-outline-primary" (click)="fileInputBg.click()">
                    📷 Seleccionar Imagen de Fondo
                  </button>
                  <input type="file" #fileInputBg accept="image/*" class="d-none" (change)="seleccionarImagenFondo($event)">
                  <span *ngIf="localProps.backgroundImage" class="text-success small fw-bold">✓ Imagen seleccionada</span>
                </div>
                <div *ngIf="localProps.backgroundImage" class="mt-2 text-center bg-dark p-2 rounded">
                  <img [src]="localProps.backgroundImage" style="max-height: 120px; object-fit: cover;" class="img-thumbnail">
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold">Oscuridad de Superposición (Overlay): {{ getOpacityPercentage() }}%</label>
                <input type="range" class="form-range" min="0" max="1" step="0.05" [(ngModel)]="localProps.overlayOpacity" (ngModelChange)="onPropsChange()">
                <div class="form-text">Aumenta la oscuridad del fondo transparente para asegurar que los textos blancos sean perfectamente legibles.</div>
              </div>

              <hr>

              <div class="mb-3">
                <label class="form-label fw-bold">Título Principal</label>
                <input type="text" class="form-control" [(ngModel)]="localProps.title" (ngModelChange)="onPropsChange()">
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Texto Descriptivo / Subtítulo</label>
                <textarea class="form-control" rows="3" [(ngModel)]="localProps.lead" (ngModelChange)="onPropsChange()"></textarea>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-bold">Texto Botón Principal (CTA)</label>
                  <input type="text" class="form-control" [(ngModel)]="localProps.primaryBtnText" (ngModelChange)="onPropsChange()">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">URL Botón Principal</label>
                  <input type="text" class="form-control" [(ngModel)]="localProps.primaryBtnUrl" (ngModelChange)="onPropsChange()">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Texto Botón Secundario</label>
                  <input type="text" class="form-control" [(ngModel)]="localProps.secondaryBtnText" (ngModelChange)="onPropsChange()">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">URL Botón Secundario</label>
                  <input type="text" class="form-control" [(ngModel)]="localProps.secondaryBtnUrl" (ngModelChange)="onPropsChange()">
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
export class HeroComponent implements OnInit {
  @Input() props: any;
  @Output() actualizarProps = new EventEmitter<any>();

  localProps: any = {};
  mostrarConfig = false;

  ngOnInit() {
    this.localProps = JSON.parse(JSON.stringify(this.props || {}));
    if (!this.localProps.backgroundImage) {
      this.localProps.backgroundImage = 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1600';
    }
    if (this.localProps.overlayOpacity === undefined) {
      this.localProps.overlayOpacity = 0.65;
    }
  }

  abrirConfig() {
    this.mostrarConfig = true;
  }

  cerrarConfig() {
    this.mostrarConfig = false;
  }

  getOpacityPercentage(): number {
    return Math.round((this.localProps.overlayOpacity ?? 0.65) * 100);
  }

  seleccionarImagenFondo(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localProps.backgroundImage = e.target.result;
        this.onPropsChange();
      };
      reader.readAsDataURL(file);
    }
  }

  getHeroStyle() {
    const bgImg = this.localProps.backgroundImage || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1600';
    const opacity = this.localProps.overlayOpacity !== undefined ? this.localProps.overlayOpacity : 0.65;
    
    return {
      'background': `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), url('${bgImg}') center/cover no-repeat`,
      'min-height': '350px'
    };
  }

  onPropsChange() {
    this.actualizarProps.emit(this.localProps);
  }
}
