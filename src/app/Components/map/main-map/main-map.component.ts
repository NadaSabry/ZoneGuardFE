import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Edge } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements AfterViewInit{
  IsOpen:boolean=false;
  FormNumber='close';
  UpdateGraph=false;
  closeSB=false;
  link:Edge={source:'12',target:'52',label:'nada'};
  myStyle:string="container-graph";
  @ViewChild('sidebar', { static: false, read: ElementRef }) sidebarRef: ElementRef | undefined;
  @ViewChild('graph', { static: false, read: ElementRef }) graphRef: ElementRef | undefined;
  sidebarEl:any;
  VideoDate="none";

  constructor(private elementRef: ElementRef){
  }

  closeSidebar(){
    this.IsOpen=false;
    this.myStyle="container-graph-Close_Sidebar";
    this.closeSB= !this.closeSB;
    if(this.graphRef?.nativeElement !=undefined){
      this.scrollToSection(this.graphRef?.nativeElement);
    }
  }
  ngAfterViewInit() {
    this.sidebarEl = this.sidebarRef?.nativeElement;
    if(this.sidebarEl!=undefined && this.IsOpen==true){
      this.scrollToSection(this.sidebarEl);
    }
  }
  //first scroll not work
  openSidebar(link:any)
  {
   this.VideoDate="none";
   this.IsOpen=true;
   this.link=link;
   console.log("sidebar id=",this.link.id);
   this.myStyle="container-graph-Open_Sidebar";
   this.ngAfterViewInit();
   //console.log('mmm',this.sidebarEl);
  }
  scrollToSection(section: HTMLElement) {
    section.scrollIntoView({ behavior: 'smooth', block:'start' });
  }
  closeForm(){
    this.FormNumber='close';
  }
}

