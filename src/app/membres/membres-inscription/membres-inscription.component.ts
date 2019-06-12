import { Component, OnInit, Input } from '@angular/core';
import { Utilisateur } from '../../Models/utilisateur';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-membres-inscription',
  templateUrl: './membres-inscription.component.html',
  styleUrls: ['./membres-inscription.component.css'],
  inputs: ['utilisateur']
})
export class MembresInscriptionComponent implements OnInit {
  @Input() utilisateur: Utilisateur;
  msg_erreur: string;
  verif = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  	
  }

  verifUtilisateur(): boolean {
  	// requete http qui vérifie si le nom d'utilisateur est déjà pris
  	return true;
  }

  verifMdp(mdp, verif_mdp) {
  	if (mdp === verif_mdp) this.verif = true;
	else this.verif = false;
  }

  createUser() {
  	if (this.verif) {
  		this.apiService.createObject<Utilisateur>(this.utilisateur, 'utilisateurs').subscribe(res => this.utilisateur = res);
  	}
  }
}
