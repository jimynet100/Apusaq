import { Pipe, PipeTransform } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-torneoa',
  templateUrl: './torneoa.component.html',
})
export class TorneoaComponent {
  //public forecasts: WeatherForecast[];
  public resultado: object;
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/Torneo/TorneosActivos/2').subscribe((result: any[]) => {
      
      var groups = result.reduce(function (obj, item) {
        obj[item.cTorneo] = obj[item.cTorneo] || [];
        obj[item.cTorneo].push(item);
        return obj;
      }, {});
      var myArray = Object.keys(groups).map(function (key) {
        return { torneo: key, categoria: groups[key] };
      });
      this.resultado = myArray;
      console.log(myArray);

    }, error => console.error(error));
  }
}
