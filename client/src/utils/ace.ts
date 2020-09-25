export const addVariableHighlight = (editor) => {
	const currentSession = editor.current.editor.getSession() as any;
	const currentMode = currentSession.getMode() as any;

	let rules = currentSession.$mode.$highlightRules.getRules();
	for (let stateName in rules) {
		if (Object.prototype.hasOwnProperty.call(rules, stateName)) {
			rules[stateName].unshift({
				token: 'variable.other',
				regex: '\\{\\{\\{\\s*([A-z0-9_-]+)\\s*\\}\\}\\}',
			});
		}
	}

	currentMode.$tokenizer = null;
	currentSession.bgTokenizer.setTokenizer(currentSession.$mode.getTokenizer());
	currentSession.bgTokenizer.start(0);
};
