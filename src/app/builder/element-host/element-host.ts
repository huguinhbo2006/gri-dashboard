import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageElement } from '../../models/element.model';
import { NavbarComponent } from '../../componentes/navbar/navbar';
import { HeroComponent } from '../../componentes/hero/hero';
import { EventsGridComponent } from '../../componentes/events-grid/events-grid';
import { ServicesComponent } from '../../componentes/services/services';
import { ContactComponent } from '../../componentes/contact/contact';
import { FooterComponent } from '../../componentes/footer/footer';

@Component({
  selector: 'app-element-host',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    EventsGridComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './element-host.html',
  styleUrl: './element-host.css',
})
export class ElementHost {
  @Input() element!: PageElement;
  @Output() actualizarProps = new EventEmitter<any>();

  onPropsUpdate(updatedProps: any) {
    this.actualizarProps.emit(updatedProps);
  }
}

