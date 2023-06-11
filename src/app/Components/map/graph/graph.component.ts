import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MyNode } from 'src/app/Models/my-node';
import { MyEdge } from 'src/app/Models/my-edge';
import { GenericApiService } from 'src/app/Services/API/generic-api.service';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnChanges, OnInit {
  @Output() showStreetDetails = new EventEmitter<MyEdge>();
  @Output() FormNumberEvent = new EventEmitter<string>(false);
  @Input() IsChangeGraph = false;
  @Input() IsCloseSidebar = false;
  //color:string="white";
  them: string = "";
  //FormNumber: string = 'close';
  nodes: MyNode[] = [];
  links: MyEdge[] = [];
  /* {
    id: "6459e1d7ffe8d63c167e3b28",
    label: "TEST STREET",
    source: "6452c3942bcffb9a30ba6995",
    target: "645974fe6e58ed402da35530"
  },
  {
    id: "c6459e2a2ffe8d63c167e3b32",
    label: "TEST STREET",
    source: "645666b0cad50c200f168473",
    target: "645972fd698116f8dd98b970"
  }
  ];
  */
  oldlinkclick!: MyEdge;

  newlink!: MyEdge;
  clickNode: MyNode[] = [];
  testMarwanApiNode:MyEdge[]=[];


/*
in html put this        [layoutSettings]="layoutSettings" 
  layoutSettings = {
    nodeSpacing: 50,
    edgeSpacing: 10,
    rankSpacing: 50,
    rankDir: 'TB'
  };
  */

  constructor(private cdr: ChangeDetectorRef,
    private ApiService: GenericApiService, private themeService: ThemeService) {
  }

  private getAllNodes() {
    this.ApiService.get("node").subscribe((node) =>{
      this.nodes = node.nodes;
      console.log('node = ',this.nodes);
    });
  }
  private getAllLinks() {
    this.ApiService.get("link").subscribe((link) => {
      this.links = link.links;
      this.links.forEach(edge=>{
         edge.id="a"+edge.id;
      });
      console.log('link = ',this.links);
    });
  }

  UpdateGraph() {
    //this.FormNumber = 'close';
    this.getAllNodes();
    this.getAllLinks();
    this.cdr.detectChanges();
  }

  ngOnInit(): void {

    this.UpdateGraph();
  /*
    this.ApiService.getAll2('link').subscribe(
      data=>{
        this.testMarwanApiNode=data.links;
        console.log('node= ', this.testMarwanApiNode[0]);
        console.log('node id = ', this.testMarwanApiNode[0].source);
        console.log('node label= ', this.testMarwanApiNode[0].label);
      },
      error=>{
       console.log('error ',error);
      }
      ); 
   */      
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('IsCloseSidebar' in changes) {
      console.log("change_graph");
      if (this.oldlinkclick != undefined) {
        this.oldlinkclick.color = '#ffcf35';
      }
    }
    else {
      this.UpdateGraph();
    }
  }
  onLinkClick(link: MyEdge) {
    if (link != this.oldlinkclick || this.oldlinkclick.color !='gray') {
      if (this.oldlinkclick != undefined) {
        this.oldlinkclick.color = '#ffcf35';
      }
      link.color = 'gray';
      this.oldlinkclick = link;
      //  copy is reference
      //const tmplink=link;
      this.showStreetDetails.emit(link);
    }
  }
  private AddLink(link: MyEdge) {
    this.ApiService.Add("link", link).subscribe(() => {
      this.UpdateGraph();
    });
  }
  onNodeClick(node: any) {
    node.stroke = 'red';
    if (this.clickNode.length == 0) {
      this.clickNode.push(node);
    }
    else if (node.id != this.clickNode[0].id) {
      this.newlink = {
        source: node.id,
        target: this.clickNode[0].id,
        label: 'new street'
      }
       this.clickNode[0].stroke = '#ffcf35';
      node.stroke = '#ffcf35';
      this.clickNode.pop();
      console.log(node.id);
      this.AddLink(this.newlink);
    }
    else {
      node.stroke = '#ffcf35';
      this.clickNode.pop();
    }
  }
  /*
  this.themeService.mode$.subscribe(res=> {
    if(res=="dark"){
      this.color="white";
    }
    else {
      this.color="black";
    }
});
*/

  /*
  ngOnChanges(): void {
    this.getAllProd();
  }
*/

  /*
    change(newlink: Edge[]) {
      console.log(newlink);
      this.links = newlink;
      this.cdr.detectChanges();
    }
  
  
    private AddLink(obj:Edge){
      this.ApiService.Add("links",obj).subscribe(()=>{
        this.getAllProd();
        this.cdr.detectChanges();
      });
    }
  */
}
