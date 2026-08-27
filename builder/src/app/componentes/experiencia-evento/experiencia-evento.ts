import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-experiencia-evento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './experiencia-evento.html',
  styleUrl: './experiencia-evento.css'
})
export class ExperienciaEvento {
  @Input() titulo: string = "Cómo se viven nuestras clases";
  @Input() descripcion: string = "Una experiencia dinámica que te prepara para el éxito.";
  @Input() videoUrl: string = "https://www.youtube.com/embed/dQw4w9WgXcQ";

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
      videoUrl: this.videoUrl
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
