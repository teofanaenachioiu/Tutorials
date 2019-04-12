import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from './item';
import {ItemService} from './item.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit, OnDestroy {
  subscriptions = [];
  items: Item[];
  error: HttpErrorResponse;
  constructor(private itemService: ItemService) {  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.subscriptions.push(this.itemService.getAll().subscribe(items => {
      this.items = items;
    }, error => this.error = error));
    this.subscriptions.push(this.itemService.refresh().subscribe());
  }

  retry() {
    this.loadItems();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
