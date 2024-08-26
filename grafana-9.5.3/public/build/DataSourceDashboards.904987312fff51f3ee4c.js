"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2929],{44034:(I,u,t)=>{t.d(u,{Z:()=>r});var a=t(68404),D=t(39904),o=t(31403);function P({dashboards:n,onImport:M,onRemove:O}){function _(c){return c.revision!==c.importedRevision?"Update":"Re-import"}return a.createElement("table",{className:"filter-table"},a.createElement("tbody",null,n.map((c,l)=>a.createElement("tr",{key:`${c.dashboardId}-${l}`},a.createElement("td",{className:"width-1"},a.createElement(D.J,{name:"apps"})),a.createElement("td",null,c.imported?a.createElement("a",{href:c.importedUrl},c.title):a.createElement("span",null,c.title)),a.createElement("td",{style:{textAlign:"right"}},c.imported?a.createElement(o.zx,{variant:"secondary",size:"sm",onClick:()=>M(c,!0)},_(c)):a.createElement(o.zx,{variant:"secondary",size:"sm",onClick:()=>M(c,!1)},"Import"),c.imported&&a.createElement(o.zx,{"aria-label":"Delete dashboard",icon:"trash-alt",variant:"destructive",size:"sm",onClick:()=>O(c)}))))))}const r=P},81960:(I,u,t)=>{t.d(u,{Z:()=>O});var a=t(68404),D=t(2555),o=t(86977),P=t(85805),r=t(81168),n=t(44034),M=t(25e3);function O({uid:c}){(0,M.wi)(c);const l=(0,r.useDispatch)(),m=(0,r.useSelector)(E=>E.dataSources.dataSource),v=(0,r.useSelector)(E=>E.plugins.dashboards),C=(0,r.useSelector)(E=>E.plugins.isLoadingPluginDashboards);(0,a.useEffect)(()=>{m.id>0&&l((0,P.m3)())},[l,m]);const R=(E,h)=>{l((0,o.$j)({pluginId:E.pluginId,path:E.path,overwrite:h,inputs:[{name:"*",type:"datasource",pluginId:m.type,value:m.name}]},E.title))},T=({uid:E})=>{l((0,o.fG)(E))};return a.createElement(_,{dashboards:v,isLoading:C,onImportDashboard:R,onRemoveDashboard:T})}const _=({isLoading:c,dashboards:l,onImportDashboard:m,onRemoveDashboard:v})=>c?a.createElement(D.Z,null):a.createElement(n.Z,{dashboards:l,onImport:m,onRemove:v})},46144:(I,u,t)=>{t.r(u),t.d(u,{DataSourceDashboardsPage:()=>r,default:()=>n});var a=t(68404),D=t(79396),o=t(81960),P=t(25e3);function r(M){const O=M.match.params.uid,_=(0,P.MF)(O,"dashboards");return a.createElement(D.T,{navId:"datasources",pageNav:_.main},a.createElement(D.T.Contents,null,a.createElement(o.Z,{uid:O})))}const n=r},59332:(I,u,t)=>{t.d(u,{V:()=>o});var a=t(68404),D=t(3597);const o=(0,a.createContext)(D.n)},24231:(I,u,t)=>{t.d(u,{E:()=>C,IA:()=>x,MF:()=>z,OU:()=>h,Qs:()=>y,YY:()=>J,_l:()=>U,d7:()=>L,hw:()=>R,nH:()=>g,q6:()=>f,qj:()=>K,wi:()=>E,wl:()=>S,zJ:()=>T});var a=t(68404),D=t(70431),o=t(18271),P=t(77582),r=t(86245),n=t(81168),M=t(45984),O=t(85597),_=t(96488),c=t(59332),l=t(79508),m=t(41632),v=t(93769);const C=e=>{const s=(0,n.useDispatch)();(0,a.useEffect)(()=>(s((0,_.M9)(e)),function(){s((0,D.e)({cleanupAction:i=>i.dataSourceSettings=m.fk}))}),[e,s])},R=e=>{const s=(0,n.useDispatch)(),d=L();return()=>s((0,_.kY)(e,d.Edit))},T=()=>{const e=(0,n.useDispatch)(),s=(0,n.useSelector)(i=>i.dataSources.isLoadingDataSources),d=(0,n.useSelector)(i=>i.dataSources.dataSources);return(0,a.useEffect)(()=>{e((0,_.bZ)())},[e]),{isLoading:s,dataSources:d}},E=e=>{const s=(0,n.useDispatch)();(0,a.useEffect)(()=>{s((0,_.gv)(e))},[s,e])},h=()=>{const e=(0,n.useDispatch)();(0,a.useEffect)(()=>{e((0,_.Kj)())},[e])},g=()=>{const e=(0,n.useDispatch)(),s=L();return d=>{e((0,_.J_)(d,s.Edit))}},K=()=>{const e=(0,n.useDispatch)();return async s=>e((0,_.oe)(s))},f=()=>{const e=(0,n.useDispatch)(),{name:s}=(0,n.useSelector)(d=>d.dataSources.dataSource);return()=>{o.Z.publish(new M.VJ({title:"Delete",text:`Are you sure you want to delete the "${s}" data source?`,yesText:"Delete",icon:"trash-alt",onConfirm:()=>e((0,_.F5)())}))}},S=e=>(0,n.useSelector)(s=>(0,v.f6)(s.dataSources,e)),x=e=>{const s=S(e);return(0,O.iU)(s)},y=e=>(0,n.useSelector)(s=>(0,v.G4)(s.dataSources,e)),U=()=>(0,n.useSelector)(e=>e.dataSourceSettings),z=(e,s)=>{const d=S(e),{plugin:i,loadError:p,loading:V}=U(),B=(0,n.useSelector)(A=>A.navIndex),W=s?`datasource-${s}-${e}`:`datasource-settings-${e}`;if(p){const A={text:p,subTitle:"Data Source Error",icon:"exclamation-triangle"};return{node:A,main:A}}return V||!i?(0,r.ht)(B,W,(0,l.xG)("settings")):(0,r.ht)(B,W,(0,l.nI)((0,l.B1)(d,i),s||"settings"))},J=e=>{const s=S(e),d=s.readOnly===!0,i=P.Vt.hasPermissionInMetadata(n.AccessControlAction.DataSourcesWrite,s),p=P.Vt.hasPermissionInMetadata(n.AccessControlAction.DataSourcesDelete,s);return{readOnly:d,hasWriteRights:i,hasDeleteRights:p}},L=()=>(0,a.useContext)(c.V)},25e3:(I,u,t)=>{t.d(u,{BX:()=>r.BX,E:()=>o.E,Ht:()=>r.Ht,I5:()=>n.I5,IA:()=>n.IA,IO:()=>n.IO,J_:()=>a.J_,MF:()=>o.MF,Nu:()=>r.Nu,OU:()=>o.OU,Qs:()=>o.Qs,Rz:()=>o.IA,Vj:()=>D.V,YY:()=>o.YY,_l:()=>o._l,d7:()=>o.d7,hw:()=>o.hw,mt:()=>n.mt,nH:()=>o.nH,q6:()=>o.q6,qj:()=>o.qj,r7:()=>n.r7,rl:()=>r.rl,wi:()=>o.wi,wl:()=>o.wl,yr:()=>r.yr,zJ:()=>o.zJ,zT:()=>r.zT});var a=t(96488),D=t(59332),o=t(24231),P=t(79508),r=t(41632),n=t(93769)}}]);

//# sourceMappingURL=DataSourceDashboards.904987312fff51f3ee4c.js.map