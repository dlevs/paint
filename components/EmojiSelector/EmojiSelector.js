import { h, Component } from 'preact';
import EmojiSelectorDialog from './EmojiSelectorDialog';

export default class EmojiSelectorInput extends Component {
	constructor(props) {
		super(props);
		this.state = {isSelecting: false};
		this.handleInput = this.handleInput.bind(this);
		this.showEmojiSelector = this.showEmojiSelector.bind(this);
	}

	showEmojiSelector() {
		this.setState({
			isSelecting: true
		});
	}

	handleInput(e) {
		this.props.handleInput(e);
		this.setState({
			isSelecting: false
		});
	}

	render({value}, {isSelecting}) {
		return (
			<div>
				<button onClick={this.showEmojiSelector}>{value}</button>
				{isSelecting && <EmojiSelectorDialog handleInput={this.handleInput}/>}
			</div>
		)
	}
}
