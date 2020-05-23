import { Injectable, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Headers, Http, Response, HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Pipe, PipeTransform } from '@angular/core';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TorneoService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;    
  }

  getH2H(p1) {

    return this._http.get(this.myAppUrl + 'api/Torneo/H2H/' + p1).catch(this.errorHandler);

    //return this._http.get(this.myAppUrl + 'api/Torneo/H2H/' + p1).subscribe();      

  }

  getPartidos(p1) {

    return this._http.get(this.myAppUrl + 'api/Torneo/Resu/' + p1).catch(this.errorHandler);
    
  }

  updateMatch(match) {
    return this._http.put(this.myAppUrl + 'api/Torneo/Resultado/save', match)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  saveMatch(p1) {

    return this._http.get(this.myAppUrl + 'api/Torneo/H2H/' + p1).catch(this.errorHandler);

    //return this._http.get(this.myAppUrl + 'api/Torneo/H2H/' + p1).subscribe();      

  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
