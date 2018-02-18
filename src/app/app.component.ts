import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})

export class AppComponent {
  next;
  prev;
  page;
  count;
  data: Observable<any>;
  searchTerm$ = new Subject<string>();
  newPage$ = new Subject<number>();
  loading: boolean;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.loading = true;
    this.searchService.search(this.searchTerm$, this.newPage$)
      .subscribe(data => {
        this.loading = false;
        this.updateList(data)
      });

      this.searchService.searchEntries(null, 0)
        .subscribe(data => {
          this.loading = false;
          this.updateList(data)
        });
  }

  updateList(data) {
    this.data = data.results;
    this.next = data.next;
    this.prev = data.previous;
    this.count = data.count;
    this.page = 1;
    console.log('this.data = ', this.data);
    console.log('this.next = ', this.next);
    console.log('this.prev = ', this.prev);
    console.log('this.count = ', this.count);
    console.log('this.page = ', this.page);
  }

}
