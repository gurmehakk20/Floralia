import React from 'react';

// Five-petal line mark used alongside the Floralia wordmark.
export const FlowerMark = ({ className = 'logo-mark', ...svgProps }) => (
  <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...svgProps}>
    <g fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="1.3">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="16" cy="9.2" rx="4.4" ry="6.8" transform={`rotate(${angle} 16 16)`} />
      ))}
    </g>
    <circle cx="16" cy="16" r="2.3" fill="currentColor" />
  </svg>
);

const Logo = ({ tagline = true }) => (
  <>
    <FlowerMark />
    <span className="logo-text">
      <span className="logo-word">Floralia</span>
      {tagline && <span className="logo-tagline">flowers for every feeling</span>}
    </span>
  </>
);

export default Logo;
