import emoji from 'emojilib';
import memoize from 'lodash/memoize';
import capitalize from 'lodash/capitalize';
import groupBy from 'lodash/groupBy';
import pipe from 'lodash/fp/pipe'
import map from 'lodash/fp/map';
import uniqBy from 'lodash/fp/uniqBy';

const getList = memoize(
	() => emoji.ordered.map(id => ({
		...emoji.lib[id],
		id,
		name: capitalize(id.split('_').join(' '))
	}))
);

export const getCategories = memoize(
	() => pipe(
		uniqBy('category'),
		map(emoji => emoji.category)
	)(getList())
);

export const getCategorisedList = memoize(
	() => groupBy(getList(), 'category')
);

const createWordsMatcher = (string) => {
	const words = string.split(' ').filter(word => word);
	return ({keywords, category, name}) => {
		const wordsToMatch = keywords.concat(category).concat(name);
		const matchedWords = words.filter(word => {
			for (let wordToMatch of wordsToMatch) {
				if (wordToMatch.includes(word)) return true;
			}
			return false;
		});

		return matchedWords.length === words.length;
	};
};

export const search = memoize(
	(value) => getList().filter(createWordsMatcher(value))
);

export const getUserRelevantFlag = () => {
	const lang = window.navigator.language;

	if (lang) {
		const country = lang.split('-').pop().toLowerCase();
		const flag = getList().find(emoji => emoji.id === country);

		if (flag) return flag.char;
	}

	return '🇫🇷';
};
