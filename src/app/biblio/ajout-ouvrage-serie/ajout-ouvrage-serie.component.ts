import { Component, OnInit, Input } from '@angular/core';

import { faFileImage, faUpload } from '@fortawesome/free-solid-svg-icons';

import { Ouvrage } from '../../Models/ouvrage';
import { Serie } from '../../Models/serie';
import { Genre, SousGenre } from '../../Models/genre';
import { Tag } from '../../Models/tag';

import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl + '/file/';

@Component({
  selector: 'app-ajout-ouvrage-serie',
  templateUrl: './ajout-ouvrage-serie.component.html',
  styleUrls: ['./ajout-ouvrage-serie.component.css'],
  inputs: ['item', 'colItem', 'genres']
})
export class AjoutOuvrageSerieComponent implements OnInit {
	@Input() item: Ouvrage|Serie;
	@Input() colItem: string;
	@Input() genres: Genre[];
	items_proposes: Ouvrage[];
	genre_selected: string;
	img: string;

	faFileImage = faFileImage;
	faUpload = faUpload;

	public uploader:FileUploader = new FileUploader({ url: API_URL, itemAlias: 'couverture' });

  	constructor() { }

	ngOnInit() {
		if (!this.item) {
			if (this.colItem == "ouvrages") {
				this.item = new Ouvrage('', [], '', '', [], '', []);
			} else if (this.colItem == "series") this.item = new Serie('', [], '', '', [], '', []);
		}
		this.items_proposes = [];
		this.genre_selected = '';
	}

	public changeCouverture() {
		this.img = this.uploader.getNotUploadedItems()[0].some.name;
	}

	public uploadCouverture() {
		//if (this.colItem == "ouvrages") this.item.couverture = 
		if (this.colItem == "ouvrages") (this.item as Ouvrage).updateCouverture(this.uploader.getNotUploadedItems()[0].some.name);
		this.uploader.uploadAll();
	}

	private showSG(genre: Genre): void {
		/*
		if(this.item.genre === "Dessin" && $scope.item.Auteurs.length >= 1 && $scope.item.Dessinateur === undefined) {
			this.item.Dessinateur = this.item.Auteurs[0];
			this.item.Scenariste = this.item.Auteurs[0];
		}
		*/
	}

	private onSauve(event: boolean) {
		console.log(this.item.editions);
	}
}
/*
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
					if ($scope.colItem) {
						dataFactory.getAll($scope.colItem, function(res){
							$scope.listItems = res;
						});
					}
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
					if ($scope.listItems && $scope.listItems.length > 0) {
						$scope.listItems.find(function(i) {
							if (i.Titre.match($scope.item.Titre)) {
								$scope.itemsProposes.push(i);
							}
						});
					}
				}
			}
			
			$scope.dejaExistant = function(i) {
				$scope.item = angular.copy(i);
			}
			
		},
		scope: {
			colItem: '=colItem',
			item: '=item',
			genres: '=genres',
			submit: '&onSubmit'
		},
*/