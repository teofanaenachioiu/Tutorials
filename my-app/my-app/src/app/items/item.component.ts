import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Item} from './item';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from './item.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {
  item: Item;
  private subscriptions = [];
  error: HttpErrorResponse;
  private id: string;
  constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService, private location: Location) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadItem();
  }

  private loadItem() {
    this.error = null;
    this.subscriptions.push(this.itemService.getById(this.id).subscribe(
      item => this.item = item,
      error => {
        this.error = error;
        console.log(error);
      }));
  }

  retry() {
    this.loadItem();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subcription => subcription.unsubscribe());
  }

  deleteItem() {
    this.subscriptions.push(this.itemService.delete(this.item)
      .subscribe(item => alert('deleted')));
    this.location.back();
  }
}
