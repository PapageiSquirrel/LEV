<div class="col-xs-12 col-md-12 nopadding row">
	<div class="panel panel-default">
		<div class="panel-heading"><h3>{{titre}}</h3></div>
		
		<div class="panel-body">
			<ul class="list-unstyled row">
				<li ng-repeat="item in ouvrages" class="col-xs-4"><affiche-ouvrage ouvrage="item" on-click="onSelection(item)"></affiche-ouvrage></li>
			</ul>
		</div>
	</div>
</div>
