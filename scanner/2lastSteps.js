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

function scan2Step(myIp) {
	/* on  enleve les deux dernier teme de l'ip,
    on va donc scanner toutes les ip entre 0 et 255 . 0 et 255 grace a la fonction chek.ping
    on afichera une progress bar pour montrer l'avancemment*/
	const baseIp = myIp.split('.');
	baseIp.pop();
	baseIp.pop();

	// on fait la bare de progression
	const progressBar = new _cliProgress.SingleBar({
		format: '{bar} {percentage}% | ETA: {eta}s'
	}, _cliProgress.Presets.shades_classic);

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
	console.log('processing results... please wait 5s max');
	console.clear();
	resolveOverfull(promises);
	return ipUp;
}

export default scan2Step;