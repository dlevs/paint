import { h } from 'preact';
import { connect } from 'preact-redux';
import { setColor, switchColors } from '../../../../core/actions/colorsActions';
import ColorInput from '../../../../components/_formControls/ColorInput';
import s from './ColorPicker.css';

const colorKeys = ['primary', 'secondary'];


// Connected components / component lists
//----------------------------------------
const ColorSwitcher = connect(null, {switchColors})(
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
				dispatch(setColor(key, target.value))
			}
		})
	)(ColorInput)
));

export default () => (
	<div class={s.container}>
		{connectedColorInputs.map(ColorInputComponent => (
			<ColorInputComponent />
		))}
		<ColorSwitcher />
	</div>
);
