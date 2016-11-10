<button class="btn btn-default btn-block" ng-click="actionClick()">
	<div class="container-fluid row">
		<div class="col-xs-6 col-md-6">
			<img alt="Couverture" class="img-fluid" />
		</div>
		<div class="col-xs-6 col-md-6">
			<div class="row">
				<strong>{{ouvrage.Titre}}</strong>
			</div>
			<div class="row">
				<span ng-repeat="auteur in ouvrage.Auteurs">{{auteur.Prenom_Nom}} </span>
			</div>
			<div class="row">
				{{ouvrage.SousGenre}}
			</div>
		</div>
	</div>
</button>

