import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Edge , Node} from '@swimlane/ngx-graph';
import { GenericApiService } from 'src/app/Services/API/generic-api.service';

@Component({
  selector: 'app-operations-on-the-graph',
  templateUrl: './operations-on-the-graph.component.html',
  styleUrls: ['./operations-on-the-graph.component.scss']
})
export class OperationsOnTheGraphComponent implements OnChanges {

  @Input() choseForm: string = 'close';
  @Input() StreetID!:string;
  @Output() IsChangeEvent = new EventEmitter<void>();
  @Output() IsCloseEvent: EventEmitter<Boolean>;
  name: string = "";
  link: Edge = { source: "source", target: "target" } as Edge;
  node: Node = { id: "123" } as Node;
  addnode: Node = {} as Node;
  nodes: Node[] = [];
  links: Edge[] = [];
  allDependenceLinkID: Edge[] = [];
  constructor(private ApiService: GenericApiService, private cdr: ChangeDetectorRef) {
    this.IsCloseEvent = new EventEmitter<Boolean>(false);
    this.UpdateGraph();
  }
  ngOnChanges(): void
  {
    this.getAllStreets();
  }

  private getAllZones() {
    this.ApiService.get("node").subscribe((node) => {
      this.nodes = node.nodes;
      this.cdr.detectChanges();
    });
  }
  private getAllStreets() {
    this.ApiService.get("link").subscribe((link) => {
      this.links = link.links;
      this.cdr.detectChanges();
    });
  }

  private UpdateGraph() {
    this.getAllZones();
    this.getAllStreets();
  }

  closeForm() {
    this.choseForm = 'close';
    this.IsCloseEvent.emit(true);
  }

  AddZone(){
    this.ApiService.Add("node", this.addnode).subscribe(() => {
      this.IsChangeEvent.emit();
      //to appear in select Delete list
      this.getAllZones();
    });
  }
  AddStreet() {
    this.ApiService.Add("link", this.link).subscribe(() => {
      this.IsChangeEvent.emit();
      this.getAllStreets();
      this.link = { source: "source", target: "target" };
    });
  }
  DeletZone() {
    this.ApiService.Delete('node',this.node.id).subscribe(() => {
      this.IsChangeEvent.emit();
      this.UpdateGraph();
      this.node.id = "123";
    });
    /*
    this.allDependenceLinkID = this.links.filter((edge) => edge.source == this.node.id || edge.target == this.node.id);
    this.allDependenceLinkID.forEach((link) => {
      this.ApiService.Delete("link", link.id).subscribe(() => {
        this.IsChangeEvent.emit();
        this.getAllZones();
      });
    });
    */
  }
  DeletStreet() {
    this.allDependenceLinkID = this.links.filter((edge) => (edge.source == this.link.source && edge.target == this.link.target)
      || (edge.source == this.link.target && edge.target == this.link.source));
    this.allDependenceLinkID.forEach((link) => {
      this.ApiService.Delete("link",link.id).subscribe(() => {
        this.IsChangeEvent.emit();
        this.getAllStreets();
        this.link = { source: "source", target: "target" };
      });
    });
  }
}

