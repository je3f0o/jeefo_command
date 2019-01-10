/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : function_validator_specs.js
* Created at  : 2019-01-04
* Updated at  : 2019-01-05
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals */
/* exported */

// ignore:end

var test_instance                   = require("../testers/test_instance"),
	IBaseValidator                  = require("../../src/validators/i_base_validator"),
	test_validation                 = require("../testers/test_validation"),
	FunctionValidator               = require("../../src/validators/function_validator"),
	argument_test_factory           = require("../argument_test_factory"),
	test_invalid_argument_exception = require("../testers/test_invalid_argument_exception");

describe("class FunctionValidator (config, is_muteable)", () => {
	var config_argument_test = argument_test_factory("config", 0);

	test_invalid_argument_exception(config_argument_test("null", function () {
		return new FunctionValidator(null);
	}));

	var instance = new FunctionValidator();

	test_instance(instance, [
		{ name : "FunctionValidator", constructor_fn : FunctionValidator },
		{ name : "IBaseValidator", constructor_fn : IBaseValidator },
	]);

	var fn = function () {};
	var sets_of_test_cases = [
		// {{{1 Error cases
		{
			description : "Error cases",
			cases : [
				// {{{2 Case: undefined
				{
					when : "undefined",
					message : "undefined"
				},

				// {{{2 Case: null
				{
					when : "null",
					value   : null,
					message : "null",
				},

				// {{{2 Case: array
				{
					when : "[]",
					value : [],
					message : "not a function"
				},

				// {{{2 Case: object
				{
					when : "{}",
					value : {},
					message : "not a function"
				},

				// {{{2 Case: number
				{
					when : 123,
					value : 123,
					message : "not a function"
				},

				// {{{2 Case: boolean
				{
					when : "true",
					value : true,
					message : "not a function"
				},

				// {{{2 Case: string
				{
					when : '"string"',
					value : "string",
					message : "not a function"
				},
				// }}}2
			]
		},

		// {{{1 Valid cases
		{
			description : "Valid cases",
			cases : [
				{
					got            : 'a [Function()]',
					when           : 'function () {}',
					value          :  fn,
					expected_value :  fn
				},
			]
		}
		// }}}1
	];

	test_validation(instance, sets_of_test_cases);
});
