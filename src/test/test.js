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
var	float, int

for(var i = 0; i < array.length; ++i)
{
	array[i] = helper.random.int(255);
}

console.dir(
	{ array },
	{ compact: false });

for(var i = 0; i < TEST; ++i)
{
	int = helper.random.int(array.length - 1);
	float = helper.round(
		helper.random.float(array.length - 1),
		ROUND);

	if(Math.random() >= 0.5)
	{
		int = -int;
	}

	if(Math.random() >= 0.5)
	{
		float = -float;
	}

	console.dir({
		['[' + int + ']']: array[int],
		['[' + float + ']']: helper.round(
			array[float], 2)
	}, { compact: false });
	console.log();
}

