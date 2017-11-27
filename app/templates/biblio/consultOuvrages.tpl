<div class="col-xs-12 col-md-12 nopadding row">
	<div class="panel panel-default">
		<div class="panel-heading"><h3>{{titre}}</h3></div>
		
		<div class="panel-body">
			<!-- TODO : Ajouter un titre (Ouvrages) -->
			<ul class="list-unstyled row">
				<li ng-repeat="item in ouvrages" class="col-xs-4" ng-hide="item.InSerie"><affiche-ouvrage ouvrage="item" on-click="onSelection(item)"></affiche-ouvrage></li>
			</ul>
			
			<!-- TODO : Ajouter un titre (Séries) -->
			<ul class="list-unstyled row">
				<!-- TODO : Changer la directive pour les adapter aux séries -->
				<li ng-repeat="item in series" class="col-xs-4"><affiche-ouvrage ouvrage="item" on-click="onSelection(item)"></affiche-ouvrage></li>
			</ul>
		</div>
	</div>
</div>
