var e=(e,a,t)=>new Promise(((o,n)=>{var s=e=>{try{c(t.next(e))}catch(a){n(a)}},l=e=>{try{c(t.throw(e))}catch(a){n(a)}},c=e=>e.done?o(e.value):Promise.resolve(e.value).then(s,l);c((t=t.apply(e,a)).next())}));import{W as a,l as t,i as o}from"./index.e6e77a29.js";import{p as n,f as s,o as l,c,a as r,w as i,h as d,L as p,r as u,t as g,d as m,u as h,j as f,e as v,v as y,b as w,$ as x,C,n as I,B as b}from"./vendor.10a10271.js";import{_ as V}from"./index.fe235c23.js";const A={name:"Logo",setup:()=>({logo:"data:image/png;base64,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"})},Q=i();n("data-v-79733efa");const q={class:"logo-contanier"};s();const K=Q(((e,a,t,o,n,s)=>(l(),c("div",q,[r("img",{src:o.logo,alt:""},null,8,["src"])]))));A.render=K,A.__scopeId="data-v-79733efa";const k={name:"Copyright",components:{SvgIcon:V},setup(){let e=d(2021);return p((()=>{const a=(new Date).getFullYear();e.value=isNaN(a)&&!isNaN(Date.parse(a))?a:2021})),{currentYear:e}}},L=i();n("data-v-47b33976");const X={class:"copyright-container"},M=r("div",{class:"title syRegular"},[r("div",{class:"copyright-items"},"帮助"),r("div",{class:"copyright-items"},"隐私"),r("div",{class:"copyright-items"},"条款")],-1),H=r("i",null,"copyright",-1),J=r("span",{style:{"margin-top":"5px"}}," XXXXXXXXX ",-1);s();const N=L(((e,a,t,o,n,s)=>{const i=u("svg-icon");return l(),c("div",X,[M,r("span",null,[H,r(i,{"icon-class":"copyright",class:"icon"}),r("i",null,g(o.currentYear)+" 沪ICP备XXXXXXXX号",1)]),J])}));k.render=N,k.__scopeId="data-v-47b33976";const T=m({name:"WeChatLogin",setup(){const e=h();return{weChatLogin:()=>{const{redirect:t}=e.query,{origin:o,pathname:n}=window.location,s=t?`${o}${n}#/relation?redirect=${t}`:`${o}${n}#/relation`,l=Math.ceil(1e3*Math.random()),c=encodeURIComponent(decodeURIComponent(s)),r=`https://open.weixin.qq.com/connect/qrconnect?appid=${a}&redirect_uri=${c}&response_type=code&scope=snsapi_login&state=${l}#wechat_redirect`;window.open(r,"_blank")}}}}),z=i();n("data-v-591f88e4");const E={class:"third-login-contanier"};s();const F=z(((e,a,t,o,n,s)=>(l(),c("div",E,[r("i",{class:"icons iconfont icon-weixin",onClick:a[1]||(a[1]=(...a)=>e.weChatLogin&&e.weChatLogin(...a))})]))));T.render=F,T.__scopeId="data-v-591f88e4";const R=m({name:"LoginPwd",setup(){const a=f(),o=h(),n=v(),s=d(),l=["blur","change"],c=y({country:"86",captcha:"",account:"",password:""}),r={account:[{required:!0,message:"请输入手机或邮箱账号",trigger:l}],password:[{required:!0,message:"请输入密码",trigger:l}],captcha:[{required:!0,message:"请输入校验码",trigger:l}]},i=d(""),u=d(!1),g=d(""),m=d(""),x=d(!1),C=w((()=>{const{captcha:e,account:a,password:t}=c;return u.value?!e||!a||!t:!a||!t}));function I(){const e=o.query;i.value=e.bindToken||""}function b(){return e(this,null,(function*(){}))}return p((()=>{I()})),{trigger:l,ruleForm:s,formState:c,rules:r,bindToken:i,showCaptcha:u,captchaImg:g,captchaId:m,loading:x,disabledLogin:C,getQueryParams:I,updateImage:b,loginHandle:function(){x.value=!0,s.value.validate((o=>e(this,null,(function*(){if(o)try{const e={username:c.account,password:c.password};u.value&&(e.captchaId=m.value,e.captchaValue=c.captcha);let{data:o}=yield t({params:e});const{token:s}=o;yield n.dispatch("user/saveToken",{token:s}),a.push("/")}catch(e){}finally{x.value=!1,u.value&&(yield b())}}))))},freeLogin:function(){return e(this,null,(function*(){x.value=!0;try{yield n.dispatch("user/saveToken",{token:"token"}),a.push("/")}catch(e){}finally{x.value=!1}}))}}}}),U=i();n("data-v-cfb837e0");const P={style:{position:"relative"}},Y={class:"code-inp"},O={class:"code"},S=b(" 快速登录 "),B=b(" 免登录 ");s();const D=U(((e,a,t,o,n,s)=>{const i=u("el-input"),d=u("el-form-item"),p=u("el-button"),g=u("el-form");return l(),c(g,{ref:"ruleForm",model:e.formState,rules:e.rules,"label-width":"0","status-icon":"",class:"login-ruleForm"},{default:U((()=>[r(d,{prop:"account"},{default:U((()=>[r(i,{ref:"account",modelValue:e.formState.account,"onUpdate:modelValue":a[1]||(a[1]=a=>e.formState.account=a),name:"account",placeholder:"邮箱/手机",clearable:!0,tabindex:"1",type:"text",maxlength:"100",autocomplete:"off"},null,8,["modelValue"])])),_:1}),r(d,{prop:"password",class:""},{default:U((()=>[r(i,{ref:"password",modelValue:e.formState.password,"onUpdate:modelValue":a[2]||(a[2]=a=>e.formState.password=a),"show-password":"",name:"password",placeholder:"请输入密码",clearable:!0,tabindex:"2",maxlength:"16",type:"password",autocomplete:"off",onKeyup:x(e.loginHandle,["enter","native"])},null,8,["modelValue","onKeyup"])])),_:1}),e.showCaptcha?(l(),c(d,{key:0,prop:"captcha",class:""},{default:U((()=>[r("div",P,[r("div",Y,[r(i,{ref:"captcha",modelValue:e.formState.captcha,"onUpdate:modelValue":a[3]||(a[3]=a=>e.formState.captcha=a),type:"text",name:"captcha",placeholder:"请输入校验码",clearable:!0,tabindex:"3",maxlength:"6",autocomplete:"off",onKeyup:x(e.loginHandle,["enter","native"])},null,8,["modelValue","onKeyup"])]),r("div",O,[r("img",{src:e.captchaImg,alt:"",onClick:a[4]||(a[4]=(...a)=>e.updateImage&&e.updateImage(...a))},null,8,["src"])])])])),_:1})):C("",!0),r(d,{class:"h40",style:{"margin-bottom":"0"}},{default:U((()=>[r(p,{loading:e.loading,disabled:e.disabledLogin,type:"primary",class:"h40",style:{width:"100%"},onClick:I(e.loginHandle,["prevent"])},{default:U((()=>[S])),_:1},8,["loading","disabled","onClick"]),r(p,{loading:e.loading,type:"text",class:"h40",style:{width:"100%"},onClick:I(e.freeLogin,["prevent"])},{default:U((()=>[B])),_:1},8,["loading","onClick"])])),_:1})])),_:1},8,["model","rules"])}));R.render=D,R.__scopeId="data-v-cfb837e0";const j=m({name:"AccountLogin",components:{Logo:A,Copyright:k,WeChatLogin:T,LoginPwd:R},setup(){let e=d(!0);const a=e=>{let a="";if(e)for(const t in e)e[t]&&(a=a?`${a}&${t}=${e[t]}`:`${t}=${e[t]}`);return a};return p((()=>{e.value=!o(),a()})),{isShowWX:e,getQueryParams:a}}}),G=i();n("data-v-243f8ec3");const W={class:"section-container login-container syNormal un-select"},_={class:"body fix-width w380"},Z={class:"top"},$=r("div",{class:"top-title syRegular"},"账号密码登录",-1),ee={class:"main"},ae=r("div",{class:"foot-link clearfix",style:{"margin-top":"10px"}},null,-1),te={key:0,class:"foot-link syRegular"},oe=b("其他方式登录");s();const ne=G(((e,a,t,o,n,s)=>{const i=u("logo"),d=u("login-pwd"),p=u("el-divider"),g=u("we-chat-login"),m=u("copyright");return l(),c("div",W,[r("div",_,[r("div",Z,[r(i,{class:"logos center mb10"}),$]),r("div",ee,[r(d),ae,e.isShowWX?(l(),c("div",te,[r(p,{"content-position":"center"},{default:G((()=>[oe])),_:1}),r(g)])):C("",!0)])]),r(m)])}));j.render=ne,j.__scopeId="data-v-243f8ec3";export default j;
