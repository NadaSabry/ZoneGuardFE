import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, throwError } from 'rxjs';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericStreetApiService {
  httpOptions;

  constructor(private httpClient:HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //Authorization: 'my-auth-token'
      })
    };
   }
   private setHeaders(key:string,value:string){
    this.httpOptions.headers.set(key,value);
   }
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

  // localhost:300      / streetID
  // environment.APIurl / streetApiRoute
  getAllVideos(ApiRoute:string):Observable<any>{
    return this.httpClient.get<any>(`${Environment.streetAPIurl}/${ApiRoute}`)
    .pipe(
      retry(3)
    )
  }
  AddVideoFirstTime(newObj:any):Observable<any>{
    return this.httpClient.post<any>(`${Environment.streetAPIurl}`,JSON.stringify(newObj),this.httpOptions)
    .pipe(
      retry(3)
    )
  }
}
