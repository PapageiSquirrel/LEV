import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Utilisateur } from './membres/utilisateur';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getUtilisateurs(): Observable<Utilisateur[]> {
  	const url = '${API_URL}/utilisateurs';
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

	public getUtilisateurByPseudoAndMdp(pseudo: string, mdp: string): Observable<Utilisateur> {
		const url = '${API_URL}/utilisateurs/?pseudo=${pseudo}&mot_de_passe=${mdp}';
		return this.http
			.get<Utilisateur>(url)
			.pipe(
				catchError(this.handleError<Utilisateur>('getUtilisateurByPseudo pseudo=${pseudo} mdp=${mdp}'))
			);
	}

	public createUtilisateur(utilisateur: Utilisateur) : Observable<Utilisateur> {
		const url = '${API_URL}/utilisateurs';
		return this.http
			.post<Utilisateur>(url, utilisateur, httpOptions)
			.pipe(
				catchError(this.handleError<Utilisateur>('createUtilisateur'))
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
