import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {
  baseUrl: string = 'https://swapi.co/api/people/';
  queryUrl: string = 'search=';
  queryPage: string = 'page=';
  loading: boolean;

  constructor(private http: Http) {
    this.loading = false;
  }

  search(terms: Observable<string>, page) {
    return terms.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term, page));
  }

  searchEntries(term, page) {
    var url = this.baseUrl;
    this.loading = true;
    if (term.length > 0) {
      url = url + '?' + this.queryUrl + term;
    }
    if (page > 0) {
      if (term.length > 0) {
        url = url + '&';
      } else {
        url = url + '?';
      }
      url = this.queryPage + page;
    }

    return this.http
      .get(url)
      .map(res => res.json());
  }
}
