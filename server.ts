// Chargement des modules complémentaires
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

const formidable = require('formidable');

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const session = require('express-session')
const helmet = require('helmet');

// TODO : SESSION UTILISATEUR
/*
session = sessions({
  cookieName: 'authentication',
  secret: 'personalsecretsessionofmine', 
  duration: 30 * 60 * 1000, 
  activeDuration: 1000 * 60 * 5
});
*/

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

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
app.use(session({
  secret: 'mysecretphrasetoputhere',
  resave: false,
  // cookie: { secure: true }
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
}).post('/api/:collection/add', function(request, response) {
	let col = request.params.collection;
	let new_item = request.body;

	let keys = [];
	let values = [];
	// Structure the query 
	for(var key in new_item) {
		if (key !== 'id') {
			keys.push(key);
			values.push(new_item[key]);
		}
	}

	try {
		db.none('INSERT INTO ${collection:name}(${columns:name}) VALUES(${values:name})', {
		    columns: keys,
		    values: values,
		    collection: col    
		});
	} catch(e) {
		console.log(e);
	}

	// TODO : Mise en session de l'utilisateur
}).post('/api/:collection/update', function(request, response) {

}).post('/api/:collection/delete', function(request, response) {

}).post('/api/:collection/find', function(request, response) {
	
}).post('*', function(request, response) {
	
}).get('/api/:collection/Params', function(request, response) { // TODO : Add params in request
	
}).get('/api/:collection', function(request, response) {
	
}).get('/session/:user', function(request,response) {
	response.json(request.session);

	if (request.session.user) {
		console.log('SESSION : ' + request.session.user);
	} else {
		console.log('SESSION : INVITE');
	}
}).get('*', function(request, response) {
	response.sendFile('index.html', { root: __dirname });
});

app.listen(process.env.PORT || 3000);
console.log("Server available on port 3000...");