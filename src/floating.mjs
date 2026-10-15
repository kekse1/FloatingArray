/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 * v0.0.1
 */

/*
 * JFYI: "PropJockey" really had the same idea.
 * 	i didn't 'steal' it - never seen this
 * 	before when i had this idea! ;-)
 *
 * 	< https://github.com/propjockey/analog-array/ >
 *
 * 	.. i know only one possible use case atm.; if
 * 	you have other ideas how to use this extension,
 * 	please mail me! :-)
 *
 * 	< kuchen@kekse.biz >
 *
 */

/*
 * TODO *
 *
 * # optional settings
 *
 * 	# disallow non-numeric items?!?
 *
 * # maybe Math.trunc(), evtl. w/ `Uint8Array()`!??
 *
 *
 *
 */

//
class FloatingArray extends Array
{
	constructor(... _args)
	{
		//
		super(... _args);

		//
		return this.PROXY = new Proxy(
			this, this.constructor.
				getProxyTraps(this));
	}

	static getProxyTraps(_this)
	{
throw new Error('TODO');
		//
		const result = {};

		//
		result.apply = () => {

		};

		result.construct = () => {

		};

		result.defineProperty = () => {

		};

		result.deleteProperty = () => {

		};

		result.enumerate = () => {

		};

		result.get = (_target, _property, _receiver) => {
			//
		};

		result.getOwnPropertyDescriptor = () => {

		};

		result.getPrototypeOf = () => {

		};

		result.has = () => {

		};

		result.isExtensible = () => {

		};

		result.ownKeys = () => {

		};

		result.preventExtensions = () => {

		};

		result.set = () => {

		};

		result.setPrototypeOf = () => {

		};

		//
		const proxyTraps = this.proxyTraps;

		for(const idx in result)
		{
			if(!proxyTraps.includes(idx))
			{
				delete result[idx];
			}
		}

		//
		return result;
	}

	static get proxyTraps()
	{
		return [
			'get',
			'set'
		];
	}

	static getIndex(_index, _length)
	{
		if(_length < 1)
		{
			return null;
		}

		if((_index %= _length) < 0)
		{
			_index = (_length + _index);
		}

		return (_index || 0);
	}
	
	getIndex(_index)
	{
		return this.constructor.getIndex(
			_index, this.length);
	}
}

export default FloatingArray;

//

