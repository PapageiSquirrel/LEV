<!-- contenu pour un utilisateur -->
<div class="container-fluid">
	<!-- Bloc suivi de création -->
	<div class="col-xs-3 col-md-3">
	<!-- Bloc critiques -->
		<div class="panel panel-default">
			<div class="panel-heading"><label>Critiques</label></div>
			
			<div class="panel-body">
				<ul class="list-unstyled">
					<li>Critique 1</li>
					<li>Critique 2</li>
					<li>Critique 3</li>
				</ul>
			</div>
		</div>

		<!-- Bloc ajout récent -->
		<div class="panel panel-default">
			<div class="panel-heading"><label>Derniers Ajouts</label></div>
			
			<div class="panel-body">
				<ul class="list-unstyled">
					<li>Livre 1</li>
					<li>BD 1</li>
					<li>Mag 1</li>
				</ul>
			</div>
		</div>
		
		<!-- Bloc topic forum --> 

		
		<!-- etc -->
	</div>

	<!-- Bloc édition -->
	<div class="col-xs-6 col-md-6 row">
		<!-- Bloc profil -->
		<div class="col-xs-12 col-md-12">
			<!-- <span>{{utilisateur.Pseudo}}</span> -->
			<!-- Modification de l'image -->
			<div class="col-xs-6 col-md-6">
				<title>Modification d'image de profil</title>
				<img ng-src="{{utilisateur.ImgProfil}}" width="100px" height="150px" />
				<div>
					<input type="file" file-model="fileSelected">
					<button ng-click="uploadProfil()">Upload</button>
				</div>
			</div>
			
			<!-- Modification du mot de passe -->
			<div class="col-xs-6 col-md-6">
				<title>Changement de mot de passe</title>
				
				<div class="form-group">
					<label>Nouveau mot de passe :</label>
					<input type="text" class="form-control" ng-model="mdp" />
				</div>
				<div class="form-group">
					<label>Vérification du nouveau mot de passe :</label>
					<input type="text" class="form-control" ng-model="verif" />
				</div>
				
				<button class="form-control" ng-click="verifNewMdp(mdp, verif)">Modifier</button>
			</div>
			
			<!-- Modification de la signature pour le forum -->
			<div class="col-xs-12 col-md-12">
				<label>Signature :</label>
				<input type="textarea" ng-model="utilisateur.Signature" />
				
				<button>Modifier</button>
			</div>
		</div>
		
		<!-- Bloc recommandations -->
		<div class="col-xs-6 col-md-6">
			<div class="panel panel-default">
				<div class="panel-heading"><label>Recommandations</label></div>
				
				<div class="panel-body">
					<ul class="list-unstyled">
						<li>Reco 1</li>
						<li>Reco 2</li>
						<li>Reco 3</li>
					</ul>
				</div>
			</div>
		</div>
		
		<!-- Bloc wish list -->
		<div class="col-xs-6 col-md-6">
			<div class="panel panel-default">
				<div class="panel-heading"><label>Liste de souhaits</label></div>
				
				<div class="panel-body">
					<ul class="list-unstyled">
						<li>Ouvrage 1</li>
						<li>Ouvrage 2</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- Bloc divers -->
	<div class="col-xs-3 col-md-3">
		<!-- Bloc MP -->
		
		<!-- Autres -->
	</div>
</div>
