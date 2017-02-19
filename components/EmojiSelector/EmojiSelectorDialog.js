import { h, Component } from 'preact';
import chunk from 'lodash/chunk';
import ScrollViewport from '../ScrollViewport';
import { categories, search } from '../../core/emoji';
import s from './EmojiSelectorDialog.css';

const EMOJI_PER_ROW = 6;
const EMOJI_SIZE = 80;
const MIN_SEARCH_LEGNTH = 3;

export default class EmojiSelector extends Component {
	state = {searchValue: categories[0].value};

	handleClick = (event) => {
		if (event.target.value !== undefined) {
			this.props.handleInput(event);
		}
	};

	render(props, {searchValue}) {
		const isSearchNotLongEnough = searchValue.length < MIN_SEARCH_LEGNTH;
		const emojis = isSearchNotLongEnough ? [] : search(searchValue);
		const emojiRows = chunk(emojis, EMOJI_PER_ROW)
			.map((row, i) => (
				<div key={i}>
					{row.map(({char, name}) => (
						<button
							key={name}
							class={s.emojiButton}
							style={{
								width: EMOJI_SIZE,
								height: EMOJI_SIZE,
								fontSize: EMOJI_SIZE * 0.8
							}}
							type="submit"
							name="emoji"
							title={name}
							value={char}
						>
							{char}
						</button>
					))}
				</div>
			));

		return (
			<div
				class={s.container}
				style={{maxWidth: EMOJI_PER_ROW * EMOJI_SIZE}}
			>
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
				<div onClick={this.handleClick}>
					<ScrollViewport rowHeight={EMOJI_SIZE}>
						{emojiRows}
					</ScrollViewport>
				</div>
			</div>
		)
	}
}
