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

common.directive('ajoutOS', ['dataFactory', 'fileUploader', function(dataFactory, fileUploader) {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.uploadUrl = "/file/couverture";
			
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
			
			$scope.$watch(
				function() {
					return $scope.colItem;
				}, function() {
					dataFactory.getAll($scope.colItem, function(res){
						$scope.listItems = res;
					});
				}
			);
			
			$scope.$on('upload', function(event, data) {
				if (data) $scope.item.Couverture = data;
			});
			
			$scope.labelMode = function() {
				if ($scope.item && $scope.item._id) {
					if ($scope.colItem == "Ouvrages") {
						return "Modifier un Ouvrage";
					} else if ($scope.colItem == "Series") {
						return "Modifier une Série";
					}
				} else {
					if ($scope.colItem == "Ouvrages") {
						return "Ajouter un Ouvrage";
					} else if ($scope.colItem == "Series") {
						return "Ajouter une Série";
					}
				}
			}
			
			$scope.itemsProposes = [];
			
			$scope.filtrerItemsExistants = function() {
				$scope.itemsProposes = [];
				
				if ($scope.item.Titre) {
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
				
				if (genre) {
					var sg = $scope.genres.find(function(g) {
						return g.genre === genre;
					});

					$scope.item.SousGenre = sg.sousGenres[0];
				}
				
				if($scope.item.Genre === "Dessin" && $scope.item.Auteurs.length >= 1 && $scope.item.Dessinateur === undefined) {
					$scope.item.Dessinateur = $scope.item.Auteurs[0];
					$scope.item.Scenariste = $scope.item.Auteurs[0];
				}
			}
		},
		scope: {
			colItem: '=colItem',
			item: '=item',
			genres: '=genres',
			submit: '&onSubmit'
		},
		templateUrl: './app/templates/biblio/ajoutOuvrageSerie.tpl'
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
				auth.updateBiblio({ 'index': index, 'Nb': 1 }, $scope.item._id);
			}
			
			$scope.markAsRead = function(id) {
				var bool = auth.isRead(id);

				if (id) {
					auth.updateBiblio({ '_id': id, 'Lu': !bool, 'Possede': [] });
				}
				
				isRead();
			}
			
			var isRead = function() {
				if ($scope.item && auth.isRead($scope.item._id)) {
					$scope.read = "Lu";
					$scope.readStyle = {'background-color' : '#008000'};
					return true;
				} else {
					$scope.read = "Non Lu";
					$scope.readStyle = {'background-color' : '#778899'};
					return false;
				}
			}
			
			$scope.$watch(function () { return $scope.item }, isRead);
		},
		scope: {
			item: '=item',
			genres: '=genres',
			modifier: '&onModifier',
			colItem: '=colItem'
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
			series: '=series',
			ouvrages: '=ouvrages',
			titre: '=titre',
			selection: '&onSelection',
		},
		templateUrl: './app/templates/biblio/consultOuvrages.tpl'
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
				
				if($scope.item.Genre === "Dessin" && $scope.auteurs.length === 1) {
					$scope.item.Dessinateur = auteur;
					$scope.item.Scenariste = auteur;
				}
				
				$scope.PrenomNom = '';
				$scope.auteursProposes = [];
			}
			
			$scope.removeAuteur = function(index) {
				var removed_auteur = $scope.auteurs.splice(index, 1)[0];
				
				if ($scope.item) {
					if($scope.item.Genre === "Dessin" && $scope.auteurs.length >= 1) {
						if ($scope.item.Dessinateur.PrenomNom === removed_auteur.PrenomNom) {
							$scope.item.Dessinateur = $scope.auteurs[0];
						}
						if ($scope.item.Scenariste.PrenomNom  === removed_auteur.PrenomNom) {
							$scope.item.Scenariste = $scope.auteurs[0];
						}
					}
				}	
			}
		},
		scope: {
			auteurs: '=auteurs',
			item: '=item',
			type: '=type'
		},
		templateUrl: './app/templates/biblio/ajoutAuteur.tpl'
	}
}]);

common.directive('ajoutTA', ['dataFactory', 'compareArraysFilter', function(dataFactory, compareArraysFilter) {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.itemsProposes = [];
			dataFactory.getAll($scope.itemCol, function(res){
				$scope.listItems = res;
			});
			
			$scope.labelMode = function() {
				if ($scope.itemCol == "Tags") {
					return "Mot(s)-clé(s) :";
				} else {
					return "Auteur(s) :";
				}
			}
			
			$scope.filtrerExistant = function() {
				$scope.itemsProposes = [];
				
				if ($scope.newData) {
					$scope.listItems.find(function(a) {
						// TODO: Recherche sur les items (algorithme)
						if (a[$scope.data].toLowerCase().match($scope.newData.toLowerCase())) {
							$scope.itemsProposes.push(a);
						}
					});
				}
			}
			
			$scope.saveItem = function(dt) {
				if (dt) {
					var item = {};
					item[$scope.data] = dt

					/*
					var index_sep_pn = pn.lastIndexOf(' ');
					auteur.Nom = pn.substring(index_sep_pn + 1);
					auteur.Prenom = pn.substring(0, index_sep_pn);
					*/
					
					// TODO : vérifier que l'auteur n'est pas déjà dans la liste
					$scope.addItem(item);
				}
			}
			
			$scope.addItem = function(item) {
				$scope.items.push(item);
				
				/*
				if ($scope.parent.Genre === "Dessin" && $scope.auteurs.length === 1) {
					$scope.parent.Dessinateur = auteur;
					$scope.parent.Scenariste = auteur;
				}
				*/
				
				$scope.newData = '';
				$scope.itemsProposes = [];
			}
			
			$scope.removeItem = function(index) {
				var removed_item = $scope.items.splice(index, 1)[0];
				
				// TODO : $emit et $on sur modification
				/*
				if ($scope.parent) {
					if($scope.parent.Genre === "Dessin" && $scope.auteurs.length >= 1) {
						if ($scope.parent.Dessinateur.PrenomNom === removed_auteur.PrenomNom) {
							$scope.parent.Dessinateur = $scope.auteurs[0];
						}
						if ($scope.parent.Scenariste.PrenomNom  === removed_auteur.PrenomNom) {
							$scope.parent.Scenariste = $scope.auteurs[0];
						}
					}
				}
				*/
			}
		},
		scope: {
			items: '=children',
			itemCol: '=childCol',
			parent: '=item',
			parentCol: '=itemCol',
			data: '=data',
			libData: '=libData'
		},
		templateUrl: './app/templates/biblio/ajoutAuteurTag.tpl'
	}
}]);

// SERIES
common.directive('volumeSerie', function() {
	return {
		restrict: 'E',
		controller: function($scope) {
			$scope.sv = undefined;
			
			$scope.changeNbVolumes = function() {
				if ($scope.TitreSerie == "") {
					// TODO : Message d'erreur si pas de titre de série
				} else if ($scope.TitreSerie && $scope.NbVolumes > 1) {
					if (!$scope.Volumes) $scope.Volumes = [];
					for (var i = 0 ; i < $scope.NbVolumes ; i++) {
						if (!$scope.Volumes[i]) $scope.Volumes[i] = { 'Numero': i+1, 'Titre': $scope.TitreSerie + ' ' + (i+1) };
					}
					
					// TODO : diminuer le nombre
				}
			}
			
			$scope.showVolume = function(v) {
				if ($scope.sv == v) {
					$scope.sv = undefined;
				} else {
					$scope.sv = v;
				}
			}
		},
		scope: {
			TitreSerie: '=titreSerie',
			NbVolumes: '=nbVolumes',
			Volumes: '=listVolumes',
			mode: '=mode'
		},
		templateUrl: './app/templates/biblio/volumeSerie.tpl'
	}
});

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
			$scope.uploadUrl = "/file/couverture";
			
			if (auth.isConnected()) {
				dataFactory.getItemByParam("Utilisateurs", { 'Pseudo' : auth.getUser() }, function(res){
					$scope.utilisateur = res;
				});
			}
			
			$scope.$watch(
				function() {
					return $scope.img;
				}, function() {
					if ($scope.img) {
						$scope.utilisateur.ImgProfil = $scope.img;
					}
				}
			);
			
			$scope.$on('upload', function(event, data) {
				if (data) {
					$scope.utilisateur.ImgProfil = data;
					
					dataFactory.update("Utilisateurs", {'ImgProfil': filename}, function() {
						// TODO : Update auth
					});
				}
			});
			
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