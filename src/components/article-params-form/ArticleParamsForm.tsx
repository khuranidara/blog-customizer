import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import React, { useState } from 'react';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
