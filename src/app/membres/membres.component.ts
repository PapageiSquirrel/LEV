import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../Models/utilisateur';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {
  utilisateur: Utilisateur;
  template_selected: string;
  connecte: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.authUtilisateur('','').subscribe(utilisateur => {
      if (utilisateur) {
        this.utilisateur = new Utilisateur(utilisateur);
        if (this.utilisateur.estConnecte()) {
          this.connecte = true;
        } 
      } else {
        // utilisateur créé par défaut si pas en session
        this.utilisateur = new Utilisateur({});
        this.connecte = false
      }
    });
  }

  onConnecte(co: boolean) {
      this.connecte = co;
  }
}
