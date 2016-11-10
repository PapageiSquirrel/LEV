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

	var requestDataWithParameter = function(col, data, callback) {
		$http({
			url: '/data/find=' + col,
			method: 'POST',
			data: angular.toJson(data),
			headers: {'Content-Type': 'application/json'}
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
					return { Titre: '', Auteurs: [], Genre: '' };
				case 'Auteurs':
					return { PrenomNom: '', Nom: '', Prenom: '', Alias: [] };
				default:
					return null;
			}
		},
		add: function(col, item, callback) {
			// TODO : try catch
			submitData('add', col, item, function(item_added) {
				if (item_added !== null) {
					var obj_old = findObj(col);
					if (obj_old === undefined) {
						storage.push({ collection: col, items: new Array(item) });
					} else {
						obj_old.push(item_added);
					}
					
					if (col === "Ouvrages") {
						var obj_bis_old = findObj("Auteurs");
						if (obj_bis_old === undefined) {
							storage.push({ collection: "Auteurs", items: new Array(item_added.Auteurs) });
						} else {
							obj_bis_old.push(item_added.Auteurs);
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
		}
		/*
		getListByParam: function (col, param, callback) {
			var obj_old = findObj(col);
			
			if (obj_old === undefined) {
				requestDataWithParameter(col, param, function(res) {
					var new_obj = { collection: col, items: res };
					storage.push(new_obj);
					callback(res);
				});
			} else {
				obj_old.items
				callback(obj_old.items);
			}
		}
		*/
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

/*
common.factory('ouvrageFactory', ['$http', function($http) {
	const COLLECTION = 'Ouvrages';
	var ouvrages = [];
	
	return {
		add: function(ouvrage) {
			// TODO : try catch
			var ouvrage_added = submitData('add', COLLECTION, ouvrage);
			
			if (ouvrage_added !== null) {
				ouvrages.push(ouvrage_added);
				
				console.log('Problème rencontre lors de l\'ajout d\'un ouvrage !');
			}
			
			return ouvrage_added;
		},
		update: function (ouvrage) {
			// TODO : try catch
			submitData('update', COLLECTION, ouvrage);
			
			var index_ouvrage_old = ouvrages.findIndex(function(o) {
				return o._id === ouvrage._id;
			});
			
			if (index_ouvrage_old !== -1) {
				ouvrages.split(index_ouvrage_old, 1);
				ouvrages.push(ouvrage);
			}
			
			return null;
		},
		getById: function(id) {
			return requestDataWithParameter(COLLECTION, { _id: id });
		},
		getListByParam: function (param) {
			return requestDataWithParameter(COLLECTION, param);
		},
		getAll: function() {
			data = requestData(COLLECTION);
		}
	}
}]);

common.factory('auteurFactory', ['$http', function($http) {
	const COLLECTION = 'Auteurs';
	var auteurs = [];
	
	return {
		add: function(ouvrage) {
			// TODO : try catch
			var ouvrage_added = submitData('add', COLLECTION, ouvrage);
			
			if (ouvrage_added !== null) {
				ouvrages.push(ouvrage_added);
				
				console.log('Problème rencontre lors de l\'ajout d\'un ouvrage !');
			}
			
			return ouvrage_added;
		},
		getById: function(id) {
			return requestDataWithParameter(COLLECTION, { _id: id });
		},
		getListByParam: function (param) {
			return requestDataWithParameter(COLLECTION, param);
		},
		getAll: 
			requestData(COLLECTION);
	}
}]);
*/