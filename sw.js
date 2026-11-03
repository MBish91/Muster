const V="muster-v16";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(["./","./index.html","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-180.png","./icon.svg"])));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin)return;
  const fresh=r.mode==="navigate"||/\/(index\.html|config\.js)$/.test(u.pathname)||u.pathname.endsWith("/");
  if(fresh){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put(r,c));return x;}).catch(()=>caches.match(r).then(h=>h||caches.match("./index.html"))));return;}
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r,c));}return x;})));});
