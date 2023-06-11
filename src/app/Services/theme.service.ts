import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Theme{
  light='light',
  dark='dark'
 }

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private mode: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.dark);
  constructor() { }
  
  // like static
  get mode$(){
   return this.mode.asObservable();
  }
  //تبديل
  toggleMode(){
    if(this.mode.value === Theme.dark){
      this.mode.next(Theme.light);
    }
    else{
      this.mode.next(Theme.dark);
    }
  }

}
