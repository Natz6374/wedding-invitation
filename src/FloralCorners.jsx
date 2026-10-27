import React,{useId,useState} from 'react';
import './FloralCorners.css';

function FloralSvgFallback(){
 const id=useId().replace(/:/g,'');
 const ref=name=>`${id}-${name}`;
 return <svg className="floral-corners__fallback" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
   <radialGradient id={ref('pink')} cx="50%" cy="35%" r="70%">
    <stop stopColor="#FBE3E6"/><stop offset=".48" stopColor="#F2C4CC"/><stop offset=".82" stopColor="#E8A9B5"/><stop offset="1" stopColor="#C9788C"/>
   </radialGradient>
   <radialGradient id={ref('pink-deep')} cx="50%" cy="40%" r="70%">
    <stop stopColor="#FBE3E6"/><stop offset=".55" stopColor="#D98FA0"/><stop offset="1" stopColor="#C9788C"/>
   </radialGradient>
   <radialGradient id={ref('mauve')} cx="45%" cy="35%" r="70%">
    <stop stopColor="#E5D6D8"/><stop offset=".55" stopColor="#C9B2B8"/><stop offset="1" stopColor="#B59DA6"/>
   </radialGradient>
   <radialGradient id={ref('cream')} cx="40%" cy="30%" r="75%">
    <stop stopColor="#FFF6E3"/><stop offset="1" stopColor="#F7EBD0"/>
   </radialGradient>
   <radialGradient id={ref('leaf')} cx="35%" cy="30%" r="80%">
    <stop stopColor="#C5D8C1"/><stop offset=".6" stopColor="#A9C2A6"/><stop offset="1" stopColor="#8FAE92"/>
   </radialGradient>
   <filter id={ref('watercolor')} x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="7" result="paper-noise"/>
    <feDisplacementMap in="SourceGraphic" in2="paper-noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="painted-edge"/>
    <feGaussianBlur in="painted-edge" stdDeviation=".4"/>
   </filter>
   <symbol id={ref('peony')} viewBox="-80 -80 160 160">
    <g filter={`url(#${ref('watercolor')})`}>
     <g fill={`url(#${ref('pink')})`} opacity=".9">
      <path d="M0 10C-36-5-40-40-19-58-4-70 10-49 8-24 25-53 53-52 62-34 70-16 46-2 17 7 47 0 68 18 58 38 47 60 21 43 7 18 19 48 4 70-15 62-34 54-24 29-8 12-33 33-58 27-60 8-62-12-34-19-8-2Z"/>
      <path d="M0 7C-24-9-24-31-9-43 2-52 12-35 8-17 23-38 42-38 47-24 52-10 33-1 13 6 36 7 42 23 30 33 18 43 7 27 3 12 3 31-10 41-21 32-32 23-20 8-4 8-22 21-39 16-38 2-37-11-20-15-2 0Z" fill={`url(#${ref('pink-deep')})`}/>
     </g>
     <g fill={`url(#${ref('pink-deep')})`} opacity=".9">
      <ellipse cx="0" cy="-13" rx="8" ry="25"/><ellipse cx="0" cy="-13" rx="8" ry="25" transform="rotate(60)"/>
      <ellipse cx="0" cy="-13" rx="8" ry="25" transform="rotate(120)"/><ellipse cx="0" cy="-13" rx="8" ry="25" transform="rotate(180)"/>
      <ellipse cx="0" cy="-13" rx="8" ry="25" transform="rotate(240)"/><ellipse cx="0" cy="-13" rx="8" ry="25" transform="rotate(300)"/>
     </g>
     <circle r="8" fill="#D9822B"/><circle r="4" fill="#E9B44C"/>
    </g>
   </symbol>
   <symbol id={ref('anemone')} viewBox="-70 -70 140 140">
    <g filter={`url(#${ref('watercolor')})`} fill={`url(#${ref('pink')})`} opacity=".9">
     <ellipse cy="-25" rx="16" ry="34"/><ellipse cy="-25" rx="16" ry="34" transform="rotate(60)"/>
     <ellipse cy="-25" rx="16" ry="34" transform="rotate(120)"/><ellipse cy="-25" rx="16" ry="34" transform="rotate(180)"/>
     <ellipse cy="-25" rx="16" ry="34" transform="rotate(240)"/><ellipse cy="-25" rx="16" ry="34" transform="rotate(300)"/>
     <circle r="14" fill="#D9822B"/><circle r="9" fill="#E9B44C"/>
     {Array.from({length:14},(_,i)=><circle key={i} cx={Math.cos(i*Math.PI/7)*12} cy={Math.sin(i*Math.PI/7)*12} r="2.2" fill="#E9B44C"/>)}
    </g>
   </symbol>
   <symbol id={ref('mauve-rose')} viewBox="-65 -65 130 130">
    <g filter={`url(#${ref('watercolor')})`} fill={`url(#${ref('mauve')})`} opacity=".9">
     <ellipse cy="-20" rx="12" ry="27"/><ellipse cy="-20" rx="12" ry="27" transform="rotate(45)"/>
     <ellipse cy="-20" rx="12" ry="27" transform="rotate(90)"/><ellipse cy="-20" rx="12" ry="27" transform="rotate(135)"/>
     <ellipse cy="-12" rx="8" ry="18" transform="rotate(22)"/><ellipse cy="-12" rx="8" ry="18" transform="rotate(67)"/>
     <ellipse cy="-12" rx="8" ry="18" transform="rotate(112)"/><ellipse cy="-12" rx="8" ry="18" transform="rotate(157)"/>
     <circle r="7" fill="#E9B44C"/>
    </g>
   </symbol>
   <symbol id={ref('cream-blossom')} viewBox="-24 -24 48 48">
    <g filter={`url(#${ref('watercolor')})`} fill={`url(#${ref('cream')})`} opacity=".92">
     <ellipse cy="-9" rx="5" ry="11"/><ellipse cy="-9" rx="5" ry="11" transform="rotate(72)"/>
     <ellipse cy="-9" rx="5" ry="11" transform="rotate(144)"/><ellipse cy="-9" rx="5" ry="11" transform="rotate(216)"/>
     <ellipse cy="-9" rx="5" ry="11" transform="rotate(288)"/><circle r="3.5" fill="#E6B64A"/>
    </g>
   </symbol>
   <symbol id={ref('leaf')} viewBox="-35 -45 70 90">
    <path d="M0 39C-34 10-27-28 0-41 27-28 34 10 0 39Z" fill={`url(#${ref('leaf')})`} opacity=".84"/>
    <path d="M0 35C0 10 0-14 0-36" fill="none" stroke="#7C8F78" strokeWidth="1.5" opacity=".8"/>
    <path d="M0 5-15-10M0-6 14-21M0 17 14 2" fill="none" stroke="#7C8F78" strokeWidth="1" opacity=".65"/>
   </symbol>
  </defs>
  <g fill="none" stroke="#7C8F78" strokeWidth="3" strokeLinecap="round" opacity=".85">
   <path d="M470 55Q690 10 890 155M40 895Q220 780 390 855M935 845Q980 760 990 680"/>
  </g>
  <g className="floral-corners__fallback-leaves">
   <use href={`#${ref('leaf')}`} x="500" y="12" width="56" height="72" transform="rotate(-24 528 48)"/>
   <use href={`#${ref('leaf')}`} x="565" y="24" width="52" height="66" transform="rotate(20 591 57)"/>
   <use href={`#${ref('leaf')}`} x="635" y="27" width="58" height="74" transform="rotate(-18 664 64)"/>
   <use href={`#${ref('leaf')}`} x="710" y="48" width="55" height="70" transform="rotate(20 737 83)"/>
   <use href={`#${ref('leaf')}`} x="12" y="810" width="72" height="92" transform="rotate(-35 48 856)"/>
   <use href={`#${ref('leaf')}`} x="55" y="856" width="66" height="84" transform="rotate(-8 88 898)"/>
   <use href={`#${ref('leaf')}`} x="940" y="765" width="58" height="76" transform="rotate(30 969 803)"/>
  </g>
  <g className="floral-corners__fallback-blooms">
   <use href={`#${ref('peony')}`} x="720" y="-35" width="250" height="250" transform="rotate(-14 845 90)"/>
   <use href={`#${ref('mauve-rose')}`} x="590" y="0" width="155" height="155" transform="rotate(16 667 77)"/>
   <use href={`#${ref('cream-blossom')}`} x="575" y="92" width="58" height="58"/>
   <use href={`#${ref('cream-blossom')}`} x="935" y="142" width="47" height="47"/>
   <use href={`#${ref('anemone')}`} x="-42" y="780" width="250" height="250" transform="rotate(14 83 905)"/>
   <use href={`#${ref('peony')}`} x="125" y="805" width="215" height="215" transform="rotate(-8 232 912)"/>
   <use href={`#${ref('mauve-rose')}`} x="300" y="850" width="160" height="160" transform="rotate(18 380 930)"/>
   <use href={`#${ref('cream-blossom')}`} x="255" y="780" width="55" height="55"/>
   <use href={`#${ref('cream-blossom')}`} x="475" y="900" width="48" height="48"/>
  </g>
 </svg>;
}

export default function FloralCorners({children,className='',variant='card',...props}){
 const [useFallback,setUseFallback]=useState(false);
 const classes=['floral-corners',`floral-corners--${variant}`,className].filter(Boolean).join(' ');
 return <div className={classes} {...props}>
  <div className="floral-corners__art" aria-hidden="true">
   {useFallback?<FloralSvgFallback/>:<>
    {/* Replace these transparent corner cutouts with your own PNG artwork as needed. */}
    <div className="floral-corners__cluster floral-corners__cluster--top">
     <img className="floral-corners__image" src="/florals/top-cluster.png" alt="" onError={()=>setUseFallback(true)}/>
    </div>
    <div className="floral-corners__cluster floral-corners__cluster--bottom">
     <img className="floral-corners__image" src="/florals/bottom-cluster.png" alt="" onError={()=>setUseFallback(true)}/>
    </div>
   </>}
  </div>
  {children&&<div className="floral-corners__content">{children}</div>}
 </div>;
}
