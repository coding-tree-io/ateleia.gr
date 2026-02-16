import type { Preview } from '@storybook/react-vite';

import '../../src/styles/global.css';
import '../generated/tokens.css';
import '../stories/base.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true,
    },
  },
};

export default preview;
