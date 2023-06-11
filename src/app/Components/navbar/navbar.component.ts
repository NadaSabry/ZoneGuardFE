import { Component, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  strtheme="";
  theme="";
  iconMode="";
  logourl="assets/icon/logo-no-background.svg";
  //navbar!: HTMLElement;
  constructor(private themeService:ThemeService, private renderer: Renderer2){
  }
  /*
  @ViewChild('navbar') navbarRef!: ElementRef;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 5) {
      this.renderer.addClass(this.navbar, 'navbar-scroll');
    } else {
      this.renderer.removeClass(this.navbar, 'navbar-scroll');
    }
  }
  ngAfterViewInit() {
    this.navbar = this.navbarRef.nativeElement;
  }
  */
  ngOnInit(): void {
    this.themeService.mode$.subscribe(res=> {
      this.strtheme="navbar-"+res;
      if(res=="dark"){
        this.theme="Light";
        this.iconMode="fa fa-sun";
        this.logourl="assets/logo/logo-darkmode.png";
      }
      else {
        this.theme="Dark";
        this.iconMode="fa fa-moon";
        this.logourl="assets/logo/logo-no-background.svg";
      }
    });
  }
  ToggleMode(){
    this.themeService.toggleMode();
  }

}
