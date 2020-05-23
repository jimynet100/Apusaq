import { Pipe, PipeTransform } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
})
export class RankingComponent {
  public resultado: object;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/Torneo/Ranking').subscribe((result: any[]) => {

      var groups = result.reduce(function (obj, item) {
        obj[item.Categoria] = obj[item.Categoria] || [];
        obj[item.Categoria].push(item);
        return obj;
      }, {});
      var myArray = Object.keys(groups).map(function (key) {
        return { categoria: key, ranking: groups[key] };
      });
      this.resultado = myArray;
      console.log(myArray);

    }, error => console.error(error));
  }
}

