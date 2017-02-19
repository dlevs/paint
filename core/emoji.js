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
	const words = string
		.split(' ')
		.filter(word => word !== '')
		.map(word => word.toLowerCase());

	return ({keywords, category, name}) => {

		const wordsToMatch = keywords
			.concat(category)
			.concat(name)
			.map(word => word.toLowerCase());

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

const getUserRelevantFlag = () => {
	const lang = window.navigator.language;

	if (lang) {
		const country = lang.split('-').pop().toLowerCase();
		const flag = getList().find(emoji => emoji.id === country);

		if (flag) return flag.char;
	}

	return '🇫🇷';
};

export const categories = [
	{label: "😀", value: "people"},
	{label: "🙊", value: "animals and nature"},
	{label: "🍉", value: "food and drink"},
	{label: "🎾", value: "activity"},
	{label: "🚗", value: "travel and places"},
	{label: "💡", value: "objects"},
	{label: "💟", value: "symbols"},
	{label: getUserRelevantFlag(), value: "flags"}
];
