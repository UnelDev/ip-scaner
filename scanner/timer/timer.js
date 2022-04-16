function countdown(timeLeft) {
	console.clear();
	console.log(timeLeft + ' s left');
	setTimeout(() => {
		if (timeLeft > 0) {
			countdown(timeLeft - 1);
		}
	}, 1000);

}
module.exports = countdown;