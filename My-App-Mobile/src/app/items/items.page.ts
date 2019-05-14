import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Item} from './item';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from './item.service';
import {IonInfiniteScroll, IonVirtualScroll, LoadingController} from '@ionic/angular';

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
    constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService, private loadingController: LoadingController) {
    }

    async ngOnInit() {
        this.loading = await this.loadingController.create({
            message: 'Hellooo',
            duration: 500
        });
        this.loading.present();
        this.error = null;
        this.page = 0;
        this.limit = 2;
        this.subscriptions.push(this.itemService.getPagined(this.page, this.limit).subscribe(
            items => {
                this.items = items;
                this.page++;
                // this.loading.dismiss();
            },
        error => {
            this.error = error;
            this.loading.dismiss();
        }));
        // this.subscriptions.push(this.itemService.refresh().subscribe());
    }

    ngOnDestroy() {
        this.loading.dismiss();
        this.subscriptions.forEach(subcription => subcription.unsubscribe());
    }

    loadData(event) {
        console.log('intra in lodadata');
        this.subscriptions.push(this.itemService.getPagined(this.page, this.limit).subscribe(
            items => {
                console.log('Page:');
                console.log(this.page);
                this.items = this.items.concat(items);
                console.log(this.items);
                // if (items.length === 0) {
                //     event.target.disabled = true;
                // }
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
                // this.virtualScroll.checkEnd();
                // App logic to determine if all data is loaded
                // and disable the infinite scroll
                // if (this.items.length === 100) {
                //     event.target.disabled = true;
                // }
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
