import{d as p,l as f,m as y,o as t,c as o,a as e,t as a,b as n,f as i,p as d,s as h,v as k,F as v,r as b,x as g}from"./entry.oEaghZDR.js";import"./entry.ztxzRjWp.js";const $={id:"search-form",class:"search-form","data-drupal-selector":"search-form",method:"GET","accept-charset":"UTF-8"},N={class:"container-inline form-wrapper"},V={class:"form-item form-type-search form-item-keys"},w={for:"edit-keys",class:"form-label"},x=["value"],B=["value"],C={key:0},E={class:"item-list"},F={key:0},L={key:1,class:"search-results node_search-results"},S={class:"search-result__title"},T={class:"search-result__snippet-info"},P={class:"search-result__snippet"},D=p({__name:"search",setup(U){const _=f();function u(s){return _(s.replace(/#.*$/,""))}const{meta:{results:c},query:{keys:m}}=y();return(s,q)=>{const l=g;return t(),o("div",null,[e("form",$,[e("div",N,[e("div",V,[e("label",w,a(s.$t("Enter your keywords")),1),e("input",{id:"edit-keys",type:"search",value:n(m),name:"keys",size:"30",maxlength:"255",class:"form-search"},null,8,x)]),e("input",{id:"edit-submit",type:"submit",value:s.$t("Search"),class:"button form-submit"},null,8,B)]),i(l,{id:"edit-help-link",class:"search-help-link"},{default:d(()=>[h(a(s.$t("About searching")),1)]),_:1})]),n(c).length?(t(),o("h2",C,a(s.$t("Search results")),1)):k("",!0),e("div",E,[n(c).length===0?(t(),o("h3",F,a(s.$t("Your search yielded no results.")),1)):(t(),o("ol",L,[(t(!0),o(v,null,b(n(c),r=>(t(),o("li",{key:r.id},[e("h3",S,[i(l,{to:u(r.id)},{default:d(()=>[h(a(r.title),1)]),_:2},1032,["to"])]),e("div",T,[e("p",P,a(r.content),1)])]))),128))]))])])}}});export{D as default};
