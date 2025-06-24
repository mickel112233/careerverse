import React from 'react';

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g>
      {/* Game Controller */}
      <path
        d="M80.5 73H19.5C16.4624 73 14 70.5376 14 67.5V50.5C14 47.4624 16.4624 45 19.5 45H80.5C83.5376 45 86 47.4624 86 50.5V67.5C86 70.5376 83.5376 73 80.5 73Z"
        className="fill-primary"
      />
      <path
        d="M34 53H26V61H34V53Z"
        className="fill-background"
      />
      <circle cx="68" cy="53" r="4" className="fill-accent" />
      <circle cx="60" cy="61" r="4" className="fill-accent" />

      {/* Brain */}
      <path
        d="M50 43C40.6112 43 33 35.3888 33 26C33 16.6112 40.6112 9 50 9C59.3888 9 67 16.6112 67 26C67 35.3888 59.3888 43 50 43ZM50 13C42.8203 13 37 18.8203 37 26C37 33.1797 42.8203 39 50 39C57.1797 39 63 33.1797 63 26C63 18.8203 57.1797 13 50 13Z"
        className="fill-primary"
      />
      <path
        d="M50 15C49.4477 15 49 15.4477 49 16V22L46 25L49 25V31C49 31.5523 49.4477 32 50 32C50.5523 32 51 31.5523 51 31V25L54 22L51 22V16C51 15.4477 50.5523 15 50 15Z"
        className="fill-accent"
      />
    </g>
  </svg>
);

export default Logo;
