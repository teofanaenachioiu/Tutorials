import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-app';
  showItems = true;
  private intervalId: number;
  // private counter = 0;
  constructor() {
    console.log('constructor');
  }

  ngOnInit(): void {
    // this.title = 'title';
  }

  ngOnDestroy(): void {
    // clearInterval(this.intervalId);
  }

  // increment(event) {
  //   this.counter++;
  // }
}
