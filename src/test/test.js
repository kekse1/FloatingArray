#!/usr/bin/env node

/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
import FloatingArray from '../floating.mjs';
import helper from './helper.mjs';

//
const
	ROUND = 2,
	COUNT = 8,
	TEST = 8;

//
const	array = new FloatingArray(COUNT);
var	float, curr, next;

for(var i = 0; i < array.length; ++i)
{
	array[i] = helper.random.int(255);
}

console.dir(
	{ array },
	{ compact: false });

for(var i = 0; i < TEST; ++i)
{
	float = helper.round(
		helper.random.float(array.length - 1),
		ROUND);

	if(Math.random() >= 0.5)
	{
		float = -float;
	}

	curr = FloatingArray.getIndex(
		Math.trunc(float), array.length);
	next = (float < 0 ? curr - 1 : curr + 1);

	console.dir({ curr, next,
			CURR: array[curr],
			NEXT: array[next],
		['[' + float + ']']: helper.round(
			array[float], 2)
	}, { compact: false });
	console.log();
}

