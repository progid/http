function getRandomNumberFromIterval(from, to) {
	return Math.round(from + Math.random() * (to - from));
};

function generateString(length) {
	return (length) ? generateString(length - 1) + String.fromCharCode(
		getRandomNumberFromIterval(97, 122) * getRandomNumberFromIterval(0, 1) ||
		getRandomNumberFromIterval(65, 90)
	) : '';
};

function getTypeOf(x) {
	return Object.prototype.toString.call(x).split(' ')[1].slice(0, -1).toLowerCase();
};