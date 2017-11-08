<div class="container">
	<form>
		<div class="form-group col-xs-5">
			<label>Pseudonyme :</label>
			<input type="text" name="text_titre" class="form-control" ng-model="utilisateur.Pseudo" />
		</div>
		
		<div class="form-group col-xs-5">
			<label>E-mail :</label>
			<input type="email" name="text_titre" class="form-control" ng-model="utilisateur.Email" />
		</div>
		
		<div class="form-group col-xs-5">
			<label>Mot de passe :</label>
			<input type="text" name="text_auteur" class="form-control" ng-model="utilisateur.MotDePasse" ng-Change="verifMdp(mdp)" />
		</div>
		
		<div class="form-group col-xs-5">
			<label>Vérification du mot de passe :</label>
			<input type="text" name="text_auteur" class="form-control" ng-model="mdp" ng-Change="verifMdp(mdp)" />
		</div>
		
		<div class="form-group col-xs-5">
			<button class="form-control" ng-click="createUser(user)">Terminer</button><span class="msg-error">{{error}}</span>
		</div>
	</form>
</div>