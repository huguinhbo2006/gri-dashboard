import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-texto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-texto.html',
  styleUrl: './video-texto.css'
})
export class VideoTexto {
  @Input() titulo: string = "Vídeo Informativo";
  @Input() descripcion: string = "Observa una explicación detallada del proceso.";
  @Input() videoUrl: string = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  @Input() alineacion: string = "derecha";

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
      videoUrl: this.videoUrl,
      alineacion: this.alineacion
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
