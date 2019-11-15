var express = require('express');
var neode = require('neode');
var app = express();
var bodyParser = require('body-parser');

//app.set('view engine', 'ejsde ');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

// defining instance
const instance = new neode('bolt://localhost:7687', 'neo4j', '12345');

//defining schema
	instance.model('studentData',{
		
		studentName : {
			type : 'string',
			primary : true
		},
		studentDob : {
			type : 'Temporal'
		},
		studentGender : {
			type : 'string'
		}
	});


app.get('/', function(req, res){
   //res.sendFile('C:/Users/Akash Kul/Desktop/Cultrro/index.html');
   res.sendFile('./public/index.html');
});


app.post('/',function(req,res){
	console.log(req.body);

	data = req.body;
	// create / push to database
	instance.create('studentData',{
		studentName : data.sName,
		studentDob : data.sDob,
		studentGender : data.sGen
		}).then(res => {
			console.log("succeess");
			res.send("instance created");	
		}).catch(err=>{
			console.log(`err => ${err}`)
		});
	});

app.post('/delete',function(req,res){
	console.log('data recieve');
	/*instance.find('studentData',{
		studentName: "Akash"
		}).then(resp=>{
			console.log(`resp => ${resp}`);
			res.send(resp)
		}).catch(err=>{
			console.log(`err => ${err}`);
		});*/
		instance.first('studentData',{studentGender : 'f'}).then(resp=>{
			console.log(resp);
			//resp._values[0]._deleted = true
			//resp.delete();
		});
});
app.listen(3000, function(){
		console.log("Running");
	});