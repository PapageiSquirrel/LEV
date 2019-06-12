import { Component, OnInit } from '@angular/core';
import { Ouvrage } from '../Models/ouvrage';
import { Serie } from '../Models/serie';
import { Genre, SousGenre } from '../Models/genre';
import { Tag } from '../Models/tag';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.css']
})
export class BiblioComponent implements OnInit {
  title: string;
  ouvrages: Ouvrage[];
  genres: Genre[];
  tags: Tag[];
  mode: string;
  item: Ouvrage|Serie;
  colItem: string;

  constructor(private apiService: ApiService) { 
    this.title = "Ma Bibliothèque";
  }

  private getOuvrages(): void {
  	this.apiService.getObjectsList<Ouvrage[]>('ouvrages').subscribe(ouvrages => this.ouvrages = ouvrages);
  }

  private getGenres(): void {
    this.apiService.getObjectsListJoinedByKey<Genre[]>('code', 'codegenre', 'genres', 'sous_genres').subscribe(genres => this.genres = genres);
  }

  private getTags(): void {
    this.apiService.getObjectsList<Tag[]>('tags').subscribe(tags => this.tags = tags);
  }

  ngOnInit() {
    this.mode = 'consult';

    this.getGenres();
    this.getTags();
  	this.getOuvrages();
  }

  private initMode(mode: string, param: string) {
    this.mode = mode;
    if (param) this.colItem = param;
  }

  /*
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
