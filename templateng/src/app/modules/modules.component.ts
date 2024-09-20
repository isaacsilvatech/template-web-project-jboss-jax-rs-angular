import { Component } from '@angular/core';
import { SidebarService } from '../shared/template/sidebar/sidebar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modules',
  template: `<cmp-template></cmp-template>`,
})
export class ModulesComponent {

  constructor(private sidebar: SidebarService, private activatedRoute: ActivatedRoute) {
    const rootChildren = this.activatedRoute.routeConfig.children;
    this.sidebar.createGroupsByRoutes(rootChildren);
  }
}
