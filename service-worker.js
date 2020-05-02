try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let n=e;return t.length>0&&(n+=` :: ${JSON.stringify(t)}`),n};class t extends Error{constructor(t,n){super(e(t,n)),this.name=t,this.details=n}}try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const n=e=>e&&"object"==typeof e?e:{handle:e};class s{constructor(e,t,s="GET"){this.handler=n(t),this.match=e,this.method=s}}class r extends s{constructor(e,t,n){super(({url:t})=>{const n=e.exec(t.href);if(n&&(t.origin===location.origin||0===n.index))return n.slice(1)},t,n)}}const c=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class i{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,n=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(n),e.ports&&e.ports[0]&&n.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return;const{params:s,route:r}=this.findMatchingRoute({url:n,request:e,event:t});let c,i=r&&r.handler;if(!i&&this.s&&(i=this.s),i){try{c=i.handle({url:n,request:e,event:t,params:s})}catch(e){c=Promise.reject(e)}return c instanceof Promise&&this.i&&(c=c.catch(s=>this.i.handle({url:n,request:e,event:t}))),c}}findMatchingRoute({url:e,request:t,event:n}){const s=this.t.get(t.method)||[];for(const r of s){let s;const c=r.match({url:e,request:t,event:n});if(c)return s=c,(Array.isArray(c)&&0===c.length||c.constructor===Object&&0===Object.keys(c).length||"boolean"==typeof c)&&(s=void 0),{route:r,params:s}}return{}}setDefaultHandler(e){this.s=n(e)}setCatchHandler(e){this.i=n(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const n=this.t.get(e.method).indexOf(e);if(!(n>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(n,1)}}let a;const o=()=>(a||(a=new i,a.addFetchListener(),a.addCacheListener()),a);const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||f(u.precache),l=e=>e||f(u.runtime),d=new Set;const w=(e,t)=>e.filter(e=>t in e),p=async({request:e,mode:t,plugins:n=[]})=>{const s=w(n,"cacheKeyWillBeUsed");let r=e;for(const e of s)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},g=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const c=await self.caches.open(e),i=await p({plugins:r,request:t,mode:"read"});let a=await c.match(i,s);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;a=await r.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:a,request:i})}return a},y=async({cacheName:e,request:n,response:s,event:r,plugins:i=[],matchOptions:a})=>{const o=await p({plugins:i,request:n,mode:"write"});if(!s)throw new t("cache-put-with-no-response",{url:c(o.url)});const u=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,c=!1;for(const t of s)if("cacheWillUpdate"in t){c=!0;const s=t.cacheWillUpdate;if(r=await s.call(t,{request:e,response:r,event:n}),!r)break}return c||(r=r&&200===r.status?r:void 0),r||null})({event:r,plugins:i,response:s,request:o});if(!u)return;const f=await self.caches.open(e),h=w(i,"cacheDidUpdate"),l=h.length>0?await g({cacheName:e,matchOptions:a,request:o}):null;try{await f.put(o,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:r,oldResponse:l,newResponse:u,request:o})},b=g,m=async({request:e,fetchOptions:n,event:s,plugins:r=[]})=>{if("string"==typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const c=w(r,"fetchDidFail"),i=c.length>0?e.clone():null;try{for(const t of r)if("requestWillFetch"in t){const n=t.requestWillFetch,r=e.clone();e=await n.call(t,{request:r,event:s})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const a=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,n);for(const e of r)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:s,request:a,response:t}));return t}catch(e){for(const t of c)await t.fetchDidFail.call(t,{error:e,event:s,originalRequest:i.clone(),request:a.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}let v;async function R(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,c=function(){if(void 0===v){const e=new Response("");if("body"in e)try{new Response(e.body),v=!0}catch(e){v=!1}v=!1}return v}()?n.body:await n.blob();return new Response(c,r)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function q(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:n,url:s}=e;if(!s)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!n){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(s,location.href),c=new URL(s,location.href);return r.searchParams.set("__WB_REVISION__",n),{cacheKey:r.href,url:c.href}}class x{constructor(e){this.o=h(e),this.u=new Map,this.h=new Map,this.l=new Map}addToCacheList(e){const n=[];for(const s of e){"string"==typeof s?n.push(s):s&&void 0===s.revision&&n.push(s.url);const{cacheKey:e,url:r}=q(s),c="string"!=typeof s&&s.revision?"reload":"default";if(this.u.has(r)&&this.u.get(r)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.u.get(r),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this.l.has(e)&&this.l.get(e)!==s.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:r});this.l.set(e,s.integrity)}if(this.u.set(r,e),this.h.set(r,c),n.length>0){const e="Workbox is precaching URLs without revision "+`info: ${n.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this.o),c=await r.keys(),i=new Set(c.map(e=>e.url));for(const[e,t]of this.u)i.has(t)?s.push(e):n.push({cacheKey:t,url:e});const a=n.map(({cacheKey:n,url:s})=>{const r=this.l.get(n),c=this.h.get(s);return this.p({cacheKey:n,cacheMode:c,event:e,integrity:r,plugins:t,url:s})});return await Promise.all(a),{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this.o),t=await e.keys(),n=new Set(this.u.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async p({cacheKey:e,url:n,cacheMode:s,event:r,plugins:c,integrity:i}){const a=new Request(n,{integrity:i,cache:s,credentials:"same-origin"});let o,u=await m({event:r,plugins:c,request:a});for(const e of c||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:r,request:a,response:u}):u.status<400))throw new t("bad-precaching-response",{url:n,status:u.status});u.redirected&&(u=await R(u)),await y({event:r,plugins:c,response:u,request:e===n?a:new Request(e),cacheName:this.o,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.u}getCachedURLs(){return[...this.u.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.u.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this.o)).match(n)}}createHandler(e=!0){return async({request:n})=>{try{const e=await this.matchPrecache(n);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.o,url:n instanceof Request?n.url:n})}catch(t){if(e)return fetch(n);throw t}}}createHandlerBoundToURL(e,n=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const s=this.createHandler(n),r=new Request(e);return()=>s({request:r})}}let L;const U=()=>(L||(L=new x),L);const j=(e,t)=>{const n=U().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const i=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(c,t);if(yield i.href,n&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=n,yield e.href}if(s){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:c});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let N=!1;function E(e){N||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const r=h();self.addEventListener("fetch",c=>{const i=j(c.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!i)return;let a=self.caches.open(r).then(e=>e.match(i)).then(e=>e||fetch(i));c.respondWith(a)})})(e),N=!0)}const k=[],M={get:()=>k,add(e){k.push(...e)}},O=e=>{const t=U(),n=M.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},K=e=>{const t=U();e.waitUntil(t.activate())};var S;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),S={},function(e){U().addToCacheList(e),e.length>0&&(self.addEventListener("install",O),self.addEventListener("activate",K))}([{url:"_next/static/354601ea61f10145ef08.worker.js",revision:"ba486171e2169900af02e37534245019"},{url:"_next/static/chunks/commons.353949b40ece4ed38e17.js",revision:"d59badf95da43e2d1a3483e6709a4ac6"},{url:"_next/static/chunks/fb141bda10063f63bcb13e51392b22149fff58c7.4b93e79f403683181c2b.js",revision:"a414023d7188c4d6e4d4d1aa908d9353"},{url:"_next/static/chunks/fb141bda10063f63bcb13e51392b22149fff58c7.4b93e79f403683181c2b.js.LICENSE.txt",revision:"5735008847451525374b1f222e4ab316"},{url:"_next/static/chunks/framework.96c24fa20c3269268be5.js",revision:"5806e08d592719afe7be53e4622ff931"},{url:"_next/static/chunks/framework.96c24fa20c3269268be5.js.LICENSE.txt",revision:"c7c771c7a9ea0b2f7e6b82ef94cc9f76"},{url:"_next/static/current/_buildManifest.js",revision:"fb96ae7926f5104f50f0cf1b3a23a9b5"},{url:"_next/static/current/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/current/pages/404.js",revision:"c663d6cd7386caeb4e4d2f91e332b110"},{url:"_next/static/current/pages/[pokemon].js",revision:"86a1faa9a9b3cc3eb898cf15e0fb2cea"},{url:"_next/static/current/pages/_app.js",revision:"59d0f6f36029a2d2fe53113e68c28659"},{url:"_next/static/current/pages/_error.js",revision:"bf2c43f7d8634cc6d57b8c9ac0aaa2a8"},{url:"_next/static/current/pages/index.js",revision:"f0ca2ec7af27751bc780faba06a8d88d"},{url:"_next/static/runtime/main-56bbfeaa4d065a6c27f4.js",revision:"42fc87d2cdd5ae6182512decabc4da4d"},{url:"_next/static/runtime/polyfills-fc5b3021cf451f17e2e5.js",revision:"4f28bd3d37a02c31fea04e1a00cca933"},{url:"_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"f5e6e2fca3144cc944812cfa3547f475"}]),E(S),function(e,n,c){let i;if("string"==typeof e){const t=new URL(e,location.href);i=new s(({url:e})=>e.href===t.href,n,c)}else if(e instanceof RegExp)i=new r(e,n,c);else if("function"==typeof e)i=new s(e,n,c);else{if(!(e instanceof s))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});i=e}o().registerRoute(i)}(/^https?.*/,new class{constructor(e={}){this.o=l(e.cacheName),this.g=e.plugins||[],this.m=e.fetchOptions,this.v=e.matchOptions}async handle({event:e,request:n}){"string"==typeof n&&(n=new Request(n));let s,r=await b({cacheName:this.o,request:n,event:e,matchOptions:this.v,plugins:this.g});if(!r)try{r=await this.R(n,e)}catch(e){s=e}if(!r)throw new t("no-response",{url:n.url,error:s});return r}async R(e,t){const n=await m({request:e,event:t,fetchOptions:this.m,plugins:this.g}),s=n.clone(),r=y({cacheName:this.o,request:e,response:s,event:t,plugins:this.g});if(t)try{t.waitUntil(r)}catch(e){}return n}},"GET");
