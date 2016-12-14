import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setColor, switchColors } from '../../core/actions/colorsActions';
import style from './ColorPicker.css';

const ColorInput = ({type, className, value, onChange}) => (
	<div
		className={className}
		style={{backgroundColor: value}}
	>
		<input
			className={style.colorInput}
			type="color"
			value={value}
			onChange={onChange}
			data-type={type}
		/>
	</div>
);

const ColorPicker = ({
	primaryColor,
	secondaryColor,
	handleChange,
	switchColors
}) => (
	<div className={style.container}>
		<ColorInput
			className={style.swatchPrimary}
			type="primary"
			value={primaryColor}
			onChange={handleChange}
		/>
		<ColorInput
			className={style.swatchSecondary}
			type="secondary"
			value={secondaryColor}
			onChange={handleChange}
		/>
		<i className={`fa fa-exchange ${style.colorSwitcher}`}
		   onClick={switchColors}/>
	</div>
);

export default connect(
	(state) => ({
		primaryColor: state.colors.primary,
		secondaryColor: state.colors.secondary
	}),
	(dispatch) => ({
		handleChange: ({target}) => {
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
