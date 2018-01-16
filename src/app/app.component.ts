import { Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { SearchService } from './search.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, SearchService]
})

export class AppComponent implements OnInit {
  data: Object;
  next;
  prev;
  page;
  count;
  searchTerm$ = new Subject<string>();
  newPage$ = new Subject<number>();
  private loading: boolean = false;

  ngOnInit() {
     // this.searchService.search("", 1);
  }

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$, this.newPage$)
      .subscribe(
        data => {
          console.log(data);
          this.loading = true;
          console.log("this.loading " + this.loading);
          if (data) {
            this.loading = false;
            this.data = data.results;
            this.next = data.next;
            this.prev = data.previous;
            this.count = data.count;
            this.page = 1;
          }
        },
        error => console.log("Error: ", error),
        () => console.log("onComplete")
      )




    // this._heroService.addHero(this.hero).subscribe(
    //   hero=> this.hero= hero,
    //   error => console.log("Error: ", error),
    //   function(){ this._router.navigate(['HeroDetail', { id: this.hero.id }]) }
    // );
  }

  // ngOnInit() {
  //   AppService.getData().subscribe(data => {
  //     this.data = data.results;
  //     this.next = data.next;
  //     this.prev = data.previous;
  //     this.count = data.count;
  //     this.page = 1;
  //     console.log("data", data)
  //   })
  // }
  // constructor(public appService: AppService){
  //   appService.getData().subscribe(data => {
  //     this.data = data.results;
  //     this.next = data.next;
  //     this.prev = data.previous;
  //     this.count = data.count;
  //     this.page = 1;
  //     console.log("data", data)
  //   })
  // }

  // getData(choice){
  //   let choix = ""
  //   if(choice) {
  //     choix = this.next;
  //   } else {
  //     choix = this.prev;
  //   }
  //   this.AppService.getMore(choix).subscribe(data => {
  //       this.data = data.results;
  //       this.next = data.next;
  //       this.prev = data.previous;
  //       this.page = choix.slice(-1);
  //       console.log("getData", data);
  //   })
  // }
}
