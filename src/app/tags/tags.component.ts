import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { faPlus, faTags, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
  nom = new FormControl('', Validators.required);

  faPlus = faPlus;
  faTags = faTags;
  faTimesCircle = faTimesCircle;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (!this.tags) {
      this.tags = [];
    }
  }

  sauve() {
    let n = this.nom.value;
  	if (n) {
      let t = new Tag(n);
    	this.tags.push(t);
    }
    this.nom.setValue('');
  }

  supprimer(index: number) {
  	this.tags.splice(index, 1);
  }
}
