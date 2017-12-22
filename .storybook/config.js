import { configure } from '@storybook/react';
import './test';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
