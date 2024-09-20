import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SidebarGroup } from './sidebar.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private groupsSubject = new BehaviorSubject<SidebarGroup[]>([]);

  constructor() { }

  public createGroupsByRoutes(routes: Routes): void {
    const groups = this.createGroups(routes);
    this.groupsSubject.next(groups);
  }

  private createGroups(rootChildren: Routes): SidebarGroup[] {
    const groupMap = new Map<string, SidebarGroup>();

    for (let groupChild of rootChildren) {
      if (groupChild.data) {
        const groupKey = groupChild.data["group"];
        const group: SidebarGroup = groupMap.get(groupKey) ?? { group: groupChild.data["group"], items: [] };
        group.items.push({
          path: groupChild.path,
          icon: groupChild.data["icon"],
          label: groupChild.data["label"],
          tooltip: groupChild.data["tooltip"],
        })
        groupMap.set(groupKey, group);
      }
    }
    return Array.from(groupMap.values());
  }

  public getGroups(): Observable<SidebarGroup[]> {
    return this.groupsSubject.asObservable();
  }
}
