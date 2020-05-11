const fs = require("fs");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser")
const { spawn } = require('child_process');

const moduleOctave = require('./octave');
const moduleStats = require('./stats');

const app = express();
const port = 6789;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('./favicon.ico', express.static('favicon.ico'));


app.get('/', (req, res) => {
	res.render('piano', {});
});

app.get('/about', (req, res) => {
	res.render('about', {});
});

app.get('/demo', (req, res) => {
	res.render('demo', {});
});


app.get('/stats', (req, res) => {
	// FILE 2
	// res.send(moduleStats.getServerStats())
	res.render('stats', moduleStatsgetServerStats());
});


///////////////////////////////////////////
let octave = 5;
let theme = 0;
let isNote = 0;

function buzz(res, tile) {
	let freq;
	if(tile != -1){
		freq = moduleOctave[octave - 1][tile];
	}
	else{
		freq = 0;
	}
	console.log("buzz: " + freq);
	fs.writeFileSync("python/shared_memory.txt", freq)
	res.send("ok");
}


app.get("/c_note", (req, res) => {
	buzz(res, 0);
});

app.get("/cs_note", (req, res) => {
	buzz(res, 1);
});

app.get("/d_note", (req, res) => {
	buzz(res, 2);
});

app.get("/ds_note", (req, res) => {
	buzz(res, 3);
});

app.get("/e_note", (req, res) => {
	buzz(res, 4);
});

app.get("/f_note", (req, res) => {
	buzz(res, 5);
});

app.get("/fs_note", (req, res) => {
	buzz(res, 6);
});

app.get("/g_note", (req, res) => {
	buzz(res, 7);
});

app.get("/gs_note", (req, res) => {
	buzz(res, 8);
});

app.get("/a_note", (req, res) => {
	buzz(res, 9);
});

app.get("/as_note", (req, res) => {
	buzz(res, 10);
});

app.get("/b_note", (req, res) => {
	buzz(res, 11);
});

app.get("/off", (req, res) => {
	buzz(res, -1);
});



app.post("/set_octave", (req, res) => {
	console.log(req.body);
	octave = req.body.selected_octave;
	res.send("ok");
});

app.post("/set_theme", (req, res) => {
	console.log(req.body);
	theme = req.body.selected_theme;
	res.send("ok");
});

app.post("/set_isNote", (req, res) => {
	console.log(req.body);
	isNote = req.body.isNote;
	res.send("ok");
});

app.get("/refresh", (req, res) => {
	res.send({ octave: octave, theme: theme, isNote: isNote })
});


//////////////
console.log("Server starts...")

const pythonProcess = spawn('python3', ['python/buzz.py', 0]);



app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:${port} `));

process.on('SIGINT', function () {
	pythonProcess.kill("SIGINT");
	console.log("Server stops...");
	process.exit();
});
