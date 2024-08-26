"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[2319],{87464:(aa,U,a)=>{a.d(U,{ZQ:()=>N,mV:()=>Y,f1:()=>e,$M:()=>X});var d=a(83383),O=a(46519),m=a(55294),h=a(37932),R=a(54899),S=a(35645),H=a(659),F=a(18271),V=a(60499),M=a(29930),b=a(58379),g=a(87449),I=a(9398),w=a(19349),P=a(30992),y=a(10079),Q=a(92624),l=a(81168),E=a(87865),Z=a(85803),p=a(87095),$=a(82302),j=a(75552),W=a(41818);function G(t){const s={dashboardId:t.id,dashboardName:t.title,dashboardUid:t.uid,folderName:t.meta.folderTitle,eventName:j.ct.DashboardView};(0,W.r_)(s)}var v=a(58790);async function z(t,s,o){const n=b.Z.getObject(T);if(n)return e(),n;try{switch(t.routeName){case l.DashboardRoutes.Home:{const r=await M.ae.get("/api/dashboards/home");if(r.redirectUri){const i=d.u.stripBaseFromUrl(r.redirectUri);return h.E1.replace(i),null}return r.meta.canSave=!1,r.meta.canShare=!1,r.meta.canStar=!1,r}case l.DashboardRoutes.Public:return await g.pD.loadDashboard("public",t.urlSlug,t.accessToken);case l.DashboardRoutes.Normal:{const r=await g.pD.loadDashboard(t.urlType,t.urlSlug,t.urlUid);if(t.fixUrl&&r.meta.url&&!y.r0.isPlaying){const i=d.u.stripBaseFromUrl(r.meta.url),c=h.E1.getLocation().pathname;i!==c&&(h.E1.replace({...h.E1.getLocation(),pathname:i}),console.log("not correct url correcting",i,c))}return r}case l.DashboardRoutes.New:return N(t.urlFolderUid,t.panelType);case l.DashboardRoutes.Path:{const r=t.urlSlug??"";return await g.pD.loadDashboard(l.DashboardRoutes.Path,r,r)}default:throw{message:"Unknown route "+t.routeName}}}catch(r){return(0,R.kW)(r)&&r.cancelled||(s((0,v.jA)({message:"Failed to fetch dashboard",error:r})),console.error(r)),null}}const K=(t,s={})=>(t.forEach(o=>{o.panels?K(o.panels,s):o.targets&&o.targets.forEach(n=>{n.datasource?.type&&(s[n.datasource.type]?s[n.datasource.type].push(n):s[n.datasource.type]=[n])})}),s);function Y(t){return async(s,o)=>{s((0,v.sf)());const n=await z(t,s,o);if(!n)return;s((0,v.Nv)());let r;try{r=new $.f(n.dashboard,n.meta)}catch(f){s((0,v.jA)({message:"Failed create dashboard model",error:f})),console.error(f);return}const i=o(),c=h.E1.getSearchObject();c.orgId||h.E1.partial({orgId:i.user.orgId},!0);const A=(0,w.$t)();(0,I.h4)().setCurrent(r),A.init(r);const C=(0,Q.mn)(t.urlUid??r.uid);if(await s((0,Z.LX)(C,r)),(0,E.Tl)({dashboard:r,timeSrv:A}).run({dashboard:r,range:A.timeRange()}),(0,p.cp)(o())===C&&o().dashboard.initPhase===l.DashboardInitPhase.Services){try{r.processRepeats(),c.autofitpanels&&r.autoFitPanels(window.innerHeight,c.kiosk),t.keybindingSrv.setupDashboardBindings(r)}catch(f){f instanceof Error&&s((0,H.$l)((0,V.t_)("Dashboard init failed",f))),console.error(f)}t.routeName!==l.DashboardRoutes.New?(G(r),P.H.watch(r.uid)):P.H.leave(),r.weekStart!==""?(0,O.Ls)(r.weekStart):(0,O.Ls)(S.v.bootData.user.weekStart),F.Z.publish(new m.Pl({dashboardId:r.uid,orgId:i.user.orgId,userId:i.user.user?.id,grafanaVersion:S.v.buildInfo.version,queries:K(r.panels)})),s((0,v.dS)(r))}}}function N(t,s){const o=S.v.featureToggles.emptyDashboardPage?[]:[{type:s??"add-panel",gridPos:{x:0,y:0,w:12,h:9},title:"Panel Title"}],n={meta:{canStar:!1,canShare:!1,canDelete:!1,isNew:!0,folderUid:""},dashboard:{title:"New dashboard",panels:o}};return t&&(n.meta.folderUid=t),n}const T="DASHBOARD_FROM_LS_KEY";function X(t){b.Z.setObject(T,t)}function e(){b.Z.delete(T)}},2319:(aa,U,a)=>{a.r(U),a.d(U,{AddToDashboard:()=>X});var d=a(68404),O=a(64319),m=a(81168),h=a(75090),R=a(82897),S=a(59052),H=a(83383),F=a(41818),V=a(37932),M=a(35645),b=a(35029),g=a(63619),I=a(24799),w=a(2594),P=a(45253),y=a(31403),Q=a(99661),l=a(82002),E=a(87464),Z=a(29930),p=(e=>(e.FETCH_DASHBOARD="fetch-dashboard",e.SET_DASHBOARD_LS="set-dashboard-ls-error",e))(p||{});function $(){const e=(0,E.ZQ)();return e.dashboard.panels=[],e}async function j(e){const t=v(e.queries,e.queryResponse),s={targets:e.queries,type:t,title:"New Panel",gridPos:{x:0,y:0,w:12,h:8},datasource:e.datasource};let o;if(e.dashboardUid)try{o=await Z.ae.getDashboardByUid(e.dashboardUid)}catch{throw"fetch-dashboard"}else o=$();o.dashboard.panels=[s,...o.dashboard.panels??[]];try{(0,E.$M)(o)}catch{throw"set-dashboard-ls-error"}}const W=e=>!e.hide,G=e=>t=>t.refId===e;function v(e,t){for(const{refId:s}of e.filter(W)){const o=G(s);if(t.flameGraphFrames.some(o))return"flamegraph";if(t.graphFrames.some(o))return"timeseries";if(t.logsFrames.some(o))return"logs";if(t.nodeGraphFrames.some(o))return"nodeGraph";if(t.traceFrames.some(o))return"traces"}return"table"}var z=(e=>(e.NewDashboard="new-dashboard",e.ExistingDashboard="existing-dashboard",e))(z||{});function K(e){}function Y(e){return e?`d/${e}`:"dashboard/new"}var N=(e=>(e.UNKNOWN="unknown-error",e.NAVIGATION="navigation-error",e))(N||{});const T=({onClose:e,exploreId:t})=>{const s=(0,m.useSelector)((0,h.F)(t)),[o,n]=(0,d.useState)(),{handleSubmit:r,control:i,formState:{errors:c},watch:A}=(0,S.cI)({defaultValues:{saveTarget:"new-dashboard"}}),k=l.Vt.hasAccess(m.AccessControlAction.DashboardsCreate,l.Vt.isEditor),C=l.Vt.hasAccess(m.AccessControlAction.DashboardsWrite,l.Vt.isEditor),u=[];k&&u.push({label:"New dashboard",value:"new-dashboard"}),C&&u.push({label:"Existing dashboard",value:"existing-dashboard"});const f=u.length>1?A("saveTarget"):u[0].value,ea=`Add panel to ${u.length>1?"dashboard":u[0].label.toLowerCase()}`,q=async(L,D)=>{n(void 0);const x=D.saveTarget==="existing-dashboard"?D.dashboardUid:void 0;(0,F.ff)("e_2_d_submit",{newTab:L,saveTarget:D.saveTarget,queries:s.queries.length});try{await j({dashboardUid:x,datasource:s.datasourceInstance?.getRef(),queries:s.queries,queryResponse:s.queryResponse})}catch(J){switch(J){case p.FETCH_DASHBOARD:n({error:J,message:"Could not fetch dashboard information. Please try again."});break;case p.SET_DASHBOARD_LS:n({error:J,message:"Could not add panel to dashboard. Please try again."});break;default:n({error:"unknown-error",message:"Something went wrong. Please try again."})}return}const B=Y(x);if(!L){e(),V.E1.push(H.u.stripBaseFromUrl(B));return}if(!!!a.g.open(M.v.appUrl+B,"_blank")){n({error:"navigation-error",message:"Could not navigate to the selected dashboard. Please try again."}),(0,E.f1)();return}e()};return(0,d.useEffect)(()=>{(0,F.ff)("e_2_d_open")},[]),d.createElement(b.u,{title:ea,onDismiss:e,isOpen:!0},d.createElement("form",null,u.length>1&&d.createElement(g.g,{control:i,render:({field:{ref:L,...D}})=>d.createElement(I.g,{label:"Target dashboard",description:"Choose where to add the panel."},d.createElement(w.S,{options:u,...D,id:"e2d-save-target"})),name:"saveTarget"}),f==="existing-dashboard"&&(()=>d.createElement(g.g,{render:({field:{ref:L,value:D,onChange:x,...B}})=>d.createElement(I.g,{label:"Dashboard",description:"Select in which dashboard the panel will be created.",error:c.dashboardUid?.message,invalid:!!c.dashboardUid},d.createElement(Q.o,{...B,inputId:"e2d-dashboard-picker",defaultOptions:!0,onChange:_=>x(_?.uid)})),control:i,name:"dashboardUid",shouldUnregister:!0,rules:{required:{value:!0,message:"This field is required."}}}))(),o&&d.createElement(P.b,{severity:"error",title:"Error adding the panel"},o.message),d.createElement(b.u.ButtonRow,null,d.createElement(y.zx,{type:"reset",onClick:e,fill:"outline",variant:"secondary"},"Cancel"),d.createElement(y.zx,{type:"submit",variant:"secondary",onClick:r((0,R.partial)(q,!0)),icon:"external-link-alt"},"Open in new tab"),d.createElement(y.zx,{type:"submit",variant:"primary",onClick:r((0,R.partial)(q,!1)),icon:"apps"},"Open dashboard"))))},X=({exploreId:e})=>{const[t,s]=(0,d.useState)(!1),o=(0,h.F)(e),n=!!(0,m.useSelector)(o)?.queries?.length;return d.createElement(d.Fragment,null,d.createElement(O.h,{icon:"apps",variant:"canvas",onClick:()=>s(!0),"aria-label":"Add to dashboard",disabled:!n},"Add to dashboard"),t&&d.createElement(T,{onClose:()=>s(!1),exploreId:e}))}}}]);

//# sourceMappingURL=2319.7c881bd2bca49a0e0d41.js.map