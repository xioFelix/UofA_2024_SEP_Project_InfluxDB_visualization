"use strict";(self.webpackChunkgrafana=self.webpackChunkgrafana||[]).push([[950],{72040:(C,r,a)=>{a.r(r),a.d(r,{NewOrgPage:()=>i,default:()=>D});var n=a(68404),E=a(36635),l=a(94270),s=a(13393),_=a(24799),g=a(46967),c=a(31403),o=a(79396),m=a(47694),O=a(2183);const P={createOrganization:O.Yi},d=(0,E.connect)(void 0,P),u={icon:"building",id:"org-new",text:"New organization",breadcrumbs:[{title:"Server admin",url:"admin/orgs"}]},i=({createOrganization:M})=>{const h=async e=>{await M(e),window.location.href=(0,m.iE)().appSubUrl+"/org"};return n.createElement(o.T,{navId:"global-orgs",pageNav:u},n.createElement(o.T.Contents,null,n.createElement("p",{className:"muted"},"Each organization contains their own dashboards, data sources, and configuration, which cannot be shared shared between organizations. While users might belong to more than one organization, multiple organizations are most frequently used in multi-tenant deployments."),n.createElement(l.l,{onSubmit:h},({register:e,errors:t})=>n.createElement(n.Fragment,null,n.createElement(s.C,null,n.createElement(_.g,{label:"Organization name",invalid:!!t.name,error:t.name&&t.name.message},n.createElement(g.I,{placeholder:"Org name",...e("name",{required:"Organization name is required"})}))),n.createElement(c.zx,{type:"submit"},"Create")))))},D=d(i)}}]);

//# sourceMappingURL=NewOrgPage.66cba7a2bfdb76d39444.js.map