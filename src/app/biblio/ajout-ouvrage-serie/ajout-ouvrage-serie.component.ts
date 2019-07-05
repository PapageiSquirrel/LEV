import { Component, OnInit, Input } from '@angular/core';

import { IconDefinition, faFileImage, faUpload, faBook, faBookOpen, faNewspaper, faLayerGroup, faImage, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import { Ouvrage } from '../../Models/ouvrage'; //, Livre, Dessin, Abonnement, Conglomerat
import { Serie } from '../../Models/serie';
import { Genre, SousGenre } from '../../Models/genre';
import { Tag } from '../../Models/tag';

import { GenreConverter } from '../../utils/converters';

import { FrequenceParution } from '../../constants/enums';

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
	img: string;
	fp_autre: string;
	FrequenceParution = FrequenceParution;

	faFileImage = faFileImage;
	faUpload = faUpload;
	faBook = faBook;
	faBookOpen = faBookOpen;
	faNewspaper = faNewspaper;
	faImage = faImage;
	faLayerGroup = faLayerGroup;
	faQuoteLeft = faQuoteLeft;
	faQuoteRight = faQuoteRight;

	public uploader:FileUploader = new FileUploader({ url: API_URL, itemAlias: 'couverture' });

  	constructor() { }

	ngOnInit() {
		if (!this.item) {
			if (this.colItem == "ouvrages") {
				this.item = new Ouvrage('', [], '', '', [], '', []);
			} else if (this.colItem == "series") this.item = new Serie('', [], '', '', [], '', []);
		}
		this.items_proposes = [];
	}

	// GENRES
	private genreIcon(g: Genre): IconDefinition {
		return GenreConverter.iconByGenre(g);
	}
	private changerGenre(g_code: string) {
		this.item = GenreConverter.typeOuvrageByGenre(g_code, this.item as Ouvrage);
	}

	// COUVERTURE
	public changeCouverture() {
		this.img = this.uploader.getNotUploadedItems()[0].some.name;
	}
	public uploadCouverture() {
		//if (this.colItem == "ouvrages") this.item.couverture = 
		if (this.colItem == "ouvrages" && this.uploader.getNotUploadedItems()[0]) (this.item as Ouvrage).updateCouverture(this.uploader.getNotUploadedItems()[0].some.name);
		this.uploader.uploadAll();
	}

	private onSauve(event: boolean) {
		console.log(this.item.editions);
	}
}
/*
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
*/