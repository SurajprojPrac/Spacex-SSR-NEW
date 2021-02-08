import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-space-container',
  templateUrl: './space-container.component.html',
  styleUrls: ['./space-container.component.css']
})
export class SpaceContainerComponent implements OnInit {


  launchYears: Array<any>;
  API_BASE_URL = `https://api.spacexdata.com/v3/launches?`;
  rocketDetails = [];
  loader : boolean = true;

  fiters : any = {
    limit: 100,
    launch_year: undefined,
    launch_success: undefined,
    land_success: undefined
  }


  constructor(private http: HttpClient, private _route: ActivatedRoute,private _router: Router) {
    this.launchYears = new Array<any>(15).fill(0).map((ele, index) => 2006 + index);
  }

  ngOnInit() {
    this._route.queryParams.subscribe(param=>{
        if(param && Object.keys(param).length){
          for(let p in param){
            this.fiters[p]=param[p];
          }
        }
    })

    this.getAllrocketdetails();
  }

  getAllrocketdetails() {
    this.loader=true;
    let qureyParam = Object.keys(this.fiters).map(key => {
      key = key + "=" + (this.fiters[key] != undefined ? this.fiters[key] : '')
      return key
    }).join('&');
    let url = this.API_BASE_URL + qureyParam;
    this.http.get(url).subscribe((resp: any) => {
      if (resp) {
        this.loader=false;
        this.rocketDetails = resp;
      }
    })
  }

  selectFilter(selectedField:any, value:any) {

    if(this.fiters[selectedField] == value){
      value=undefined;
    }
    this.fiters[selectedField] = value;
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        [selectedField]: value
      },
      queryParamsHandling: 'merge',
    });
    this.getAllrocketdetails();
  }

}
