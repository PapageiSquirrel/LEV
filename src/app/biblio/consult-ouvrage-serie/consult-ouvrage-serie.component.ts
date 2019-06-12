import { Component, OnInit, Input } from '@angular/core';

import { Ouvrage } from '../../Models/ouvrage';
import { Serie } from '../../Models/serie';
import { Genre, SousGenre } from '../../Models/genre';
import { Tag } from '../../Models/tag';

@Component({
  selector: 'app-consult-ouvrage-serie',
  templateUrl: './consult-ouvrage-serie.component.html',
  styleUrls: ['./consult-ouvrage-serie.component.css'],
  inputs: ['titre', 'series', 'ouvrages']
})
export class ConsultOuvrageSerieComponent implements OnInit {
	@Input() titre: string;
	@Input() series: Serie[];
	@Input() ouvrages: Ouvrage[];

  	constructor() { }

  	ngOnInit() { }
}
