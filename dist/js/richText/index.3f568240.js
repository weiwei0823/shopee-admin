import{_ as x}from"../../assets/index.e216368e.js";import{E as k}from"../element-plus/element-plus.50e7beae.js";import{p as u,m as C,f as E,n as S,i as I,x as O,t as T,o as f,c as z,a as y,u as m,R as j,S as B,e as N,V as q,W as L,a1 as M}from"../@vue/@vue.5f79e602.js";import{L as $}from"../index/index.9c51f221.js";import"../pinia/pinia.f2a4981c.js";import"../vue-demi/vue-demi.4f3c4c97.js";import"../js-cookie/js-cookie.431252a9.js";import"../axios/axios.21f17a99.js";import"../geotiff/geotiff.09715990.js";import"../vue-router/vue-router.7ed29036.js";import"../path-to-regexp/path-to-regexp.ecb763cd.js";import"../fuse.js/fuse.js.8cd4e865.js";import"../path-browserify/path-browserify.3d3258d8.js";import"../screenfull/screenfull.468e47d2.js";import"../vue-i18n/vue-i18n.f84ab2b1.js";import"../@intlify/@intlify.848de760.js";import"../@amap/@amap.58aba9ee.js";import"../vue/vue.597d869f.js";import"../mitt/mitt.fcf4f812.js";import"../lodash-es/lodash-es.dd34ae20.js";import"../@vueuse/@vueuse.f476c204.js";import"../qs/qs.71f2d2b1.js";import"../side-channel/side-channel.147ab9b8.js";import"../get-intrinsic/get-intrinsic.c9f38a1e.js";import"../has-symbols/has-symbols.37c383d9.js";import"../function-bind/function-bind.20151ab8.js";import"../has/has.21528ef4.js";import"../call-bind/call-bind.45258027.js";import"../object-inspect/object-inspect.ddd6d7bd.js";import"../nprogress/nprogress.558663b1.js";/* empty css                                 *//* empty css                                 */import"../clipboard/clipboard.a3dfcb76.js";import"../@element-plus/@element-plus.d835247c.js";import"../xe-utils/xe-utils.d9e2cfb8.js";import"../vxe-table/vxe-table.9806638a.js";import"../vite-plugin-mock/vite-plugin-mock.65169573.js";import"../mockjs/mockjs.57e773d8.js";import"../@popperjs/@popperjs.290efabf.js";import"../@ctrl/@ctrl.d23ee9f9.js";import"../dayjs/dayjs.136f6762.js";import"../async-validator/async-validator.fe815769.js";import"../memoize-one/memoize-one.26bd7615.js";import"../escape-html/escape-html.d572c0fd.js";import"../normalize-wheel-es/normalize-wheel-es.b3942336.js";import"../@floating-ui/@floating-ui.cc16a47b.js";import"../lodash-unified/lodash-unified.ab3d03cd.js";const F=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],K=["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"];let c=[];function U(){return window.tinymce}const V=(o,r)=>{const a=document.getElementById(o),t=r||function(){};if(!a){const i=document.createElement("script");i.src=o,i.id=o,document.body.appendChild(i),c.push(t),("onload"in i?s:n)(i)}a&&t&&(U()?t(null,a):c.push(t));function s(i){i.onload=function(){this.onerror=this.onload=null;for(const l of c)l(null,i);c=null},i.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+o),i)}}function n(i){i.onreadystatechange=function(){if(!(this.readyState!=="complete"&&this.readyState!=="loaded")){this.onreadystatechange=null;for(const l of c)l(null,i);c=null}}}};const D=["id"],R={__name:"index",props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+((Math.random()*1e3).toFixed(0)+"")}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:[Number,String],required:!1,default:360},width:{type:[Number,String],required:!1,default:"99%"},readOnly:{type:Boolean,default:!1}},emits:["input"],setup(o,{expose:r,emit:a}){const t=o,s="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js",n=u({hasChange:!1,hasInit:!1,tinymceId:t.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN",es:"es_MX",ja:"ja"}}),i=()=>{window.tinymce.init({selector:`#${n.tinymceId}`,content_style:"p {margin: 0px; border:0px ; padding: 4px;}",language:n.languageTypeList.zh,height:t.height,body_class:"panel-body ",object_resizing:!1,readonly:t.readOnly,statusbar:!t.readOnly,toolbar:t.readOnly?!1:t.toolbar.length>0?t.toolbar:K,menubar:t.readOnly?!1:t.menubar,plugins:t.readOnly?!1:F,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,plugin_preview_width:"500",plugin_preview_height:"600",advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:e=>{t.value&&e.setContent(t.value),n.hasInit=!0,e.on("NodeChange Change KeyUp SetContent",()=>{n.hasChange=!0,a("input",e.getContent())})},setup(e){e.on("FullscreenStateChanged",d=>{n.fullscreen=d.state})},file_picker_types:"file image media",convert_urls:!1})},l=()=>{V(s,e=>{if(e){k.error(e.message);return}i()})},h=e=>{var d;(d=window.tinymce)!=null&&d.get(n.tinymceId)&&window.tinymce.get(n.tinymceId).setContent(e)},_=()=>{var e;if((e=window.tinymce)!=null&&e.get(n.tinymceId))return window.tinymce.get(n.tinymceId).getContent()},g=()=>{const e=window.tinymce.get(n.tinymceId);n.fullscreen&&e.execCommand("mceFullScreen"),e&&e.destroy()},b=C(()=>{const e=t.width;return/^[\d]+(\.[\d]+)?$/.test(e)?`${e}px`:e});E(()=>t.value,()=>{!n.hasChange&&n.hasInit&&S(()=>window.tinymce.get(n.tinymceId).setContent(t.val||""))},{immediate:!0}),I(()=>{l()}),O(()=>{g()}),r({setContent:h,getContent:_});const{tinymceId:w,fullscreen:v}=T(n);return(e,d)=>(f(),z("div",{class:j([{fullscreen:m(v)},"tinymce-container"]),style:B({width:m(b)})},[y("textarea",{id:m(w),class:"tinymce-textarea"},null,8,D)],6))}};var p=x(R,[["__scopeId","data-v-7357121a"]]);const W=Object.assign(p,{install(o){o.component(p.name,p)}}),A={class:"section-container fix-width"},X={name:"Editor"},Ut=Object.assign(X,{setup(o){const r=u({contents:"\u521D\u59CB\u5185\u5BB9\u586B\u5145"}),a=N('TinyMCE\u662F\u4E00\u6B3E\u6613\u7528\u3001\u4E14\u529F\u80FD\u5F3A\u5927\u7684\u6240\u89C1\u5373\u6240\u5F97\u7684\u5BCC\u6587\u672C\u7F16\u8F91\u5668\u3002\u540C\u7C7B\u7A0B\u5E8F\u6709\uFF1AUEditor\u3001Kindeditor\u3001Simditor\u3001CKEditor\u3001wangEditor\u3001Suneditor\u3001froala\u7B49\u7B49\u3002\u5B98\u65B9\u6587\u6863\u5730\u5740\uFF1A<a href="https://www.tiny.cloud/docs/">\u70B9\u6211\u524D\u5F80 https://www.tiny.cloud/docs/</a> '),t=s=>{r.contents=s};return(s,n)=>(f(),q(m($),{title:"\u5BCC\u6587\u672C\u7F16\u8F91\u5668 - tinymce",subtitle:a.value},{body:L(()=>[y("div",A,[M(m(W),{value:r.contents,height:500,onInput:t},null,8,["value"])])]),_:1},8,["subtitle"]))}});export{Ut as default};
