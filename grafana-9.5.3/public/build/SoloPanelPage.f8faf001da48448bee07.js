"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[1034],{30237:(M,l,e)=>{e.r(l),e.d(l,{SoloPanel:()=>d,SoloPanelPage:()=>o,default:()=>D});var n=e(68404),u=e(36635),h=e(89050),p=e(34177),c=e(79417),P=e(87464);const E=s=>({dashboard:s.dashboard.getModel()}),m={initDashboard:P.mV},_=(0,u.connect)(E,m);class o extends n.Component{constructor(){super(...arguments),this.state={panel:null,notFound:!1}}componentDidMount(){const{match:a,route:t}=this.props;this.props.initDashboard({urlSlug:a.params.slug,urlUid:a.params.uid,urlType:a.params.type,routeName:t.routeName,fixUrl:!1,keybindingSrv:this.context.keybindings})}getPanelId(){return parseInt(this.props.queryParams.panelId??"0",10)}componentDidUpdate(a){const{dashboard:t}=this.props;if(t&&(!a.dashboard||a.dashboard.uid!==t.uid)){const r=t.getPanelByUrlId(this.props.queryParams.panelId);if(!r){this.setState({notFound:!0});return}this.setState({panel:r})}}render(){return n.createElement(d,{dashboard:this.props.dashboard,notFound:this.state.notFound,panel:this.state.panel,panelId:this.getPanelId(),timezone:this.props.queryParams.timezone})}}o.contextType=p.h;const d=({dashboard:s,notFound:a,panel:t,panelId:r,timezone:f})=>a?n.createElement("div",{className:"alert alert-error"},"Panel with id ",r," not found"):!t||!s?n.createElement("div",null,"Loading & initializing dashboard"):n.createElement("div",{className:"panel-solo"},n.createElement(h.Z,null,({width:i,height:g})=>i===0?null:n.createElement(c.l,{stateKey:t.key,width:i,height:g,dashboard:s,panel:t,isEditing:!1,isViewing:!0,lazy:!1,timezone:f,hideMenu:!0}))),D=_(o)}}]);

//# sourceMappingURL=SoloPanelPage.f8faf001da48448bee07.js.map