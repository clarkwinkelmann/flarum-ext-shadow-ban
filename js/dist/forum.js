module.exports=function(t){var n={};function o(a){if(n[a])return n[a].exports;var e=n[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=t,o.c=n,o.d=function(t,n,a){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:a})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,n){if(1&n&&(t=o(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)o.d(a,e,function(n){return t[n]}.bind(null,e));return a},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="",o(o.s=13)}([function(t,n){t.exports=flarum.core.compat["forum/app"]},function(t,n){t.exports=flarum.core.compat["common/components/Button"]},function(t,n){t.exports=flarum.core.compat["common/extend"]},,function(t,n){t.exports=flarum.core.compat["common/components/Badge"]},function(t,n){t.exports=flarum.core.compat["forum/components/CommentPost"]},function(t,n){t.exports=flarum.core.compat["common/models/Discussion"]},function(t,n){t.exports=flarum.core.compat["common/models/User"]},function(t,n){t.exports=flarum.core.compat["forum/utils/DiscussionControls"]},function(t,n){t.exports=flarum.core.compat["forum/utils/PostControls"]},function(t,n){t.exports=flarum.core.compat["forum/utils/UserControls"]},function(t,n){t.exports=flarum.core.compat["common/components/Modal"]},function(t,n){t.exports=flarum.core.compat["common/utils/withAttr"]},function(t,n,o){"use strict";o.r(n);var a=o(2),e=o(0),r=o.n(e),s=o(1),i=o.n(s),u=o(4),c=o.n(u),l=o(6),d=o.n(l),f=o(7),p=o.n(f),h=o(8),b=o.n(h),w=o(9),y=o.n(w),k=o(10),v=o.n(k),g=o(5),x=o.n(g);function j(t,n){return(j=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}var S=o(11),O=o.n(S),B=o(12),C=o.n(B),U=function(t){var n,o;function a(){for(var n,o=arguments.length,a=new Array(o),e=0;e<o;e++)a[e]=arguments[e];return(n=t.call.apply(t,[this].concat(a))||this).until=null,n.attrs=void 0,n}o=t,(n=a).prototype=Object.create(o.prototype),n.prototype.constructor=n,j(n,o);var e=a.prototype;return e.oninit=function(n){t.prototype.oninit.call(this,n);var o=this.attrs.user.attribute("shadowBannedUntil");o&&new Date>new Date(o)&&(o=null),o&&(this.until=dayjs(o).toISOString().substring(0,16))},e.className=function(){return"ShadowBanUserModal Modal--small"},e.title=function(){return r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.banUser.title",{user:this.attrs.user})},e.content=function(){var t=this,n=this.attrs.user.attribute("shadowBannedUntil");return new Date>n&&(n=null),m(".Modal-body",m(".Form",[m(".Form-group",[m("label",r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.banUser.until")),m("input.FormControl",{type:"datetime-local",value:this.until||"",onchange:C()("value",(function(n){t.until=n||null}))})]),m(".Form-group",[m("label",r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.banUser.quick")),i.a.component({className:"Button"+(this.until?"":" active"),onclick:function(){t.until=null}},r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.banUser.quickChoiceReset")),[1,2,7,30].map((function(n){var o=!1;if(t.until){var a=dayjs(t.until),e=dayjs().add(n,"days").subtract(12,"hours"),s=dayjs().add(n,"days").add(12,"hours");o=a.isAfter(e)&&a.isBefore(s)}return i.a.component({className:"Button"+(o?" active":""),onclick:function(){t.until=dayjs().add(n,"days").toISOString().substring(0,16)}},r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.banUser.quickChoiceDays",{count:n}))}))]),m(".Form-group",i.a.component({className:"Button Button--primary",loading:this.loading,type:"submit"},r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.banUser.submit")))]))},e.onsubmit=function(t){var n=this;t.preventDefault(),this.loading=!0,this.attrs.user.save({shadowBannedUntil:this.until}).then((function(){return n.hide()}),this.loaded.bind(this))},a}(O.a);r.a.initializers.add("clarkwinkelmann-shadow-ban",(function(){Object(a.extend)(b.a,"moderationControls",(function(t,n){if(n.attribute("canShadowHide")){var o=n.attribute("isShadowHidden");t.add("shadow-hide",i.a.component({icon:"fas fa-volume-mute",onclick:function(){n.save({isShadowHidden:!o}).then((function(){m.redraw()}))}},r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.discussionControl."+(o?"restore":"hide"))))}})),Object(a.extend)(y.a,"moderationControls",(function(t,n){if(n.attribute("canShadowHide")){var o=n.attribute("isShadowHidden");t.add("shadow-hide",i.a.component({icon:"fas fa-volume-mute",onclick:function(){n.save({isShadowHidden:!o}).then((function(){m.redraw()}))}},r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.postControl."+(o?"restore":"hide"))))}})),Object(a.extend)(v.a,"moderationControls",(function(t,n){n.attribute("canShadowBan")&&t.add("shadow-ban",i.a.component({icon:"fas fa-volume-mute",onclick:function(){r.a.modal.show(U,{user:n})}},r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.userControl.ban")))})),Object(a.extend)(p.a.prototype,"badges",(function(t){var n=this.attribute("shadowBannedUntil");n&&new Date<new Date(n)&&t.add("shadow-banned",c.a.component({icon:"fas fa-volume-mute",type:"shadow-banned",label:r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.badge.user")}))})),Object(a.extend)(d.a.prototype,"badges",(function(t){this.attribute("isShadowHidden")&&t.add("shadow-banned",c.a.component({icon:"fas fa-volume-mute",type:"shadow-banned",label:r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.badge.discussion")}))})),Object(a.extend)(x.a.prototype,"elementAttrs",(function(t){this.attrs.post.attribute("isShadowHidden")&&(t.className=(t.className||"")+" Post--hidden Post--shadow-hidden")})),Object(a.extend)(x.a.prototype,"headerItems",(function(t){this.attrs.post.attribute("isShadowHidden")&&(t.add("shadow-hidden",m("span.ShadowHiddenPostBadge",r.a.translator.trans("clarkwinkelmann-shadow-ban.forum.badge.post"))),t.has("toggle")||t.add("toggle",i.a.component({className:"Button Button--default Button--more",icon:"fas fa-ellipsis-h",onclick:this.toggleContent.bind(this)})))}))}))}]);
//# sourceMappingURL=forum.js.map