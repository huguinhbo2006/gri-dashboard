import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-examen-gratis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './examen-gratis.html',
  styleUrl: './examen-gratis.css'
})
export class ExamenGratisComponent {
  @Input() titulo: string = "Realiza un Examen de Diagnóstico Gratis";
  @Input() descripcion: string = "Evalúa tu nivel con 50 reactivos y obtén tus resultados al instante.";
  @Input() duracionMinutos: number = 90;

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
      duracionMinutos: this.duracionMinutos
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
