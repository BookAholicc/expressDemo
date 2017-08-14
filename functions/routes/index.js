const express=require('express');
const functions = require('firebase-functions');
const app=express();
var router = express.Router();
var admin = require("firebase-admin");
var db = admin.database();
var User = require('../models/users');


router.get('/timestamps',(req,res)=>{
	//console.log("deepak");
	res.send(`${Date.now()}`);
});


router.get('/', (req,res)=>{

	getFacts().then(facts=>
	{
			res.json(facts);	
	})
});


router.post('/update',(req,res)=>{
		var newname = {
			name : 'Dipak'
		};
		console.log(newname);
		updateUser(newname);

});

function getFacts(){
	const ref=db.ref('fact');
	return ref.once('value').then(snap=>snap.val());
}


function updateUser(newname){
		console.log(newname);
		var factsRef = db.ref("/fact/name");
		factsRef.update(newname,err =>{
			if(err){
				console.log("Error");
			}
			else{
				console.log("No Error");
			}
		})
}


exports.notify = functions.database.ref('/fact/name').onWrite(snap =>{

console.log("Function called");
});

module.exports = router;