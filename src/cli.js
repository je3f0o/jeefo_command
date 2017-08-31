/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : cli.js
* Created at  : 2017-09-01
* Updated at  : 2017-09-01
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start

/* globals */
/* exported */

// ignore:end

var Command = require("./command");

var CLI = function (name) {
	this.name     = name;
	this.args     = [];
	this.hashes   = Object.create(null);
	this.commands = [];
};

CLI.prototype = {
	register : function (command) {
		var instance = new Command(command);

		this.map(command.name, instance);
		if (command.aliases) {
			var i = command.aliases.length;
			while (i--) {
				this.map(command.aliases[i], instance);
			}
		}

		this.commands.push(instance);
	},
	parse : function () {
		var i    = 0,
			args = process.argv.slice(2),
			arr, command;

		for (; i < args.length; ++i) {
			command = this.hashes[args[i]];

			if (command) {
				i  += 1;
				arr = [];

				for (; i < args.length; ++i) {
					if (this.hashes[args[i]]) {
						i -= 1;
						break;
					} else {
						arr.push(args[i]);
					}
				}

				command.add_args(arr);
			} else {
				this.args.push(args[i]);
			}
		}

		for (i = 0; i < this.commands.length; ++i) {
			this.commands[i].parse();
		}
	},
	reset : function () {
		var i = this.commands.length;
		while (i--) {
			this.commands[i].reset();
		}
		this.args = [];
	},
	run : function () {
		var i = this.commands.length;
		this.parse();
		while (i--) {
			this.commands[i].run(this);
		}
	},
	map : function (hash, command) {
		if (this.hashes[hash]) {
			throw new Error(`Command '${ hash }' is already registered.`);
		}
		this.hashes[hash] = command;
	}
};

module.exports = CLI;
