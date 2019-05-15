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
}
