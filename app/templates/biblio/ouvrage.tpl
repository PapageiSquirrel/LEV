<button class="btn btn-default btn-block" ng-click="actionClick()">
	<div class="grid">
		<div class="row">
			<div class="col-xs-6 col-md-6">
				<img ng-src="{{ouvrage.Couverture}}" alt="Couverture" class="img-responsive img-fluid" />
			</div>
			<div class="col-xs-6 col-md-6">
				<div class="row">
					<div class="col-xs-12 col-md-12">
						<strong>{{ouvrage.Titre}}</strong>
					</div>
				</div>
				<div class="row">
					<span ng-repeat="auteur in ouvrage.Auteurs">{{auteur.PrenomNom}} </span>
				</div>
				<div class="row">
					{{ouvrage.SousGenre}}
				</div>
			</div>
		</div>
	</div>
</button>

