/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : hello_world.js
* Created at  : 2017-08-31
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

var pkg            = require("../package"),
	exit           = require("../helpers/exit"),
	style          = require("../src/misc/style"),
	CommandManager = require("../src/command_manager");

var cli = new CommandManager(pkg.name);

function generate_execute_function (command_name) {
	return function execute () {
		console.log(`${ command_name } command executed.`);
		console.log(`${ command_name } command is for only demonstration purpose. It is not implemented.`);
	};
}

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
    execute : generate_execute_function("build")
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
    execute : generate_execute_function("generate")
});

cli.register(require("./commands/version_command"));
cli.register(require("./commands/print_command"));
cli.register(require("./commands/help_command"));

try {
	cli.execute_commands(process.argv, 2);
} catch (e) {
	if (e.error_message === "not a valid command name") {
		exit([
			style("The specified ", "red"),
			style(e.parameter_value, "cyan"),
			style(` command is invalid. For available options, see \`${ cli.application_name } help\`.`, "red"),
		].join(''));
	}
}
