import { Ouvrage } from './ouvrage';

export class Utilisateur {
	id?: number;
	pseudo?: string;
	email?: string;
	motdepasse?: string;
	biblio?: Ouvrage[];

	constructor(params: Utilisateur = {} as Utilisateur) {
		let {
             id = 0,
             pseudo = '',
             email = '',
             motdepasse = '',
             biblio = []
         } = params;

		this.id = id;
		this.pseudo = pseudo;
		this.email = email;
		this.motdepasse = motdepasse;
		this.biblio = biblio;
	}

	public estConnecte?(): boolean {
		return this.id !== 0;
	}

	public ajouterOuvrage?(o: Ouvrage): void {
		// vérifier si l'ouvrage n'est pas déjà dans la biblio
		this.biblio.push(o);
	}
}