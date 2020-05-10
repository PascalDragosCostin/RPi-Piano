const fs = require("fs");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser")
const { spawn } = require('child_process');
const { execSync } = require("child_process");


const app = express();

const port = 6789;

// directorul "views" va conține fișierele .ejs (html + js executat la server)
app.set("view engine", "ejs");
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul "public" va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static("public"))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
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
	let temp = execSync("/usr/bin/vcgencmd measure_temp").toString();
	let frq = execSync("/usr/bin/vcgencmd measure_clock arm").toString();
	let volts = execSync("/usr/bin/vcgencmd measure_volts core").toString();
	let ram = execSync("/usr/bin/vcgencmd get_mem arm").toString();
	let video = execSync("/usr/bin/vcgencmd get_mem gpu").toString();
	let ip = execSync("hostname -I | awk '{print $1}'").toString()
	let percentage  = execSync("awk '/^Mem/ {printf(" + "%u%%" + ", 100*$3/$2);}' <(free -m)'").toString();
	temp = temp.split("=")[1].split("'")[0];
	frq = frq.split("=")[1]/1000000;
	volts = volts.split("=")[1].substr(0,3);
	ram = ram.split("=")[1].split("M")[0]
	video = video.split("=")[1].split("M")[0]
	console.log(temp)
	console.log(frq)
	console.log(volts)
	console.log(ram)
	console.log(video)
	console.log(ip)
	res.render('stats', {temp: temp, frq: frq, volts:volts, ram:ram, percentage :percentage , video:video, ip:ip });
});


///////////////////////////////////////////
let c1 = 33;
let cs1 = 35;
let d1 = 37;
let ds1 = 39;
let e1 = 41;
let f1 = 44;
let fs1 = 46;
let g1 = 49;
let gs1 = 52;
let a1 = 55;
let as1 = 58;
let b1 = 62;
let c2 = 65;
let cs2 = 69;
let d2 = 73;
let ds2 = 78;
let e2 = 82;
let f2 = 87;
let fs2 = 93;
let g2 = 98;
let gs2 = 104;
let a2 = 110;
let as2 = 117;
let b2 = 123;
let c3 = 131;
let cs3 = 139;
let d3 = 147;
let ds3 = 156;
let e3 = 165;
let f3 = 175;
let fs3 = 185;
let g3 = 196;
let gs3 = 208;
let a3 = 220;
let as3 = 233;
let b3 = 247;
let c4 = 262;
let cs4 = 277;
let d4 = 294;
let ds4 = 311;
let e4 = 330;
let f4 = 349;
let fs4 = 370;
let g4 = 392;
let gs4 = 415;
let a4 = 440;
let as4 = 466;
let b4 = 494;
let c5 = 523;
let cs5 = 554;
let d5 = 587;
let ds5 = 622;
let e5 = 659;
let f5 = 698;
let fs5 = 740;
let g5 = 784;
let gs5 = 831;
let a5 = 880;
let as5 = 932;
let b5 = 988;
let c6 = 1047;
let cs6 = 1109;
let d6 = 1175;
let ds6 = 1245;
let e6 = 1319;
let f6 = 1397;
let fs6 = 1480;
let g6 = 1568;
let gs6 = 1661;
let a6 = 1760;
let as6 = 1865;
let b6 = 1976;
let c7 = 2093;
let cs7 = 2217;
let d7 = 2349;
let ds7 = 2489;
let e7 = 2637;
let f7 = 2794;
let fs7 = 2960;
let g7 = 3136;
let gs7 = 3322;
let a7 = 3520;
let as7 = 3729;
let b7 = 3951;

let octave = 1;
let theme = 0;

let octave1 = [c1, cs1, d1, ds1, e1, f1, fs1, g1, gs1, a1, as1, b1];
let octave2 = [c2, cs2, d2, ds2, e2, f2, fs2, g2, gs2, a2, as2, b2];
let octave3 = [c3, cs3, d3, ds3, e3, f3, fs3, g3, gs3, a3, as3, b3];
let octave4 = [c4, cs4, d4, ds4, e4, f4, fs4, g4, gs4, a4, as4, b4];
let octave5 = [c5, cs5, d5, ds5, e5, f5, fs5, g5, gs5, a5, as5, b5];
let octave6 = [c6, cs6, d6, ds6, e6, f6, fs6, g6, gs6, a6, as6, b6];
let octave7 = [c7, cs7, d7, ds7, e7, f7, fs7, g7, gs7, a7, as7, b7];


octave_array = [octave1, octave2, octave3, octave4, octave5, octave6, octave7];
////////////////////
// app.get("/c_note", (req, res) => {
// 	// console.log("C")
// 	// console.log(octave_array[octave-1][0])

// 	var pythonMessage;
// 	// spawn new child process to call the python script
// 	const python = spawn('python', ['buzz.py', "ana"]);
// 	// collect data from script
// 	python.stdout.on('data', function (data) {
// 		pythonMessage = data.toString();
// 		console.log(pythonMessage);
// 	});
// 	// in close event we are sure that stream from child process is closed
// 	python.on('close', (code) => {
// 		console.log(`child process close all stdio with code ${code}`);
// 		// send data to browser
// 		res.send(pythonMessage)
// 	});
// });
///

// var isFirst = true;
// var buzzer = { pin16: 0, pin18: 0 }
function buzz(res, freq) {
	// var pin;
	// if (freq != 0) {
	// 	isFirst = !isFirst;
	// }
	// if (isFirst) {
	// 	pin = 16;
	// }
	// else {
	// 	pin = 18;
	// }
	console.log("buzz" + freq);
	fs.writeFileSync("python/shared_memory.txt", freq)

	var pythonMessage;
	// spawn new child process to call the python script
	/*const python = spawn('python3', ['python/buzz.py', freq]);
	
	// collect data from script
	python.stdout.on('data', function (data) {
	 
		pythonMessage = data.toString();
		console.log(pythonMessage);
	});
	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
		//console.log(`child process close all stdio with code ${code}`);
		// send data to browser
		res.send(pythonMessage)
	});
	*/
	res.send("ok");

}



app.get("/c_note", (req, res) => {
	buzz(res, octave_array[octave - 1][0]);
});

app.get("/cs_note", (req, res) => {
	buzz(res, octave_array[octave - 1][1]);
});

app.get("/d_note", (req, res) => {
	buzz(res, octave_array[octave - 1][2]);
});

app.get("/ds_note", (req, res) => {
	buzz(res, octave_array[octave - 1][3]);
});

app.get("/e_note", (req, res) => {
	buzz(res, octave_array[octave - 1][4]);
});

app.get("/f_note", (req, res) => {
	buzz(res, octave_array[octave - 1][5]);
});

app.get("/fs_note", (req, res) => {
	buzz(res, octave_array[octave - 1][6]);
});

app.get("/g_note", (req, res) => {
	buzz(res, octave_array[octave - 1][7]);
});

app.get("/gs_note", (req, res) => {
	buzz(res, octave_array[octave - 1][8]);
});

app.get("/a_note", (req, res) => {
	buzz(res, octave_array[octave - 1][9]);
});

app.get("/as_note", (req, res) => {
	buzz(res, octave_array[octave - 1][10]);
});

app.get("/b_note", (req, res) => {
	buzz(res, octave_array[octave - 1][11]);
});


app.get("/off", (req, res) => {
	buzz(res, 0);
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

app.get("/refresh", (req, res) => {
	res.send({ octave: octave, theme: theme })
});

//////////////
console.log("Server starts...")


const pythonProcess = spawn('python3', ['python/buzz.py', 0]);

pythonProcess.stdout.on('data', function (data) {
	pythonMessage = data.toString();
	console.log(pythonMessage);
});


app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:${port} `));


process.on('SIGINT', function () {
	pythonProcess.kill("SIGINT");
	console.log("Server stops...");
	process.exit();
});
