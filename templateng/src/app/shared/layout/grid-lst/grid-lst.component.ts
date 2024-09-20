import { AfterViewInit, Component, ContentChild, ElementRef, HostBinding, Renderer2, afterNextRender } from '@angular/core';
import { GridActionLstComponent } from './grid-action-lst/grid-action-lst.component';
import { GridFooterLstComponent } from './grid-footer-lst/grid-footer-lst.component';
import { GridPesqLstComponent } from './grid-pesq-lst/grid-pesq-lst.component';
import { GridTableLstComponent } from './grid-table-lst/grid-table-lst.component';

@Component({
  selector: 'cmp-grid-lst',
  templateUrl: './grid-lst.component.html',
  styleUrls: ['./grid-lst.component.css'],
})
export class GridLstComponent implements AfterViewInit {

  @ContentChild(GridPesqLstComponent) gridPesqLst: GridPesqLstComponent;
  @ContentChild(GridActionLstComponent) gridActionLst: GridActionLstComponent;
  @ContentChild(GridTableLstComponent) gridTableLst: GridTableLstComponent;
  @ContentChild(GridFooterLstComponent) gridFooterLst: GridFooterLstComponent;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    const gridLst = this.el.nativeElement as HTMLElement;

    this.renderer.setStyle(gridLst, "grid-template-rows", `
        ${this.gridPesqLst ? 'auto' : ''} 
        ${this.gridActionLst ? 'auto' : ''} 
        ${this.gridTableLst ? '1fr' : ''} 
        ${this.gridFooterLst ? 'auto' : ''} 
      `)
  }
}
