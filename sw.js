const C='alertas-v9';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./icon-192.png','./icon-512.png'])))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={title:'Alertas de passagens',body:e.data?e.data.text():''}}
e.waitUntil(self.registration.showNotification(d.title||'Alertas de passagens',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:'passagens',renotify:true,data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=self.registration.scope;
e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if(c.url.startsWith(self.registration.scope)){c.navigate(u).catch(()=>{});return c.focus()}}return clients.openWindow(u)}))});
