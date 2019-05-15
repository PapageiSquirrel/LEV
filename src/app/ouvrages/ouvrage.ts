import { Auteur } from '../auteurs/auteur';
import { Edition } from '../editions/edition';
import { Tag } from '../tags/tag';

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
		this.couverture = couverture;
		this.tags = tags;
	}
}