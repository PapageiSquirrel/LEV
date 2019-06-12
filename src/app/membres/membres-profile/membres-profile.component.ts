import { Component, OnInit, Input } from '@angular/core';
import { Utilisateur } from '../../Models/utilisateur';

@Component({
  selector: 'app-membres-profile',
  templateUrl: './membres-profile.component.html',
  styleUrls: ['./membres-profile.component.css'],
  inputs: ['utilisateur']
})
export class MembresProfileComponent implements OnInit {
  @Input() utilisateur: Utilisateur;

  constructor() { }

  ngOnInit() {

  }

  uploadProfil() {

  }

  verifNewMdp(mdp: string, verif: string) {

  }
}
