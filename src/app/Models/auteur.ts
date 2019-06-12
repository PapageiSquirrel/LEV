export class Auteur {
	id: number;
	prenoms: string;
	nom: string;
	alias: string[];

	constructor(pn: string) {
		if (pn) {
			let index_sep_pn = pn.lastIndexOf(' ');
			this.nom = pn.substring(index_sep_pn + 1);
			this.prenoms = pn.substring(0, index_sep_pn);
		}
	}

	PrenomsNom(): string {
		return this.prenoms + ' ' + this.nom;
	}
}