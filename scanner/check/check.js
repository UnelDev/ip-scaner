/* cette classe va faire un ping sur l'ip fournis pour verifier l'existance de l'ip */
import check from 'ping';
async function ping(host) {
	return new Promise((resolve) => {
		check.sys.probe(host, (isAlive) => {
			resolve(new Array(host, isAlive));
		});
	});
}
export default ping;