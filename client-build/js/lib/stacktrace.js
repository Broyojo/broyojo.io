// Domain Public by Eric Wendelin http://eriwen.com/ (2008)
//                  Luke Smith http://lucassmith.name/ (2008)
//                  Loic Dachary <loic@dachary.org> (2008)
//                  Johan Euphrosine <proppy@aminche.com> (2008)
//                  Øyvind Sean Kinsey http://kinsey.no/blog (2010)
//
// Information and discussions
// http://jspoker.pokersource.info/skin/test-printstacktrace.html
// http://eriwen.com/javascript/js-stack-trace/
// http://eriwen.com/javascript/stacktrace-update/
// http://pastie.org/253058
//
// guessFunctionNameFromLines comes from firebug
//
// Software License Agreement (BSD License)
//
// Copyright (c) 2007, Parakey Inc.
// All rights reserved.
//
// Redistribution and use of this software in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above
//   copyright notice, this list of conditions and the
//   following disclaimer.
//
// * Redistributions in binary form must reproduce the above
//   copyright notice, this list of conditions and the
//   following disclaimer in the documentation and/or other
//   materials provided with the distribution.
//
// * Neither the name of Parakey Inc. nor the names of its
//   contributors may be used to endorse or promote products
//   derived from this software without specific prior
//   written permission of Parakey Inc.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
// IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
// OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

function printStackTrace(e){var t=e&&e.e?e.e:null,n=e?!!e.guess:!0,r=new printStackTrace.implementation,i=r.run(t);return n?r.guessFunctions(i):i}printStackTrace.implementation=function(){},printStackTrace.implementation.prototype={run:function(e){var t=this._mode||this.mode();return t==="other"?this.other(arguments.callee):(e=e||function(){try{var e=__undef__<<1}catch(t){return t}}(),this[t](e))},mode:function(){try{var e=__undef__<<1}catch(t){if(t.arguments)return this._mode="chrome";if(window.opera&&t.stacktrace)return this._mode="opera10";if(t.stack)return this._mode="firefox";if(window.opera&&!("stacktrace"in t))return this._mode="opera"}return this._mode="other"},instrumentFunction:function(e,t,n){e=e||window,e["_old"+t]=e[t],e[t]=function(){return n.call(this,printStackTrace()),e["_old"+t].apply(this,arguments)},e[t]._instrumented=!0},deinstrumentFunction:function(e,t){e[t].constructor===Function&&e[t]._instrumented&&e["_old"+t].constructor===Function&&(e[t]=e["_old"+t])},chrome:function(e){return e.stack.replace(/^[^\n]*\n/,"").replace(/^[^\n]*\n/,"").replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@").split("\n")},firefox:function(e){return e.stack.replace(/^[^\n]*\n/,"").replace(/(?:\n@:0)?\s+$/m,"").replace(/^\(/gm,"{anonymous}(").split("\n")},opera10:function(e){var t=e.stacktrace,n=t.split("\n"),r="{anonymous}",i=/.*line (\d+), column (\d+) in ((<anonymous function\:?\s*(\S+))|([^\(]+)\([^\)]*\))(?: in )?(.*)\s*$/i,s,o,u;for(s=2,o=0,u=n.length;s<u-2;s++)if(i.test(n[s])){var a=RegExp.$6+":"+RegExp.$1+":"+RegExp.$2,f=RegExp.$3;f=f.replace(/<anonymous function\s?(\S+)?>/g,r),n[o++]=f+"@"+a}return n.splice(o,n.length-o),n},opera:function(e){var t=e.message.split("\n"),n="{anonymous}",r=/Line\s+(\d+).*script\s+(http\S+)(?:.*in\s+function\s+(\S+))?/i,i,s,o;for(i=4,s=0,o=t.length;i<o;i+=2)r.test(t[i])&&(t[s++]=(RegExp.$3?RegExp.$3+"()@"+RegExp.$2+RegExp.$1:n+"()@"+RegExp.$2+":"+RegExp.$1)+" -- "+t[i+1].replace(/^\s+/,""));return t.splice(s,t.length-s),t},other:function(e){var t="{anonymous}",n=/function\s*([\w\-$]+)?\s*\(/i,r=[],i=0,s,o,u=10;while(e&&r.length<u)s=n.test(e.toString())?RegExp.$1||t:t,o=Array.prototype.slice.call(e.arguments),r[i++]=s+"("+this.stringifyArguments(o)+")",e=e.caller;return r},stringifyArguments:function(e){for(var t=0;t<e.length;++t){var n=e[t];n===undefined?e[t]="undefined":n===null?e[t]="null":n.constructor&&(n.constructor===Array?n.length<3?e[t]="["+this.stringifyArguments(n)+"]":e[t]="["+this.stringifyArguments(Array.prototype.slice.call(n,0,1))+"..."+this.stringifyArguments(Array.prototype.slice.call(n,-1))+"]":n.constructor===Object?e[t]="#object":n.constructor===Function?e[t]="#function":n.constructor===String&&(e[t]='"'+n+'"'))}return e.join(",")},sourceCache:{},ajax:function(e){var t=this.createXMLHTTPObject();if(!t)return;return t.open("GET",e,!1),t.setRequestHeader("User-Agent","XMLHTTP/1.0"),t.send(""),t.responseText},createXMLHTTPObject:function(){var e,t=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var n=0;n<t.length;n++)try{return e=t[n](),this.createXMLHTTPObject=t[n],e}catch(r){}},isSameDomain:function(e){return e.indexOf(location.hostname)!==-1},getSource:function(e){return e in this.sourceCache||(this.sourceCache[e]=this.ajax(e).split("\n")),this.sourceCache[e]},guessFunctions:function(e){for(var t=0;t<e.length;++t){var n=/\{anonymous\}\(.*\)@(\w+:\/\/([\-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/,r=e[t],i=n.exec(r);if(i){var s=i[1],o=i[4];if(s&&this.isSameDomain(s)&&o){var u=this.guessFunctionName(s,o);e[t]=r.replace("{anonymous}",u)}}}return e},guessFunctionName:function(e,t){try{return this.guessFunctionNameFromLines(t,this.getSource(e))}catch(n){return"getSource failed with url: "+e+", exception: "+n.toString()}},guessFunctionNameFromLines:function(e,t){var n=/function ([^(]*)\(([^)]*)\)/,r=/['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,i="",s=10;for(var o=0;o<s;++o){i=t[e-o]+i;if(i!==undefined){var u=r.exec(i);if(u&&u[1])return u[1];u=n.exec(i);if(u&&u[1])return u[1]}}return"(?)"}};