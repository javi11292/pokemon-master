(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"/Ecd":function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[pokemon]",function(){return e("y+WP")}])},"y+WP":function(n,t,e){"use strict";e.r(t),e.d(t,"default",(function(){return f}));var o=e("ODXe"),a=e("q1tI"),i=e.n(a),r=e("nOHt"),c=e("Tv2y"),u=e("vOnD"),l=Object(u.b)(["from{transform:scaleX(0);background:rgb(255,0,0)}"]);var d=u.a.div.withConfig({componentId:"ho2rcl-0"})(["width:100%;height:25%;background:white;display:grid;grid-template-columns:1fr 1fr;color:black;video{height:100%;width:100%;object-fit:contain;}"]),s=u.a.div.withConfig({componentId:"ho2rcl-1"})(["display:grid;padding:0.75rem;"]),m=u.a.div.withConfig({componentId:"ho2rcl-2"})(["margin:0.75rem;border:1px solid grey;border-radius:0.35rem;overflow:hidden;position:relative;> span{color:black;font-size:0.75rem;position:absolute;padding:0.25rem;top:50%;right:0.25rem;transform:translateY(-50%);}> div{transform-origin:left;height:100%;background:",";width:","%;animation:"," 750ms;}"],(function(n){return"rgb(".concat(function(n){var t=n%50;return n<50?[200,200*t/50,0].join(","):[200-200*t/50,200,0].join(",")}(n.value),")")}),(function(n){return n.value}),l),p=i.a.createElement;function f(){var n=Object(r.useRouter)(),t=Object(c.a)("run"),e=Object(o.a)(t,1)[0],i=Object(a.useState)(),u=i[0],l=i[1],f=Object(a.useState)(),g=f[0],h=f[1],v=n.query.pokemon;return Object(a.useEffect)((function(){e("getMaxStats").then(h),e("getPokemon",v).then(l)}),[e,v]),u?p(d,null,p("video",{autoPlay:!0,loop:!0,muted:!0,playsInline:!0,src:"".concat("/pokemon-master","/pokemons/").concat(u.name,".mp4")}),p(s,null,p(m,{value:100*u.attack/g.attack},p("div",null),p("span",null,"ATK ",u.attack)),p(m,{value:100*u.defense/g.defense},p("div",null),p("span",null,"DEF ",u.defense)),p(m,{value:100*u.stamina/g.stamina},p("div",null),p("span",null,"STA ",u.attack)))):null}}},[["/Ecd",0,2,1,3]]]);