import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ItemsComponent} from './items.component';
import {ItemComponent} from './item.component';
import {ItemEditComponent} from './item-edit.component';
import {ItemAddComponent} from './item-add.component';

const routes: Routes = [
  {path: '', component: ItemsComponent},
  {path: 'detail/:id', component: ItemComponent},
  {path: 'detail/:id/edit', component: ItemEditComponent},
  {path: 'add', component: ItemAddComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
