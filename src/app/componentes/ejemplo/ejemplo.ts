import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ejemplo.html',
  styleUrl: './ejemplo.css'
})
export class Ejemplo {
  @Input() titulo: string = 'Mi Componente Ejemplo';
  @Input() contenido: string = 'Este es un contenido de prueba.';
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
    this.actualizarProps.emit({ titulo: this.titulo, contenido: this.contenido });
  }

  eliminar() {
    this.eliminarElemento.emit();
  }
}
