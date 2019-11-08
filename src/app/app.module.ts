import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard';
import { CustomerService } from 'src/services/customer.service';
import { RouletteComponent } from './play/roulette/roulette.component';
import { CustomerDetailsComponent } from './play/customer-details/customer-details.component';
import { LeaderboardComponent } from './play/leaderboard/leaderboard.component';
import { PlayService } from 'src/services/play.service'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LeaderboardService } from 'src/services/leaderboard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PlayComponent,
    RouletteComponent,
    CustomerDetailsComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CustomerService,
    PlayService,
    LeaderboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
