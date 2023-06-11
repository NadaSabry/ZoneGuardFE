import { Edge, NodePosition } from "@swimlane/ngx-graph";

export class MyEdge implements Edge{
    id?: string | undefined;
    source: string;
    target: string;
    label?: string | undefined;
    data?: any;
    points?: any;
    line?: string | undefined;
    textTransform?: string | undefined;
    textAngle?: number | undefined;
    oldLine?: any;
    oldTextPath?: string | undefined;
    textPath?: string | undefined;
    midPoint?: NodePosition | undefined;
    color?:string | undefined;

    constructor(source: string, target: string, label?: string, data?: any, weight?: number) {
        this.source = source;
        this.target = target;
        this.label = label;
        this.data = data;
      }

}
