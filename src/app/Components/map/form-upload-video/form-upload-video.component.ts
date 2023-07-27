import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { GenericApiService } from 'src/app/Services/API/generic-api.service';

@Component({
  selector: 'app-form-upload-video',
  templateUrl: './form-upload-video.component.html',
  styleUrls: ['./form-upload-video.component.scss']
})
export class FormUploadVideoComponent implements OnInit {
  @Input() StreetID!: string;
  selectedFile!: File;
  Message: string = "";
  MessageType = "";

  constructor(private httpclient: HttpClient, private Apiserver: GenericApiService) {
  }
  ngOnInit() {
    this.Message = "";
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
  private IsSizeOk() {
    const fileSizeInMB = this.selectedFile.size / (1024 * 1024);
    if (fileSizeInMB > 10) {
      //alert("Selected file exceeds 10MB. Please select a smaller file.");
      return false;
    } else {
      console.log("fileSizeInMB ok =", fileSizeInMB);
      return true;
    }
  }
  private MessageDanger( message:string){
    this.MessageType = "text-danger";
    this.Message = message;
  }
  private MessageSuccess( message:string){
    this.MessageType = "text-success";
    this.Message = message;
  }
  onUpload() {
    if(this.selectedFile==undefined){
      this.MessageDanger("No file selected. Please select a file.");
    }
    else if (this.IsSizeOk()) {
      const filedata = new FormData();
      this.Message = "upload";
      filedata.append('video', this.selectedFile);
     
      // upload on the server database
      this.Apiserver.UploadFile('link', filedata, this.StreetID.substring(1)).subscribe(
        (response) => {
          console.log(response);
          this.MessageSuccess("Successfully Uploaded !");
        },
        (error) => {
          console.log('errrrrror');
          this.MessageDanger("Upload Failed !");
        }
      );
    }
    else{
      this.MessageDanger("Selected file exceeds 10MB. Please select a smaller file.");
    }

  }

}
