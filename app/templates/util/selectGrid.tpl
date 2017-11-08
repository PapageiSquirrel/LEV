<select class="form-control" ng-model="selectedValue">
	<option ng-repeat='item in listItems' ng-model='item.cdGenre'>{{item.cdGenre}} - {{item.lbGenre}}</li>
</select>