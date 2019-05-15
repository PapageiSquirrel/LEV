export class Auteur {
	id: number;
	prenom_nom: string;
	prenom: string;
	nom: string;
	alias: string[];

	constructor(pn: string) {
		this.prenom_nom = pn;
	}
}