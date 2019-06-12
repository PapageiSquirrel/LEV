import { Component, OnInit, Input } from '@angular/core';

import { Ouvrage } from '../../Models/ouvrage';
import { Serie } from '../../Models/serie';
import { Genre, SousGenre } from '../../Models/genre';
import { Tag } from '../../Models/tag';

@Component({
  selector: 'app-selection-ouvrage-serie',
  templateUrl: './selection-ouvrage-serie.component.html',
  styleUrls: ['./selection-ouvrage-serie.component.css'],
  inputs: ['item', 'colItem', 'genres']
})
export class SelectionOuvrageSerieComponent implements OnInit {
	@Input() item: Ouvrage|Serie;
	@Input() colItem: string;
	@Input() genres: Genre[];

  	constructor() { }

  	ngOnInit() { }
}
