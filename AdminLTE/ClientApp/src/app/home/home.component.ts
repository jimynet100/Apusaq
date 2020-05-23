import { Pipe, PipeTransform } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public resultadoC: object;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/Torneo/UltimosPartidos').subscribe((result: any[]) => {
           
      this.resultadoC = result;
      console.log(result);

    }, error => console.error(error));
  }
}

