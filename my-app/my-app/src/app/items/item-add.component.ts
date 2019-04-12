import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ItemService} from './item.service';
import {Item} from './item';
import {text} from '@angular/core/src/render3';
import {ItemsComponent} from './items.component';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
})
export class ItemAddComponent implements OnInit, OnDestroy {
  @Input() item: Item;
  private subscriptions = [];
  private error: Error;
  constructor(private itemService: ItemService) {  }

  ngOnInit() {
    this.item = new Item();
  }

  addButtonClicked($event) {
    this.subscriptions.push(this.itemService.save(this.item).subscribe(
      item => {
        this.item = item;
        alert('saved');
      },
      error => {
        this.error = error;
        console.log(error);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subcription => subcription.unsubscribe());
  }
}
