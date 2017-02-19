import { h, Component } from 'preact';
import ScrollViewport from '../ScrollViewport';
import { getUserRelevantFlag, search } from '../../core/emoji';
import s from './EmojiSelectorDialog.css';

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
	state = {searchValue: categories[0].value};

	render({handleInput}, {searchValue}) {
		const isSearchNotLongEnough = searchValue.length < MIN_SEARCH_LEGNTH;
		const emojis = isSearchNotLongEnough ? [] : search(searchValue);

		return (
			<div class={s.container}>
				<h2>EmojiSelector</h2>
				<ul class={s.categoryList}>
					{categories.map(({label, value}) => (
						<li key={value} class={s.categoryListItem}>
							<button
								onClick={this.linkState('searchValue')}
								value={value}
								class={s.categoryButton}
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
				{/*class={s.emojiList}*/}
				{/*onClick={handleInput}*/}
				{/*>    */}


				<ScrollViewport rowHeight={70}>
					{emojis
						.filter(({char}) => char)
						.map(({char, name}, i) => (
							<div>
								<button
									key={name}
									class={s.emojiButton}
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
