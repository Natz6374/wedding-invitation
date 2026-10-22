import QRCode from 'qrcode';
import React,{useCallback,useEffect,useRef,useState} from 'react';
import HeartCard from './HeartCard.jsx';

const WEDDING=new Date('2026-11-30T10:00:00+05:30');
const EVENTS=[
 {day:'Sun, 29 Nov 2026',time:'5:00 pm',title:'Engagement',place:'CSI Community Hall, Karunkal',map:'CSI Community Hall Karunkal',icon:'ring'},
 {day:'Mon, 30 Nov 2026',time:'10:00 am',title:'Wedding Ceremony',place:"St. Antony’s Church, Mullanganavilai",note:'Solemnized by Most. Rev. Dr. Albert G.A. Annasdas, Diocese of Kuzhithurai',map:'St Antony Church Mullanganavilai',icon:'church'},
 {day:'Mon, 30 Nov 2026',time:'5:00 pm',title:'Reception',place:'J.C. Grand Community Hall, Puthankadai, Thiruvattar',map:'JC Grand Community Hall Thiruvattar',icon:'toast'}];
const BLESSINGS=['Most. Rev. Dr. வின்சென்ட் மார் பவுலோஸ்','Most. Rev. யூகானோன் மார் கிறிஸோஸ்டோம்','Most. Rev. மார் ஜார்ஜ் ராஜேந்திரன்','Most. Rev. Dr. நசரேன் சூசை','Rt. Rev. Dr. S. கிறிஸ்டோபர் விஜயன்','Rev. I. வினில் சதீஷ்','Most. Rev. மரிய ராஜ்','Most. Rev. சுந்தர் சிங்','Rev. Dr. K. சுந்தர் ராஜ்','Rev. சத்திய நாதன்','Commissioner. லால்மிங்லியானா','Bishop. சாது டேனியல்','Rt. Rev. A.R. செல்லையா'];
const LAST=11, THEME=[0,0,1,1,2,2,3,3,4,4,4,5];
const PHOTO=['/venues/karunkal.jpg','/venues/church.jpg','/venues/thiruvattar.jpg'];
const AT=['2026-11-29T17:00+05:30','2026-11-30T10:00+05:30','2026-11-30T17:00+05:30'].map(d=>new Date(d));

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

function Live(){
 const [n,setN]=useState(Date.now());useEffect(()=>{const i=setInterval(()=>setN(Date.now()),30000);return()=>clearInterval(i)},[]);
 return <ol className="path live">{EVENTS.map((e,k)=>{const st=n<AT[k]?'soon':n<AT[k].getTime()+4*36e5?'now':'done';
  return <li key={k} className={st}><span><Iso k={e.icon}/></span><div><b>{e.time}</b> {e.title}<small>{st==='now'?'Happening now ♥':st==='done'?'Celebrated with love':e.day}</small></div></li>})}</ol>}

function Gates({onOpen}){
 const [o,setO]=useState(false);
 const open=()=>{if(!o){setO(true);onOpen()}};
 return <div className={'gates'+(o?' open':'')} onClick={open} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&open()} aria-label="Open the invitation">
  <div className="door dl"/><div className="door dr"/>
  <div className="crest"><div className="ring"/><div className="ring r2"/><span>A<i>♥</i>J</span><p>Tap to open our invitation</p></div>
 </div>;
}

function Cube(){return <div className="iso-scene" aria-hidden="true"><div className="cube">{['A','♥','J','2026','30','Nov'].map((f,i)=><div key={i} className={'face f'+i}>{f}</div>)}</div><div className="shadow"/></div>}

function Coverflow(){
 const [imgs,setImgs]=useState([]),[i,setI]=useState(0),t0=useRef(0);
 useEffect(()=>{fetch('/api/photos').then(r=>r.json()).then(setImgs).catch(()=>{})},[]);
 const s=imgs.length?imgs:['First hello','Our favourite place','The proposal','Forever begins','Hand in hand'];
 useEffect(()=>{const t=setInterval(()=>setI(n=>(n+1)%s.length),4200);return()=>clearInterval(t)},[s.length]);
 const step=d=>setI((i+d+s.length)%s.length);
 return <div className="flow" onPointerDown={e=>t0.current=e.clientX} onPointerUp={e=>{const d=e.clientX-t0.current;if(Math.abs(d)>40)step(d<0?1:-1)}} onTouchStart={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()}>
  {s.map((m,k)=>{let o=k-i;if(o>s.length/2)o-=s.length;if(o<-s.length/2)o+=s.length;
   return <figure key={k} className="frame" style={{transform:`translateX(${o*58}%) translateZ(${-Math.abs(o)*140}px) rotateY(${-o*38}deg)`,opacity:Math.abs(o)>2?0:1-Math.abs(o)*.25,zIndex:9-Math.abs(o)}} onClick={()=>setI(k)}>
    {imgs.length?<img src={m} alt={`Adolph and Jenisha ${k+1}`} draggable="false"/>:<div className="ph"><b>♥</b><em>{m}</em><small>Add photos to public/photos</small></div>}</figure>})}
  <button className="fn l" onClick={()=>step(-1)} aria-label="Previous photo">‹</button><button className="fn r" onClick={()=>step(1)} aria-label="Next photo">›</button>
 </div>;
}

function Rsvp(){
 const [f,setF]=useState({name:'',guests:1,attending:true,message:''}),[st,setSt]=useState('');
 const send=async()=>{try{const r=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)});setSt(r.ok?'sent':'Please enter your name.')}catch{setSt('Could not send. Please try again.')}};
 if(st==='sent')return <p className="thanks">Thank you, {f.name}.<br/>{f.attending?'We can’t wait to celebrate with you. 💖':'You will be in our hearts on the day.'}</p>;
 return <div className="rsvp a" style={{'--i':2}}>
  <input placeholder="Your name" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
  <div className="row"><label>Guests <input type="number" min="1" max="10" value={f.guests} onChange={e=>setF({...f,guests:e.target.value})}/></label>
   <label><input type="checkbox" checked={f.attending} onChange={e=>setF({...f,attending:e.target.checked})}/> I will attend</label></div>
  <textarea rows="2" placeholder="A wish for the couple" value={f.message} onChange={e=>setF({...f,message:e.target.value})}/>
  <button className="btn" onClick={send}>Send with love</button>{st&&<small className="err">{st}</small>}</div>;
}

export default function App(){
 const [p,setP]=useState(0),[opened,setOpened]=useState(false),[playing,setPlaying]=useState(false),cd=useCountdown();
 const audio=useRef(),lock=useRef(0),ts=useRef(0),pages=useRef([]);
 const go=useCallback(d=>{const now=Date.now();if(now-lock.current<900)return;lock.current=now;setP(v=>Math.min(LAST,Math.max(0,v+d)))},[]);
 const start=()=>{setTimeout(()=>setOpened(true),1600);audio.current?.play().then(()=>setPlaying(true)).catch(()=>{})};
 const toggle=()=>{if(playing){audio.current.pause();setPlaying(false)}else audio.current.play().then(()=>setPlaying(true)).catch(()=>{})};
 const canScroll=d=>{const el=pages.current[p];if(!el||el.scrollHeight<=el.clientHeight+4)return false;return d>0?el.scrollTop+el.clientHeight<el.scrollHeight-4:el.scrollTop>4};
 useEffect(()=>{if(!opened)return;
  const wh=e=>{if(Math.abs(e.deltaY)<20||canScroll(e.deltaY))return;go(e.deltaY>0?1:-1)};
  const kd=e=>{if(e.target.matches('input,textarea'))return;if(['ArrowDown','ArrowRight','PageDown'].includes(e.key))go(1);if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key))go(-1)};
  const td=e=>{ts.current=e.touches[0].clientY},tu=e=>{const d=ts.current-e.changedTouches[0].clientY;if(Math.abs(d)>55&&!canScroll(d))go(d>0?1:-1)};
  addEventListener('wheel',wh,{passive:true});addEventListener('keydown',kd);addEventListener('touchstart',td,{passive:true});addEventListener('touchend',tu,{passive:true});
  return()=>{removeEventListener('wheel',wh);removeEventListener('keydown',kd);removeEventListener('touchstart',td);removeEventListener('touchend',tu)}},[opened,go,p]);
 const cal=()=>window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Wedding of Adolph & Jenisha')+'&dates=20261130T043000Z/20261130T063000Z&location='+encodeURIComponent("St. Antony's Church, Mullanganavilai"),'_blank');
 const cls=i=>'page'+(i===p?' on':i<p?' past':' next'), R=i=>el=>{pages.current[i]=el};

 return <div className="stage" data-t={THEME[p]}>
  <audio ref={audio} src="/audio/song.mp3.mp3" loop preload="auto"/>
  {[0,1,2,3,4,5].map(i=><div key={i} className={'bg b'+i+(THEME[p]===i?' show':'')}/>)}
  <div className="aurora" aria-hidden="true"><i/><i/><i/></div>
  <Magic page={p}/>
  <div className="prog" style={{transform:`scaleX(${p/LAST})`}}/>
  {!opened&&<Gates onOpen={start}/>}
  {opened&&<CountdownBar countdown={cd}/>}
  <button className="music" onClick={toggle} aria-label={playing?'Pause music':'Play music'}>{playing?'♫':'♪'}</button>
  {opened&&p<LAST&&<button className="more" onClick={()=>go(1)} aria-label="Next page"><span>Swipe up</span><i>⌄</i></button>}

  <main>
   <section ref={R(0)} className={cls(0)}><div className="c">
    <p className="a script sm" style={{'--i':0}}>Wedding Invitation</p>
    <HeartCard className="heart-monogram" style={{'--i':1}} label="A heart J"><span>A</span><i>♥</i><span>J</span></HeartCard>
    <h1 className="a" style={{'--i':2}}>Adolph <em>&amp;</em> Jenisha</h1>
    <p className="a cap" style={{'--i':3}}>30 · 11 · 2026</p></div></section>

   <section ref={R(1)} className={cls(1)}><div className="c">
    <div className="rings a" style={{'--i':0}}><b/><b/></div>
    <p className="a verse" style={{'--i':1}}>“So they are no longer two, but one flesh. Therefore what God has joined together, let man not separate.”</p>
    <small className="a" style={{'--i':2}}>Matthew 19:6</small>
    <p className="a ta" style={{'--i':3}}>இனி அவர்கள் இருவர் அல்ல, ஒரே உடல்; எனவே இறைவன் இணைத்ததை மனிதர் பிரிக்காதிருக்கட்டும் (மத். 19:6)</p></div></section>

   <section ref={R(2)} className={cls(2)}><div className="c">
    <p className="a script sm" style={{'--i':0}}>Two hearts, one story</p>
    <Cube/>
    <h2 className="a nm" style={{'--i':2}}>Dr. R. Adolph Rijo</h2><p className="a w" style={{'--i':3}}>with</p><h2 className="a nm" style={{'--i':4}}>Dr. T.A. Jenisha</h2></div></section>

   <section ref={R(3)} className={cls(3)}><div className="c paper">
    <h2 className="a script" style={{'--i':0}}>With joy, we invite you</h2>
    <p className="a" style={{'--i':1}}><b>Er. A. Raj &amp; Mrs. M. Rejini Vijila Bai</b><br/><em>(Ex. Presidents, Kannanoor Panchayat)</em><br/>8-36, Raj Bhavan, Paravakkattuvilai, Mekkamandapam Post.</p>
    <p className="a" style={{'--i':2}}>cordially solicit your esteemed presence and prayers with family on this auspicious occasion of the wedding of their son</p>
    <p className="a nm sm2" style={{'--i':3}}>Dr. R. Adolph Rijo</p><p className="a w" style={{'--i':3}}>with</p><p className="a nm sm2" style={{'--i':4}}>Dr. T.A. Jenisha</p>
    <p className="a" style={{'--i':5}}>D/o <b>Mr. R. Thomson &amp; Mrs. S. Anitha</b><br/>15/47A, Amalorpavapuram, Mangarai Post.</p></div></section>

   <section ref={R(4)} className={cls(4)}><div className="c">
    <h2 className="a script" style={{'--i':0}}>Counting every heartbeat</h2>
    {cd.done?<><p className="thanks">Today is the day 💖</p><Live/></>:<div className="clock">{cd.list.map(([k,v,m],i)=><div className="dial a" style={{'--i':i+1}} key={k}>
     <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44"/><circle className="v" cx="50" cy="50" r="44" style={{strokeDashoffset:276*(1-v/m)}}/></svg><b key={v}>{String(v).padStart(2,'0')}</b><span>{k}</span></div>)}</div>}
    <p className="a cap" style={{'--i':5}}>until Monday, 30 November 2026 · 10:00 am</p>
    <button className="btn ghost a" style={{'--i':6}} onClick={cal}>Save the date</button></div></section>

   <section ref={R(5)} className={cls(5)}><div className="c wide">
    <h2 className="a script" style={{'--i':0}}>Our story in moments</h2><div className="a" style={{'--i':1}}><Coverflow/></div></div></section>

   <section ref={R(6)} className={cls(6)}><div className="c wide">
    <h2 className="a script" style={{'--i':0}}>The celebrations</h2>
    <div className="iso">{EVENTS.map((e,k)=><article key={k} className="tile a" style={{'--i':k+1,'--d':k}}>
     <div className="slab"><Iso k={e.icon}/></div><h3>{e.title}</h3><p className="when">{e.day} · {e.time}</p><p>{e.place}</p>{e.note&&<p className="note">{e.note}</p>}
     <a href={'https://www.google.com/maps/search/'+encodeURIComponent(e.map)} target="_blank" rel="noreferrer">Open in Maps</a></article>)}</div></div></section>

   <section ref={R(7)} className={cls(7)}><div className="c wide">
    <h2 className="a script" style={{'--i':0}}>Find your way to us</h2>
    <div className="venues">{EVENTS.map((e,k)=><article key={k} className="venue a" style={{'--i':k+1}}>
     <div className="vph"><img src={PHOTO[k]} alt="" onError={ev=>ev.target.remove()}/><span><Iso k="heart"/></span></div>
     <h3>{e.place.split(',')[0]}</h3><small>{e.place.split(',').slice(1).join(',')}</small><QR q={e.map}/><p>Scan for directions</p></article>)}</div></div></section>

   <section ref={R(8)} className={cls(8)}><div className="c">
    <h2 className="a script" style={{'--i':0}}>Our two days of joy</h2>
    <ol className="path">{EVENTS.map((e,k)=><li key={k} className="a" style={{'--i':k+1}}><span><Iso k={e.icon}/></span><div><b>{e.time}</b> {e.title}<small>{e.day}</small></div></li>)}</ol></div></section>

   <section ref={R(9)} className={cls(9)}><div className="c paper">
    <h2 className="a script" style={{'--i':0}}>Blessed by</h2>
    <p className="a ta" style={{'--i':1}}>நிச்சயதார்த்தம் மற்றும் மணமக்களை வாழ்த்தி ஆசீர்வதிப்பவர்கள்</p>
    <ul>{BLESSINGS.map((b,k)=><li key={b} className="a" style={{'--i':Math.min(k,8)*.4+2}}>{b}</li>)}</ul>
    <p className="a ta" style={{'--i':6}}>அருட்பணியாளர்கள், போதகர்கள், அரசியல் பிரமுகர்கள், உறவுகள் &amp; நண்பர்கள்</p></div></section>

   <section ref={R(10)} className={cls(10)}><div className="c">
    <h2 className="a script" style={{'--i':0}}>Will you join us?</h2><p className="a" style={{'--i':1}}>Let the couple know you are coming.</p><Rsvp/></div></section>

   <section ref={R(11)} className={cls(11)}><div className="c">
    <div className="bigiso a" style={{'--i':0}}><Iso k="heart"/></div>
    <h2 className="a script" style={{'--i':1}}>See you on the happiest day</h2>
    <p className="a cap" style={{'--i':2}}>With best compliments from</p>
    <p className="a nm sm2" style={{'--i':3}}>Dr. R. Alen Rinisha, Dr. S. Boffin Steeve &amp; Family</p>
    <small className="a" style={{'--i':4}}>Contact · 9443581454</small>
    <button className="btn ghost a" style={{'--i':5}} onClick={()=>setP(0)}>Begin again</button></div></section>
  </main>
 </div>;
}
