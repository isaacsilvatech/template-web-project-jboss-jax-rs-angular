import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cmp-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  public label: string = "";
  public icon: string = "";

  constructor(private actvatedRouter: ActivatedRoute) {
    this.actvatedRouter.data.subscribe(data => {
      this.label = data["label"];
      this.icon = data["icon"];
    })
  }
}
