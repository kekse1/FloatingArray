#!/usr/bin/env node

/*
 * numeric functions:
 *
 * # getNumber();
 * # getParameter();
 *
 * # getAlphabet();
 * # parseNumber();
 * # parseCast();
 * # isNumber();
 * # parseSign();
 *
 * # getIndex();
 *
 */

//
import FloatingArray from './floating.mjs';
FloatingArray.THROW = false;

//
const result = {};

result.getNumber = {};
result.getParameter = {};

result.isRadix = {};
result.getAlphabet = {};

result.parseNumber = {};
result.parseCast = {};
result.isNumber = {};
result.parseSign = {};

result.getIndex = {};

//
// getNumber();
//
(() => {
	//
})();

//
// getParameter();
//
(() => {
	//
})();

//
// isRadix();
//
(() => {
	result.isRadix['(1)'] = FloatingArray.
					isRadix(1);
	result.isRadix['(2)'] = FloatingArray.
					isRadix(2);
	result.isRadix['(3.14)'] = FloatingArray.
					isRadix(3.14);
	result.isRadix['(-11)'] = FloatingArray.
					isRadix(-11);
})();

//
// getAlphabet();
//
(() => {
	result.getAlphabet['(2)'] = FloatingArray.
					getAlphabet(2);
	result.getAlphabet['(16)'] = FloatingArray.
					getAlphabet(16);
	result.getAlphabet['(36)'] = FloatingArray.
					getAlphabet(36);
})();

//
// parseNumber();
//
(() => {
	result.parseNumber['(`1234`)'] = FloatingArray.
							parseNumber('1234');
	result.parseNumber['(`-3.14`)'] = FloatingArray.
							parseNumber('-3.14');
	result.parseNumber['(`-ff`, 16)'] = FloatingArray.
							parseNumber('-ff', 16);
	result.parseNumber['(`(16)-ffff`, 2)'] = FloatingArray.
							parseNumber('(16)-ffff', 2);
	result.parseNumber['(`1100101`, 2)'] = FloatingArray.
							parseNumber('1100101', 2);
	result.parseNumber['(`1122121`, 2)'] = FloatingArray.
							parseNumber('1122121', 2);
	result.parseNumber['(`(3)1122121`, 2)'] = FloatingArray.
							parseNumber('(3)1122121', 2);
	result.parseNumber['(`(8)---777`)'] = FloatingArray.
							parseNumber('(8)---777');
	result.parseNumber['(`--777`, 8)'] = FloatingArray.
							parseNumber('--777', 8);
})();

//
// parseCast();
//
(() => {
	result.parseCast['(`1234`)'] = FloatingArray.
						parseCast('1234');
	result.parseCast['(`(-23.4)'] = FloatingArray.
						parseCast('(-23.4)');
	result.parseCast['(`(1)`)'] = FloatingArray.
						parseCast('(1)');
	result.parseCast['(`(2)`)'] = FloatingArray.
						parseCast('(2)');
	result.parseCast['(`(16)abcdef`)'] = FloatingArray.
						parseCast('(16)abcdef');
})();

//
// isNumber();
//
(() => {
	result.isNumber['(`xyz`)'] = FloatingArray.
						isNumber('xyz');
	result.isNumber['(`-3.14`)'] = FloatingArray.
						isNumber('-3.14');
	result.isNumber['(`-ff`, 16)'] = FloatingArray.
						isNumber('-ff', 16);
	result.isNumber['(`(16)-ffff`)'] = FloatingArray.
						isNumber('(16)-ffff');
	result.isNumber['(`1100101`, 2)'] = FloatingArray.
						isNumber('1100101', 2);
	result.isNumber['(`1122121`, 2)'] = FloatingArray.
						isNumber('1122121', 2);
	result.isNumber['(`(3)1122121`, 2)'] = FloatingArray.
						isNumber('(3)1122121', 2);
	result.isNumber['(`(8)---777`)'] = FloatingArray.
						isNumber('(8)---777');
	result.isNumber['(`--777`, 8)'] = FloatingArray.
						isNumber('--777', 8);
})();


//
// getIndex();
//
(() => {
	result.getIndex['(6, 4)'] = FloatingArray.
					getIndex(6, 4);
	result.getIndex['(-1, 5)'] = FloatingArray.
					getIndex(-1, 5);
	result.getIndex['(-3, 8)'] = FloatingArray.
					getIndex(-3, 8);
	result.getIndex['(3.14, 4)'] = FloatingArray.
					getIndex(3.14, 4);
	result.getIndex['(3.14, 3)'] = FloatingArray.
					getIndex(3.14, 3);
	result.getIndex['(-3.14, 3)'] = FloatingArray.
					getIndex(-3.14, 3);
	result.getIndex['(-3.14, 4)'] = FloatingArray.
					getIndex(-3.14, 4);
})();

//
for(const idx in result)
{
	if(Object.keys(result[idx]).length > 0)
	{
		console.dir({ [idx]: result[idx] },
			{ compact: false });
	}
}

