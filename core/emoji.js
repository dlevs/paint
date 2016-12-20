import emoji from 'emojilib';
import _ from 'lodash';

const getList = _.memoize(() => {
	return emoji.ordered
		.map(name => ({
			...emoji.lib[name],
			name
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

export const search = _.memoize(() => {

});
