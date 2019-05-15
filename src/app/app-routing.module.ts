import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiblioComponent } from './biblio/biblio.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ForumComponent } from './forum/forum.component';
import { MembresComponent } from './membres/membres.component';

const routes: Routes = [
	{ path: 'biblio', component: BiblioComponent },
	{ path: 'accueil', component: AccueilComponent },
	{ path: 'forum', component: ForumComponent },
	{ path: 'membres', component: MembresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
