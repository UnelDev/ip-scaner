console.log('init');
const promptSync = require('prompt-sync');
const prompt = promptSync();
console.log('prompt-sync is loaded');
const figlet = require('figlet');
console.log('figlet is loaded');
const inquirer = require('inquirer');
console.log('inquirer is loaded');
let menu;
// my librairies
const Scanner = require('./Scanner/Scanner.js');
// on inisialise Scanner
const scanner = new Scanner();
console.log('Scanner is loaded');
console.log('loading down');
console.clear();
// on afiche avec une police ascii art
figlet('Ip Scanner', 'Sub-Zero', (err, data) => { console.log(data); });

function main() {
	setTimeout(async () => {
		console.log('\n\n is a tool for scan your network');
		console.log('\n\n');

		menu = await inquirer.prompt({
			// on fait un menu
			name: 'menu_select',
			type: 'list',
			message: 'what do you want to do',
			choices: [
				'scan',
				'View credits',
				'Quit'
			]
		});
		if (menu.menu_select == 'scan') {
			scanSelect();
		} else if (menu.menu_select == 'View credits') {
			console.clear();
			console.log('This tool was made by Unel:');
			console.log('https://github.com/UnelDev');
			console.log('\n');
			console.log('Press enter to return to the menu...');
			prompt('');
			main();

		} else {
			console.clear();
			process.exit(0);
		}
	}, 10);
}

function scanSelect() {
	// on afiche L'ip du pc
	setTimeout(async () => {
		console.log('vos ip sont :' + scanner.getIp());
		const SelectScan = await inquirer.prompt({
			// on fait un menu
			name: 'menu_select',
			type: 'list',
			message: 'what type of scanner do you want to choose',
			choices: [
				'auto scan',
				'two last step',
				'tree last step',
				'all step',
				'return to menu'
			]
		});
		if (SelectScan.menu_select == 'auto scan') {
			// on scan
			scanner.scan();
		} else if (SelectScan.menu_select == 'two last step') {
			// on scan
			scanner.scan2Step();
		} else if (SelectScan.menu_select == 'tree last step') {
			// on scan
			scanner.scan3Step();
		} else if (SelectScan.menu_select == 'all step') {
			// on scan
			scanner.scan4Step();
		} else {
			main();
		}
	}, 10);
}


main();