<div class="col-xs-12" ng-show="mode == 'Ajout'">
	<div class="form-group">
		<label>Nb Volumes :</label>
		<input type="number" name="num_volumes" class="form-control" ng-model="NbVolumes" ng-change="changeNbVolumes()" />
	</div>
</div>

<div class="col-xs-12 table-responsive" ng-show="NbVolumes > 1">
	<table class="table table-bordered">
		 <thead>
			<tr>
				<th>N°</th>
				<th>Titre</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="v in Volumes">
				<td>{{v.Numero}}</td>
				<td>
					<input type="text" class="form-control" ng-show="mode == 'Ajout'" ng-model="v.Titre" />
					<button class="btn btn-default btn-block" ng-show="mode == 'Consult'" ng-click="showVolume(v)"></button>
					<affiche-ouvrage class="btn btn-default btn-block" ng-show="sv !== undefined; mode == 'Consult';" ouvrage="sv" on-click="onSelection(sv)>
					
					</affiche-ouvrage>
				</td>
			</tr>
		</tbody>
	</table>
</div>