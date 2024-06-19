import { Component, OnInit,ViewChild, ViewContainerRef, ComponentFactoryResolver ,Directive, ElementRef, HostListener, Input} from '@angular/core';
import { S6o4o3AllTablesComponent } from '../../s6o4-gestionDBcomponents/s6o4o3-allTables/s6o4o3-allTables.component';
import { S6o4o9AllCategoriesComponent } from '../../s6o4-gestionDBcomponents/s6o4o9-allCategories/s6o4o9-allCategories.component';
import { S6o4o12TwoTablesComponent } from '../../s6o4-gestionDBcomponents/s6o4o12-TwoTablesf/s6o4o12-twoTables/s6o4o12-twoTables.component';

@Component({
  selector: 'app-s6o5o1-GestionDB',
  templateUrl: './s6o5o1-GestionDB.component.html',
  styleUrls: ['./s6o5o1-GestionDB.component.css']
})
export class S6o5o1GestionDBComponent {

  @ViewChild('frameContainer', { read: ViewContainerRef }) frameContainer!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  
  TS_OnDragOver(event: Event) {
    event.preventDefault(); // This is necessary to allow dropping
  }

  TS_OnDrop(event: DragEvent) {
    event.preventDefault();
    const componentType = event.dataTransfer?.getData('componentType')
  }


  /* a supprimer */

  TS_onDragStart(event: DragEvent, componentType: string) {
    event.dataTransfer?.setData('componentType', componentType);
    console.log('Drag Start');
  }
  TS_loadComponent(componentClass: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    this.frameContainer.createComponent(componentFactory);
  }

}
