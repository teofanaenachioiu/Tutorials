import {Injectable} from '@angular/core';
// import {ITEMS} from './mock-items';
import {Item} from './item';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {tick} from '@angular/core/testing';

declare var WebSocket: any;

const serverUrl = 'localhost:3000';
const httpServerUrl = `http://${serverUrl}`;
const itemUrl = `${httpServerUrl}/api/item`;

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  private itemSubject: BehaviorSubject<Item[]>;

  constructor(private http: HttpClient) {
    this.itemSubject = new BehaviorSubject([]);
    const ws: any = new WebSocket(`ws://${serverUrl}`);

    ws.onopen = () => {
      const token = localStorage.getItem('token');
      ws.send(JSON.stringify({token}));
      console.log('Conexiune creata');
    };

    ws.onmessage = eventRecv => {
      const {event, payload} = JSON.parse(eventRecv.data);
      console.log('Intra in onmessage');
      switch (event) {
        case 'created': {
          const items = this.itemSubject.getValue() || [];
          items.push(payload);
          this.itemSubject.next(items);
          break;
        }
        case 'deleted': {
          const items = this.itemSubject.getValue();
          for (let i = items.length - 1; i >= 0; i--) {
            if (items[i]._id === payload._id) {
              items.splice(i, 1);
            }
          }
          this.itemSubject.next(items);
          break;
        }
        case 'updated': {
          const items = this.itemSubject.getValue();
          for (let i = 0; i < items.length; i++) {
            if (items[i]._id === payload._id) {
              Object.assign(items[i], payload);
            }
          }
          this.itemSubject.next(items);
          break;
        }
      }
      console.log(event);
    };
  }

  authHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
    return httpOptions;
  }

  save(item: Item) {
    return this.http.post<Item>(itemUrl, item, this.authHttpOptions());
  }

  update(item: Item) {
    console.log('Vrea sa intre in put');
    console.log(item);
    return this.http.put(`${itemUrl}/${item._id}`, item, this.authHttpOptions());
  }

  delete(item: Item) {
    return this.http.delete(`${itemUrl}/${item._id}`, this.authHttpOptions());
  }

  getAll(): Observable<Item[]> {
    return this.itemSubject.asObservable();
  }

  refresh(): Observable<Item[]> {
    return this.http.get<Item[]>(itemUrl, this.authHttpOptions())
      .pipe(tap(items => this.itemSubject.next(items)));
  }

  getById(id: string) {
    //console.log(`${itemUrl}/${id}`);
    return this.http.get<Item>(`${itemUrl}/${id}`, this.authHttpOptions());
  }
}
