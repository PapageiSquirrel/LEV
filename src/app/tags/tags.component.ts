import { Component, OnInit, Input } from '@angular/core';

import { Tag } from '../Models/tag';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  inputs: ['tags']
})
export class TagsComponent implements OnInit {
  @Input() tags: Tag[];
  nom: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (!this.tags) {
      this.tags = [];
    }
  }

  sauveTag(n: string) {
  	let t = new Tag(n);
  	if (t) this.tags.push(t);
  	else {
  		// TODO : Message d'erreur
  	}
  }

  suppTag(index: number) {
  	this.tags.splice(index, 1);
  }
}
