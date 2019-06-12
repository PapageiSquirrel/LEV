import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Utilisateur } from '../../Models/utilisateur';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-membres-connexion',
  templateUrl: './membres-connexion.component.html',
  styleUrls: ['./membres-connexion.component.css'],
  inputs: ['utilisateur'],
  outputs: ['connecte']
})
export class MembresConnexionComponent implements OnInit {
  @Input() utilisateur: Utilisateur;
  @Output() connecte = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }

  verifUser() {
    this.apiService.authUtilisateur(this.utilisateur.pseudo, this.utilisateur.motdepasse).subscribe(res => {
      this.utilisateur = res;
      this.connecte.emit(true);
    });
  }
}
