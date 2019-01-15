/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : number_option_specs.js
* Created at  : 2019-01-01
* Updated at  : 2019-01-15
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
	NumberOption                    = require("../../src/options/number_option"),
	argument_test_factory           = require("../argument_test_factory"),

	test_initialize                 = require("../testers/test_initialize"),
	test_default_value              = require("../testers/test_default_value"),
	test_type_and_name              = require("../testers/test_type_and_name"),
	test_invalid_argument_exception = require("../testers/test_invalid_argument_exception");

const NAME          = "level",
	  TYPE          = "Number",
	  ALIASES       = ['l'],
	  DEFAULT_VALUE = 369,

	  PARAMS = ["name", "default_value"],

	  ARGUMENTS = [`--${ NAME }`, '5', `-${ ALIASES[0] }`, '10'];

describe(`class ${ TYPE }Option (${ PARAMS.join(", ") })`, () => {
	var name_argument_test             = argument_test_factory(PARAMS[0], 0);
	var default_value_argument_test    = argument_test_factory(PARAMS[1], 1);

	var constructor_arguments_test_cases = [
		// {{{1 arg[0] : name
		name_argument_test(undefined, "undefined", function () {
			return new NumberOption();
		}),

		name_argument_test(null, "null", function () {
			return new NumberOption(null);
		}),

		name_argument_test(3.14, "not a string", function (error_input) {
			return new NumberOption(error_input);
		}),

		name_argument_test("       ", "an empty string", function (error_input) {
			return new NumberOption(error_input);
		}),

		// {{{1 arg[1] : default_value
		default_value_argument_test(false, "not a number", function () {
			return new NumberOption(NAME, false);
		}),
		// }}}1
	];

	constructor_arguments_test_cases.forEach(test_invalid_argument_exception);

	var option = new NumberOption(NAME, DEFAULT_VALUE, ALIASES);

	test_instance(option, [
		{ name : "NumberOption", constructor_fn : NumberOption },
		{ name : "IBaseOption", constructor_fn : IBaseOption },
	]);

	var expected_test_cases = [
		// {{{1 index: 0
		{
			index          : 0,
			value          : 5,
			expected_value : 5,
			expected_index : 1,
		},

		// {{{1 index: 3
		{
			index : 2,
			value          : 10,
			expected_value : 10,
			expected_index : 3,
		}
		// }}}1
	];

	test_default_value([
		// {{{1 .value: undefined
		{
			create_instance : function () {
				return new NumberOption(NAME);
			},
		},

		// {{{1 .value: true
		{
			create_instance : function () {
				return new NumberOption(NAME, DEFAULT_VALUE);
			},
			got   : DEFAULT_VALUE,
			value : DEFAULT_VALUE
		},
		// }}}1
	]);

	test_type_and_name(option, TYPE, NAME);
	test_initialize(option, ARGUMENTS, expected_test_cases);
});
