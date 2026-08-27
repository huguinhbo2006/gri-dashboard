import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foto-planteles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './foto-planteles.html',
  styleUrl: './foto-planteles.css'
})
export class FotoPlanteles {
  @Input() titulo: string = "Nuestras Instalaciones";
  @Input() fotosJson: string = "[\n  {\n    \"nombre\": \"Plantel Centro\",\n    \"imagenUrl\": \"https://via.placeholder.com/600x400\"\n  },\n  {\n    \"nombre\": \"Plantel Américas\",\n    \"imagenUrl\": \"https://via.placeholder.com/600x400\"\n  }\n]";

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
      fotosJson: this.fotosJson
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
