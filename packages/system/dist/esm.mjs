import{stat as t,writeFile as e,copyFile as r,rm as n,rename as i,symlink as s,unlink as o,readlink as c,mkdir as a,readdir as u,rmdir as l}from"fs/promises";import f,{constants as h,createReadStream as d,createWriteStream as y}from"fs";import m from"constants";import p from"stream";import w from"util";import S from"assert";import*as v from"path";import g from"path";import{ComparisonResult as E,BaseException as b,MethodUndefinedException as k,DateTime as _,Timezone as F}from"@chaperone/util";import{exec as O,fork as x,spawn as P}from"child_process";var D="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},N={},T={get exports(){return N},set exports(t){N=t}},C={},I={fromCallback:function(t){return Object.defineProperty((function(...e){if("function"!=typeof e[e.length-1])return new Promise(((r,n)=>{t.call(this,...e,((t,e)=>null!=t?n(t):r(e)))}));t.apply(this,e)}),"name",{value:t.name})},fromPromise:function(t){return Object.defineProperty((function(...e){const r=e[e.length-1];if("function"!=typeof r)return t.apply(this,e);t.apply(this,e.slice(0,-1)).then((t=>r(null,t)),r)}),"name",{value:t.name})}},L=m,R=process.cwd,M=null,z=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return M||(M=R.call(process)),M};try{process.cwd()}catch(t){}
// This check is needed until node.js 12 is required
if("function"==typeof process.chdir){var j=process.chdir;process.chdir=function(t){M=null,j.call(process,t)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,j)}var q=function(t){
// (re-)implement some things that are known busted or missing.
// lchmod, broken prior to 0.6.2
// back-port the fix here.
L.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&function(t){t.lchmod=function(e,r,n){t.open(e,L.O_WRONLY|L.O_SYMLINK,r,(function(e,i){e?n&&n(e):
// prefer to return the chmod error, if one occurs,
// but still try to close, and report closing errors if they occur.
t.fchmod(i,r,(function(e){t.close(i,(function(t){n&&n(e||t)}))}))}))},t.lchmodSync=function(e,r){var n,i=t.openSync(e,L.O_WRONLY|L.O_SYMLINK,r),s=!0;
// prefer to return the chmod error, if one occurs,
// but still try to close, and report closing errors if they occur.
try{n=t.fchmodSync(i,r),s=!1}finally{if(s)try{t.closeSync(i)}catch(t){}else t.closeSync(i)}return n}}(t);
// lutimes implementation, or no-op
t.lutimes||function(t){L.hasOwnProperty("O_SYMLINK")&&t.futimes?(t.lutimes=function(e,r,n,i){t.open(e,L.O_SYMLINK,(function(e,s){e?i&&i(e):t.futimes(s,r,n,(function(e){t.close(s,(function(t){i&&i(e||t)}))}))}))},t.lutimesSync=function(e,r,n){var i,s=t.openSync(e,L.O_SYMLINK),o=!0;try{i=t.futimesSync(s,r,n),o=!1}finally{if(o)try{t.closeSync(s)}catch(t){}else t.closeSync(s)}return i}):t.futimes&&(t.lutimes=function(t,e,r,n){n&&process.nextTick(n)},t.lutimesSync=function(){})}(t);
// https://github.com/isaacs/node-graceful-fs/issues/4
// Chown should not fail on einval or eperm if non-root.
// It should not fail on enosys ever, as this just indicates
// that a fs doesn't support the intended operation.
// if lchmod/lchown do not exist, then make them no-ops
t.chown=n(t.chown),t.fchown=n(t.fchown),t.lchown=n(t.lchown),t.chmod=e(t.chmod),t.fchmod=e(t.fchmod),t.lchmod=e(t.lchmod),t.chownSync=i(t.chownSync),t.fchownSync=i(t.fchownSync),t.lchownSync=i(t.lchownSync),t.chmodSync=r(t.chmodSync),t.fchmodSync=r(t.fchmodSync),t.lchmodSync=r(t.lchmodSync),t.stat=s(t.stat),t.fstat=s(t.fstat),t.lstat=s(t.lstat),t.statSync=o(t.statSync),t.fstatSync=o(t.fstatSync),t.lstatSync=o(t.lstatSync),t.chmod&&!t.lchmod&&(t.lchmod=function(t,e,r){r&&process.nextTick(r)},t.lchmodSync=function(){});t.chown&&!t.lchown&&(t.lchown=function(t,e,r,n){n&&process.nextTick(n)},t.lchownSync=function(){});
// on Windows, A/V software can lock the directory, causing this
// to fail with an EACCES or EPERM if the directory contains newly
// created files.  Try again on failure, for up to 60 seconds.
// Set the timeout this long because some Windows Anti-Virus, such as Parity
// bit9, may lock files for up to a minute, causing npm package install
// failures. Also, take care to yield the scheduler. Windows scheduling gives
// CPU to a busy looping process, which can cause the program causing the lock
// contention to be starved of CPU by node, so the contention doesn't resolve.
"win32"===z&&(t.rename="function"!=typeof t.rename?t.rename:function(e){function r(r,n,i){var s=Date.now(),o=0;e(r,n,(function c(a){if(a&&("EACCES"===a.code||"EPERM"===a.code)&&Date.now()-s<6e4)return setTimeout((function(){t.stat(n,(function(t,s){t&&"ENOENT"===t.code?e(r,n,c):i(a)}))}),o),void(o<100&&(o+=10));i&&i(a)}))}return Object.setPrototypeOf&&Object.setPrototypeOf(r,e),r}(t.rename));
// if read() returns EAGAIN, then just try it again.
function e(e){return e?function(r,n,i){return e.call(t,r,n,(function(t){c(t)&&(t=null),i&&i.apply(this,arguments)}))}:e}function r(e){return e?function(r,n){try{return e.call(t,r,n)}catch(t){if(!c(t))throw t}}:e}function n(e){return e?function(r,n,i,s){return e.call(t,r,n,i,(function(t){c(t)&&(t=null),s&&s.apply(this,arguments)}))}:e}function i(e){return e?function(r,n,i){try{return e.call(t,r,n,i)}catch(t){if(!c(t))throw t}}:e}function s(e){return e?function(r,n,i){function s(t,e){e&&(e.uid<0&&(e.uid+=4294967296),e.gid<0&&(e.gid+=4294967296)),i&&i.apply(this,arguments)}return"function"==typeof n&&(i=n,n=null),n?e.call(t,r,n,s):e.call(t,r,s)}:e;
// Older versions of Node erroneously returned signed integers for
// uid + gid.
}function o(e){return e?function(r,n){var i=n?e.call(t,r,n):e.call(t,r);return i&&(i.uid<0&&(i.uid+=4294967296),i.gid<0&&(i.gid+=4294967296)),i}:e;
// Older versions of Node erroneously returned signed integers for
// uid + gid.
}
// ENOSYS means that the fs doesn't support the op. Just ignore
// that, because it doesn't matter.

// if there's no getuid, or if getuid() is something other
// than 0, and the error is EINVAL or EPERM, then just ignore
// it.

// This specific case is a silent failure in cp, install, tar,
// and most other unix tools that manage permissions.

// When running as root, or if other types of errors are
// encountered, then it's strict.
function c(t){return!t||("ENOSYS"===t.code||!(process.getuid&&0===process.getuid()||"EINVAL"!==t.code&&"EPERM"!==t.code))}t.read="function"!=typeof t.read?t.read:function(e){function r(r,n,i,s,o,c){var a;if(c&&"function"==typeof c){var u=0;a=function(l,f,h){if(l&&"EAGAIN"===l.code&&u<10)return u++,e.call(t,r,n,i,s,o,a);c.apply(this,arguments)}}return e.call(t,r,n,i,s,o,a)}
// This ensures `util.promisify` works as it does for native `fs.read`.
return Object.setPrototypeOf&&Object.setPrototypeOf(r,e),r}(t.read),t.readSync="function"!=typeof t.readSync?t.readSync:(a=t.readSync,function(e,r,n,i,s){for(var o=0;;)try{return a.call(t,e,r,n,i,s)}catch(t){if("EAGAIN"===t.code&&o<10){o++;continue}throw t}});var a};var A=p.Stream,B=function(t){return{ReadStream:function e(r,n){if(!(this instanceof e))return new e(r,n);A.call(this);var i=this;this.path=r,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,/*=0666*/
this.bufferSize=65536,n=n||{};for(
// Mixin options into this
var s=Object.keys(n),o=0,c=s.length;o<c;o++){var a=s[o];this[a]=n[a]}this.encoding&&this.setEncoding(this.encoding);if(void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(void 0===this.end)this.end=1/0;else if("number"!=typeof this.end)throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}if(null!==this.fd)return void process.nextTick((function(){i._read()}));t.open(this.path,this.flags,this.mode,(function(t,e){if(t)return i.emit("error",t),void(i.readable=!1);i.fd=e,i.emit("open",e),i._read()}))},WriteStream:function e(r,n){if(!(this instanceof e))return new e(r,n);A.call(this),this.path=r,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,/*=0666*/
this.bytesWritten=0,n=n||{};for(
// Mixin options into this
var i=Object.keys(n),s=0,o=i.length;s<o;s++){var c=i[s];this[c]=n[c]}if(void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],null===this.fd&&(this._open=t.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}};var $=function(t){if(null===t||"object"!=typeof t)return t;if(t instanceof Object)var e={__proto__:J(t)};else e=Object.create(null);return Object.getOwnPropertyNames(t).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e},J=Object.getPrototypeOf||function(t){return t.__proto__};var W,Y,G=f,U=q,V=B,X=$,K=w;function H(t,e){Object.defineProperty(t,W,{get:function(){return e}})}
/* istanbul ignore else - node 0.x polyfill */
"function"==typeof Symbol&&"function"==typeof Symbol.for?(W=Symbol.for("graceful-fs.queue"),
// This is used in testing by future versions
Y=Symbol.for("graceful-fs.previous")):(W="___graceful-fs.queue",Y="___graceful-fs.previous");var Q=function(){};
// Once time initialization
if(K.debuglog?Q=K.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(Q=function(){var t=K.format.apply(K,arguments);t="GFS4: "+t.split(/\n/).join("\nGFS4: "),console.error(t)}),!G[W]){
// This queue can be shared by multiple loaded instances
var Z=D[W]||[];H(G,Z),
// Patch fs.close/closeSync to shared queue version, because we need
// to retry() whenever a close happens *anywhere* in the program.
// This is essential when multiple graceful-fs instances are
// in play at the same time.
G.close=function(t){function e(e,r){return t.call(G,e,(function(t){
// This function uses the graceful-fs shared queue
t||it(),"function"==typeof r&&r.apply(this,arguments)}))}return Object.defineProperty(e,Y,{value:t}),e}(G.close),G.closeSync=function(t){function e(e){
// This function uses the graceful-fs shared queue
t.apply(G,arguments),it()}return Object.defineProperty(e,Y,{value:t}),e}(G.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",(function(){Q(G[W]),S.equal(G[W].length,0)}))}D[W]||H(D,G[W]);var tt,et=rt(X(G));function rt(t){
// Everything that references the open() function needs to be in here
U(t),t.gracefulify=rt,t.createReadStream=function(e,r){return new t.ReadStream(e,r)},t.createWriteStream=function(e,r){return new t.WriteStream(e,r)};var e=t.readFile;t.readFile=function(t,r,n){"function"==typeof r&&(n=r,r=null);return function t(r,n,i,s){return e(r,n,(function(e){!e||"EMFILE"!==e.code&&"ENFILE"!==e.code?"function"==typeof i&&i.apply(this,arguments):nt([t,[r,n,i],e,s||Date.now(),Date.now()])}))}(t,r,n)};var r=t.writeFile;t.writeFile=function(t,e,n,i){"function"==typeof n&&(i=n,n=null);return function t(e,n,i,s,o){return r(e,n,i,(function(r){!r||"EMFILE"!==r.code&&"ENFILE"!==r.code?"function"==typeof s&&s.apply(this,arguments):nt([t,[e,n,i,s],r,o||Date.now(),Date.now()])}))}(t,e,n,i)};var n=t.appendFile;n&&(t.appendFile=function(t,e,r,i){"function"==typeof r&&(i=r,r=null);return function t(e,r,i,s,o){return n(e,r,i,(function(n){!n||"EMFILE"!==n.code&&"ENFILE"!==n.code?"function"==typeof s&&s.apply(this,arguments):nt([t,[e,r,i,s],n,o||Date.now(),Date.now()])}))}(t,e,r,i)});var i=t.copyFile;i&&(t.copyFile=function(t,e,r,n){"function"==typeof r&&(n=r,r=0);return function t(e,r,n,s,o){return i(e,r,n,(function(i){!i||"EMFILE"!==i.code&&"ENFILE"!==i.code?"function"==typeof s&&s.apply(this,arguments):nt([t,[e,r,n,s],i,o||Date.now(),Date.now()])}))}(t,e,r,n)});var s=t.readdir;t.readdir=function(t,e,r){"function"==typeof e&&(r=e,e=null);var n=o.test(process.version)?function(t,e,r,n){return s(t,i(t,e,r,n))}:function(t,e,r,n){return s(t,e,i(t,e,r,n))};return n(t,e,r);function i(t,e,r,i){return function(s,o){!s||"EMFILE"!==s.code&&"ENFILE"!==s.code?(o&&o.sort&&o.sort(),"function"==typeof r&&r.call(this,s,o)):nt([n,[t,e,r],s,i||Date.now(),Date.now()])}}};var o=/^v[0-5]\./;if("v0.8"===process.version.substr(0,4)){var c=V(t);h=c.ReadStream,d=c.WriteStream}var a=t.ReadStream;a&&(h.prototype=Object.create(a.prototype),h.prototype.open=function(){var t=this;m(t.path,t.flags,t.mode,(function(e,r){e?(t.autoClose&&t.destroy(),t.emit("error",e)):(t.fd=r,t.emit("open",r),t.read())}))});var u=t.WriteStream;u&&(d.prototype=Object.create(u.prototype),d.prototype.open=function(){var t=this;m(t.path,t.flags,t.mode,(function(e,r){e?(t.destroy(),t.emit("error",e)):(t.fd=r,t.emit("open",r))}))}),Object.defineProperty(t,"ReadStream",{get:function(){return h},set:function(t){h=t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"WriteStream",{get:function(){return d},set:function(t){d=t},enumerable:!0,configurable:!0});
// legacy names
var l=h;Object.defineProperty(t,"FileReadStream",{get:function(){return l},set:function(t){l=t},enumerable:!0,configurable:!0});var f=d;function h(t,e){return this instanceof h?(a.apply(this,arguments),this):h.apply(Object.create(h.prototype),arguments)}function d(t,e){return this instanceof d?(u.apply(this,arguments),this):d.apply(Object.create(d.prototype),arguments)}Object.defineProperty(t,"FileWriteStream",{get:function(){return f},set:function(t){f=t},enumerable:!0,configurable:!0});var y=t.open;function m(t,e,r,n){return"function"==typeof r&&(n=r,r=null),function t(e,r,n,i,s){return y(e,r,n,(function(o,c){!o||"EMFILE"!==o.code&&"ENFILE"!==o.code?"function"==typeof i&&i.apply(this,arguments):nt([t,[e,r,n,i],o,s||Date.now(),Date.now()])}))}(t,e,r,n)}return t.open=m,t}function nt(t){Q("ENQUEUE",t[0].name,t[1]),G[W].push(t),st()}
// keep track of the timeout between retry() calls
// reset the startTime and lastTime to now
// this resets the start of the 60 second overall timeout as well as the
// delay between attempts so that we'll retry these jobs sooner
function it(){for(var t=Date.now(),e=0;e<G[W].length;++e)
// entries that are only a length of 2 are from an older version, don't
// bother modifying those since they'll be retried anyway.
G[W][e].length>2&&(G[W][e][3]=t,// startTime
G[W][e][4]=t);
// call retry to make sure we're actively processing the queue
st()}function st(){if(
// clear the timer and remove it to help prevent unintended concurrency
clearTimeout(tt),tt=void 0,0!==G[W].length){var t=G[W].shift(),e=t[0],r=t[1],n=t[2],i=t[3],s=t[4];
// if we don't have a startTime we have no way of knowing if we've waited
// long enough, so go ahead and retry this item now
if(void 0===i)Q("RETRY",e.name,r),e.apply(null,r);else if(Date.now()-i>=6e4){
// it's been more than 60 seconds total, bail now
Q("TIMEOUT",e.name,r);var o=r.pop();"function"==typeof o&&o.call(null,n)}else{
// the amount of time between the last attempt and right now
var c=Date.now()-s,a=Math.max(s-i,1);
// the amount of time between when we first tried, and when we last tried
// rounded up to at least 1
// it's been long enough since the last retry, do it again
c>=Math.min(1.2*a,100)?(Q("RETRY",e.name,r),e.apply(null,r.concat([i]))):
// if we can't do this job yet, push it to the end of the queue
// and let the next iteration check again
G[W].push(t)}
// schedule our next run if one isn't already scheduled
void 0===tt&&(tt=setTimeout(st,0))}}process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!G.__patched&&(et=rt(G),G.__patched=!0),function(t){
// This is adapted from https://github.com/normalize/mz
// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
const e=I.fromCallback,r=et,n=["access","appendFile","chmod","chown","close","copyFile","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","lchmod","lchown","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","symlink","truncate","unlink","utimes","writeFile"].filter((t=>"function"==typeof r[t]));
// Export all keys:
Object.keys(r).forEach((e=>{"promises"!==e&&(t[e]=r[e])})),
// Universalify async methods:
n.forEach((n=>{t[n]=e(r[n])})),
// We differ from mz/fs in that we still ship the old, broken, fs.exists()
// since we are a drop-in replacement for the native module
t.exists=function(t,e){return"function"==typeof e?r.exists(t,e):new Promise((e=>r.exists(t,e)))},
// fs.read(), fs.write(), & fs.writev() need special treatment due to multiple callback args
t.read=function(t,e,n,i,s,o){return"function"==typeof o?r.read(t,e,n,i,s,o):new Promise(((o,c)=>{r.read(t,e,n,i,s,((t,e,r)=>{if(t)return c(t);o({bytesRead:e,buffer:r})}))}))},
// Function signature can be
// fs.write(fd, buffer[, offset[, length[, position]]], callback)
// OR
// fs.write(fd, string[, position[, encoding]], callback)
// We need to handle both cases, so we use ...args
t.write=function(t,e,...n){return"function"==typeof n[n.length-1]?r.write(t,e,...n):new Promise(((i,s)=>{r.write(t,e,...n,((t,e,r)=>{if(t)return s(t);i({bytesWritten:e,buffer:r})}))}))},
// fs.writev only available in Node v12.9.0+
"function"==typeof r.writev&&(
// Function signature is
// s.writev(fd, buffers[, position], callback)
// We need to handle the optional arg, so we use ...args
t.writev=function(t,e,...n){return"function"==typeof n[n.length-1]?r.writev(t,e,...n):new Promise(((i,s)=>{r.writev(t,e,...n,((t,e,r)=>{if(t)return s(t);i({bytesWritten:e,buffers:r})}))}))}),
// fs.realpath.native only available in Node v9.2+
"function"==typeof r.realpath.native&&(t.realpath.native=e(r.realpath.native))}(C);var ot={},ct=t=>{const e=process.versions.node.split(".").map((t=>parseInt(t,10)));return t=t.split(".").map((t=>parseInt(t,10))),e[0]>t[0]||e[0]===t[0]&&(e[1]>t[1]||e[1]===t[1]&&e[2]>=t[2])};const at=C,ut=g,lt=ct("10.12.0"),ft=t=>{if("win32"===process.platform){if(/[<>:"|?*]/.test(t.replace(ut.parse(t).root,""))){const e=new Error(`Path contains invalid characters: ${t}`);throw e.code="EINVAL",e}}},ht=t=>("number"==typeof t&&(t={mode:t}),{mode:511,...t}),dt=t=>{
// This replicates the exception of `fs.mkdir` with native the
// `recusive` option when run on an invalid drive under Windows.
const e=new Error(`operation not permitted, mkdir '${t}'`);return e.code="EPERM",e.errno=-4048,e.path=t,e.syscall="mkdir",e};ot.makeDir=async(t,e)=>{if(ft(t),e=ht(e),lt){const r=ut.resolve(t);return at.mkdir(r,{mode:e.mode,recursive:!0})}const r=async t=>{try{await at.mkdir(t,e.mode)}catch(e){if("EPERM"===e.code)throw e;if("ENOENT"===e.code){if(ut.dirname(t)===t)throw dt(t);if(e.message.includes("null bytes"))throw e;return await r(ut.dirname(t)),r(t)}try{if(!(await at.stat(t)).isDirectory())
// This error is never exposed to the user
// it is caught below, and the original error is thrown
throw new Error("The path is not a directory")}catch{throw e}}};return r(ut.resolve(t))},ot.makeDirSync=(t,e)=>{if(ft(t),e=ht(e),lt){const r=ut.resolve(t);return at.mkdirSync(r,{mode:e.mode,recursive:!0})}const r=t=>{try{at.mkdirSync(t,e.mode)}catch(e){if("EPERM"===e.code)throw e;if("ENOENT"===e.code){if(ut.dirname(t)===t)throw dt(t);if(e.message.includes("null bytes"))throw e;return r(ut.dirname(t)),r(t)}try{if(!at.statSync(t).isDirectory())
// This error is never exposed to the user
// it is caught below, and the original error is thrown
throw new Error("The path is not a directory")}catch{throw e}}};return r(ut.resolve(t))};const yt=I.fromPromise,{makeDir:mt,makeDirSync:pt}=ot,wt=yt(mt);var St={mkdirs:wt,mkdirsSync:pt,
// alias
mkdirp:wt,mkdirpSync:pt,ensureDir:wt,ensureDirSync:pt};const vt=et;var gt=function(t,e,r,n){
// if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
vt.open(t,"r+",((t,i)=>{if(t)return n(t);vt.futimes(i,e,r,(t=>{vt.close(i,(e=>{n&&n(t||e)}))}))}))},Et=function(t,e,r){const n=vt.openSync(t,"r+");return vt.futimesSync(n,e,r),vt.closeSync(n)};const bt=C,kt=g,_t=w,Ft=ct("10.5.0"),Ot=t=>Ft?bt.stat(t,{bigint:!0}):bt.stat(t),xt=t=>Ft?bt.statSync(t,{bigint:!0}):bt.statSync(t);function Pt(t,e){return Promise.all([Ot(t),Ot(e).catch((t=>{if("ENOENT"===t.code)return null;throw t}))]).then((([t,e])=>({srcStat:t,destStat:e})))}function Dt(t,e){if(e.ino&&e.dev&&e.ino===t.ino&&e.dev===t.dev){if(Ft||e.ino<Number.MAX_SAFE_INTEGER)
// definitive answer
return!0;
// Use additional heuristics if we can't use 'bigint'.
// Different 'ino' could be represented the same if they are >= Number.MAX_SAFE_INTEGER
// See issue 657
if(e.size===t.size&&e.mode===t.mode&&e.nlink===t.nlink&&e.atimeMs===t.atimeMs&&e.mtimeMs===t.mtimeMs&&e.ctimeMs===t.ctimeMs&&e.birthtimeMs===t.birthtimeMs)
// heuristic answer
return!0}return!1}
// return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.
function Nt(t,e){const r=kt.resolve(t).split(kt.sep).filter((t=>t)),n=kt.resolve(e).split(kt.sep).filter((t=>t));return r.reduce(((t,e,r)=>t&&n[r]===e),!0)}function Tt(t,e,r){return`Cannot ${r} '${t}' to a subdirectory of itself, '${e}'.`}var Ct={checkPaths:function(t,e,r,n){_t.callbackify(Pt)(t,e,((i,s)=>{if(i)return n(i);const{srcStat:o,destStat:c}=s;return c&&Dt(o,c)?n(new Error("Source and destination must not be the same.")):o.isDirectory()&&Nt(t,e)?n(new Error(Tt(t,e,r))):n(null,{srcStat:o,destStat:c})}))},checkPathsSync:function(t,e,r){const{srcStat:n,destStat:i}=function(t,e){let r;const n=xt(t);try{r=xt(e)}catch(t){if("ENOENT"===t.code)return{srcStat:n,destStat:null};throw t}return{srcStat:n,destStat:r}}(t,e);if(i&&Dt(n,i))throw new Error("Source and destination must not be the same.");if(n.isDirectory()&&Nt(t,e))throw new Error(Tt(t,e,r));return{srcStat:n,destStat:i}}
// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
,checkParentPaths:function t(e,r,n,i,s){const o=kt.resolve(kt.dirname(e)),c=kt.resolve(kt.dirname(n));if(c===o||c===kt.parse(c).root)return s();const a=(o,a)=>o?"ENOENT"===o.code?s():s(o):Dt(r,a)?s(new Error(Tt(e,n,i))):t(e,r,c,i,s);Ft?bt.stat(c,{bigint:!0},a):bt.stat(c,a)},checkParentPathsSync:function t(e,r,n,i){const s=kt.resolve(kt.dirname(e)),o=kt.resolve(kt.dirname(n));if(o===s||o===kt.parse(o).root)return;let c;try{c=xt(o)}catch(t){if("ENOENT"===t.code)return;throw t}if(Dt(r,c))throw new Error(Tt(e,n,i));return t(e,r,o,i)},isSrcSubdir:Nt};const It=et,Lt=g,Rt=St.mkdirsSync,Mt=Et,zt=Ct;function jt(t,e,r,n){if(!n.filter||n.filter(e,r))return function(t,e,r,n){const i=n.dereference?It.statSync:It.lstatSync,s=i(e);if(s.isDirectory())return function(t,e,r,n,i){if(!e)return function(t,e,r,n){return It.mkdirSync(r),Bt(e,r,n),At(r,t)}(t.mode,r,n,i);if(e&&!e.isDirectory())throw new Error(`Cannot overwrite non-directory '${n}' with directory '${r}'.`);return Bt(r,n,i)}(s,t,e,r,n);if(s.isFile()||s.isCharacterDevice()||s.isBlockDevice())return function(t,e,r,n,i){return e?function(t,e,r,n){if(n.overwrite)return It.unlinkSync(r),qt(t,e,r,n);if(n.errorOnExist)throw new Error(`'${r}' already exists`)}(t,r,n,i):qt(t,r,n,i)}(s,t,e,r,n);if(s.isSymbolicLink())return function(t,e,r,n){let i=It.readlinkSync(e);n.dereference&&(i=Lt.resolve(process.cwd(),i));if(t){let t;try{t=It.readlinkSync(r)}catch(t){
// dest exists and is a regular file or directory,
// Windows may throw UNKNOWN error. If dest already exists,
// fs throws error anyway, so no need to guard against it here.
if("EINVAL"===t.code||"UNKNOWN"===t.code)return It.symlinkSync(i,r);throw t}if(n.dereference&&(t=Lt.resolve(process.cwd(),t)),zt.isSrcSubdir(i,t))throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${t}'.`);
// prevent copy if src is a subdir of dest since unlinking
// dest in this case would result in removing src contents
// and therefore a broken symlink would be created.
if(It.statSync(r).isDirectory()&&zt.isSrcSubdir(t,i))throw new Error(`Cannot overwrite '${t}' with '${i}'.`);return function(t,e){return It.unlinkSync(e),It.symlinkSync(t,e)}(i,r)}return It.symlinkSync(i,r)}(t,e,r,n)}(t,e,r,n)}function qt(t,e,r,n){return It.copyFileSync(e,r),n.preserveTimestamps&&function(t,e,r){
// Make sure the file is writable before setting the timestamp
// otherwise open fails with EPERM when invoked with 'r+'
// (through utimes call)
(function(t){return 0==(128&t)})(t)&&function(t,e){At(t,128|e)}(r,t);(function(t,e){
// The initial srcStat.atime cannot be trusted
// because it is modified by the read(2) system call
// (See https://nodejs.org/api/fs.html#fs_stat_time_values)
const r=It.statSync(t);Mt(e,r.atime,r.mtime)})(e,r)}(t.mode,e,r),At(r,t.mode)}function At(t,e){return It.chmodSync(t,e)}function Bt(t,e,r){It.readdirSync(t).forEach((n=>function(t,e,r,n){const i=Lt.join(e,t),s=Lt.join(r,t),{destStat:o}=zt.checkPathsSync(i,s,"copy");return jt(o,i,s,n)}(n,t,e,r)))}var $t={copySync:function(t,e,r){"function"==typeof r&&(r={filter:r}),(r=r||{}).clobber=!("clobber"in r)||!!r.clobber,// default to true for now
r.overwrite="overwrite"in r?!!r.overwrite:r.clobber,// overwrite falls back to clobber
// Warn about using preserveTimestamps on 32-bit node
r.preserveTimestamps&&"ia32"===process.arch&&console.warn("fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269");const{srcStat:n,destStat:i}=zt.checkPathsSync(t,e,"copy");return zt.checkParentPathsSync(t,n,e,"copy"),function(t,e,r,n){if(n.filter&&!n.filter(e,r))return;const i=Lt.dirname(r);It.existsSync(i)||Rt(i);return jt(t,e,r,n)}(i,t,e,r)}};const Jt=I.fromPromise,Wt=C;var Yt={pathExists:Jt((function(t){return Wt.access(t).then((()=>!0)).catch((()=>!1))})),pathExistsSync:Wt.existsSync};const Gt=et,Ut=g,Vt=St.mkdirs,Xt=Yt.pathExists,Kt=gt,Ht=Ct;function Qt(t,e,r,n,i){const s=Ut.dirname(r);Xt(s,((o,c)=>o?i(o):c?te(t,e,r,n,i):void Vt(s,(s=>s?i(s):te(t,e,r,n,i)))))}function Zt(t,e,r,n,i,s){Promise.resolve(i.filter(r,n)).then((o=>o?t(e,r,n,i,s):s()),(t=>s(t)))}function te(t,e,r,n,i){return n.filter?Zt(ee,t,e,r,n,i):ee(t,e,r,n,i)}function ee(t,e,r,n,i){(n.dereference?Gt.stat:Gt.lstat)(e,((s,o)=>s?i(s):o.isDirectory()?function(t,e,r,n,i,s){if(!e)return function(t,e,r,n,i){Gt.mkdir(r,(s=>{if(s)return i(s);se(e,r,n,(e=>e?i(e):ie(r,t,i)))}))}(t.mode,r,n,i,s);if(e&&!e.isDirectory())return s(new Error(`Cannot overwrite non-directory '${n}' with directory '${r}'.`));return se(r,n,i,s)}(o,t,e,r,n,i):o.isFile()||o.isCharacterDevice()||o.isBlockDevice()?function(t,e,r,n,i,s){return e?function(t,e,r,n,i){if(!n.overwrite)return n.errorOnExist?i(new Error(`'${r}' already exists`)):i();Gt.unlink(r,(s=>s?i(s):re(t,e,r,n,i)))}(t,r,n,i,s):re(t,r,n,i,s)}(o,t,e,r,n,i):o.isSymbolicLink()?function(t,e,r,n,i){Gt.readlink(e,((e,s)=>e?i(e):(n.dereference&&(s=Ut.resolve(process.cwd(),s)),t?void Gt.readlink(r,((e,o)=>e?
// dest exists and is a regular file or directory,
// Windows may throw UNKNOWN error. If dest already exists,
// fs throws error anyway, so no need to guard against it here.
"EINVAL"===e.code||"UNKNOWN"===e.code?Gt.symlink(s,r,i):i(e):(n.dereference&&(o=Ut.resolve(process.cwd(),o)),Ht.isSrcSubdir(s,o)?i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${o}'.`)):
// do not copy if src is a subdir of dest since unlinking
// dest in this case would result in removing src contents
// and therefore a broken symlink would be created.
t.isDirectory()&&Ht.isSrcSubdir(o,s)?i(new Error(`Cannot overwrite '${o}' with '${s}'.`)):function(t,e,r){Gt.unlink(e,(n=>n?r(n):Gt.symlink(t,e,r)))}(s,r,i)))):Gt.symlink(s,r,i))))}(t,e,r,n,i):void 0))}function re(t,e,r,n,i){Gt.copyFile(e,r,(s=>s?i(s):n.preserveTimestamps?function(t,e,r,n){
// Make sure the file is writable before setting the timestamp
// otherwise open fails with EPERM when invoked with 'r+'
// (through utimes call)
if(function(t){return 0==(128&t)}(t))return function(t,e,r){return ie(t,128|e,r)}(r,t,(i=>i?n(i):ne(t,e,r,n)));return ne(t,e,r,n)}(t.mode,e,r,i):ie(r,t.mode,i)))}function ne(t,e,r,n){!function(t,e,r){
// The initial srcStat.atime cannot be trusted
// because it is modified by the read(2) system call
// (See https://nodejs.org/api/fs.html#fs_stat_time_values)
Gt.stat(t,((t,n)=>t?r(t):Kt(e,n.atime,n.mtime,r)))}(e,r,(e=>e?n(e):ie(r,t,n)))}function ie(t,e,r){return Gt.chmod(t,e,r)}function se(t,e,r,n){Gt.readdir(t,((i,s)=>i?n(i):oe(s,t,e,r,n)))}function oe(t,e,r,n,i){const s=t.pop();return s?function(t,e,r,n,i,s){const o=Ut.join(r,e),c=Ut.join(n,e);Ht.checkPaths(o,c,"copy",((e,a)=>{if(e)return s(e);const{destStat:u}=a;te(u,o,c,i,(e=>e?s(e):oe(t,r,n,i,s)))}))}(t,s,e,r,n,i):i()}var ce=function(t,e,r,n){"function"!=typeof r||n?"function"==typeof r&&(r={filter:r}):(n=r,r={}),n=n||function(){},(r=r||{}).clobber=!("clobber"in r)||!!r.clobber,// default to true for now
r.overwrite="overwrite"in r?!!r.overwrite:r.clobber,// overwrite falls back to clobber
// Warn about using preserveTimestamps on 32-bit node
r.preserveTimestamps&&"ia32"===process.arch&&console.warn("fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269"),Ht.checkPaths(t,e,"copy",((i,s)=>{if(i)return n(i);const{srcStat:o,destStat:c}=s;Ht.checkParentPaths(t,o,e,"copy",(i=>i?n(i):r.filter?Zt(Qt,c,t,e,r,n):Qt(c,t,e,r,n)))}))};var ae={copy:(0,I.fromCallback)(ce)};const ue=et,le=g,fe=S,he="win32"===process.platform;function de(t){["unlink","chmod","stat","lstat","rmdir","readdir"].forEach((e=>{t[e]=t[e]||ue[e],t[e+="Sync"]=t[e]||ue[e]})),t.maxBusyTries=t.maxBusyTries||3}function ye(t,e,r){let n=0;"function"==typeof e&&(r=e,e={}),fe(t,"rimraf: missing path"),fe.strictEqual(typeof t,"string","rimraf: path should be a string"),fe.strictEqual(typeof r,"function","rimraf: callback function required"),fe(e,"rimraf: invalid options argument provided"),fe.strictEqual(typeof e,"object","rimraf: options should be object"),de(e),me(t,e,(function i(s){if(s){if(("EBUSY"===s.code||"ENOTEMPTY"===s.code||"EPERM"===s.code)&&n<e.maxBusyTries){n++;
// try again, with the same exact callback as this one.
return setTimeout((()=>me(t,e,i)),100*n)}
// already gone
"ENOENT"===s.code&&(s=null)}r(s)}))}
// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR

// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.

// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function me(t,e,r){fe(t),fe(e),fe("function"==typeof r),
// sunos lets the root user unlink directories, which is... weird.
// so we have to lstat here and make sure it's not a dir.
e.lstat(t,((n,i)=>n&&"ENOENT"===n.code?r(null):
// Windows can EPERM on stat.  Life is suffering.
n&&"EPERM"===n.code&&he?pe(t,e,n,r):i&&i.isDirectory()?Se(t,e,n,r):void e.unlink(t,(n=>{if(n){if("ENOENT"===n.code)return r(null);if("EPERM"===n.code)return he?pe(t,e,n,r):Se(t,e,n,r);if("EISDIR"===n.code)return Se(t,e,n,r)}return r(n)}))))}function pe(t,e,r,n){fe(t),fe(e),fe("function"==typeof n),e.chmod(t,438,(i=>{i?n("ENOENT"===i.code?null:r):e.stat(t,((i,s)=>{i?n("ENOENT"===i.code?null:r):s.isDirectory()?Se(t,e,r,n):e.unlink(t,n)}))}))}function we(t,e,r){let n;fe(t),fe(e);try{e.chmodSync(t,438)}catch(t){if("ENOENT"===t.code)return;throw r}try{n=e.statSync(t)}catch(t){if("ENOENT"===t.code)return;throw r}n.isDirectory()?ge(t,e,r):e.unlinkSync(t)}function Se(t,e,r,n){fe(t),fe(e),fe("function"==typeof n),
// try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
// if we guessed wrong, and it's not a directory, then
// raise the original error.
e.rmdir(t,(i=>{!i||"ENOTEMPTY"!==i.code&&"EEXIST"!==i.code&&"EPERM"!==i.code?i&&"ENOTDIR"===i.code?n(r):n(i):function(t,e,r){fe(t),fe(e),fe("function"==typeof r),e.readdir(t,((n,i)=>{if(n)return r(n);let s,o=i.length;if(0===o)return e.rmdir(t,r);i.forEach((n=>{ye(le.join(t,n),e,(n=>{if(!s)return n?r(s=n):void(0==--o&&e.rmdir(t,r))}))}))}))}
// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
(t,e,n)}))}function ve(t,e){let r;de(e=e||{}),fe(t,"rimraf: missing path"),fe.strictEqual(typeof t,"string","rimraf: path should be a string"),fe(e,"rimraf: missing options"),fe.strictEqual(typeof e,"object","rimraf: options should be object");try{r=e.lstatSync(t)}catch(r){if("ENOENT"===r.code)return;
// Windows can EPERM on stat.  Life is suffering.
"EPERM"===r.code&&he&&we(t,e,r)}try{
// sunos lets the root user unlink directories, which is... weird.
r&&r.isDirectory()?ge(t,e,null):e.unlinkSync(t)}catch(r){if("ENOENT"===r.code)return;if("EPERM"===r.code)return he?we(t,e,r):ge(t,e,r);if("EISDIR"!==r.code)throw r;ge(t,e,r)}}function ge(t,e,r){fe(t),fe(e);try{e.rmdirSync(t)}catch(n){if("ENOTDIR"===n.code)throw r;if("ENOTEMPTY"===n.code||"EEXIST"===n.code||"EPERM"===n.code)!function(t,e){if(fe(t),fe(e),e.readdirSync(t).forEach((r=>ve(le.join(t,r),e))),!he){return e.rmdirSync(t,e)}{
// We only end up here once we got ENOTEMPTY at least once, and
// at this point, we are guaranteed to have removed all the kids.
// So, we know that it won't be ENOENT or ENOTDIR or anything else.
// try really hard to delete stuff on windows, because it has a
// PROFOUNDLY annoying habit of not closing handles promptly when
// files are deleted, resulting in spurious ENOTEMPTY errors.
const r=Date.now();do{try{return e.rmdirSync(t,e)}catch{}}while(Date.now()-r<500);// give up after 500ms
}}(t,e);else if("ENOENT"!==n.code)throw n}}var Ee=ye;ye.sync=ve;const be=Ee;var ke={remove:(0,I.fromCallback)(be),removeSync:be.sync};const _e=I.fromCallback,Fe=et,Oe=g,xe=St,Pe=ke,De=_e((function(t,e){e=e||function(){},Fe.readdir(t,((r,n)=>{if(r)return xe.mkdirs(t,e);n=n.map((e=>Oe.join(t,e))),function t(){const r=n.pop();if(!r)return e();Pe.remove(r,(r=>{if(r)return e(r);t()}))}()}))}));function Ne(t){let e;try{e=Fe.readdirSync(t)}catch{return xe.mkdirsSync(t)}e.forEach((e=>{e=Oe.join(t,e),Pe.removeSync(e)}))}var Te={emptyDirSync:Ne,emptydirSync:Ne,emptyDir:De,emptydir:De};const Ce=I.fromCallback,Ie=g,Le=et,Re=St;var Me={createFile:Ce((function(t,e){function r(){Le.writeFile(t,"",(t=>{if(t)return e(t);e()}))}Le.stat(t,((n,i)=>{// eslint-disable-line handle-callback-err
if(!n&&i.isFile())return e();const s=Ie.dirname(t);Le.stat(s,((t,n)=>{if(t)
// if the directory doesn't exist, make it
return"ENOENT"===t.code?Re.mkdirs(s,(t=>{if(t)return e(t);r()})):e(t);n.isDirectory()?r():
// parent is not a directory
// This is just to cause an internal ENOTDIR error to be thrown
Le.readdir(s,(t=>{if(t)return e(t)}))}))}))})),createFileSync:function(t){let e;try{e=Le.statSync(t)}catch{}if(e&&e.isFile())return;const r=Ie.dirname(t);try{Le.statSync(r).isDirectory()||
// parent is not a directory
// This is just to cause an internal ENOTDIR error to be thrown
Le.readdirSync(r)}catch(t){
// If the stat call above failed because the directory doesn't exist, create it
if(!t||"ENOENT"!==t.code)throw t;Re.mkdirsSync(r)}Le.writeFileSync(t,"")}};const ze=I.fromCallback,je=g,qe=et,Ae=St,Be=Yt.pathExists;var $e={createLink:ze((function(t,e,r){function n(t,e){qe.link(t,e,(t=>{if(t)return r(t);r(null)}))}Be(e,((i,s)=>i?r(i):s?r(null):void qe.lstat(t,(i=>{if(i)return i.message=i.message.replace("lstat","ensureLink"),r(i);const s=je.dirname(e);Be(s,((i,o)=>i?r(i):o?n(t,e):void Ae.mkdirs(s,(i=>{if(i)return r(i);n(t,e)}))))}))))})),createLinkSync:function(t,e){if(qe.existsSync(e))return;try{qe.lstatSync(t)}catch(t){throw t.message=t.message.replace("lstat","ensureLink"),t}const r=je.dirname(e);return qe.existsSync(r)||Ae.mkdirsSync(r),qe.linkSync(t,e)}};const Je=g,We=et,Ye=Yt.pathExists;var Ge={symlinkPaths:
/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */
function(t,e,r){if(Je.isAbsolute(t))return We.lstat(t,(e=>e?(e.message=e.message.replace("lstat","ensureSymlink"),r(e)):r(null,{toCwd:t,toDst:t})));{const n=Je.dirname(e),i=Je.join(n,t);return Ye(i,((e,s)=>e?r(e):s?r(null,{toCwd:i,toDst:t}):We.lstat(t,(e=>e?(e.message=e.message.replace("lstat","ensureSymlink"),r(e)):r(null,{toCwd:t,toDst:Je.relative(n,t)})))))}},symlinkPathsSync:function(t,e){let r;if(Je.isAbsolute(t)){if(r=We.existsSync(t),!r)throw new Error("absolute srcpath does not exist");return{toCwd:t,toDst:t}}{const n=Je.dirname(e),i=Je.join(n,t);if(r=We.existsSync(i),r)return{toCwd:i,toDst:t};if(r=We.existsSync(t),!r)throw new Error("relative srcpath does not exist");return{toCwd:t,toDst:Je.relative(n,t)}}}};const Ue=et;var Ve={symlinkType:function(t,e,r){if(r="function"==typeof e?e:r,e="function"!=typeof e&&e)return r(null,e);Ue.lstat(t,((t,n)=>{if(t)return r(null,"file");e=n&&n.isDirectory()?"dir":"file",r(null,e)}))},symlinkTypeSync:function(t,e){let r;if(e)return e;try{r=Ue.lstatSync(t)}catch{return"file"}return r&&r.isDirectory()?"dir":"file"}};const Xe=I.fromCallback,Ke=g,He=et,Qe=St.mkdirs,Ze=St.mkdirsSync,tr=Ge.symlinkPaths,er=Ge.symlinkPathsSync,rr=Ve.symlinkType,nr=Ve.symlinkTypeSync,ir=Yt.pathExists;var sr={createSymlink:Xe((function(t,e,r,n){n="function"==typeof r?r:n,r="function"!=typeof r&&r,ir(e,((i,s)=>i?n(i):s?n(null):void tr(t,e,((i,s)=>{if(i)return n(i);t=s.toDst,rr(s.toCwd,r,((r,i)=>{if(r)return n(r);const s=Ke.dirname(e);ir(s,((r,o)=>r?n(r):o?He.symlink(t,e,i,n):void Qe(s,(r=>{if(r)return n(r);He.symlink(t,e,i,n)}))))}))}))))})),createSymlinkSync:function(t,e,r){if(He.existsSync(e))return;const n=er(t,e);t=n.toDst,r=nr(n.toCwd,r);const i=Ke.dirname(e);return He.existsSync(i)||Ze(i),He.symlinkSync(t,e,r)}};var or={
// file
createFile:Me.createFile,createFileSync:Me.createFileSync,ensureFile:Me.createFile,ensureFileSync:Me.createFileSync,
// link
createLink:$e.createLink,createLinkSync:$e.createLinkSync,ensureLink:$e.createLink,ensureLinkSync:$e.createLinkSync,
// symlink
createSymlink:sr.createSymlink,createSymlinkSync:sr.createSymlinkSync,ensureSymlink:sr.createSymlink,ensureSymlinkSync:sr.createSymlinkSync};var cr={stringify:function(t,{EOL:e="\n",finalEOL:r=!0,replacer:n=null,spaces:i}={}){const s=r?e:"";return JSON.stringify(t,n,i).replace(/\n/g,e)+s},stripBom:function(t){
// we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
return Buffer.isBuffer(t)&&(t=t.toString("utf8")),t.replace(/^\uFEFF/,"")}};let ar;try{ar=et}catch(t){ar=f}const ur=I,{stringify:lr,stripBom:fr}=cr;const hr=ur.fromPromise((async function(t,e={}){"string"==typeof e&&(e={encoding:e});const r=e.fs||ar,n=!("throws"in e)||e.throws;let i,s=await ur.fromCallback(r.readFile)(t,e);s=fr(s);try{i=JSON.parse(s,e?e.reviver:null)}catch(e){if(n)throw e.message=`${t}: ${e.message}`,e;return null}return i}));const dr=ur.fromPromise((async function(t,e,r={}){const n=r.fs||ar,i=lr(e,r);await ur.fromCallback(n.writeFile)(t,i,r)}));const yr={readFile:hr,readFileSync:function(t,e={}){"string"==typeof e&&(e={encoding:e});const r=e.fs||ar,n=!("throws"in e)||e.throws;try{let n=r.readFileSync(t,e);return n=fr(n),JSON.parse(n,e.reviver)}catch(e){if(n)throw e.message=`${t}: ${e.message}`,e;return null}},writeFile:dr,writeFileSync:function(t,e,r={}){const n=r.fs||ar,i=lr(e,r);
// not sure if fs.writeFileSync returns anything, but just in case
return n.writeFileSync(t,i,r)}};var mr={
// jsonfile exports
readJson:yr.readFile,readJsonSync:yr.readFileSync,writeJson:yr.writeFile,writeJsonSync:yr.writeFileSync};const pr=I.fromCallback,wr=et,Sr=g,vr=St,gr=Yt.pathExists;var Er={outputFile:pr((function(t,e,r,n){"function"==typeof r&&(n=r,r="utf8");const i=Sr.dirname(t);gr(i,((s,o)=>s?n(s):o?wr.writeFile(t,e,r,n):void vr.mkdirs(i,(i=>{if(i)return n(i);wr.writeFile(t,e,r,n)}))))})),outputFileSync:function(t,...e){const r=Sr.dirname(t);if(wr.existsSync(r))return wr.writeFileSync(t,...e);vr.mkdirsSync(r),wr.writeFileSync(t,...e)}};const{stringify:br}=cr,{outputFile:kr}=Er;var _r=async function(t,e,r={}){const n=br(e,r);await kr(t,n,r)};const{stringify:Fr}=cr,{outputFileSync:Or}=Er;var xr=function(t,e,r){const n=Fr(e,r);Or(t,n,r)};const Pr=I.fromPromise,Dr=mr;Dr.outputJson=Pr(_r),Dr.outputJsonSync=xr,
// aliases
Dr.outputJSON=Dr.outputJson,Dr.outputJSONSync=Dr.outputJsonSync,Dr.writeJSON=Dr.writeJson,Dr.writeJSONSync=Dr.writeJsonSync,Dr.readJSON=Dr.readJson,Dr.readJSONSync=Dr.readJsonSync;var Nr=Dr;const Tr=et,Cr=g,Ir=$t.copySync,Lr=ke.removeSync,Rr=St.mkdirpSync,Mr=Ct;function zr(t,e,r){try{Tr.renameSync(t,e)}catch(n){if("EXDEV"!==n.code)throw n;return function(t,e,r){const n={overwrite:r,errorOnExist:!0};return Ir(t,e,n),Lr(t)}(t,e,r)}}var jr={moveSync:function(t,e,r){const n=(r=r||{}).overwrite||r.clobber||!1,{srcStat:i}=Mr.checkPathsSync(t,e,"move");return Mr.checkParentPathsSync(t,i,e,"move"),Rr(Cr.dirname(e)),function(t,e,r){if(r)return Lr(e),zr(t,e,r);if(Tr.existsSync(e))throw new Error("dest already exists.");return zr(t,e,r)}(t,e,n)}};const qr=et,Ar=g,Br=ae.copy,$r=ke.remove,Jr=St.mkdirp,Wr=Yt.pathExists,Yr=Ct;function Gr(t,e,r,n){qr.rename(t,e,(i=>i?"EXDEV"!==i.code?n(i):function(t,e,r,n){const i={overwrite:r,errorOnExist:!0};Br(t,e,i,(e=>e?n(e):$r(t,n)))}(t,e,r,n):n()))}var Ur=function(t,e,r,n){"function"==typeof r&&(n=r,r={});const i=r.overwrite||r.clobber||!1;Yr.checkPaths(t,e,"move",((r,s)=>{if(r)return n(r);const{srcStat:o}=s;Yr.checkParentPaths(t,o,e,"move",(r=>{if(r)return n(r);Jr(Ar.dirname(e),(r=>r?n(r):function(t,e,r,n){if(r)return $r(e,(i=>i?n(i):Gr(t,e,r,n)));Wr(e,((i,s)=>i?n(i):s?n(new Error("dest already exists.")):Gr(t,e,r,n)))}(t,e,i,n)))}))}))};var Vr,Xr,Kr,Hr={move:(0,I.fromCallback)(Ur)};!function(t){t.exports={
// Export promiseified graceful-fs:
...C,
// Export extra methods:
...$t,...ae,...Te,...or,...Nr,...St,...jr,...Hr,...Er,...Yt,...ke};
// Export fs.promises as a getter property so that we don't trigger
// ExperimentalWarning before fs.promises is actually accessed.
const e=f;Object.getOwnPropertyDescriptor(e,"promises")&&Object.defineProperty(t.exports,"promises",{get:()=>e.promises})}(T);
/**
 * Collection
 *
 * A Generic collection class
 */
class Qr{_size;constructor(){this._size=0}get size(){return this._size}
/**
       * clear()
       *
       * clears the collection.
       */clear(){this.setSize(0)}
/**
       * isEmpty
       *
       * determines if the collection is empty.
       */get isEmpty(){return 0===this.size}
/**
     * setSize()
     *
     * sets the size of the collection.
     * @param newSize the new size to set
     */setSize(t){this._size=t}}
/**
 * CollectionException
 *
 * A generic collection error.
 */class Zr extends b{constructor(t="Collection error"){super(t)}}
/**
 * Node
 *
 * A Generic Node.
 */class tn{value;_next;compare;constructor(t,e=null,r=null){this.value=t,this._next=e,this.compare=r||((t,e)=>(t.length,e.length,t>e?1:t<e?-1:0))}get hasNext(){return null!==this.next}get next(){return this._next}set next(t){this._next=t}compareTo(t){let e;switch(this.compare(this.value,t)){case-1:e=E.Less;break;case 1:e=E.Greater;break;default:e=E.Same}return e}}
/**
 * StackException
 *
 * A stack error.
 */class en extends Zr{constructor(t="Stack exception"){super(t)}}
/**
 * Stack
 *
 * A stack.
 */class rn extends Qr{top;compareFn;constructor(t=null){super(),this.top=null,this.compareFn=t
/**
     * add()
     *
     * adds the value to the stack.
     * @param value the value to add to the stack.
     */}add(t){this.push(t)}
/**
     * contains()
     *
     * determines if the value is contained in the stack.
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. FALSE otherwise.
     */contains(t){return this.containsValue(this.top,t)}
/**
     * containsValue()
     *
     * recursively determines if the value is in the stack.
     * @param top the top of the stack
     * @param value the value to search for.
     * @returns TRUE if the value is in the stack. False otherwise
     */containsValue(t,e){return!!t&&(t.compareTo(e)===E.Same||this.containsValue(t.next,e))}
/**
     * clear()
     *
     * clears the stack.
     */clear(){this.top=null,super.clear()
/**
     * peek()
     *
     * returns the next value in the stack without removing it.
     * @throws StackException when attempting to peek() when the stack is empty.
     */}peek(){if(this.isEmpty)
// nothing to peek.
throw new en;return this.top.value}
/**
     * pop()
     *
     * removes the next value in the stack.
     * @throws StackException when attempting to pop while the stack is empty.
     */pop(){if(this.isEmpty)
// nothing to pop
throw new en;{const t=this.top.value;return this.top=this.top.next,this.setSize(this.size-1),t
/**
     * push()
     *
     * adds an item to the top of the stack.
     * @param item the item to add to the stack.
     */}}push(t){const e=new tn(t,this.top,this.compareFn);this.top=e,this.setSize(this.size+1)}
/**
     * remove()
     *
     * alias to pop()
     * @throws StackException when the stack is empty.
     */remove(){return this.pop()}toArray(){const t=[];let e=this.top;for(;null!==e;)t.push(e.value),e=e.next;return t}}
/**
 * QueueException
 *
 * A queue error
 */class nn extends Zr{constructor(t="Queue error"){super(t)}}
/**
 * Queue
 *
 * A Queue.
 */class sn extends Qr{head;tail;compareFn;constructor(t=null){super(),this.head=null,this.tail=null,this.compareFn=t
/**
     * add()
     *
     * adds the value to the queue.
     * @param value the value to add.
     */}add(t){this.enqueue(t)}
/**
     * clear()
     *
     * clears the queue.
     */clear(){this.head=null,this.tail=null,super.clear()
/**
     * contains()
     *
     * determines if the value is contained in the queue.
     * @param value the value to search for.
     * @returns TRUE if the value is found in the queue. FALSE otherwise.
     */}contains(t){return this.containsValue(this.head,t)}
/**
     * containsValue()
     *
     * recursively determines if the value is contained in the queue.
     * @param node the node to check.
     * @param value the value to search for.
     * @returns TRUE if the value is contained in the node. FALSE otherwise.
     */containsValue(t,e){return!!t&&(t.compareTo(e)===E.Same||this.containsValue(t.next,e))}
/**
     * dequeue()
     *
     * removes an item from the queue.
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */dequeue(){if(this.head){const t=this.head.value;return this.head=this.head.next,this.head||(this.tail=null),this.setSize(this.size-1),t}
// nothing to remove.
throw new nn}
/**
     * enqueu()
     *
     * adds the value to the queue
     * @param value the value to add to the queue.
     */enqueue(t){const e=new tn(t,null,this.compareFn);this.tail&&(this.tail.next=e),this.tail=e,this.head||(this.head=e),this.setSize(this.size+1)}
/**
     * peek()
     *
     * returns the next value in the queue without removing it.
     */peek(){if(this.head)return this.head.value;throw new nn}
/**
     * remove()
     *
     * alias to dequeue()
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */remove(){return this.dequeue()}toArray(){const t=[];let e=this.head;for(;null!==e;)t.push(e.value),e=e.next;return t}}
/**
 * SystemException
 *
 * A generic system exception
 */class on extends b{constructor(t="System Error"){super(t)}}
/**
 * PathException
 *
 * A general path error.
 */class cn extends on{constructor(t="Path Error"){super(t)}}
// A path instruction
!function(t){
// point to the home directory.
t[t.HomeDirectory=0]="HomeDirectory",
// point to the current directory
t[t.CurrentDirectory=1]="CurrentDirectory",
// Go back one step
t[t.BackStep=2]="BackStep"}(Vr||(Vr={}));
/**
 * Path
 *
 * A utility class for working with file and directory paths
 */
class an{
/**
     * Creates a Path instance.
     * @param value the value of the path.
     * @throws PathException when the path is invalid.
     */
constructor(t){const e=t.trim();if(!this.isValidPath(e))throw new cn("Invalid Path: "+e);this._value=e.replace(/\\|\//g,v.sep)}
/**
     * FromSegments()
     *
     * Creates a Path from one or more segments.
     * @param segments the segnents of the path to create.
     * @returns the generated Path
     * @throws PathException when the segments are invalid.
     */static FromSegments(...t){try{const e=new rn;return an._BuildPath(t,e),new an(e.toArray().reverse().join(an.Separator))}catch(t){
// there was an error building the path.
throw t}}
/**
     * basename()
     *
     * gets the last portion of the path.
     */basename(){return new an(v.basename(this.toString()))}
/**
     * dirname()
     *
     * gets the directory name of the path.
     */dirname(){return new an(v.dirname(this.toString()))}equals(t){let e=!1;if(t instanceof an){const r=t;e=this.toString()===r.toString()}return e}
/**
     * extension()
     *
     * gets the extension of the path.
     */extension(){return v.extname(this.toString())}
/**
    * isAbsolute()
    *
    * determines if path is an absolute path
    */isAbsolute(){return v.isAbsolute(this.toString())}
/**
     * normalize()
     *
     * normalizes the given path, resolving '..' and '.' segments.
     */normalize(){return new an(v.normalize(this.toString()))}
/**
     * segments()
     *
     * returns an array consisting of the file segments.
     */segments(){return this.toString().split(an.Separator)}
/**
     * toNamespacedPath()
     *
     * gets an equivalent namespace-prefixed path.
     *
     * This method is meaningful only on Windows systems. On POSIX systems,
     * the method is non-operational and always returns path without modifications.
     */toNamespacedPath(){return new an(v.toNamespacedPath(this.toString()))}toString(){return this._value}
// =======================================================================
// helpers
// =======================================================================
/**
     * isValidPath()
     *
     * determines if a path is valid.
     * @param suspect the string to test.
     * @returns TRUE if the path is valid. FALSE otherwise.
     * @note This method does not work correctly yet. We need some algorithm to validate paths for any operating system.
     * Current solution produces incorrect responses. For now, we will just make this function always return
     * TRUE when the path is not empty.. And then modify it at a later version.
     */
isValidPath(t){
// make sure the path is not an empty string.
if(0===t.length)return!1;
// check for restricted characters
const e="win32"===process.platform;return!an.RESTRICTED.test(t)&&((!e||!an.WINDOWS_RESTRICTED.test(t))&&!an.POSIX_RESTRICTED.test(t))}
/**
     * _BuildPath()
     *
     * Creates a valid path string from the provided segments.
     * @param segments the segments to process.
     * @note The built path will be in reverse order.
     * @note This function needs to be redone to improve performance.
     * @throws PathException when the path is invalid.
     */static _BuildPath(t,e){if(t.length>0){const r=e.isEmpty,n=an._NormalizeSegment(t[0]);let i;for(;!n.isEmpty;)if(i=n.remove(),"string"==typeof i)e.push(i);else switch(i){case Vr.BackStep:if(r)throw new cn("Cannot backtrack from root backtrack from root directory.");e.pop();break;case Vr.HomeDirectory:if(!r)throw new cn("You can only specify the home directory in the beginning of the path.");e.push("~");break;default:
// here we know it is a Current Directory instruction
r&&e.push(process.cwd())}t.shift(),an._BuildPath(t,e)}}
/**
     * _NormalizeSegment()
     *
     * Attempts to normalize a path segment.
     * @param dirty the dirty segment to normalize.
     */static _NormalizeSegment(t){
/*
         * Our goal here is to convert a path segment into a series of PathInstructions for which a Path can be constructed.
         * The dirty input can be a string or a Path instance, in which the value can be a single path segment, such as a file or folder name,
         * or a path pattern in and of itself.
         *
         * Path segments can fall into one of the following categories.
         * 1. A Home Directory instruction (~, /, //, \, \\): We convert these into a PathInstruction.HomeDirectory instruction.
         * 2. A Current Working Directory instruction (./, .\): We convert this into a PathInstruction.CurrentDirectoryInstruction
         * 3. A Backstep instruction (../, ..\): We convert this into a PathInstruction.Backstep instruction.
         * 4. A regular string: We assume a regular string to just be a file or directory name. So, we just add it to the instruction set as is.
         *
         * Note:
         * Since the input segments can be either a path segment or a path string in and of itself, we use the following RegExp to split the path into its segments.
         *
         * /(?<!([/\\])[/\\])[/\\](?![/\\])/g
         *
         * This RegExp splits the string using the "\" and "/" characters. As such expressions like "\\" will be converted into an empty string. And, expressions like
         * "./" will be converted to ".". It is worth noting that splitting using this expression will result in some undefined values in places where the path separators would
         * normally go. For example, the input "path/to/directory" would result in the output ["path", undefined, "to", undefined, "directory"]. Therefore, it is necessary to
         * perform additional operations to remove those unwanted values.
        */
let e=t.toString().split(/(?<!([/\\])[/\\])[/\\](?![/\\])/g);e=e.filter((t=>null!=t));const r=new sn;return e.forEach((t=>{".."===t?
// backstep
r.add(Vr.BackStep):"."==t?
// current directory.
r.add(Vr.CurrentDirectory):["~","/","\\"].includes(t)?
// home directory.
r.add(Vr.HomeDirectory):r.add(t)})),r}}an.RESTRICTED=/[\[\]#%&{}<>?\s\b\0$!'"@|‘“+^`]/g,an.POSIX_RESTRICTED=/[\\:]/g,an.WINDOWS_RESTRICTED=/[\/]/g,
/**
 * Delimiter()
 *
 * Provides the platform-specific path delimiter.
 * - Windows: ";"
 * - POSIX: ":"
 */
an.Delimiter=v.delimiter,
/**
 * Separator
 *
 * gets he platform-specific path segment separator.
 * - Windows: \
 * - POSIX: /
 */
an.Separator=v.sep;
/**
 * FileSystemEntryException
 *
 * A Generic FileSystemEntry error.
 */
class un extends on{constructor(t="FileSystem Entry Error"){super(t)}}
/**
 * FileSystemEntryNotFoundException
 *
 * An error indicating a FileSystem Entry was not found.
 */class ln extends un{constructor(t="FileSystem Entry Not Found."){super(t)}}
/**
 * FileSystemEntry
 *
 * A generic object or entry in the file system.
 */class fn{
/**
     * Creates an instance of FileSystemEnty.
     * @param path the path of the entry.
     * @throws PathException when the path is invalid.
     * @throws FileSystemEntryNotFoundException when the entry does not exist.
     */
constructor(t,e){this._path=t instanceof an?t:new an(t),this.stats=e,this._deleted=null}
/**
     * ForPath()
     *
     * Creates a pointer to the specified FileSystem Entry.
     * @param path the path to the entry
     * @returns the instance of the file system entry.
     * @throws FileSystemEntryNotFoundException when the filesystem entry does not exist.
     * @throws FileSystemEntryException when some error occurs.
     */static async ForPath(t){if(!await fn.Exists(t))throw new ln;
// get the stats for the path
let e;try{e=await fn.GetStats(t)}catch(t){throw new un(t.message)}return new fn(t,e)}
/**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */static async Create(t,e){throw new k}
/**
     * Exists()
     *
     * determines if the path exists.
     * @returns TRUE if the file exists. False it it does not.
     */static async Exists(t){try{return await fn.GetStats(t),!0}catch(t){return!1}}
/**
    * GetStats()
    *
    * gets the stats of the entry.
    * @throws FileSystemEntryException when the operation fails.
    * @returns FileSystemEntryStats containing stats about the entry.
    */static async GetStats(e){try{const r=await t(e.toString(),{bigint:!1});return{dev:r.dev,ino:r.ino,mode:r.mode,nlink:r.nlink,uid:r.uid,gid:r.gid,rdev:r.rdev,size:r.size,blksize:r.blksize,blocks:r.blocks,atimeMs:r.atimeMs,mtimeMs:r.mtimeMs,ctimeMs:r.ctimeMs,birthtimeMs:r.birthtimeMs,atime:_.FromDate(r.atime,F.UTC()),mtime:_.FromDate(r.mtime,F.UTC()),ctime:_.FromDate(r.ctime,F.UTC()),birthtime:_.FromDate(r.birthtime,F.UTC()),isBlockDevice:r.isBlockDevice(),isCharacterDevice:r.isCharacterDevice(),isDirectory:r.isDirectory(),isFIFO:r.isFIFO(),isFile:r.isFile(),isSocket:r.isSocket(),isSymbolicLink:r.isSymbolicLink()}}catch(t){const r=t.code="",n=t.message;throw r?new ln(`Entry ${e.toString()} not found.`):new un(n)}}get createdOn(){var t;return null===(t=this.stats)||void 0===t?void 0:t.birthtime}get deletedOn(){return this._deleted}get isDeleted(){return null!=this.deletedOn}get isDirectory(){return this.stats.isDirectory}get isFile(){return this.stats.isFile}get isLink(){return this.stats.isSymbolicLink}get path(){return this._path}get updatedOn(){return this.stats.mtime}
/**
     * delete()
     *
     * deletes the directory.
     * @param options delete options.
     */async delete(t){this._deleted=_.Now()}equals(t){let e=!1;if(t instanceof fn){const r=t;e=this.path.equals(r.path)&&this.createdOn.equals(r.createdOn)&&this.updatedOn.equals(r.updatedOn)}return e}serialize(){return JSON.stringify({})}}
/**
 * FileException
 *
 * A Generic File Exception.
 */class hn extends un{constructor(t="File Error"){super(t)}}
/**
 * FileNotFoundException
 *
 * An exception indicates a file is not found.
 */class dn extends hn{constructor(t="File Not Found"){super(t)}}
/**
 * FileAlreadyExistsException
 *
 * an error indicating a file already exists.
 */class yn extends hn{constructor(t="File already exists"){super(t)}}
/**
 * File
 *
 * A File
 */class mn extends fn{
/**
     * Creates a file instance.
     * @param path the path to the file.
     * @throws FileNotFoundException when the file is not found.
     * @throws PathException when the path is invalid.
     */
constructor(t,e){super(t,e)}
/**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */static async Create(t,r){if(await mn.Exists(t))throw new yn;
// create the file.
const n=t instanceof an?t:new an(t.toString());try{await e(n.toString(),"")}catch(t){throw new hn(t.message)}return mn.ForPath(n)}
/**
     * Exist()
     *
     * determines if the file specified by the path exists.
     * @param path the path to check.
     * @returns TRUE if the file exists. FALSE otherwise.
     * @throws FileException if an error occurs performing the operation.
     */static async Exists(t){let e=null;try{e=(await super.GetStats(t)).isFile}catch(t){e=!1}return e}
/**
     * ForPath()
     *
     * Creates a reference to a File specified by the path.
     * @param path the path to the directory.
     * @returns An instance of the directory.
     * @throws FileNotFoundException when the file is not found.
     * @throws FileException when the operation fails.
     */static async ForPath(t){try{if(!await mn.Exists(t))throw new dn;
// get the stats
const e=await mn.GetStats(t);
// return the reference
return new mn(t,e)}catch(t){throw t instanceof un?new hn(t.message):t}}
/**
     * copy()
     *
     * copies the directory to the specified path.
     * @param to the destination to copy the file to.
     * @param options copy options.
     * @throws FileException when the file is deleted.
     */async copy(t,e){
// resolve the arguments.
const n=t instanceof an?t:new an(t);let i;i=e?{mode:e.mode?e.mode:null,override:!!e.override&&e.override}:{mode:null,override:!1};
// make sure the destination file does not already exist.
if(await fn.Exists(n))throw new yn;
// make sure the file has not been deleted.
if(this.isDeleted)throw new hn;
// copy the file.
try{await r(this.path.toString(),n.toString(),i.mode)}catch(t){throw new hn(t.message)}}
/**
     * delete()
     *
     * deletes the directory.
     * @returns the deleted directory.
     * @param options delete options.
     */async delete(t){
// resolve options
let e;e=t?{recursive:!!t.recursive&&t.recursive,force:!!t.force&&t.force}:{recursive:!1,force:!1};
// delete the file.
try{await n(this.path.toString(),{force:e.force,recursive:e.recursive}),super.delete()}catch(t){throw new hn(t.message)}}equals(t){return t instanceof mn&&super.equals(t)}
/**
     * move()
     *
     * moves the filesystem entry to the specified path.
     * @param to the destination to move the filesystem entry to.
     * @param options move options.
     * @returns the copied FilSystem Entry.
     */async move(t,e){const r=t instanceof an?t:new an(t);let n;n=e?{override:!!e.override&&e.override}:{override:!1};
// make sure the destination is available.
const s=await fn.Exists(r);if(s)throw new yn;if(s&&!n.override)throw new yn;
// move the file.
try{return await i(this.path.toString(),r.toString()),await mn.ForPath(r)}catch(t){throw new hn(t.message)}}
/**
     * rename()
     *
     * renames the filesystem entry.
     * @param newName the new name of the directory.
     * @throws PathException when the new name is invalid.
     * @throws FileException when the operation encounters an error.
     */async rename(t){
// resolve the new file path.
const e=an.FromSegments(this.path.dirname(),t);
// rename the file.
try{return await i(this.path.toString(),e.toString()),await mn.ForPath(e)}catch(t){throw new hn(t.message)}}serialize(){return JSON.stringify({path:this.path.toString(),created_on:this.createdOn.toString(),updated_on:this.updatedOn.toString()})}}
// file enums
!function(t){
/**
     * If present, the copy operation will fail with an error if the destination path already exists.
     * COPYFILE_EXCL = constants.COPYFILE_EXCL,
    */
t[t.EXCL=h.COPYFILE_EXCL]="EXCL",
// If present, the copy operation will attempt to create a copy-on-write reflink. If the underlying
// platform does not support copy-on-write, then a fallback copy mechanism is used.
t[t.FICLONE=h.COPYFILE_FICLONE]="FICLONE",
// If present, the copy operation will attempt to create a copy-on-write reflink. If the underlying platform
// does not support copy-on-write, then the operation will fail with an error.
t[t.FICLONE_FORCE=h.COPYFILE_FICLONE_FORCE]="FICLONE_FORCE"}(Xr||(Xr={})),function(t){t.File="file",t.Directory="dir",t.Junction="junction"}(Kr||(Kr={}));
/**
 * LinkException
 *
 * A General Link error
 */
class pn extends un{constructor(t="Link Error"){super(t)}}
/**
 * LinkNotFoundException
 */class wn extends pn{constructor(t="Link Not Found"){super(t)}}
/**
 * LinkAlreadyExistsException
 */class Sn extends pn{constructor(t="Link already exists"){super(t)}}
/**
 * Link
 *
 * A Symbolic Link
 */class vn extends fn{
/**
     * Creates a file instance.
     * @param path the path to the file.
     * @throws FileNotFoundException when the file is not found.
     * @throws PathException when the path is invalid.
     */
constructor(t,e){super(t,e),this._target=null}
/**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */static async Create(t,e,r){var n;
// make sure the file does not already exists.
if(await vn.Exists(t))throw new Sn;
// create the Link.
const i=t instanceof an?t:new an(t.toString()),o=e instanceof an?e:new an(e);let c;c=r?{type:r.type?r.type:Kr.File}:{type:Kr.File};try{await s(o.toString(),i.toString(),null===(n=c.type)||void 0===n?void 0:n.toString())}catch(t){throw new pn(t.message)}return await vn.ForPath(i)}
/**
     * Exist()
     *
     * determines if the symbolic specified by the path exists.
     * @param path the path to check.
     * @returns TRUE if the directory exists. FALSE otherwise.
     * @throws DirectoryException if an error occurs performing the operation.
     */static async Exists(t){try{const e=await super.Exists(t),r=await vn.GetStats(t);return e&&r.isSymbolicLink}catch(t){throw new pn(t.message)}}
/**
     * ForPath()
     *
     * Creates a reference to a directory specified by the path.
     * @param path the path to the directory.
     * @returns An instance of the directory.
     * @throws DirectoryNotFoundException when the directory is not found.
     * @throws DirectoryException when the operation fails.
     */static async ForPath(t){try{if(!await vn.Exists(t))throw new wn;
// get the stats
const e=await vn.GetStats(t);
// return the reference
return new vn(t,e)}catch(t){throw t instanceof un?new pn(t.message):t}}
/**
     * delete()
     *
     * deletes the directory.
     * @returns the deleted directory.
     * @param options delete options.
     */async delete(t){
// delete the link.
try{await o(this.path.toString()),super.delete()}catch(t){throw new pn(t.message)}}equals(t){return t instanceof vn&&super.equals(t)}
/**
     * isValid()
     *
     * determines if the target of the link exists.
     */async isValid(){let t=!1;try{t=null!==await this.target()}catch(t){}return t}serialize(){return JSON.stringify({path:this.path.toString(),created_on:this.createdOn.toString(),updated_on:this.updatedOn.toString()})}
/**
     * target()
     *
     * gets the target object of the link.
     * @throws LinkException when the operation fails.
     * @returns the path targeted by the link.
     */async target(){if(!this._target)try{const t=await c(this.path.toString());this._target=new an(t)}catch(t){throw new pn(t.message)}return this._target}}
/**
 * DirectoryException
 *
 * A general directory error.
 */class gn extends un{constructor(t="Directory Error"){super(t)}}
/**
 * DirectoryNotFoundException
 *
 * An exception indicating a directory cannot be found.
 */class En extends gn{constructor(t="Directory Not Found"){super(t)}}
/**
 * DirectoryAlreadyExistsException
 *
 * An exception indicating a directory already exists.
 */class bn extends gn{constructor(t="Directory Already Exists"){super(t)}}
/**
 * Directory
 *
 * A File system Directory.
 */class kn extends fn{
/**
     * Creates a reference to a directory.
     * @param path the directory path.
     * @throws DirectoryNotFoundExeption when the directory is not found.
     */
constructor(t,e){super(t,e)}
/**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */static async Create(t,e){if(await kn.Exists(t))throw new bn;
// create the directory.
const r=t instanceof an?t:new an(t.toString());try{await a(r.toString(),{recursive:!0,mode:"0o777"})}catch(t){throw new gn(t.message)}return kn.ForPath(r)}
/**
     * ForPath()
     *
     * Creates a reference to a directory specified by the path.
     * @param path the path to the directory.
     * @returns An instance of the directory.
     * @throws DirectoryNotFoundException when the directory is not found.
     * @throws DirectoryException when the operation fails.
     */static async ForPath(t){try{if(!await kn.Exists(t))throw new En;
// get the stats
const e=await kn.GetStats(t);
// return the reference
return new kn(t,e)}catch(t){throw t instanceof un?new gn(t.message):t}}
/**
     * Current()
     *
     * Gets the current working directory.
     * @returns The current working directory.
     */static async Current(){return await kn.ForPath(process.cwd())}
/**
     * Exist()
     *
     * determines if the directory specified by the path exists.
     * @param path the path to check.
     * @returns TRUE if the directory exists. FALSE otherwise.
     * @throws DirectoryException if an error occurs performing the operation.
     */static async Exists(t){let e=null;try{e=(await super.GetStats(t)).isDirectory}catch(t){e=!1}return e}
/**
     * contents()
     *
     * gets the contents of the directory.
     * @thorws DirectoryException when the operation fails.
     */async contents(){try{const t=await u(this.path.toString());return await this.convertToObjects(t)}catch(t){throw new gn(t.message)}}
/**
     * convertToObjects()
     *
     * converts a list of paths into the corresponding objects.
     * @param paths a list of file paths to convert.
     * @returns a list of objects.
     */async convertToObjects(t){const e=new Array;let r;return await Promise.all(t.map((async t=>{const n=await fn.ForPath(t);r=n.stats.isDirectory?await kn.ForPath(n.path):n.isFile?await mn.ForPath(n.path):await vn.ForPath(n.path),e.push(r)}))),e}
/**
     * copy()
     *
     * copies the directory to the specified path.
     * @param to the destination to copy to.
     * @param options copy options.
     * @throws DirectoryAlreadyExistsException when the to path already exists.
     * @throws DirectoryException when the operation fails.
     */async copy(t,e){
// resolve arguments
let r;r=e?{recursive:e.recursive,overwrite:e.overwrite}:{overwrite:!1,recursive:!1};
// make sure the destination and file exists
const n=t instanceof an?t:new an(t.toString());if(await fn.Exists(n))throw new bn;
// copy the directory.
try{await N.copy(this.path.toString(),n.toString(),{recursive:r.recursive,overwrite:r.overwrite,errorOnExist:!0})}catch(t){
// an error occured.
throw new gn(t.message)}}
/**
     * delete()
     *
     * deletes the directory.
     * @param options delete options.
     * @throws DirectoryException when the operation fails.
     */async delete(t){
// resolve options
let e;e=t?{recursive:!!t.recursive&&t.recursive,maxRetries:t.maxRetries?t.maxRetries:3,retryDelay:t.retryDelay?t.retryDelay:2e3}:{recursive:!1,maxRetries:3,retryDelay:2e3};
// delete the file.
try{await l(this.path.toString(),{recursive:e.recursive,maxRetries:e.maxRetries,retryDelay:e.retryDelay}),await super.delete()}catch(t){throw new gn(t.message)}}equals(t){return t instanceof kn&&super.equals(t)}
/**
     * move()
     *
     * moves the filesystem entry to the specified path.
     * @param to the destination to move the filesystem entry to.
     * @param options move options.
     * @returns the copied movable object.
     * @throws DirectoryAlreadyExistsException when the destination already exists.
     * @throws DirectoryException when the operation fails.
     */async move(t,e){const r=t instanceof an?t:new an(t);let n;n=e?{overwrite:!!e.overwrite&&e.overwrite}:{overwrite:!1};
// make sure the destination is available.
const i=await fn.Exists(r);if(i)throw new bn;if(i&&!n.overwrite)throw new bn;
// move the file.
try{return await N.move(this.path.toString(),r.toString(),{overwrite:n.overwrite}),await kn.ForPath(r)}catch(t){throw new gn(t.message)}}
/**
     * rename()
     *
     * renames the filesystem entry.
     * @param newName the new name of the directory.
     */async rename(t){
// resolve the new file path.
const e=an.FromSegments(this.path.dirname(),t);
// rename the file.
try{return await i(this.path.toString(),e.toString()),kn.ForPath(e)}catch(t){throw new gn(t.message)}}serialize(){return JSON.stringify({path:this.path.toString(),created_on:this.createdOn.toString(),updated_on:this.updatedOn.toString()})}}class _n extends on{constructor(t="File Stream Error"){super(t)}}
/**
 * FileStreamDataException
 *
 * File Stream Data error
 */class Fn extends _n{constructor(t="Stream Data Error"){super(t)}}class On{constructor(t){this._file=t}
/**
     * file()
     *
     * the source file of the stream.
     */file(){return this._file}equals(t){let e=!1;if(t instanceof On){const r=t;e=this.file().equals(r.file())}return e}toString(){return`Stream for file ${this.file().path.toString()}`}}
/**
 * FileReader
 *
 * A FileReader class
 */class xn extends On{
/**
     * Creates a FileReader stream.
     * @param file the file to read.
     * @param options options for reading a file.
     */
constructor(t,e={encoding:"utf-8"}){super(t),this._encoding=e.encoding,this._isClosed=!1,this._bytesRead=0,this._fileSize=null,this._stream=d(this.file().path.toString(),{encoding:this._encoding,autoClose:!0}),this._stream.pause()}
/**
     * all()
     *
     * reads all the data in the stream.
     * @throws FileStreamException when the stream cannot be read (i.e. It was closed)
     */all(){if(this._isClosed)throw new _n;let t,e="";for(;t=this._stream.read();)e+=t.toString(this.encoding());return e}
/**
     * close()
     *
     * closes the file stream.
     */async close(){this._stream.close(),this._isClosed=!0}
/**
     * encoding()
     *
     * the stream encoding.
     */encoding(){return this._encoding}equals(t){let e=!1;if(t instanceof xn){const r=t;e=super.equals(r)&&this.encoding()===r.encoding()}return e}
/**
     * hasNext()
     *
     * determines if there is still data left to be read.
     */async hasNext(){if(!this._fileSize){const t=this.file().stats;this._fileSize=t.size}return this._bytesRead<this._fileSize}
/**
     * next()
     *
     * gets data from the buffer, of the specified size.
     * @param size the size of data to get in bytes.
     * @param encoding the encoding
     * @return the data.
     */async next(t=64){if(this._isClosed)throw new _n;if(!this._fileSize){const t=this.file().stats;this._fileSize=t.size}t=t>xn.MAX_BYTES?xn.MAX_BYTES:t;const e=this._stream.read(t);if(e)return this._bytesRead+=t,e.toString(this.encoding());
// no data to read.
throw new Fn}}
// the maximum byte size supported is 1GiB
xn.MAX_BYTES=1073741824;
/**
 * FileWriter
 *
 * A FileWriter
 */
class Pn extends On{constructor(t,e={encoding:"utf-8",batch:{size:30}}){super(t),this._isClosed=!1,this._numWrites=0,this._encoding=e.encoding,this._stream=y(this.file().path.toString(),{encoding:this._encoding,autoClose:!0}),this._batchWrites=!!(e.batch&&e.batch.size>0),this._batchWrites?(this._stream.cork(),this._batchSize=Math.abs(e.batch.size),this._streamIsCorked=!0):(this._batchSize=null,this._streamIsCorked=!1)}
/**
     * _batchIsFill()
     *
     * determines if the current write batch is full.
     * @returns TRUE if the buffer is full. FALSE otherwise.
     */_batchIsFull(){return!this._batchWrites||
// batch writes are enabled
this._numWrites>0&&this._numWrites%this._batchSize==0}
/**
     * close()
     *
     * closes the file stream.
     */async close(){this._flush(),this._stream.close(),this._isClosed=!0}
/**
     * _corkStream()
     *
     * corks the stream.
     */_corkStream(){this._streamIsCorked||(this._stream.cork(),this._streamIsCorked=!0)}
/**
    * encoding()
    *
    * the stream encoding.
    */encoding(){return this._encoding}
/**
     * _flush()
     *
     * Flushes the buffer.
     */_flush(){this._uncorkStream(),this._corkStream()}
/**
     * _uncorkStream()
     *
     * uncorks the stream.
     */_uncorkStream(){this._streamIsCorked&&(this._stream.uncork(),this._streamIsCorked=!1)}
/**
     * write()
     *
     * writes data to the file.
     * @param x the data write to the file
     */async write(t){if(this._isClosed)throw new _n;
// write the data
this._stream.write(t,(t=>{if(t)throw new Fn(t.message);this._numWrites++})),
// determine if the batch is full.
this._batchWrites&&this._batchIsFull()&&this._flush()}
/**
     * writeLine()
     *
     * writes a line of data to the file.
     * @param x the data to write to te file.
     */async writeLine(t){await this.write(`${t}\n`)}}
/**
 * ProcessException
 *
 * A generic process error
 */class Dn extends on{constructor(t="Process Error"){super(t)}}
/**
 * ProcessFailedException
 *
 * An Error indicating a process has failed.
 */class Nn extends Dn{constructor(t="Process exited with non-zero code",e=-1){super(t),this.code=e}}
/**
 * Process
 *
 * The process object
 */class Tn{constructor(t,e){this.childProcess=t,this._forked=e,this._isKilled=!1,this._exitCode=null,this.childProcess.on("exit",(t=>{this._exitCode=t}))}
/**
     * Run()
     *
     * runs a command.
     * @param cmd the command to run
     * @param options command options.
     * @returns the output of the process.
     * @throws ProcessFailedException when the process exits with a non-zero exit code.
     */static Run(t,e={cwd:process.cwd(),env:process.env}){
// resolve the options.
let r;return r=e?{cwd:e.cwd,env:e.env?e.env:process.env}:e,new Promise(((e,n)=>{O(t,{cwd:r.cwd.toString(),env:r.env},((t,r)=>{t&&n(new Nn(t.message,t.code)),e(r)}))}))}
/**
     * Start()
     *
     * creates a new child process
     */static Start(t,e={cwd:process.cwd(),arguments:[],fork:!1,env:process.env,serializationType:"json"}){
// resolve options
let r,n;return r=e?{arguments:e.arguments?e.arguments:[],fork:!!e.fork&&e.fork,cwd:e.cwd?e.cwd:process.cwd(),env:e.env?e.env:process.env,serializationType:e.serializationType?e.serializationType:"json"}:{cwd:process.cwd(),arguments:[],fork:!1,env:process.env,serializationType:"json"},n=r.fork?x(t,{cwd:r.cwd.toString(),env:r.env,execArgv:r.arguments,serialization:r.serializationType}):P(t,r.arguments,{cwd:r.cwd.toString(),env:r.env,serialization:r.serializationType}),new Tn(n,r.fork)}
/**
     * addErrorHandler()
     *
     * adds an error handler to the process.
     * @param handler the error handler
     */addErrorHandler(t){this.childProcess.on("error",(e=>{t(e)}))}
/**
     * addMessageHandler()
     *
     * adds a message handler to the process.
     * @param handler the message handler to add.
     */addMessageHandler(t){this.childProcess.on("message",((e,r)=>{t(e,r)}))}
/**
     * canBeMessaged()
     *
     * determines if the process can be sent messages (i.e. if process.sendMessage() can be used on the instance.).
     */canBeMessaged(){return this.childProcess.connected}equals(t){let e=!1;if(t instanceof Tn){const r=t;e=this.id()===r.id()}return e}
/**
     * exitCode()
     *
     * gets the process exit code.
     */exitCode(){return this._exitCode}
/**
     * id()
     *
     * gets the ID of the process.
     */id(){return this.childProcess.pid}
/**
     * isActive()
     *
     * determines if the process is active.
     */isActive(){return null===this._exitCode}
/**
     * isForked()
     *
     * determines if the process is forked.
     */isForked(){return this._forked}
/**
     * kill()
     *
     * kills the process.
     * @param signal the signal to send.
     * @default 'SIGTERM'
     * @throws ProcessException when the operation fails.
     */kill(t="SIGTERM"){if(this._isKilled=this.childProcess.kill(t),!this._isKilled)throw new Dn("Failed to kill process with UD "+this.toString())}
/**
     * sendMessage()
     *
     * sends a message to the child process.
     * @throws ProcessException when the message cannot be sent, like if there is no connection to the child/parent process.
     */sendMessage(t){return new Promise(((e,r)=>{this.canBeMessaged()?this.childProcess.send(t,(t=>{t?r(new Dn(t.message)):e()})):r(new Dn("Message cannot be sent"))}))}toString(){return this.id().toString()}}export{Xr as CopyFileMode,kn as Directory,bn as DirectoryAlreadyExistsException,gn as DirectoryException,En as DirectoryNotFoundException,mn as File,yn as FileAlreadyExistsException,hn as FileException,dn as FileNotFoundException,xn as FileReader,On as FileStream,Fn as FileStreamDataException,_n as FileStreamException,fn as FileSystemEntry,un as FileSystemEntryException,ln as FileSystemEntryNotFoundException,Pn as FileWriter,vn as Link,Sn as LinkAlreadyExistsException,pn as LinkException,wn as LinkNotFoundException,Kr as LinkType,an as Path,cn as PathException,Tn as Process,Dn as ProcessException,Nn as ProcessFailedException,on as SystemException};
