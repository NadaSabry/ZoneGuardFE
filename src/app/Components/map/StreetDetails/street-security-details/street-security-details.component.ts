import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyEdge } from 'src/app/Models/my-edge';
import { GenericApiService } from 'src/app/Services/API/generic-api.service';

@Component({
  selector: 'app-street-security-details',
  templateUrl: './street-security-details.component.html',
  styleUrls: ['./street-security-details.component.scss']
})
export class StreetSecurityDetailsComponent implements OnInit {
  @Input() Link: MyEdge = { source: '12', target: '52', label: 'nada' };
  @Output() hiddenStreetDetails = new EventEmitter<void>();
  @Output() FormNumberEvent = new EventEmitter<string>(false);
  @Output() OpenVideowithDate = new EventEmitter<string>();
  tmpLink:MyEdge ={id:'111', source: '12', target: '52', label: 'nada' };
  date:string="";

  constructor(private ApiService: GenericApiService){}

  ngOnInit(): void {
  }

  close() {
    this.hiddenStreetDetails.emit();
  }
  editName() {
    this.Link.color=undefined;
    console.log("id=",this.Link.id);

    this.tmpLink.id=this.Link.id?.substring(1);
    this.tmpLink.label=this.Link.label;
    //this.tmpLink.videos=this.Link.videos;
    console.log("edit name streetId = ",this.Link.id ,this.tmpLink.id );

    console.log(this.Link);
    
    this.ApiService.Edit("link",this.tmpLink).subscribe(()=>{
      this.Link.color='gray';
    })
  }

}

