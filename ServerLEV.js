// Chargement des modules complémentaires
http = require("http"),
path = require("path"),
url = require("url"),
fs = require("fs"),
formidable = require('formidable');
io = require("socket.io");
sessions = require("client-sessions");

session = sessions({
  cookieName: 'authentication',
  secret: 'personalsecretsessionofmine', 
  duration: 30 * 60 * 1000, 
  activeDuration: 1000 * 60 * 5
});

const Console = require('console').Console;
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// custom simple logger
const logger = new Console(output, errorOutput);

databaseUrl = "mongodb://lev_user:lev_pass@ds147497.mlab.com:47497/db_lev";
// databaseUrl = "mongodb://lev_user:lev_pass@ds111066.mlab.com:11066/db_lev_dev";


mongoClient = require("mongodb").MongoClient;
ObjectID = require('mongodb').ObjectID;
assert = require('assert');

var insertDocument = function(db, col, doc, callback) 
{
	if (col === "OUVRAGES" && doc.Auteurs !== undefined && doc.Auteurs.length >= 0) {
		var update_counter = 0;
		for(var i = 0 ; i < doc.Auteurs.length ; i++) {
			var auteur = doc.Auteurs[i];
			
			if (doc.Auteurs[i]._id === undefined) {
				insertDocument(db, "AUTEURS", doc.Auteurs[i], function(na) {
					auteur = na;
					update_counter++;
					
					if (update_counter === doc.Auteurs.length) {
						if (doc.Tags.length > 0) {
							insertManyDocuments(db, "TAGS", doc.Tags, function() {
												
							});
						}
						
						db.collection(col).insertOne(doc, function(err, result) {
							assert.equal(err, null);
							console.log("Ajout dans " + col + ".");
							callback(result);
						});
					}
				});
			} else {
				updateDocument(db, "AUTEURS", doc.Auteurs[i], function() {
					update_counter++;
					
					if (update_counter === doc.Auteurs.length) {
						if (doc.Tags.length > 0) {
							insertManyDocuments(db, "TAGS", doc.Tags, function() {
												
							});
						}
						
						db.collection(col).insertOne(doc, function(err, result) {
							assert.equal(err, null);
							console.log("Ajout dans " + col + ".");
							callback(result);
						});
					}
				});
			}
		}
	} else if (col === "SERIES" && doc.Auteurs !== undefined && doc.Auteurs.length >= 0) {
		var update_counter = 0;
		for(var i = 0 ; i < doc.Auteurs.length ; i++) {
			var auteur = doc.Auteurs[i];
			
			if (doc.Auteurs[i]._id === undefined) {
				insertDocument(db, "AUTEURS", doc.Auteurs[i], function(na) {
					auteur = na;
					update_counter++;
					
					if (update_counter === doc.Auteurs.length) {
						update_counter = 0;
						for(var j = 0 ; j < doc.Volumes.length ; j++) {
							var ouvrage = doc.Volumes[j];
							
							if (doc.Volumes[j]._id === undefined) {
								insertDocument(db, "OUVRAGES", doc.Volumes[i], function(no) {
									ouvrage = no;
									update_counter++;
									
									if (update_counter === doc.Volumes.length) {
										if (doc.Tags.length > 0) {
											insertManyDocuments(db, "TAGS", doc.Tags, function() {
																
											});
										}
										
										db.collection(col).insertOne(doc, function(err, result) {
											assert.equal(err, null);
											console.log("Ajout dans " + col + ".");
											callback(result);
										});
									}
								});
							} else {
								updateDocument(db, "OUVRAGES", doc.Auteurs[i], function() {
									update_counter++;
									
									if (update_counter === doc.Volumes.length) {
										if (doc.Tags.length > 0) {
											insertManyDocuments(db, "TAGS", doc.Tags, function() {
																
											});
										}
										
										db.collection(col).insertOne(doc, function(err, result) {
											assert.equal(err, null);
											console.log("Ajout dans " + col + ".");
											callback(result);
										});
									}
								});
							}
						}
					}
				});
			} else {
				updateDocument(db, "AUTEURS", doc.Auteurs[i], function() {
					update_counter++;
					
					if (update_counter === doc.Auteurs.length) {
						update_counter = 0;
						for(var j = 0 ; j < doc.Volumes.length ; j++) {
							var ouvrage = doc.Volumes[j];
							
							if (doc.Volumes[j]._id === undefined) {
								insertDocument(db, "OUVRAGES", doc.Volumes[j], function(no) {
									ouvrage = no;
									update_counter++;
									
									if (update_counter === doc.Volumes.length) {
										insertManyDocuments(db, "TAGS", doc.Tags, function() {
											
										});
										
										db.collection(col).insertOne(doc, function(err, result) {
											assert.equal(err, null);
											console.log("Ajout dans " + col + ".");
											callback(result);
										});
									}
								});
							} else {
								updateDocument(db, "OUVRAGES", doc.Volumes[j], function() {
									update_counter++;
									
									if (update_counter === doc.Volumes.length) {
										insertManyDocuments(db, "TAGS", doc.Tags, function() {
											
										});
										
										db.collection(col).insertOne(doc, function(err, result) {
											assert.equal(err, null);
											console.log("Ajout dans " + col + ".");
											callback(result);
										});
									}
								});
							}
						}
					}
				});
			}
		}
	} else {
		db.collection(col).insertOne(doc, function(err, result) {
			assert.equal(err, null);
			console.log("Ajout dans " + col + ".");
			callback(result);
		});
	}
}

var insertManyDocuments = function(db, col, docs, callback) 
{
	db.collection(col).insertMany(docs, function(err, result) {
		assert.equal(err, null);
		console.log("Ajouts dans " + col + ".");
		callback(result);
	});
}

var updateDocument = function(db, col, doc, callback) 
{
	if (col === "OUVRAGES" && doc.Auteurs !== undefined && doc.Auteurs.length >= 0) {
		var update_counter = 0;
		for(var i = 0 ; i < doc.Auteurs.length ; i++) {
			var auteur = doc.Auteurs[i];
			
			if (doc.Auteurs[i]._id === undefined) {
				insertDocument(db, "AUTEURS", doc.Auteurs[i], function(na) {
					auteur = na;
					update_counter++;
					
					if (update_counter === doc.Auteurs.length) {
						insertManyDocuments(db, "TAGS", doc.Tags, function() {
											
						});
						
						db.collection(col).updateOne({ _id: doc._id }, doc, function(err, result) {
							assert.equal(err, null);
							console.log("Mise a jour dans AUTEURS.");
							callback();
						});
					}
				});
			} else {
				updateDocument(db, "AUTEURS", doc.Auteurs[i], function() {
					update_counter++;
					
					if (update_counter === doc.Auteurs.length) {
						insertManyDocuments(db, "TAGS", doc.Tags, function() {
											
						});
						
						doc._id = ObjectID(doc._id);
						db.collection(col).updateOne({ _id: doc._id }, doc, function(err, result) {
							assert.equal(err, null);
							console.log("Mise a jour d\'un auteur dans " + col + ".");
							callback();
						});
					}
				});

			}
			
			doc._id = ObjectID(doc._id);
			db.collection(col).updateOne({ _id: doc._id }, doc, function(err, result) {
				assert.equal(err, null);
				console.log("Mise a jour dans " + col + ".");
				callback();
			});
		}
	} else {
		doc._id = ObjectID(doc._id);
		db.collection(col).updateOne({ _id: doc._id }, doc, function(err, result) {
			assert.equal(err, null);
			console.log("Mise a jour dans " + col + ".");
			callback();
		});
	}
}

var deleteDocument = function(db, col, doc, callback) 
{
	db.collection(col).deleteOne(doc._id, function(err, result) {
		assert.equal(err, null);
		console.log("Suppression dans " + col + ".");
		callback();
	});
}

var findDocument = function(db, col, params, callback) 
{
	db.collection(col).findOne(params, function(err, result) {
		assert.equal(err, null);
		console.log("Recherche dans " + col + ".");
		callback(result);
	});
}

var findAllDocuments = function(db, col, callback) 
{
	db.collection(col).find().toArray(function(err, result) {
		assert.equal(err, null);
		console.log("Recherche dans " + col + ".");
		callback(result);
	});
}

var sendError = function(errCode, errString, response)
{
	response.writeHead(errCode, {"Content-Type": "text/HTML"});
	response.write(errString + "\n");
	response.end();
	return;
}
 
var sendFile = function(err, file, response, contentType)
{
	if(err) return sendError(500, err, response);
	response.writeHead(200, contentType);
	if (contentType === {"Content-Type": "application/json"}) response.write(file);
	response.write(file, "binary");
	response.end();
}
 
var getFile = function(exists, response, localpath)
{
	if(!exists) return sendError(404, '404 Not Found', response);
	var fileExt = localpath.substring(localpath.indexOf('.'));
	var contentType = {"Content-Type": "text/plain"};
	
	if (fileExt === '.json') contentType = {"Content-Type": "application/json"};
	if (fileExt === '.html') contentType = {"Content-Type": "text/HTML"};
	if (fileExt === '.css') contentType = {"Content-Type": "text/css"};
	fs.readFile(localpath, "binary",
		function(err, file){ sendFile(err, file, response, contentType) });
}

var getFilename = function(request, response)
{
	var urlpath = url.parse(request.url).pathname; // following domain or IP and port
	var localpath = path.join(process.cwd(), urlpath); // if we are at root
	
	// Information envoyée par le client
	if (request.method == 'POST') {
		if (urlpath.match('^\/file\/')) {
			var form = new formidable.IncomingForm();
			form.uploadDir = path.join(__dirname, '/images/' + urlpath.substring(6) + 's');
			
			form.on('file', function(field, file) {
				fs.stat((file.path, path.join(form.uploadDir, file.name)), function(err, stat) {
					if(err == null) {
						console.log('File exists');
						fs.unlink(file.path, function(err) {
							if (err) throw err;
							console.log('successfully deleted : ' + file.path);
						});
					} else if(err.code == 'ENOENT') {
						// file does not exist
						fs.rename(file.path, path.join(form.uploadDir, file.name));
					} else {
						console.log('Some other error: ', err.code);
					}
				});
				
				// fs.rename(file.path, path.join(form.uploadDir, file.name));
				response.write(path.join('images/' + urlpath.substring(6) + 's', file.name));
			});
			
			// log any errors that occur
			form.on('error', function(err) {
				console.log('An error has occured: \n' + err);
			});

			// once all the files have been uploaded, send a response to the client
			form.on('end', function() {
				response.end();
			});
			
			form.parse(request);
		}
		
        console.log("POST");
        var body = null;
		request.on('data', function (data) {
			if (body === null) body = data;
			else body += data;
        });
		
		// Construction de la réponse à envoyer au client
        request.on('end', function () {
			if (urlpath.match('^\/data\/')) {
				var col = urlpath.substring(urlpath.indexOf('=')+1).toUpperCase();
				
				if (urlpath.match('add')) {
					mongoClient.connect(databaseUrl, function(err, db) {
						assert.equal(null, err);
						insertDocument(db, col, JSON.parse(body), function(res) {
							db.close();
							
							response.writeHead(200, {"Content-Type": "application/json"});
							if (res == null) {
								console.log("No data added !");
							} else {
								response.write(JSON.stringify(res));
							}
							response.end();
						});
					});
				} else if (urlpath.match('update')) {
					if (col == 'UTILISATEURS') {
						session(request, response, function() {
							mongoClient.connect(databaseUrl, function(err, db) {
								assert.equal(null, err);
								findDocument(db, col, { 'Pseudo': request.authentication.user }, function(res) {
									if (res) {
										var fieldsToUpdate = JSON.parse(body);
										for(param in fieldsToUpdate) {
											res[param] = fieldsToUpdate[param];
										}
										
										updateDocument(db, col, res, function() {
											db.close();
										});
										
										request.authentication.biblio = res.Biblio;
									}
								});
							});
						});
					} else {
						mongoClient.connect(databaseUrl, function(err, db) {
							assert.equal(null, err);
							updateDocument(db, col, JSON.parse(body), function() {
								db.close();
							});
						});	
					}
				} else if (urlpath.match('delete')) {
					mongoClient.connect(databaseUrl, function(err, db) {
						assert.equal(null, err);
						updateDocument(db, col, JSON.parse(body), function() {
							db.close();
						});
					});
				} else if (urlpath.match('find')) {
					mongoClient.connect(databaseUrl, function(err, db) {
						assert.equal(null, err);
						findDocument(db, col, JSON.parse(body), function(res) {
							db.close();
							
							if (res && col == 'UTILISATEURS') {
								session(request, response, function(){
									console.log('User : ' + res.Pseudo + ' in session !');
									request.authentication.user = res.Pseudo;
									request.authentication.biblio = res.Biblio ? res.Biblio : [];
								});
							}
							
							response.writeHead(200, {"Content-Type": "application/json"});
							if (res == null) {
								console.log("No data found !");
							} else {
								response.write(JSON.stringify(res));
							}
							response.end();
						});
					});
				}
				// TODO : Recherche de plusieurs éléments sur un critère
			} else {
				console.log('Aucune operation effectuée.');
			}
        });
    }
	
	if (request.method == 'GET') {
		// Recherche sans paramètre (Nécessaire ?)  ==>  Problèmes de performances avec beaucoup de données ???
		if (urlpath.match('^\/data\/')) {
			if (urlpath.match('\/Params:')) {
				var col = urlpath.substring(urlpath.indexOf('=')+1, urlpath.search('\/Params:')).toUpperCase();
				
				var str_params = urlpath.substring(urlpath.indexOf(':')+1);
				var arr_params = str_params.split('&');
				var params = {}
				for (var i = 1 ; i < arr_params.length; i++) {
					params[arr_params[i].substring(0, arr_params[i].indexOf('='))] = arr_params[i].substring(arr_params[i].indexOf('=')+1);
				}
				
				mongoClient.connect(databaseUrl, function(err, db) {
					assert.equal(null, err);
					findDocument(db, col, params, function(res) {
						db.close();
						
						response.writeHead(200, {"Content-Type": "application/json"});
						if (res == null) {
							console.log("Problem encountered while connecting to the database ! " + urlpath);
						} else {
							response.write(JSON.stringify(res));
						}
						response.end();
					});
				});
			} else {
				var col = urlpath.substring(6).toUpperCase();
			
				mongoClient.connect(databaseUrl, function(err, db) {
					assert.equal(null, err);
					findAllDocuments(db, col, function(res) {
						db.close();
						
						response.writeHead(200, {"Content-Type": "application/json"});
						if (res == null) {
							console.log("Problem encountered while connecting to the database !");
						} else {
							response.write(JSON.stringify(res));
						}
						response.end();
					});
				});
			}
		} else if (urlpath.match('^\/session')) {
			session(request, response, function() {
				response.writeHead(200, {"Content-Type": "application/json"});
				response.write(request.authentication ? JSON.stringify(request.authentication) : 'null');
				response.end();
				console.log('SESSION : ' + request.authentication.user);
			});
		} else {
			// Recherche de fichier sur le serveur à partir de l'url fournie
			fs.exists(localpath, function(result) { 
				getFile(result, response, localpath); 
			});
			
			//response.write({ user: request.user ? JSON.stringify(request.user.username) : null });
		}	
	}
}
 
var server = http.createServer(getFilename);
server.listen(process.env.PORT || 8080);
console.log("Server available on port 8080...");

/*
var listener = io.listen(server);

listener.sockets.on('connection', function(socket){
	socket.on('checkLogin', function(data, callback) {
		session(request, response, function(){
			console.log(request.authentication.user);
			callback(request.authentication.user);
			// TODO : vérifier que la connexion est bonne
			//socket.emit('login', { user: request.authentication.user });
		});
	});
});
*/