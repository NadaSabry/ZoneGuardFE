import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Environment } from 'src/environments/URL';

@Injectable({
  providedIn: 'root'
})
export class GenericApiService {
  httpOptions :{};

  constructor(private httpClient:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //Authorization: 'my-auth-token'
      }),
    };
   }
   setOptions(_body:any){
    return this.httpOptions = {
      /*
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //Authorization: 'my-auth-token'
      }),*/
      body:_body
    };
   }
/*
   private setHeaders(key:string,value:string){
    this.httpOptions.headers.set(key,value);
   }
*/
   
   private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  // localhost:300/nodes
  // environment.APIurl/ApiRoute
/*
Done:
  add node , delete node , get all nodes
notDone: 
  links
*/

  get(ApiRoute:string, id:string ='' ,ApiRoute2:string = '' ):Observable<any>{
    return this.httpClient.get<any>(`${Environment.graphAPIurl}/${ApiRoute}/${id}/${ApiRoute2}`)
    .pipe(
      retry(3)
    )
  }
  Add(ApiRoute:string, newObj:any):Observable<any>{
    return this.httpClient.post<any>(`${Environment.graphAPIurl}/${ApiRoute}`,JSON.stringify(newObj),this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  Delete(ApiRoute:string, id:any):Observable<any>{
    const options = this.setOptions({id:id});
    //delete not allow body in parameter like edit
    return this.httpClient.delete<any>(`${Environment.graphAPIurl}/${ApiRoute}`,options)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  Edit(ApiRoute:string, editObj:any):Observable<any>{
    const body = {label:editObj.label};
    return this.httpClient.put<any>(`${Environment.graphAPIurl}/${ApiRoute}/${editObj.id}`,body)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  UploadFile(ApiRoute:string,filedata:any,id:string):Observable<any>{
    return this.httpClient.post<any>(`${Environment.graphAPIurl}/${ApiRoute}/${id}`,filedata)
    .pipe(
      catchError(this.handleError)
    );
  }
  GetLinkResultsByLinkId(ApiRoute:string,id:string):Observable<any>{
    return this.httpClient.get<any>(`${Environment.graphAPIurl}/${ApiRoute}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  
}
