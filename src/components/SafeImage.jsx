import { useState } from "react";

export default function SafeImage({ src, alt, className, style, ...props }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div 
        className={`${className} bg-linear-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center text-white/20 font-bold uppercase tracking-[2px]`} 
        style={style}
        {...props}
      >
        <span>{alt?.charAt(0) || "P"}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
      {...props}
    />
  );
}
