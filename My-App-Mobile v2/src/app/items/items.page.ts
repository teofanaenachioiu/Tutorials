import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Item} from './item';
import {ItemService} from './items.service';
import {IonInfiniteScroll, IonVirtualScroll, LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {
    items: Item[];
    private subscriptions = [];
    error: HttpErrorResponse;
    loading: any;
    page: number;
    limit: number;
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
    constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService, private loadingController: LoadingController, private router:Router) {
    }

    async ngOnInit() {
        this.loading = await this.loadingController.create({
            message: 'Hellooo',
            duration: 500
        });
        this.loading.present();
        this.error = null;
        // this.subscriptions.push(this.itemService.getPaginated(this.page).subscribe(
        //     items => {
        //         this.items = items;
        //         this.page++;
        //         // this.loading.dismiss();
        //     },
        //     error => {
        //         this.error = error;
        //         this.loading.dismiss();
        //     }));
        this.subscriptions.push(this.itemService.getAll().subscribe(
            items => {
                this.items = items;
                // this.loading.dismiss();
            },
            error => {
                this.error = error;
                this.loading.dismiss();
            }));
        this.subscriptions.push(this.itemService.refresh().subscribe());
    }

    ngOnDestroy() {
        this.loading.dismiss();
        this.subscriptions.forEach(subcription => subcription.unsubscribe());
    }

    async showItemDetails(item: Item) {
        this.router.navigate([`/items/detail/${item._id}`]);
    }

    loadData(event) {
        console.log('intra in loaddata');
        this.subscriptions.push(this.itemService.getPaginated(this.page).subscribe(
            items => {
                console.log('Page:');
                console.log(this.page);
                this.items = this.items.concat(items);
                console.log(this.items);
                this.page++;
                setTimeout(() => {
                    console.log('Done');
                    event.target.complete();
                    // App logic to determine if all data is loaded
                    // and disable the infinite scroll
                    if (this.items.length === 1000) {
                        event.target.disabled = true;
                    }
                }, 1000);
            },
            error => {
                this.error = error;
                console.log(error);
                event.target.complete();
            }));
    }

    // toggleInfiniteScroll() {
    //     this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    // }
}
