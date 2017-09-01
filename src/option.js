/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : option.js
* Created at  : 2017-09-01
* Updated at  : 2017-09-01
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start

/* globals -Option */
/* exported */

// ignore:end

var style    = require("./style"),
	is_array = Array.isArray;

var Option = function (option) {
	this.name       = option.name;
	this.hashes     = {};
	this.hash_array = [];

	switch (option.type) {
		case Array :
			this.type = "Array";
			break;
		case String :
			this.type = "String";
			break;
		case Boolean :
			this.type = "Boolean";
			break;
		default:
			if (is_array(option.type)) {
				this.type  = "Enum";
				this.enums = option.type;
			}
	}

	this.default     = option.default;
	this.has_default = option.default !== void 0;
	this.description = option.description;
};

Option.prototype = {
	to_string : function () {
		var result      = `  --${ this.name } (${ this.type })`,
			has_default = this.has_default;

		if (this.has_default) {
			result += ` (Default: ${ this.default })`;
		}

		result = style(result, "cyan");

		if (this.hash_array.length > 1) {
			var aliases = this.hash_array.slice(1).map(alias => {
				if (has_default) {
					return alias;
				}
				return `${ alias } <value>`;
			});
			result += style(`\n    aliases: ${ aliases.join(", ") }`, "gray");
		}

		if (this.enums) {
			result += style(`\n    Enum options: ${ this.enums.join(" | ") }`, "magenta");
			/*
			result += style(`\n    Enum options: `, "green");
			result += style(this.enums.join(" | "), "magenta");
			*/
		}

		if (this.description) {
			result += `\n    ${ this.description }`;
		}

		return result;
	},
	add_hash : function (hash) {
		this.hashes[hash] = true;
		this.hash_array.push(hash);
	}
};

module.exports = Option;
