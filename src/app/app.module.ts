import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

import { MatFormFieldModule, MatInputModule, MatTooltipModule, MatSelectModule, MatCheckboxModule, 
  MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatChipsModule, MatButtonToggleModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ConsultOuvrageSerieComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // FONTAWESOME
    FontAwesomeModule,
    // NG2FILEUPLOAD
    FileUploadModule,
    // ANGULAR MATERIAL
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  providers: [
    ApiService,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
