const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}))}document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());const form=document.querySelector('#inquiryForm');if(form){form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const lines=['Hello JingBear, I would like to discuss a product inquiry.','',`Name: ${d.get('name')}`,`Company: ${d.get('company')||'Not provided'}`,`Business email: ${d.get('email')}`,`Destination: ${d.get('country')}`,`Buyer type: ${d.get('buyer')}`,`Product interest: ${d.get('product')}`,`Target quantity: ${d.get('quantity')||'Not provided'}`,`Target timeline: ${d.get('timeline')||'Not provided'}`,`Voltage / frequency: ${d.get('voltage')||'Not provided'}`,`OEM / private label: ${d.get('oem')||'Not specified'}`,'',`Requirements: ${d.get('message')}`];const url='https://wa.me/8619167488424?text='+encodeURIComponent(lines.join('\n'));window.open(url,'_blank','noopener,noreferrer');const status=document.querySelector('#formResult');if(status)status.classList.add('show')})}

function openSpecFromHash(){const target=location.hash&&document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target&&target.matches('details.spec-details'))target.open=true}window.addEventListener('hashchange',openSpecFromHash);openSpecFromHash();


/* JingBear B2B analytics events */
(function(){
  function track(name, params){
    if(typeof window.gtag==='function') window.gtag('event', name, params||{});
  }
  var path=window.location.pathname;
  var page=path.split('/').pop()||'index.html';
  if(/^f-[^/]+\.html$|^l[0-9]+.*\.html$|^u[0-9]+.*\.html$|^cd[0-9]+.*\.html$|^sw-series\.html$/.test(page)){
    track('view_product',{product_page:page});
    track('view_technical_spec',{product_page:page});
  }
  if(page==='solutions.html') track('view_solution',{solution_page:page});
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a');
    if(!a) return;
    var href=a.getAttribute('href')||'';
    var text=(a.textContent||'').trim().replace(/\s+/g,' ').slice(0,100);
    var data={link_url:a.href,link_text:text,page_path:path};
    if(/wa\.me|whatsapp/i.test(href)) track('click_whatsapp',data);
    else if(/^mailto:/i.test(href)) track('click_email',data);
    else if(/contact\.html|rfq|quote/i.test(href)||/request.*quote/i.test(text)) track('click_rfq',data);
    else if(/\.pdf(?:$|[?#])/i.test(href)||/download.*spec|specification/i.test(text)) track('click_download_spec',data);
  });
  var formEl=document.querySelector('#inquiryForm');
  if(formEl) formEl.addEventListener('submit',function(){
    track('product_inquiry_submit',{page_path:path});
  });
})();
