const express = require('express');
const fs = require("fs");
const app = express();
app.use(express.static('public'));

app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 //res.sendFile( __dirname + "/" + "01_form.html" );

 fs.readFile( __dirname + "/public/html/" + "01_form.html", 'utf8', function (err, data) {
 console.log( data );
 res.end( data );
 });
})

app.get('/membres', (req, res) => {
 fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
 console.log( data );
 transforme_en_tableau(JSON.parse(data));
 res.end( data );
 });
})


app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})


let reponse = {};

app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')


// on utilise l'objet req.query pour récupérer les données GET
 reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel
 };

 console.log(reponse);
 //reponse = JSON.stringify(reponse);



fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
 if (err) throw err;
 let tab = JSON.parse(data);
 tab.push(reponse);
 let json = JSON.stringify(tab);

 fs.writeFile(__dirname + "/public/data/" + "adresses.json", json, function(err, data) {
	if (err) throw err;
 	console.log('Terminé');
 })

 res.end();
 });





/*
 let membres = fs.readFileSync('public/data/adresses.json');
 JSON.stringify(membres);
fs.appendFile('unfichier.txt', membres + ',' + reponse, function (err) {
  if (err) throw err;
  console.log('Sauvegardé');
});


 let nouveauMembre = fs.readFileSync('unfichier.txt');
 JSON.parse('[' + nouveauMembre + ']');
 console.log('++++++++++');
 console.log(nouveauMembre);*/

 /*

fs.appendFile('ajout.txt', ',' + JSON.stringify(reponse), function(err){
		if(err) throw err;
})

*/

 fs.writeFile ("public/data/ajout.json", reponse, (err) => {
	 if (err) throw err;
	 console.log('Terminé');
	 });


 let data = fs.readFileSync('public/data/adresses.json');
 console.log("*********************************************");
 console.log(reponse);
 console.log("*********************************************");
 //copyData("public/data/ajout.json", "public/data/adresses.json");

 res.end();

})

/*
function copyData(source, destination) {
 fs.readFile(source, 'utf8',  (err, data) => {
 if (err) throw err;
 //Récupérer données du fichier dans lequel on veut ajouter
 let membres = fs.readFileSync('public/data/adresses.json');

 membres = JSON.parse(membres);
console.log('++');
console.log(data);
 membres.push(JSON.parse(data));
 console.log("*********************************************");
 console.log(membres);
 console.log(membres[3]);
 console.log("*********************************************");

 // Effectuer un traitement modifier data
	 fs.writeFile (destination, membres, (err) => {
	 if (err) throw err;
	 console.log(membres);
	 console.log('Terminé');
	 });
 });
}
*/

//data = JSON.parse(data);
//data = JSON.stringify(data);
//console.log(data);


const transforme_en_tableau = (collection) =>
{
	
	let chaine = '<table>';
	for (elm of collection) {

		for(p in elem) {

		}


	}

	chaine += '</table>';
	return chaine;

}



var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})