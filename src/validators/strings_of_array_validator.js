/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : strings_of_array_validator.js
* Created at  : 2019-01-02
* Updated at  : 2019-01-07
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals */
/* exported */

// ignore:end

var ObjectValidator          = require("./object_validator"),
	config_validator         = new ObjectValidator({ define : false }),
	InvalidArgumentException = require("../exceptions/invalid_argument_exception");

var DEFAULT_OPTIONS = {
	trim      : true,
	empty     : false,
	define    : true,
	strict    : true,
	unique    : false,
	nullable  : false,
};

function StringsOfArrayValidator (config) {
	var self = this;

	config_validator.validate(config, function (err, value) {
		if (err) {
			throw new InvalidArgumentException("StringsOfArrayValidator", "config", 0, config, err.message);
		}

		config = value || {};

		self.trim     = config.trim     === void 0 ? DEFAULT_OPTIONS.trim     : config.trim     === true;
		self.empty    = config.empty    === void 0 ? DEFAULT_OPTIONS.empty    : config.empty    === true;
		self.strict   = config.strict   === void 0 ? DEFAULT_OPTIONS.strict   : config.strict   === true;
		self.define   = config.define   === void 0 ? DEFAULT_OPTIONS.define   : config.define   === true;
		self.unique   = config.unique   === void 0 ? DEFAULT_OPTIONS.unique   : config.unique   === true;
		self.nullable = config.nullable === void 0 ? DEFAULT_OPTIONS.nullable : config.nullable === true;
	});
}

StringsOfArrayValidator.prototype = {
	validate : function (values, callback) {
		if (values === void 0) {
			if (this.define) {
				return callback({ message : "undefined" });
			}
			return callback(null);
		}

		if (values === null) {
			if (this.nullable) {
				return callback(null, null);
			}
			return callback({ message : "null" });
		}

		if (this.strict && ! Array.isArray(values)) {
			return callback({ message : "not an array" });
		}

		if (! this.empty && values.length === 0) {
			return callback({ message : "an empty array" });
		}

		var i      = values.length,
			result = new Array(i), current_value;

		while (i--) {
			current_value = values[i];

			if (typeof current_value !== "string") {
				return callback({ message : "has non string value" });
			}

			if (this.trim) {
				current_value = current_value.trim();
				if (current_value === '') {
					return callback({ message : "has an empty string value" });
				}
			}

			if (this.unique && result.indexOf(current_value) !== -1) {
				return callback({ message : `has duplicated value => '${ current_value }'` });
			}

			result[i] = current_value;
		}

		callback(null, result);
	}
};

module.exports = StringsOfArrayValidator;
