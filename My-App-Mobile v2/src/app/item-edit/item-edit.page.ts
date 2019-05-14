import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ItemService} from '../items/items.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../items/item';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.page.html',
  styleUrls: ['./item-edit.page.scss'],
})
export class ItemEditPage implements OnInit, OnDestroy {
  @Input() item: Item;
  private subscriptions = [];
  constructor(private itemService: ItemService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.subscriptions.push(this.itemService.getById(id).subscribe(
        item => this.item = item,
        error => {
          console.log(error);
        }));
  }

  updateItem() {
    this.subscriptions.push(this.itemService.update(this.item).subscribe(
        item => {
          console.log(item);
        },
        error => {
          console.log(error);
        }));
    this.router.navigate([`/item/detail/${this.item._id}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subcription => subcription.unsubscribe());
  }
}
