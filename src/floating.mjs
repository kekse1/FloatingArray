/*
 * Copyright (c) Sebastian Kucharczyk <kuchen@kekse.biz>
 * https://kekse.biz/ https://github.com/kekse1/
 * v0.2.1
 */

/*
 * JFYI: "PropJockey"[1] really had the same idea.
 * 	i didn't 'steal' it - never seen this
 * 	before when i had this idea! ;-)
 *
 * 		< https://github.com/propjockey/analog-array/ >
 *			[1] < https://github.com/propjockey/ >
 *
 * 	.. i know only one possible use case atm.; if
 * 	you have other ideas how to use this extension,
 * 	please mail me! :-)
 *
 * 		< kuchen@kekse.biz >
 *
 * 	And I'd be happy if you visit my private website or github.
 *
 *		< https://kekse.biz/ >
 *		< https://github.com/kekse1/ >
 *
 */

/*
 * TODO *
 *
 * # WICHTIG: `set()`-proxy-trap!!!! also setzen von werten mitsamt floating point index!!1
 *	dazu: 'set' ergaenzen in 'proxyTraps[]'!.
 *
 */

//
const	// default {options}; // etc...
	RADIX = 10,
	INDEX = true,

	// see also "FloatingArray.THROW"!
	THROW = true,
	
	ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
	RADIX_MIN = 2, RADIX_MAX = ALPHABET.length,
	STRING_MAX = 64,

	LOOKUP = (() => {
		const result = new Uint8Array(256).fill(255);
		for(var i = 0; i < ALPHABET.length; ++i)
			result[ALPHABET.charCodeAt(i)] = (i + 1);
		return result;
	})();

//
class FloatingArray extends Array
{
	constructor(... _args)
	{
		//
		const options = {
			index: INDEX,
			radix: RADIX
		};
		
		for(var i = 0; i < _args.length; ++i)
		{
			if(typeof _args[i] === 'object' && _args[i] !== null)
			{
				options = Object.assign(options,
					_args.splice(i--, 1)[0]);
			}
		}
		
		//
		super(... _args);
		
		//
		this.options = options;

		//
		return this.PROXY = new Proxy(
			this, this.constructor.
				getProxyTraps(
					this));
	}

	static getProxyTraps(_this)
	{
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
			if(_property.length > STRING_MAX)
			{
				return _target[_property];
			}

			if(_target.length === 0)
			{
				return undefined;
			}
			
			if(!this.isNumber(_property, _target.radix, this.THROW))
			{
				return _target[_property];
			}
			
			_property = _target.parseNumber(_property);
			
			const	negative = (_property < 0);
			
			if(_target.index)
			{
				_property = this.getIndex(
					_property,
					_target.length);
			}
			else if(_property < 0)
			{
				return undefined;
			}
			else if(_property >= _target.length)
			{
				return undefined;
			}

			var	[ index, float ] = this.
					getParameter(_property);

			if(!float)
			{
				return _target[index];
			}

			var	next;

			if(negative)
			{
				float = (1 - float);
				next = (index - 1);
			}
			else
			{
				next = (index + 1);
			}

			if(next < 0)
			{
				next = (_target.length - 1);
			}
			else if(next >= _target.length)
			{
				next = 0;
			}

			if(!Number.isFinite(_target[index]) ||
				!Number.isFinite(_target[next]))
			{
				if(this.THROW)
				{
					throw new Error('At least one array element is no finite number');
				}
				
				return _target[index];
			}

			return this.getValue(
				_target[index],
				_target[next],
				float);
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

		if(proxyTraps.length === 0)
		{
			result = {};
		}
		else for(const idx in result)
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
			'get'
		];
	}
	
	static getParameter(_index)
	{
		const negative = (_index < 0);
		_index = Math.abs(_index);
		const floating = (_index % 1);
		_index = Math.trunc(_index);
		
		return [ _index, floating, negative ];
	}
	
	get index()
	{
		return this.options.index;
	}
	
	set index(_value)
	{
		if(typeof _value === 'boolean')
		{
			return this.options.index = _value;
		}
		
		if(FloatingArray.THROW)
		{
			throw new Error('Expecting a Boolean');
		}
		
		return this.options.index;
	}
	
	get radix()
	{
		return this.options.radix;
	}
	
	set radix(_value)
	{
		if(this.constructor.isRadix(_value))
		{
			return this.options.radix = _value;
		}
		
		if(FloatingArray.THROW)
		{
			throw new Error('Invalid radix');
		}
		
		return this.options.radix;
	}
	
	static isRadix(_value)
	{
		if(!Number.isFinite(_value))
		{
			return false;
		}
		
		if((_value % 1) !== 0)
		{
			return false;
		}
		
		return (_value >= RADIX_MIN && _value <= RADIX_MAX);
	}
	
	static getAlphabet(_radix, _throw = FloatingArray.THROW)
	{
		if(!this.isRadix(_radix))
		{
			if(_throw)
			{
				throw new Error('Invalid radix');
			}
			
			return null;
		}
		
		return ALPHABET.substr(0, _radix);
	}

	parseNumber(_string, _radix = this.options.radix, _throw = FloatingArray.THROW)
	{
		return this.constructor.parseNumber(
				_string, _radix);
	}
	
	static parseNumber(_string, _radix = RADIX, _throw = FloatingArray.THROW)
	{
		if(_string.length > STRING_MAX)
		{
			return false;
		}
		
		var	[ _string, radix ] = this.parseCast(_string);
		
		if(radix === null)
		{
			radix = _radix;
		}
		
		if(!this.isRadix(radix))
		{
			if(_throw)
			{
				throw new Error('Invalid radix');
			}
			
			return null;
		}
		
		const	split = _string.split('.');
		
		if(split.length > 2)
		{
			if(_throw)
			{
				throw new Error('Invalid number string');
			}
			
			return null;
		}

		var	count = 0;
		
		while(split[0][count] === ALPHABET[0])
		{
			++count;
		}
		
		if(count > 0)
		{
			split[0] = split[0].substr(count);
			count = 0;
		}
		
		if(split[1])
		{
			while(split[1][split[1].length - 1 - count] === ALPHABET[0])
			{
				++count;
			}
			
			if(count > 0)
			{
				split[1] = split[1].slice(0, -count);
			}
		}

		const	alphabet = this.getAlphabet(radix);
		var	result = 0,
			negative,
			mul = 1,
			index;
		
		[ split[0], negative ] = this.parseSign(split[0]);
		
		for(var i = split[0].length - 1; i >= 0; --i)
		{
			index = alphabet.indexOf(split[0][i]);
			
			if(index === -1)
			{
				if(_throw)
				{
					throw new Error('Invalid character[' + i + '] (`' +
						split[0][i] + '`) in string');
				}
				
				return null;
			}
			
			if((result += (mul * index)) > Number.MAX_SAFE_INTEGER)
			{
				if(_throw)
				{
					throw new Error('Number exceeds limit (' + Number.MAX_SAFE_INTEGER + ')');
				}
				
				return null;
			}
			
			mul *= radix;
		}
		
		if(split[1])
		{
			mul = (1 / radix);
			
			for(var i = 0; i < split[1].length; ++i)
			{
				index = alphabet.indexOf(split[1][i]);
				
				if(index === -1)
				{
					if(_throw)
					{
						throw new Error('Invalid character[' + i + '] (`' +
							split[1][i] + '`) in string');
					}
					
					return null;
				}
				
				if((result += (mul * index)) > Number.MAX_VALUE)
				{
					if(_throw)
					{
						throw new Error('Number exceeds limit (' + Number.MAX_VALUE + ')');
					}
					
					return null;
				}
				
				if((mul /= _radix) < Number.MIN_VALUE)
				{
					if(_throw)
					{
						throw new Error('Number multiplicator falls below limit (' + Number.MIN_VALUE + ')');
					}
					
					return null;
				}
			}
		}
		
		if(negative)
		{
			result = (-result || 0);
		}
		
		return result;
	}

	static parseCast(_string, _parse = false, _throw = FloatingArray.THROW)
	{
		if(typeof _string !== 'string')
		{
			return [ _string, null ];
		}
		
		if(_string[0] !== '(')
		{
			return [ _string, null ];
		}
		
		const idx = _string.indexOf(')', 1);

		if(idx === -1)
		{
			return [ _string, null ];
		}
		
		const	original = _string;
		var	[ radix, negative ] = this.parseSign(
				_string.substring(1, idx));
		_string = _string.substr(idx + 1);

		if(Number.isNaN(radix = Number(radix)))
		{
			return [ original, null ];
		}
		
		if(negative)
		{
			return [ original, null ];
		}
		
		if(!this.isRadix(radix))
		{
			return [ original, null ];
		}
		
		if(_parse)
		{
			if(!this.isNumber(_string, radix, _throw))
			{
				return [ original, radix ];
			}
			
			return [ this.parseNumber(_string, radix, _throw), radix ];
		}

		return [ _string, radix ];
	}

	isNumber(_string, _radix = this.options.radix, _throw = FloatingArray.THROW)
	{
		return this.constructor.isNumber(
			_string, _radix, this.lookUpTable);
	}
	
	static isNumber(_string, _radix = RADIX, _throw = FloatingArray.THROW)
	{
		if(Number.isFinite(_string))
		{
			return true;
		}
		
		if(typeof _string !== 'string')
		{
			return false;
		}
		
		if(_string.length > STRING_MAX)
		{
			return false;
		}

		if(!_string)
		{
			return true;
		}
		
		var	[ string, radix ] = this.parseCast(_string);

		if(radix === null)
		{
			radix = _radix;
		}
		
		if(!this.isRadix(radix))
		{
			if(_throw)
			{
				throw new Error('Invalid radix');
			}
			
			return null;
		}
		
		const	split = string.split('.');
		
		if(split.length > 2)
		{
			return false;
		}
		
		[ split[0] ] = this.parseSign(split[0]);

		for(const str of split)
		{
			for(var i = 0; i < str.length; ++i)
			{
				if(LOOKUP[str.charCodeAt(i)] > radix)
				{
					return false;
				}
			}
		}
		
		return true;
	}

	static parseSign(_string)
	{
		var	negative = false;
		
		for(var i = 0; i < _string.length; ++i)
		{
			if(_string[i] === '+')
			{
				continue;
			}
			else if(_string[i] === '-')
			{
				negative = !negative;
			}
			else
			{
				_string = _string.substr(i);
				break;
			}
		}
		
		return [ _string, negative ];
	}

	static getValue(_a, _b, _factor)
	{
		return ((((_b - _a) * _factor) + _a) || 0);
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
	
	static get THROW()
	{
		return FloatingArray._THROW;
	}
	
	static set THROW(_value)
	{
		if(typeof _value === 'boolean')
		{
			return FloatingArray._THROW = _value;
		}
		
		if(FloatingArray._THROW)
		{
			throw new Error('Expecting a Boolean');
		}
		
		return FloatingArray._THROW;
	}
}

export default FloatingArray;

//
FloatingArray._THROW = THROW;

//

