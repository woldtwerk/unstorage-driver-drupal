import{X as v,q as f,a1 as m,K as c,a2 as g,a3 as d,a4 as l,a5 as h,d as _,a6 as y,D as C,a7 as $,a8 as w,e as P,$ as N,R as r,x as D}from"./entry.vqngDLlt.js";import{_ as T}from"./entry.YT6P0JWA.js";const j=async e=>{const{content:t}=v().public;typeof(e==null?void 0:e.params)!="function"&&(e=f(e));const a=e.params(),s=t.experimental.stripQueryParameters?m(`/navigation/${`${c(a)}.${t.integrity}`}/${g(a)}.json`):m(`/navigation/${c(a)}.${t.integrity}.json`);if(d())return(await T(()=>import("./client-db.ylePprfQ.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(o=>o.generateNavigation))(a);const n=await $fetch(s,{method:"GET",responseType:"json",params:t.experimental.stripQueryParameters?void 0:{_params:l(a),previewToken:h().getPreviewToken()}});if(typeof n=="string"&&n.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return n},x=_({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(e){const{query:t}=y(e),a=C(()=>{var n;return typeof((n=t.value)==null?void 0:n.params)=="function"?t.value.params():t.value});if(!a.value&&$("dd-navigation").value){const{navigation:n}=w();return{navigation:n}}const{data:s}=await P(`content-navigation-${c(a.value)}`,()=>j(a.value));return{navigation:s}},render(e){const t=N(),{navigation:a}=e,s=o=>r(D,{to:o._path},()=>o.title),n=(o,u)=>r("ul",u?{"data-level":u}:null,o.map(i=>i.children?r("li",null,[s(i),n(i.children,u+1)]):r("li",null,s(i)))),p=o=>n(o,0);return t!=null&&t.default?t.default({navigation:a,...this.$attrs}):p(a)}}),b=x;export{b as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./client-db.ylePprfQ.js","./entry.vqngDLlt.js","./entry.YT6P0JWA.js","./index.Wme0U9j4.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}