common.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {

}]);

common.controller('biblioCtrl', ['$scope', '$http', 'dataFactory', 'listFactory', 'auth', function($scope, $http, dataFactory, listFactory, auth) {
	if (auth.isConnected()) console.log(auth.getBiblio());
	
	$scope.genres = listFactory.getAllGenres();
	$scope.categories = listFactory.getAllCategories();
	
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
	
	$scope.initAjout = function(col) {
		$scope.itemToAdd = dataFactory.newItem(col); 
		$scope.colItem = col;
		$scope.action = 'Ajout';
	}
	
	$scope.detailOuvrage = function(o) {
		$scope.ouvrage = o;
		$scope.action = "Selection";
	}
	
	$scope.modifierOuvrage = function() {
		$scope.itemToAdd = angular.copy($scope.ouvrage);
		$scope.action = "Ajout";
	}
	
	$scope.submit = function() {
		// TODO : trouver de quelle opération il s'agit (add/update) ==> Chercher dans la liste si l'ouvrage et/ou l'auteur existe déjà
		if ($scope.ouvrage.Auteurs.length > 0) {
			$scope.ouvrage.Auteurs = JSON.parse(angular.toJson($scope.ouvrage.Auteurs));
			
			$scope.ouvrage.Editions = JSON.parse(angular.toJson($scope.ouvrage.Editions));
			
			if ($scope.ouvrage._id === undefined) { 
				dataFactory.add("Ouvrages", $scope.ouvrage, function(ouv) {
					$scope.ouvrage = ouv;
					
					dataFactory.getAll("Ouvrages", function(res){
						$scope.ouvrages = res;
					});
					dataFactory.getAll("Auteurs", function(res){
						$scope.auteurs = res;
					});
				});
			} else {
				dataFactory.update("Ouvrages", $scope.ouvrage, function() {
					dataFactory.getAll("Ouvrages", function(res) {
						$scope.ouvrages = res;
					});
					dataFactory.getAll("Auteurs", function(res) {
						$scope.auteurs = res;
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