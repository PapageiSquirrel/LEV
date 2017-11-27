<div class="col-xs-7">
	<div class="grid">
		<label>Auteur(s) :</label>
		
		<div class="input-group col-xs-12 nopadding">
			<input type="text" class="form-control" placeholder="Prenom(s) Nom" ng-model="PrenomNom" ng-change="filtrerAuteursExistants()">
			<span class="input-group-btn">
				<button class="btn btn-secondary valid" type="button" ng-click="saveAuteur(PrenomNom)">+</button>
			</span>
		</div>
	
		<div class="form-inline col-xs-12">
			<div ng-repeat="a in auteurs track by $index" class="input-group col-xs-4 row">
				<span class="input-group-addon" id="basic-addon1">{{a.PrenomNom}}</span>
				<span class="input-group-btn">
					<button class=" btn btn-secondary suppr" type="button" ng-click="removeAuteur($index)">-</button>
				</span>
			</div>
		</div>
	</div>
</div>

<div class="input-group col-xs-5" ng-show="auteursProposes.length > 0">
	<ul class="list-unstyled">
		<li ng-repeat="ap in auteursProposes | compareArrays:auteurs" class="col-xs-6 nopadding">
			<span class="input-group-btn">
				<button class="btn btn-default" type="button" ng-click="addAuteur(ap)">{{ap.PrenomNom}}</button>
			</span>
		</li>
	</ul>
</div>

