/* cette classe va faire un ping sur l'ip fournis pour verifier l'existance de l'ip */
const check = require('ping');
async function ping(host) {
	return new Promise((resolve) => {
		check.sys.probe(host, (isAlive) => {
			resolve(isAlive);
		});
	});
}
module.exports = ping;