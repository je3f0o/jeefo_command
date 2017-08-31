/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : test.js
* Created at  : 2017-08-31
* Updated at  : 2017-09-01
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start

/* globals */
/* exported */

// ignore:end

var CLI = require("../index"),
	cli = new CLI("jeefo");

cli.register({
	name        : "generate",
	aliases     : ['g'],
    description : "Generates template files",
    options     : [
        { name: 'state'     , type: String , aliases: ['s'] } ,
        { name: 'service'   , type: String , aliases: ['S'] } ,
        { name: 'component' , type: String , aliases: ['c'] } ,
        { name: 'directive' , type: String , aliases: ['d'] } ,
    ],
    run: function (options, args) {
		console.log(options, args);
	}
});

cli.register({
	name        : "help",
	aliases     : ['-h', '--help'],
    description : "Shows help messages for this CLI",
    run: function () {
		var result = this.commands.map(command => command.help(this.name)).join("\n\n") + "\n";

		console.log(result);
	}
});

cli.run();
