import { Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

import { Injectable } from '@angular/core';
import { SearchService } from './search.service';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})

export class AppComponent {
  data: Observable<any>;
  next;
  prev;
  page;
  count;
  searchTerm$ = new Subject<string>();
  newPage$ = new Subject<number>();

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$, this.newPage$)
      .subscribe(data => this.updateList(data) );

      this.searchService.searchEntries(null, 0)
        .subscribe(data => this.updateList(data) );
  }

  updateList(data) {
    this.data = data.results;
    this.next = data.next;
    this.prev = data.previous;
    this.count = data.count;
    this.page = 1;
  }

}
