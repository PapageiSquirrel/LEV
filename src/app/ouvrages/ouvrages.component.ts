import { Component, OnInit, Input } from '@angular/core';

import { Ouvrage } from '../Models/ouvrage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ouvrages',
  templateUrl: './ouvrages.component.html',
  styleUrls: ['./ouvrages.component.css'],
  inputs: ['ouvrage']
})
export class OuvragesComponent implements OnInit {
  @Input() ouvrage: Ouvrage;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
}
