
import React from 'react';

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M50 10 L90 50 L50 90 L10 50 Z"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path
      d="M50 25 L75 50 L50 75 L25 50 Z"
      fill="currentColor"
    />
  </svg>
);

export default Logo;
