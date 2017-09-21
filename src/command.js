/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : command.js
* Created at  : 2017-09-01
* Updated at  : 2017-09-21
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start

/* globals -Option */
/* exported */

// ignore:end

var style  = require("./style"),
	Option = require("./option");

var Command = function (command) {
	var self = this;

	self.args    = [];
	self.name    = command.name;
	self.runner  = command.run;
	self.hashes  = Object.create(null);
	self.options = {};
	self.aliases = command.aliases;

	self.available_options = [];

	if (command.options) {
		command.options.forEach(o => {
			var option = new Option(o);

			self.map(`--${ o.name }`, option);
			
			if (o.aliases) {
				var i = o.aliases.length;
				while (i--) {
					self.map(`-${ o.aliases[i] }`, option);
				}
			}

			self.available_options.push(option);
		});
	}

	self.description = command.description;
};

Command.prototype = {
	add_args : function (args) {
		this.args   = this.args.concat(args);
		this.is_set = true;
	},
	parse : function () {
		if (! this.is_set) { return; }

		var i = 0, args = this.args, options = this.options,
			option, next_option;

		this.args = [];

		for (; i < args.length; ++i) {
			option      = this.hashes[args[i]];
			next_option = this.hashes[args[i + 1]];

			if (option) {
				if (next_option) {
					options[option.name] = option.default;
				} else {
					i += 1;
					if (i < args.length) {
						options[option.name] = args[i];
					} else {
						options[option.name] = option.default;
					}
				}
			} else {
				this.args.push(args[i]);
			}
		}

		i = this.available_options.length;
		while (i--) {
			option = this.available_options[i];
			if (options[option.name] === void 0) {
				if (option.has_default) {
					options[option.name] = option.default;
				}
			}
		}
	},
	reset : function () {
		this.args   = [];
		this.is_set = false;
	},
	run : function (cli) {
		if (! this.is_set) { return; }

		this.runner.call(cli, this.options, this.args);
	},
	map : function (hash, option) {
		this.hashes[hash] = option;
		option.add_hash(hash);
	},
	help : function (cli_name) {
		var result = `${ cli_name } ${ this.name }`;

		if (this.available_options.length) {
			result += ` ${ style("<options...>", "cyan") }`;
		}

		if (this.description) {
			result += `\n  ${ this.description }`;
		}

		if (this.aliases) {
			result += style(`\n  aliases: ${ this.aliases.join(", ") }\n`, "gray");
		}

		if (this.available_options.length) {
			result += this.available_options.map(o => o.to_string()).join("\n");
		}

		return result;
	}
};

module.exports = Command;
