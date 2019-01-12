
function _get_last_jeefo_command () {
	local i=1
	local last_command=''
	local commands_list='help build version'
	local current_command

	for ((; i < COMP_CWORD; ++i)); do
		current_command=`compgen -W "$commands_list" -- "${COMP_WORDS[i]}"`

		if [[ $current_command ]]; then
			last_command=$current_command
		fi
	done

	echo -n $last_command
}

function _jeefo_command_auto_completion () {
	local last_command=`_get_last_jeefo_command`
    local current_argument="${COMP_WORDS[COMP_CWORD]}"
	local i available_options

	if [[ $last_command && "$current_argument" == -* ]]; then
		available_options=`jeefo-dev print_available_options --command "$last_command"`
		COMPREPLY=(`compgen -W "$available_options" -- "$current_argument"`)
	else
		available_options=`jeefo-dev print_available_commands`
		COMPREPLY=(`compgen -W "$available_options" -- "$current_argument"`)
	fi

	return 0
}

complete -F _jeefo_command_auto_completion jeefo-dev
