import { Injectable } from '@angular/core';
import { Ouvrage } from './Models/ouvrage';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OuvragesService {

  constructor() { }

  getOuvrages(): Observable<Ouvrage[]> {
  	return of([]);
  }

  getOuvrageById(id:string): Observable<Ouvrage> {
  	return of();
  }
}
