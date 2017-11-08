<div class="form-group col-xs-5">
	<label>Auteur :</label>
	<!-- TODO : Auto-completion avec les auteurs pré-existants -->
	<input type="text" name="text_auteur" class="form-control" ng-model="newAuteur" />
	<!-- TODO : séparation automatique entre nom et prénom (et éventuellement particule + nom de plume) -->
	<button ng-click="ouvrage.Auteurs.push({nom: newAuteur});">+</button> 
	<ul>
		<li ng-repeat="auteur in ouvrage.Auteurs">{{auteur.nom}}</li>
	</ul>
</div>