import{c as l}from"./server-component.AU1C1K-M.js";import{d as L,o as s,y as t,p as d,f as c,n as a,g as r,a as e,t as _,s as p,z as m,v as u,b as T,c as f,r as B,F as N,A as w,B as C}from"./entry.vqngDLlt.js";import"./entry.YT6P0JWA.js";const V=l("BlockRelatedArticles"),A=l("UserLabel"),D=l("TaxonomyTermLabel"),F={class:"node node--type-article node--promoted node--view-mode-full"},M={class:"node__header"},R={class:"page-title"},S={class:"field field--name-title field--type-string field--label-hidden"},x={class:"node__meta"},z={class:"node__submitted"},H={class:"by-author"},U={class:"node__content"},E={class:"layout layout--onecol"},I={class:"layout__region layout__region--content"},$={class:"block block-layout-builder block-field-blocknodearticlefield-tags"},j={class:"label-items field field--name-field-tags field--type-entity-reference field--label-inline clearfix"},q=e("div",{class:"field__label"}," Tags ",-1),G={class:"field__items"},J={key:0,class:"block block-layout-builder block-field-blocknodearticlefield-media-image"},K={class:"field field--name-field-media-image field--type-entity-reference field--label-hidden field__item"},O=["innerHTML"],Z=L({__name:"Full",props:{pageProps:{}},setup(g){const{pageProps:n}=g,h=new Date(n.changed).toLocaleDateString(n.locale,{year:"numeric",month:"long",day:"numeric"});return(o,Q)=>{const y=V,b=A,k=D,v=w,P=C;return s(),t(P,{name:"two-column"},{aside:d(()=>[c(y,a(r({locale:o.pageProps.locale,id:o.pageProps.id})),null,16)]),default:d(()=>[e("article",F,[e("header",M,[e("h1",R,[e("span",S,_(o.pageProps.title),1)])]),e("footer",x,[e("div",z,[e("span",H,[p("by "),o.pageProps.user?(s(),t(b,a(m({key:0},o.pageProps.user)),null,16)):u("",!0)]),p(" "+_(T(h)),1)])]),e("div",U,[e("div",E,[e("div",I,[e("div",$,[e("div",j,[q,e("div",G,[(s(!0),f(N,null,B(o.pageProps.tags,i=>(s(),t(k,m({key:i.id},i,{locale:o.pageProps.locale}),null,16,["locale"]))),128))])])]),o.pageProps.media?(s(),f("div",J,[e("div",K,[c(v,a(r(o.pageProps.media)),null,16)])])):u("",!0),e("div",{innerHTML:o.pageProps.body},null,8,O)])])])])]),_:1})}}});export{Z as default};