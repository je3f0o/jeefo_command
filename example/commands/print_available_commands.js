/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : print_available_commands.js
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

module.exports = {
	name        : "print_available_commands",
	description : "Print space separated available command names for bash auto-completion.",
	execute : function (options, command_manager) {
		console.log(command_manager.map(command => command.name).join(' '));
		process.exit(0);
	}
};
