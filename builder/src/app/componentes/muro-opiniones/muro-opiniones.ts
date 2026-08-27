import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-muro-opiniones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './muro-opiniones.html',
  styleUrl: './muro-opiniones.css'
})
export class MuroOpiniones {
  @Input() titulo: string = "Lo que dicen nuestros alumnos";
  @Input() opinionesJson: string = "[\n  {\n    \"nombre\": \"Sofía Martínez\",\n    \"rating\": 5,\n    \"comentario\": \"Excelente curso, obtuve mi puntaje deseado.\"\n  },\n  {\n    \"nombre\": \"Carlos Ruiz\",\n    \"rating\": 4.8,\n    \"comentario\": \"Los profesores son muy dedicados y explican increíble.\"\n  }\n]";

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
      opinionesJson: this.opinionesJson
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
