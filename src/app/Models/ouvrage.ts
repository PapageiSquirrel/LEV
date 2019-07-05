import { Auteur } from './auteur';
import { Edition } from './edition';
import { Tag } from './tag';

import { FrequenceParution } from '../constants/enums';

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

export class Livre extends Ouvrage {
	date_de_sortie: Date;

	constructor(o: Ouvrage, dds: Date) {
		super(o.titre, o.auteurs, o.genre, o.sous_genre, o.editions, o.couverture, o.tags);
		this.date_de_sortie = dds;
	}
}

export class Dessin extends Ouvrage {
	dessinateur: Auteur;
	scenariste: Auteur;

	constructor(o: Ouvrage, dessinateur: Auteur, scenariste: Auteur) {
		
		super(o.titre, o.auteurs, o.genre, o.sous_genre, o.editions, o.couverture, o.tags);
		this.dessinateur = dessinateur;
		this.scenariste = scenariste;
	}
}

export class Abonnement extends Ouvrage {
	date_de_debut: Date;
	frequence_parution: FrequenceParution;

	constructor(o: Ouvrage, ddd: Date, fp: FrequenceParution) {
		super(o.titre, o.auteurs, o.genre, o.sous_genre, o.editions, o.couverture, o.tags);
		this.date_de_debut = ddd;
		this.frequence_parution = fp;
	}
}

export class Conglomerat extends Ouvrage {
	constructor(o: Ouvrage) {
		super(o.titre, o.auteurs, o.genre, o.sous_genre, o.editions, o.couverture, o.tags);
	}
}