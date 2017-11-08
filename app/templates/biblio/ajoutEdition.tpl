<table class="table table-hover table-responsive">
	<tr ng-repeat="edition in editions">
		<td class="col-xs-8 col-md-10 form-group">
			<div>
				{{edition.Editeur}}
				<span ng-if="edition.Poche">(Poche)</span>
			</div>
		</td>
		<td></td>
		<td class="col-xs-4 col-md-2 form-group">
			<button type="submit" class="btn btn-default btn-block" ng-click="">Je l'ai</button>
		</td>
	</tr>
	<tr ng-show="ajoutEnCours">
		<td class="col-xs-3 col-md-4 form-group">
			<input type="text" class="form-control" id="editeur" placeholder="Maison d'édition" ng-model="newEdition.Editeur">
		</td>
		<td class="col-xs-3 col-md-3 form-group text-center">
			<input type="checkbox" id="poche" ng-model="newEdition.Poche">
			<label for="poche">Poche</label>
		</td>
		<td class="col-xs-3 col-md-3 text-center">
			<div ng-show="col == 'Ouvrages'">
				<!-- TODO: Ouvrage en plusieurs parties -->
			</div>
			<div ng-show="col == 'Series'" class="form-group">
				<input type="number" id="nbVolumes" ng-model="newEdition.NbVolumes" width="30px">
				<label for="nbVolumes">Volumes</label>
			</div>
		</td>
		<td class="col-xs-3 col-md-2 form-group">
			<button type="submit" class="btn btn-default" ng-click="sauver()">Enregistrer</button>
		</td>
	</tr>
	<tr ng-show="!ajoutEnCours">
		<td class="col-xs-8 col-md-10">Ajouter une nouvelle Edition</td>
		<td></td>
		<td class="col-xs-4 col-md-2"><img ng-src="images/Plus.png" class="img-responsive" alt="Responsive image" width="20px" height="20px" ng-click="ajout()" /></td>
	</tr>
</table>