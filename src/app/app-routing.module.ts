import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlideshowComponent } from './Components/slideshow/slideshow.component';

const routes: Routes = [
  {path:'', component:SlideshowComponent},
  {
    // route in Map-Module 
    path: 'Map', 
    loadChildren: () => import('src/app/Components/map/map.module').then(m => m.MapModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
