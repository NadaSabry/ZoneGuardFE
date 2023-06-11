import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { FormUploadVideoComponent } from './form-upload-video/form-upload-video.component';
import { FormsModule } from '@angular/forms';
import { OperationsOnTheGraphComponent } from './operations-on-the-graph/operations-on-the-graph.component';
import { StreetSecurityDetailsComponent } from './StreetDetails/street-security-details/street-security-details.component';
import { MainMapComponent } from './main-map/main-map.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { AreaChartComponent } from './charts/area-chart/area-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { StreetVideosComponent } from './StreetDetails/street-videos/street-videos.component';
import { MainChartComponent } from './charts/main-chart/main-chart.component';


const routes: Routes = [
  {path:'',  component:MainMapComponent},
]

@NgModule({
  declarations: [
    GraphComponent,
    OperationsOnTheGraphComponent,
    StreetSecurityDetailsComponent,
    MainMapComponent,
    PieChartComponent,
    AreaChartComponent,
    FormUploadVideoComponent,
    StreetVideosComponent,
    MainChartComponent
  ],
  imports: [
    CommonModule,
    NgxGraphModule,
    NgChartsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MapModule { }
