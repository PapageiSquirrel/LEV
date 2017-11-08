common.service('auth', [ '$http', 'dataFactory', function($http, dataFactory) {
    var user, biblio;
	searchSession(function(data) {
		user = data.user;
		biblio = data.biblio;
	});
	
	function searchSession(callback) { 
		$http({
			url: '/session=user/',
			method: 'GET',
		}).success(function (data, status, headers, config) {
			callback(data);
		}).error(function (data, status, headers, config) {
			//$scope.msg = 'Le serveur n\'est pas parvenu à charger la collection ' + col + ' !\n';
			//$scope.status = status + ' ' + headers;
			callback(null); // TODO : retourner une exception à gérer
		});
	}
	
    return {
		updateBiblio: function(obj, id=undefined) {
			// TODO: contrôle de l'existence de l'objet
			if (user) {
				if (id) {
					var obj_parent = biblio.find(function(o) { 
						if (o._id ===  id)
							return o;
					});
					
					if (!obj_parent) {
						obj_parent = { '_id': id, 'Lu': false, 'Possede': [] }
						biblio.push(obj_parent);
					}
					
					obj_parent.Possede.push(obj);
					
				} else {
					var ae = biblio.find(function(o) { 
						return o._id ===  obj._id;
					});
					
					if (!ae) {
						biblio.push(obj);
					}
				}
				
				dataFactory.update("Utilisateurs", {'Biblio': biblio}, function() {
					
				});
			}
		},
		getBiblio: function() {
			return biblio;
		},
        getUser: function() {
			return user;
        },
        setUser: function(newUser) {
            user = newUser;
        },
        isConnected: function() {
			return !!user;
        }
    };
}]);

common.factory('listFactory', function() {
	var genres = [{genre: 'Livre', sousGenres: ['Roman', 'Essai', 'Piece de theatre']},
		{genre: 'Dessin', sousGenres: ['Bandes Dessinées', 'Manga', 'Comics']},
		{genre: 'Abonnement', sousGenres: ['Magazine', 'Journaux']},
		{genre: 'Conglomerat', sousGenres: ['Recueil', 'Encyclopedie', 'Roman en plusieurs parties']}];

	var categories = ['Science-Fiction', 'Fantaisie', 'Polar', 'Theatre', 'Biographie', 'Auto-Biographie', 'Philosophie', 'Historique', 'Documentaire', 'Horreur', 'Thriller'];
		
	return {
		getAllGenres: function() {
			return genres;
		},
		getAllCategories: function() {
			return categories;
		}
	}
});

common.factory('dataFactory', ['$http', function($http) {
	var storage = [];
	
	var findObj = function(col) {
		return storage.find(function(obj) { return obj.collection === col });
	}
	
	var requestData = function(col, callback) {
		$http({
			url: '/data/' + col,
			method: 'GET',
		}).success(function (data, status, headers, config) {
			//$scope.msg = 'Le serveur a chargé la collection ' + col + ' !\n';
			callback(data);
		}).error(function (data, status, headers, config) {
			//$scope.msg = 'Le serveur n\'est pas parvenu à charger la collection ' + col + ' !\n';
			//$scope.status = status + ' ' + headers;
			callback(null); // TODO : retourner une exception à gérer
		});
	}

	var requestDataWithParameter = function(col, params, callback) {
		var urlpath = '/data/find=' + col + '/Params:';
		for (key in params) {
			urlpath += '&' + key + '=' + params[key];
		}
		
		$http({
			url: urlpath,
			method: 'GET',
		}).success(function (data, status, headers, config) {
			//$scope.msg = 'Le serveur a chargé la collection ' + col + ' !\n';
			callback(data);
		}).error(function (data, status, headers, config) {
			//$scope.msg = 'Le serveur n\'est pas parvenu à charger la collection ' + col + ' !\n';
			//$scope.status = status + ' ' + headers;
			callback(null); // TODO : retourner une exception à gérer
		});
	}

	var submitData = function(op, col, post_data, callback) {
		$http({
			url: '/data/' + op + '=' + col,
			method: 'POST',
			data: JSON.stringify(post_data),
			headers: {'Content-Type': 'application/json'}
		}).success(function (data, status, headers, config) {
			//$scope.msg = 'Operation ' + op + ' sur la collection ' + col + ' effectuee sur le serveur !';
			callback(data);
		}).error(function (data, status, headers, config) {
			//$scope.msg = 'Echec de l\'operation ' + op + ' sur la collection ' + col + ' sur le serveur !';
			//$scope.status = status + ' ' + headers;
			callback(null); // TODO : retourner une exception à gérer
		});
	}
	
	return {
		newItem: function(col) {
			switch(col) {
				case 'Ouvrages':
					return { Titre: '', Auteurs: [], Genre: '', SousGenre: '', Editions: [], Couverture: 'images\\couvertures\\Default.png' };
				case 'Series':
					return { Titre: '', Auteurs: [], Genre: '', SousGenre: '', Editions: [] }
				case 'Auteurs':
					return { PrenomNom: '', Nom: '', Prenom: '', Alias: [] };
				case 'Utilisateurs':
					return { Pseudo: '', Email: '', MotDePasse: '', Biblio: [] };
				default:
					return null;
			}
		},
		updateItem: function(col, itemToUpdate) {
			var item;
			switch(col) {
				case 'Ouvrages':
					item = { Titre: '', Auteurs: [], Genre: '', SousGenre: '', Editions: [], Couverture: 'images\\couvertures\\Default.png' };
					break;
				case 'Auteurs':
					item = { PrenomNom: '', Nom: '', Prenom: '', Alias: [] };
					break;
				default:
					item = null;
					break;
			}
			
			if (item) {
				for(prop in item) {
					if (!itemToUpdate[prop]) {
						itemToUpdate[prop] = item[prop]
					}
				}
			}
			
			return itemToUpdate;
		},
		add: function(col, item, callback) {
			// TODO : try catch
			submitData('add', col, item, function(item_added) {
				if (item_added !== null) {
					var obj_old = findObj(col);
					if (obj_old) {
						storage.push({ collection: col, items: new Array(item) });
					} else {
						obj_old.items.push(item_added);
					}
					
					if (col === "Ouvrages") {
						var obj_bis_old = findObj("Auteurs");
						if (obj_bis_old) {
							storage.push({ collection: "Auteurs", items: new Array(item_added.Auteurs) });
						} else {
							obj_bis_old.items.push(item_added.Auteurs);
						}
					}
				} else {
					console.log('Problème rencontre lors de l\'ajout a la collection ' + col + ' !');
				}
			
				callback(item_added);
			});
		},
		update: function (col, item, callback) {
			// TODO : try catch
			submitData('update', col, item, function(res) {
				var items_old = findObj(col).items;
				var index_item_old = items_old.findIndex(function(i) {
					return i._id === item._id;
				});
				
				if (index_item_old !== -1) {
					console.log(item);
					items_old[index_item_old] = item;
				}
				
				if (col === "Ouvrages") {
					var items_old = findObj("Auteurs").items;
					item.Auteurs.forEach(function() {
						var index_item_old = items_old.findIndex(function(i) {
							return i._id === item._id;
						});
						
						if (index_item_old !== -1) {
							items_old[index_item_old] = item;
						}
					});
				}
				
				callback();
			});
		},
		getAll: function (col, callback) {
			var obj_old = findObj(col);
			
			if (obj_old === undefined) {
				requestData(col, function(res) {
					var new_obj = { collection: col, items: res };
					storage.push(new_obj);
					callback(res);
				});
			} else {
				callback(obj_old.items);
			}
		},
		getItemByParam: function (col, param, callback) {
			requestDataWithParameter(col, param, function(res) {
				callback(res);
			});
		}
		/*
		getById: function(col, id) {
			return requestDataWithParameter(col, { _id: id });
		},
		getListByParam: function (col, param) {
			var obj_old = findObj(col);
			
			if (obj_old === undefined) {
				data.push({ collection: col, parametres: Object.keys(param), items: requestDataWithParameter(col, param) });
			} else {
				obj_old.items = requestData(col);
				obj_old.parametres = Object.keys(param);
			}
			return requestDataWithParameter(col, param);
		},
		getAll: function (col) {
			var obj_old = findObj(col);
			
			if (obj_old === undefined) {
				data.push({ collection: col, items: requestData(col) });
			} else {
				obj_old.items = requestData(col);
			}
		}
		*/
	}
}]);


// SERVICE D'UPLOAD DE COUVERTURE
common.service('fileUploader', ['$http', function ($http) {
	this.uploadFileToUrl = function(file, uploadUrl, callback){
		var fd = new FormData();
		fd.append('file', file);
		
		$http({
			url: uploadUrl,
			method: 'POST',
			data: fd,
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).success(function (data, status, headers, config) {
			callback(data);
		}).error(function(){
		   
		});
	}
}]);