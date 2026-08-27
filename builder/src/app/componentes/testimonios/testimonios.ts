import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './testimonios.html',
  styleUrl: './testimonios.css'
})
export class Testimonios {
  @Input() titulo: string = "Opiniones y Testimonios reales";
  @Input() testimoniosJson: string = "[\n  {\n    \"nombre\": \"Daniela Torres\",\n    \"testimonio\": \"Gracias a Lumiere ingresé a Medicina en mi primer intento.\",\n    \"foto\": \"https://via.placeholder.com/150\"\n  }\n]";

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
      testimoniosJson: this.testimoniosJson
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
