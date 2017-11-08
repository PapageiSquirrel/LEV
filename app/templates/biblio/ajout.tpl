<div class="container-fluid nopadding row">
	<div class="col-xs-8 col-md-8 nopadding">
		<div class="panel panel-default">
			<div class="panel-heading"><h3>{{labelMode()}}</h3></div>
			
			<div class="panel-body row">
				<form>
					<!-- Vue du formulaire -->
					<div class="form-group col-xs-4">
						<label>Titre :</label>
						<input type="text" name="text_titre" class="form-control" ng-model="item.Titre" ng-change="filtrerItemsExistants()" />
					</div>
					
					<div class="form-group col-xs-8 nopadding">
						<ajout-auteur auteurs="item.Auteurs" item="item">
						
						</ajout-auteur>
					</div>
					
					<div class="form-group col-xs-4" ng-if="colItem == 'Ouvrages'">
						<label>Couverture :</label>
						<!-- TODO: Créer le browser de fichier et l'upload -->
						<img ng-show="item.Couverture !== 'images\\couvertures\\Default.png'" ng-src="{{item.Couverture}}" width="100px" height="150px" />
						<div>
							<input type="file" file-model="fileSelected">
							<button ng-click="uploadCouverture()">Upload</button>
						</div>
					</div>
					
					<div class="form-group col-xs-12">
						<!-- Template de liste de Sous genre -->
						<div class="row">
							<div class="col-xs-3" ng-repeat="g in genres">
								<button type="button" class="btn btn-primary btn-lg btn-block" ng-click="showSG(g.genre)">{{g.genre}}</button>
								<select class="col-xs-12" ng-show="g.genre === g_selected">
									<option ng-repeat="sg in g.sousGenres" ng-selected="item.SousGenre">{{sg}}</a>
								</select>
							</div>
						</div>
						
						<div class="col-xs-12" ng-switch on="g_selected">
							<div ng-switch-when="Livre">
								<div class="form-group">
									<label>Date de sortie :</label>
									<input type="text" name="text_dds" class="form-control" ng-model="item.DateSortie" />
								</div>
							</div>
							<div ng-switch-when="Dessin">
								<div class="form-group">
									<div class="form-group">
										<label>Dessinateur :</label>
										<select class="form-control" ng-disabled="item.Auteurs.length <= 1"  ng-options="a as a.PrenomNom for a in item.Auteurs" ng-model="item.Dessinateur">
											<!-- TODO: Ajouter une phrase indiquant d'ajouter des auteurs -->
										</select>
									</div>
									<div class="form-group">
										<label>Scenariste :</label>
										<select class="form-control" ng-disabled="item.Auteurs.length <= 1" ng-options="a as a.PrenomNom for a in item.Auteurs" ng-model="item.Scenariste">
											<!-- TODO: Ajouter une phrase indiquant d'ajouter des auteurs -->
										</select>
									</div>
								</div>
							</div>
							<div ng-switch-when="Abonnement">
								<div class="form-group">
									<label>Date de debut :</label>
									<input type="text" name="text_ddd" class="form-control" ng-model="item.DateDebut" />
								</div>
								<div class="form-group">
									<label>Frequence de parution :</label>
									<input type="text" name="text_freq" class="form-control" ng-model="item.FrequenceParution" />
								</div>
								<div class="form-group">
									<label>
										Toujours en parution : <input type="checkbox" value="item.EnParution" />
									</label>
								</div>
							</div>
							<div ng-switch-when="Conglomerat">
							
							</div>
						</div>
					</div>
					
					<div class="form-group col-xs-12 col-md-12 separation">
						<!-- Template ajout édition -->
						<ajout-edition editions="item.Editions" collection="colItem"></ajout-edition>
					</div>
				</form>
			</div>
			
			<div class="panel-footer">
				<button class="form-control" name="btn_soumettre" ng-click="submit()">Soumettre</button>
			</div>
		</div>
	</div>

	<!--
	<div class="col-xs-4 col-md-4">
		<div class="panel panel-default" ng-show="itemsProposes.length > 0">
			<div class="panel-heading"><label>Ouvrages deja existants</label></div>
			
			<div class="panel-body">
				<ul class="list-unstyled">
					<li ng-repeat="op in itemsProposes" class="input-group col-md-12">
						<span class="input-group-btn">
							<!-- Template ouvrage --><!-- 
							<affiche-ouvrage ouvrage="op" on-click="dejaExistant(op)"></affiche-ouvrage>
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
	-->
</div>