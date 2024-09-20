import { AfterViewInit, Component, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'cmp-grid-content-frm',
  templateUrl: './grid-content-frm.component.html',
  styleUrls: ['./grid-content-frm.component.css']
})
export class GridContentFrmComponent implements AfterViewInit {


  @HostBinding('style.border')
  private border = '1px solid var(--surface-border)';

  @HostBinding('style.padding')
  private padding = '10px';

  constructor(private el: ElementRef) {
  }
  ngAfterViewInit(): void {
    const tabView = this.el.nativeElement.parentElement.querySelector("cmp-grid-content-frm > p-tabView") as HTMLElement;
    setTimeout(() => {
      if (tabView) {
        this.border = 'none';
        this.padding = '0';
      }
    })
  }


}
