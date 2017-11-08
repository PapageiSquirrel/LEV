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
		templateUrl: './app/templates/util/selectGrid.tpl'
	}
});

common.directive('ajout', ['dataFactory', 'fileUploader', function(dataFactory, fileUploader) {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.$watch(
				function() { 
					if ($scope.item) return $scope.item.Genre; 
					else return null; 
				}, function(newValue, oldValue) {
					if (newValue !== oldValue) {
						$scope.showSG(newValue);
					}
				}
			);
			
			$scope.labelMode = function() {
				if ($scope.item && $scope.item._id) {
					return "Modifier un " + $scope.colItem;
				} else {
					return "Ajouter un " + $scope.colItem;
				}
			}
			
			$scope.itemsProposes = [];
			dataFactory.getAll($scope.colItem, function(res){
				$scope.listItems = res;
			});
			
			$scope.filtrerItemsExistants = function() {
				$scope.itemsProposes = [];
				
				if ($scope.ouvrage.Titre) {
					$scope.listItems.find(function(i) {
						if (i.Titre.match($scope.item.Titre)) {
							$scope.itemsProposes.push(i);
						}
					});
				}
			}
			
			$scope.dejaExistant = function(i) {
				$scope.item = angular.copy(i);
			}
			
			$scope.showSG = function(genre) {
				$scope.g_selected = genre;
				$scope.item.Genre = genre;
				
				if($scope.item.Genre === "Dessin" && $scope.item.Auteurs.length >= 1 && $scope.item.Dessinateur === undefined) {
					$scope.item.Dessinateur = $scope.item.Auteurs[0];
					$scope.item.Scenariste = $scope.item.Auteurs[0];
				}
			}
			
			$scope.uploadCouverture = function(){
				var file = $scope.fileSelected;
				var uploadUrl = "/file/couverture";
				if (colItem == 'Ouvrages') {
					fileUploader.uploadFileToUrl(file, uploadUrl, function(filename) {
						$scope.item.Couverture = filename;
					});
				}
			}
		},
		scope: {
			colItem: '=colItem',
			item: '=item',
			genres: '=genres',
			submit: '&onSubmit'
		},
		templateUrl: './app/templates/biblio/ajout.tpl'
	}
}]);


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
		templateUrl: './app/templates/biblio/ouvrage.tpl'
	}
});

common.directive('ajoutOuvrage', ['dataFactory', 'fileUploader', function(dataFactory, fileUploader) {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.$watch(
				function() { 
					if ($scope.ouvrage) return $scope.ouvrage.Genre; 
					else return null; 
				}, function(newValue, oldValue) {
					if (newValue !== oldValue) {
						$scope.showSG(newValue);
					}
				}
			);
			
			$scope.labelMode = function() {
				if ($scope.ouvrage && $scope.ouvrage._id) {
					return "Modifier un ouvrage";
				} else {
					return "Ajouter un ouvrage";
				}
			}
			
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
				$scope.ouvrage = angular.copy(o);
			}
			
			$scope.showSG = function(genre) {
				$scope.g_selected = genre;
				$scope.ouvrage.Genre = genre;
				
				if($scope.ouvrage.Genre === "Dessin" && $scope.ouvrage.Auteurs.length >= 1 && $scope.ouvrage.Dessinateur === undefined) {
					$scope.ouvrage.Dessinateur = $scope.ouvrage.Auteurs[0];
					$scope.ouvrage.Scenariste = $scope.ouvrage.Auteurs[0];
				}
			}
			
			$scope.uploadCouverture = function(){
				var file = $scope.fileSelected;
				var uploadUrl = "/file/couverture";
				fileUploader.uploadFileToUrl(file, uploadUrl, function(filename) {
					$scope.ouvrage.Couverture = filename;
				});
			}
		},
		scope: {
			ouvrage: '=ouvrage',
			genres: '=genres',
			submit: '&onSubmit'
		},
		templateUrl: './app/templates/biblio/ajoutOuvrage.tpl'
	}
}]);

common.directive('selectionOuvrage', [ 'auth', function(auth) {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.showEditions = false;
			$scope.msgEditions = "Voir les Editions";
			$scope.imgSrc = "images/Toggle.png";
			
			$scope.showOrHide = function() {
				$scope.showEditions = !$scope.showEditions;
				if (!$scope.showEditions) {
					$scope.msgEditions = "Voir les Editions";
					$scope.imgSrc = "images/Toggle.png";
				} else {
					$scope.msgEditions = "Cacher les Editions";
					$scope.imgSrc = "images/Detoggle.png";
				}
			}
			
			$scope.markAsPossessed = function(index) {
				auth.updateBiblio({ 'index': index, 'Nb': 1 }, $scope.ouvrage._id);
			}
			
			$scope.markAsRead = function(id) {
				if (id) {
					auth.updateBiblio({ '_id': id, 'Lu': true, 'Possede': [] });
				}
			}
		},
		scope: {
			ouvrage: '=ouvrage',
			genres: '=genres',
			modifier: '&onModifier'
		},
		templateUrl: './app/templates/biblio/selectionOuvrage.tpl'
	}
}]);

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
			selection: '&onSelection',
		},
		templateUrl: './app/templates/biblio/consultOuvrages.tpl'
	}
});

// SERIES
common.directive('ajoutSerie', ['dataFactory', 'fileUploader', function(dataFactory, fileUploader) {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.$watch(
				function() { 
					if ($scope.serie) return $scope.serie.Genre; 
					else return null; 
				}, function(newValue, oldValue) {
					if (newValue !== oldValue) {
						$scope.showSG(newValue);
					}
				}
			);
			
			$scope.labelMode = function() {
				if ($scope.serie && $scope.serie._id) {
					return "Modifier une série";
				} else {
					return "Ajouter une série";
				}
			}
			
			$scope.seriesProposes = [];
			dataFactory.getAll("Series", function(res){
				$scope.listSeries = res;
			});
			
			$scope.filtrerSeriesExistantes = function() {
				$scope.seriesProposes = [];
				
				if ($scope.serie.Titre) {
					$scope.listSeries.find(function(s) {
						if (s.Titre.match($scope.serie.Titre)) {
							$scope.seriesProposes.push(s);
						}
					});
				}
			}
			
			$scope.dejaExistant = function(s) {
				$scope.serie = angular.copy(s);
			}
			
			$scope.showSG = function(genre) {
				$scope.g_selected = genre;
				$scope.serie.Genre = genre;
				
				if($scope.serie.Genre === "Dessin" && $scope.serie.Auteurs.length >= 1 && $scope.serie.Dessinateur === undefined) {
					$scope.serie.Dessinateur = $scope.serie.Auteurs[0];
					$scope.serie.Scenariste = $scope.serie.Auteurs[0];
				}
			}
		},
		scope: {
			serie: '=serie',
			genres: '=genres',
			submit: '&onSubmit'
		},
		templateUrl: './app/templates/biblio/ajoutSerie.tpl'
	}
}]);

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
				
				if ($scope.ouvrage) {
					if($scope.ouvrage.Genre === "Dessin" && $scope.auteurs.length >= 1) {
						if ($scope.ouvrage.Dessinateur.PrenomNom === removed_auteur.PrenomNom) {
							$scope.ouvrage.Dessinateur = $scope.auteurs[0];
						}
						if ($scope.ouvrage.Scenariste.PrenomNom  === removed_auteur.PrenomNom) {
							$scope.ouvrage.Scenariste = $scope.auteurs[0];
						}
					}
				}	
			}
		},
		scope: {
			auteurs: '=auteurs',
			ouvrage: '=ouvrage',
			serie: '=serie'
		},
		templateUrl: './app/templates/biblio/ajoutAuteur.tpl'
	}
}]);

// EDITIONS
common.directive('ajoutEdition', function() {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.ajoutEnCours = false;
			
			$scope.ajout = function() {
				$scope.newEdition = { Editeur: '', DateParution: '', Poche: false, NbExemplaires: 1, InfosComp: '' };
				$scope.ajoutEnCours = true;
			}
			
			$scope.sauver = function() {
				$scope.editions.push(angular.copy($scope.newEdition));
				$scope.ajoutEnCours = false;
			}
		},
		scope: {
			editions: '=editions',
			col: '=collection'
		},
		templateUrl: './app/templates/biblio/ajoutEdition.tpl'
	}
});


// MEMBRES
common.directive('inscription', ['auth', function(auth) {
	return {
		restrict: 'E',
		controller: function($scope, $http, auth) {
			$scope.error = "";
			$scope.verif = false; 
			$scope.utilisateur = {};
			
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
			close: '&close'
		},
		templateUrl: './app/templates/membres/inscription.tpl'
	}
}]);

common.directive('connection', ['auth', function(auth) {
	return {
		restrict: 'E',
		controller: function($scope, $http, auth) {
			$scope.error = "";
			$scope.utilisateur = {};

			$scope.verifUser = function() {
				if ($scope.utilisateur.Pseudo && $scope.utilisateur.MotDePasse) {
					$http({
						url: '/data/find=Utilisateurs',
						method: 'POST',
						data: JSON.stringify($scope.utilisateur),
						headers: {'Content-Type': 'application/json'}
					}).success(function (data, status, headers, config) {
						if (data) {
							auth.setUser(data);
							$scope.msg = 'Vous êtes connecté !';
							
							$scope.connect();
						} else {
							$scope.error = 'Nom d\'utilisateur ou mot de passe incorrect !';
						}
					}).error(function (data, status, headers, config) {
						$scope.error = 'Problème de connexion avec le serveur. Veuiller reessayer ulterieurement.';
						$scope.status = status + ' ' + headers;
					});
				}
			}
		},
		scope: {
			close: '&close',
			connect: '&onConnect'
		},
		templateUrl: './app/templates/membres/connection.tpl'
	}
}]);

common.directive('membresAuthentifie', ['auth', 'fileUploader', 'dataFactory', function(auth, fileUploader, dataFactory) {
	return {
		restrict: 'E',
		controller: function($scope) {
			if (auth.isConnected()) {
				dataFactory.getItemByParam("Utilisateurs", { 'Pseudo' : auth.getUser() }, function(res){
					$scope.utilisateur = res;
				});
			}
			
			$scope.uploadProfil = function() {
				var file = $scope.fileSelected;
				var uploadUrl = "/file/profil";
				fileUploader.uploadFileToUrl(file, uploadUrl, function(filename) {
					$scope.utilisateur.ImgProfil = filename;
				});
			}
			
			$scope.verifNewMdp = function(newMdp, verifMdp) {
				if (newMdp == verifMdp) {
					// TODO : changer le mot de passe
					dataFactory.update("Utilisateurs", {'MotDePasse': newMdp}, function() {
						
					});
				}
			}
		},
		scope: {
			
		},
		templateUrl: './app/templates/membres/membresAuthentifie.tpl'
	}
}]);


// DIRECTIVES POUR UPLOAD
common.directive('fileModel', ['$parse', function ($parse) {
	return {
	   restrict: 'A',
	   link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
	    }
	};
}]);

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