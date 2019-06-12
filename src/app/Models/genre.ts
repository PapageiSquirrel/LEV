export class Genre {
	code: string;
	libelle: string;
	sous_genres: SousGenre[];

	constructor(code: string, libelle: string, sg: SousGenre[]) {
		this.code = code;
		this.libelle = libelle;
		this.sous_genres = sg;
	}
}

export class SousGenre {
	code: string;
	libelle: string;

	constructor(code: string, libelle: string) {
		this.code = code;
		this.libelle = libelle;
	}
}