import { Component, Inject, PLATFORM_ID, OnInit } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { Location } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-space-container',
  templateUrl: './space-container.component.html',
  styleUrls: ['./space-container.component.css']
})
export class SpaceContainerComponent implements OnInit {


  launchYears: Array<any>;
  API_BASE_URL = `https://api.spacexdata.com/v3/launches?`;
  rocketDetails = [];
  loader: boolean = true;

  fiters: any = {
    limit: 100,
    launch_year: undefined,
    launch_success: undefined,
    land_success: undefined
  }


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private location: Location,
    private title: Title,
    private meta: Meta,
    private http: HttpClient, private _route: ActivatedRoute, private _router: Router) {
    this.launchYears = new Array<any>(15).fill(0).map((ele, index) => 2006 + index);
    if (isPlatformBrowser(this.platformId)) {
        this._route.queryParams.pipe(debounceTime(0)).subscribe(resp=>{
          for(let chk in resp){
              this.fiters[chk]=resp[chk];
          }
          console.log(this.fiters);
          this.getAllrocketdetails();
          console.log("API ENDED ");
        });
    }
  }

  ngOnInit() {
    this.title.setTitle("spacesX launches");
    this.meta.addTag({ keywords: "angular8, ssr, single page application" });
    this.meta.addTag({
      description: "create single page application in angular",
    });
  }

  getAllrocketdetails() {
    console.log("API STARTED");
    this.loader = true;
    let qureyParam = Object.keys(this.fiters).map(key => {
      key = key + "=" + (this.fiters[key] != undefined ? this.fiters[key] : '')
      return key
    }).join('&');
    let url = this.API_BASE_URL + qureyParam;
    this.http.get(url).subscribe((resp: any) => {
      if (resp) {
        this.loader = false;
        this.rocketDetails = resp;
      }
    })
  }

  selectFilter(selectedField: any, value: any) {

    if (this.fiters[selectedField] == value) {
      value = undefined;
    }
    this.fiters[selectedField] = value;
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        [selectedField]: value
      },
      queryParamsHandling: 'merge',
    });
  }

}
