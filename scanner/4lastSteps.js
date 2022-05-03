import check from './check/check.js';
import _cliProgress from 'cli-progress';
const ipUp = new Array;

async function resolveOverfull(datas) {
	/* on va rediure le tabeaux */
	await Promise.all(datas);
	const resolve = new Array;
	datas.forEach(element => {
		if (element[1] == true) {
			resolve.push(element);
		}
	});
	ipUp.push(resolve);
}

function scan4Step() {
	/* on  enleve les quatre dernier teme de l'ip,
    on va donc scanner toutes les ip entre 0 et 255 . 0 et 255 . 0 et 255 . 0 et 255 grace a la fonction chek.ping
    on afichera une progress bar pour montrer l'avancemment*/
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
					const ip = i + '.' + j + '.' + k + '.' + l;
					promises.push(check(ip));
					// si le nombre de promise est superieur a 133 320 on enregistrer le promise dans un fichier et le vidée pour evitée de surcharger le systeme de depasser le array
					if (promises.length >= 133320) {
						console.log('too much promise, saving to file...');
						(async () => {resolveOverfull(promises);})();
						promises.length = 0;
					}
				}
			}
		}
	}
	// on attend que toutes les promises soit fini
	progressBar.stop();
	console.clear();
	console.log('processing results... please wait 5s max');
	console.clear();
	resolveOverfull(promises);
	return ipUp;
}

export default scan4Step;