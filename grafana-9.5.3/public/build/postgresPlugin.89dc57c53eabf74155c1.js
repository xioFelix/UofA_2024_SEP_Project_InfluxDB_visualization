(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[534],{95756:(R,p,a)=>{"use strict";a.d(p,{d:()=>b});var r=a(68404),m=a(5916),e=a(81764),f=a(30810);const b=F=>{const{labelWidth:y,editorProps:E,showCACert:P,showKeyPair:d=!0}=F,{secureJsonFields:o}=E.options;return r.createElement(r.Fragment,null,d?r.createElement(e._,{tooltip:r.createElement("span",null,"To authenticate with an TLS/SSL client certificate, provide the client certificate here."),labelWidth:y,label:"TLS/SSL Client Certificate"},r.createElement(f.Zk,{placeholder:"Begins with -----BEGIN CERTIFICATE-----",cols:45,rows:7,isConfigured:o&&o.tlsClientCert,onChange:(0,m.fi)(E,"tlsClientCert"),onReset:()=>{(0,m.Mf)(E,"tlsClientCert")}})):null,P?r.createElement(e._,{tooltip:r.createElement("span",null,"If the selected TLS/SSL mode requires a server root certificate, provide it here."),labelWidth:y,label:"TLS/SSL Root Certificate"},r.createElement(f.Zk,{placeholder:"Begins with -----BEGIN CERTIFICATE-----",cols:45,rows:7,isConfigured:o&&o.tlsCACert,onChange:(0,m.fi)(E,"tlsCACert"),onReset:()=>{(0,m.Mf)(E,"tlsCACert")}})):null,d?r.createElement(e._,{tooltip:r.createElement("span",null,"To authenticate with a client TLS/SSL certificate, provide the key here."),labelWidth:y,label:"TLS/SSL Client Key"},r.createElement(f.Zk,{placeholder:"Begins with -----BEGIN RSA PRIVATE KEY-----",cols:45,rows:7,isConfigured:o&&o.tlsClientKey,onChange:(0,m.fi)(E,"tlsClientKey"),onReset:()=>{(0,m.Mf)(E,"tlsClientKey")}})):null)}},18821:(R,p,a)=>{"use strict";a.r(p),a.d(p,{plugin:()=>ve});var r=a(7238),m=a(9892),e=a(68404),f=a(72648);function b(){const t=(0,f.wW)(F);return e.createElement("div",null,e.createElement("h2",null,"PostgreSQL cheat sheet"),"Time series:",e.createElement("ul",{className:t.ulPadding},e.createElement("li",null,"return column named ",e.createElement("i",null,"time")," (UTC in seconds or timestamp)"),e.createElement("li",null,"return column(s) with numeric datatype as values")),"Optional:",e.createElement("ul",{className:t.ulPadding},e.createElement("li",null,"return column named ",e.createElement("i",null,"metric")," to represent the series name."),e.createElement("li",null,"If multiple value columns are returned the metric column is used as prefix."),e.createElement("li",null,"If no column named metric is found the column name of the value column is used as series name")),e.createElement("p",null,"Resultsets of time series queries need to be sorted by time."),"Table:",e.createElement("ul",{className:t.ulPadding},e.createElement("li",null,"return any set of columns")),"Macros:",e.createElement("ul",{className:t.ulPadding},e.createElement("li",null,'$__time(column) -> column as "time"'),e.createElement("li",null,'$__timeEpoch -> extract(epoch from column) as "time"'),e.createElement("li",null,"$__timeFilter(column) -> column BETWEEN '2017-04-21T05:01:17Z' AND '2017-04-21T05:01:17Z'"),e.createElement("li",null,"$__unixEpochFilter(column) -> column >= 1492750877 AND column <= 1492750877"),e.createElement("li",null,"$__unixEpochNanoFilter(column) -> column >= 1494410783152415214 AND column <= 1494497183142514872"),e.createElement("li",null,"$__timeGroup(column,'5m'[, fillvalue]) -> (extract(epoch from column)/300)::bigint*300 by setting fillvalue grafana will fill in missing values according to the interval fillvalue can be either a literal value, NULL or previous; previous will fill in the previous seen value or NULL if none has been seen yet"),e.createElement("li",null,`$__timeGroupAlias(column,'5m') -> (extract(epoch from column)/300)::bigint*300 AS "time"`),e.createElement("li",null,"$__unixEpochGroup(column,'5m') -> floor(column/300)*300"),e.createElement("li",null,`$__unixEpochGroupAlias(column,'5m') -> floor(column/300)*300 AS "time"`)),e.createElement("p",null,"Example of group by and order by with $__timeGroup:"),e.createElement("pre",null,e.createElement("code",null,"SELECT $__timeGroup(date_time_col, '1h'), sum(value) as value ",e.createElement("br",null),"FROM yourtable",e.createElement("br",null),"GROUP BY time",e.createElement("br",null),"ORDER BY time",e.createElement("br",null))),"Or build your own conditionals using these macros which just return the values:",e.createElement("ul",{className:t.ulPadding},e.createElement("li",null,"$__timeFrom() -> '2017-04-21T05:01:17Z'"),e.createElement("li",null,"$__timeTo() -> '2017-04-21T05:01:17Z'"),e.createElement("li",null,"$__unixEpochFrom() -> 1492750877"),e.createElement("li",null,"$__unixEpochTo() -> 1492750877"),e.createElement("li",null,"$__unixEpochNanoFrom() -> 1494410783152415214"),e.createElement("li",null,"$__unixEpochNanoTo() -> 1494497183142514872")))}function F(t){return{ulPadding:(0,m.css)({margin:t.spacing(1,0),paddingLeft:t.spacing(5)})}}var y=a(44674);const E={isDatasetSelectorHidden:!0};function P(t){return e.createElement(y.M,{...t,queryHeaderProps:E})}var d=a(5916),o=a(13393),u=a(81764),S=a(46967),D=a(11543),Q=a(52953),B=a(53217),W=a(8944),G=a(45253),K=a(29460),U=a(47694),Z=a(16705),H=a(95756),Y=a(99234),g=(t=>(t.disable="disable",t.require="require",t.verifyCA="verify-ca",t.verifyFull="verify-full",t))(g||{}),I=(t=>(t.filePath="file-path",t.fileContent="file-content",t))(I||{}),z=a(88771),J=a(54899),X=a(91162),q=a(25748),k=a(13930),_=a(40538),ee=a(67090);class te{constructor(n,l,i){this.target=(0,ee.Y)(n||{refId:"A"}),this.templateSrv=l,this.scopedVars=i}interpolate(){return this.templateSrv?.replace(this.target.rawSql,this.scopedVars,_.b8.SQLString)||""}quoteLiteral(n){return"'"+n.replace(/'/g,"''")+"'"}}function ae(){return"SELECT current_setting('server_version_num')::int/100 as version"}function le(){return"SELECT extversion FROM pg_extension WHERE extname = 'timescaledb'"}function ne(){return`select quote_ident(table_name) as "table" from information_schema.tables
    where quote_ident(table_schema) not in ('information_schema',
                             'pg_catalog',
                             '_timescaledb_cache',
                             '_timescaledb_catalog',
                             '_timescaledb_internal',
                             '_timescaledb_config',
                             'timescaledb_information',
                             'timescaledb_experimental')
      and ${ie()}`}function re(t){return`select quote_ident(column_name) as "column", data_type as "type"
    from information_schema.columns
    where quote_ident(table_name) = '${t}'`}function ie(){return`
          quote_ident(table_schema) IN (
          SELECT
            CASE WHEN trim(s[i]) = '"$user"' THEN user ELSE trim(s[i]) END
          FROM
            generate_series(
              array_lower(string_to_array(current_setting('search_path'),','),1),
              array_upper(string_to_array(current_setting('search_path'),','),1)
            ) as i,
            string_to_array(current_setting('search_path'),',') s
          )`}var se=a(26418);const oe=({getColumns:t,getTables:n})=>(l,i)=>({...i&&(0,se.getStandardSQLCompletionProvider)(l,i),tables:{resolve:async()=>await n.current()},columns:{resolve:async s=>await t.current({table:s?.table,refId:"A"})}});async function ce(t,n){const l=await t.fields(n);return l.length>0?l.map(i=>({name:i.value,type:i.value,description:i.value})):[]}async function ue(t){return await t.lookup?.()||[]}var me=a(82897),j=a(12936);function de(t){switch(t){case"boolean":return{raqbFieldType:"boolean",icon:"toggle-off"};case"bit":case"bit varying":case"character":case"character varying":case"text":return{raqbFieldType:"text",icon:"text"};case"smallint":case"integer":case"bigint":case"decimal":case"numeric":case"real":case"double precision":case"serial":case"bigserial":case"smallserial":return{raqbFieldType:"number",icon:"calculator-alt"};case"date":return{raqbFieldType:"date",icon:"clock-nine"};case"time":case"time with time zone":case"time without time zone":case"interval":return{raqbFieldType:"time",icon:"clock-nine"};case"timestamp":case"timestamp with time zone":case"timestamp without time zone":return{raqbFieldType:"datetime",icon:"clock-nine"};default:return{raqbFieldType:"text",icon:"text"}}}function fe({sql:t,table:n}){let l="";if(!t||!(0,j.IC)(t.columns))return l;if(l+=(0,j.zE)(t.columns),n&&(l+=`FROM ${n} `),t.whereString&&(l+=`WHERE ${t.whereString} `),t.groupBy?.[0]?.property.name){const i=t.groupBy.map(s=>s.property.name).filter(s=>!(0,me.isEmpty)(s));l+=`GROUP BY ${i.join(", ")} `}return t.orderBy?.property.name&&(l+=`ORDER BY ${t.orderBy.property.name} `),t.orderBy?.property.name&&t.orderByDirection&&(l+=`${t.orderByDirection} `),t.limit!==void 0&&t.limit>=0&&(l+=`LIMIT ${t.limit} `),l}class V extends q.D{constructor(n){super(n),this.sqlLanguageDefinition=void 0}getQueryModel(n,l,i){return new te(n,l,i)}async getVersion(){const l=(await this.runSql(ae())).fields.version?.values.toArray();return l?l[0].toString():""}async getTimescaleDBVersion(){const l=(await this.runSql(le())).fields.extversion?.values.toArray();if(l)return l[0]}async fetchTables(){return(await this.runSql(ne(),{refId:"tables"})).fields.table?.values.toArray().flat()??[]}getSqlLanguageDefinition(n){if(this.sqlLanguageDefinition!==void 0)return this.sqlLanguageDefinition;const l={getColumns:{current:i=>ce(n,i)},getTables:{current:()=>ue(n)}};return this.sqlLanguageDefinition={id:"pgsql",completionProvider:oe(l),formatter:k._},this.sqlLanguageDefinition}async fetchFields(n){const l=await this.runSql(re(n.table),{refId:"columns"}),i=[];for(let s=0;s<l.length;s++){const c=l.fields.column.values.get(s),w=l.fields.type.values.get(s);i.push({label:c,value:c,type:w,...de(w)})}return i}getDB(){return this.db!==void 0?this.db:{init:()=>Promise.resolve(!0),datasets:()=>Promise.resolve([]),tables:()=>this.fetchTables(),getEditorLanguageDefinition:()=>this.getSqlLanguageDefinition(this.db),fields:async n=>n?.table?this.fetchFields(n):[],validateQuery:n=>Promise.resolve({isError:!1,isValid:!0,query:n,error:"",rawSql:n.rawSql}),dsID:()=>this.id,toRawSql:fe,lookup:async()=>(await this.fetchTables()).map(l=>({name:l,completion:l}))}}}function he({props:t,setVersionOptions:n}){const[l,i]=(0,e.useState)(!1),{options:s,onOptionsChange:c}=t;(0,z.Z)(()=>{const w=async()=>{if(l){const C=await(0,X.ak)().loadDatasource(s.name);if(C instanceof V){const M=await C.getVersion(),h=parseInt(M,10);h>=906&&!s.jsonData.timescaledb&&await C.getTimescaleDBVersion()&&(0,d.tp)({options:s,onOptionsChange:c},"timescaledb",!0);const x=Math.trunc(h/100),O=h%100;let T=String(x);h<1e3&&(T=String(x)+"."+String(O)),N.find(v=>v.value===h)||n(v=>[...v,{label:T,value:h}]),(s.jsonData.postgresVersion===void 0||s.jsonData.postgresVersion!==h)&&(0,d.tp)({options:s,onOptionsChange:c},"postgresVersion",h)}}else{const C=await(0,J.i)().put(`/api/datasources/${s.id}`,s);i(!0),(0,d.fd)({options:s,onOptionsChange:c},"version",C.datasource.version)}};ge(s)&&w()},[s,l,n])}function ge(t){return t.url&&t.jsonData.database&&t.user&&(t.secureJsonData?.password||t.secureJsonFields?.password)&&(t.jsonData.sslmode===g.disable||t.jsonData.sslCertFile&&t.jsonData.sslKeyFile&&t.jsonData.sslRootCertFile)&&!t.jsonData.postgresVersion&&!t.readOnly}const N=[{label:"9.0",value:900},{label:"9.1",value:901},{label:"9.2",value:902},{label:"9.3",value:903},{label:"9.4",value:904},{label:"9.5",value:905},{label:"9.6",value:906},{label:"10",value:1e3},{label:"11",value:1100},{label:"12",value:1200},{label:"13",value:1300},{label:"14",value:1400},{label:"15",value:1500}],Ee=t=>{const[n,l]=(0,e.useState)(N);he({props:t,setVersionOptions:l}),(0,Y.D)(t);const{options:i,onOptionsChange:s}=t,c=i.jsonData,w=()=>{(0,d.Mf)(t,"password")},C=[{value:g.disable,label:"disable"},{value:g.require,label:"require"},{value:g.verifyCA,label:"verify-ca"},{value:g.verifyFull,label:"verify-full"}],M=[{value:I.filePath,label:"File system path"},{value:I.fileContent,label:"Certificate content"}],h=L=>$=>{(0,d.tp)(t,L,$.value)},x=L=>{(0,d.tp)(t,"timescaledb",L.currentTarget.checked)},O=L=>$=>{s({...i,[L]:$.currentTarget.value})},T=25,v=20,A=20;return e.createElement(e.Fragment,null,e.createElement(o.C,{label:"PostgreSQL Connection",width:400},e.createElement(u._,{labelWidth:v,label:"Host"},e.createElement(S.I,{width:40,name:"host",type:"text",value:i.url||"",placeholder:"localhost:5432",onChange:O("url")})),e.createElement(u._,{labelWidth:v,label:"Database"},e.createElement(S.I,{width:40,name:"database",value:c.database||"",placeholder:"database name",onChange:(0,d._R)(t,"database")})),e.createElement(D.Z,null,e.createElement(u._,{labelWidth:v,label:"User"},e.createElement(S.I,{value:i.user||"",placeholder:"user",onChange:O("user")})),e.createElement(u._,{label:"Password"},e.createElement(Q.m4,{placeholder:"Password",isConfigured:i.secureJsonFields?.password,onReset:w,onBlur:(0,d.fi)(t,"password")}))),e.createElement(u._,{labelWidth:v,label:"TLS/SSL Mode",htmlFor:"tlsMode",tooltip:"This option determines whether or with what priority a secure TLS/SSL TCP/IP connection will be negotiated with the server."},e.createElement(B.Ph,{options:C,inputId:"tlsMode",value:c.sslmode||g.verifyFull,onChange:h("sslmode")})),i.jsonData.sslmode!==g.disable?e.createElement(u._,{labelWidth:v,label:"TLS/SSL Method",htmlFor:"tlsMethod",tooltip:e.createElement("span",null,"This option determines how TLS/SSL certifications are configured. Selecting ",e.createElement("i",null,"File system path")," will allow you to configure certificates by specifying paths to existing certificates on the local file system where Grafana is running. Be sure that the file is readable by the user executing the Grafana process.",e.createElement("br",null),e.createElement("br",null),"Selecting ",e.createElement("i",null,"Certificate content")," will allow you to configure certificates by specifying its content. The content will be stored encrypted in Grafana's database. When connecting to the database the certificates will be written as files to Grafana's configured data path on the local file system.")},e.createElement(B.Ph,{options:M,inputId:"tlsMethod",value:c.tlsConfigurationMethod||I.filePath,onChange:h("tlsConfigurationMethod")})):null),U.vc.featureToggles.secureSocksDatasourceProxy&&e.createElement(o.C,{label:"Secure Socks Proxy"},e.createElement(u._,{labelWidth:26,label:"Enabled",tooltip:"Connect to this datasource via the secure socks proxy."},e.createElement(W.x,{value:i.jsonData.enableSecureSocksProxy??!1,onChange:L=>s({...i,jsonData:{...i.jsonData,enableSecureSocksProxy:L.currentTarget.checked}})}))),c.sslmode!==g.disable?e.createElement(o.C,{label:"TLS/SSL Auth Details"},c.tlsConfigurationMethod===I.fileContent?e.createElement(H.d,{showCACert:c.sslmode===g.verifyCA||c.sslmode===g.verifyFull,editorProps:t,labelWidth:T}):e.createElement(e.Fragment,null,e.createElement(u._,{tooltip:e.createElement("span",null,"If the selected TLS/SSL mode requires a server root certificate, provide the path to the file here."),labelWidth:T,label:"TLS/SSL Root Certificate"},e.createElement(S.I,{value:c.sslRootCertFile||"",onChange:(0,d._R)(t,"sslRootCertFile"),placeholder:"TLS/SSL root cert file"})),e.createElement(u._,{tooltip:e.createElement("span",null,"To authenticate with an TLS/SSL client certificate, provide the path to the file here. Be sure that the file is readable by the user executing the grafana process."),labelWidth:T,label:"TLS/SSL Client Certificate"},e.createElement(S.I,{value:c.sslCertFile||"",onChange:(0,d._R)(t,"sslCertFile"),placeholder:"TLS/SSL client cert file"})),e.createElement(u._,{tooltip:e.createElement("span",null,"To authenticate with a client TLS/SSL certificate, provide the path to the corresponding key file here. Be sure that the file is ",e.createElement("i",null,"only")," readable by the user executing the grafana process."),labelWidth:T,label:"TLS/SSL Client Key"},e.createElement(S.I,{value:c.sslKeyFile||"",onChange:(0,d._R)(t,"sslKeyFile"),placeholder:"TLS/SSL client key file"})))):null,e.createElement(Z.K,{labelWidth:A,options:i,onOptionsChange:s}),e.createElement(o.C,{label:"PostgreSQL details"},e.createElement(u._,{tooltip:"This option controls what functions are available in the PostgreSQL query builder",labelWidth:A,htmlFor:"postgresVersion",label:"Version"},e.createElement(B.Ph,{value:c.postgresVersion||903,inputId:"postgresVersion",onChange:h("postgresVersion"),options:n})),e.createElement(u._,{tooltip:e.createElement("span",null,"TimescaleDB is a time-series database built as a PostgreSQL extension. If enabled, Grafana will use",e.createElement("code",null,"time_bucket")," in the ",e.createElement("code",null,"$__timeGroup")," macro and display TimescaleDB specific aggregate functions in the query builder."),labelWidth:A,label:"TimescaleDB",htmlFor:"timescaledb"},e.createElement(W.x,{id:"timescaledb",value:c.timescaledb||!1,onChange:x})),e.createElement(u._,{tooltip:e.createElement("span",null,"A lower limit for the auto group by time interval. Recommended to be set to write frequency, for example",e.createElement("code",null,"1m")," if your data is written every minute."),labelWidth:A,label:"Min time interval"},e.createElement(S.I,{placeholder:"1m",value:c.timeInterval||"",onChange:(0,d._R)(t,"timeInterval")}))),e.createElement(G.b,{title:"User Permission",severity:"info"},"The database user should only be granted SELECT permissions on the specified database & tables you want to query. Grafana does not validate that queries are safe so queries can contain any SQL statement. For example, statements like ",e.createElement("code",null,"DELETE FROM user;")," and ",e.createElement("code",null,"DROP TABLE user;")," would be executed. To protect against this we ",e.createElement("strong",null,"Highly")," recommend you create a specific PostgreSQL user with restricted permissions. Check out the"," ",e.createElement(K.r,{rel:"noreferrer",target:"_blank",href:"http://docs.grafana.org/features/datasources/postgres/"},"PostgreSQL Data Source Docs")," ","for more information."))},ve=new r.hf(V).setQueryEditor(P).setQueryEditorHelp(b).setConfigEditor(Ee)},88771:(R,p,a)=>{"use strict";a.d(p,{Z:()=>d});var r=a(68404),m=function(o){return o!==Object(o)},e=function(o,u,S){var D=(0,r.useRef)(void 0);(!D.current||!S(u,D.current))&&(D.current=u),(0,r.useEffect)(o,D.current)};const f=e;var b=a(48322),F=a.n(b);const y=F();var E=function(o){return o!==Object(o)},P=function(o,u){f(o,u,y)};const d=P},48322:R=>{"use strict";R.exports=function p(a,r){if(a===r)return!0;if(a&&r&&typeof a=="object"&&typeof r=="object"){if(a.constructor!==r.constructor)return!1;var m,e,f;if(Array.isArray(a)){if(m=a.length,m!=r.length)return!1;for(e=m;e--!==0;)if(!p(a[e],r[e]))return!1;return!0}if(a.constructor===RegExp)return a.source===r.source&&a.flags===r.flags;if(a.valueOf!==Object.prototype.valueOf)return a.valueOf()===r.valueOf();if(a.toString!==Object.prototype.toString)return a.toString()===r.toString();if(f=Object.keys(a),m=f.length,m!==Object.keys(r).length)return!1;for(e=m;e--!==0;)if(!Object.prototype.hasOwnProperty.call(r,f[e]))return!1;for(e=m;e--!==0;){var b=f[e];if(!(b==="_owner"&&a.$$typeof)&&!p(a[b],r[b]))return!1}return!0}return a!==a&&r!==r}},76345:()=>{},56834:()=>{}}]);

//# sourceMappingURL=postgresPlugin.89dc57c53eabf74155c1.js.map