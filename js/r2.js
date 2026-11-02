/* RED2 · Launch Control — motion & UI */
(()=>{
const d=document,H=d.documentElement,$=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOB=()=>innerWidth<=900;
const TOUCH=matchMedia('(hover:none)').matches;
const G=window.gsap,ST=window.ScrollTrigger;
const intro=$('.intro');
wallShift();
if(!G||!ST){H.classList.remove('js');intro&&intro.remove();initUI(null);reviews();megaMenu();waDrop();return;}
G.registerPlugin(ST);ST.config({ignoreMobileResize:true});
let lenis=null;
const fmt=(n,dec=0)=>{const s=dec?n.toFixed(dec).replace('.',','):Math.round(n).toString();return dec?s:s.replace(/\B(?=(\d{3})+(?!\d))/g,'\u202f');};

/* ---------- split words ---------- */
function split(el){
  let gap=false;
  const word=()=>{const w=d.createElement('span');w.className='w';const i=d.createElement('span');w.appendChild(i);return [w,i];};
  const walk=node=>{[...node.childNodes].forEach(n=>{
    if(n.nodeType===3){const parts=n.textContent.split(/(\s+)/);const f=d.createDocumentFragment();
      parts.forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){gap=true;return;}
        if(gap){f.appendChild(d.createTextNode(' '));gap=false;}
        const [w,i]=word();i.textContent=p;f.appendChild(w);});
      if(f.childNodes.length)n.replaceWith(f);}
    else if(n.nodeType===1&&n.tagName!=='BR'&&!n.classList.contains('w'))walk(n);
  });};
  walk(el);
  const words=[...el.querySelectorAll('.w')];
  if(words.length>1){
    const last=words[words.length-1];
    if(last.textContent.replace(/\s/g,'').length<=4){
      const glue=node=>{
        if(!node)return false;
        if(node.nodeType===3&&/^\s+$/.test(node.textContent)){node.textContent='\u00A0';return true;}
        if(node.nodeType===1&&node.classList&&node.classList.contains('w'))return false;
        return glue(node.lastChild)||glue(node.previousSibling);
      };
      const host=last.parentElement;
      if(!glue(last.previousSibling))glue(host&&host!==el?host.previousSibling:null);
    }
  }
  return $$('.w>span',el);
}

/* ---------- videos ---------- */
const vids=$$('video');
function loadV(v){if(v.dataset.src&&!v.src){v.src=v.dataset.src;}}
function vidInit(){
  $$('.reel__p').forEach((p,i)=>{const v=$('video',p);if(!v)return;if(i>0&&MOB())return;
    const start=+(v.dataset.start||0);
    const reveal=()=>{if(start>0)p.classList.toggle('is-live',v.currentTime>=start-.3);};
    if(start>0)v.addEventListener('timeupdate',reveal);
    loadV(v);v.play&&v.play().catch(()=>{});});
  const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){loadV(v);v.play().catch(()=>{});}else if(!v.closest('.reel__p'))v.pause();}),{rootMargin:'200px'});
  $$('video[data-inview]').forEach(v=>io.observe(v));
  if(RM)vids.forEach(v=>{v.removeAttribute('autoplay');v.pause&&v.pause();});
}

/* ---------- intro (launch lights) ---------- */
function runIntro(done){
  if(!intro){done();return;}
  const pt=H.classList.contains('pt-in');
  try{sessionStorage.removeItem('r2pt');sessionStorage.r2i=1;}catch(e){}
  if(H.classList.contains('no-intro')){intro.remove();done();return;}
  const rows=$$('.intro__row',intro),rt=$('.intro__rt',intro);
  const tl=G.timeline({onComplete:()=>intro.remove()});
  if(pt){
    tl.set($$('.bulb',intro),{className:'bulb go'}).to(intro,{clipPath:'inset(0 0 100% 0)',duration:.7,ease:'power3.inOut',delay:.12},0).add(done,.35);
    return;
  }
  const o={t:0};
  tl.to(o,{t:0.412,duration:1.1,ease:'none',onUpdate:()=>rt.textContent='R/T '+o.t.toFixed(3)},0);
  rows.slice(0,3).forEach((r,i)=>tl.add(()=>$$('.bulb',r).forEach(b=>b.classList.add('on')),.18+i*.24));
  tl.add(()=>{rows.slice(0,3).forEach(r=>$$('.bulb',r).forEach(b=>b.classList.remove('on')));$$('.bulb',rows[3]).forEach(b=>b.classList.add('go'));},.18+3*.24);
  tl.to(intro,{clipPath:'inset(0 0 100% 0)',duration:.9,ease:'expo.inOut'},1.15).add(done,1.3);
}

/* ---------- hero entrance + scroll ---------- */
function heroIn(){
  const lines=$$('[data-hero-title] .ln>span'),side=$('[data-hero-side]'),lanes=$('[data-hero-lanes]'),panels=$$('.reel__p, .ph__v');
  const tb=$$('.tree .bulb');
  if(RM){return;}
  const tl=G.timeline();
  if(panels.length)tl.from(panels,{scale:1.18,duration:1.6,ease:'expo.out',stagger:.08},0);
  if(lines.length && !(window.R2FX&&window.R2FX.hero))tl.from(lines,{yPercent:110,duration:1.1,ease:'expo.out',stagger:.09},.05);
  if(side)tl.from(side.children.length?side.children:side,{y:30,opacity:0,duration:.9,ease:'power3.out',stagger:.08},.35);
  if(lanes)tl.from(lanes.children,{yPercent:100,duration:.9,ease:'expo.out',stagger:.08},.45);
  tb.forEach((b,i)=>tl.add(()=>b.classList.add(i<3?'on':'go'),.3+i*.16));
  tl.add(()=>tb.slice(0,3).forEach(b=>{b.classList.remove('on');b.classList.add('go')}),.3+4*.16);
  tl.add(()=>{ if(window.R2FX&&window.R2FX.hero) window.R2FX.hero(); },.18);
  $$('.ph [data-count]').forEach(el=>count(el,1.6,.5));
}
function heroScroll(){
  if(RM)return;
  const hero=$('.hero');
  if(hero){
    const v=$('.reel__p video',hero);
    if(v)G.fromTo(v,{scale:1},{scale:1.06,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
  }
  const ph=$('.ph');
  if(ph){
    G.to($('.ph__v video',ph),{scale:1.25,ease:'none',scrollTrigger:{trigger:ph,start:'top top',end:'bottom top',scrub:true}});
    G.to($('[data-hero-title]',ph),{yPercent:-25,ease:'none',scrollTrigger:{trigger:ph,start:'top top',end:'bottom top',scrub:true}});
  }
}

/* ---------- counters ---------- */
function count(el,dur=1.4,delay=0){
  const to=parseFloat(el.dataset.count),dec=+(el.dataset.dec||0),from=parseFloat(el.dataset.from||0);
  if(RM){el.textContent=fmt(to,dec);return;}
  const o={v:from};el.textContent=fmt(from,dec);
  G.to(o,{v:to,duration:dur,delay,ease:'power2.out',onUpdate:()=>el.textContent=fmt(o.v,dec)});
}

/* ---------- reveals ---------- */
function reveals(){
  $$('[data-split]').forEach(el=>{
    const ws=split(el);if(RM)return;
    G.from(ws,{yPercent:24,duration:.45,ease:'power2.out',stagger:.015,scrollTrigger:{trigger:el,start:'top 92%'}});
  });
  if(RM)return;
  $$('[data-clip]').forEach(el=>{
    if(el.closest('.ph'))return;
    const inner=el.querySelector(':scope > img, :scope > video, :scope > .media, :scope > div > video, :scope img');
    const st={trigger:el,start:'top 98%',end:'top 35%',scrub:.5};
    G.fromTo(el,{clipPath:'inset(16% 9% 16% 9%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:st});
    if(inner)G.fromTo(inner,{scale:1.35},{scale:1,ease:'none',scrollTrigger:st});
  });
  $$('[data-par]').forEach(el=>{const v=+el.dataset.par||10;
    G.fromTo(el,{yPercent:-v},{yPercent:v,ease:'none',scrollTrigger:{trigger:el.closest('[data-clip]')||el,start:'top bottom',end:'bottom top',scrub:true}});});
  if($$('[data-fade]').length){G.set('[data-fade]',{y:12});
  ST.batch('[data-fade]',{start:'top 92%',onEnter:b=>G.to(b,{opacity:1,y:0,duration:.4,ease:'power2.out',stagger:.04,overwrite:true})});}
  $$('[data-count]').forEach(el=>{if(el.closest('.ph')||el.closest('[data-champ]'))return;el.textContent=fmt(+el.dataset.from||0,+(el.dataset.dec||0));ST.create({trigger:el,start:'top 92%',once:true,onEnter:()=>count(el)});});
}
if(RM){ /* show everything */ }

/* ---------- marquee ---------- */
function marquees(){
  $$('[data-mq]').forEach(m=>{
    const t=$('.mq__t',m);t.innerHTML+=t.innerHTML;
    if(RM)return;
    const dir=+(m.dataset.dir||1);
    const tw=G.fromTo(t,{xPercent:dir>0?0:-50},{xPercent:dir>0?-50:0,duration:MOB()?16:28,ease:'none',repeat:-1});
    let cur=1;
    ST.create({trigger:m,start:'top bottom',end:'bottom top',onUpdate:s=>{const v=s.getVelocity();const k=G.utils.clamp(-6,6,v/300);const target=(s.direction>0?1:-1)*(1+Math.abs(k));
      if(Math.sign(target)!==Math.sign(cur)||Math.abs(target)>1.2){cur=target;G.to(tw,{timeScale:target,duration:.3,overwrite:true});G.to(tw,{timeScale:Math.sign(target),duration:1.2,delay:.3});}}});
  });
}

/* ---------- rail ---------- */
function rails(){
  const r=$('[data-rail]');if(!r)return;
  const bar=$('.railbar i'),rc=$('.js-rc'),n=r.children.length;
  r.querySelectorAll('.car,.rail__end').forEach(el=>{el.style.scrollSnapAlign='start';});
  const upd=()=>{const m=r.scrollWidth-r.clientWidth;const p=m>0?r.scrollLeft/m:0;bar&&G.set(bar,{scaleX:Math.max(.04,p)});if(rc){const i=Math.min(n,Math.round(p*(n-1))+1);rc.textContent=String(i).padStart(2,'0')+' / '+String(n).padStart(2,'0');}};
  r.addEventListener('scroll',upd,{passive:true});upd();
}

/* ---------- champion ---------- */
function odometer(el,dur=1.15,delay=0){
  const str=fmt(Math.round(+el.dataset.count),0);
  const settle=()=>{el.classList.remove('odo');el.textContent=str;};
  if(RM||el.dataset.settled){settle();return;}
  el.textContent='';
  el.classList.add('odo');
  el.setAttribute('aria-label',str);
  const cols=[];
  for(const ch of str){
    if(/\d/.test(ch)){
      const col=d.createElement('span');col.className='odo__c';col.setAttribute('aria-hidden','true');
      const strip=d.createElement('span');strip.className='odo__s';
      for(let k=0;k<10;k++){const n=d.createElement('i');n.textContent=String(k);strip.appendChild(n);}
      col.appendChild(strip);el.appendChild(col);
      cols.push({strip,digit:+ch});
    }else{
      const g=d.createElement('span');g.className='odo__g';g.setAttribute('aria-hidden','true');g.textContent=ch;el.appendChild(g);
    }
  }
  if(!cols.length){settle();return;}
  let pending=cols.length;
  const done=()=>{if(--pending<=0){el.dataset.settled='1';settle();}};
  cols.forEach((c,i)=>{
    G.fromTo(c.strip,{y:'0em'},{y:(-c.digit)+'em',duration:dur,delay:delay+i*.04,ease:'power2.inOut',onComplete:done});
  });
  G.delayedCall(dur+delay+cols.length*.04+.08,()=>{if(el.classList.contains('odo')){el.dataset.settled='1';settle();}});
}
function champ(){
  const c=$('[data-champ]');if(!c)return;
  const slip=$('[data-slip]',c),img=$('[data-champ-img]',c);
  const counts=$$('[data-count]',c);
  const show=()=>counts.forEach(e=>e.textContent=fmt(+e.dataset.count,+(e.dataset.dec||0)));
  if(RM){show();return;}
  if(slip)G.set(slip,{y:48,opacity:0,rotate:-3});
  let ran=false;
  const fire=()=>{
    if(ran)return;ran=true;
    counts.forEach((e,i)=>odometer(e,1.15,i*.04));
    if(slip)G.to(slip,{y:0,opacity:1,rotate:-1.4,duration:.75,ease:'power3.out',overwrite:true});
  };
  ST.create({trigger:c,start:'top 85%',once:true,onEnter:fire});
  const seen=()=>{const r=c.getBoundingClientRect();if(r.top<innerHeight*.92&&r.bottom>0)fire();};
  seen();
  addEventListener('load',seen);
  if(img)G.fromTo(img,{scale:1.06},{scale:1,ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'bottom top',scrub:true}});
}
function wordScroll(){
  $$('[data-words]').forEach(el=>{
    const spans=split(el);
    if(RM||!spans.length)return;
    G.set(spans,{opacity:.25});
    G.to(spans,{opacity:1,ease:'none',stagger:.05,scrollTrigger:{trigger:el,start:'top 92%',end:'center 60%',scrub:true}});
  });
}
function clubMask(){
  const cards=$$('.club__c');if(!cards.length)return;
  cards.forEach(el=>{
    const img=$('img',el);
    if(RM){el.style.clipPath='inset(0% round 0%)';return;}
    G.set(el,{clipPath:'inset(18% round 8%)'});
    if(img)G.set(img,{scale:1.08,transformOrigin:'center center'});
    const tl=G.timeline({scrollTrigger:{trigger:el,start:'top 85%',end:'top 45%',scrub:true}});
    tl.to(el,{clipPath:'inset(0% round 0%)',ease:'none'},0);
    if(img)tl.to(img,{scale:1,ease:'none'},0);
  });
}
function dynoCurve(){
  const path=$('.dyno__pwr');if(!path)return;
  let len=420;
  try{len=path.getTotalLength()}catch(e){}
  if(RM){path.style.strokeDasharray=String(len);path.style.strokeDashoffset='0';return;}
  G.set(path,{strokeDasharray:len,strokeDashoffset:len});
  if(MOB()){
    G.to(path,{strokeDashoffset:0,duration:1.3,ease:'power2.out',scrollTrigger:{trigger:'.dyno__art',start:'top 90%',once:true}});
  }else{
    G.to(path,{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:'.dyno__art',start:'top 80%',end:'bottom 80%',scrub:true}});
  }
}

/* ---------- header / progress / distance / dock ---------- */
function chrome(){
  const hdr=$('.hdr'),dist=$('.hdr__dist span'),prog=$('.prog'),dock=$('.dock');
  let last=0;
  const first=$('main > section');
  const onS=()=>{const y=scrollY;const hh=first?first.offsetHeight*(first.classList.contains('hero')?1.6:1)-80:300;
    hdr.classList.toggle('is-solid',y>hh);
    last=y;
    const rail=d.querySelector('#showroom .rail');
    let overRail=false;
    if(rail){const b=rail.getBoundingClientRect();overRail=b.top<innerHeight*0.55&&b.bottom>innerHeight-40;}
    dock&&dock.classList.toggle('on',!overRail&&y<d.body.scrollHeight-innerHeight*1.4);};
  addEventListener('scroll',onS,{passive:true});onS();setTimeout(onS,0);
  if(!RM)G.to(prog,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});
  let curL='START';
  const setL=t=>{if(t===curL||!dist)return;curL=t;if(RM){dist.textContent=t;return;}G.to(dist,{yPercent:-120,duration:.18,ease:'power2.in',onComplete:()=>{dist.textContent=t;G.fromTo(dist,{yPercent:120},{yPercent:0,duration:.3,ease:'power3.out'});}});};
  $$('[data-dist]').forEach(s=>ST.create({trigger:s,start:'top 50%',end:'bottom 50%',onToggle:e=>e.isActive&&setL(s.dataset.dist)}));
}

/* ---------- mobile menu ---------- */
function menu(){
  const b=$('.burger'),m=$('.mnav');if(!b)return;let open=false;
  const set=o=>{open=o;H.classList.toggle('menu-open',o);lenis&&(o?lenis.stop():lenis.start());
    if(o){G.set(m,{visibility:'visible'});G.to(m,{clipPath:'inset(0 0 0% 0)',duration:RM?0:.7,ease:'expo.inOut'});G.fromTo($$('a.big',m),{yPercent:60,opacity:0},{yPercent:0,opacity:1,stagger:.06,duration:RM?0:.8,ease:'expo.out',delay:.2});d.body.style.overflow='hidden';}
    else{G.to(m,{clipPath:'inset(0 0 100% 0)',duration:RM?0:.5,ease:'expo.inOut',onComplete:()=>G.set(m,{visibility:'hidden'})});d.body.style.overflow='';}};
  b.addEventListener('click',()=>set(!open));
  $$('a',m).forEach(a=>a.addEventListener('click',()=>set(false)));
}

/* ---------- service index float ---------- */
function idx(){
  const fl=$('.float');if(!fl||TOUCH||RM)return;
  if(fl.parentElement!==d.body)d.body.appendChild(fl);
  const im=$('img',fl);
  G.set(fl,{xPercent:-50,yPercent:-50,scale:.6,opacity:0});
  const qx=G.quickTo(fl,'x',{duration:.35,ease:'power3'}),qy=G.quickTo(fl,'y',{duration:.35,ease:'power3'});
  let over=null,lx=-1,ly=-1,scrolling=false,timer=0;
  const hide=()=>{
    over=null;
    fl.classList.remove('is-on');
    G.to(fl,{opacity:0,scale:.6,rotate:0,duration:.18,overwrite:'auto'});
  };
  const show=r=>{
    if(scrolling||!r)return;
    if(r!==over){over=r;if(im.getAttribute('src')!==r.dataset.img)im.src=r.dataset.img;}
    fl.classList.add('is-on');
    G.to(fl,{opacity:1,scale:1,rotate:-4,duration:.35,ease:'expo.out',overwrite:'auto'});
  };
  const hit=()=>{
    if(lx<0)return null;
    const el=d.elementFromPoint(lx,ly);
    return el&&el.closest?el.closest('[data-img]'):null;
  };
  addEventListener('pointermove',e=>{
    lx=e.clientX;ly=e.clientY;
    if(scrolling)return;
    qx(lx);qy(ly);
    const r=hit();
    if(r)show(r);else hide();
  },{passive:true});
  const onScroll=()=>{
    scrolling=true;
    hide();
    clearTimeout(timer);
    timer=setTimeout(()=>{scrolling=false;const r=hit();if(r){qx(lx);qy(ly);show(r);}},160);
  };
  addEventListener('scroll',onScroll,{passive:true,capture:true});
  if(lenis)lenis.on('scroll',onScroll);
  addEventListener('pointerleave',hide);
  addEventListener('blur',hide);
}

/* ---------- page transitions ---------- */
function transitions(){
  $$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(!h||h.startsWith('#')||a.target==='_blank'||/^(https?:|tel:|mailto:)/.test(h)||h.includes('#'))return;
    a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||RM)return;e.preventDefault();
      try{sessionStorage.r2pt=1}catch(_){}
      const o=d.createElement('div');o.className='intro';o.innerHTML='<div class="intro__tree"><div class="intro__row"><i class="bulb"></i><i class="bulb"></i></div><div class="intro__row"><i class="bulb"></i><i class="bulb"></i></div><div class="intro__row"><i class="bulb"></i><i class="bulb"></i></div><div class="intro__row"><i class="bulb"></i><i class="bulb"></i></div></div>';d.body.appendChild(o);
      const rows=$$('.intro__row',o);
      G.timeline({onComplete:()=>location.href=h}).fromTo(o,{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:.55,ease:'expo.inOut'})
       .add(()=>rows.slice(0,3).forEach(r=>$$('.bulb',r).forEach(b=>b.classList.add('on'))),'-=.1').add(()=>$$('.bulb',rows[3]).forEach(b=>b.classList.add('go')),'+=.12');});});
  addEventListener('pageshow',e=>{if(e.persisted){$$('body > .intro').forEach(x=>x.remove());}});
}
function anchors(){
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');const t=id&&id.length>1?$(id):null;if(!t)return;e.preventDefault();t.scrollIntoView({behavior:'auto',block:'start'});}));
}
function megaMenu(){
  const hdr=$('.hdr'),panel=$('.mega');if(!hdr||!panel)return;
  const btns=$$('[data-mega]',hdr);
  let fromHover=false;
  const open=id=>{
    panel.hidden=false;
    btns.forEach(b=>b.setAttribute('aria-expanded',b.dataset.mega===id?'true':'false'));
    $$('[data-mega-col]',panel).forEach(c=>c.classList.toggle('is-on',c.dataset.megaCol===id));
  };
  const close=()=>{panel.hidden=true;btns.forEach(b=>b.setAttribute('aria-expanded','false'));};
  btns.forEach(b=>{
    b.addEventListener('mouseenter',()=>{if(innerWidth>900){fromHover=true;open(b.dataset.mega);}});
    b.addEventListener('click',e=>{
      e.stopPropagation();
      if(fromHover){fromHover=false;open(b.dataset.mega);return;}
      if(!panel.hidden&&b.getAttribute('aria-expanded')==='true')close();
      else open(b.dataset.mega);
    });
  });
  hdr.addEventListener('mouseleave',()=>{if(innerWidth>900)close();});
  addEventListener('click',e=>{if(!hdr.contains(e.target))close();});
  addEventListener('keydown',e=>{if(e.key==='Escape')close();});
}
function waDrop(){
  const boxes=$$('.wa-drop');if(!boxes.length)return;
  boxes.forEach(box=>{
    const btn=$('button',box),menu=$('.wa-drop__m',box);if(!btn||!menu)return;
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const open=menu.hidden;
      $$('.wa-drop__m').forEach(m=>{m.hidden=true;});
      menu.hidden=!open;
      btn.setAttribute('aria-expanded',menu.hidden?'false':'true');
    });
  });
  addEventListener('click',()=>$$('.wa-drop__m').forEach(m=>{m.hidden=true;}));
}

/* ---------- start ---------- */
function wallShift(){
  const wall=$('[data-wall]');
  if(!wall||!H.hasAttribute('data-bg'))return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile=matchMedia('(max-width:900px)').matches;
  const save=navigator.connection&&navigator.connection.saveData;
  if(reduce||mobile||save)return;
  let tick=false;
  const apply=()=>{
    tick=false;
    const cap=innerHeight*0.32;
    const y=Math.max(-cap,Math.min(0,-scrollY*0.3));
    wall.style.transform='translate3d(0,'+y+'px,0)';
  };
  addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(apply);},{passive:true});
  apply();
}
function reviews(){
  const tabs=$$('[data-rev]');if(!tabs.length)return;
  const panels=$$('[data-rev-panel]');
  const MONTH={
    es:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    en:['January','February','March','April','May','June','July','August','September','October','November','December'],
    ru:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
  };
  const uiLang=()=>{const l=document.documentElement.lang;return l==='en'||l==='ru'?l:'es';};
  const t=(k,fb)=>window.R2T?R2T(k,fb):fb;
  const when=ym=>{
    const p=String(ym||'').split('-');
    const y=+p[0],m=+p[1];
    const name=(MONTH[uiLang()]||MONTH.es)[m-1];
    return name&&y?name+' '+y:'';
  };
  const measure=card=>{
    const p=$('.rev__text',card),b=$('.rev__more',card);if(!p||!b)return;
    const open=card.classList.contains('is-open');
    if(open)card.classList.remove('is-open');
    const over=p.scrollHeight>p.clientHeight+1;
    if(open)card.classList.add('is-open');
    b.hidden=!over;
  };
  const measurePanel=panel=>{if(!panel||panel.hidden)return;$$('.rev__card',panel).forEach(measure);};
  const measureVisible=()=>panels.forEach(measurePanel);
  tabs.forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.dataset.rev;
    tabs.forEach(b=>{const on=b===btn;b.classList.toggle('on',on);b.setAttribute('aria-selected',on?'true':'false');});
    panels.forEach(p=>{p.hidden=p.dataset.revPanel!==id;});
    measurePanel(panels.find(p=>p.dataset.revPanel===id));
  }));
  $$('[data-rev-dir]').forEach(btn=>btn.addEventListener('click',()=>{
    const grid=$('.rev__grid',btn.closest('[data-rev-panel]'));if(!grid)return;
    const card=$('.rev__card',grid);
    const w=card?card.getBoundingClientRect().width+14:340;
    grid.scrollBy({left:w*(+btn.dataset.revDir||1),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }));
  const paint=(key,block)=>{
    const grid=$(`[data-rev-grid="${key}"]`);if(!grid||!block)return;
    grid.replaceChildren();
    (block.reviews||[]).forEach(rv=>{
      const card=d.createElement('article');card.className='rev__card';
      const stars=d.createElement('div');stars.className='rev__stars';stars.setAttribute('aria-hidden','true');
      const n=Math.max(0,Math.min(5,rv.stars|0));stars.textContent='★★★★★'.slice(0,n);
      const who=d.createElement('div');who.className='note';who.textContent=(rv.author||'')+(when(rv.date)?(' · '+when(rv.date)):'');
      const pack=rv.text&&typeof rv.text==='object'?rv.text:{es:rv.text||''};
      const src=rv.src&&pack[rv.src]?rv.src:'es';
      const text=d.createElement('p');text.className='rev__text';
      const applyText=()=>{text.textContent=card.classList.contains('is-orig')?(pack[src]||''):(pack[uiLang()]||pack[src]||'');};
      applyText();
      const more=d.createElement('button');more.type='button';more.className='rev__more';more.hidden=true;more.textContent=t('rev.more','más');
      more.addEventListener('click',()=>{
        const open=card.classList.toggle('is-open');
        more.textContent=open?t('rev.less','menos'):t('rev.more','más');
      });
      card.append(stars,who,text,more);
      if(src!==uiLang()){
        const orig=d.createElement('button');orig.type='button';orig.className='rev__orig';orig.textContent=t('rev.orig','Ver original');
        orig.addEventListener('click',()=>{
          card.classList.toggle('is-orig');
          applyText();
          orig.textContent=card.classList.contains('is-orig')?t('rev.tr','Ver traducción'):t('rev.orig','Ver original');
          measure(card);
        });
        card.append(orig);
      }
      grid.append(card);
    });
    const link=$(`[data-rev-panel="${key}"] .rev__all`);
    if(link&&block.url)link.href=block.url;
  };
  fetch('data/reviews.json').then(r=>{if(!r.ok)throw new Error(r.status);return r.json();}).then(data=>{
    paint('gallery',data.gallery);paint('service',data.service);measureVisible();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measureVisible);
  }).catch(()=>{});
  let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(measureVisible,120);});
}
vidInit();
initUI(lenis);
heroScroll();reveals();wordScroll();clubMask();dynoCurve();marquees();rails();champ();chrome();menu();idx();reviews();megaMenu();waDrop();transitions();anchors();ST.sort&&ST.sort();ST.refresh();
runIntro(()=>{heroIn();ST.refresh();});
addEventListener('load',()=>ST.refresh());
})();

/* ================= UI (works without GSAP) ================= */
function initUI(lenis){
const d=document,$=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const G=window.gsap,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,TOUCH=matchMedia('(hover:none)').matches;
const CARS=window.CARS||[];const byId=id=>CARS.find(c=>c.id==id);
const eur=n=>n.toLocaleString('ru-RU').replace(/\s/g,'\u202f')+' €';
/* v3: card, catalog, sheet, booking moved to r3.js */
}
