import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Utilisateur } from './Models/utilisateur';
import { Ouvrage } from './Models/ouvrage';
import { Auteur } from './Models/auteur';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getUtilisateurs(): Observable<Utilisateur[]> {
  	const url = API_URL + '/api/utilisateurs';
  	return this.http
    	.get<Utilisateur[]>(url)
    	.pipe(
    		catchError(this.handleError<Utilisateur[]>('getUtilisateurs', []))
    	);
    	/*
    	.map(response => {
	      const utils = response.json();
	      return utils.map((util) => new Utilisateur(util.id, util.pseudo, util.email, util.mot_de_passe)); // constructeur avec objet
	    })
	    */
  }

	public authUtilisateur(pseudo: string, mdp: string): Observable<Utilisateur> {
		const url = API_URL + '/api/auth';
		return this.http
			.post<Utilisateur>(url, { 'pseudo': pseudo, 'motdepasse': mdp}, httpOptions)
			.pipe(
				catchError(this.handleError<Utilisateur>('getUtilisateurByPseudo pseudo=${pseudo} mdp=${mdp}'))
			);
	}

	public createObject<T>(item: T, col: string) : Observable<T> {
		const url = API_URL + '/api/data/' + col + '/add/id';
		return this.http
			.post<T>(url, item, httpOptions)
			.pipe(
				catchError(this.handleError<T>('createObject col=${col}'))
			);
	}

	public getObjectsList<T>(col: string): Observable<T> {
		const url = API_URL + '/api/data/' + col + '/';
		return this.http
			.get<T>(url, httpOptions)
			.pipe(
				catchError(this.handleError<T>('getOuvrages'))
			);
	}

	public getObjectById<T>(id: string, col: string): Observable<T> {
		const url = API_URL + '/api/data/' + col + '/?id=' + id;
		return this.http
			.get<T>(url, httpOptions)
			.pipe(
				catchError(this.handleError<T>('getObjectById col=${col} id=${id}'))
			);
	}

	public getObjectsListJoinedByKey<T>(key1: string, key2: string, col1: string, col2: string): Observable<T> {
		const url = API_URL + '/api/join?collections[]=' + col1 + '&collections[]=' + col2 + '&keys[]=' + key1 + '&keys[]=' + key2;
		return this.http
			.get<T>(url, httpOptions)
			.pipe(
				catchError(this.handleError<T>('getObjectsListJoinedByKey col=${col1}+${col2} keys=${key1}+${key2}'))
			);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
	 
	    console.error(error); // log to console instead
	    //this.log(`${operation} failed: ${error.message}`);
	 
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}
}
