import React, { PropTypes } from 'react';
import Tabs from '../Tabs';
import Tab from '../Tab';
import { getCategorisedList } from '../../core/emoji';
import _ from 'lodash';
import style from './EmojiSelector.css';

const emojiCategories = getCategorisedList();
console.log(emojiCategories);

export default () => (
	<div className={style.container}>
		<h2>EmojiSelector</h2>
		<Tabs value="flags">
			{_.map(emojiCategories, (emojis, category) => (
				<Tab
					key={category}
					label={category}
					value={category}
				>
					<ul>
						{emojis.map(emoji => (
							<li key={emoji.name}>
								<label>
									{emoji.char}
									<input
										type="radio"
										name="emoji"
										value={emoji.char}
									/>
								</label>
							</li>
						))}
					</ul>
				</Tab>
			))}
		</Tabs>
	</div>
);
