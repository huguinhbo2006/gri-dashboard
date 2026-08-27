import { Component } from '@angular/core';
import { Sidebar } from "../../builder/sidebar/sidebar";
import { Canvas } from "../../builder/canvas/canvas";

@Component({
  selector: 'app-admin',
  imports: [Sidebar, Canvas],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

}
