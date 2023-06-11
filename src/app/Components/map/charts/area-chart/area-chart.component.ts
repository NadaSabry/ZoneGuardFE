import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { GenericApiService } from 'src/app/Services/API/generic-api.service';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit {
  constructor(private ApiServise:GenericApiService){
  }
  ngOnInit(): void {
      this.ApiServise.get("chart","bar").subscribe((bar)=>{
       let label = [],dataDanger=[],dataSave=[];

       for (let i = 0; i < bar.data.length; i++) {
          label.push(bar.data[i].date);
          dataDanger.push(bar.data[i].accidentCounts);
          dataSave.push(bar.data[i].notAccidentCounts);
       }
        this.barChartData={
         labels: label, //row
         datasets: [
           { data: dataDanger, label: 'Danger' },
           { data: dataSave, label: 'Save' }
         ]
        }
      })
   }
  title = 'ng2-charts-demo';
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '5/5/2023', '6/5/2023', '7/5/2023', '8/5/2023', '9/5/2023', '10/5/2023', '11/5/2023' ], //row
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Danger' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Save' }
    ]
  };


  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  /*
  public pieChartOptions: ChartOptions<'bar'> = {
    responsive: false,
  };
  public pieChartLabels = [
    'Mar 1',
    'Mar 2',
    'Mar 3',
    'Mar 4',
    'Mar 5',
    'Mar 6',
    'Mar 7',
    'Mar 8',
    'Mar 9',
    'Mar 10',
    'Mar 11',
    'Mar 12',
    'Mar 13',
];
  public pieChartDatasets = [
    {
        label: 'Danger',
        lineTension: 0.3,
        backgroundColor: 'rgba(2,117,216,0.2)',
        borderColor: 'rgba(2,117,216,1)',
        pointRadius: 5,
        pointBackgroundColor: 'rgba(2,117,216,1)',
        pointBorderColor: 'rgba(255,255,255,0.8)',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(2,117,216,1)',
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: [
            10000,
            30162,
            26263,
            18394,
            18287,
            28682,
            31274,
            33259,
            25849,
            24159,
            32651,
            31984,
            38451,
        ],
    },
];
  public pieChartLegend = true;
  public pieChartPlugins = [
  ];*/
}
