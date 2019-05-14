import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Item} from './item';
import {ItemService} from './item.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html'
})
export class ItemEditComponent implements OnInit, OnDestroy {
  @Input() item: Item;
  private subscriptions = [];
  private error: Error;
  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemService, private location: Location) { this.item = {_id: 'as', text: 'mytext', isActive: false}; }

  ngOnInit() {
    this.error = null;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.subscriptions.push(this.itemService.getById(id).subscribe(
      item => this.item = item,
      error => {
        this.error = error;
        console.log(error);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subcription => subcription.unsubscribe());
  }

  updateButtonClicked($event: MouseEvent) {
    console.log(this.item);
    this.subscriptions.push(this.itemService.update(this.item).subscribe(
      item => {
        console.log(item);
        alert('updated');
      },
      error => {
        console.log('ERRRRRRRRRRRRRROR in updateButtonClicked');
        this.error = error;
        console.log(error);
      }));
    this.location.back();
  }
}
