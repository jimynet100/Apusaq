import { Pipe, PipeTransform } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TorneoService } from '../../services/TorneoServices'
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

declare function checkedAppend(rawHtml, appendTo): any;

@Component({
  selector: 'app-cuadro',
  templateUrl: './cuadro.component.html',
  styleUrls: ['./cuadro.component.css'],
  providers: [TorneoService // added class in the providers
  ]
})
export class CuadroComponent {

  public resultadoR: object;
  public resultadoC: object;
  public resultado: object;
  public cuadros: number;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _Activatedroute: ActivatedRoute, private _torneoService: TorneoService) {
    http.get(baseUrl + 'api/Torneo/cuadro/' + this._Activatedroute.snapshot.queryParams["id"]).subscribe((result: any[]) => {

      this.cuadros = result.length;
      const myArrayR = Array.from(new Set(result.map(s => s.ronda)))
        .map(ronda => {
          return {
            ronda: ronda, name: result.find(s => s.ronda === ronda).nombre
          };
        });

      var groupsR = myArrayR.reduce(function (obj, item) {
        obj[item.name] = obj[item.name] || [];
        obj[item.name].push(item);
        return obj;
      }, {});
      var myArrayH = Object.keys(groupsR).map(function (key) {
        return { torneo: key, matches: groupsR[key] };
      });

      this.resultadoR = myArrayH;

      var groups = result.reduce(function (obj, item) {
        obj[item.ronda] = obj[item.ronda] || [];
        obj[item.ronda].push(item);
        return obj;
      }, {});
      var myArray = Object.keys(groups).map(function (key) {
        return { Rounds: key, matches: groups[key] };
      });
      this.resultado = myArray;
      console.log(this.resultado);
      this.CargarCruces(1);

    }, error => console.error(error));
  }

  CargarCruces(cuadro) {
    cuadro = cuadro - 1;
    //var base = document.getElementById('writeHere');
    var base = document.querySelector("div.col-xs-12.col-sm-12.table-responsive div[id='writeHere']");
    var numTeams = (this.cuadros + 1)/ Math.pow(2, cuadro);
    var matchesByRound = this.setupMatchboxes(numTeams);
    var matchDivsByRound = [];
    var matchDiv;

    base.innerHTML = "";

    for (var lvl = 0; lvl < matchesByRound.length; lvl++) {
      var matchBoxes = matchesByRound[lvl];
        var bracket = checkedAppend('<div class="bracket" _ngcontent-ng-cli-universal-c0=""> Ronda ' + this.fmtName(this.resultado[lvl + cuadro].Rounds) + '</div>', base);

      //var bracket = checkedAppend('<div class="bracket" _ngcontent-c2=""> <a (click) = "CargarCruces(1)" >' + this.fmtName(this.resultado[lvl].Rounds) + '</a></div>', base);

      var matchDivs = [];
      matchDivsByRound.push(matchDivs);

      for (var i = 0; i < matchBoxes.length; i++) {
        var vOffset = checkedAppend('<div></div>', bracket);
        
        var match = this.resultado[lvl + cuadro].matches[i];
          var matchWO = ("" == this.fmtName(match.resultado)) ? '<div class="spacer" _ngcontent-ng-cli-universal-c0=""><div class="spaceri" _ngcontent-ng-cli-universal-c0="" ><span>' + this.fmtName(match.resultado) + "</span></div></div>" : '<div class="spacer" _ngcontent-ng-cli-universal-c0=""><div class="spaceri" _ngcontent-ng-cli-universal-c0="" data-toggle="modal" data-target="#primaryModal" onclick = "document.getElementById(\'ckh2h\').value = \'' + this.fmtName(match.P1id) + "_" + this.fmtName(match.P2id) + "'; document.getElementById('ckh2h').click();\" ><span>" + this.fmtName(match.resultado) + "</span></div></div>";
          var matchHtml = '<div class="match" id="match' + match.P1id + '" _ngcontent-ng-cli-universal-c0="">'
              + '<div class="p1" _ngcontent-ng-cli-universal-c0="" data-toggle="modal" data-target="#infoModal" onclick = "document.getElementById(\'ckh2h\').value = ' + this.fmtName(match.P1id) + '; document.getElementById(\'ckh2h\').click();" >' + this.fmtName(match.P1) + '</div>'
          + matchWO
              + '<div class="p2" _ngcontent-ng-cli-universal-c0="" data-toggle="modal" data-target="#infoModal" onclick = "document.getElementById(\'ckh2h\').value = ' + this.fmtName(match.P2id) + '; document.getElementById(\'ckh2h\').click();" >' + this.fmtName(match.P2) + '</div>';

        matchDiv = checkedAppend(matchHtml, bracket);
        matchDivs.push(matchDiv);
        
        if (lvl > 0) {
          //row 2+; line up with previous row
          var alignTo = matchDivsByRound[lvl - 1][i * 2];
          //offset to line up tops
          var desiredOffset = alignTo.position().top - matchDiv.position().top;

          //offset by half the previous match-height
          desiredOffset += alignTo.height() / 2;
          vOffset.height(desiredOffset);
        } else {
            checkedAppend('<div class="small-spacer" _ngcontent-ng-cli-universal-c0=""></div>', bracket);
        }

        if (lvl > 0) {
          //tweak our size so we stretch to the middle of the appropriate element
          var stretchTo = matchDivsByRound[lvl - 1][i * 2 + 1];
          var newH = stretchTo.position().top + stretchTo.height() / 2 - matchDiv.position().top;
          var deltaH = newH - matchDiv.height();
          matchDiv.height(newH);
          var spacer = matchDiv.find('.spacer');
          spacer.height(spacer.height() + deltaH);
        }
      }
    }

  }

  fmtName(name) {
    return null != name ? name : '?';
  }

  setupMatchboxes(numTeams) {
    var numLevels = Math.log(numTeams) / Math.LN2;
    var numMatchesForLevel = numTeams / 2;
    var matchBoxes = [];

    do {
      var matchesForLevel = [];
      matchBoxes.push(matchesForLevel);

      for (var match = 0; match < numMatchesForLevel; match++) {
        matchesForLevel.push(match);
      }

      numMatchesForLevel = numMatchesForLevel / 2;
    } while (numMatchesForLevel >= 1);
    return matchBoxes;
  }

  cargaH2H(id) {
    var inputValue = (<HTMLInputElement>document.getElementById('ckh2h')).value;

    this._torneoService.getH2H(inputValue).subscribe(
      data => this.resultadoC = data
    )
    
  }


}

