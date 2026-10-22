import { useEffect, useId, useRef, useState } from 'react';

const HEART_PATH = 'M260 440C220 401 50 279 50 162 50 79 109 28 181 28 218 28 246 48 260 82 274 48 302 28 339 28 411 28 470 79 470 162 470 279 300 401 260 440Z';
const PARTICLES = Array.from({ length: 10 }, (_, index) => index);

export default function HeartCard({ children, className = '', label = 'Heart-shaped card', style }) {
 const id = useId().replace(/:/g, '');
 const [burst, setBurst] = useState(false);
 const burstTimeout = useRef();
 const burstFrame = useRef();
 const cardRef = useRef(null);

 const triggerBurst = event => {
  const bounds = cardRef.current.getBoundingClientRect();
  const hasPointerPosition = event.detail > 0;
  const x = hasPointerPosition ? event.clientX - bounds.left : bounds.width / 2;
  const y = hasPointerPosition ? event.clientY - bounds.top : bounds.height / 2;
  cardRef.current.style.setProperty('--tap-x', `${(x / bounds.width) * 100}%`);
  cardRef.current.style.setProperty('--tap-y', `${(y / bounds.height) * 100}%`);
  setBurst(false);
  window.clearTimeout(burstTimeout.current);
  window.cancelAnimationFrame(burstFrame.current);
  burstFrame.current = window.requestAnimationFrame(() => setBurst(true));
  burstTimeout.current = window.setTimeout(() => setBurst(false), 800);
 };

 useEffect(() => () => {
  window.clearTimeout(burstTimeout.current);
  window.cancelAnimationFrame(burstFrame.current);
 }, []);

 return <button
  ref={cardRef}
  type="button"
  style={style}
  className={`heart-card ${className}${burst ? ' is-burst' : ''}`}
  aria-label={label}
  onClick={triggerBurst}
 >
  <span className="heart-card__body">
   <span className="heart-card__art" aria-hidden="true">
    <svg className="heart-card__outline" viewBox="0 0 520 480" preserveAspectRatio="none">
     <path d={HEART_PATH} pathLength="1"/>
    </svg>
    <svg className="heart-card__shape" viewBox="0 0 520 480" preserveAspectRatio="none">
     <defs>
      <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
       <stop offset="0%" stopColor="#fbe6e1"/>
       <stop offset="100%" stopColor="#c9798a"/>
      </linearGradient>
      <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2=".72" y2=".72">
       <stop offset="0%" stopColor="#fff" stopOpacity=".78"/>
       <stop offset="48%" stopColor="#fff" stopOpacity=".2"/>
       <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
      </linearGradient>
      <clipPath id={`${id}-clip`}><path d={HEART_PATH}/></clipPath>
     </defs>
     <path className="heart-card__edge-glow" d={HEART_PATH}/>
     <path className="heart-card__fill" d={HEART_PATH} fill={`url(#${id}-fill)`}/>
     <path className="heart-card__sheen" d={HEART_PATH} fill={`url(#${id}-sheen)`} clipPath={`url(#${id}-clip)`}/>
     <path className="heart-card__stroke" d={HEART_PATH}/>
    </svg>
   </span>
   <span className="heart-card__content">{children}</span>
   <span className="heart-card__sparks" aria-hidden="true">
    <svg className="heart-card__drift heart-card__drift--one" viewBox="0 0 24 24"><path d="M12 21C9 18 3 13 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5-6 10-9 13Z"/></svg>
    <svg className="heart-card__drift heart-card__drift--two" viewBox="0 0 24 24"><path d="m12 1 2.2 7.1L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-3.9Z"/></svg>
    <svg className="heart-card__drift heart-card__drift--three" viewBox="0 0 24 24"><path d="M12 21C9 18 3 13 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5-6 10-9 13Z"/></svg>
    {PARTICLES.map(index=><svg key={index} className={`heart-card__burst-particle heart-card__burst-particle--${index%3}`} viewBox="0 0 24 24" style={{'--angle':`${index*36}deg`,'--distance':`${45+(index%4)*15}px`}}>
     {index%3===0?<path d="M12 21C9 18 3 13 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5-6 10-9 13Z"/>:index%3===1?<path d="m12 1 2.2 7.1L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-3.9Z"/>:<path d="M12 2C8 7 5 10 5 14a7 7 0 0 0 14 0c0-4-3-7-7-12Z"/>}
    </svg>)}
   </span>
  </span>
 </button>;
}