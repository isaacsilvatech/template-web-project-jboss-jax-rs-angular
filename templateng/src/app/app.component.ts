import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';
import { PT_BR } from './core/lang/pt-br';

@Component({
  selector: 'app-root',
  template: `
    <cmp-loading></cmp-loading>
    <cmp-nav></cmp-nav>
    `,
})
export class AppComponent implements OnInit {

  public readonly icon: string = "pi pi-box";
  public readonly title: string = "Template";

  constructor(private config: PrimeNGConfig, private titleService: Title) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.config.setTranslation(PT_BR);
  }
}
