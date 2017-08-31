/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : parser.js
* Created at  : 2017-08-31
* Updated at  : 2017-08-31
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start

/* globals */
/* exported */

// ignore:end

var	logger  = require("./logger"),
	Options = require("./options");

var parse_option = function (options, option) {
	option = {
		long_name   : option[1],
		short_name  : option[0],
		description : option[2],
	};

	if (option.long_name) {
		if (options.long_names[option.long_name]) {
			logger.error("GetOpt Error: duplicated ",
				["long", "underline"],
				" name ",
				['[', "magenta"],
				[option.long_name, "dim"],
				[']', "magenta"]
			);
		}

		options.long_names[option.long_name] = true;
	}
	if (option.short_name) {
		if (options.short_names[option.short_name]) {
			logger.error("GetOpt Error: duplicated ",
				["short", "underline"],
				" name ",
				['[', "magenta"],
				[option.short_name, "green"],
				[']', "magenta"]
			);
		}

		options.short_names[option.short_name] = true;
	}

	return option;
};

module.exports = function getopt_parser (user_options, args) {
	var options = {
		long_names  : {},
		short_names : {},
	};

	options = user_options.map(o => parse_option(options, o));

	console.log(options);
};
