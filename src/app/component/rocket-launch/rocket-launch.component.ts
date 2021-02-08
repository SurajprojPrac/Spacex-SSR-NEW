import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-rocket-launch',
  templateUrl: './rocket-launch.component.html',
  styleUrls: ['./rocket-launch.component.css']
})
export class RocketLaunchComponent implements OnInit,OnChanges {


  @Input('rocket') rocket! : RocketInfo;

  constructor() { }

  ngOnChanges(){
    this.rocket.land_success =this.rocket.rocket.first_stage.cores[0].land_success;
  }

  ngOnInit() {
  }

}



interface RocketInfo{
  flight_number?:any,
  mission_name?:any,
  mission_id?:any,
  launch_year?:any,
  launch_success?:any,
  links?:any,
  rocket?:any,
  land_success?:any,
  first_stage?:any
}