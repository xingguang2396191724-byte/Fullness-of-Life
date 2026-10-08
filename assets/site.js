const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}))}
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());

/* Language switcher: English remains the global root; Spanish lives under /es/. */
(function(){
  var path=window.location.pathname;
  var isEs=/\/es(?:\/|$)/.test(path);
  var coreMap={
    "/":"\/es/",
    "/index.html":"\/es/",
    "/products.html":"\/es/products.html",
    "/solutions.html":"\/es/solutions.html",
    "/product-options.html":"\/es/product-options.html",
    "/capabilities.html":"\/es/capabilities.html",
    "/about.html":"\/es/about.html",
    "/contact.html":"\/es/contact.html"
  };
  var currentKey=path.replace(/\\/g,"/");
  var target;
  if(isEs){
    var clean=currentKey.replace(/^\/es/,"")||"/";
    target=clean;
  }else{
    target=coreMap[currentKey]||(currentKey.indexOf("/products/")===0?"/es"+currentKey:"/es/products.html");
  }
  var switcher=document.createElement('div');
  switcher.className='language-switcher';
  switcher.setAttribute('aria-label','Language');
  switcher.innerHTML=isEs
    ? '<span class="language-label">ES</span><span class="language-divider">/</span><a href="'+target+'" lang="en" data-language="en">EN</a>'
    : '<a href="'+target+'" lang="es" data-language="es">ES</a><span class="language-divider">/</span><span class="language-label">EN</span>';
  var header=document.querySelector('.site-header');
  if(header) header.appendChild(switcher);
})();

const form=document.querySelector('#inquiryForm');if(form){form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const es=document.documentElement.lang==='es';const lines=es?['Hola JingBear, me gustaría consultar sobre un equipo.','',`Nombre: ${d.get('name')}`,`Empresa: ${d.get('company')||'No indicado'}`,`Email comercial: ${d.get('email')}`,`Destino: ${d.get('country')}`,`Tipo de comprador: ${d.get('buyer')}`,`Producto: ${d.get('product')}`,`Cantidad objetivo: ${d.get('quantity')||'No indicada'}`,`Calendario objetivo: ${d.get('timeline')||'No indicado'}`,`Voltaje / frecuencia: ${d.get('voltage')||'No indicado'}`,`OEM / marca propia: ${d.get('oem')||'No especificado'}`,'',`Requisitos: ${d.get('message')}`]:['Hello JingBear, I would like to discuss a product inquiry.','',`Name: ${d.get('name')}`,`Company: ${d.get('company')||'Not provided'}`,`Business email: ${d.get('email')}`,`Destination: ${d.get('country')}`,`Buyer type: ${d.get('buyer')}`,`Product interest: ${d.get('product')}`,`Target quantity: ${d.get('quantity')||'Not provided'}`,`Target timeline: ${d.get('timeline')||'Not provided'}`,`Voltage / frequency: ${d.get('voltage')||'Not provided'}`,`OEM / private label: ${d.get('oem')||'Not specified'}`,'',`Requirements: ${d.get('message')}`];const url='https://wa.me/8619167488424?text='+encodeURIComponent(lines.join('\\n'));window.open(url,'_blank','noopener,noreferrer');const status=document.querySelector('#formResult');if(status)status.classList.add('show')})}

function openSpecFromHash(){const target=location.hash&&document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target&&target.matches('details.spec-details'))target.open=true}window.addEventListener('hashchange',openSpecFromHash);openSpecFromHash();

/* JingBear B2B analytics events */
(function(){
  function track(name, params){if(typeof window.gtag==='function') window.gtag('event',name,params||{});}
  var path=window.location.pathname;var page=path.split('/').pop()||'index.html';var lang=document.documentElement.lang||'en';
  if(/^f-[^/]+\.html$|^l[0-9]+.*\.html$|^u[0-9]+.*\.html$|^cd[0-9]+.*\.html$|^sw-series\.html$/.test(page)){track('view_product',{product_page:page,language:lang});track('view_technical_spec',{product_page:page,language:lang});}
  if(page==='solutions.html') track('view_solution',{solution_page:page,language:lang});
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(!a)return;var href=a.getAttribute('href')||'';var text=(a.textContent||'').trim().replace(/\s+/g,' ').slice(0,100);var data={link_url:a.href,link_text:text,page_path:path,language:lang};if(/wa\.me|whatsapp/i.test(href))track('click_whatsapp',data);else if(/^mailto:/i.test(href))track('click_email',data);else if(/contact\.html|rfq|quote/i.test(href)||/request.*quote/i.test(text)||/cotiz|presupuesto/i.test(text))track('click_rfq',data);else if(/\.pdf(?:$|[?#])/i.test(href)||/download.*spec|specification|descargar.*pdf|especificaci/i.test(text))track('click_download_spec',data);});
  var formEl=document.querySelector('#inquiryForm');if(formEl)formEl.addEventListener('submit',function(){track('product_inquiry_submit',{page_path:path,language:lang});});
})();

/* WhatsApp Business contact widget */
(function(){
  var waNumber='8619167488424';
  var lang=document.documentElement.lang==='es'?'es':'en';
  var path=window.location.pathname;
  var pageName=path.split('/').pop()||'index.html';
  var modelMatch=pageName.match(/^(f-[0-9]+s?|l[0-9]+(?:bq|bt-pro|-pro)?|u[0-9]+|cd[0-9]+|sw-series|f-[0-9]+)\\.html$/i);
  var model=modelMatch?modelMatch[1].toUpperCase():'';
  var message=lang==='es'
    ? 'Hola JingBear, me interesa'+(model?' el modelo '+model:' el equipo de su sitio web')+'.\\n\\nPaís de destino: \\nCantidad: \\nAplicación: '
    : 'Hi JingBear, I\\'m interested'+(model?' in model '+model:' in the equipment on your website')+'.\\n\\nDestination: \\nQuantity: \\nApplication: ';
  var waUrl='https://wa.me/'+waNumber+'?text='+encodeURIComponent(message);
  var label=lang==='es'?'¿Tienes una consulta?':'Have a question?';
  var sub=lang==='es'?'Habla con JingBear por WhatsApp':'Chat with JingBear on WhatsApp';
  var button=lang==='es'?'Abrir WhatsApp':'Chat on WhatsApp';
  var widget=document.createElement('div');
  widget.className='whatsapp-widget';
  widget.innerHTML='<div class="whatsapp-panel" role="dialog" aria-label="'+sub+'" hidden><button class="whatsapp-close" type="button" aria-label="Close">×</button><div class="whatsapp-panel-icon" aria-hidden="true">WA</div><div class="whatsapp-panel-copy"><strong>'+label+'</strong><span>'+sub+'</span></div><a class="whatsapp-panel-button" href="'+waUrl+'" target="_blank" rel="noopener noreferrer">'+button+' <span>↗</span></a><small>'+ (lang==='es'?'Normalmente respondemos en horario comercial.':'Usually answered during business hours.') +'</small></div><button class="whatsapp-fab" type="button" aria-label="'+sub+'" aria-expanded="false"><span class="whatsapp-fab-icon" aria-hidden="true">⌕</span><span class="whatsapp-fab-label">WhatsApp</span></button>';
  document.body.appendChild(widget);
  var panel=widget.querySelector('.whatsapp-panel');
  var fab=widget.querySelector('.whatsapp-fab');
  var close=widget.querySelector('.whatsapp-close');
  function openPanel(){panel.hidden=false;fab.setAttribute('aria-expanded','true');widget.classList.add('is-open');}
  function closePanel(){panel.hidden=true;fab.setAttribute('aria-expanded','false');widget.classList.remove('is-open');}
  fab.addEventListener('click',function(){panel.hidden?openPanel():closePanel();});
  close.addEventListener('click',closePanel);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closePanel();});
})();
