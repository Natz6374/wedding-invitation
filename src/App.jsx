import QRCode from 'qrcode';
import React,{useCallback,useEffect,useRef,useState} from 'react';
import FloralCorners from './FloralCorners.jsx';

const WEDDING=new Date('2026-11-30T10:00:00+05:30');
const MOMENTS=['/photos/DSC00006.JPG.jpeg','/photos/DSC00421 0001.jpg.jpeg','/photos/DSC01713.JPG.jpeg','/photos/DSC02829.JPG.jpeg'];
const EVENTS=[
 {day:'Sun, 29 Nov 2026',time:'5:00 pm',title:'Engagement',place:'CSI Community Hall, Karunkal',note:'Solemnized by Most. Rev. Vincent Mar Paulos, Diocese of Marthandam.',map:'CSI Community Hall Karunkal',icon:'ring'},
 {day:'Mon, 30 Nov 2026',time:'10:00 am',title:'Wedding Ceremony',place:"St. Antony’s Church, Mullanganavilai",note:'Solemnized by Most. Rev. Dr. Albert G.A. Annasdas, Diocese of Kuzhithurai',map:'St Antony Church Mullanganavilai',icon:'church'},
 {day:'Mon, 30 Nov 2026',time:'5:00 pm',title:'Reception',place:'J.C. Grand Community Hall, Puthankadai, Thiruvattar',map:'JC Grand Community Hall Thiruvattar',icon:'toast'}];
const LAST=5, THEME=[1,1,1,1,1,1];
function useCountdown(){
 const [t,setT]=useState(()=>WEDDING-Date.now());
 useEffect(()=>{const i=setInterval(()=>setT(WEDDING-Date.now()),1000);return()=>clearInterval(i)},[]);
 const s=Math.max(0,Math.floor(t/1000));
 return {done:t<=0,list:[['Days',Math.floor(s/86400),365],['Hours',Math.floor(s/3600)%24,24],['Minutes',Math.floor(s/60)%60,60],['Seconds',s%60,60]]};
}

function CountdownBar({countdown}){
 return <div className="countdown-bar" role="timer" aria-label="Countdown to the wedding">
  {countdown.done?<p>Today is the day <span aria-hidden="true">♥</span></p>:countdown.list.map(([label,value])=>
   <div className="countdown-unit" key={label}><b>{String(value).padStart(2,'0')}</b><span>{label}</span></div>)}
 </div>;
}

/* ambient petals + rising hearts, cursor sparkles, click bursts, finale fireworks */
function Magic({page}){
 const ref=useRef(),fx=useRef([]),burst=useRef();
 useEffect(()=>{
  const c=ref.current,x=c.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let w,h,raf;
  const fit=()=>{w=c.width=innerWidth;h=c.height=innerHeight};fit();addEventListener('resize',fit);
  const amb=Array.from({length:reduce?0:46},(_,i)=>({x:Math.random()*w,y:Math.random()*h,r:5+Math.random()*9,s:.4+Math.random(),a:Math.random()*6,v:.01+Math.random()*.02,heart:i%4===0,c:['#f3a9b8','#fbd5d0','#e8c07a','#fff'][i%4]}));
  burst.current=(bx,by,n=18,gold)=>{for(let i=0;i<n;i++){const a=Math.PI*2*i/n+Math.random()*.4,sp=1.5+Math.random()*3.5;fx.current.push({x:bx,y:by,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-1,l:0,m:70+Math.random()*30,s:10+Math.random()*12,c:gold?'#e8c07a':['#e0607e','#f3a9b8','#c99a6b','#fff'][i%4],t:'♥'})}};
  const move=e=>{if(!reduce&&Math.random()<.5)fx.current.push({x:e.clientX,y:e.clientY,vx:Math.random()-.5,vy:Math.random()*.8,l:0,m:40,s:8+Math.random()*6,c:'#e8c07a',t:'✦'})};
  const click=e=>burst.current(e.clientX,e.clientY);
  addEventListener('pointermove',move);addEventListener('pointerdown',click);
  const tick=()=>{x.clearRect(0,0,w,h);x.textAlign='center';
   for(const p of amb){p.y+=p.heart?-p.s*.8:p.s;p.a+=p.v;p.x+=Math.sin(p.a)*.8;if(p.y>h+20)p.y=-20;if(p.y<-20)p.y=h+20;
    x.save();x.translate(p.x,p.y);x.fillStyle=p.c;x.globalAlpha=.7;
    if(p.heart){x.font=p.r*2+'px serif';x.fillText('♥',0,0)}else{x.rotate(p.a);x.beginPath();x.ellipse(0,0,p.r,p.r*.55,0,0,6.3);x.fill()}x.restore()}
   fx.current=fx.current.filter(p=>p.l<p.m);
   for(const p of fx.current){p.l++;p.x+=p.vx;p.y+=p.vy;p.vy+=.04;x.globalAlpha=1-p.l/p.m;x.fillStyle=p.c;x.font=p.s+'px serif';x.fillText(p.t,p.x,p.y)}
   raf=requestAnimationFrame(tick)};tick();
  return()=>{cancelAnimationFrame(raf);removeEventListener('resize',fit);removeEventListener('pointermove',move);removeEventListener('pointerdown',click)}},[]);
 useEffect(()=>{if(page!==LAST)return;const i=setInterval(()=>burst.current(innerWidth*(.15+Math.random()*.7),innerHeight*(.15+Math.random()*.4),28,Math.random()<.4),700);return()=>clearInterval(i)},[page]);
 return <canvas ref={ref} className="magic" aria-hidden="true"/>;
}

const U=13,IP=(x,y,z)=>[+(50+(x-y)*.866*U).toFixed(1),+(30+(x+y)*.5*U-z*U).toFixed(1)];
const PG=(pts,f,k)=><polygon key={k} points={pts.map(p=>IP(...p).join(',')).join(' ')} fill={f}/>;
const BOX=(x,y,z,w,d,h,c)=>[PG([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],c[0],'t'),PG([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]],c[1],'l'),PG([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],c[2],'r')];
const ROOF=(x,y,z,w,d,h,c)=>{const a=[x+w/2,y+d/2,z+h];return [PG([[x,y+d,z],[x+w,y+d,z],a],c[0],'a'),PG([[x+w,y,z],[x+w,y+d,z],a],c[1],'b')]};
const GOLD=['#f3d59a','#d9aa66','#b98445'];
export function Iso({k}){
 const slab=<g key="s">{BOX(0,0,0,4,4,.35,['#fff1ef','#f1b3c1','#dd8fa6'])}</g>;
 const art={
  church:<g>{BOX(.5,1.7,.35,.9,.9,1.6,['#fff','#f9e8ea','#ebd0d6'])}{ROOF(.4,1.6,1.95,1.1,1.1,.9,['#e08aa0','#c0607a'])}{BOX(.87,2.07,2.85,.16,.16,.6,GOLD)}{BOX(.65,2.07,3.15,.6,.16,.13,GOLD)}
   {PG([[.75,2.6,.35],[1.15,2.6,.35],[1.15,2.6,1.1],[.75,2.6,1.1]],'#7a2a4a','d')}
   {BOX(1.3,1.1,.35,2.1,1.7,1.2,['#fff','#f6dfe3','#e8c3cb'])}{ROOF(1.2,1,1.55,2.3,1.9,.9,['#d9788f','#b85a74'])}
   {PG([[1.6,2.8,.8],[1.85,2.8,.8],[1.85,2.8,1.15],[1.6,2.8,1.15]],'#ffe3a0','w1')}{PG([[2.2,2.8,.8],[2.45,2.8,.8],[2.45,2.8,1.15],[2.2,2.8,1.15]],'#ffe3a0','w2')}</g>,
  ring:<g><ellipse cx="41" cy="46" rx="13" ry="17" fill="none" stroke="#a8742f" strokeWidth="7"/><ellipse cx="40" cy="45" rx="13" ry="17" fill="none" stroke="#f0cc84" strokeWidth="4"/>
   <ellipse cx="59" cy="46" rx="13" ry="17" fill="none" stroke="#a8742f" strokeWidth="7"/><ellipse cx="58" cy="45" rx="13" ry="17" fill="none" stroke="#f0cc84" strokeWidth="4"/>
   <polygon points="59,15 66,21 59,32 52,21" fill="#d6efff"/><polygon points="52,21 66,21 59,32" fill="#8fc6ec"/><polygon points="59,15 66,21 59,21" fill="#fff"/></g>,
  toast:<g>{[[38,14],[62,-14]].map(([tx,r],i)=><g key={i} transform={`translate(${tx},60) rotate(${r})`}><ellipse rx="8" ry="2.6" fill="#e9b9c4"/><rect x="-1.2" y="-18" width="2.4" height="18" fill="#f4d9df"/>
    <path d="M-2.5 -17 L-8 -46 Q0 -50 8 -46 L2.5 -17Z" fill="#ffffffcc" stroke="#c9798a" strokeWidth="1"/><path d="M-2 -18 L-6.4 -37 Q0 -39.5 6.4 -37 L2 -18Z" fill="#f2c777"/><circle cx="-1" cy="-28" r="1.2" fill="#fff"/><circle cx="2" cy="-33" r="1" fill="#fff"/></g>)}
   <text x="50" y="10" fontSize="11" textAnchor="middle" fill="#e0607e">♥</text></g>,
  heart:<g>{[7,6,5,4,3,2,1].map(d=><path key={d} transform={`translate(0,${d})`} d="M50 56 C20 36 28 14 42 18 C47 19 50 24 50 24 C50 24 53 19 58 18 C72 14 80 36 50 56Z" fill="#a8365a"/>)}
   <path d="M50 56 C20 36 28 14 42 18 C47 19 50 24 50 24 C50 24 53 19 58 18 C72 14 80 36 50 56Z" fill="#e0607e"/><ellipse cx="38" cy="26" rx="5" ry="3" fill="#fff" opacity=".6" transform="rotate(-30 38 26)"/></g>};
 return <svg viewBox="0 0 100 100" className="iso-ic" aria-hidden="true">{slab}{art[k]}</svg>;
}

function QR({q}){const [s,setS]=useState('');
 useEffect(()=>{QRCode.toString('https://www.google.com/maps/search/'+encodeURIComponent(q),{type:'svg',margin:1,color:{dark:'#3a1224',light:'#0000'}}).then(setS)},[q]);
 return <div className="qr" dangerouslySetInnerHTML={{__html:s}} aria-label={'QR code for '+q}/>}

function Gates({onOpen}){
 const [o,setO]=useState(false);
 return <div className={'gates'+(o?' open':'')}>
  <div className="door dl"/><div className="door dr"/>
  <button className="seal" disabled={o} onClick={()=>{setO(true);onOpen()}} aria-label="Open wedding invitation">
   <span className="eyebrow">A LETTER OF LOVE</span><img className="seal-monogram" src="/images/couple-monogram.png" alt="Adolph and Jenisha's floral monogram"/>
   <span className="seal-heart">♥</span><strong>Some days change everything.</strong><span>We would love to share ours with you.</span>
   <span className="open-label">OPEN OUR INVITATION <b>↗</b></span><small>30 NOVEMBER 2026</small>
  </button>
 </div>;
}

function Coverflow(){
 const [i,setI]=useState(0),t0=useRef(0);
 const s=MOMENTS;
 useEffect(()=>{const t=setInterval(()=>setI(n=>(n+1)%s.length),4200);return()=>clearInterval(t)},[s.length]);
 const step=d=>setI((i+d+s.length)%s.length);
 return <div className="flow" onPointerDown={e=>t0.current=e.clientX} onPointerUp={e=>{const d=e.clientX-t0.current;if(Math.abs(d)>40)step(d<0?1:-1)}} onTouchStart={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()}>
  {s.map((m,k)=>{let o=k-i;if(o>s.length/2)o-=s.length;if(o<-s.length/2)o+=s.length;
   return <figure key={k} className="frame" style={{transform:`translateX(${o*58}%) translateZ(${-Math.abs(o)*140}px) rotateY(${-o*38}deg)`,opacity:Math.abs(o)>2?0:1-Math.abs(o)*.25,zIndex:9-Math.abs(o)}} onClick={()=>setI(k)}>
    <img src={m} alt={`Adolph and Jenisha ${k+1}`} draggable="false"/></figure>})}
  <button className="fn l" onClick={()=>step(-1)} aria-label="Previous photo">‹</button><button className="fn r" onClick={()=>step(1)} aria-label="Next photo">›</button>
 </div>;
}

function Rsvp(){
 const [f,setF]=useState({name:'',guests:1,attending:true,message:''}),[st,setSt]=useState('');
 const send=async()=>{if(st==='sending')return;if(!f.name.trim()){setSt('Please enter your name.');return}setSt('sending');try{const r=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)});setSt(r.ok?'sent':'Please enter your name.')}catch{setSt('Could not send. Please try again.')}};
 if(st==='sent')return <p className="thanks">Thank you, {f.name}.<br/>{f.attending?'We can’t wait to celebrate with you. 💖':'You will be in our hearts on the day.'}</p>;
 return <div className="rsvp a" style={{'--i':2}}>
  <input aria-label="Your name" autoComplete="name" maxLength="80" placeholder="Your name" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
  <div className="row"><label>Guests <input type="number" min="1" max="10" value={f.guests} onChange={e=>setF({...f,guests:e.target.value})}/></label>
   <label><input type="checkbox" checked={f.attending} onChange={e=>setF({...f,attending:e.target.checked})}/> I will attend</label></div>
  <textarea aria-label="A wish for the couple" maxLength="300" rows="2" placeholder="A wish for the couple" value={f.message} onChange={e=>setF({...f,message:e.target.value})}/>
  <button className="btn" disabled={st==='sending'} onClick={send}>{st==='sending'?'Sending…':'Send with love'}</button>{st&&st!=='sending'&&<small className="err" role="status">{st}</small>}</div>;
}

export default function App(){
 const [p,setP]=useState(0),[opened,setOpened]=useState(false),[playing,setPlaying]=useState(false),cd=useCountdown();
 const audio=useRef(),lock=useRef(0),ts=useRef({x:0,y:0,target:null}),pages=useRef([]);
 const go=useCallback(d=>{const now=Date.now();if(now-lock.current<900)return;lock.current=now;setP(v=>Math.min(LAST,Math.max(0,v+d)))},[]);
 const start=()=>{setTimeout(()=>setOpened(true),1600);audio.current?.play().then(()=>setPlaying(true)).catch(()=>{})};
 const toggle=()=>{if(playing){audio.current.pause();setPlaying(false)}else audio.current.play().then(()=>setPlaying(true)).catch(()=>{})};
 const canScroll=d=>{const el=pages.current[p];if(!el||el.scrollHeight<=el.clientHeight+4)return false;return d>0?el.scrollTop+el.clientHeight<el.scrollHeight-4:el.scrollTop>4};
 useEffect(()=>{if(!opened)return;
  const wh=e=>{if(Math.abs(e.deltaY)<20||canScroll(e.deltaY))return;go(e.deltaY>0?1:-1)};
  const kd=e=>{if(e.target.matches('input,textarea'))return;if(['ArrowDown','ArrowRight','PageDown'].includes(e.key))go(1);if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key))go(-1)};
  const td=e=>{const touch=e.touches[0];ts.current={x:touch.clientX,y:touch.clientY,target:e.target}};
  const tu=e=>{
   const touch=e.changedTouches[0],dx=ts.current.x-touch.clientX,d=ts.current.y-touch.clientY;
   if(Math.abs(d)>55){if(!canScroll(d))go(d>0?1:-1);return}
   if(Math.max(Math.abs(dx),Math.abs(d))>12||!matchMedia('(max-width: 700px)').matches)return;
   const target=ts.current.target;
   if(target instanceof Element&&target.closest('button,a,input,textarea,select,[role="button"]'))return;
   if(pages.current[p]?.contains(target))go(1);
  };
  addEventListener('wheel',wh,{passive:true});addEventListener('keydown',kd);addEventListener('touchstart',td,{passive:true});addEventListener('touchend',tu,{passive:true});
  return()=>{removeEventListener('wheel',wh);removeEventListener('keydown',kd);removeEventListener('touchstart',td);removeEventListener('touchend',tu)}},[opened,go,p]);
 const cal=()=>window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Wedding of Dr. R. Adolph Rijo & Dr. T.A. Jenisha')+'&dates=20261130T043000Z/20261130T063000Z&location='+encodeURIComponent("St. Antony's Church, Mullanganavilai"),'_blank');
 const cls=i=>'page'+(i===p?' on':i<p?' past':' next'), R=i=>el=>{pages.current[i]=el};

 return <div className="stage" data-t={THEME[p]}>
  <audio ref={audio} src="/audio/song.mp3" loop preload="auto"/>
  {[0,1,2,3,4,5].map(i=><div key={i} className={'bg b'+i+(THEME[p]===i?' show':'')}/>)}
  <FloralCorners variant="overlay"/>
  <Magic page={p}/>
  <div className="prog" style={{transform:`scaleX(${p/LAST})`}}/>
  {!opened&&<Gates onOpen={start}/>}
  {opened&&<CountdownBar countdown={cd}/>}
  <button className="music" onClick={toggle} aria-label={playing?'Pause music':'Play music'}>{playing?'♫':'♪'}</button>
  {opened&&p<LAST&&<button className="more" onClick={()=>go(1)} aria-label="Next page"><span>Swipe up</span><i>⌄</i></button>}

  {opened&&<nav className="slide-nav" aria-label="Invitation slides"><button disabled={p===0} onClick={()=>go(-1)} aria-label="Previous slide">←</button>{['Invitation','Our blessing','With joy','Celebrations','Our moments','Join us'].map((label,i)=><button key={label} className={p===i?'selected':''} aria-label={label} aria-current={p===i?'step':undefined} onClick={()=>setP(i)}><span>{String(i+1).padStart(2,'0')}</span><small>{label}</small></button>)}<button disabled={p===LAST} onClick={()=>go(1)} aria-label="Next slide">→</button></nav>}
  <main aria-label="Wedding invitation" inert={!opened?'':undefined}>
   <section ref={R(0)} className={cls(0)} aria-hidden={p!==0} inert={p!==0?'':undefined}><div className="c cover">
    <p className="eyebrow a">TOGETHER, BY GOD’S GRACE</p><h1 className="a" style={{'--i':1}}>Wedding Invitation</h1>

    <div className="linked-hearts a" style={{'--i':2}} aria-hidden="true">
      <img src="/images/gold-hearts.png" alt="Linked Gold Hearts" className="linked-hearts-img" />
    </div>

    <p className="script tagline a" style={{'--i':2}}>Two hearts, one story</p>
    <div className="couple a" style={{'--i':3}}><h2><small>Dr. R.</small> Adolph Rijo</h2><em>&</em><h2><small>Dr. T.A.</small> Jenisha</h2></div>
    <div className="date-ribbon a" style={{'--i':4}}>MONDAY <b>30</b> NOVEMBER <span>2026</span></div>
    <p className="a cover-note" style={{'--i':5}}>A lifetime of love begins with a day shared with you.</p><button className="btn a" style={{'--i':6}} onClick={()=>go(1)}>Our invitation <span>→</span></button>
   </div></section>
   <section ref={R(1)} className={cls(1)} aria-hidden={p!==1} inert={p!==1?'':undefined}><div className="c blessing">
    <p className="eyebrow blessing-ref a">UNITED IN FAITH · BOUND BY LOVE</p>

    <div className="blessing-rings a" aria-hidden="true" style={{'--i':1}}>
      <img src="/images/realistic-rings.png" alt="Wedding Rings" className="blessing-rings-img" />
    </div>

    <blockquote className="verse a" style={{'--i':2}}>“So they are no longer two, but one flesh. Therefore what God has joined together, let man not separate.”</blockquote>
    <p className="eyebrow verse-ref a" style={{'--i':3}}>MATTHEW <span className="verse-ref-number">19:6</span></p><div className="ornament">✦</div>
    <p className="ta a" lang="ta" style={{'--i':4}}>இனி அவர்கள் இருவர் அல்ல, ஒரே உடல்; எனவே இறைவன் இணைத்ததை மனிதர் பிரிக்காதிருக்கட்டும் (மத். <span className="verse-ref-number">19:6</span>)</p>
   </div></section>
   <section ref={R(2)} className={cls(2)} aria-hidden={p!==2} inert={p!==2?'':undefined}><div className="c paper family">
    <p className="eyebrow family-hosts a">Er. A. Raj &amp; M. Rejini Vijila Bai</p><h2 className="script a" style={{'--i':1}}>With joy, we invite you</h2>
    <div className="family-divider a" style={{'--i':1.5}} aria-hidden="true"></div>
    <p className="invite-copy a" style={{'--i':2}}>Together with our families,<br/>we cordially invite you and your loved ones<br/>to join us in celebrating the wedding of our beloved son,</p>
    <div className="family-names stack a" style={{'--i':3}}><h3>Dr. R. Adolph Rijo</h3><span>with</span><h3>Dr. T. A. Jenisha</h3></div>
    <p className="a detail" style={{'--i':4}}>Daughter of</p><p className="parents a" style={{'--i':4}}>Mr. R. Thomson &amp; Mrs. S. Anitha</p><p className="detail a" style={{'--i':4}}>Mangarai Post.</p>
    <p className="family-foot a" style={{'--i':5}}>Your gracious presence and blessings will make this joyous occasion even more special as the couple begins their beautiful journey of togetherness.</p>
   </div></section>
   <section ref={R(3)} className={cls(3)} aria-hidden={p!==3} inert={p!==3?'':undefined}><div className="c wide events-page">
    <p className="eyebrow a">A CELEBRATION OF LOVE</p><h2 className="script a" style={{'--i':1}}>A beautiful beginning forever</h2><p className="a event-intro" style={{'--i':1}}>The celebrations · Find your way to us</p>
    <div className="event-grid">{EVENTS.map((e,k)=><article className="event-card a" key={e.title} style={{'--i':k+2}}>
      <div className="event-top"><Iso k={e.icon}/></div>
      <div className="event-content">
        <p className="eyebrow">{e.day}</p>
        <h3>{e.title}</h3>
        <p className="event-time">{e.time}</p>
        <div className="event-rule"/>
        <p className="event-place">{e.place}</p>
        {e.note&&<p className="detail officiant">{e.note}</p>}
        <div className="directions"><QR q={e.map}/><a className="map-link" href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(e.map)} target="_blank" rel="noreferrer">Get directions ↗<small>Tap or scan to find us</small></a></div>
      </div>
    </article>)}</div>
    <button className="btn ghost a" style={{'--i':5}} onClick={cal}>♡ Save the wedding date</button>
   </div></section>
   <section ref={R(4)} className={cls(4)} aria-hidden={p!==4} inert={p!==4?'':undefined}><div className="c wide"><p className="eyebrow a">THE LITTLE MOMENTS, THE LIFELONG MEMORIES</p><h2 className="script a" style={{'--i':1}}>Our story in moments</h2><div className="a" style={{'--i':2}}><Coverflow/></div><p className="detail moment-caption">A glimpse of our journey, before forever begins.</p></div></section>
   <section ref={R(5)} className={cls(5)} aria-hidden={p!==5} inert={p!==5?'':undefined}><div className="c wide finale">
    <div className="rsvp-panel"><p className="eyebrow a">A SEAT SAVED, A MEMORY WAITING</p><h2 className="script a" style={{'--i':1}}>Will you join us?</h2><p className="a" style={{'--i':1}}>Our day will be lovelier, and our joy complete, with you by our side.</p><Rsvp/></div>
    <div className="closing a" style={{'--i':3}}><svg className="closing-heart" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="closing-heart-fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f4c2cb"/><stop offset="1" stopColor="#d96f89"/></linearGradient></defs><path d="M50 86C43 80 12 58 12 35 12 20 23 11 36 11c7 0 12 4 14 11 2-7 8-11 15-11 13 0 23 10 23 24 0 23-30 45-38 51Z" fill="url(#closing-heart-fill)" stroke="#f4d5ad" strokeWidth="2.5" strokeLinejoin="round"/><path d="M26 31c1-7 6-11 12-11" fill="none" stroke="#fff7ef" strokeWidth="3" strokeLinecap="round" opacity=".8"/><path d="m50 31 2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.9Z" fill="#fff7ef" opacity=".85"/></svg><h3>See you on the<br/><em>happiest day.</em></h3><p className="eyebrow">WITH BEST COMPLIMENTS FROM</p><p className="compliments">Dr. R. Alen Rinisha,<br/>Dr. S. Boffin Steeve &amp; Family</p><a className="contact" href="tel:+919384589330">Contact · <span className="contact-number">+91 93845 89330</span></a><button className="restart" onClick={()=>setP(0)}>Read our invitation again ↺</button></div>
   </div></section>
  </main>
 </div>;
}