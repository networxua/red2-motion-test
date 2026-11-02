/* Mobile-only helpers (<=767px). Does nothing on desktop. */
(function(){
  var mq=window.matchMedia&&matchMedia('(max-width:767px)');
  if(!mq||!mq.matches)return;
  var d=document,H=d.documentElement;
  /* Contacts: hide embedded maps, add a compact "Google Maps" button next to WhatsApp. */
  [].forEach.call(d.querySelectorAll('.loc__half'),function(c){
    if(c.querySelector('.m-maps'))return;
    var f=c.querySelector('.loc__map iframe'),wa=c.querySelector('.topbar__wa');
    if(!f||!wa)return;
    var q='';try{q=new URL(f.src).searchParams.get('q')||'';}catch(e){}
    if(!q)return;
    var box=d.createElement('div');box.className='m-acts';
    wa.parentNode.insertBefore(box,wa);box.appendChild(wa);
    var a=d.createElement('a');a.className='m-maps';a.target='_blank';a.rel='noopener';
    a.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);a.textContent='Google Maps ↗';
    box.appendChild(a);
  });
  /* Bot greeting: once per session, about 5 s after leaving the hero, visible for about 5 s. */
  function watch(b){
    var t=null;
    new MutationObserver(function(){
      if(b.hidden||t)return;
      t=setTimeout(function(){
        if(b.hidden)return;
        H.classList.add('m-hi-show');
        setTimeout(function(){b.hidden=true;H.classList.add('m-hi-done');},5000);
      },5000);
    }).observe(b,{attributes:true,attributeFilter:['hidden']});
  }
  function init(){var b=d.querySelector('.bt-hi');if(b)watch(b);else setTimeout(init,300);}
  init();
})();
