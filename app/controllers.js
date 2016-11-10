common.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {

}]);

common.controller('biblioCtrl', ['$scope', '$http', 'dataFactory', 'listFactory', function($scope, $http, dataFactory, listFactory) {
	$scope.genres = listFactory.getAllGenres();
	$scope.categories = listFactory.getAllCategories();
	
	dataFactory.getAll("Ouvrages", function(res){
		$scope.ouvrages = res;
	});
	dataFactory.getAll("Auteurs", function(res){
		$scope.auteurs = res;
	});
	
	$scope.detailOuvrage = function(o) {
		$scope.ouvrage = o;
		$scope.action = "Selection";
	}
	
	$scope.submit = function() {
		// TODO : trouver de quelle opération il s'agit (add/update) ==> Chercher dans la liste si l'ouvrage et/ou l'auteur existe déjà
		if ($scope.ouvrage.Auteurs.length > 0) {
			$scope.ouvrage.Auteurs = JSON.parse(angular.toJson($scope.ouvrage.Auteurs));
			
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
					dataFactory.getAll("Ouvrages", function(res){
						$scope.ouvrages = res;
					});
					dataFactory.getAll("Auteurs", function(res){
						$scope.auteurs = res;
					});
				});
			}
		}
	}
}]);

common.controller('membresCtrl', ['$scope', function($scope) {
	$scope.utilisateur = null;
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
}]);