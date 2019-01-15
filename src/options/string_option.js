/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : string_option.js
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
	StringValidator            = require("../validators/string_validator"),

	InvalidArgumentException   = require("../exceptions/invalid_argument_exception"),
	argument_validator_factory = require("../validators/argument_validator_factory");

var TYPE             = "String",
	CONSTRUCTOR_NAME = `${ TYPE }Option`;

var array_validator  = new ArrayValidator(),
	number_validator = new NumberValidator();

var default_value_validator          = new StringValidator({ define : false, trim : true, nullable : true });
var default_value_argument_validator = argument_validator_factory(CONSTRUCTOR_NAME, "default_value", 1, default_value_validator);

module.exports = jeefo_class.create(CONSTRUCTOR_NAME, IBaseOption, {
	constructor : function (name, default_value) {
		this.Super(CONSTRUCTOR_NAME, name, 0);
		this.value = default_value_argument_validator(default_value) || void 0;
	},

	type : TYPE,

	initialize : function (arguments_list, index) {
		array_validator.validate(arguments_list, err => {
			if (err) {
				throw new InvalidArgumentException(`${ CONSTRUCTOR_NAME }.initialize`,
					"arguments_list", 0, arguments_list, err.message);
			}
		});
		number_validator.validate(index, err => {
			if (err) {
				throw new InvalidArgumentException(`${ CONSTRUCTOR_NAME }.initialize`,
					"index", 1, index, err.message);
			}
		});

		if (typeof arguments_list[index] !== "string") {
			throw new InvalidArgumentException(`${ CONSTRUCTOR_NAME }.initialize`,
				`arguments_list[${ index }]`, 0, arguments_list[index], "not a string");
		}

		this.value = arguments_list[index];
		return index;
	},

	to_string : function () {
		if (this.value !== void 0) {
			var original_value = this.value;
			this.value = `'${ original_value }'`;

			var result = this._super().to_string();
			this.value = original_value;

			return result;
		}

		return this._super().to_string();
	}
});
