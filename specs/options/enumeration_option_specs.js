/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : enumeration_option_specs.js
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

var IBaseOption                     = require("../../src/options/i_base_option"),
	EnumerationOption               = require("../../src/options/enumeration_option"),
	argument_test_factory           = require("../argument_test_factory"),

	test_instance                   = require("../testers/test_instance"),
	test_initialize                 = require("../testers/test_initialize"),
	test_default_value              = require("../testers/test_default_value"),
	test_type_and_name              = require("../testers/test_type_and_name"),
	test_invalid_argument_exception = require("../testers/test_invalid_argument_exception");

const NAME             = "type",
	  TYPE             = "Enumeration",
	  ALIASES          = ['t'],
	  DEFAULT_VALUE    = "uninitialized",

	  PARAMS = ["name", "enumeration_list", "default_value"],

	  ENUMERATION_LIST = ["app", "dll"],
	  ARGUMENTS        = [`--${ NAME }`, ENUMERATION_LIST[0], `-${ ALIASES[0] }`, ENUMERATION_LIST[1]];

ENUMERATION_LIST.unshift(DEFAULT_VALUE);

describe(`class ${ TYPE }Option (${ PARAMS.join(", ") })`, () => {
	var name_argument_test             = argument_test_factory(PARAMS[0], 0);
	var enumeration_list_argument_test = argument_test_factory(PARAMS[1], 1);
	var default_value_argument_test    = argument_test_factory(PARAMS[2], 2);

	var constructor_arguments_test_cases = [
		// {{{1 arg[0] : name
		name_argument_test("undefined", function () {
			return new EnumerationOption();
		}),

		name_argument_test("null", function () {
			return new EnumerationOption(null);
		}),

		name_argument_test("not a string", function () {
			return new EnumerationOption(3.14);
		}),

		name_argument_test("an empty string", function () {
			return new EnumerationOption("       ");
		}),

		// {{{1 arg[1] : enumeration_list
		enumeration_list_argument_test("undefined", function () {
			return new EnumerationOption(NAME);
		}),
		
		enumeration_list_argument_test("null", function () {
			return new EnumerationOption(NAME, null);
		}),

		enumeration_list_argument_test("not an array", function () {
			return new EnumerationOption(NAME, "wrong_input");
		}),

		enumeration_list_argument_test("an empty array", function () {
			return new EnumerationOption(NAME, []);
		}),

		enumeration_list_argument_test("has non string value", function () {
			return new EnumerationOption(NAME, ["string", null]);
		}),

		enumeration_list_argument_test("has an empty string value", function () {
			return new EnumerationOption(NAME, ["string", "   "]);
		}),

		enumeration_list_argument_test("has duplicated value => 'a'", function () {
			return new EnumerationOption(NAME, ['a', 'b', 'c', '  a ']);
		}),

		// {{{1 arg[2] : default_value
		default_value_argument_test("not a string", function () {
			return new EnumerationOption(NAME, ENUMERATION_LIST, 3.14);
		}),

		default_value_argument_test("an empty string", function () {
			return new EnumerationOption(NAME, ENUMERATION_LIST, "   ");
		}),

		default_value_argument_test("not found in enumeration list", function () {
			return new EnumerationOption(NAME, ENUMERATION_LIST, "does not exist");
		}),
		// }}}1
	];

	constructor_arguments_test_cases.forEach(test_invalid_argument_exception);

	var option = new EnumerationOption(NAME, ENUMERATION_LIST, DEFAULT_VALUE, ALIASES);

	test_instance(option, [
		{ name : "EnumerationOption", constructor_fn : EnumerationOption },
		{ name : "IBaseOption", constructor_fn : IBaseOption },
	]);

	var expected_test_cases = [
		// {{{1 index: 0
		{
			index          : 0,
			value          : `'${ ENUMERATION_LIST[1] }'`,
			expected_value : ENUMERATION_LIST[1],
			expected_index : 1,
		},

		// {{{1 index: 3
		{
			index : 2,
			value          : `'${ ENUMERATION_LIST[2] }'`,
			expected_value : ENUMERATION_LIST[2],
			expected_index : 3,
		}
		// }}}1
	];

	test_default_value([
		// {{{1 .value: undefined
		{
			create_instance : function () {
				return new EnumerationOption(NAME, ENUMERATION_LIST);
			},
		},

		// {{{1 .value: uninitialized
		{
			create_instance : function () {
				return new EnumerationOption(NAME, ENUMERATION_LIST, DEFAULT_VALUE);
			},
			got   : `'${ DEFAULT_VALUE }'`,
			value : DEFAULT_VALUE
		},
		// }}}1
	]);

	test_type_and_name(option, TYPE, NAME);
	test_initialize(option, ARGUMENTS, expected_test_cases);
});