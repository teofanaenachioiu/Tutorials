import { NgModule } from '@angular/core';
import {ItemsComponent} from './items.component';
import {ItemComponent} from './item.component';
import {ItemAddComponent} from './item-add.component';
import {ItemEditComponent} from './item-edit.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ItemRoutingModule} from './item-routing.module';
import {ItemService} from './item.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    ItemAddComponent,
    ItemEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ItemRoutingModule
  ],
  providers: [ItemService]
})
export class ItemModule { }
