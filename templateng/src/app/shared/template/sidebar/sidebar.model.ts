
export interface SidebarItem {
    path: string;
    icon: string;
    label: string;
    tooltip?:string
}

export interface SidebarGroup {
    group: string;
    items: SidebarItem[];
}