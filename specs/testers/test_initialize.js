/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : test_initialize.js
* Created at  : 2019-01-01
* Updated at  : 2019-01-07
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals */
/* exported */

// ignore:end

var expect = require("expect");

module.exports = function test_initialize (instance, args, test_cases) {
	describe(".initialize(argument_list, index)", () => {
		test_cases.forEach(test_case => {
			it(`Should be got ${ test_case.value } when => (argument_list = [${ args.map(arg => "'" + arg + "'") }]) and (index = ${ test_case.index })`, () => {
				var return_index = instance.initialize(args, test_case.index + 1);

				expect(return_index).toBe(test_case.expected_index);
				expect(instance.value).toBe(test_case.expected_value);
			});
		});
	});
};
