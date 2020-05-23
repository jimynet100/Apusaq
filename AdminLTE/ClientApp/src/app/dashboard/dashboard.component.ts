import { Component, Inject, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import { ErrorHandleService } from './../shared/services/error-handle.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})

@Pipe({ name: 'round' })

export class DashboardComponent {
    //public forecasts: WeatherForecast[];
    public resultado: object;
    public cantidad: number;
    public avance: number;
    public nombre: string;
    public passrate: number;
    public pendiente: number;
    public error: number;
    public hallazgo: object;

    constructor(private http: HttpClient,
        //private errorHandleService: ErrorHandleService,
        private _Activatedroute: ActivatedRoute,
        @Inject('BASE_URL') baseUrl: string) {
        const uri = decodeURIComponent(
            '/api/util/GetQuery?id=10'
        );

        this.http.get<any[]>('/api/util/GetQuery?id=10&param=' + this._Activatedroute.snapshot.queryParams["id"]).subscribe((result: any[]) => {

            var groups = result.reduce(function (obj, item) {
                obj[item.Tipo_Escenario] = obj[item.Tipo_Escenario] || [];
                obj[item.Tipo_Escenario].push(item);
                return obj;
            }, {});
            var myArray = Object.keys(groups).map(function (key) {
                return { torneo: key, requerimientos: groups[key] };
            });
            this.resultado = myArray;
            console.log(myArray);

            let counters = result.reduce((p, n) => {
                if (p[n.llave]) { p[n.llave] += n.Q; }
                else { p[n.llave] = n.Q; }
                return p;
            }, []);

            this.nombre = result[0].llave;
            console.log(this.nombre);
            this.cantidad = result.reduce((acc, val) => acc += val.Q, 0);

            this.pendiente = result.reduce((acc, val) => acc += val.Pendiente, 0);

            this.error = result.reduce((acc, val) => acc += val.Errores, 0);

            this.avance = 100 * (this.cantidad - this.pendiente) / this.cantidad;

            this.passrate = 100 * (this.cantidad - this.pendiente - this.error) / (this.cantidad - this.pendiente);



        }, error => console.error(error));



        this.http.get<any[]>('/api/util/GetQuery?id=11&param=' + this._Activatedroute.snapshot.queryParams["id"]).subscribe((result: any[]) => {

            this.hallazgo = result;
            console.log(this.hallazgo);

        }, error => console.error(error));
    }

}
