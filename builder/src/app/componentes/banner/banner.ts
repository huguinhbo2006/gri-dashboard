import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css'
})
export class Banner {
  @Input() titulo: string = "Banner Principal";
  @Input() subtitulo: string = "Aprende con los mejores expertos de la industria.";
  @Input() imagenUrl: string = "https://via.placeholder.com/1200x400";
  @Input() botonTexto: string = "Ver Cursos";
  @Input() botonLink: string = "/cursos";

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
      subtitulo: this.subtitulo,
      imagenUrl: this.imagenUrl,
      botonTexto: this.botonTexto,
      botonLink: this.botonLink
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
