const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const ChevronLeft = () => (<svg {...base}><path d="M15 18l-6-6 6-6" /></svg>);
export const ArrowRight = () => (<svg {...base}><path d="M19 12H5M11 6l-6 6 6 6" transform="translate(24 0) scale(-1 1)" /></svg>);
export const Check = () => (<svg {...base}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const Cross = () => (<svg {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>);
