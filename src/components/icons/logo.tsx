import React from 'react';

const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    <path
      d="M16 0L32 16L16 32L0 16L16 0Z"
      fill="currentColor"
    />
    <path
      d="M16 8L24 16L16 24L8 16L16 8Z"
      fill="hsl(var(--accent))"
    />
  </svg>
);

export default Logo;
