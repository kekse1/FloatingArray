#!/usr/bin/env node

/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 */

//
const helper = {};
export default helper;

//
helper.random = {};

helper.random.float = (_max, _min = 0) => {
	return (Math.random() * (_max - _min + 1) + _min);
};

helper.random.int = (_max, _min = 0) => {
	return Math.floor(Math.random() * (_max - _min + 1) + _min);
};

//

