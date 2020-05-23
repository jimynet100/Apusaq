import { Pipe, PipeTransform } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-h2h',
  templateUrl: './h2h.component.html',
})
export class H2HComponent {
  //public forecasts: WeatherForecast[];
  public resultado: object;
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/Torneo/TorneosActivos').subscribe((result: any[]) => {
      
      console.log(result);

    }, error => console.error(error));
  }
}
