/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-01-10
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

const fse                = require("fs-extra"),
	  path               = require("path"),
	  style              = require("jeefo_command/src/misc/style"),
	  waterfall          = require("async-waterfall"),
	  { exec, execFile } = require('child_process');

const JEEFO_COMMANDS_PATH       = ".bash/jeefo_command/jeefo_commands.sh";
const AUTO_COMPLETION_PATH      = ".bash/jeefo_command/auto-completion.sh";
const JEEFO_COMMANDS_FULL_PATH  = path.join(process.env.HOME, JEEFO_COMMANDS_PATH);
const AUTO_COMPLETION_FULL_PATH = path.join(process.env.HOME, AUTO_COMPLETION_PATH);

module.exports = {
	name        : "install",
	description : "Install bash auto-completion for this command line tool.",
	options     : [
		{ name : "force", type : "bool" }
	],
	execute     : function (options, command_manager, application_name) {
		if (! fse.existsSync(AUTO_COMPLETION_FULL_PATH)) {
			fse.copySync(path.join(__dirname, "auto-completion.sh"), AUTO_COMPLETION_FULL_PATH);
			fse.ensureFileSync(JEEFO_COMMANDS_FULL_PATH);
		}

		var bashrc_path = path.join(process.env.HOME, ".bash_profile");
		if (! fse.existsSync(bashrc_path)) {
			bashrc_path = path.join(process.env.HOME, ".bashrc");
		}

		waterfall([
			cb => {
				execFile("grep", [`source ~/${ AUTO_COMPLETION_PATH }`, bashrc_path], err => {
					if (err && err.code === 1) {
						const source_includes = [
							"# jeefo_command auto-completion",
							`source ~/${ AUTO_COMPLETION_PATH }`,
							`source ~/${ JEEFO_COMMANDS_PATH }`
						].join('\n');

						fse.appendFileSync(bashrc_path, `\n${ source_includes }`);
					}
					cb();
				});
			},
			cb => {
				const complete_command = `complete -F _jeefo_command_auto_completion ${ application_name }`;
				execFile("grep", [`${ complete_command }$`, JEEFO_COMMANDS_FULL_PATH], err => {
					var is_installed = false;
					if (err && err.code === 1) {
						fse.appendFileSync(JEEFO_COMMANDS_FULL_PATH, `\n# jeefo_command: ${ application_name }\n${ complete_command }\n`);
						is_installed = true;
					}
					cb(null, is_installed);
				});
			}
		], (err, is_installed) => {
			if (is_installed) {
				exec(`source ~/${ JEEFO_COMMANDS_PATH }`, err => {
					if (err) {
						console.error("Something bad happened.");
						console.error(err);
						process.exit(1);
					}

					console.log([
						style(application_name, "cyan"),
						style(" bash auto-completion is successfully installed.", "green")
					].join(''));

					process.exit(0);
				});
			} else {
				console.log([
					style(application_name, "cyan"),
					style(" bash auto-completion is already installed.", "yellow")
				].join(''));
				process.exit(1);
			}
		});
	}
};
