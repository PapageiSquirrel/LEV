import { Component, OnInit, Input } from '@angular/core';
import { Utilisateur } from '../utilisateur';

@Component({
  selector: 'app-membres-connexion',
  templateUrl: './membres-connexion.component.html',
  styleUrls: ['./membres-connexion.component.css'],
  inputs: ['utilisateur']
})
export class MembresConnexionComponent implements OnInit {
  @Input() utilisateur: Utilisateur;
  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  	this.submitted = true;
  }

  verifUser() {
  	// requete HTTP
  }
}
