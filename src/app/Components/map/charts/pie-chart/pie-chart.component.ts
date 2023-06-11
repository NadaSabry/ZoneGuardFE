import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js/auto';
import { ChartType, ChartOptions } from 'chart.js';
import { ChartDataset } from 'chart.js';
import { GenericApiService } from 'src/app/Services/API/generic-api.service';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements OnInit 
{
  percentage_sec:number=1;
  percentage_unSec:number=3;
  pieChartDatasets=[ {
    data: [ 100, 0],
    backgroundColor: [
      'rgb(90, 255, 99)', //green
      'rgb(255, 99, 99)',
      //'#dc3545'//rgb(255, 99, 99)',
    ],
    hoverOffset: 5
  } ];
  constructor(private ApiService:GenericApiService){
  }
  ngOnInit(): void {
    this.ApiService.get("chart","pie").subscribe((data)=>{
      this.pieChartDatasets=[{
        data: [ data.greenLinksCounts, data.redLinksCounts],
        backgroundColor: [
           'rgb(90, 255, 99)', //green
           'rgb(255, 99, 99)',
        ],
       hoverOffset: 10
      }]
       this.percentage_sec=data.greenLinksCounts;
       this.percentage_unSec=data.redLinksCounts;
    })
  }
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ 'Security' , 'UnSecurity' ];
  /*
  public pieChartDatasets = [ {
    data: [ this.percentage_sec, this.percentage_unSec],
    backgroundColor: [
      'rgb(90, 255, 99)', //green
      'rgb(255, 99, 99)',
      //'#dc3545'//rgb(255, 99, 99)',
    ],
    hoverOffset: 5
  } ];
  */
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
/*
  ngAfterViewInit() {
    //this.pieChart();
  }
  */
  /*
  chartjstest(){
    new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  */
  pieChart(){
    /*
    new Chart("MyChart", {
      type: 'pie',
      data: {
        labels:  [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',//red
            'rgb(54, 162, 235)',//blue
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }],
      },
      options: 
      {
        aspectRatio: 3.5
      }
  })
  */
}

}
  
  