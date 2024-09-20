import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModulesComponent } from "../app/modules/modules.component";


////////////////////////////////
// ROTAS DE PUBLICACAO
////////////////////////////////
export const routes: Routes = [
    {
        path: '',
        component: ModulesComponent,
        children: [

        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModulesRoutingModule { }