import { h } from 'preact';
import { connect } from 'preact-redux';
import { setColor, switchColors } from '../../../../core/actions/colorsActions';
import ColorInput from '../../../_formControls/ColorInput';
import s from './ColorPicker.css';

const colorKeys = ['primary', 'secondary'];


// Connected components / component lists
//----------------------------------------
const ConnectedColorSwitcher = connect(
	null,
	(dispatch) => ({
		switchColors: () => {
			dispatch(
				switchColors()
			)
		}
	})
)(
	({switchColors}) => (
		<i
			class={`fa fa-exchange ${s.colorSwitcher}`}
			onClick={switchColors}
		/>
	)
);
const connectedColorInputs = colorKeys.map(key => (
	connect(
		(state) => ({
			wrapperClass: s[key],
			value: state.colors[key]
		}),
		(dispatch) => ({
			handleInput: ({target}) => {
				dispatch(
					setColor(key, target.value)
				)
			}
		})
	)(ColorInput)
));

export default () => (
	<div class={s.container}>
		{connectedColorInputs.map(ColorInputComponent => (
			<ColorInputComponent />
		))}
		<ConnectedColorSwitcher />
	</div>
);
