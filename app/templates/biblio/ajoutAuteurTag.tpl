<div class="col-xs-7">
	<div class="grid">
		<label>{{labelMode()}}</label>
		
		<div class="input-group col-xs-12 nopadding">
			<input type="text" class="form-control" placeholder="{{libData}}" ng-model="newData" ng-change="filtrerExistant()">
			<span class="input-group-btn">
				<button class="btn btn-secondary valid" type="button" ng-click="saveItem(newData)">+</button>
			</span>
		</div>
	
		<div class="form-inline col-xs-12">
			<div ng-repeat="i in items track by $index" class="input-group col-xs-4 row">
				<span class="input-group-addon" id="basic-addon1">{{i[data]}}</span>
				<span class="input-group-btn">
					<button class=" btn btn-secondary suppr" type="button" ng-click="removeItem($index)">-</button>
				</span>
			</div>
		</div>
	</div>
</div>

<div class="input-group col-xs-5" ng-show="itemsProposes.length > 0">
	<ul class="list-unstyled">
		<li ng-repeat="ip in itemsProposes | compareArrays:items" class="col-xs-6 nopadding">
			<span class="input-group-btn">
				<button class="btn btn-default" type="button" ng-click="addItem(ip)">{{ip[data]}}</button>
			</span>
		</li>
	</ul>
</div>