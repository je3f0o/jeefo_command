/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : hello_world.js
* Created at  : 2017-08-31
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

var pkg            = require("../package"),
	style          = require("../src/misc/style"),
	CommandManager = require("../src/command_manager");

var cli = new CommandManager(pkg.name);

cli.register({
	name        : "build",
	aliases     : ['b'],
    description : "Compiles the source codes.",
    options     : [
        { name: 'main'           , type: "String" ,                         default: "index.js", aliases: ['m'] } ,
        { name: 'optimize-level' , type: "number" ,                         default: 3         , aliases: ['o'] } ,
        { name: 'environment'    , type: "enum"   , list : ["dev", "prod"], default: "dev"     , aliases: ['e'] } ,
        { name: 'minify'         , type: "bool"   ,                         default: false                      } ,
    ],
    execute : function () {
		console.log("Build command called");
	}
});

cli.register({
	name        : "version",
	aliases     : ['v'],
    description : "Print the current version.",
    execute : function () {
		console.log(pkg.version);
	}
});

cli.register({
	name        : "generate",
	aliases     : ['g'],
    description : "Generate template files",
    options     : [
        { name: 'state'     , type: "String"     , aliases: ['s'] } ,
        { name: 'service'   , type: "string"     , aliases: ['S'] } ,
        { name: 'component' , type: "  String  " , aliases: ['c'] } ,
        { name: 'directive' , type: "String"     , aliases: ['d'] } ,
    ],
    execute : function () {
		console.log("Generate command is for only demonstration purpose. It is not implemented.");
	}
});

cli.register({
	name        : "help",
	aliases     : ['h', '-h', '--help', '?'],
    description : "Shows this help messages",
    options     : [
        { name: 'option' , type: "String", aliases: ['o'] } ,
        { name: 'command', type: "String", aliases: ['c'] } ,
    ],
    execute : function (options, command_manager, application_name) {
		var command;
		if (options.command) {
			if (command_manager.has_command(options.command)) {
				command = command_manager.get_command(options.command);
			} else if (command_manager.has_alias(options.command)) {
				command = command_manager.get_command_by_alias_name(options.command);
			} else {
				var message = [
					style("The specified ", "red"),
					style(options.command, "cyan"),
					style(` command is not registered. For available options, see \`${ cli.application_name } help\`.`, "red"),
				].join('');
				console.error(message);
				return;
			}

			console.log(command.help(application_name));
		} else {
			var result = command_manager.map(command => command.help(application_name)).join("\n\n") + "\n";
			console.log(result);
		}
	}
});

try {
	cli.execute_commands(process.argv, 2);
} catch (e) {
	if (e.error_message === "not a valid command name") {
		var message = [
			style("The specified ", "red"),
			style(e.parameter_value, "cyan"),
			style(` command is invalid. For available options, see \`${ cli.application_name } help\`.`, "red"),
		].join('');

		console.error(message);
	}
}
