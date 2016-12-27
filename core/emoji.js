import emoji from 'emojilib';
import _ from 'lodash';

const getList = _.memoize(() => {
	return emoji.ordered
		.map(id => ({
			...emoji.lib[id],
			id,
			name: _.capitalize(id.split('_').join(' '))
		}))
});

export const getCategories = _.memoize(() => {
	return _(getList())
		.uniqBy('category')
		.map(emoji => emoji.category)
		.value();
});

export const getCategorisedList = _.memoize(() => {
	return _.groupBy(getList(), 'category');
});

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

export const search = _.memoize(value => {
	return getList().filter(createWordsMatcher(value));
});

export const getUserRelevantFlag = () => {
	const lang = window.navigator.language;

	if (lang) {
		const country = lang.split('-').pop().toLowerCase();
		const flag = getList().find(emoji => emoji.id === country);

		if (flag) return flag.char;
	}

	return '🇫🇷';
};
