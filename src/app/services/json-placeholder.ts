import {Injectable } from '@angular/core';
import {Http, Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FakeService{
    public url:string ; 
    public post;
    

    constructor(private _http:Http){
       this.url= 'https://jsonplaceholder.typicode.com';
       console.log('Hello RestServiceProvider Provider');

    
    }

    getPost(){
        return new Promise(resolve => {
            this._http.get(this.url+'/posts').subscribe(data => {
              resolve(data);
            }, err => {
              console.log(err);
            });
          });
        
        
    }

    getUsers(){
      return new Promise(resolve =>{
        this._http.get(this.url+'/users').subscribe(data => {
          resolve(data);
        }, err=>{
          console.log(err);
        }
      );
      });

    }
}