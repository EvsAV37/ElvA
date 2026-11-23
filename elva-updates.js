// Проверка опубликованных экранов. Не хранит ключи, сессии или данные заказов.
(function(){
  'use strict';
  function fingerprint(doc){
    return Array.from(doc.querySelectorAll('[data-elva-app]'))
      .map(el=>el.outerHTML).join('\n');
  }
  function start(options){
    const original=fingerprint(document);
    let dirty=false, busy=false, pending=false, reloading=false, last=0;
    document.addEventListener('input',()=>{dirty=true;},true);
    document.addEventListener('change',()=>{dirty=true;},true);
    document.addEventListener('click',e=>{if(e.target.closest('button,a,input,select,textarea,[role="switch"]'))dirty=true;},true);
    async function check(){
      if(document.visibilityState!=='visible'||navigator.onLine===false||busy||reloading)return;
      if(!pending&&Date.now()-last<300000)return;
      busy=true;
      try{
        if(!pending){
          last=Date.now();
          const url=new URL(location.href);url.hash='';url.searchParams.set('_elva_check',String(last));
          const response=await fetch(url.href,{cache:'no-store',credentials:'same-origin',signal:AbortSignal.timeout(10000)});
          if(!response.ok||!response.headers.get('content-type')?.includes('text/html'))return;
          const next=new DOMParser().parseFromString(await response.text(),'text/html');
          if(!next.querySelector('script[data-elva-updates]'))return;
          pending=fingerprint(next)!==original;
        }
        // Повторная проверка после await: пользователь мог уже начать действие.
        if(pending&&!dirty&&document.visibilityState==='visible'&&await options.canReload()){
          if(dirty||document.visibilityState!=='visible')return;
          reloading=true;
          const url=new URL(location.href);url.searchParams.delete('_elva_check');
          url.searchParams.set('_elva_updated',String(Date.now()));
          location.replace(url.href);
        }
      }catch(_){ /* Нет сети — сохраняем открытый экран. */ }
      finally{busy=false;}
    }
    document.addEventListener('visibilitychange',check);
    window.addEventListener('pageshow',check);
    window.addEventListener('online',check);
    setInterval(check,60000);
    check();
  }
  window.ElvaUpdates={start};
})();
