import { Component, OnInit } from '@angular/core';
import { Ouvrage } from '../ouvrages/ouvrage';
import { OuvragesService } from '../ouvrages.service';

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.css']
})
export class BiblioComponent implements OnInit {
  title: string;
  ouvrages: Ouvrage[];

  constructor(private ouvragesService: OuvragesService) { 
    this.title = "Ma Bibliothèque";
  }

  getOuvrages(): void {
  	this.ouvragesService.getOuvrages().subscribe(ouvrages => this.ouvrages = ouvrages);
  }

  ngOnInit() {
  	this.getOuvrages();
  }

  /*$scope.genres = listFactory.getAllGenres();
  // Ajouter une catégorie ? ou seulement des tags
  // $scope.categories = listFactory.getAllCategories();
  
  dataFactory.getAll("Series", function(res) {
    $scope.series = [];
    if (res) {
      res.forEach(function(o) {
        $scope.series.push(dataFactory.updateItem("Series", o));
      });
    } else {
      // TODO : Afficher un msg d'erreur
    }
  });
  dataFactory.getAll("Ouvrages", function(res) {
    $scope.ouvrages = [];
    if (res) {
      res.forEach(function(o) {
        $scope.ouvrages.push(dataFactory.updateItem("Ouvrages", o));
      });
    } else {
      // TODO : Afficher un msg d'erreur
    }
  });
  dataFactory.getAll("Auteurs", function(res) {
    $scope.auteurs = [];
    if (res) {
      res.forEach(function(a) {
        $scope.auteurs.push(dataFactory.updateItem("Auteurs", a));
      });
    } else {
      // TODO : Afficher un msg d'erreur
    }
  });
  dataFactory.getAll("Tags", function(res) {
    $scope.tags = [];
    if (res) {
      res.forEach(function(t) {
        $scope.tags.push(dataFactory.updateItem("Tags", t));
      });
    } else {
      // TODO : Afficher un msg d'erreur
    }
  });
  
  $scope.initAjout = function(col) {
    $scope.itemToAdd = dataFactory.newItem(col); 
    $scope.colItem = col;
    $scope.action = 'Ajout';
  }
  
  $scope.detailOuvrage = function(o) {
    $scope.item = o;
    console.log(o);
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
        });
      } else {
        dataFactory.update(col, $scope.itemToAdd, function() {

        });
      }
    }
  }*/
}
