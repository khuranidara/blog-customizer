import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import { Select } from 'components/select';
import * as articleProps from 'src/constants/articleProps';
import { Simulate } from 'react-dom/test-utils';
import select = Simulate.select;
import { Text } from 'components/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

type ArticleParamsFormProps = {
	articleState: articleProps.ArticleStateType;
	onStateChange: (newState: Partial<articleProps.ArticleStateType>) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onStateChange,
}: ArticleParamsFormProps) => {
	const [tempState, setTempState] = useState(articleState);
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const togglePanel = () => {
		setIsOpen(!isOpen);
	};
	const handleOptionChange =
		(optionKey: keyof articleProps.ArticleStateType) =>
		(option: articleProps.OptionType) => {
			setTempState((prev) => ({ ...prev, [optionKey]: option }));
		};
	const handleReset = () => {
		setTempState(articleProps.defaultArticleState);
		onStateChange(articleProps.defaultArticleState);
	};
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onStateChange(tempState);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton onClick={togglePanel} isOpen={isOpen} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={tempState.fontFamilyOption}
						onChange={handleOptionChange('fontFamilyOption')}
						options={articleProps.fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						title='Размер Шрифта'
						options={articleProps.fontSizeOptions}
						selected={tempState.fontSizeOption}
						onChange={handleOptionChange('fontSizeOption')}
					/>
					<Select
						selected={tempState.fontColor}
						onChange={handleOptionChange('fontColor')}
						options={articleProps.fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={tempState.backgroundColor}
						onChange={handleOptionChange('backgroundColor')}
						options={articleProps.backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={tempState.contentWidth}
						onChange={handleOptionChange('contentWidth')}
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
