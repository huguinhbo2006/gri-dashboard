export type ElementType = 'banner' | 
'hero' |
'simulador' |
'cursos-udg' |
'muro-opiniones' |
'badge-flotante' |
'whatsapp' | 
'faq' | 
'foto-planteles' | 
'mensaje' | 
'numeros' | 
'profesores' | 
'testimonios' |
'menu' |
'cursos'|
'streaming'|
'experiencia-evento' |
'categorias' |
'modalidades' |
'minibanner' |
'galeria-carrusel' |
'video-texto' |
'tabla-admitidos' |
'kommo-form' |
'banner-descripcion' |
'imagen' |
'documentos-pdf' |
'tabla-carreras' |
'form-imagen' |
'espacio-menu' |
'ejemplo' |
'imagen-texto' |
'examen-gratis';

export interface PageElement {
  id: string;
  type: ElementType;
  props: any;
  col?: number; // columnas Bootstrap 1-12, default 12
}

