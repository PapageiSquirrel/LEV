import { Component, OnInit, Input } from '@angular/core';
import { Utilisateur } from '../utilisateur';
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
	/*
	$scope.verifMdp = function(value) {
		
	};
	
	$scope.createUser = function(user) { 
		if ($scope.verifMdp) {
			$http({
				url: '/data/Utilisateurs/add',
				method: 'POST',
				data: JSON.stringify($scope.utilisateur),
				headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {
				$scope.msg = 'L\'utilisateur a été sauvegardé sur le serveur !';
			}).error(function (data, status, headers, config) {
				$scope.msg = 'L\'utilisateur n\'a pu être sauvegardé sur le serveur !';
				$scope.status = status + ' ' + headers;
			});
			console.log($scope.utilisateur);
		} else {
			$scope.error = "Les deux mots de passe ne sont pas identiques !";
		}
	};*/

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
  		this.apiService.createUtilisateur(this.utilisateur).subscribe(res => this.utilisateur = res);
  	}
  }
}
