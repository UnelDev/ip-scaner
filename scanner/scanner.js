/* cette classe va permetre de recuperer l'ip local,
elle va grace a la classe check tester quelle ip sont utilisiée*/
class Scanner {
	constructor() {
		this.localIp = this.getIp();
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
		on afichera une progress bar pour monere l'avancemment*/
		const check = require('./check/check.js');
		const _cliProgress = require('cli-progress');
		const Timer = require('./timer/timer.js');
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
		console.log('awaiting results... please wait');
		// Timer(Math.floor((time + 3) - new Date().getSeconds()));
		Promise.all(promises).then(response => {
			console.clear();
			console.log(response);
		});
	}
}

module.exports = Scanner;