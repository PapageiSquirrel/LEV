import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BiblioComponent } from './biblio/biblio.component';
import { AuteursComponent } from './auteurs/auteurs.component';
import { OuvragesComponent } from './ouvrages/ouvrages.component';
import { EditionsComponent } from './editions/editions.component';
import { TagsComponent } from './tags/tags.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ForumComponent } from './forum/forum.component';
import { MembresComponent } from './membres/membres.component';
import { MembresConnexionComponent } from './membres/membres-connexion/membres-connexion.component';
import { MembresInscriptionComponent } from './membres/membres-inscription/membres-inscription.component';
import { MembresProfileComponent } from './membres/membres-profile/membres-profile.component';
import { OuvrageDetailComponent } from './ouvrages/ouvrage-detail/ouvrage-detail.component';

import { OuvragesService } from './ouvrages.service';
import { AuteursService } from './auteurs.service';
import { ApiService } from './api.service';

import { Utilisateur } from './membres/utilisateur';

@NgModule({
  declarations: [
    AppComponent,
    BiblioComponent,
    AuteursComponent,
    OuvragesComponent,
    EditionsComponent,
    TagsComponent,
    AccueilComponent,
    ForumComponent,
    MembresComponent,
    MembresConnexionComponent,
    MembresInscriptionComponent,
    MembresProfileComponent,
    OuvrageDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    OuvragesService,
    AuteursService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
