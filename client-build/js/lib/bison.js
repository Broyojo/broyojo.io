/*
   Copyright (c) 2010-2011 Ivo Wetzel.

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
*/

(function(e){function s(e,t){if(typeof e=="number"){var r=e|0;if(r!==e){var o=0,u=(e-r)*100;u<0?(o=(u+1|0)-u,u=o>=1&&o<=1.5?u|0:u-1|0):(o=u|0,u=u-o>=.5?u+1|0:o),o=0,e<0&&(r=0-r,u=0-u,o=1),r<65536?r===0?i+=n[13+o]+n[u+128]:i+=n[13+o]+n[u]+n[r]:i+=n[15+o]+n[r>>16&65535]+n[r&65535]+n[u]}else{var o=0;e<=0?(e=0-e,o=1):e--,e<116?i+=n[17+e+o*116]:e<65536?i+=n[1+o]+n[e]:i+=n[3+o]+n[e>>16&65535]+n[e&65535]}}else if(typeof e=="string"){var a=e.length;i+=n[7];while(a>=65535)a-=65535,i+=n[65535];i+=n[a]+e}else if(e===!0)i+=n[5];else if(e===!1)i+=n[6];else if(e===null)i+=n[0];else if(e instanceof Array){i+=n[8];for(var f=0,a=e.length;f<a;f++)s(e[f],!1);t||(i+=n[9])}else if(e instanceof Object){i+=n[10];for(var l in e)i+=n[17+l.length]+l,s(e[l],!1);t||(i+=n[11])}}function o(e){return i="",s(e,!0),i}function u(t){var n=0,r=t.length,i=[],s=e,o=null,u=0,a=-1,f=!1,l=!1,c="",h=null,p=0;while(n<r){u=t.charCodeAt(n++),o=i[a];if(f&&l&&u>16)c=t.substring(n,n+u-17),n+=u-17,l=!1;else if(u===8||u===10)h=u===8?new Array:new Object,l=f=u===10,s!==e?o instanceof Array?o.push(h):o[c]=h:s=h,i.push(h),a++;else if(u===11||u===9)i.pop(),l=f=!(i[--a]instanceof Array);else if(u>16)u-=17,u=u>115?0-u+116:u+1,o instanceof Array?o.push(u):o[c]=u,l=!0;else if(u>0&&u<5)((u-1)/2|0)===0?(h=t.charCodeAt(n),n++):(h=(t.charCodeAt(n)<<16)+t.charCodeAt(n+1),n+=2),h=u%2?h+1:0-h,o instanceof Array?o.push(h):o[c]=h,l=!0;else if(u>12&&u<17)((u-13)/2|0)===0?(p=t.charCodeAt(n),p>127?(h=0,p-=128,n++):(h=t.charCodeAt(n+1),n+=2)):(h=(t.charCodeAt(n)<<16)+t.charCodeAt(n+1),p=t.charCodeAt(n+2),n+=3),h=u%2?h+p*.01:0-(h+p*.01),o instanceof Array?o.push(h):o[c]=h,l=!0;else if(u>4&&u<7)o instanceof Array?o.push(u===5):o[c]=u===5,l=!0;else if(u===0)o instanceof Array?o.push(null):o[c]=null,l=!0;else if(u===7){h=0;while(t.charCodeAt(n)===65535)h+=65535,n++;h+=t.charCodeAt(n++),o instanceof Array?o.push(t.substr(n,h)):o[c]=t.substr(n,h),n+=h,l=!0}}return s}var t=String.fromCharCode,n=new Array(65536);for(var r=0;r<65536;r++)n[r]=t(r);var i="";typeof window=="undefined"?(exports.encode=o,exports.decode=u):window.BISON={encode:o,decode:u}})();