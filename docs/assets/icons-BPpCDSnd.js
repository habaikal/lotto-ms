function V(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var E={exports:{}},r={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=Symbol.for("react.element"),I=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),F=Symbol.for("react.strict_mode"),U=Symbol.for("react.profiler"),H=Symbol.for("react.provider"),Z=Symbol.for("react.context"),B=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),K=Symbol.for("react.memo"),G=Symbol.for("react.lazy"),g=Symbol.iterator;function J(e){return e===null||typeof e!="object"?null:(e=g&&e[g]||e["@@iterator"],typeof e=="function"?e:null)}var R={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$=Object.assign,j={};function y(e,t,n){this.props=e,this.context=t,this.refs=j,this.updater=n||R}y.prototype.isReactComponent={};y.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function A(){}A.prototype=y.prototype;function S(e,t,n){this.props=e,this.context=t,this.refs=j,this.updater=n||R}var w=S.prototype=new A;w.constructor=S;$(w,y.prototype);w.isPureReactComponent=!0;var C=Array.isArray,z=Object.prototype.hasOwnProperty,x={current:null},O={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,n){var u,o={},c=null,i=null;if(t!=null)for(u in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(c=""+t.key),t)z.call(t,u)&&!O.hasOwnProperty(u)&&(o[u]=t[u]);var l=arguments.length-2;if(l===1)o.children=n;else if(1<l){for(var a=Array(l),f=0;f<l;f++)a[f]=arguments[f+2];o.children=a}if(e&&e.defaultProps)for(u in l=e.defaultProps,l)o[u]===void 0&&(o[u]=l[u]);return{$$typeof:d,type:e,key:c,ref:i,props:o,_owner:x.current}}function Q(e,t){return{$$typeof:d,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function b(e){return typeof e=="object"&&e!==null&&e.$$typeof===d}function X(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var M=/\/+/g;function _(e,t){return typeof e=="object"&&e!==null&&e.key!=null?X(""+e.key):t.toString(36)}function k(e,t,n,u,o){var c=typeof e;(c==="undefined"||c==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(c){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case d:case I:i=!0}}if(i)return i=e,o=o(i),e=u===""?"."+_(i,0):u,C(o)?(n="",e!=null&&(n=e.replace(M,"$&/")+"/"),k(o,t,n,"",function(f){return f})):o!=null&&(b(o)&&(o=Q(o,n+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(M,"$&/")+"/")+e)),t.push(o)),1;if(i=0,u=u===""?".":u+":",C(e))for(var l=0;l<e.length;l++){c=e[l];var a=u+_(c,l);i+=k(c,t,n,a,o)}else if(a=J(e),typeof a=="function")for(e=a.call(e),l=0;!(c=e.next()).done;)c=c.value,a=u+_(c,l++),i+=k(c,t,n,a,o);else if(c==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function h(e,t,n){if(e==null)return e;var u=[],o=0;return k(e,u,"","",function(c){return t.call(n,c,o++)}),u}function Y(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var s={current:null},v={transition:null},ee={ReactCurrentDispatcher:s,ReactCurrentBatchConfig:v,ReactCurrentOwner:x};function L(){throw Error("act(...) is not supported in production builds of React.")}r.Children={map:h,forEach:function(e,t,n){h(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return h(e,function(){t++}),t},toArray:function(e){return h(e,function(t){return t})||[]},only:function(e){if(!b(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};r.Component=y;r.Fragment=N;r.Profiler=U;r.PureComponent=S;r.StrictMode=F;r.Suspense=W;r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ee;r.act=L;r.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var u=$({},e.props),o=e.key,c=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(c=t.ref,i=x.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(a in t)z.call(t,a)&&!O.hasOwnProperty(a)&&(u[a]=t[a]===void 0&&l!==void 0?l[a]:t[a])}var a=arguments.length-2;if(a===1)u.children=n;else if(1<a){l=Array(a);for(var f=0;f<a;f++)l[f]=arguments[f+2];u.children=l}return{$$typeof:d,type:e.type,key:o,ref:c,props:u,_owner:i}};r.createContext=function(e){return e={$$typeof:Z,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:H,_context:e},e.Consumer=e};r.createElement=q;r.createFactory=function(e){var t=q.bind(null,e);return t.type=e,t};r.createRef=function(){return{current:null}};r.forwardRef=function(e){return{$$typeof:B,render:e}};r.isValidElement=b;r.lazy=function(e){return{$$typeof:G,_payload:{_status:-1,_result:e},_init:Y}};r.memo=function(e,t){return{$$typeof:K,type:e,compare:t===void 0?null:t}};r.startTransition=function(e){var t=v.transition;v.transition={};try{e()}finally{v.transition=t}};r.unstable_act=L;r.useCallback=function(e,t){return s.current.useCallback(e,t)};r.useContext=function(e){return s.current.useContext(e)};r.useDebugValue=function(){};r.useDeferredValue=function(e){return s.current.useDeferredValue(e)};r.useEffect=function(e,t){return s.current.useEffect(e,t)};r.useId=function(){return s.current.useId()};r.useImperativeHandle=function(e,t,n){return s.current.useImperativeHandle(e,t,n)};r.useInsertionEffect=function(e,t){return s.current.useInsertionEffect(e,t)};r.useLayoutEffect=function(e,t){return s.current.useLayoutEffect(e,t)};r.useMemo=function(e,t){return s.current.useMemo(e,t)};r.useReducer=function(e,t,n){return s.current.useReducer(e,t,n)};r.useRef=function(e){return s.current.useRef(e)};r.useState=function(e){return s.current.useState(e)};r.useSyncExternalStore=function(e,t,n){return s.current.useSyncExternalStore(e,t,n)};r.useTransition=function(){return s.current.useTransition()};r.version="18.3.1";E.exports=r;var m=E.exports;const ne=V(m);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var te={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(e,t)=>{const n=m.forwardRef(({color:u="currentColor",size:o=24,strokeWidth:c=2,absoluteStrokeWidth:i,className:l="",children:a,...f},P)=>m.createElement("svg",{ref:P,...te,width:o,height:o,stroke:u,strokeWidth:i?Number(c)*24/Number(o):c,className:["lucide",`lucide-${re(e)}`,l].join(" "),...f},[...t.map(([D,T])=>m.createElement(D,T)),...Array.isArray(a)?a:[a]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=p("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=p("CircleStop",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["rect",{width:"6",height:"6",x:"9",y:"9",key:"1wrtvo"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=p("Cpu",[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=p("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=p("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=p("Radar",[["path",{d:"M19.07 4.93A10 10 0 0 0 6.99 3.34",key:"z3du51"}],["path",{d:"M4 6h.01",key:"oypzma"}],["path",{d:"M2.29 9.62A10 10 0 1 0 21.31 8.35",key:"qzzz0"}],["path",{d:"M16.24 7.76A6 6 0 1 0 8.23 16.67",key:"1yjesh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M17.99 11.66A6 6 0 0 1 15.77 16.67",key:"1u2y91"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"m13.41 10.59 5.66-5.66",key:"mhq4k0"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=p("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=p("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=p("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=p("SquareTerminal",[["path",{d:"m7 11 2-2-2-2",key:"1lz0vl"}],["path",{d:"M11 13h4",key:"1p7l4v"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=p("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=p("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);export{oe as A,ae as C,ce as D,ie as R,fe as S,de as T,he as Z,le as a,se as b,ue as c,ye as d,pe as e,ne as f,m as r};
