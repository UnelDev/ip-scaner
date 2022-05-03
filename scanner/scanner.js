import scan1Step from './1lastStep.js';
import scan2Step from './2lastSteps.js';
import scan3Step from './2lastSteps.js';
import scan4Step from './2lastSteps.js';
import * as os from 'os';

/* cette classe va permetre de recuperer l'ip local,
elle va grace a la classe check tester quelle ip sont utilisiée*/
class Scanner {
	constructor() {
		this.localIp = this.getIp();
		this.numberFile = 0;
	}
	getIp() {
		/* on recupere l'ip du pc grace a la lib os*/
		var interfaces = os.networkInterfaces();
		var addresses = [];
		for (var k in interfaces) {
			for (var k2 in interfaces[k]) {
				var address = interfaces[k][k2];
				if (address.family === 'IPv4' && !address.internal) {
					addresses.push(address.address);
				}
			}
		}
		return addresses;
	}
	scan(nbSteps) {
		if (nbSteps == 1) {
			this.control(scan1Step(this.localIp));
		} else if (nbSteps == 2) {
			this.control(scan2Step(this.localIp));
		} else if (nbSteps == 3) {
			this.control(scan3Step(this.localIp));
		} else if (nbSteps == 4) {
		}
	}


	control(ip) {
		/* on va controlée les resultat de la fonction check.ping
		on va aficher uniquemment les ip qui sont up*/
		console.clear();
		console.log('control results... please wait');
		const up = [];
		for (let i = 0; i < ip.length; i++) {
			if (ip[i][1] == true) {
				up.push(ip[i]);
			}
		}
		up.sort();
		console.clear();
		for (let i = 0; i < up.length; i++) {
			if (up[i][0] != this.localIp) {
				console.log('ip: ' + up[i][0] + ' is up');
			} else {
				console.log('ip: ' + up[i][0] + ' is up (your local ip)');
			}
		}
	}
}


export default Scanner;