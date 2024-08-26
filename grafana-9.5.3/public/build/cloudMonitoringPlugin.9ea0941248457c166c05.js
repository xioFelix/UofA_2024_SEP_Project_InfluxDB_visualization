(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[3549],{33733:(_,K,o)=>{var y;y={value:!0};var k=o(24034),p=o(40419),I=o(68404),ee=o(82897);function r(c){return c&&typeof c=="object"&&"default"in c?c:{default:c}}var l=r(I);const F={JWT:"jwt",GCE:"gce"},G="Configuration help box",te="Configuration drop zone",ae="Configuration text area",re="Paste JWT button",se="JWT form",M="JWT button",L="GCE button",s="Private Key Path Input",E="Private Key Input",z="Fill JWT info manually",H="Show private key path input",ne="Show private key input",W=["private_key","token_uri","client_email","project_id"],$=({onChange:c,showConfigEditor:d})=>{const[g,C]=I.useState(),[h,O]=I.useState(null),P=p.useTheme2(),B=I.useCallback(S=>{C(null),O(!0)},[O]),N=I.useCallback(S=>{O(null),C(null)},[O]),A=I.useCallback(S=>{if(S.trim()!==""){let x;try{x=JSON.parse(S)}catch{C("Invalid JWT token")}const T=Y(x);T.isValid?(d(),c({privateKey:x.private_key,tokenUri:x.token_uri,clientEmail:x.client_email,projectId:x.project_id})):C(T.error)}},[C,c,d]);return l.default.createElement(l.default.Fragment,null,l.default.createElement(p.Field,{label:"JWT token",invalid:Boolean(g),description:h?"Paste JWT token below":"Upload or paste Google JWT token",error:g},l.default.createElement(l.default.Fragment,null,h!==!0&&l.default.createElement("div",{"data-testid":te},p.FileDropzone&&l.default.createElement(p.FileDropzone,{options:{multiple:!1,accept:".json"},readAs:"readAsText",onLoad:S=>{A(S),O(!1)}},l.default.createElement("p",{style:{margin:0,fontSize:`${P.typography.h4.fontSize}`,textAlign:"center"}},"Drop the Google JWT file here",l.default.createElement("br",null),l.default.createElement("br",null),l.default.createElement(p.Button,{fill:"outline"},"Click to browse files")))),h&&l.default.createElement(p.TextArea,{"data-testid":ae,autoFocus:!0,invalid:Boolean(g),placeholder:"Paste Google JWT token here",onBlur:S=>A(S.currentTarget.value),rows:12}))),!h&&l.default.createElement(l.default.Fragment,null,l.default.createElement(p.Button,{"data-testid":re,type:"button",fill:"outline",style:{color:`${P.colors.primary.text}`},onClick:B},"Paste JWT Token"),l.default.createElement("span",{style:{paddingRight:"10px",paddingLeft:"10px"}},"or"),l.default.createElement(p.Button,{"data-testid":z,type:"button",fill:"outline",style:{color:`${P.colors.primary.text}`},onClick:d},"Fill In JWT Token manually")),h&&g&&l.default.createElement(p.Field,null,l.default.createElement(p.Button,{type:"button",fill:"outline",style:{color:`${P.colors.primary.text}`},onClick:N},"Upload JWT Token")))},Y=c=>{if(!ee.isObject(c))return{isValid:!1,error:"Invalid JWT token"};const d=W.filter(g=>!c[g]);return d.length>0?{isValid:!1,error:`Missing keys: ${d.join(", ")}`}:{isValid:!0}},{SecretFormField:ie}=p.LegacyForms;var Q;(function(c){c.PATH="path",c.JWT="jwt"})(Q||(Q={}));const Z=({options:c,onReset:d,onOptionsChange:g})=>{var C;const[h,O]=l.default.useState((S=>"privateKeyPath"in S&&S.privateKeyPath!==""?Q.PATH:Q.JWT)(c.jsonData)),P=S=>k.onUpdateDatasourceJsonDataOption({options:c,onOptionsChange:g},S),B=()=>{h===Q.JWT?O(Q.PATH):O(Q.JWT)},N=l.default.createElement("span",null,h===Q.PATH?l.default.createElement("a",{className:"external-link",onClick:B,"data-testid":ne},"Paste private key"):"Paste private key"," ","or \xA0",h===Q.JWT?l.default.createElement("a",{className:"external-link",onClick:B,"data-testid":H},"provide path to private file"):"provide path to private key file"),A={isConfigured:Boolean(c.secureJsonFields.privateKey),value:((C=c.secureJsonData)===null||C===void 0?void 0:C.privateKey)||"",placeholder:"Enter Private key",onReset:()=>d(),onChange:k.onUpdateDatasourceSecureJsonDataOption({options:c,onOptionsChange:g},"privateKey"),"data-testid":E};return l.default.createElement("div",{"data-testid":se},l.default.createElement(p.Field,{label:"Project ID"},l.default.createElement(p.Input,{id:"defaultProject",width:60,value:c.jsonData.defaultProject||"",onChange:P("defaultProject")})),l.default.createElement(p.Field,{label:"Client email"},l.default.createElement(p.Input,{width:60,id:"clientEmail",value:c.jsonData.clientEmail||"",onChange:P("clientEmail")})),l.default.createElement(p.Field,{label:"Token URI"},l.default.createElement(p.Input,{width:60,id:"tokenUri",value:c.jsonData.tokenUri||"",onChange:P("tokenUri")})),h===Q.PATH&&l.default.createElement(p.Field,{label:"Private key path",description:N},l.default.createElement(p.Input,{width:60,id:"privateKeyPath",value:c.jsonData.privateKeyPath||"",placeholder:"File location of your private key (e.g. /etc/secrets/gce.pem)",onChange:P("privateKeyPath"),"data-testid":s})),h===Q.JWT&&l.default.createElement(l.default.Fragment,null,p.SecretInput?l.default.createElement(p.Field,{label:"Private key",description:N},l.default.createElement(p.SecretInput,Object.assign({},A,{width:60}))):l.default.createElement(ie,Object.assign({},A,{label:"Private key",labelWidth:10,inputWidth:20}))))};function X(c){const{options:d,onOptionsChange:g,authOptions:C}=c,{jsonData:h,secureJsonFields:O,secureJsonData:P}=d,B=()=>Boolean(h.clientEmail&&h.defaultProject&&h.tokenUri&&(O&&O.privateKey||h.privateKeyPath));h.authenticationType||(h.authenticationType=F.JWT);const[N,A]=I.useState(q(h.authenticationType)),[S,x]=I.useState(B());return l.default.createElement(l.default.Fragment,null,l.default.createElement(p.FieldSet,{label:"Authentication"},l.default.createElement(p.Field,{label:"Authentication type"},l.default.createElement(p.RadioButtonGroup,{options:C,value:h.authenticationType||F.JWT,onChange:T=>{x(B()),g(Object.assign(Object.assign({},d),{jsonData:Object.assign(Object.assign({},d.jsonData),{authenticationType:T})})),A(q(T))}}))),N&&l.default.createElement(p.FieldSet,{label:"JWT Key Details"},S?l.default.createElement(Z,{options:d,onReset:()=>(T=>{const V=Object.assign({},P),J=T?Object.assign(Object.assign({},d.jsonData),T):Object.assign({},d.jsonData);delete J.clientEmail,delete J.defaultProject,delete J.tokenUri,delete J.privateKeyPath,delete V.privateKey,A(!0),x(!1),g(Object.assign(Object.assign({},d),{secureJsonFields:Object.assign(Object.assign({},d.secureJsonFields),{privateKey:!1}),secureJsonData:V,jsonData:J}))})(),onOptionsChange:g}):l.default.createElement($,{showConfigEditor:()=>{x(!0)},onChange:T=>{g(Object.assign(Object.assign({},d),{secureJsonFields:Object.assign(Object.assign({},O),{privateKey:!0}),secureJsonData:Object.assign(Object.assign({},P),{privateKey:T.privateKey}),jsonData:Object.assign(Object.assign({},h),{clientEmail:T.clientEmail,defaultProject:T.projectId,tokenUri:T.tokenUri})}))}})," "),h.authenticationType===F.GCE&&l.default.createElement(p.Field,{label:"Default project"},l.default.createElement(p.Input,{id:"defaultProject",width:60,value:d.jsonData.defaultProject||"",onChange:k.onUpdateDatasourceJsonDataOption(c,"defaultProject")})))}const q=c=>c===F.JWT||c===void 0,U=[{label:"Google JWT File",value:F.JWT,ariaLabel:M},{label:"GCE Default Service Account",value:F.GCE,ariaLabel:L}];y=X,K.ConnectionConfig=c=>{const{options:{jsonData:d}}=c;d.authenticationType||(d.authenticationType=F.JWT);const g=d.authenticationType===F.JWT||d.authenticationType===void 0;return l.default.createElement(l.default.Fragment,null,l.default.createElement(X,Object.assign({authOptions:U},c)),l.default.createElement("div",{className:"grafana-info-box",style:{marginTop:"16px"},"data-testid":G},l.default.createElement("p",null,"Don\u2019t know how to get a service account key file or create a service account? Read more"," ",l.default.createElement("a",{className:"external-link",target:"_blank",rel:"noopener noreferrer",href:"https://grafana.com/docs/grafana/latest/datasources/google-cloud-monitoring/google-authentication/"},"in the documentation."))),!g&&l.default.createElement(p.Alert,{title:"",severity:"info"},"Verify GCE default service account by clicking Save & Test"))},y=U,y=F,y=$,y=Z},29118:(_,K,o)=>{"use strict";_.exports=o(33733)},43737:(_,K,o)=>{"use strict";o.r(K),o.d(K,{plugin:()=>oe});var y=o(82897),k=o(7238),p=o(55294),I=o(82378),ee=o(9892),r=o(68404);class l extends r.PureComponent{render(){return r.createElement("div",null,r.createElement("h2",null,"Cloud Monitoring alias patterns"),r.createElement("div",null,r.createElement("p",null,"Format the legend keys any way you want by using alias patterns. Format the legend keys any way you want by using alias patterns."),"Example:",r.createElement("code",null,"{{metric.name}} - {{metric.label.instance_name}}"),r.createElement("br",null),"Result: \xA0\xA0",r.createElement("code",null,"cpu/usage_time - server1-europe-west-1"),r.createElement("br",null),r.createElement("br",null),r.createElement("span",null,"Patterns:"),r.createElement("br",null),r.createElement("ul",{className:ee.css`
              list-style: none;
            `},r.createElement("li",null,r.createElement("code",null,"{{metric.type}}")," = metric type e.g. compute.googleapis.com/instance/cpu/usage_time"),r.createElement("li",null,r.createElement("code",null,"{{metric.name}}")," = name part of metric e.g. instance/cpu/usage_time"),r.createElement("li",null,r.createElement("code",null,"{{metric.service}}")," = service part of metric e.g. compute"),r.createElement("li",null,r.createElement("code",null,"{{metric.label.label_name}}")," = Metric label metadata e.g. metric.label.instance_name"),r.createElement("li",null,r.createElement("code",null,"{{resource.label.label_name}}")," = Resource label metadata e.g. resource.label.zone"),r.createElement("li",null,r.createElement("code",null,"{{metadata.system_labels.name}}")," = Meta data system labels e.g. metadata.system_labels.name. For this to work, the needs to be included in the group by"),r.createElement("li",null,r.createElement("code",null,"{{metadata.user_labels.name}}")," = Meta data user labels e.g. metadata.user_labels.name. For this to work, the needs to be included in the group by"),r.createElement("li",null,r.createElement("code",null,"{{bucket}}")," = bucket boundary for distribution metrics when using a heatmap in Grafana"),r.createElement("li",null,r.createElement("code",null,"{{project}}")," = The project name that was specified in the query editor"),r.createElement("li",null,r.createElement("code",null,"{{service}}")," = The service id that was specified in the SLO query editor"),r.createElement("li",null,r.createElement("code",null,"{{slo}}")," = The SLO id that was specified in the SLO query editor"),r.createElement("li",null,r.createElement("code",null,"{{selector}}")," = The Selector function that was specified in the SLO query editor"))))}}var F=o(29118),G=o(41818),te=o(12580),ae=o(47694);class re extends r.PureComponent{constructor(){super(...arguments),this.handleOnOptionsChange=e=>{(e.jsonData.privateKeyPath||e.secureJsonFields.privateKey)&&(0,G.ff)("grafana_cloud_monitoring_config_changed",{authenticationType:"JWT",privateKey:e.secureJsonFields.privateKey,privateKeyPath:!!e.jsonData.privateKeyPath}),this.props.onOptionsChange(e)}}render(){const{options:e,onOptionsChange:t}=this.props;return r.createElement(r.Fragment,null,r.createElement(F.ConnectionConfig,{...this.props,onOptionsChange:this.handleOnOptionsChange}),ae.vc.featureToggles.secureSocksDatasourceProxy&&r.createElement(te.i,{options:e,onOptionsChange:t}))}}var se=o(92773),M=o(20308),L=o(36967),s=o(12767),E=o(98626);class z extends r.PureComponent{constructor(e){super(e),this.queryTypes=[{value:s.Bp.Projects,label:"Projects"},{value:s.Bp.Services,label:"Services"},{value:s.Bp.MetricTypes,label:"Metric Types"},{value:s.Bp.LabelKeys,label:"Label Keys"},{value:s.Bp.LabelValues,label:"Label Values"},{value:s.Bp.ResourceTypes,label:"Resource Types"},{value:s.Bp.Aggregations,label:"Aggregations"},{value:s.Bp.Aligners,label:"Aligners"},{value:s.Bp.AlignmentPeriods,label:"Alignment Periods"},{value:s.Bp.Selectors,label:"Selectors"},{value:s.Bp.SLOServices,label:"SLO Services"},{value:s.Bp.SLO,label:"Service Level Objectives (SLO)"}],this.defaults={selectedQueryType:this.queryTypes[0].value,metricDescriptors:[],selectedService:"",selectedMetricType:"",labels:[],labelKey:"",metricTypes:[],services:[],sloServices:[],selectedSLOService:"",projects:[],projectName:"",loading:!0},this.onPropsChange=()=>{const{metricDescriptors:t,labels:a,metricTypes:n,services:i,...u}=this.state;this.props.onChange({...u,refId:"CloudMonitoringVariableQueryEditor-VariableQuery"})},this.state=Object.assign(this.defaults,this.props.query)}async componentDidMount(){await this.props.datasource.ensureGCEDefaultProject();const e=this.props.query.projectName||this.props.datasource.getDefaultProject(),t=await this.props.datasource.getProjects(),a=await this.props.datasource.getMetricTypes(this.props.query.projectName||this.props.datasource.getDefaultProject()),n=(0,L.qA)(a).map(R=>({value:R.service,label:R.serviceShortName}));let i="";n.some(R=>R.value===(0,M.J)().replace(this.state.selectedService))?i=this.state.selectedService:n&&n.length>0&&(i=n[0].value);const{metricTypes:u,selectedMetricType:b}=(0,L.FL)(a,this.state.selectedMetricType,(0,M.J)().replace(this.state.selectedMetricType),(0,M.J)().replace(i)),j=await this.props.datasource.getSLOServices(e),D={services:n,selectedService:i,metricTypes:u,selectedMetricType:b,metricDescriptors:a,projects:t,...await this.getLabels(b,e),sloServices:j,loading:!1,projectName:e};this.setState(D,()=>this.onPropsChange())}async onQueryTypeChange(e){const t={selectedQueryType:e,...await this.getLabels(this.state.selectedMetricType,this.state.projectName,e)};this.setState(t)}async onProjectChange(e){const t=await this.props.datasource.getMetricTypes(e),a=await this.getLabels(this.state.selectedMetricType,e),{metricTypes:n,selectedMetricType:i}=(0,L.FL)(t,this.state.selectedMetricType,(0,M.J)().replace(this.state.selectedMetricType),(0,M.J)().replace(this.state.selectedService)),u=await this.props.datasource.getSLOServices(e);this.setState({...a,metricTypes:n,selectedMetricType:i,metricDescriptors:t,projectName:e,sloServices:u},()=>this.onPropsChange())}async onServiceChange(e){const{metricTypes:t,selectedMetricType:a}=(0,L.FL)(this.state.metricDescriptors,this.state.selectedMetricType,(0,M.J)().replace(this.state.selectedMetricType),(0,M.J)().replace(e)),n={selectedService:e,metricTypes:t,selectedMetricType:a,...await this.getLabels(a,this.state.projectName)};this.setState(n,()=>this.onPropsChange())}async onMetricTypeChange(e){const t={selectedMetricType:e,...await this.getLabels(e,this.state.projectName)};this.setState(t,()=>this.onPropsChange())}onLabelKeyChange(e){this.setState({labelKey:e},()=>this.onPropsChange())}componentDidUpdate(e,t){const a=t.selectedQueryType!==this.state.selectedQueryType,n=this.state.selectedSLOService!==t.selectedSLOService;(a||n)&&this.onPropsChange()}async getLabels(e,t,a=this.state.selectedQueryType){let n={labels:this.state.labels,labelKey:this.state.labelKey};if(e&&a===s.Bp.LabelValues){const i=await(0,L.Qd)(this.props.datasource,e,t),u=i.some(b=>b===(0,M.J)().replace(this.state.labelKey))?this.state.labelKey:i[0];n={labels:i,labelKey:u}}return n}renderQueryTypeSwitch(e){const t={label:"Template Variables",expanded:!1,options:(0,M.J)().getVariables().map(a=>({value:`$${a.name}`,label:`$${a.name}`}))};switch(e){case s.Bp.MetricTypes:return r.createElement(r.Fragment,null,r.createElement(E.Th,{allowCustomValue:!0,value:this.state.projectName,options:[t,...this.state.projects],onChange:a=>this.onProjectChange(a),label:"Project"}),r.createElement(E.Th,{value:this.state.selectedService,options:[t,...this.state.services],onChange:a=>this.onServiceChange(a),label:"Service"}));case s.Bp.LabelKeys:case s.Bp.LabelValues:case s.Bp.ResourceTypes:return r.createElement(r.Fragment,null,r.createElement(E.Th,{allowCustomValue:!0,value:this.state.projectName,options:[t,...this.state.projects],onChange:a=>this.onProjectChange(a),label:"Project"}),r.createElement(E.Th,{value:this.state.selectedService,options:[t,...this.state.services],onChange:a=>this.onServiceChange(a),label:"Service"}),r.createElement(E.Th,{value:this.state.selectedMetricType,options:[t,...this.state.metricTypes.map(({value:a,name:n})=>({value:a,label:n}))],onChange:a=>this.onMetricTypeChange(a),label:"Metric Type"}),e===s.Bp.LabelValues&&r.createElement(E.Th,{value:this.state.labelKey,options:[t,...this.state.labels.map(a=>({value:a,label:a}))],onChange:a=>this.onLabelKeyChange(a),label:"Label Key"}));case s.Bp.Aligners:case s.Bp.Aggregations:return r.createElement(r.Fragment,null,r.createElement(E.Th,{value:this.state.selectedService,options:[t,...this.state.services],onChange:a=>this.onServiceChange(a),label:"Service"}),r.createElement(E.Th,{value:this.state.selectedMetricType,options:[t,...this.state.metricTypes.map(({value:a,name:n})=>({value:a,label:n}))],onChange:a=>this.onMetricTypeChange(a),label:"Metric Type"}));case s.Bp.SLOServices:return r.createElement(r.Fragment,null,r.createElement(E.Th,{allowCustomValue:!0,value:this.state.projectName,options:[t,...this.state.projects],onChange:a=>this.onProjectChange(a),label:"Project"}));case s.Bp.SLO:return r.createElement(r.Fragment,null,r.createElement(E.Th,{allowCustomValue:!0,value:this.state.projectName,options:[t,...this.state.projects],onChange:a=>this.onProjectChange(a),label:"Project"}),r.createElement(E.Th,{value:this.state.selectedSLOService,options:[t,...this.state.sloServices],onChange:a=>{this.setState({...this.state,selectedSLOService:a})},label:"SLO Service"}));default:return""}}render(){return this.state.loading?r.createElement("div",{className:"gf-form max-width-21"},r.createElement("span",{className:"gf-form-label width-10 query-keyword"},"Query Type"),r.createElement("div",{className:"gf-form-select-wrapper max-width-12"},r.createElement("select",{className:"gf-form-input"},r.createElement("option",null,"Loading...")))):r.createElement(r.Fragment,null,r.createElement(E.Th,{value:this.state.selectedQueryType,options:this.queryTypes,onChange:e=>this.onQueryTypeChange(e),label:"Query Type"}),this.renderQueryTypeSwitch(this.state.selectedQueryType))}}var H=o(65583),ne=o(59980),W=o(49372),$=o(39859),Y=o(9471),ie=o(22069),Q=o(54899),Z=o(32689),X=o(19349),q=o(58155),U=o(70197),c=o(63134),d=o(26418),g=o(46967),C=o(32060);const h=v=>({...(0,C.mO)(v),title:"",text:""}),O=v=>{const{datasource:e,query:t,onRunQuery:a,data:n,onChange:i}=v,b=(n?.series.length?n?.series[0].meta:{})?.custom??{},j={...h(e),...t.timeSeriesList},[D,R]=(0,r.useState)(j.title||""),[f,m]=(0,r.useState)(j.text||""),w={label:"Template Variables",options:e.getVariables().map(c.E)},ce=le=>{R(le.target.value)},ue=le=>{m(le.target.value)};return(0,U.Z)(()=>{i({...t,timeSeriesList:{...j,title:D}})},1e3,[D,i]),(0,U.Z)(()=>{i({...t,timeSeriesList:{...j,text:f}})},1e3,[f,i]),(0,r.useEffect)(()=>{Object.values(s.xL).includes(t.queryType)||i({...t,queryType:s.xL.TIME_SERIES_LIST})}),r.createElement(d.EditorRows,null,r.createElement(r.Fragment,null,r.createElement(C.a1,{refId:t.refId,variableOptionGroup:w,customMetaData:b,onChange:i,onRunQuery:a,datasource:e,query:t}),r.createElement(d.EditorField,{label:"Title",htmlFor:"annotation-query-title"},r.createElement(g.I,{id:"annotation-query-title",value:D,onChange:ce})),r.createElement(d.EditorField,{label:"Text",htmlFor:"annotation-query-text"},r.createElement(g.I,{id:"annotation-query-text",value:f,onChange:ue}))),r.createElement(E.zI,null))},P=v=>v.target?.title!==void 0||v.target?.text!==void 0,B=v=>({prepareAnnotation:e=>{if(!P(e))return e;const{enable:t,name:a,iconColor:n}=e,{target:i}=e;return{datasource:e.datasource,enable:t,name:a,iconColor:n,target:{intervalMs:v.intervalMs,refId:i?.refId||"annotationQuery",queryType:s.xL.ANNOTATION,timeSeriesList:{projectName:i?.projectName||v.getDefaultProject(),filters:i?.filters||[],crossSeriesReducer:"REDUCE_NONE",perSeriesAligner:s.CS.ALIGN_NONE,title:i?.title||"",text:i?.text||""}}}},prepareQuery:e=>{if(e.target)return{...e.target,queryType:s.xL.ANNOTATION,type:"annotationQuery"}},QueryEditor:O});var N=o(40467),A=o(59670);class S{constructor(e){this.datasource=e}async execute(e){try{switch(e.projectName||(e.projectName=this.datasource.getDefaultProject()),e.selectedQueryType){case s.Bp.Projects:return this.handleProjectsQuery();case s.Bp.Services:return this.handleServiceQuery(e);case s.Bp.MetricTypes:return this.handleMetricTypesQuery(e);case s.Bp.LabelKeys:return this.handleLabelKeysQuery(e);case s.Bp.LabelValues:return this.handleLabelValuesQuery(e);case s.Bp.ResourceTypes:return this.handleResourceTypeQuery(e);case s.Bp.Aligners:return this.handleAlignersQuery(e);case s.Bp.AlignmentPeriods:return this.handleAlignmentPeriodQuery();case s.Bp.Aggregations:return this.handleAggregationQuery(e);case s.Bp.SLOServices:return this.handleSLOServicesQuery(e);case s.Bp.SLO:return this.handleSLOQuery(e);case s.Bp.Selectors:return this.handleSelectorQuery();default:return[]}}catch(t){return console.error(`Could not run CloudMonitoringMetricFindQuery ${e}`,t),[]}}async handleProjectsQuery(){return(await this.datasource.getProjects()).map(t=>({text:t.label,value:t.value,expandable:!0}))}async handleServiceQuery({projectName:e}){const t=await this.datasource.getMetricTypes(e);return(0,L.qA)(t).map(n=>({text:n.serviceShortName,value:n.service,expandable:!0}))}async handleMetricTypesQuery({selectedService:e,projectName:t}){if(!e)return[];const a=await this.datasource.getMetricTypes(t);return(0,L.Qf)(a,this.datasource.templateSrv.replace(e)).map(n=>({text:n.displayName,value:n.type,expandable:!0}))}async handleLabelKeysQuery({selectedMetricType:e,projectName:t}){return e?(await(0,L.Qd)(this.datasource,e,t)).map(this.toFindQueryResult):[]}async handleLabelValuesQuery({selectedMetricType:e,labelKey:t,projectName:a}){if(!e)return[];const n="handleLabelValuesQuery",i=await this.datasource.getLabels(e,n,a,{groupBys:[t],crossSeriesReducer:"REDUCE_MEAN"}),u=this.datasource.templateSrv.replace(t);return(i.hasOwnProperty(u)?i[u]:[]).map(this.toFindQueryResult)}async handleResourceTypeQuery({selectedMetricType:e,projectName:t}){if(!e)return[];const a="handleResourceTypeQueryQueryType";return(await this.datasource.getLabels(e,a,t))["resource.type"]?.map(this.toFindQueryResult)??[]}async handleAlignersQuery({selectedMetricType:e,projectName:t}){if(!e)return[];const n=(await this.datasource.getMetricTypes(t)).find(i=>i.type===this.datasource.templateSrv.replace(e));return n?(0,L.oU)(n.valueType,n.metricKind).map(this.toFindQueryResult):[]}async handleAggregationQuery({selectedMetricType:e,projectName:t}){if(!e)return[];const n=(await this.datasource.getMetricTypes(t)).find(i=>i.type===this.datasource.templateSrv.replace(e));return n?(0,L.A_)(n.valueType,n.metricKind).map(this.toFindQueryResult):[]}async handleSLOServicesQuery({projectName:e}){return(await this.datasource.getSLOServices(e)).map(this.toFindQueryResult)}async handleSLOQuery({selectedSLOService:e,projectName:t}){return(await this.datasource.getServiceLevelObjectives(t,e)).map(this.toFindQueryResult)}async handleSelectorQuery(){return N.IR.map(this.toFindQueryResult)}handleAlignmentPeriodQuery(){return N.dD.map(this.toFindQueryResult)}toFindQueryResult(e){return(0,y.isString)(e)?{text:e,expandable:!0}:{...e,expandable:!0}}}class x extends A.Mg{constructor(e){super(),this.datasource=e,this.editor=z,this.metricFindQuery=new S(e),this.query=this.query.bind(this)}query(e){const t=(0,W.D)(this.metricFindQuery.execute(e.targets[0]));return(0,W.D)(this.datasource.ensureGCEDefaultProject()).pipe((0,$.z)(()=>t),(0,Y.U)(a=>({data:a})))}}class T extends ie.CK{constructor(e,t=(0,q.J)(),a=(0,X.$t)()){super(e),this.instanceSettings=e,this.templateSrv=t,this.timeSrv=a,this.authenticationType=e.jsonData.authenticationType||"jwt",this.variables=new x(this),this.intervalMs=0,this.annotations=B(this),this.backendSrv=(0,Q.i)()}getVariables(){return this.templateSrv.getVariables().map(e=>`$${e.name}`)}query(e){return e.targets=e.targets.map(t=>({...this.migrateQuery(t),intervalMs:e.intervalMs})),super.query(e)}applyTemplateVariables(e,t){const{timeSeriesList:a,timeSeriesQuery:n,sloQuery:i}=e;return{...e,datasource:this.getRef(),intervalMs:this.intervalMs,timeSeriesList:a&&{...this.interpolateProps(a,t),projectName:this.templateSrv.replace(a.projectName?a.projectName:this.getDefaultProject(),t),filters:this.interpolateFilters(a.filters||[],t),groupBys:this.interpolateGroupBys(a.groupBys||[],t),view:a.view||"FULL"},timeSeriesQuery:n&&{...this.interpolateProps(n,t),projectName:this.templateSrv.replace(n.projectName?n.projectName:this.getDefaultProject(),t)},sloQuery:i&&this.interpolateProps(i,t)}}async getLabels(e,t,a,n,i){const u={targets:[{refId:t,datasource:this.getRef(),queryType:s.xL.TIME_SERIES_LIST,timeSeriesList:(0,L.Av)({projectName:this.templateSrv.replace(a),groupBys:this.interpolateGroupBys(n?.groupBys||[],{}),crossSeriesReducer:n?.crossSeriesReducer??"REDUCE_NONE",view:"HEADERS"},e)}],range:i??this.timeSrv.timeRange()},b=u.targets;return b.length?(0,H.n)((0,W.D)(this.ensureGCEDefaultProject()).pipe((0,$.z)(()=>this.backendSrv.fetch({url:"/api/ds/query",method:"POST",headers:this.getRequestHeaders(),data:{from:u.range.from.valueOf().toString(),to:u.range.to.valueOf().toString(),queries:b}})),(0,Y.U)(({data:j})=>{const R=(0,Z.z1)({data:j})?.data.map(f=>f.meta?.custom?.labels).filter(f=>!!f).reduce((f,m)=>{for(let w in m)f[w]||(f[w]=new Set),m[w]&&f[w].add(m[w]);return f},{});return Object.fromEntries(Object.entries(R).map(f=>(f[1]=Array.from(f[1]),f)))}))):(0,H.n)((0,ne.of)({results:[]}))}async getGCEDefaultProject(){return this.getResource("gceDefaultProject")}getDefaultProject(){const{defaultProject:e,authenticationType:t,gceDefaultProject:a}=this.instanceSettings.jsonData;return t==="gce"?a||"":e||""}async ensureGCEDefaultProject(){const{authenticationType:e,gceDefaultProject:t}=this.instanceSettings.jsonData;e==="gce"&&!t&&(this.instanceSettings.jsonData.gceDefaultProject=await this.getGCEDefaultProject())}async getMetricTypes(e){return e?this.getResource(`metricDescriptors/v3/projects/${this.templateSrv.replace(e)}/metricDescriptors`):[]}async getSLOServices(e){return this.getResource(`services/v3/projects/${this.templateSrv.replace(e)}/services?pageSize=1000`)}async getServiceLevelObjectives(e,t){if(!t)return Promise.resolve([]);let{projectName:a,serviceId:n}=this.interpolateProps({projectName:e,serviceId:t});return this.getResource(`slo-services/v3/projects/${a}/services/${n}/serviceLevelObjectives`)}getProjects(){return this.getResource("projects")}migrateMetricTypeFilter(e,t){const a=["metric.type","=",e];return t?.length?t.concat("AND",a):a}migrateQuery(e){const{hide:t,refId:a,datasource:n,key:i,queryType:u,maxLines:b,metric:j,intervalMs:D,type:R,...f}=e;if(!e.hasOwnProperty("metricQuery")&&!e.hasOwnProperty("sloQuery")&&!e.hasOwnProperty("timeSeriesQuery")&&!e.hasOwnProperty("timeSeriesList"))return{datasource:n,key:i,refId:a,intervalMs:D,hide:t,queryType:R==="annotationQuery"?s.xL.ANNOTATION:s.xL.TIME_SERIES_LIST,timeSeriesList:{...f,view:f.view||"FULL"}};if((0,y.has)(e,"metricQuery")&&["metrics",s.xL.ANNOTATION].includes(e.queryType)){const m=(0,y.get)(e,"metricQuery");m.editorMode==="mql"?(e.timeSeriesQuery={projectName:m.projectName,query:m.query,graphPeriod:m.graphPeriod},e.queryType=s.xL.TIME_SERIES_QUERY):(e.timeSeriesList={projectName:m.projectName,crossSeriesReducer:m.crossSeriesReducer,alignmentPeriod:m.alignmentPeriod,perSeriesAligner:m.perSeriesAligner,groupBys:m.groupBys,filters:m.filters,view:m.view,preprocessor:m.preprocessor},e.queryType=s.xL.TIME_SERIES_LIST,m.metricType&&(e.timeSeriesList.filters=this.migrateMetricTypeFilter(m.metricType,e.timeSeriesList.filters))),e.aliasBy=m.aliasBy,e=(0,y.omit)(e,"metricQuery")}return e.queryType===s.xL.SLO&&(0,y.has)(e,"sloQuery.aliasBy")&&(e.aliasBy=(0,y.get)(e,"sloQuery.aliasBy"),e=(0,y.omit)(e,"sloQuery.aliasBy")),e}interpolateProps(e,t={}){return Object.entries(e).reduce((a,[n,i])=>({...a,[n]:i&&(0,y.isString)(i)?this.templateSrv.replace(i,t):i}),{})}filterQuery(e){if(e.hide)return!1;if(e.queryType===s.xL.SLO){if(!e.sloQuery)return!1;const{selectorName:t,serviceId:a,sloId:n,projectName:i,lookbackPeriod:u}=e.sloQuery;return!!t&&!!a&&!!n&&!!i&&(t!==N.Fh||!!u)}return e.queryType===s.xL.TIME_SERIES_QUERY?!!e.timeSeriesQuery&&!!e.timeSeriesQuery.projectName&&!!e.timeSeriesQuery.query:[s.xL.TIME_SERIES_LIST,s.xL.ANNOTATION].includes(e.queryType)?!!e.timeSeriesList&&!!e.timeSeriesList.projectName&&!!(0,L.WH)(e.timeSeriesList):!1}interpolateVariablesInQueries(e,t){return e.map(a=>this.applyTemplateVariables(this.migrateQuery(a),t))}interpolateFilters(e,t){const a=(0,y.chunk)(e,4).map(([i,u,b,j])=>({key:i,operator:u,value:b,...j&&{condition:j}})).filter(i=>i.value);return(0,y.flatten)(a.map(({key:i,operator:u,value:b,condition:j})=>[this.templateSrv.replace(i,t||{}),u,this.templateSrv.replace(b,t||{},D=>(0,y.isArray)(D)&&D.length?`(${D.join("|")})`:D),...j?[j]:[]]))||[]}interpolateGroupBys(e,t){let a=[];return(e||[]).forEach(n=>{const i=this.templateSrv.replace(n,t||{},"csv").split(",");Array.isArray(i)?a=a.concat(i):a.push(i)}),a}}const V={id:"stackdriver"},J=v=>{(0,G.ff)("grafana_ds_cloudmonitoring_dashboard_loaded",v)},oe=new k.hf(T).setQueryEditorHelp(l).setQueryEditor(se.W).setConfigEditor(re).setVariableQueryEditor(z);(0,I.N$)().subscribe(p.Pl,({payload:{dashboardId:v,orgId:e,grafanaVersion:t,queries:a}})=>{const n=a[V.id];let i={[s.xL.TIME_SERIES_QUERY]:0,[s.xL.TIME_SERIES_LIST]:0,[s.xL.SLO]:0,[s.xL.ANNOTATION]:0};n.forEach(u=>{u.queryType===s.xL.TIME_SERIES_QUERY||u.queryType===s.xL.TIME_SERIES_LIST||u.queryType===s.xL.SLO||u.queryType===s.xL.ANNOTATION?i[u.queryType]++:u.queryType==="metrics"&&(u.hasOwnProperty("type")&&(0,y.get)(u,"type")==="annotationQuery"&&i.annotation++,(0,y.get)(u,"metricQuery.editorMode")==="mql"?i.timeSeriesQuery++:i.timeSeriesList++)}),n&&n.length>0&&J({grafana_version:t,dashboard_id:v,org_id:e,mql_queries:i[s.xL.TIME_SERIES_QUERY],time_series_filter_queries:i[s.xL.TIME_SERIES_LIST],slo_queries:i[s.xL.SLO],annotation_queries:i[s.xL.ANNOTATION]})})}}]);

//# sourceMappingURL=cloudMonitoringPlugin.9ea0941248457c166c05.js.map