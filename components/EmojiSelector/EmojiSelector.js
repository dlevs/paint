import { h, Component } from 'preact';
import Tabs from '../Tabs';
import Tab from '../Tab';
import { getCategorisedList, search } from '../../core/emoji';
import _ from 'lodash';
import style from './EmojiSelector.css';

const emojiCategories = getCategorisedList();

const EmojiCategoryTab = ({emojis, ...otherProps}) => (
	<Tab {...otherProps}>
		<ul className={style.emojiList}>
			{emojis.map(({char, name}) => <Emoji key={name} char={char}/>)}
		</ul>
	</Tab>
);

const Emoji = ({char}) => (
	<li className={style.emojiListItem}>
		<button
			className={style.emojiButton}
			type="button"
			name="emoji"
			value={char}
		>
			{char}
		</button>
	</li>
);

const categories = {};
const MIN_SEARCH_LEGNTH = 3;


export default class EmojiSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e) {
		const {value} = e.target;
		this.setState({search: value});
	}

	render() {
		// TODO: Maybe move this code out of render. FN is memoized so may be ok
		const isSearchNotLongEnough = this.state.search.length < MIN_SEARCH_LEGNTH;
		const allEmojiCategories = {
			...emojiCategories,
			search: isSearchNotLongEnough ? [] : search(this.state.search)
		};

		return (
			<div className={style.container}>
				<h2>EmojiSelector</h2>
				<input
					type="search"
					value={this.state.search}
					onChange={this.handleSearch}
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
