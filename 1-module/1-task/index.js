/**
 * Power
 * @param {number} m base
 * @param {number} n index
 * @returns {number}
 */
function pow (m, n) {

	n = parseFloat(n);

	if (!isNumeric(n)) return;
	if (!isNatural(n)) return;

	let result = m;

	for (let i = 2; i <= n; i++)
	{
		result *= m;
	}

	return result;
}

function isNatural(value)
{
	return value > 0 && (~~value) == value;
}

function isNumeric(value) {

	return !isNaN(value) && isFinite(value);
}