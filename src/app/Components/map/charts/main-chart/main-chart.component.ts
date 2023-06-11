import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit {
 chart="pie";
 width="0px";
 currentWidth="330px";
 arrow="assets/icon/left-arrow.png";
 //chartDisplay="false";
  constructor() { }

  ngOnInit() {
    //this.onResize(window); // Call the onResize function with the window object
    this.currentWidth = window.innerWidth >= 500 ? '380px' : '330px';
    //console.log(window.innerWidth);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 500) {
      this.currentWidth = '380px';
    } else {
      this.currentWidth = '330px';
    }
  }
    
  toggle(){
    if(this.width=="0px"){
      this.width=this.currentWidth;
      this.arrow="assets/icon/right-arrow.png";
    }
    else{
      this.width="0px";
      this.arrow="assets/icon/left-arrow.png";
    }
  }

}
