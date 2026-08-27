import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documentos-pdf',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documentos-pdf.html',
  styleUrl: './documentos-pdf.css'
})
export class DocumentosPdf {
  @Input() titulo: string = "Descarga Guías de Estudio en PDF";
  @Input() archivosJson: string = "[\n  {\n    \"nombre\": \"Guía EXANI-II Temario Oficial\",\n    \"pdfUrl\": \"https://www.orimi.com/pdf-test.pdf\"\n  }\n]";

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
      archivosJson: this.archivosJson
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
