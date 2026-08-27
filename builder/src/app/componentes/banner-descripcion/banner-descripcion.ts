import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banner-descripcion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banner-descripcion.html',
  styleUrl: './banner-descripcion.css'
})
export class BannerDescripcion {
  @Input() titulo: string = "Preguntas sobre la convocatoria";
  @Input() descripcion: string = "Conoce las fechas, puntajes mínimos e inscripciones oficiales.";
  @Input() imagenUrl: string = "https://via.placeholder.com/800x300";

  @Output() actualizarProps = new EventEmitter<any>();
  @Output() eliminarElemento = new EventEmitter<void>();

  mostrarConfig = false;

  abrirConfig() {
    this.mostrarConfig = true;
  }

  cerrarConfig() {
    this.mostrarConfig = false;
  }

  onPropsChange() {
    this.actualizarProps.emit({
      titulo: this.titulo,
      descripcion: this.descripcion,
      imagenUrl: this.imagenUrl
    });
  }

  onFileSelected(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        (this as any)[fieldName] = e.target.result;
        this.onPropsChange();
      };
      reader.readAsDataURL(file);
    }
  }

  eliminar() {
    this.eliminarElemento.emit();
  }

  getParsed(jsonStr: string) {
    try {
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  }
}
