import { h, Component } from 'preact';
// import ScrollViewport from 'preact-scroll-viewport';
import ScrollViewport from '../ScrollWrapper';
import { getUserRelevantFlag, search } from '../../core/emoji';
import style from './EmojiSelectorDialog.css';

const MIN_SEARCH_LEGNTH = 3;

const categories = [
	{label: "😀", value: "people"},
	{label: "🙊", value: "animals and nature"},
	{label: "🍉", value: "food and drink"},
	{label: "🎾", value: "activity"},
	{label: "🚗", value: "travel and places"},
	{label: "💡", value: "objects"},
	{label: "💟", value: "symbols"},
	{label: getUserRelevantFlag(), value: "flags"}
];


/**
 * Allowing react to render every emoji means react has to deal with ~600 items.
 * This causes noticable lag when initially rendering the list.
 *
 * For this reason, it is rendered as a html string.
 * @param emojis
 */
// const EmojiList = ({emojis}) => (
//
// );


export default class EmojiSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: categories[0].value
		};
	}

	render({handleInput}, {searchValue}) {
		// TODO: Maybe move this code out of render. FN is memoized so may be ok
		const isSearchNotLongEnough = searchValue.length < MIN_SEARCH_LEGNTH;
		const emojis = isSearchNotLongEnough ? [] : search(searchValue);


		let rows = [];
		for (let x = 1e5; x--;) rows[x] = `Item #${x + 1}`;

		return (
			<div class={style.container}>
				<h2>EmojiSelector</h2>
				<ul class={style.categoryList}>
					{categories.map(({label, value}) => (
						<li key={value} class={style.categoryListItem}>
							<button
								onClick={this.linkState('searchValue')}
								value={value}
								class={style.categoryButton}
								aria-selected={value === searchValue}
							>
								{label}
							</button>
						</li>
					))}
				</ul>
				<input
					type="search"
					value={searchValue}
					onInput={this.linkState('searchValue')}
				/>
				{/*<ul*/}
				{/*class={style.emojiList}*/}
				{/*onClick={handleInput}*/}
				{/*>    */}


				<ScrollViewport rowHeight={70} columns={8}>
					{emojis
						.filter(({char}) => char)
						.map(({char, name}, i) => (
							<div>
								<button
									key={name}
									class={style.emojiButton}
									type="submit"
									name="emoji"
									title={name}
									value={char}
								>
									{char}
								</button>
							</div>
						))}
				</ScrollViewport>


				{/*</ul>*/}
			</div>
		)
	}
}
