import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesores.html',
  styleUrl: './profesores.css'
})
export class Profesores {
  @Input() titulo: string = "Conoce a nuestro equipo docente";
  @Input() profesoresJson: string = "[\n  {\n    \"nombre\": \"Dr. Alejandro Gomez\",\n    \"materia\": \"Matemáticas y Lógica\",\n    \"foto\": \"https://via.placeholder.com/150\"\n  },\n  {\n    \"nombre\": \"Mtra. Elena Ramos\",\n    \"materia\": \"Español y Comprensión\",\n    \"foto\": \"https://via.placeholder.com/150\"\n  }\n]";

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
      profesoresJson: this.profesoresJson
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
