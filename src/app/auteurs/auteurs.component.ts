import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { faPlus, faPenNib, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
  prenoms_nom = new FormControl('', Validators.required);

  faPlus = faPlus;
  faPenNib = faPenNib;
  faTimesCircle = faTimesCircle;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (!this.auteurs) {
      this.auteurs = [];
    }
  }

  sauve() {
    let pn = this.prenoms_nom.value;
    if (pn) {
    	let a = new Auteur(pn);
    	this.auteurs.push(a);
      console.log(this.auteurs);
    }
    this.prenoms_nom.setValue('');
  }

  supprimer(index: number) {
  	this.auteurs.splice(index, 1);
  }
}