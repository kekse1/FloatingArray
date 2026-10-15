#!/usr/bin/env node

/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
import FloatingArray from './floating.mjs';
import helper from './helper.mjs';

//
const ROUND = 2;
const TEST = 8;
const MAX = 255;
const MIN = 0;

//
const array = new FloatingArray(10);
const result = [];
var int, float;

for(var i = 0; i < array.length; ++i)
{
	array[i] = ((Math.floor(Math.random() * (MAX - MIN + 1)) + MIN) || 0);
}

console.dir({array});

for(var i = 0; i < TEST; ++i)
{
	int = helper.random.int(array.length);
	float = helper.random.float(array.length);

	console.dir({ int, float,
		INT: array[int],
		FLOAT: array[float] });
	console.log();
}

