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

var style = require("./style");

var Option = function (option) {
	this.name       = option.name;
	this.hashes     = {};
	this.hash_array = [];

	switch (option.type) {
		case Boolean :
			this.type = "Boolean";
			break;
		case String :
			this.type = "String";
			break;
	}

	this.default     = option.default;
	this.has_default = option.default !== void 0;
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
		return result;
	},
	add_hash : function (hash) {
		this.hashes[hash] = true;
		this.hash_array.push(hash);
	}
};

module.exports = Option;
