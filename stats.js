const { execSync } = require("child_process");

exports.getServerStats = function () {

    // let temp = execSync("/usr/bin/vcgencmd measure_temp").toString();
    // let frq = execSync("/usr/bin/vcgencmd measure_clock arm").toString();
    // let volts = execSync("/usr/bin/vcgencmd measure_volts core").toString();
    // let percentage  = execSync("free | grep Mem | awk '{print $3/$2 * 100.0}'").toString();
    // let ram = execSync("/usr/bin/vcgencmd get_mem arm").toString();
    // let video = execSync("/usr/bin/vcgencmd get_mem gpu").toString();
    // let ip = execSync("hostname -I | awk '{print $1}'").toString()
    // let ipGlobal  = execSync("host myip.opendns.com resolver1.opendns.com | grep \"myip.opendns.com has\" | awk '{print $4}'").toString();
    // let df = execSync("df | grep root").toString();
    // temp = temp.split("=")[1].split("'")[0];
    // frq = frq.split("=")[1]/1000000;
    // volts = volts.split("=")[1].substr(0,3);
    // ram = ram.split("=")[1].split("M")[0];
    // video = video.split("=")[1].split("M")[0];
    // percentage = percentage.substr(0, 5);
    // dfPrecentage = df.split(/\s+/)[4]; 
    // dfTotal = parseInt(df.split(/\s+/)[1])/1000000;
    // dfAvail = parseInt(df.split(/\s+/)[3])/1000000;
    // dfUsed = parseInt(df.split(/\s+/)[2])/1000000;

    // return {temp: temp, frq: frq, volts:volts, ram:ram, percentage :percentage, video:video,
    //     ip:ip, ipGlobal:ipGlobal, dfTotal:dfTotal, dfUsed: dfUsed, dfAvail:dfAvail, dfPrecentage: dfPrecentage};

    console.log("Stats.js");

    return {a:"Ana", b:"Maria"}
}
