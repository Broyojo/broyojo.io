/**
         * A* (A-Star) algorithm for a path finder
         * @author  Andrea Giammarchi
         * @license Mit Style License
         */

define([],function(){var e=function(){function e(e,t,n,r,i,s,o,u,a,f,l,c,h){return e&&(n&&!a[i][o]&&(c[h++]={x:o,y:i}),r&&!a[i][u]&&(c[h++]={x:u,y:i})),t&&(n&&!a[s][o]&&(c[h++]={x:o,y:s}),r&&!a[s][u]&&(c[h++]={x:u,y:s})),c}function t(e,t,n,r,i,s,o,u,a,f,l,c,h){return e=i>-1,t=s<f,n=o<l,r=u>-1,n&&(e&&!a[i][o]&&(c[h++]={x:o,y:i}),t&&!a[s][o]&&(c[h++]={x:o,y:s})),r&&(e&&!a[i][u]&&(c[h++]={x:u,y:i}),t&&!a[s][u]&&(c[h++]={x:u,y:s})),c}function n(e,t,n,r,i,s,o,u,a,f,l,c,h){return c}function r(e,t,n,r,i,s){var o=n-1,u=n+1,a=t+1,f=t-1,l=o>-1&&!r[o][t],c=u<i&&!r[u][t],h=a<s&&!r[n][a],p=f>-1&&!r[n][f],d=[],v=0;return l&&(d[v++]={x:t,y:o}),h&&(d[v++]={x:a,y:n}),c&&(d[v++]={x:t,y:u}),p&&(d[v++]={x:f,y:n}),e(l,c,h,p,o,u,a,f,r,i,s,d,v)}function i(e,t,n,r){return r(n(e.x-t.x),n(e.y-t.y))}function s(e,t,n,r){var i=e.x-t.x,s=e.y-t.y;return r(i*i+s*s)}function o(e,t,n,r){return n(e.x-t.x)+n(e.y-t.y)}function u(u,a,f,l){var c=u[0].length,h=u.length,p=c*h,d=Math.abs,v=Math.max,m={},g=[],y=[{x:a[0],y:a[1],f:0,g:0,v:a[0]+a[1]*c}],b=1,w,E,S,x,T,N,C,k,L;f={x:f[0],y:f[1],v:f[0]+f[1]*c};switch(l){case"Diagonal":S=e;case"DiagonalFree":E=i;break;case"Euclidean":S=e;case"EuclideanFree":v=Math.sqrt,E=s;break;default:E=o,S=n}S||(S=t);do{N=p,C=0;for(x=0;x<b;++x)(l=y[x].f)<N&&(N=l,C=x);k=y.splice(C,1)[0];if(k.v!=f.v){--b,L=r(S,k.x,k.y,u,h,c);for(x=0,T=L.length;x<T;++x)(w=L[x]).p=k,w.f=w.g=0,w.v=w.x+w.y*c,w.v in m||(w.f=(w.g=k.g+E(w,k,d,v))+E(w,f,d,v),y[b++]=w,m[w.v]=1)}else{x=b=0;do g[x++]=[k.x,k.y];while(k=k.p);g.reverse()}}while(b);return g}return u}();return e});