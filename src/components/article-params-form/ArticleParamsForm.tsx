import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import React, { useState } from 'react';
import { Select } from 'components/select';
import * as articleProps from 'src/constants/articleProps';
import { Simulate } from 'react-dom/test-utils';
import select = Simulate.select;
import { Text } from 'components/text';
import {backgroundColors, contentWidthArr, defaultArticleState, OptionType} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import {Separator} from "components/separator";

export const ArticleParamsForm = () => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const handleFontSizeChange = (option: OptionType) => {
		setFormState({ ...formState, fontSizeOption: option });
	};
	const togglePanel = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton onClick={togglePanel} isOpen={isOpen} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
						options={articleProps.fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						title='Размер Шрифта'
						options={articleProps.fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						selected={formState.fontColor}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, fontColor: value })
						}
						options={articleProps.fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, backgroundColor: value })
						}
						options={articleProps.backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={(value: OptionType) =>
							setFormState({ ...formState, contentWidth: value })
						}
						options={articleProps.contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
