<div class="form-group col-xs-8">
	<div class="col-xs-8">
		<label>Auteur(s) :</label>
	
		<div class="input-group col-xs-12">
			<input type="text" class="form-control" placeholder="Prenom(s) Nom" ng-model="PrenomNom" ng-change="filtrerAuteursExistants()">
			<span class="input-group-btn">
				<button class="btn btn-secondary" type="button" ng-click="saveAuteur(PrenomNom)">+</button>
			</span>
		</div>
		
		<div ng-repeat="a in auteurs track by $index" class="input-group col-xs-12">
			<span class="input-group-addon" id="basic-addon1">{{a.PrenomNom}}</span>
			<span class="input-group-btn">
				<button class="btn btn-secondary" type="button" ng-click="removeAuteur($index)">-</button>
			</span>
		</div>
	</div>
	
	<div class="panel panel-default col-xs-4" ng-show="auteursProposes.length > 0">
		<div class="panel-heading"><label>Auteurs deja existants</label></div>
		
		<div class="panel-body">
			<ul class="list-unstyled row">
				<li ng-repeat="ap in auteursProposes | compareArrays:auteurs" class="input-group col-xs-4">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button" ng-click="addAuteur(ap)">{{ap.PrenomNom}}</button>
					</span>
				</li>
			</ul>
		</div>
	</div>
</div>
