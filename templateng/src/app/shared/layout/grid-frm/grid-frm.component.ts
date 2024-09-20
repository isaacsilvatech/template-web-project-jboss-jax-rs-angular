import { Component, ContentChild, ElementRef, Renderer2 } from '@angular/core';
import { GridHeaderFrmComponent } from './grid-header-frm/grid-header-frm.component';
import { GridActionFrmComponent } from './grid-action-frm/grid-action-frm.component';
import { GridContentFrmComponent } from './grid-content-frm/grid-content-frm.component';

@Component({
  selector: 'cmp-grid-frm',
  templateUrl: './grid-frm.component.html',
  styleUrls: ['./grid-frm.component.css']
})
export class GridFrmComponent {

  @ContentChild(GridHeaderFrmComponent) gridHeaderFrm: GridHeaderFrmComponent;
  @ContentChild(GridContentFrmComponent) gridContentFrm: GridContentFrmComponent;
  @ContentChild(GridActionFrmComponent) gridActionFrm: GridActionFrmComponent;


  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    const gridLst = this.el.nativeElement as HTMLElement;

    if (this.gridHeaderFrm && !this.gridContentFrm) {
      let gridHeader = gridLst.querySelector("cmp-grid-header-frm");
      this.renderer.setStyle(gridHeader, "grid-area", `1/1/3/2`);
    }

    if (this.gridContentFrm && !this.gridHeaderFrm) {
      let gridHeader = gridLst.querySelector("cmp-grid-content-frm");
      this.renderer.setStyle(gridHeader, "grid-area", `1/1/3/2`);
    }
  }
}
