window.Modernizr=function(e,t,n){function r(e){p.cssText=e}function i(e,t){return r(m.join(e+";")+(t||""))}function s(e,t){return typeof e===t}function o(e,t){return!!~(""+e).indexOf(t)}function u(e,t,r){for(var i in e){var o=t[e[i]];if(o!==n)return r===!1?e[i]:s(o,"function")?o.bind(r||t):o}return!1}var a="2.5.3",f={},l=t.documentElement,c="modernizr",h=t.createElement(c),p=h.style,d,v={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),g={},y={},b={},w=[],E=w.slice,S,x={}.hasOwnProperty,T;!s(x,"undefined")&&!s(x.call,"undefined")?T=function(e,t){return x.call(e,t)}:T=function(e,t){return t in e&&s(e.constructor.prototype[t],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if(typeof t!="function")throw new TypeError;var n=E.call(arguments,1),r=function(){if(this instanceof r){var i=function(){};i.prototype=t.prototype;var s=new i,o=t.apply(s,n.concat(E.call(arguments)));return Object(o)===o?o:s}return t.apply(e,n.concat(E.call(arguments)))};return r}),g.opacity=function(){return i("opacity:.55"),/^0.55$/.test(p.opacity)},g.audio=function(){var e=t.createElement("audio"),n=!1;try{if(n=!!e.canPlayType)n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(r){}return n},g.localstorage=function(){try{return localStorage.setItem(c,c),localStorage.removeItem(c),!0}catch(e){return!1}};for(var N in g)T(g,N)&&(S=N.toLowerCase(),f[S]=g[N](),w.push((f[S]?"":"no-")+S));return r(""),h=d=null,f._version=a,f._prefixes=m,f}(this,this.document);