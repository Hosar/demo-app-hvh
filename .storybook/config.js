import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/client/_stories/');
  // You can require as many stories as you need.
}

configure(loadStories, module);