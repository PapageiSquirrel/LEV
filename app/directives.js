// GENERIQUES
common.directive('selectGrid', function() {
	return {
		restrict: 'E',
		controller: function($scope) {
			
		},
		scope: {
			listItems: '=listItems',
			selectedValue: '=selectedValue'
		},
		templateUrl: './app/templates/selectGrid.tpl'
	}
});

// OUVRAGES
common.directive('afficheOuvrage', function() {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.actionClick = function() {
				if ($scope.action) {
					$scope.action();
				}
			}
		},
		scope: {
			ouvrage: '=ouvrage',
			action: '&onClick'
		},
		templateUrl: './app/templates/ouvrage.tpl'
	}
});

common.directive('ajoutOuvrage', ['dataFactory', function(dataFactory) {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.ouvragesProposes = [];
			dataFactory.getAll("Ouvrages", function(res){
				$scope.listOuvrages = res;
			});
			
			$scope.filtrerOuvragesExistants = function() {
				$scope.ouvragesProposes = [];
				
				if ($scope.ouvrage.Titre) {
					$scope.listOuvrages.find(function(o) {
						if (o.Titre.match($scope.ouvrage.Titre)) {
							$scope.ouvragesProposes.push(o);
						}
					});
				}
			}
			
			$scope.dejaExistant = function(o) {
				$scope.ouvrage = o;
				if (o.genre) {
					$scope.showSG(o.genre);
				}
			}
			
			$scope.showSG = function(genre) {
				$scope.g_selected = genre;
				$scope.ouvrage.Genre = genre;
				
				if($scope.ouvrage.Genre === "Dessin" && $scope.ouvrage.Auteurs.length >= 1 && $scope.ouvrage.Dessinateur === undefined) {
					$scope.ouvrage.Dessinateur = $scope.ouvrage.Auteurs[0];
					$scope.ouvrage.Scenariste = $scope.ouvrage.Auteurs[0];
				}
			}
		},
		scope: {
			ouvrage: '=ouvrage',
			genres: '=genres',
			submit: '&onSubmit'
		},
		templateUrl: './app/templates/ajoutOuvrage.tpl'
	}
}]);

common.directive('selectionOuvrage', function() {
	return {
		restrict: 'E',
		controller: function($scope) {
			
		},
		scope: {
			ouvrage: '=ouvrage',
			genres: '=genres',
			submit: '&onSubmit'
		},
		templateUrl: './app/templates/selectionOuvrage.tpl'
	}
});

common.directive('consultOuvrages', function() {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.onSelection = function(item) {
				$scope.selection()(item);
			}
		},
		scope: {
			ouvrages: '=ouvrages',
			titre: '=titre',
			selection: '&onSelection'
		},
		templateUrl: './app/templates/consultOuvrages.tpl'
	}
});

// AUTEURS
common.directive('ajoutAuteur', ['dataFactory', 'compareArraysFilter', function(dataFactory, compareArraysFilter) {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.auteursProposes = [];
			dataFactory.getAll("Auteurs", function(res){
				$scope.listAuteurs = res;
			});
			
			$scope.filtrerAuteursExistants = function() {
				$scope.auteursProposes = [];
				
				if ($scope.PrenomNom) {
					$scope.listAuteurs.find(function(a) {
						// TODO: Recherche sur les auteurs
						
						if (a.PrenomNom.match($scope.PrenomNom)) {
							$scope.auteursProposes.push(a);
						}
					});
				}
			}
			
			$scope.saveAuteur = function(pn) {
				if (pn) {
					var auteur = {};
					auteur.PrenomNom = pn
					
					var index_sep_pn = pn.lastIndexOf(' ');
					auteur.Nom = pn.substring(index_sep_pn + 1);
					auteur.Prenom = pn.substring(0, index_sep_pn);
					
					// TODO : vérifier que l'auteur n'est pas déjà dans la liste
					$scope.addAuteur(auteur);
				}
			}
			
			$scope.addAuteur = function(auteur) {
				$scope.auteurs.push(auteur);
				
				if($scope.ouvrage.Genre === "Dessin" && $scope.auteurs.length === 1) {
					$scope.ouvrage.Dessinateur = auteur;
					$scope.ouvrage.Scenariste = auteur;
				}
				
				$scope.PrenomNom = '';
				$scope.auteursProposes = [];
			}
			
			$scope.removeAuteur = function(index) {
				var removed_auteur = $scope.auteurs.splice(index, 1)[0];
				
				if($scope.ouvrage.Genre === "Dessin" && $scope.auteurs.length >= 1) {
					if ($scope.ouvrage.Dessinateur.PrenomNom === removed_auteur.PrenomNom) {
						$scope.ouvrage.Dessinateur = $scope.auteurs[0];
					}
					if ($scope.ouvrage.Scenariste.PrenomNom  === removed_auteur.PrenomNom) {
						$scope.ouvrage.Scenariste = $scope.auteurs[0];
					}
				}
			}
		},
		scope: {
			auteurs: '=auteurs',
			ouvrage: '=ouvrage'
		},
		templateUrl: './app/templates/ajoutAuteur.tpl'
	}
}]);


// MEMBRES
common.directive('inscription', function() {
	return {
		restrict: 'E',
		controller: function($scope, $http) {
			$scope.error = "";
			$scope.verif = false;
			
			$scope.verifMdp = function(value) {
				if ($scope.utilisateur.MotDePasse === value) return true;
				else return false;
				
				$scope.verif = true;
			};
			
			$scope.createUser = function(user) { 
				if ($scope.verifMdp) {
					$http({
						url: '/data/add=Utilisateurs',
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
			};
		},
		scope: {
			utilisateur: '=utilisateur',
			close: '&close'
		},
		templateUrl: './app/templates/inscription.tpl'
	}
});

common.directive('connection', function() {
	return {
		restrict: 'E',
		controller: function($scope, $http) {
			$scope.error = "";

			$scope.verifUser = function() {
				if ($scope.utilisateur.Pseudo && $scope.utilisateur.MotDePasse) {
					$http({
						url: '/data/find=Utilisateurs',
						method: 'POST',
						data: JSON.stringify($scope.utilisateur),
						headers: {'Content-Type': 'application/json'}
					}).success(function (data, status, headers, config) {
						if (data) {
							$scope.utilisateur = data;
							$scope.msg = 'Vous êtes connecté !';
							
							//TODO : Mettre en session l'information, puis redirection
						} else {
							$scope.error = 'Nom d\'utilisateur ou mot de passe incorrect !';
						}
						$scope.utilisateur = data;
						$scope.msg = 'Vous êtes connecté !';
					}).error(function (data, status, headers, config) {
						$scope.error = 'Problème de connexion avec le serveur. Veuiller reessayer ulterieurement.';
						$scope.status = status + ' ' + headers;
					});
				}
			}
		},
		scope: {
			utilisateur: '=utilisateur',
			close: '&close'
		},
		templateUrl: './app/templates/connection.tpl'
	}
});

/*
common.directive('modalDialog', function() {
	return {
		restrict: 'E',
		scope: {
		  show: '=show'
		},
		replace: true, // Replace with the template below
		transclude: true, // we want to insert custom content inside the directive
		link: function(scope, element, attrs) {
			scope.dialogStyle = {};
			if (attrs.width)
				scope.dialogStyle.width = attrs.width;
			if (attrs.height)
				scope.dialogStyle.height = attrs.height;
			scope.hideModal = function() {
				scope.show = false;
			};
		},
		template: './app/templates/modalWindow.tpl'
	};
});
*/