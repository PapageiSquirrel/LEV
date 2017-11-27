common.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {

}]);

common.controller('fileCtrl', ['$scope', 'dataFactory', 'fileUploader', function($scope, dataFactory, fileUploader) {
	$scope.uploadCouverture = function(){
		var file = $scope.fileSelected;
		
		fileUploader.uploadFileToUrl(file, $scope.uploadUrl, function(filename) {
			$scope.img = filename;
			$scope.$emit('upload', $scope.img);
		});
	}
}]);

common.controller('biblioCtrl', ['$scope', '$http', 'dataFactory', 'listFactory', 'auth', function($scope, $http, dataFactory, listFactory, auth) {
	$scope.genres = listFactory.getAllGenres();
	// Ajouter une catégorie ? ou seulement des tags
	// $scope.categories = listFactory.getAllCategories();
	
	dataFactory.getAll("Series", function(res) {
		$scope.series = [];
		res.forEach(function(o) {
			$scope.series.push(dataFactory.updateItem("Series", o));
		});
	});
	dataFactory.getAll("Ouvrages", function(res) {
		$scope.ouvrages = [];
		res.forEach(function(o) {
			$scope.ouvrages.push(dataFactory.updateItem("Ouvrages", o));
		});
	});
	dataFactory.getAll("Auteurs", function(res) {
		$scope.auteurs = [];
		res.forEach(function(a) {
			$scope.auteurs.push(dataFactory.updateItem("Auteurs", a));
		});
	});
	dataFactory.getAll("Tags", function(res) {
		$scope.tags = [];
		res.forEach(function(t) {
			$scope.tags.push(dataFactory.updateItem("Tags", t));
		});
	});
	
	$scope.initAjout = function(col) {
		$scope.itemToAdd = dataFactory.newItem(col); 
		$scope.colItem = col;
		$scope.action = 'Ajout';
	}
	
	$scope.detailOuvrage = function(o) {
		$scope.item = o;
		$scope.action = "Selection";
	}
	
	$scope.modifierOuvrage = function() {
		$scope.itemToAdd = angular.copy($scope.item);
		var found = $scope.series.find(function(s) {
			return s._id === $scope.item._id;
		});
		
		if (found) $scope.colItem = "Series";
		else $scope.colItem = "Ouvrages";
		$scope.action = "Ajout";
	}
	
	$scope.submit = function(col) {
		// TODO : trouver de quelle opération il s'agit (add/update) ==> Chercher dans la liste si l'item et/ou l'auteur existe déjà
		if ($scope.itemToAdd.Auteurs.length > 0) {
			// Pour enlever le $$hashkey rajouter par angular sur les arrays
			// $scope.itemToAdd.Auteurs = JSON.parse(angular.toJson($scope.itemToAdd.Auteurs));
			// $scope.itemToAdd.Editions = JSON.parse(angular.toJson($scope.itemToAdd.Editions));
			// $scope.itemToAdd.Tags = JSON.parse(angular.toJson($scope.itemToAdd.Tags));
			// Seulement pour les séries
			if ($scope.itemToAdd.Volumes) {
				// $scope.itemToAdd.Volumes = JSON.parse(angular.toJson($scope.itemToAdd.Volumes));
				for (var i = 0; i < $scope.itemToAdd.Volumes.length ; i++) {
					$scope.itemToAdd.Volumes[i] = dataFactory.fromVolumeToOuvrage($scope.itemToAdd, $scope.itemToAdd.Volumes[i]);
				}
				// $scope.itemToAdd.Volumes = JSON.parse(angular.toJson($scope.itemToAdd.Volumes));
			}
			
			if ($scope.itemToAdd._id === undefined) { 
				dataFactory.add(col, $scope.itemToAdd, function(it) {
					$scope.itemToAdd = it;
					
					dataFactory.getAll(col, function(res){
						$scope[col.toLowerCase()] = res;
					});
					dataFactory.getAll("Auteurs", function(res){
						$scope.auteurs = res;
					});
					dataFactory.getAll("Tags", function(res){
						$scope.tags = res;
					});
				});
			} else {
				dataFactory.update(col, $scope.itemToAdd, function() {
					dataFactory.getAll(col, function(res){
						$scope[col.toLowerCase()] = res;
					});
					dataFactory.getAll("Auteurs", function(res) {
						$scope.auteurs = res;
					});
					dataFactory.getAll("Tags", function(res){
						$scope.tags = res;
					});
				});
			}
		}
	}
}]);

common.controller('membresCtrl', ['$scope', 'auth', function($scope, auth) {
	$scope.$watch(
		function() { 
			if (auth.isConnected()) return auth.isConnected(); 
			else return null; 
		}, function(newValue, oldValue) {
			if (newValue !== oldValue) {
				if (newValue) {
					$scope.showProfil = true;
				} else {
					$scope.showProfil = false;
				}
			}
		}
	);
	
	if (auth.isConnected()) {
		$scope.showProfil = true;
	} else {
		$scope.showProfil = false;
	}
	$scope.showInscription = false;
	$scope.showConnection = false;
	
	$scope.toggleInscription = function() {
		$scope.showConnection = false;
		$scope.showInscription = true;
	};
	
	$scope.toggleConnection = function() {
		$scope.showInscription = false;
		$scope.showConnection = true;
	};
	
	$scope.toggleProfil = function() {
		$scope.showProfil = true;
	}
}]);