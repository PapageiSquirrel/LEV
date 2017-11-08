<div class="container-fluid row">
	<div class="panel panel-default">
		<div class="panel-body nopadding">
			<div class="row is-flex padding-right">
				<div class="col-xs-10 col-md-11 nopadding">
					<div class="padding-left padding-top">
						<div class="col-xs-6 col-md-4">
							<img ng-src="{{ouvrage.Couverture}}" alt="Couverture" class="img-responsive img-fluid" />
						</div>
						<div class="col-xs-6 col-md-8">
							<div class="row">
								<strong>{{ouvrage.Titre}}</strong>
							</div>
							<div class="row">
								<span ng-repeat="auteur in ouvrage.Auteurs">{{auteur.PrenomNom}} </span>
							</div>
							<div class="row">
								Roman {{ouvrage.SousGenre}}
							</div>
							
							<div class="row">
								<button type="submit" class="btn btn-default btn-block" ng-click="markAsRead(ouvrage._id)">Lu</button>
							</div>
						</div>
						<div class="col-xs-12 col-md-12 margin-top" style="border-top: 1px solid black;">
							<div class="pull-right">
								<span>{{msgEditions}} </span>
								<img ng-src="{{imgSrc}}" class="img-responsive pull-right" alt="Responsive image" width="20px" height="20px" ng-click="showOrHide()" />
							</div>
						</div>
					</div>
				</div>
			
				<div class="col-xs-2 col-md-1 nopadding">
					<button type="button" class="btn btn-block" ng-click="modifier()"><img ng-src="images/modifier.png" width="20px" height="20px" /></button>
				</div>
			</div>
		</div>
		
		<div class="panel-footer nopadding" ng-show="ouvrage.Editions.length > 0 && showEditions">
			<table class="table table-responsive nopadding">
				<tr ng-repeat="edition in ouvrage.Editions track by $index">
					<td class="col-xs-8 col-md-10 form-group">
						<div>
							{{edition.Editeur}}
							<span ng-if="edition.Poche">(Poche)</span>
						</div>
					</td>
					<td></td>
					<td class="col-xs-4 col-md-2 form-group">
						<button type="submit" class="btn btn-default btn-block" ng-click="markAsPossessed($index)">Je l'ai</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</div>