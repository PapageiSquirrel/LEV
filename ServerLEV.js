// Chargement des modules complémentaires
http = require("http"),
path = require("path"),
url = require("url"),
fs = require("fs");

databaseUrl = "mongodb://lev_user:lev_pass@ds147497.mlab.com:47497/db_lev";

mongoClient = require("mongodb").MongoClient;
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
						db.collection(col).insertOne(doc, function(err, result) {
							assert.equal(err, null);
							console.log("Ajout dans " + col + ".");
							callback(result);
						});
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
						db.collection(col).updateOne({ _id: doc._id }, doc, function(err, result) {
							assert.equal(err, null);
							console.log("Mise a jour dans " + col + ".");
							callback();
						});
					}
				});
			} else {
				updateDocument(db, "AUTEURS", doc.Auteurs[i], function() {
					update_counter++;
					
					if (update_counter === doc.Auteurs.length) {
						db.collection(col).updateOne({ _id: doc._id }, doc, function(err, result) {
							assert.equal(err, null);
							console.log("Mise a jour dans " + col + ".");
							callback();
						});
					}
				});
			}
			
		}
	} else {
		db.collection(col).replaceOne({ _id: doc._id }, doc, {upsert: true}, function(err, result) {
			assert.equal(err, null);
			console.log("Mise a jour dans " + col + ".");
			callback();
		});
	}
}

var deleteDocument = function(db, col, doc, callback) 
{
	db.collection(col).deleteOne(doc._id , function(err, result) {
		assert.equal(err, null);
		console.log("Suppression dans " + col + ".");
		callback();
	});
}

var findDocument = function(db, col, data, callback) 
{
	db.collection(col).findOne(data, function(err, result) {
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
					mongoClient.connect(databaseUrl, function(err, db) {
						assert.equal(null, err);
						updateDocument(db, col, JSON.parse(body), function() {
							db.close();
						});
					});
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
		} else {
			// Recherche de fichier sur le serveur à partir de l'url fournie
			fs.exists(localpath, function(result) { 
				getFile(result, response, localpath); 
			});
		}	
	}
}
 
var server = http.createServer(getFilename);
server.listen(8080);
console.log("Server available...");