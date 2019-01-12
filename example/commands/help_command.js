/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : help_command.js
* Created at  : 2019-01-13
* Updated at  : 2019-01-13
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals */
/* exported */

// ignore:end

const exit  = require("../../helpers/exit"),
	  style = require("../../src/misc/style");

module.exports = {
	name        : "help",
	aliases     : ['h', '-h', '--help', '?'],
    description : "Shows this help messages",
    options     : [
        { name: 'option' , type: "String", aliases: ['o'] } ,
        { name: 'command', type: "String", aliases: ['c'] } ,
    ],
    execute : function (options, command_manager, application_name) {
		var command, result;

		if (options.command) {
			if (command_manager.has_command(options.command)) {
				command = command_manager.get_command(options.command);
			} else if (command_manager.has_alias(options.command)) {
				command = command_manager.get_command_by_alias_name(options.command);
			} else {
				exit([
					style("The specified ", "red"),
					style(options.command, "cyan"),
					style(` command is not registered. For available options, see \`${ application_name } help\`.`, "red"),
				].join(''));
			}

			result = command.help(application_name);
		} else {
			result = command_manager.map(command => command.help(application_name)).join("\n\n") + "\n";
		}

		console.log(result);
		exit();
	}
};
