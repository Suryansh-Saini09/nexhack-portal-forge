declare namespace JSX {
  interface IntrinsicElements {
    'lord-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      trigger?: string;
      colors?: string;
      state?: string;
      target?: string;
      delay?: string;
      part?: string;
      style?:string;
      stroke?:string;
      class?:string;
    };
  }
}
