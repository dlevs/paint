import { h, Component } from 'preact';
import EmojiSelectorDialog from './EmojiSelectorDialog';

export default class EmojiSelectorInput extends Component {

	state = {isSelecting: false};

	handleInput = (e) => {
		this.props.handleInput(e);
		this.setState({
			isSelecting: false
		});
	};

	showEmojiSelector = () => {
		this.setState({
			isSelecting: true
		});
	};

	render({value}, {isSelecting}) {
		return (
			<div>
				<button onClick={this.showEmojiSelector}>{value}</button>
				{isSelecting &&
				<EmojiSelectorDialog handleInput={this.handleInput}/>}
			</div>
		)
	}
}
