import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FramesData } from 'src/app/Models/frames-data';
import { StreetResult } from 'src/app/Models/street-result';
import { GenericApiService } from 'src/app/Services/API/generic-api.service';
import { Environment } from 'src/environments/URL';

@Component({
  selector: 'app-street-videos',
  templateUrl: './street-videos.component.html',
  styleUrls: ['./street-videos.component.scss']
})
export class StreetVideosComponent implements OnInit {
  @Input() videoDate: string = "";
  @Input() streetId = "";
  @Output() back = new EventEmitter<string>();
  i = 0;
  status = "Normal";
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef;
  streetResult: StreetResult[] = [];
  frames: FramesData[] = [];
  fps: number = 0;
  videoId = "";
  videoUrl = "";

  constructor(private ApiService: GenericApiService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('streetId' in changes){
      this.videoUrl="";
    }
    if ('videoDate' in changes && this.streetId != undefined) {
      console.log("videoDate change= ", this.videoDate, " ID= ", this.streetId);
      this.videoDate = this.videoDate.substring(0, 10);
      this.ApiService.get("link", this.streetId.substring(1)).subscribe(result => {
        this.streetResult = result?.results;
        this.videoId = this.streetResult?.filter(item => item.date.startsWith(this.videoDate))[0]?.record;
        if (this.videoId) {
          this.ApiService.get("link/record", this.videoId, "frames").subscribe(result => {
            this.frames = result.framesData;
            console.log("videoID = ", this.videoId, "frames= ", this.frames);
            this.getvideo();
          })
        }
        else {
          this.videoUrl="";
          console.log("No video in this street :( ");
        }
      });
    }
  }

  ngOnInit(): void {
  }

  getvideo() {
    this.videoUrl = `${Environment.graphAPIurl}/link/record/${this.videoId}`;
  }

  currentTime: number = 0;
  duration: number = 0;

  onTimeUpdate(video: any) {
    this.currentTime = video.currentTime;
    this.duration = video.duration;
    this.fps = this.frames.length / this.duration;;
    //console.log("currentTime=",this.currentTime," duration= ",this.duration,"fps= ",this.fps);

  }

  getCurrentFrameColor() {
    /*
    const frames=this.streetData[0].record.framesData;
    console.log("frames 0 =", frames);
    */
    const currentFrame = Math.floor(this.currentTime * this.fps);
    const IsExist = this.frames.find(frame => frame.frameNumber == currentFrame && frame.frameStatus === 'accident');
    // console.log("curren frame =",currentFrame, " , ",this.currentTime, ",",this.currentTime*this.fps);
    IsExist == undefined ? this.status = "Normal" : this.status = "Anomaly"
    return IsExist == undefined ? 'green' : 'red';
  }
}


/*
accidentFrames = this.frames.filter(frame => frame.frameStatus === 'accident');
getFrameUrl(frame:any) {
      return `assets/video.mp4#t=${frame.frameNumber},${frame.frameNumber + 1}`;
    }
nextFrame(){
      console.log(this.url, "i= ", this.i , " ", this.accidentFrames.length);
      this.url = this.getFrameUrl(this.accidentFrames[this.i]);
      if( this.i+1 < this.accidentFrames.length )
      {
        this.stateNext="";
        this.i++;
      }
      else this.stateNext="disabled";
      if( this.i > 0 ) this.statePrv="";
    }
    prevFrame(){
      this.url = this.getFrameUrl(this.accidentFrames[this.i]);
      console.log(this.url, "i= ", this.i);
      if( this.i > 0 )
      {
        this.statePrv="";
        this.i--;
      }
      else this.statePrv="disabled";
      if(this.i+1 < this.accidentFrames.length)this.stateNext="";
    }
      progress = 0;
  anomalyDetected = [false, true, false, false, true, true, true, false];
  anomalyDetected2=["","","","","","","",""];
  // Update the progress bar color and width based on the anomaly detection results
  updateProgressBar() {
    this.anomalyDetected.forEach((isAnomaly, index) => {
      if (isAnomaly) {
        this.anomalyDetected2[index] = 'red';
      } else {
        this.anomalyDetected2[index] = 'blue';
      }
    });

    const gradientColors = this.anomalyDetected.join(', ');
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    progressBar.style.backgroundImage = `linear-gradient(to right, ${gradientColors})`;
    progressBar.style.width = `${(this.progress + 1) / this.anomalyDetected.length * 100}%`;
  }
*/
