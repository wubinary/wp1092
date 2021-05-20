// MongoDB
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
dotenv.config();
const db = mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Models
import User from './models/user.js';
import ScoreCard from './models/ScoreCard.js';

const findCard = async (name, subject) => {
	const existing = await ScoreCard.findOne({name, subject}, (err, user)=>{
		if (err) return false;
		else return true;
	});
	return existing;
}

const queryCard = async (type, string) => {
	if (type === 'name') {
		const name=string;
		const existing = await ScoreCard.find({name}, (err)=>{if(err) return false; return true});
		return existing;
	}
	if (type === 'subject') {
		const subject=string;
		const existing = await ScoreCard.find({subject}, (err)=>{if(err) return false; return true});
		return existing;
	}
	return [];
}

const clear = async () => {
	const done = await ScoreCard.remove({}, (err)=>{if(err) return false; return true})
	return done;
}

// Server
import express from "express";
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//TODO:
app.get('/api/clear', async (req, res) => {
	await clear();
	res.status(200).send({message: "Database cleared"});
	// console.log('[API] post clear');
})

app.post('/api/create-card', async (req, res) => {
	const data = req.body;
	// console.log(data);
	const existing = await findCard(data['name'], data['subject']);
	if (!existing) {
		const card = await ScoreCard.create(data, (err)=>{
			if(err) console.log("\t[Error] /api/create-card ")
			else console.log("\t[Info] "+data+" created")
		})
		res.status(200).send({message: "Adding("+data['name']+","+data['subject']+","+data['score']+")", card});
	} else {
		const update = await ScoreCard.updateOne({name:data['name'], subject:data['subject']}, {score:data['score']});
		const card = await findCard(data['name'], data['subject']);
		res.status(200).send({message: "exist, Update("+data['name']+","+data['subject']+","+data['score']+")", card});
	}
})

app.post('/api/query', async (req, res)=>{
	console.log(req.body);
	const queryType = req.body['queryType'], queryString = req.body['queryString'];
	const results = await queryCard(queryType, queryString);
	if (results.length === 0) {
		res.status(200).send({ message: queryType+" ("+queryString+") not found !"});
	} else {
		var messages = results.map(e => 'ScoreCard('+e['name']+','+e['subject']+','+e['score']+')')
		res.status(200).send({messages, message: "success"});
	}
})

app.get('/api/find/:name', async (req, res)=>{
	const existing = await findCard(req.params.name);
	console.log(existing);
	res.status(200).send({message:existing});
})

const port = process.env.PORT || 5000;
const server = app.listen(port, ()=>{
	console.log('Start server on port ' + server.address().port)
});