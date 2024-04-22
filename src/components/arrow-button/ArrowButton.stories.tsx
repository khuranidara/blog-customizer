// ArrowButton.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	args: {
		onClick: () => alert('Переключение состояния'),
	},
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: (args) => <ArrowButton {...args} />, // args для передачи пропсов
};
