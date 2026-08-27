import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imagen-texto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './imagen-texto.html',
  styleUrl: './imagen-texto.css'
})
export class ImagenTexto {
  @Input() titulo: string = 'Componente de Imagen y Texto';
  @Input() contenido: string = 'Escribe aquí tu descripción.';
  @Input() imagenUrl: string = 'https://via.placeholder.com/600x400';
  @Input() alineacion: 'izquierda' | 'derecha' = 'izquierda';

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
      contenido: this.contenido,
      imagenUrl: this.imagenUrl,
      alineacion: this.alineacion
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenUrl = e.target.result;
        this.onPropsChange();
      };
      reader.readAsDataURL(file);
    }
  }

  eliminar() {
    this.eliminarElemento.emit();
  }
}
