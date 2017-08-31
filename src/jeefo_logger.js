/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : jeefo_logger.js
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

var style    = require("./style"),
	slice    = Array.prototype.slice,
	is_array = Array.isArray;

var trim_string = function (arg, is_clean) {
	if (typeof arg === "string") {
		return arg.trim();
	} else if (is_array(arg)) {
		var str = trim_string(arg[0]);

		if (is_clean) {
			return str;
		} else if (str) {
			return style(str, arg[1]);
		}

		return null;
	}
	return arg;
};

var filter = function (arg) {
	switch (arg) {
		case ''        :
		case null      :
		case undefined :
			return false;
	}
	return true;
};

var get_message = function (args) {
	return args.map(arg => trim_string(arg)).filter(filter).join(' ');
};

var get_clean_message = function (args) {
	return args.map(arg => trim_string(arg, true)).filter(filter).join(' ');
};

var JeefoLogger = function (config) {
	if (! config) {
		config = {};
	}
	if (! config.style) {
		config.style = {};
	}

	this.styles = {
		warn  : config.style.warn  || "yellow",
		error : config.style.error || "red",
	};
	this.throw_error = config.throw_error === void 0 ? true : config.throw_error;
};

JeefoLogger.prototype = {
	log : function () {
		var args = slice.call(arguments);
		console.log(get_message(args));
	},
	error : function () {
		var args = slice.call(arguments);
		console.error(style(get_message(args), this.styles.error));

		if (this.throw_error) {
			throw new Error(get_clean_message(args));
		}
	},
	warn : function () {
		var args = slice.call(arguments);
		var message = style(get_message(args), this.styles.warn);

		console.warn(message);
	}
};

module.exports = JeefoLogger;
