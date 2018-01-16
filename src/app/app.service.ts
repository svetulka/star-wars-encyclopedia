import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  // constructor(public http: Http) {}
  //
  // getData() {
  //   return this.http.get("https://swapi.co/api/people/").map(res => res.json())
  // }
  //
  // getMore(suiv){
  //   return this.http.get(suiv).map(res => res.json())
  // }
  //
  // private handleError (error: any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   // We'd also dig deeper into the error to get a better message
  //   let errMsg = (error.message) ? error.message :
  //   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); // log to console instead
  //   return Observable.throw(errMsg);
  // }
}
