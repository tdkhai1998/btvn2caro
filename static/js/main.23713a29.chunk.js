(window.webpackJsonpbtvn2caro=window.webpackJsonpbtvn2caro||[]).push([[0],{13:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),i=n(7),o=n.n(i),s=(n(13),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function c(t,e){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var n=t.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),e&&e.onUpdate&&e.onUpdate(t)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}})).catch((function(t){console.error("Error during service worker registration:",t)}))}var u=n(1),l=n(2),d=n(4),f=n(3),h=n(5),v=function(t){var e=t.status,n=t.value;return a.a.createElement("button",{type:"button",className:"square  ".concat(e),onClick:function(){return t.onClick()}},function(){if(null===n)return a.a.createElement("img",{src:"./Anh1.png",alt:"dgf"});if("O"===n.value){if(-1!==n.dirMark){var t="./Anh2.".concat(n.dirMark+1,".png");return a.a.createElement("img",{src:t,alt:"sfg"})}return a.a.createElement("img",{src:"./Anh2.png",alt:"sfg"})}if(-1!==n.dirMark){var e="./Anh3.".concat(n.dirMark+1,".png");return a.a.createElement("img",{src:e,alt:"sfg"})}return a.a.createElement("img",{src:"./Anh3.png",alt:"sfg"})}())},m=function(t){function e(){return Object(u.a)(this,e),Object(d.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(l.a)(e,[{key:"print",value:function(){for(var t=this.props,e=t.selectedIndex,n=t.height,r=t.width,i=t.result,o=t.square,s=t.onClick,c=[],u=e%20,l=Math.floor(e/20),d=0;d<n;d+=1){for(var f=[],h=function(t){var e=d*r+t;d===l||t===u?f.push(a.a.createElement(v,{key:t,result:i,status:"todam",value:o[e],onClick:function(){s(e)}})):f.push(a.a.createElement(v,{key:t,result:i,value:o[e],onClick:function(){s(e)}}))},m=0;m<r;m+=1)h(m);c.push(a.a.createElement("div",{key:d,className:"board-row"},f))}return c}},{key:"listTurn",value:function(){var t=this.props,e=t.isSorted,n=t.history,r=t.indexHistory,i=t.amazing,o=t.width,s=e?n.slice():n.slice().reverse(),c=r;return s.map((function(t,n){var r="( ".concat(t.index%o," , ").concat(Math.floor(t.index/o)," ) "),u=e?n:s.length-1-n,l=n;return u===c?a.a.createElement("button",{type:"button",disabled:!0,className:"myButton",key:l,onClick:function(){return i(u)}},u," TURN ","".concat(t.turn?"X":"O"," ").concat(r)):a.a.createElement("button",{type:"button",className:"myButton",key:l,onClick:function(){return i(u)}},u," TURN ","".concat(t.turn?"X":"O","  ").concat(r))}))}},{key:"render",value:function(){var t=this.props,e=t.result,n=t.turn,r=t.restart,i=t.sort,o=t.isSorted;return a.a.createElement("div",null,a.a.createElement("div",{className:"flex-container"},a.a.createElement("div",null,this.print()),a.a.createElement("div",{style:{paddingTop:10,width:500}},a.a.createElement("div",{style:{width:250}},e?"".concat(n?"O":"X","  WON!!!"):"TURN ".concat(n?"X":"O")),a.a.createElement("button",{type:"button",className:"button",onClick:function(){return r()}},"RESTART"),a.a.createElement("button",{type:"button",className:"button",onClick:function(){return i()}},o?"SORTED":"SORT"),a.a.createElement("div",{style:{maxHeight:450,overflow:"auto",paddingBottom:20}},this.listTurn()))))}}]),e}(a.a.Component);function y(t,e,n,r,a){var i=0,o=n[e].value,s=0,c=[],u=function(t,e){return t>=0&&t<r&&e>=0&&e<a},l=function(a){for(var l=e%r,d=Math.floor(e/r),f=e;u(l,d)&&null!=n[f]&&n[f].value===o;)i+=1,c.push(f),l+=t[a][0],f=(d+=t[a][1])*r+l;u(l,d)&&null!=n[f]&&n[f].value!==o&&(s+=1)};return l(0),l(1),(5!==(i-=1)||2!==s)&&(!(i<5)&&c)}var g=function(t,e,n,r){for(var a=Number(n),i=Number(r),o=[[[-1,-1],[1,1]],[[0,-1],[0,1]],[[1,-1],[-1,1]],[[-1,0],[1,0]]],s=0;s<4;s+=1){var c=y(o[s],e,t,a,i);if(!1!==c)return{arr:c,dir:s}}return!1},p=20,k=20,b=function(t){function e(t){var n;return Object(u.a)(this,e),(n=Object(d.a)(this,Object(f.a)(e).call(this,t))).state={square:Array(k*p).fill(null),turn:!0,result:!1,history:[],indexHistory:-1,selectedIndex:-1},n}return Object(h.a)(e,t),Object(l.a)(e,[{key:"onClick",value:function(t){var e=this.state,n=e.square,r=e.turn,a=e.indexHistory,i=this.state,o=i.history,s=i.result;s||null!==n[t]||(a<o.length-1&&(o=o.slice(0,a+1)),n[t]={value:r?"X":"O",dirMark:-1},!1!==(s=g(n,t,k,p))&&s.arr.forEach((function(t){n[t].dirMark=s.dir})),o.push({index:t,turn:r}),this.setState({square:n,turn:!r,history:o,indexHistory:o.length-1,result:!1!==s,selectedIndex:t}))}},{key:"restart",value:function(){this.setState({square:Array(k*p).fill(null),turn:!0,result:!1,history:[],indexHistory:-1,isSorted:!1})}},{key:"amazing",value:function(t){var e=this.state,n=e.indexHistory,r=e.square,a=e.history,i=!1;if(!(t<0||n===t)){for(var o=0;o<r.length;o+=1)null!==r[o]&&(r[o].dirMark=-1);if(t>n){for(var s=t;s>n;s-=1)r[a[s].index]={value:a[s].turn?"X":"O",dirMark:-1};!1!==(i=g(r,a[t].index,k,p))&&i.arr.forEach((function(t){r[t].dirMark=i.dir}))}else for(var c=t+1;c<=n;c+=1)r[a[c].index]=null;this.setState({indexHistory:t,square:r,history:a,turn:!a[t].turn,selectedIndex:a[t].index,result:!1!==i})}}},{key:"sort",value:function(){var t=this.state.isSorted;this.setState({isSorted:!t})}},{key:"render",value:function(){var t=this,e=this.state,n=e.square,r=e.turn,i=e.result,o=e.history,s=e.indexHistory,c=e.selectedIndex,u=e.isSorted;return a.a.createElement(m,{height:p,width:k,square:n,turn:r,result:i,onClick:function(e){return t.onClick(e)},restart:function(){return t.restart()},history:o,indexHistory:s,amazing:function(e){return t.amazing(e)},selectedIndex:c,isSorted:u,sort:function(){return t.sort()}})}}]),e}(a.a.Component);o.a.render(a.a.createElement(b,null),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL("/btvn2caro",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/btvn2caro","/service-worker.js");s?(!function(t,e){fetch(t).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):c(t,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,t),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):c(e,t)}))}}()},8:function(t,e,n){t.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.23713a29.chunk.js.map