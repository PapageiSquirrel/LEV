<div class="panel panel-default col-xs-8">
	<div class="panel-heading col-xs-12"><h3>Ajouter/Modifier un ouvrage</h3></div>
	
	<div class="panel-body col-xs-12">
		<form>
			<!-- Vue du formulaire (dépendance sur la sélection effectuée -->
			<div class="form-group col-xs-4">
				<label>Titre :</label>
				<input type="text" name="text_titre" class="form-control" ng-model="ouvrage.Titre" ng-change="filtrerOuvragesExistants()" />
			</div>
			
			<ajout-auteur ng-init="ouvrage.Auteurs = []" auteurs="ouvrage.Auteurs" ouvrage="ouvrage">
			
			</ajout-auteur>
			
			<div class="form-group col-xs-12">
				<!-- Template de liste de Sous genre -->
				<div class="row">
					<div class="col-xs-3" ng-repeat="g in genres">
						<button type="button" class="btn btn-primary btn-lg btn-block" ng-click="showSG(g.genre)">{{g.genre}}</button>
						<select class="row col-xs-12" ng-show="g.genre === g_selected">
							<option ng-repeat="sg in g.sousGenres" ng-selected="ouvrage.SousGenre">{{sg}}</a>
						</select>
					</div>
				</div>
				
				<div class="row col-xs-12" ng-switch on="g_selected">
					<div ng-switch-when="Livre">
						<div class="form-group">
							<label>Date de sortie :</label>
							<input type="text" name="text_dds" class="form-control" ng-model="ouvrage.DateSortie" />
						</div>
					</div>
					<div ng-switch-when="Dessin">
						<div class="form-group">
							<div class="form-group">
								<label>Dessinateur :</label>
								<select class="form-control" ng-disabled="ouvrage.Auteurs.length <= 1"  ng-options="a as a.PrenomNom for a in ouvrage.Auteurs" ng-model="ouvrage.Dessinateur">
									<!-- TODO: Ajouter une phrase indiquant d'ajouter des auteurs -->
								</select>
							</div>
							<div class="form-group">
								<label>Scenariste :</label>
								<select class="form-control" ng-disabled="ouvrage.Auteurs.length <= 1" ng-options="a as a.PrenomNom for a in ouvrage.Auteurs" ng-model="ouvrage.Scenariste">
									<!-- TODO: Ajouter une phrase indiquant d'ajouter des auteurs -->
								</select>
							</div>
						</div>
					</div>
					<div ng-switch-when="Abonnement">
						<div class="form-group">
							<label>Date de debut :</label>
							<input type="text" name="text_ddd" class="form-control" ng-model="ouvrage.DateDebut" />
						</div>
						<div class="form-group">
							<label>Frequence de parution :</label>
							<input type="text" name="text_freq" class="form-control" ng-model="ouvrage.FrequenceParution" />
						</div>
						<div class="form-group">
							<label>
								Toujours en parution : <input type="checkbox" value="ouvrage.EnParution" />
							</label>
						</div>
					</div>
					<div ng-switch-when="Conglomerat">
					
					</div>
				</div>
			</div>
			
			<div class="form-group col-xs-6">
				<!--<button class="form-control" name="btn_save">Enregistrer</button>-->
				<button class="form-control" name="btn_soumettre" ng-click="submit()">Soumettre</button>
			</div>
		</form>
	</div>
</div>

<div class="panel panel-default col-xs-4" ng-show="ouvragesProposes.length > 0">
	<div class="panel-heading col-xs-12"><label>Ouvrages deja existants</label></div>
	
	<div class="panel-body col-xs-12">
		<ul class="list-unstyled row">
			<li ng-repeat="op in ouvragesProposes" class="input-group">
				<span class="input-group-btn">
					<affiche-ouvrage ouvrage="op" on-click="dejaExistant(op)"></affiche-ouvrage>
				</span>
			</li>
		</ul>
	</div>
</div>