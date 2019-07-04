import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

//import { MatTooltipModule } from '@angular/material/tooltip';

// FONT AWESOME (ICONS)
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

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

import { BiblioComponent } from './biblio/biblio.component';
import { OuvrageDetailComponent } from './ouvrages/ouvrage-detail/ouvrage-detail.component';
import { AjoutOuvrageSerieComponent } from './biblio/ajout-ouvrage-serie/ajout-ouvrage-serie.component';
import { SelectionOuvrageSerieComponent } from './biblio/selection-ouvrage-serie/selection-ouvrage-serie.component';
import { ConsultOuvrageSerieComponent } from './biblio/consult-ouvrage-serie/consult-ouvrage-serie.component';

//import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';

import { Utilisateur } from './Models/utilisateur';
import { AjoutAuteurComponent } from './ajout-auteur/ajout-auteur.component';
/*
import { AjoutOuvrageComponent } from './ajout-ouvrage/ajout-ouvrage.component';
import { SelectionOuvrageComponent } from './selection-ouvrage/selection-ouvrage.component';
import { ConsultOuvrageComponent } from './consult-ouvrage/consult-ouvrage.component';
*/

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
    OuvrageDetailComponent,
    AjoutOuvrageSerieComponent,
    SelectionOuvrageSerieComponent,
    ConsultOuvrageSerieComponent,
    AjoutAuteurComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FileUploadModule
    //MatTooltipModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
