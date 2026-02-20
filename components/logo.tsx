// components/Logo.tsx
export const Logo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Magnifying glass circle */}
    <circle cx="35" cy="35" r="25" stroke="url(#gradient)" strokeWidth="6" fill="none"/>
    
    {/* Lightning bolt inside */}
    <path 
      d="M35 20 L30 35 L35 35 L32 50 L45 32 L38 32 L43 20 Z" 
      fill="url(#gradient)"
    />
    
    {/* Magnifying glass handle */}
    <line x1="52" y1="52" x2="75" y2="75" stroke="url(#gradient)" strokeWidth="6" strokeLinecap="round"/>
    
    {/* Gradient definition */}
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dc2626"/>
        <stop offset="100%" stopColor="#991b1b"/>
      </linearGradient>
    </defs>
  </svg>
);