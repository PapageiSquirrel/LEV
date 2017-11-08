<div class="container">
	<form>
		<div class="form-group col-xs-5">
			<label>Pseudonyme :</label>
			<input type="text" name="text_titre" class="form-control" ng-model="utilisateur.Pseudo" />
		</div>
	
		<div class="form-group col-xs-5">
			<label>Mot de passe :</label>
			<input type="password" name="text_auteur" class="form-control" ng-model="utilisateur.MotDePasse" />
		</div>
		
		<div class="form-group col-xs-5">
			<button class="form-control" ng-click="verifUser()">Se connecter</button>
		</div>
		
		<div class="form-group col-xs-5">
			<span class="msg-error">{{error}}</span>
		</div>
	</form>
</div>