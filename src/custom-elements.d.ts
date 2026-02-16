import type * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'coding-tree-attribution': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        href?: string;
        theme?: string;
        size?: string;
      };
    }
  }
}
