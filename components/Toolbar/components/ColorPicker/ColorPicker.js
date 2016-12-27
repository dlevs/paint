import { h } from 'preact';
import { connect } from 'preact-redux';
import { setColor, switchColors } from '../../../../core/actions/colorsActions';
import style from './ColorPicker.css';

const ColorInput = ({type, className, value, onInput}) => (
	<div
		class={className}
		style={{backgroundColor: value}}
	>
		<input
			class={style.colorInput}
			type="color"
			value={value}
			onInput={onInput}
			data-type={type}
		/>
	</div>
);

const ColorPicker = ({
	primaryColor,
	secondaryColor,
	handleInput,
	switchColors
}) => (
	<div class={style.container}>
		<ColorInput
			className={style.swatchPrimary}
			type="primary"
			value={primaryColor}
			onInput={handleInput}
		/>
		<ColorInput
			className={style.swatchSecondary}
			type="secondary"
			value={secondaryColor}
			onInput={handleInput}
		/>
		<i class={`fa fa-exchange ${style.colorSwitcher}`}
		   onClick={switchColors}/>
	</div>
);

export default connect(
	(state) => ({
		primaryColor: state.colors.primary,
		secondaryColor: state.colors.secondary
	}),
	(dispatch) => ({
		handleInput: ({target}) => {
			dispatch(
				setColor(target.dataset.type, target.value)
			)
		},
		switchColors: () => {
			dispatch(
				switchColors()
			)
		}
	})
)(ColorPicker);
