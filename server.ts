// Chargement des modules complémentaires
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

const formidable = require('formidable');

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const helmet = require('helmet');

// TODO : LOGGER
/*
const Console = require('console').Console;
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// custom simple logger
const logger = new Console(output, errorOutput);
*/

// TODO : DATABASE (POSTGRESQL)
const initOptions = {/* initialization options */};
const pgp = require('pg-promise')(initOptions);
const db = pgp('postgres://postgres:passuper@localhost:5432/acclarar_LEV2');
/*
// databaseUrl = "mongodb://lev_user:lev_pass@ds147497.mlab.com:47497/db_lev";
const databaseUrl = "mongodb://lev_user:lev_pass@ds111066.mlab.com:11066/db_lev_dev";
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;
*/
const app = express();

app.use(cors({origin: 'http://localhost:4200', credentials: true}));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
app.use(session({
  secret: 'my express secret',
  cookie: {maxAge: 60000 },
  store: new FileStore()
}));

app.post('/file/', function(request, response) {
	/*
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
	*/
}).post('/api/data/:collection/add/:key', function(request, response) {
	let col = request.params.collection;
	let get_key = request.params.key;
	let new_item = request.body;

	let keys = [];
	let values = [];
	// Structure the query 
	for(var key in new_item) {
		if (key !== get_key) {
			keys.push(key);
			values.push(new_item[key]);
		}
	}

	try {
		db.one('INSERT INTO ${collection:name}(${columns:name}) VALUES(${values:list}) RETURNING id', {
		    columns: keys,
		    values: values,
		    collection: col,
		    id_key: get_key
		})
		.then(data => {
        	console.log(data);
        	// RETURN ID IN THE RESPONSE TO THE CLIENT
	    })
	    .catch(error => {
	        console.log(error);
	    });

		// TODO : Mise en session de l'utilisateur
		
	} catch(e) {
		console.log(e);
	}
	response.end();
}).post('/api/data/:collection/update/:key', function(request, response) {
	let col = request.params.collection;
	let get_key = request.params.key;
	let updated_item = request.body;
	/*
	let where_condition = { 'key': '', 'value': ''};

	let pairs = [];
	// Structure the query 
	for(var key in updated_item) {
		if (key !== get_key) {
			pairs.push({ 'key': key, 'value': updated_item[key] });
		} else {
			where_condition.key = key;
			where_condition.value = updated_item[key];
		}
	}
	*/
	const query = pgp.helpers.update(updated_item, null, col) + ' WHERE ' + get_key + ' = ' + updated_item[get_key];
	db.none(query)
	.then(() => {
    	
    })
    .catch(error => {
        console.log(error);
    });;
}).post('/api/data/:collection/delete', function(request, response) {
	let col = request.params.collection;
	let pair_id = request.body;

	db.none('DELETE FROM ${collection:name} WHERE ${pair_id:name} = ${pair_id:value}', {
		collection: col,
		pair_id: pair_id
	})
	.then(() => {
    	
    })
    .catch(error => {
        console.log(error);
    });;
}).post('/api/data/:collection/find', function(request, response) {
	let col = request.params.collection;
	let pair_id = request.body;

	db.one('SELECT * FROM ${collection:name} WHERE ${pair_id:name} = ${pair_id:value}', {
		collection: col,
		pair_id: pair_id
	})
	.then(() => {
    	
    })
    .catch(error => {
        console.log(error);
    });;
}).post('/api/auth', function(request, response) {
	let col = '';
	let data = request.body;
	if (request.session.utilisateur) {
		response.json(request.session.utilisateur);
		response.end();
	} else if (data.pseudo != '' && data.motdepasse != '') {
		db.one('SELECT * FROM UTILISATEURS WHERE pseudo = $1 AND motdepasse = $2', [
			data.pseudo, 
			data.motdepasse
		])
		.then(utilisateur => {
	    	request.session.utilisateur = utilisateur;
	    	response.json(utilisateur);
	    	response.end();
	    })
	    .catch(error => {
	    	// TODO : Renvoyer erreur
	        console.log(error);
	        response.end();
	    });
	} else {
		response.end();
	}
}).post('*', function(request, response) {
	
}).get('/api/data/:collection/Params', function(request, response) { // TODO : Add params in request

}).get('/api/join', function(request, response) {
	let cols = request.query.collections;
	let keys = request.query.keys;
	db.task(t => {
		return t.map('SELECT * FROM $1:name', cols[0], i => {
	        return t.any('SELECT * FROM $1:name WHERE $2:name = $3', [cols[1], keys[1], i[keys[0]]])
	            .then(items => {
	                i[cols[1]] = items;
	                return i;
	            });
    	}).then(t.batch)
    })
    .then(data => {
        response.json(data);
        response.end();
    })
    .catch(error => {
        console.log(error);
        response.end();
    });
}).get('/api/data/:collection', function(request, response) {
	let col = request.params.collection;
	db.any('SELECT * FROM ${collection:name}', {
		collection: col
	})
	.then(items => {
    	response.json(items);
    	response.end();
    })
    .catch(error => {
    	// TODO : Renvoyer erreur
        console.log(error);
        response.end();
    });
}).get('/api/biblio', function(request, response) {
	db.task(t => {
		return t.map('SELECT * FROM ouvrages', o => {
	        return t.batch([
	        	t.any('SELECT * FROM auteurs INNER JOIN auteurs_ouvrages ON auteurs.auteurid = auteurs_ouvrages.auteurid WHERE ouvrageid = $1', [o.ouvrageid])
		            .then(auteurs => {
		                o.auteurs = auteurs;
		                return o;
		            }),
		        t.any('SELECT * FROM editions INNER JOIN ouvrages_editions ON editions.editionid = ouvrages_editions.editionid WHERE ouvrageid = $1', [o.ouvrageid])
		            .then(editions => {
		                o.editions = editions;
		                return o;
		            }),
		        t.any('SELECT nomtag FROM tags_ouvrages WHERE ouvrageid = $1', [o.ouvrageid])
		            .then(tags => {
		                o.tags = tags;
		                return o;
		            })
	    	]);
    	});
    })
    .then(data => {
        response.json(data);
        response.end();
    })
    .catch(error => {
        console.log(error);
        response.end();
    });
}).get('/session/', function(request,response) {
	response.json(request.session);
}).get('*', function(request, response) {
	response.sendFile('index.html', { root: __dirname });
});

app.listen(process.env.PORT || 3000);
console.log("Server available on port 3000...");