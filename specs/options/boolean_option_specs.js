/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : boolean_option_specs.js
* Created at  : 2017-09-01
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

var IBaseOption                     = require("../../src/options/i_base_option"),
	test_instance                   = require("../testers/test_instance"),
	BooleanOption                   = require("../../src/options/boolean_option"),
	argument_test_factory           = require("../argument_test_factory"),

	test_initialize                 = require("../testers/test_initialize"),
	test_default_value              = require("../testers/test_default_value"),
	test_type_and_name              = require("../testers/test_type_and_name"),
	test_invalid_argument_exception = require("../testers/test_invalid_argument_exception");

const TYPE    = "Boolean",
	  NAME    = "compile",
	  ALIASES = ['c'],

	  PARAMS = ["name", "default_value"],

	  ARGUMENTS = [`--${ NAME }`, "true", `-${ ALIASES[0] }`, "false"];

describe(`class ${ TYPE }Option (${ PARAMS.join(", ") })`, () => {
	var name_argument_test          = argument_test_factory(PARAMS[0], 0);
	var default_value_argument_test = argument_test_factory(PARAMS[1], 1);

	var constructor_arguments_test_cases = [
		// {{{1 arg[0] : name
		name_argument_test("undefined", function () {
			return new BooleanOption();
		}),

		name_argument_test("null", function () {
			return new BooleanOption(null);
		}),

		name_argument_test("not a string", function () {
			return new BooleanOption(3.14);
		}),

		name_argument_test("an empty string", function () {
			return new BooleanOption("       ");
		}),

		// {{{1 arg[1] : default_value
		default_value_argument_test("not a boolean", function () {
			return new BooleanOption(NAME, 0);
		}),
		// }}}1
	];

	constructor_arguments_test_cases.forEach(test_invalid_argument_exception);

	var option = new BooleanOption(NAME, null, ALIASES);

	test_instance(option, [
		{ name : "BooleanOption", constructor_fn : BooleanOption },
		{ name : "IBaseOption", constructor_fn : IBaseOption },
	]);

	var expected_test_cases = [
		// {{{1 index: 0
		{
			index          : 0,
			value          : ARGUMENTS[1],
			expected_value : true,
			expected_index : 1,
		},

		// {{{1 index: 3
		{
			index          : 2,
			value          : ARGUMENTS[3],
			expected_value : false,
			expected_index : 3,
		}
		// }}}1
	];

	test_default_value([
		// {{{1 .value: undefined
		{
			create_instance : function () {
				return new BooleanOption(NAME);
			},
		},

		// {{{1 .value: false
		{
			create_instance : function () {
				return new BooleanOption(NAME, false);
			},
			got   : false,
			value : false
		},

		// {{{1 .value: true
		{
			create_instance : function () {
				return new BooleanOption(NAME, true);
			},
			got   : true,
			value : true
		},
		// }}}1
	]);

	test_type_and_name(option, TYPE, NAME);
	test_initialize(option, ARGUMENTS, expected_test_cases);
});
