import { Pipe, PipeTransform } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TorneoService } from '../../services/TorneoServices'
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
})
export class ResultadoComponent {
  //public forecasts: WeatherForecast[];
  public resultado: object;
  saveResForm: FormGroup;
  idpartido: number;
  postData: any;
  errorMessage: any;

  constructor(private builder: FormBuilder,http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _Activatedroute: ActivatedRoute, private _torneoService: TorneoService) {
    http.get(baseUrl + 'api/Torneo/Resu/' + this._Activatedroute.snapshot.queryParams["id"]).subscribe((result: any[]) => {

      
      var groups = result.reduce(function (obj, item) {
        obj[item.nombre] = obj[item.nombre] || [];
        obj[item.nombre].push(item);
        return obj;
      }, {});
      var myArray = Object.keys(groups).map(function (key) {
        return { torneo: key, categoria: groups[key] };
      });
      this.resultado = myArray;
      console.log(myArray);

    }, error => console.error(error));
  }

  guardaResultado(id,p1,p2) {
    this.idpartido = id;
    (<HTMLInputElement>document.getElementById('txtIdPartido')).value = id;
    (<HTMLInputElement>document.getElementById('txtP1')).value = p1;
    (<HTMLInputElement>document.getElementById('txtP2')).value = p2;
    
    console.log(id);

  }

  onPostFormSubmit()
  {

    let postData = {
      'idPartido': this.idpartido,
      'result': (<HTMLInputElement>document.getElementById('txtResultado')).value,
      'ganador': (<HTMLSelectElement>document.getElementById('swin')).value,
      'wo': (<HTMLInputElement>document.getElementById('txtWO')).value,
    };
    console.log(postData);
    
    this._torneoService.updateMatch(postData)
      .subscribe((data) => {
        console.log('actualiza');
        
      }, error => this.errorMessage = error) 
    alert('Actualizado correctamente');
    this._torneoService.getPartidos(this._Activatedroute.snapshot.queryParams["id"]).subscribe((result: any[]) => {
      console.log('actualiza2');

      var groups = result.reduce(function (obj, item) {
        obj[item.nombre] = obj[item.nombre] || [];
        obj[item.nombre].push(item);
        return obj;
      }, {});
      var myArray = Object.keys(groups).map(function (key) {
        return { torneo: key, categoria: groups[key] };
      });
      this.resultado = myArray;
      console.log(myArray);
      console.log('actualiza3');
    }, error => console.error(error));

  }

}
