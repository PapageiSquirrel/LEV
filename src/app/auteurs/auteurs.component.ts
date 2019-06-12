import { Component, OnInit, Input } from '@angular/core';

import { Auteur } from '../Models/auteur';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-auteurs',
  templateUrl: './auteurs.component.html',
  styleUrls: ['./auteurs.component.css'],
  inputs: ['auteurs']
})
export class AuteursComponent implements OnInit {
  @Input() auteurs: Auteur[];
  prenoms_nom: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (!this.auteurs) {
      this.auteurs = [];
    }
  }

  sauveAuteur(pn: string) {
  	let a = new Auteur(pn);
  	if (a) this.auteurs.push(a);
  	else {
  		// TODO : Message d'erreur
  	}
  }

  suppAuteur(index: number) {
  	this.auteurs.splice(index, 1);
  }
}