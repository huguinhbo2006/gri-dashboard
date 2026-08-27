import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-galeria-carrusel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './galeria-carrusel.html',
  styleUrl: './galeria-carrusel.css'
})
export class GaleriaCarrusel {
  @Input() titulo: string = "Nuestra Galería";
  @Input() imagenesJson: string = "[\n  {\n    \"imagenUrl\": \"https://via.placeholder.com/800x500\"\n  },\n  {\n    \"imagenUrl\": \"https://via.placeholder.com/800x500\"\n  }\n]";

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
      imagenesJson: this.imagenesJson
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
