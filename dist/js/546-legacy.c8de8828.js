"use strict";(self["webpackChunkGC_App2"]=self["webpackChunkGC_App2"]||[]).push([[546],{3744:(e,t)=>{t.Z=(e,t)=>{const n=e.__vccOpts||e;for(const[i,d]of t)n[i]=d;return n}},2546:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});n(3948);var i=n(6252),d=n(2262),l=n(9145);const o=e=>((0,i.dD)("data-v-03507211"),e=e(),(0,i.Cn)(),e),a={id:"container"},s=o((()=>(0,i._)("strong",{class:"capitalize"},"Most Recent Videos",-1))),r={id:"cards"},w=["width","height","src"],u={data(){return{windowWidth:window.innerWidth,windowHeight:window.innerWidth/1.77777}},mounted(){window.addEventListener("resize",this.handleResize)},beforeUnmount(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize(){this.windowWidth=window.innerWidth,this.windowHeight=window.innerWidth/1.77777}}},c=Object.assign(u,{__name:"GCTVPage",setup(e){let t=5;const n=async()=>{try{const e=await(await fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyAy3canGYotL10o_c8EhlIwPjxDvliEhjw&channelId=UC31rtOI4SCddOKbNC6o3EYA&part=snippet,id&order=date&maxResults="+t,{method:"GET"})).json();return e.items}catch(e){console.log(e)}return[]},o=e=>`https://www.youtube.com/embed/${e}`,u=(0,d.qj)([]);n().then((e=>{u.splice(0,u.length,...e)}));const c=e=>{t+=5,n().then((t=>{u.splice(0,u.length,...t),setTimeout((()=>e.target.complete()),500)}))};return(e,t)=>((0,i.wg)(),(0,i.j4)((0,d.SU)(l._i),null,{default:(0,i.w5)((()=>[(0,i.Wm)((0,d.SU)(l.Gu),{translucent:!0},{default:(0,i.w5)((()=>[(0,i.Wm)((0,d.SU)(l.sr),null,{default:(0,i.w5)((()=>[(0,i.Wm)((0,d.SU)(l.Sm),{slot:"start"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,d.SU)(l.fG),{color:"primary"})])),_:1}),(0,i.Wm)((0,d.SU)(l.wd),null,{default:(0,i.w5)((()=>[(0,i.Uk)("WolfDen Productions")])),_:1})])),_:1})])),_:1}),(0,i.Wm)((0,d.SU)(l.W2),{fullscreen:!0},{default:(0,i.w5)((()=>[(0,i.Wm)((0,d.SU)(l.Gu),{collapse:"condense"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,d.SU)(l.sr),null,{default:(0,i.w5)((()=>[(0,i.Wm)((0,d.SU)(l.wd),{size:"large"},{default:(0,i.w5)((()=>[(0,i.Uk)("WolfDen Productions")])),_:1})])),_:1})])),_:1}),(0,i._)("div",a,[(0,i.Wm)((0,d.SU)(l.PM),null,{default:(0,i.w5)((()=>[(0,i.Wm)((0,d.SU)(l.FN),null,{default:(0,i.w5)((()=>[s])),_:1})])),_:1}),(0,i._)("div",r,[(0,i.Wm)((0,d.SU)(l.q_),null,{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(u,((t,n)=>((0,i.wg)(),(0,i.j4)((0,d.SU)(l.Ie),{key:n,class:"video"},{default:(0,i.w5)((()=>[(0,i._)("iframe",{width:e.windowWidth-20,height:e.windowHeight,src:o(t.id.videoId),title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:""},null,8,w)])),_:2},1024)))),128))])),_:1}),(0,i.Wm)((0,d.SU)(l.ju),{onIonInfinite:c},{default:(0,i.w5)((()=>[(0,i.Wm)((0,d.SU)(l.MB))])),_:1})])])])),_:1})])),_:1}))}});var h=n(3744);const m=(0,h.Z)(c,[["__scopeId","data-v-03507211"]]),f=m}}]);
//# sourceMappingURL=546-legacy.c8de8828.js.map