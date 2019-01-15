/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : number_option.js
* Created at  : 2018-12-28
* Updated at  : 2019-01-15
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals */
/* exported */

// ignore:end

var jeefo_class                = require("../misc/jeefo_class"),
	IBaseOption                = require("./i_base_option"),

	ArrayValidator             = require("../validators/array_validator"),
	NumberValidator            = require("../validators/number_validator"),

	InvalidArgumentException   = require("../exceptions/invalid_argument_exception"),
	argument_validator_factory = require("../validators/argument_validator_factory");

var TYPE             = "Number",
	CONSTRUCTOR_NAME = `${ TYPE }Option`;

var array_validator  = new ArrayValidator(),
	number_validator = new NumberValidator();

var default_value_validator          = new NumberValidator({ define : false, nullable : true });
var default_value_argument_validator = argument_validator_factory(CONSTRUCTOR_NAME, "default_value", 1, default_value_validator);

var NUMBER_REGEX = /^-?\d+(\.\d*)?$/;

module.exports = jeefo_class.create(CONSTRUCTOR_NAME, IBaseOption, {
	constructor : function (name, default_value) {
		this.Super(CONSTRUCTOR_NAME, name, 0);

		var value = default_value_argument_validator(default_value);
		if (typeof value === "number") {
			this.value = value;
		}
	},

	type : TYPE,

	initialize : function (args, index) {
		array_validator.validate(args, err => {
			if (err) {
				throw new InvalidArgumentException(`${ CONSTRUCTOR_NAME }.initialize`,
					"args", 0, args, err.message);
			}
		});
		number_validator.validate(index, err => {
			if (err) {
				throw new InvalidArgumentException(`${ CONSTRUCTOR_NAME }.initialize`,
					"index", 1, index, err.message);
			}
		});

		if (NUMBER_REGEX.test(args[index])) {
			this.value = Number(args[index]);
		} else {
			throw new InvalidArgumentException(`${ CONSTRUCTOR_NAME }.initialize`,
				`args[${ index }]`, 0, args[index], "not a number");
		}

		return index;
	},
});
