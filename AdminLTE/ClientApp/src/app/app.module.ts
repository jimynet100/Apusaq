import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TorneoService } from '../services/TorneoServices';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { H2HComponent } from './h2h/h2h.component';
import { FooterComponent } from './footer/footer.component';
import { TorneoComponent } from './torneo/torneo.component';
import { RankingComponent } from './ranking/ranking.component';
import { TorneoaComponent } from './torneoa/torneoa.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { CuadroComponent } from './cuadro/cuadro.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsideComponent } from './aside/aside.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
        HomeComponent,
        HeaderComponent,
        H2HComponent,
        FooterComponent,
        ContentComponent,
        TorneoComponent,
        TorneoaComponent,
        RankingComponent,
        CuadroComponent,
        ResultadoComponent,
        AsideComponent,
        DashboardComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'counter', component: CounterComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'torneo', component: TorneoComponent },
        { path: 'resultado', component: ResultadoComponent },
        { path: 'torneoa', component: TorneoaComponent },
        { path: 'ranking', component: RankingComponent },
        { path: 'cuadro', component: CuadroComponent },
        { path: 'h2h', component: H2HComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [TorneoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
