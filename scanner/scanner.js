const { stringify } = require('querystring');
const prompt = require('prompt-sync')();
/* cette classe va permetre de recuperer l'ip local,
elle va grace a la classe check tester quelle ip sont utilisiée*/
class Scanner {
	constructor() {
		this.localIp = this.getIp();
		this.numberFile = 0;
		this.remouveFile();
	}
	getIp() {
		/* on recupere l'ip du pc grace a la lib os*/
		const { networkInterfaces } = require('os');
		const nets = networkInterfaces();

		const results = [];
		for (const name of Object.keys(nets)) {
			for (const net of nets[name]) {
				// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
				if (net.family === 'IPv4' && !net.internal) {
					if (!results[name]) {
						results[name] = [];
					}
					results.push(net.address);
				}
			}
		}
		return results;
	}
	scan() {
		/* on  enleve le dernier teme de l'ip,
		on va donc scanner toutes les ip entre 0 et 255 grace a la fonction chek.ping
		on afichera une progress bar pour montrer l'avancemment*/
		const check = require('./check/check.js');
		const _cliProgress = require('cli-progress');
		const baseIp = this.localIp[0].split('.');
		baseIp.pop();
		// on fait la bare de progression
		const progressBar = new _cliProgress.SingleBar({
			format: '{bar} {percentage}% | ETA: {eta}s'
		}, _cliProgress.Presets.shades_classic);
		// on demare la bare de progression
		progressBar.start(255, 0);
		const promises = [];
		for (let i = 0; i <= 255; i++) {
			// pour chaque ip on va faire un ping
			progressBar.update(i);
			const ip = baseIp.join('.') + '.' + i;
			promises.push(check(ip));
		}
		// on attend que toutes les promises soit fini
		progressBar.stop();
		console.clear();
		console.log('processing results... please wait 5s max');
		Promise.all(promises).then(response => {
			console.clear();
			this.control(response);

		});
	}
	scan2Step() {
		/* on  enleve les deux dernier teme de l'ip,
		on va donc scanner toutes les ip entre 0 et 255 . 0 et 255 grace a la fonction chek.ping
		on afichera une progress bar pour montrer l'avancemment*/
		const check = require('./check/check.js');
		const cliProgress = require('cli-progress');
		const baseIp = this.localIp[0].split('.');
		baseIp.pop();
		baseIp.pop();

		// on fait la bare de progression
		const progressBar = new cliProgress.SingleBar({
			format: '{bar} {percentage}% | {value}/{total} ip scanned | ETA: {eta}s'
		}, cliProgress.Presets.shades_classic);

		progressBar.start(65025, 0);

		const promises = [];
		for (let i = 0; i <= 255; i++) {
		// pour chaque ip on va faire un ping
			for (let j = 0; j <= 255; j++) {
				progressBar.increment();
				const ip = baseIp.join('.') + '.' + i + '.' + j;
				{
					promises.push(check(ip));
				}
			}
		}
		// on attend que toutes les promises soit fini
		progressBar.stop();
		console.clear();
		console.log('processing results... please wait...5s max');
		Promise.all(promises).then(response => {
			console.clear();
			this.control(response);

		});
	}
	scan3Step() {
		/* on  enleve les trois dernier teme de l'ip,
		on va donc scanner toutes les ip entre 0 et 255 . 0 et 255 . 0 et 255 grace a la fonction chek.ping
		on afichera une progress bar pour montrer l'avancemment*/
		const check = require('./check/check.js');
		const _cliProgress = require('cli-progress');
		const progressBar = new _cliProgress.SingleBar({
			format: '{bar} {percentage}% | {value}/{total} ip scanned | ETA: {eta}s'
		}, _cliProgress.Presets.shades_classic);
		// on demare la bare de progression de 255*255*255
		progressBar.start(16581375, 0);
		const promises = [];
		// pour chaque ip on va faire un ping
		for (let i = 0; i <= 255; i++) {
			for (let j = 0; j <= 255; j++) {
				for (let k = 0; k <= 255; k++) {
					progressBar.increment();
					const ip = this.localIp[0].split('.')[0] + '.' + i + '.' + j + '.' + k;
					promises.push(check(ip));
					// si le nombre de promise est superieur a 133 320 (255*255*255) on enregistrer le promise dans un fichier et le vidée pour evitée de surcharger le systeme de depasser le array
					if (promises.length >= 255) {
						console.log('too much promise, saving to file...');
						this.writeFile(promises);
						promises.length = 0;
					}
				}
			}
			// on attend que toutes les promises soit fini
		}
		progressBar.stop();
		console.clear();
		console.log('processing results... please wait...it can be very long');
		Promise.all(promises).then(response => {
			console.clear();
			this.control(response);

		});
	}
	scan4Step() {
		/* on  enleve les quatre dernier teme de l'ip,
		on va donc scanner toutes les ip entre 0 et 255 . 0 et 255 . 0 et 255 . 0 et 255 grace a la fonction chek.ping
		on afichera une progress bar pour montrer l'avancemment*/
		const check = require('./check/check.js');
		const _cliProgress = require('cli-progress');
		const progressBar = new _cliProgress.SingleBar({
			format: '{bar} {percentage}% | {value}/{total} ip scanned | ETA: {eta}s'
		}, _cliProgress.Presets.shades_classic);
		// on demare la bare de progression de 255*255*255*255
		progressBar.start(4026531841, 0);
		const promises = [];
		// pour chaque ip on va faire un ping
		for (let i = 0; i <= 255; i++) {
			for (let j = 0; j <= 255; j++) {
				for (let k = 0; k <= 255; k++) {
					for (let l = 0; l <= 255; l++) {
						progressBar.increment();
						const ip = i + j + k + l;
						promises.push(check(ip));
						// si le nombre de promise est superieur a 133 320 on enregistrer le promise dans un fichier et le vidée pour evitée de surcharger le systeme de depasser le array
						if (promises.length >= 133020) {
							this.writeFile(promises);
							promises.length = 0;
						}
					}
				}
			}
		}
		// on attend que toutes les promises soit fini
		progressBar.stop();
		console.clear();
		console.log('processing results... please wait...it can be very very long');
		Promise.all(promises).then(response => {
			console.clear();
			this.control(response);

		});
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

	writeFile(datas) {
		/* on va ecrire les resultat dans un fichier json
		le fichier aura un nom dynamique donée par this.numberFile*/
		const fs = require('fs');
		const path = require('path');
		const file = path.join('./result/' + this.numberFile + '.json');
		// on crée un tabelau qui va contenir les resultat sans les promise
		// Promise.all(datas).then(response => {
		console.log('saving to file...');
		prompt('');
		fs.writeFileSync(path.resolve(file), JSON.stringify(datas));
		// });
		this.numberFile++;
	}


	async remouveFile() {
		/* on va supprimer les fichier json
		le fichier aura un nom dynamique donée par this.numberFile*/
		const rimraf = require('rimraf');
		rimraf('/result', function() { console.log('done'); });
	}
}


module.exports = Scanner;