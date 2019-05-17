import { Ouvrage } from '../ouvrages/ouvrage';

export class Utilisateur {
	id: number;
	pseudo: string;
	email: string;
	motdepasse: string;
	biblio: Ouvrage[];

	constructor(id: number, pseudo: string, email: string, mdp: string) {
		this.id = id;
		this.pseudo = pseudo;
		this.email = email;
		this.motdepasse = mdp;
	}

	ajouterOuvrage(o: Ouvrage): void {
		// vérifier si l'ouvrage n'est pas déjà dans la biblio
		this.biblio.push(o);
	}
}