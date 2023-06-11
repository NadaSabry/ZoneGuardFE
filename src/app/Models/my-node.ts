import { Node, NodeDimension, NodePosition} from "@swimlane/ngx-graph";

export class MyNode implements Node{
    id: string;
    position?: NodePosition | undefined;
    dimension?: NodeDimension | undefined;
    transform?: string | undefined;
    label?: string | undefined;
    data?: any;
    meta?: any;
    stroke?:any;
    constructor(id: string) {
        this.id = id;
      }
}
