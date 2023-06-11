import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme, ThemeService } from './Services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ZoneGuard';
  strtheme="";
  theme! : Observable<Theme>;
  constructor(private themeService:ThemeService){
  }
  ngOnInit(): void {
    this.theme = this.themeService.mode$;
    // light
    this.theme.subscribe(res=> this.strtheme=res);
  }
}
