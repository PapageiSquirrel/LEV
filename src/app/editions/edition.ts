export class Edition {
	id: number;
	nom: string;
	poche: boolean;

	constructor(nom: string, poche: boolean) {
		this.nom = nom;
		this.poche = poche;
	}
}