import { h, Component } from 'preact';
import Tabs from '../Tabs';
import Tab from '../Tab';
import { getCategorisedList, search } from '../../core/emoji';
import _ from 'lodash';
import style from './EmojiSelector.css';

const emojiCategories = getCategorisedList();

const EmojiCategoryTab = ({emojis, ...otherProps}) => (
	<Tab {...otherProps}>
		<ul
			class={style.emojiList}
			dangerouslySetInnerHTML={{__html: emojiListHtml(emojis)}}
		/>
	</Tab>
);

/**
 * Allowing react to render every emoji means react has to deal with ~600 items.
 * This causes noticable lag when initially rendering the list.
 *
 * For this reason, it is rendered as a html string.
 * @param emojis
 */
const emojiListHtml = (emojis) => (
	emojis
		.filter(({char}) => char)
		.map(({char}) => (
			`<li>
				<button
					class=${style.emojiButton}
					type="button"
					name="emoji"
					value=${char}
				>
					${char}
				</button>
			</li>`
		))
		.join('')
);

const categories = {};
const MIN_SEARCH_LEGNTH = 3;


export default class EmojiSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: ''
		};
	}

	render({}, {searchValue}) {
		// TODO: Maybe move this code out of render. FN is memoized so may be ok
		const isSearchNotLongEnough = searchValue.length < MIN_SEARCH_LEGNTH;
		const allEmojiCategories = {
			...emojiCategories,
			search: isSearchNotLongEnough ? [] : search(searchValue)
		};

		return (
			<div class={style.container}>
				<h2>EmojiSelector</h2>
				<input
					type="search"
					value={searchValue}
					onInput={this.linkState('searchValue')}
				/>
				<Tabs value="search">
					{_.map(allEmojiCategories, (emojis, category) => (
						<EmojiCategoryTab
							key={category}
							category={category}
							label={category}
							value={category}
							emojis={emojis}
						/>
					))}
				</Tabs>
			</div>
		)
	}
}
