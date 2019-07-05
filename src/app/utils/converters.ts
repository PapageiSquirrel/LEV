import { IconDefinition, faBook, faImage, faNewspaper, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { Ouvrage, Livre, Dessin, Abonnement, Conglomerat } from '../Models/ouvrage';
import { Genre } from '../Models/genre';

export abstract class GenreConverter {
	public static iconByGenre(g: Genre): IconDefinition {
		switch(g.code) {
			case 'LI':
				return faBook;
			case 'DE':
				return faImage;
			case 'AB':
				return faNewspaper;
			case 'CO':
				return faLayerGroup;
		}
	}

	public static typeOuvrageByGenre(g_code: string, o: Ouvrage): Ouvrage {
		switch(g_code) {
			case 'LI':
				return new Livre(o, null);
			case 'DE':
				return new Dessin(o, null, null);
			case 'AB':
				return new Abonnement(o, null, null);
			case 'CO':
				return new Conglomerat(o);
		}
	}
}