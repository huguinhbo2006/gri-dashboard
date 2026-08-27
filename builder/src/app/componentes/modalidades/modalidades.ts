import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modalidades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modalidades.html',
  styleUrl: './modalidades.css'
})
export class Modalidades {
  @Input() titulo: string = "Elige tu modalidad preferida";
  @Input() modalidadesJson: string = "[\n  {\n    \"nombre\": \"Presencial\",\n    \"descripcion\": \"Asiste a nuestras sucursales y convive con profesores y compañeros.\"\n  },\n  {\n    \"nombre\": \"Online\",\n    \"descripcion\": \"Clases 100% en vivo a distancia desde cualquier dispositivo.\"\n  }\n]";

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
      modalidadesJson: this.modalidadesJson
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
