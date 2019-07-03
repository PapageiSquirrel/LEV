import { Auteur } from './auteur';
import { Edition } from './edition';
import { Tag } from './tag';

const COUV_URL = 'assets/couvertures/';

export class Ouvrage {
	id: number;
	titre: string;
	auteurs: Auteur[];
	genre: string;
	sous_genre: string;
	editions: Edition[];
	couverture: string; // image url
	tags: Tag[];

	constructor(titre: string, auteurs: Auteur[], genre: string, sous_genre: string, editions: Edition[], couverture: string, tags: Tag[]) {
		this.titre = titre;
		this.auteurs = auteurs;
		this.genre = genre;
		this.sous_genre = sous_genre;
		this.editions = editions;
		this.couverture = couverture ? couverture : 'assets/couvertures/Default.png';
		this.tags = tags;
	}

	nomCouverture():string {
		return this.couverture.slice(this.couverture.lastIndexOf('/')+1, this.couverture.lastIndexOf('.'));
	}

	updateCouverture(filename: string) {
		this.couverture = COUV_URL + filename;
	}
}