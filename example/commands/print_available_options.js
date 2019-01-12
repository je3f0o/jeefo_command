/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : print_available_options.js
* Created at  : 2019-01-10
* Updated at  : 2019-01-10
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals */
/* exported */

// ignore:end

var style = require("jeefo_command/src/misc/style");

module.exports = {
	name        : "print_available_options",
	description : "Print space separated available option names for bash auto-completion.",
	options     : [ { name : "command", type : "string" } ],
	execute     : function (options, command_manager) {
		var message, command;

		if (! options.command) {
			message = [
				style("Option ", "red"),
				style("--command", "cyan"),
				style(" is required.", "red")
			].join('');
		} else if (! command_manager.has_command(options.command)) {
			message = [
				style("Command ", "red"),
				style(`'${ options.command }'`, "cyan"),
				style(" is not a valid command name.", "red")
			].join('');
		}

		if (message) {
			console.error(message);
			process.exit(1);
		}

		command = command_manager.get_command(options.command);

		console.log(command.map(option => option.name).join(' '));
		process.exit(0);
	}
};
