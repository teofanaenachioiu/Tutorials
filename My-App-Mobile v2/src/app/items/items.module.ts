import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemsPage } from './items.page';
import {ItemService} from './items.service';
import {HttpClientModule} from '@angular/common/http';
import {ItemPage} from './item/item.page';
import {ItemAddPage} from './item-add/item-add.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsPage
  },
  {path: 'detail/:id', component: ItemPage },
  {path: 'add', component: ItemAddPage}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemsPage, ItemPage, ItemAddPage],
  providers: [ItemService]
})
export class ItemsPageModule {}
