const tailwindcss = require('tailwindcss');

const IS_DEV = process.env.NODE_ENV === 'development';

const plugins = [tailwindcss('./tailwind.config.js')];

if (!IS_DEV) {
	const purgecss = require('@fullhuman/postcss-purgecss');

	class TailwindExtractor {
		static extract(content) {
			return content.match(/[A-z0-9-:\/]+/g) || [];
		}
	}

	plugins.push(
		purgecss({
			content: [
				'src/*.html',
				// '**/*.js',
				// './node_modules/tailwindcss-dark-mode/prefers-dark.js'
			],
			// whitelist: ['mode-dark'],
			extractors: [
				{
					extractor: TailwindExtractor,
					extensions: ['html']
				}
			]
		})
	);
}

module.exports = { plugins };
