import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Edition } from '../Models/edition';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.css'],
  inputs: ['editMode'],
  outputs: ['sauve']
})
export class EditionsComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() editions: Edition[];
  @Output() sauve = new EventEmitter<boolean>();
  newEdition: Edition;
  faPlus = faPlus;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  	this.newEdition = new Edition('', false);
  }

  marqueCommePossede(edition: Edition) {
  	if (edition) { // vérifier si l'édition est dans la bibliothèque personnel de l'utilisateur courant
  		// ajouter dans la bdd
  		//this.apiService.createObject
  	} else {
  		// supprimer dans la bdd
  	}
  }

  sauver() {
  	this.editions.push(Object.assign({}, this.newEdition));
  	this.newEdition = new Edition('', false);

  	this.sauve.emit(true);
  }

  supprimer(index: number) {
  	this.editions.splice(index, 1);
  }
}
