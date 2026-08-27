import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Banner } from '../../componentes/banner/banner';
import { EspacioMenu } from '../../componentes/espacio-menu/espacio-menu';
import { PageElement } from '../../models/element.model';

@Component({
  selector: 'app-element-host',
  standalone: true,
  imports: [CommonModule, Banner, EspacioMenu],
  templateUrl: './element-host.html',
  styleUrl: './element-host.css',
})
export class ElementHost {
  @Input() element!: PageElement;
}
