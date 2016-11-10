<div class="container-fluid col-xs-12 col-md-12 row">
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="col-xs-6 col-md-4">
				<img alt="Couverture" class="img-fluid" />
			</div>
			<div class="col-xs-6 col-md-8">
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
	</div>
</div>