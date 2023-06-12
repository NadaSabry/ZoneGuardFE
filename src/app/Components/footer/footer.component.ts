import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  logourl="assets/logo/logo-darkmode.png";
  
  constructor(private themeService:ThemeService){
  }

  ngOnInit(): void {
    this.themeService.mode$.subscribe(res=> {
      if(res=="dark"){
        this.logourl="assets/logo/logo-darkmode.png";
      }
      else {
        this.logourl="assets/logo/logo-no-background.svg";
      }
    });
  }

}
