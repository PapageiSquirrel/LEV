import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './utilisateur';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {
  utilisateur: Utilisateur;
  template_selected: string;

  constructor() { }

  ngOnInit() {
  	// récupérer l'utilisateur en session

  	// utilisateur créé par défaut si pas en session
  	this.utilisateur = new Utilisateur(0, '', '', '');
  }

}
