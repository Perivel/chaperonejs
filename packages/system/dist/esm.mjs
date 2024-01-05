import{stat as t,writeFile as e,copyFile as r,rm as n,rename as i,symlink as s,unlink as o,readlink as c,mkdir as a,readdir as u,rmdir as l}from"fs/promises";import f,{constants as h,createReadStream as d,createWriteStream as y}from"fs";import m from"constants";import p from"stream";import w from"util";import S from"assert";import*as v from"path";import E from"path";import{ComparisonResult as g,compare as b,BaseException as k,MethodUndefinedException as F,DateTime as _,Timezone as O}from"@chaperone/util";import{exec as x,fork as P,spawn as D}from"child_process";var N="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},T={},C={get exports(){return T},set exports(t){T=t}},I={},L={fromCallback:function(t){return Object.defineProperty((function(...e){if("function"!=typeof e[e.length-1])return new Promise(((r,n)=>{t.call(this,...e,((t,e)=>null!=t?n(t):r(e)))}));t.apply(this,e)}),"name",{value:t.name})},fromPromise:function(t){return Object.defineProperty((function(...e){const r=e[e.length-1];if("function"!=typeof r)return t.apply(this,e);t.apply(this,e.slice(0,-1)).then((t=>r(null,t)),r)}),"name",{value:t.name})}},R=m,M=process.cwd,j=null,z=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return j||(j=M.call(process)),j};try{process.cwd()}catch(t){}
// This check is needed until node.js 12 is required
if("function"==typeof process.chdir){var q=process.chdir;process.chdir=function(t){j=null,q.call(process,t)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,q)}var A=function(t){
// (re-)implement some things that are known busted or missing.
// lchmod, broken prior to 0.6.2
// back-port the fix here.
R.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&function(t){t.lchmod=function(e,r,n){t.open(e,R.O_WRONLY|R.O_SYMLINK,r,(function(e,i){e?n&&n(e):
// prefer to return the chmod error, if one occurs,
// but still try to close, and report closing errors if they occur.
t.fchmod(i,r,(function(e){t.close(i,(function(t){n&&n(e||t)}))}))}))},t.lchmodSync=function(e,r){var n,i=t.openSync(e,R.O_WRONLY|R.O_SYMLINK,r),s=!0;
// prefer to return the chmod error, if one occurs,
// but still try to close, and report closing errors if they occur.
try{n=t.fchmodSync(i,r),s=!1}finally{if(s)try{t.closeSync(i)}catch(t){}else t.closeSync(i)}return n}}(t);
// lutimes implementation, or no-op
t.lutimes||function(t){R.hasOwnProperty("O_SYMLINK")&&t.futimes?(t.lutimes=function(e,r,n,i){t.open(e,R.O_SYMLINK,(function(e,s){e?i&&i(e):t.futimes(s,r,n,(function(e){t.close(s,(function(t){i&&i(e||t)}))}))}))},t.lutimesSync=function(e,r,n){var i,s=t.openSync(e,R.O_SYMLINK),o=!0;try{i=t.futimesSync(s,r,n),o=!1}finally{if(o)try{t.closeSync(s)}catch(t){}else t.closeSync(s)}return i}):t.futimes&&(t.lutimes=function(t,e,r,n){n&&process.nextTick(n)},t.lutimesSync=function(){})}(t);
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
return Object.setPrototypeOf&&Object.setPrototypeOf(r,e),r}(t.read),t.readSync="function"!=typeof t.readSync?t.readSync:(a=t.readSync,function(e,r,n,i,s){for(var o=0;;)try{return a.call(t,e,r,n,i,s)}catch(t){if("EAGAIN"===t.code&&o<10){o++;continue}throw t}});var a};var B=p.Stream,$=function(t){return{ReadStream:function e(r,n){if(!(this instanceof e))return new e(r,n);B.call(this);var i=this;this.path=r,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,/*=0666*/
this.bufferSize=65536,n=n||{};for(
// Mixin options into this
var s=Object.keys(n),o=0,c=s.length;o<c;o++){var a=s[o];this[a]=n[a]}this.encoding&&this.setEncoding(this.encoding);if(void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(void 0===this.end)this.end=1/0;else if("number"!=typeof this.end)throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}if(null!==this.fd)return void process.nextTick((function(){i._read()}));t.open(this.path,this.flags,this.mode,(function(t,e){if(t)return i.emit("error",t),void(i.readable=!1);i.fd=e,i.emit("open",e),i._read()}))},WriteStream:function e(r,n){if(!(this instanceof e))return new e(r,n);B.call(this),this.path=r,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,/*=0666*/
this.bytesWritten=0,n=n||{};for(
// Mixin options into this
var i=Object.keys(n),s=0,o=i.length;s<o;s++){var c=i[s];this[c]=n[c]}if(void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],null===this.fd&&(this._open=t.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}};var J=function(t){if(null===t||"object"!=typeof t)return t;if(t instanceof Object)var e={__proto__:W(t)};else e=Object.create(null);return Object.getOwnPropertyNames(t).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e},W=Object.getPrototypeOf||function(t){return t.__proto__};var Y,G,U=f,V=A,X=$,K=J,H=w;function Q(t,e){Object.defineProperty(t,Y,{get:function(){return e}})}
/* istanbul ignore else - node 0.x polyfill */
"function"==typeof Symbol&&"function"==typeof Symbol.for?(Y=Symbol.for("graceful-fs.queue"),
// This is used in testing by future versions
G=Symbol.for("graceful-fs.previous")):(Y="___graceful-fs.queue",G="___graceful-fs.previous");var Z=function(){};
// Once time initialization
if(H.debuglog?Z=H.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(Z=function(){var t=H.format.apply(H,arguments);t="GFS4: "+t.split(/\n/).join("\nGFS4: "),console.error(t)}),!U[Y]){
// This queue can be shared by multiple loaded instances
var tt=N[Y]||[];Q(U,tt),
// Patch fs.close/closeSync to shared queue version, because we need
// to retry() whenever a close happens *anywhere* in the program.
// This is essential when multiple graceful-fs instances are
// in play at the same time.
U.close=function(t){function e(e,r){return t.call(U,e,(function(t){
// This function uses the graceful-fs shared queue
t||st(),"function"==typeof r&&r.apply(this,arguments)}))}return Object.defineProperty(e,G,{value:t}),e}(U.close),U.closeSync=function(t){function e(e){
// This function uses the graceful-fs shared queue
t.apply(U,arguments),st()}return Object.defineProperty(e,G,{value:t}),e}(U.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",(function(){Z(U[Y]),S.equal(U[Y].length,0)}))}N[Y]||Q(N,U[Y]);var et,rt=nt(K(U));function nt(t){
// Everything that references the open() function needs to be in here
V(t),t.gracefulify=nt,t.createReadStream=function(e,r){return new t.ReadStream(e,r)},t.createWriteStream=function(e,r){return new t.WriteStream(e,r)};var e=t.readFile;t.readFile=function(t,r,n){"function"==typeof r&&(n=r,r=null);return function t(r,n,i,s){return e(r,n,(function(e){!e||"EMFILE"!==e.code&&"ENFILE"!==e.code?"function"==typeof i&&i.apply(this,arguments):it([t,[r,n,i],e,s||Date.now(),Date.now()])}))}(t,r,n)};var r=t.writeFile;t.writeFile=function(t,e,n,i){"function"==typeof n&&(i=n,n=null);return function t(e,n,i,s,o){return r(e,n,i,(function(r){!r||"EMFILE"!==r.code&&"ENFILE"!==r.code?"function"==typeof s&&s.apply(this,arguments):it([t,[e,n,i,s],r,o||Date.now(),Date.now()])}))}(t,e,n,i)};var n=t.appendFile;n&&(t.appendFile=function(t,e,r,i){"function"==typeof r&&(i=r,r=null);return function t(e,r,i,s,o){return n(e,r,i,(function(n){!n||"EMFILE"!==n.code&&"ENFILE"!==n.code?"function"==typeof s&&s.apply(this,arguments):it([t,[e,r,i,s],n,o||Date.now(),Date.now()])}))}(t,e,r,i)});var i=t.copyFile;i&&(t.copyFile=function(t,e,r,n){"function"==typeof r&&(n=r,r=0);return function t(e,r,n,s,o){return i(e,r,n,(function(i){!i||"EMFILE"!==i.code&&"ENFILE"!==i.code?"function"==typeof s&&s.apply(this,arguments):it([t,[e,r,n,s],i,o||Date.now(),Date.now()])}))}(t,e,r,n)});var s=t.readdir;t.readdir=function(t,e,r){"function"==typeof e&&(r=e,e=null);var n=o.test(process.version)?function(t,e,r,n){return s(t,i(t,e,r,n))}:function(t,e,r,n){return s(t,e,i(t,e,r,n))};return n(t,e,r);function i(t,e,r,i){return function(s,o){!s||"EMFILE"!==s.code&&"ENFILE"!==s.code?(o&&o.sort&&o.sort(),"function"==typeof r&&r.call(this,s,o)):it([n,[t,e,r],s,i||Date.now(),Date.now()])}}};var o=/^v[0-5]\./;if("v0.8"===process.version.substr(0,4)){var c=X(t);h=c.ReadStream,d=c.WriteStream}var a=t.ReadStream;a&&(h.prototype=Object.create(a.prototype),h.prototype.open=function(){var t=this;m(t.path,t.flags,t.mode,(function(e,r){e?(t.autoClose&&t.destroy(),t.emit("error",e)):(t.fd=r,t.emit("open",r),t.read())}))});var u=t.WriteStream;u&&(d.prototype=Object.create(u.prototype),d.prototype.open=function(){var t=this;m(t.path,t.flags,t.mode,(function(e,r){e?(t.destroy(),t.emit("error",e)):(t.fd=r,t.emit("open",r))}))}),Object.defineProperty(t,"ReadStream",{get:function(){return h},set:function(t){h=t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"WriteStream",{get:function(){return d},set:function(t){d=t},enumerable:!0,configurable:!0});
// legacy names
var l=h;Object.defineProperty(t,"FileReadStream",{get:function(){return l},set:function(t){l=t},enumerable:!0,configurable:!0});var f=d;function h(t,e){return this instanceof h?(a.apply(this,arguments),this):h.apply(Object.create(h.prototype),arguments)}function d(t,e){return this instanceof d?(u.apply(this,arguments),this):d.apply(Object.create(d.prototype),arguments)}Object.defineProperty(t,"FileWriteStream",{get:function(){return f},set:function(t){f=t},enumerable:!0,configurable:!0});var y=t.open;function m(t,e,r,n){return"function"==typeof r&&(n=r,r=null),function t(e,r,n,i,s){return y(e,r,n,(function(o,c){!o||"EMFILE"!==o.code&&"ENFILE"!==o.code?"function"==typeof i&&i.apply(this,arguments):it([t,[e,r,n,i],o,s||Date.now(),Date.now()])}))}(t,e,r,n)}return t.open=m,t}function it(t){Z("ENQUEUE",t[0].name,t[1]),U[Y].push(t),ot()}
// keep track of the timeout between retry() calls
// reset the startTime and lastTime to now
// this resets the start of the 60 second overall timeout as well as the
// delay between attempts so that we'll retry these jobs sooner
function st(){for(var t=Date.now(),e=0;e<U[Y].length;++e)
// entries that are only a length of 2 are from an older version, don't
// bother modifying those since they'll be retried anyway.
U[Y][e].length>2&&(U[Y][e][3]=t,// startTime
U[Y][e][4]=t);
// call retry to make sure we're actively processing the queue
ot()}function ot(){if(
// clear the timer and remove it to help prevent unintended concurrency
clearTimeout(et),et=void 0,0!==U[Y].length){var t=U[Y].shift(),e=t[0],r=t[1],n=t[2],i=t[3],s=t[4];
// if we don't have a startTime we have no way of knowing if we've waited
// long enough, so go ahead and retry this item now
if(void 0===i)Z("RETRY",e.name,r),e.apply(null,r);else if(Date.now()-i>=6e4){
// it's been more than 60 seconds total, bail now
Z("TIMEOUT",e.name,r);var o=r.pop();"function"==typeof o&&o.call(null,n)}else{
// the amount of time between the last attempt and right now
var c=Date.now()-s,a=Math.max(s-i,1);
// the amount of time between when we first tried, and when we last tried
// rounded up to at least 1
// it's been long enough since the last retry, do it again
c>=Math.min(1.2*a,100)?(Z("RETRY",e.name,r),e.apply(null,r.concat([i]))):
// if we can't do this job yet, push it to the end of the queue
// and let the next iteration check again
U[Y].push(t)}
// schedule our next run if one isn't already scheduled
void 0===et&&(et=setTimeout(ot,0))}}process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!U.__patched&&(rt=nt(U),U.__patched=!0),function(t){
// This is adapted from https://github.com/normalize/mz
// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
const e=L.fromCallback,r=rt,n=["access","appendFile","chmod","chown","close","copyFile","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","lchmod","lchown","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","symlink","truncate","unlink","utimes","writeFile"].filter((t=>"function"==typeof r[t]));
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
"function"==typeof r.realpath.native&&(t.realpath.native=e(r.realpath.native))}(I);var ct={},at=t=>{const e=process.versions.node.split(".").map((t=>parseInt(t,10)));return t=t.split(".").map((t=>parseInt(t,10))),e[0]>t[0]||e[0]===t[0]&&(e[1]>t[1]||e[1]===t[1]&&e[2]>=t[2])};const ut=I,lt=E,ft=at("10.12.0"),ht=t=>{if("win32"===process.platform){if(/[<>:"|?*]/.test(t.replace(lt.parse(t).root,""))){const e=new Error(`Path contains invalid characters: ${t}`);throw e.code="EINVAL",e}}},dt=t=>("number"==typeof t&&(t={mode:t}),{mode:511,...t}),yt=t=>{
// This replicates the exception of `fs.mkdir` with native the
// `recusive` option when run on an invalid drive under Windows.
const e=new Error(`operation not permitted, mkdir '${t}'`);return e.code="EPERM",e.errno=-4048,e.path=t,e.syscall="mkdir",e};ct.makeDir=async(t,e)=>{if(ht(t),e=dt(e),ft){const r=lt.resolve(t);return ut.mkdir(r,{mode:e.mode,recursive:!0})}const r=async t=>{try{await ut.mkdir(t,e.mode)}catch(e){if("EPERM"===e.code)throw e;if("ENOENT"===e.code){if(lt.dirname(t)===t)throw yt(t);if(e.message.includes("null bytes"))throw e;return await r(lt.dirname(t)),r(t)}try{if(!(await ut.stat(t)).isDirectory())
// This error is never exposed to the user
// it is caught below, and the original error is thrown
throw new Error("The path is not a directory")}catch{throw e}}};return r(lt.resolve(t))},ct.makeDirSync=(t,e)=>{if(ht(t),e=dt(e),ft){const r=lt.resolve(t);return ut.mkdirSync(r,{mode:e.mode,recursive:!0})}const r=t=>{try{ut.mkdirSync(t,e.mode)}catch(e){if("EPERM"===e.code)throw e;if("ENOENT"===e.code){if(lt.dirname(t)===t)throw yt(t);if(e.message.includes("null bytes"))throw e;return r(lt.dirname(t)),r(t)}try{if(!ut.statSync(t).isDirectory())
// This error is never exposed to the user
// it is caught below, and the original error is thrown
throw new Error("The path is not a directory")}catch{throw e}}};return r(lt.resolve(t))};const mt=L.fromPromise,{makeDir:pt,makeDirSync:wt}=ct,St=mt(pt);var vt={mkdirs:St,mkdirsSync:wt,
// alias
mkdirp:St,mkdirpSync:wt,ensureDir:St,ensureDirSync:wt};const Et=rt;var gt=function(t,e,r,n){
// if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
Et.open(t,"r+",((t,i)=>{if(t)return n(t);Et.futimes(i,e,r,(t=>{Et.close(i,(e=>{n&&n(t||e)}))}))}))},bt=function(t,e,r){const n=Et.openSync(t,"r+");return Et.futimesSync(n,e,r),Et.closeSync(n)};const kt=I,Ft=E,_t=w,Ot=at("10.5.0"),xt=t=>Ot?kt.stat(t,{bigint:!0}):kt.stat(t),Pt=t=>Ot?kt.statSync(t,{bigint:!0}):kt.statSync(t);function Dt(t,e){return Promise.all([xt(t),xt(e).catch((t=>{if("ENOENT"===t.code)return null;throw t}))]).then((([t,e])=>({srcStat:t,destStat:e})))}function Nt(t,e){if(e.ino&&e.dev&&e.ino===t.ino&&e.dev===t.dev){if(Ot||e.ino<Number.MAX_SAFE_INTEGER)
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
function Tt(t,e){const r=Ft.resolve(t).split(Ft.sep).filter((t=>t)),n=Ft.resolve(e).split(Ft.sep).filter((t=>t));return r.reduce(((t,e,r)=>t&&n[r]===e),!0)}function Ct(t,e,r){return`Cannot ${r} '${t}' to a subdirectory of itself, '${e}'.`}var It={checkPaths:function(t,e,r,n){_t.callbackify(Dt)(t,e,((i,s)=>{if(i)return n(i);const{srcStat:o,destStat:c}=s;return c&&Nt(o,c)?n(new Error("Source and destination must not be the same.")):o.isDirectory()&&Tt(t,e)?n(new Error(Ct(t,e,r))):n(null,{srcStat:o,destStat:c})}))},checkPathsSync:function(t,e,r){const{srcStat:n,destStat:i}=function(t,e){let r;const n=Pt(t);try{r=Pt(e)}catch(t){if("ENOENT"===t.code)return{srcStat:n,destStat:null};throw t}return{srcStat:n,destStat:r}}(t,e);if(i&&Nt(n,i))throw new Error("Source and destination must not be the same.");if(n.isDirectory()&&Tt(t,e))throw new Error(Ct(t,e,r));return{srcStat:n,destStat:i}}
// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
,checkParentPaths:function t(e,r,n,i,s){const o=Ft.resolve(Ft.dirname(e)),c=Ft.resolve(Ft.dirname(n));if(c===o||c===Ft.parse(c).root)return s();const a=(o,a)=>o?"ENOENT"===o.code?s():s(o):Nt(r,a)?s(new Error(Ct(e,n,i))):t(e,r,c,i,s);Ot?kt.stat(c,{bigint:!0},a):kt.stat(c,a)},checkParentPathsSync:function t(e,r,n,i){const s=Ft.resolve(Ft.dirname(e)),o=Ft.resolve(Ft.dirname(n));if(o===s||o===Ft.parse(o).root)return;let c;try{c=Pt(o)}catch(t){if("ENOENT"===t.code)return;throw t}if(Nt(r,c))throw new Error(Ct(e,n,i));return t(e,r,o,i)},isSrcSubdir:Tt};const Lt=rt,Rt=E,Mt=vt.mkdirsSync,jt=bt,zt=It;function qt(t,e,r,n){if(!n.filter||n.filter(e,r))return function(t,e,r,n){const i=n.dereference?Lt.statSync:Lt.lstatSync,s=i(e);if(s.isDirectory())return function(t,e,r,n,i){if(!e)return function(t,e,r,n){return Lt.mkdirSync(r),$t(e,r,n),Bt(r,t)}(t.mode,r,n,i);if(e&&!e.isDirectory())throw new Error(`Cannot overwrite non-directory '${n}' with directory '${r}'.`);return $t(r,n,i)}(s,t,e,r,n);if(s.isFile()||s.isCharacterDevice()||s.isBlockDevice())return function(t,e,r,n,i){return e?function(t,e,r,n){if(n.overwrite)return Lt.unlinkSync(r),At(t,e,r,n);if(n.errorOnExist)throw new Error(`'${r}' already exists`)}(t,r,n,i):At(t,r,n,i)}(s,t,e,r,n);if(s.isSymbolicLink())return function(t,e,r,n){let i=Lt.readlinkSync(e);n.dereference&&(i=Rt.resolve(process.cwd(),i));if(t){let t;try{t=Lt.readlinkSync(r)}catch(t){
// dest exists and is a regular file or directory,
// Windows may throw UNKNOWN error. If dest already exists,
// fs throws error anyway, so no need to guard against it here.
if("EINVAL"===t.code||"UNKNOWN"===t.code)return Lt.symlinkSync(i,r);throw t}if(n.dereference&&(t=Rt.resolve(process.cwd(),t)),zt.isSrcSubdir(i,t))throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${t}'.`);
// prevent copy if src is a subdir of dest since unlinking
// dest in this case would result in removing src contents
// and therefore a broken symlink would be created.
if(Lt.statSync(r).isDirectory()&&zt.isSrcSubdir(t,i))throw new Error(`Cannot overwrite '${t}' with '${i}'.`);return function(t,e){return Lt.unlinkSync(e),Lt.symlinkSync(t,e)}(i,r)}return Lt.symlinkSync(i,r)}(t,e,r,n)}(t,e,r,n)}function At(t,e,r,n){return Lt.copyFileSync(e,r),n.preserveTimestamps&&function(t,e,r){
// Make sure the file is writable before setting the timestamp
// otherwise open fails with EPERM when invoked with 'r+'
// (through utimes call)
(function(t){return 0==(128&t)})(t)&&function(t,e){Bt(t,128|e)}(r,t);(function(t,e){
// The initial srcStat.atime cannot be trusted
// because it is modified by the read(2) system call
// (See https://nodejs.org/api/fs.html#fs_stat_time_values)
const r=Lt.statSync(t);jt(e,r.atime,r.mtime)})(e,r)}(t.mode,e,r),Bt(r,t.mode)}function Bt(t,e){return Lt.chmodSync(t,e)}function $t(t,e,r){Lt.readdirSync(t).forEach((n=>function(t,e,r,n){const i=Rt.join(e,t),s=Rt.join(r,t),{destStat:o}=zt.checkPathsSync(i,s,"copy");return qt(o,i,s,n)}(n,t,e,r)))}var Jt={copySync:function(t,e,r){"function"==typeof r&&(r={filter:r}),(r=r||{}).clobber=!("clobber"in r)||!!r.clobber,// default to true for now
r.overwrite="overwrite"in r?!!r.overwrite:r.clobber,// overwrite falls back to clobber
// Warn about using preserveTimestamps on 32-bit node
r.preserveTimestamps&&"ia32"===process.arch&&console.warn("fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269");const{srcStat:n,destStat:i}=zt.checkPathsSync(t,e,"copy");return zt.checkParentPathsSync(t,n,e,"copy"),function(t,e,r,n){if(n.filter&&!n.filter(e,r))return;const i=Rt.dirname(r);Lt.existsSync(i)||Mt(i);return qt(t,e,r,n)}(i,t,e,r)}};const Wt=L.fromPromise,Yt=I;var Gt={pathExists:Wt((function(t){return Yt.access(t).then((()=>!0)).catch((()=>!1))})),pathExistsSync:Yt.existsSync};const Ut=rt,Vt=E,Xt=vt.mkdirs,Kt=Gt.pathExists,Ht=gt,Qt=It;function Zt(t,e,r,n,i){const s=Vt.dirname(r);Kt(s,((o,c)=>o?i(o):c?ee(t,e,r,n,i):void Xt(s,(s=>s?i(s):ee(t,e,r,n,i)))))}function te(t,e,r,n,i,s){Promise.resolve(i.filter(r,n)).then((o=>o?t(e,r,n,i,s):s()),(t=>s(t)))}function ee(t,e,r,n,i){return n.filter?te(re,t,e,r,n,i):re(t,e,r,n,i)}function re(t,e,r,n,i){(n.dereference?Ut.stat:Ut.lstat)(e,((s,o)=>s?i(s):o.isDirectory()?function(t,e,r,n,i,s){if(!e)return function(t,e,r,n,i){Ut.mkdir(r,(s=>{if(s)return i(s);oe(e,r,n,(e=>e?i(e):se(r,t,i)))}))}(t.mode,r,n,i,s);if(e&&!e.isDirectory())return s(new Error(`Cannot overwrite non-directory '${n}' with directory '${r}'.`));return oe(r,n,i,s)}(o,t,e,r,n,i):o.isFile()||o.isCharacterDevice()||o.isBlockDevice()?function(t,e,r,n,i,s){return e?function(t,e,r,n,i){if(!n.overwrite)return n.errorOnExist?i(new Error(`'${r}' already exists`)):i();Ut.unlink(r,(s=>s?i(s):ne(t,e,r,n,i)))}(t,r,n,i,s):ne(t,r,n,i,s)}(o,t,e,r,n,i):o.isSymbolicLink()?function(t,e,r,n,i){Ut.readlink(e,((e,s)=>e?i(e):(n.dereference&&(s=Vt.resolve(process.cwd(),s)),t?void Ut.readlink(r,((e,o)=>e?
// dest exists and is a regular file or directory,
// Windows may throw UNKNOWN error. If dest already exists,
// fs throws error anyway, so no need to guard against it here.
"EINVAL"===e.code||"UNKNOWN"===e.code?Ut.symlink(s,r,i):i(e):(n.dereference&&(o=Vt.resolve(process.cwd(),o)),Qt.isSrcSubdir(s,o)?i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${o}'.`)):
// do not copy if src is a subdir of dest since unlinking
// dest in this case would result in removing src contents
// and therefore a broken symlink would be created.
t.isDirectory()&&Qt.isSrcSubdir(o,s)?i(new Error(`Cannot overwrite '${o}' with '${s}'.`)):function(t,e,r){Ut.unlink(e,(n=>n?r(n):Ut.symlink(t,e,r)))}(s,r,i)))):Ut.symlink(s,r,i))))}(t,e,r,n,i):void 0))}function ne(t,e,r,n,i){Ut.copyFile(e,r,(s=>s?i(s):n.preserveTimestamps?function(t,e,r,n){
// Make sure the file is writable before setting the timestamp
// otherwise open fails with EPERM when invoked with 'r+'
// (through utimes call)
if(function(t){return 0==(128&t)}(t))return function(t,e,r){return se(t,128|e,r)}(r,t,(i=>i?n(i):ie(t,e,r,n)));return ie(t,e,r,n)}(t.mode,e,r,i):se(r,t.mode,i)))}function ie(t,e,r,n){!function(t,e,r){
// The initial srcStat.atime cannot be trusted
// because it is modified by the read(2) system call
// (See https://nodejs.org/api/fs.html#fs_stat_time_values)
Ut.stat(t,((t,n)=>t?r(t):Ht(e,n.atime,n.mtime,r)))}(e,r,(e=>e?n(e):se(r,t,n)))}function se(t,e,r){return Ut.chmod(t,e,r)}function oe(t,e,r,n){Ut.readdir(t,((i,s)=>i?n(i):ce(s,t,e,r,n)))}function ce(t,e,r,n,i){const s=t.pop();return s?function(t,e,r,n,i,s){const o=Vt.join(r,e),c=Vt.join(n,e);Qt.checkPaths(o,c,"copy",((e,a)=>{if(e)return s(e);const{destStat:u}=a;ee(u,o,c,i,(e=>e?s(e):ce(t,r,n,i,s)))}))}(t,s,e,r,n,i):i()}var ae=function(t,e,r,n){"function"!=typeof r||n?"function"==typeof r&&(r={filter:r}):(n=r,r={}),n=n||function(){},(r=r||{}).clobber=!("clobber"in r)||!!r.clobber,// default to true for now
r.overwrite="overwrite"in r?!!r.overwrite:r.clobber,// overwrite falls back to clobber
// Warn about using preserveTimestamps on 32-bit node
r.preserveTimestamps&&"ia32"===process.arch&&console.warn("fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269"),Qt.checkPaths(t,e,"copy",((i,s)=>{if(i)return n(i);const{srcStat:o,destStat:c}=s;Qt.checkParentPaths(t,o,e,"copy",(i=>i?n(i):r.filter?te(Zt,c,t,e,r,n):Zt(c,t,e,r,n)))}))};var ue={copy:(0,L.fromCallback)(ae)};const le=rt,fe=E,he=S,de="win32"===process.platform;function ye(t){["unlink","chmod","stat","lstat","rmdir","readdir"].forEach((e=>{t[e]=t[e]||le[e],t[e+="Sync"]=t[e]||le[e]})),t.maxBusyTries=t.maxBusyTries||3}function me(t,e,r){let n=0;"function"==typeof e&&(r=e,e={}),he(t,"rimraf: missing path"),he.strictEqual(typeof t,"string","rimraf: path should be a string"),he.strictEqual(typeof r,"function","rimraf: callback function required"),he(e,"rimraf: invalid options argument provided"),he.strictEqual(typeof e,"object","rimraf: options should be object"),ye(e),pe(t,e,(function i(s){if(s){if(("EBUSY"===s.code||"ENOTEMPTY"===s.code||"EPERM"===s.code)&&n<e.maxBusyTries){n++;
// try again, with the same exact callback as this one.
return setTimeout((()=>pe(t,e,i)),100*n)}
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
function pe(t,e,r){he(t),he(e),he("function"==typeof r),
// sunos lets the root user unlink directories, which is... weird.
// so we have to lstat here and make sure it's not a dir.
e.lstat(t,((n,i)=>n&&"ENOENT"===n.code?r(null):
// Windows can EPERM on stat.  Life is suffering.
n&&"EPERM"===n.code&&de?we(t,e,n,r):i&&i.isDirectory()?ve(t,e,n,r):void e.unlink(t,(n=>{if(n){if("ENOENT"===n.code)return r(null);if("EPERM"===n.code)return de?we(t,e,n,r):ve(t,e,n,r);if("EISDIR"===n.code)return ve(t,e,n,r)}return r(n)}))))}function we(t,e,r,n){he(t),he(e),he("function"==typeof n),e.chmod(t,438,(i=>{i?n("ENOENT"===i.code?null:r):e.stat(t,((i,s)=>{i?n("ENOENT"===i.code?null:r):s.isDirectory()?ve(t,e,r,n):e.unlink(t,n)}))}))}function Se(t,e,r){let n;he(t),he(e);try{e.chmodSync(t,438)}catch(t){if("ENOENT"===t.code)return;throw r}try{n=e.statSync(t)}catch(t){if("ENOENT"===t.code)return;throw r}n.isDirectory()?ge(t,e,r):e.unlinkSync(t)}function ve(t,e,r,n){he(t),he(e),he("function"==typeof n),
// try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
// if we guessed wrong, and it's not a directory, then
// raise the original error.
e.rmdir(t,(i=>{!i||"ENOTEMPTY"!==i.code&&"EEXIST"!==i.code&&"EPERM"!==i.code?i&&"ENOTDIR"===i.code?n(r):n(i):function(t,e,r){he(t),he(e),he("function"==typeof r),e.readdir(t,((n,i)=>{if(n)return r(n);let s,o=i.length;if(0===o)return e.rmdir(t,r);i.forEach((n=>{me(fe.join(t,n),e,(n=>{if(!s)return n?r(s=n):void(0==--o&&e.rmdir(t,r))}))}))}))}
// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
(t,e,n)}))}function Ee(t,e){let r;ye(e=e||{}),he(t,"rimraf: missing path"),he.strictEqual(typeof t,"string","rimraf: path should be a string"),he(e,"rimraf: missing options"),he.strictEqual(typeof e,"object","rimraf: options should be object");try{r=e.lstatSync(t)}catch(r){if("ENOENT"===r.code)return;
// Windows can EPERM on stat.  Life is suffering.
"EPERM"===r.code&&de&&Se(t,e,r)}try{
// sunos lets the root user unlink directories, which is... weird.
r&&r.isDirectory()?ge(t,e,null):e.unlinkSync(t)}catch(r){if("ENOENT"===r.code)return;if("EPERM"===r.code)return de?Se(t,e,r):ge(t,e,r);if("EISDIR"!==r.code)throw r;ge(t,e,r)}}function ge(t,e,r){he(t),he(e);try{e.rmdirSync(t)}catch(n){if("ENOTDIR"===n.code)throw r;if("ENOTEMPTY"===n.code||"EEXIST"===n.code||"EPERM"===n.code)!function(t,e){if(he(t),he(e),e.readdirSync(t).forEach((r=>Ee(fe.join(t,r),e))),!de){return e.rmdirSync(t,e)}{
// We only end up here once we got ENOTEMPTY at least once, and
// at this point, we are guaranteed to have removed all the kids.
// So, we know that it won't be ENOENT or ENOTDIR or anything else.
// try really hard to delete stuff on windows, because it has a
// PROFOUNDLY annoying habit of not closing handles promptly when
// files are deleted, resulting in spurious ENOTEMPTY errors.
const r=Date.now();do{try{return e.rmdirSync(t,e)}catch{}}while(Date.now()-r<500);// give up after 500ms
}}(t,e);else if("ENOENT"!==n.code)throw n}}var be=me;me.sync=Ee;const ke=be;var Fe={remove:(0,L.fromCallback)(ke),removeSync:ke.sync};const _e=L.fromCallback,Oe=rt,xe=E,Pe=vt,De=Fe,Ne=_e((function(t,e){e=e||function(){},Oe.readdir(t,((r,n)=>{if(r)return Pe.mkdirs(t,e);n=n.map((e=>xe.join(t,e))),function t(){const r=n.pop();if(!r)return e();De.remove(r,(r=>{if(r)return e(r);t()}))}()}))}));function Te(t){let e;try{e=Oe.readdirSync(t)}catch{return Pe.mkdirsSync(t)}e.forEach((e=>{e=xe.join(t,e),De.removeSync(e)}))}var Ce={emptyDirSync:Te,emptydirSync:Te,emptyDir:Ne,emptydir:Ne};const Ie=L.fromCallback,Le=E,Re=rt,Me=vt;var je={createFile:Ie((function(t,e){function r(){Re.writeFile(t,"",(t=>{if(t)return e(t);e()}))}Re.stat(t,((n,i)=>{// eslint-disable-line handle-callback-err
if(!n&&i.isFile())return e();const s=Le.dirname(t);Re.stat(s,((t,n)=>{if(t)
// if the directory doesn't exist, make it
return"ENOENT"===t.code?Me.mkdirs(s,(t=>{if(t)return e(t);r()})):e(t);n.isDirectory()?r():
// parent is not a directory
// This is just to cause an internal ENOTDIR error to be thrown
Re.readdir(s,(t=>{if(t)return e(t)}))}))}))})),createFileSync:function(t){let e;try{e=Re.statSync(t)}catch{}if(e&&e.isFile())return;const r=Le.dirname(t);try{Re.statSync(r).isDirectory()||
// parent is not a directory
// This is just to cause an internal ENOTDIR error to be thrown
Re.readdirSync(r)}catch(t){
// If the stat call above failed because the directory doesn't exist, create it
if(!t||"ENOENT"!==t.code)throw t;Me.mkdirsSync(r)}Re.writeFileSync(t,"")}};const ze=L.fromCallback,qe=E,Ae=rt,Be=vt,$e=Gt.pathExists;var Je={createLink:ze((function(t,e,r){function n(t,e){Ae.link(t,e,(t=>{if(t)return r(t);r(null)}))}$e(e,((i,s)=>i?r(i):s?r(null):void Ae.lstat(t,(i=>{if(i)return i.message=i.message.replace("lstat","ensureLink"),r(i);const s=qe.dirname(e);$e(s,((i,o)=>i?r(i):o?n(t,e):void Be.mkdirs(s,(i=>{if(i)return r(i);n(t,e)}))))}))))})),createLinkSync:function(t,e){if(Ae.existsSync(e))return;try{Ae.lstatSync(t)}catch(t){throw t.message=t.message.replace("lstat","ensureLink"),t}const r=qe.dirname(e);return Ae.existsSync(r)||Be.mkdirsSync(r),Ae.linkSync(t,e)}};const We=E,Ye=rt,Ge=Gt.pathExists;var Ue={symlinkPaths:
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
function(t,e,r){if(We.isAbsolute(t))return Ye.lstat(t,(e=>e?(e.message=e.message.replace("lstat","ensureSymlink"),r(e)):r(null,{toCwd:t,toDst:t})));{const n=We.dirname(e),i=We.join(n,t);return Ge(i,((e,s)=>e?r(e):s?r(null,{toCwd:i,toDst:t}):Ye.lstat(t,(e=>e?(e.message=e.message.replace("lstat","ensureSymlink"),r(e)):r(null,{toCwd:t,toDst:We.relative(n,t)})))))}},symlinkPathsSync:function(t,e){let r;if(We.isAbsolute(t)){if(r=Ye.existsSync(t),!r)throw new Error("absolute srcpath does not exist");return{toCwd:t,toDst:t}}{const n=We.dirname(e),i=We.join(n,t);if(r=Ye.existsSync(i),r)return{toCwd:i,toDst:t};if(r=Ye.existsSync(t),!r)throw new Error("relative srcpath does not exist");return{toCwd:t,toDst:We.relative(n,t)}}}};const Ve=rt;var Xe={symlinkType:function(t,e,r){if(r="function"==typeof e?e:r,e="function"!=typeof e&&e)return r(null,e);Ve.lstat(t,((t,n)=>{if(t)return r(null,"file");e=n&&n.isDirectory()?"dir":"file",r(null,e)}))},symlinkTypeSync:function(t,e){let r;if(e)return e;try{r=Ve.lstatSync(t)}catch{return"file"}return r&&r.isDirectory()?"dir":"file"}};const Ke=L.fromCallback,He=E,Qe=rt,Ze=vt.mkdirs,tr=vt.mkdirsSync,er=Ue.symlinkPaths,rr=Ue.symlinkPathsSync,nr=Xe.symlinkType,ir=Xe.symlinkTypeSync,sr=Gt.pathExists;var or={createSymlink:Ke((function(t,e,r,n){n="function"==typeof r?r:n,r="function"!=typeof r&&r,sr(e,((i,s)=>i?n(i):s?n(null):void er(t,e,((i,s)=>{if(i)return n(i);t=s.toDst,nr(s.toCwd,r,((r,i)=>{if(r)return n(r);const s=He.dirname(e);sr(s,((r,o)=>r?n(r):o?Qe.symlink(t,e,i,n):void Ze(s,(r=>{if(r)return n(r);Qe.symlink(t,e,i,n)}))))}))}))))})),createSymlinkSync:function(t,e,r){if(Qe.existsSync(e))return;const n=rr(t,e);t=n.toDst,r=ir(n.toCwd,r);const i=He.dirname(e);return Qe.existsSync(i)||tr(i),Qe.symlinkSync(t,e,r)}};var cr={
// file
createFile:je.createFile,createFileSync:je.createFileSync,ensureFile:je.createFile,ensureFileSync:je.createFileSync,
// link
createLink:Je.createLink,createLinkSync:Je.createLinkSync,ensureLink:Je.createLink,ensureLinkSync:Je.createLinkSync,
// symlink
createSymlink:or.createSymlink,createSymlinkSync:or.createSymlinkSync,ensureSymlink:or.createSymlink,ensureSymlinkSync:or.createSymlinkSync};var ar={stringify:function(t,{EOL:e="\n",finalEOL:r=!0,replacer:n=null,spaces:i}={}){const s=r?e:"";return JSON.stringify(t,n,i).replace(/\n/g,e)+s},stripBom:function(t){
// we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
return Buffer.isBuffer(t)&&(t=t.toString("utf8")),t.replace(/^\uFEFF/,"")}};let ur;try{ur=rt}catch(t){ur=f}const lr=L,{stringify:fr,stripBom:hr}=ar;const dr=lr.fromPromise((async function(t,e={}){"string"==typeof e&&(e={encoding:e});const r=e.fs||ur,n=!("throws"in e)||e.throws;let i,s=await lr.fromCallback(r.readFile)(t,e);s=hr(s);try{i=JSON.parse(s,e?e.reviver:null)}catch(e){if(n)throw e.message=`${t}: ${e.message}`,e;return null}return i}));const yr=lr.fromPromise((async function(t,e,r={}){const n=r.fs||ur,i=fr(e,r);await lr.fromCallback(n.writeFile)(t,i,r)}));const mr={readFile:dr,readFileSync:function(t,e={}){"string"==typeof e&&(e={encoding:e});const r=e.fs||ur,n=!("throws"in e)||e.throws;try{let n=r.readFileSync(t,e);return n=hr(n),JSON.parse(n,e.reviver)}catch(e){if(n)throw e.message=`${t}: ${e.message}`,e;return null}},writeFile:yr,writeFileSync:function(t,e,r={}){const n=r.fs||ur,i=fr(e,r);
// not sure if fs.writeFileSync returns anything, but just in case
return n.writeFileSync(t,i,r)}};var pr={
// jsonfile exports
readJson:mr.readFile,readJsonSync:mr.readFileSync,writeJson:mr.writeFile,writeJsonSync:mr.writeFileSync};const wr=L.fromCallback,Sr=rt,vr=E,Er=vt,gr=Gt.pathExists;var br={outputFile:wr((function(t,e,r,n){"function"==typeof r&&(n=r,r="utf8");const i=vr.dirname(t);gr(i,((s,o)=>s?n(s):o?Sr.writeFile(t,e,r,n):void Er.mkdirs(i,(i=>{if(i)return n(i);Sr.writeFile(t,e,r,n)}))))})),outputFileSync:function(t,...e){const r=vr.dirname(t);if(Sr.existsSync(r))return Sr.writeFileSync(t,...e);Er.mkdirsSync(r),Sr.writeFileSync(t,...e)}};const{stringify:kr}=ar,{outputFile:Fr}=br;var _r=async function(t,e,r={}){const n=kr(e,r);await Fr(t,n,r)};const{stringify:Or}=ar,{outputFileSync:xr}=br;var Pr=function(t,e,r){const n=Or(e,r);xr(t,n,r)};const Dr=L.fromPromise,Nr=pr;Nr.outputJson=Dr(_r),Nr.outputJsonSync=Pr,
// aliases
Nr.outputJSON=Nr.outputJson,Nr.outputJSONSync=Nr.outputJsonSync,Nr.writeJSON=Nr.writeJson,Nr.writeJSONSync=Nr.writeJsonSync,Nr.readJSON=Nr.readJson,Nr.readJSONSync=Nr.readJsonSync;var Tr=Nr;const Cr=rt,Ir=E,Lr=Jt.copySync,Rr=Fe.removeSync,Mr=vt.mkdirpSync,jr=It;function zr(t,e,r){try{Cr.renameSync(t,e)}catch(n){if("EXDEV"!==n.code)throw n;return function(t,e,r){const n={overwrite:r,errorOnExist:!0};return Lr(t,e,n),Rr(t)}(t,e,r)}}var qr={moveSync:function(t,e,r){const n=(r=r||{}).overwrite||r.clobber||!1,{srcStat:i}=jr.checkPathsSync(t,e,"move");return jr.checkParentPathsSync(t,i,e,"move"),Mr(Ir.dirname(e)),function(t,e,r){if(r)return Rr(e),zr(t,e,r);if(Cr.existsSync(e))throw new Error("dest already exists.");return zr(t,e,r)}(t,e,n)}};const Ar=rt,Br=E,$r=ue.copy,Jr=Fe.remove,Wr=vt.mkdirp,Yr=Gt.pathExists,Gr=It;function Ur(t,e,r,n){Ar.rename(t,e,(i=>i?"EXDEV"!==i.code?n(i):function(t,e,r,n){const i={overwrite:r,errorOnExist:!0};$r(t,e,i,(e=>e?n(e):Jr(t,n)))}(t,e,r,n):n()))}var Vr=function(t,e,r,n){"function"==typeof r&&(n=r,r={});const i=r.overwrite||r.clobber||!1;Gr.checkPaths(t,e,"move",((r,s)=>{if(r)return n(r);const{srcStat:o}=s;Gr.checkParentPaths(t,o,e,"move",(r=>{if(r)return n(r);Wr(Br.dirname(e),(r=>r?n(r):function(t,e,r,n){if(r)return Jr(e,(i=>i?n(i):Ur(t,e,r,n)));Yr(e,((i,s)=>i?n(i):s?n(new Error("dest already exists.")):Ur(t,e,r,n)))}(t,e,i,n)))}))}))};var Xr,Kr,Hr,Qr={move:(0,L.fromCallback)(Vr)};!function(t){t.exports={
// Export promiseified graceful-fs:
...I,
// Export extra methods:
...Jt,...ue,...Ce,...cr,...Tr,...vt,...qr,...Qr,...br,...Gt,...Fe};
// Export fs.promises as a getter property so that we don't trigger
// ExperimentalWarning before fs.promises is actually accessed.
const e=f;Object.getOwnPropertyDescriptor(e,"promises")&&Object.defineProperty(t.exports,"promises",{get:()=>e.promises})}(C);
/**
 * Collection
 *
 * A Generic collection class
 */
class Zr{_size;constructor(){this._size=0}get size(){return this._size}
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
 */class tn extends k{constructor(t="Collection error"){super(t)}}
/**
 * Node
 *
 * A Generic Node.
 */class en{value;_next;compare;constructor(t,e=null,r=null){this.value=t,this._next=e,this.compare=r||b}get hasNext(){return null!==this.next}get next(){return this._next}set next(t){this._next=t}compareTo(t){let e;switch(this.compare(this.value,t)){case-1:e=g.Less;break;case 1:e=g.Greater;break;default:e=g.Same}return e}}
/**
 * StackException
 *
 * A stack error.
 */class rn extends tn{constructor(t="Stack exception"){super(t)}}
/**
 * Stack
 *
 * A stack.
 */class nn extends Zr{top;compareFn;constructor(t=null){super(),this.top=null,this.compareFn=t
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
     */containsValue(t,e){return!!t&&(t.compareTo(e)===g.Same||this.containsValue(t.next,e))}
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
throw new rn;return this.top.value}
/**
     * pop()
     *
     * removes the next value in the stack.
     * @throws StackException when attempting to pop while the stack is empty.
     */pop(){if(this.isEmpty)
// nothing to pop
throw new rn;{const t=this.top.value;return this.top=this.top.next,this.setSize(this.size-1),t
/**
     * push()
     *
     * adds an item to the top of the stack.
     * @param item the item to add to the stack.
     */}}push(t){const e=new en(t,this.top,this.compareFn);this.top=e,this.setSize(this.size+1)}
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
 */class sn extends tn{constructor(t="Queue error"){super(t)}}
/**
 * Queue
 *
 * A Queue.
 */class on extends Zr{head;tail;compareFn;constructor(t=null){super(),this.head=null,this.tail=null,this.compareFn=t
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
     */containsValue(t,e){return!!t&&(t.compareTo(e)===g.Same||this.containsValue(t.next,e))}
/**
     * dequeue()
     *
     * removes an item from the queue.
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */dequeue(){if(this.head){const t=this.head.value;return this.head=this.head.next,this.head||(this.tail=null),this.setSize(this.size-1),t}
// nothing to remove.
throw new sn}
/**
     * enqueu()
     *
     * adds the value to the queue
     * @param value the value to add to the queue.
     */enqueue(t){const e=new en(t,null,this.compareFn);this.tail&&(this.tail.next=e),this.tail=e,this.head||(this.head=e),this.setSize(this.size+1)}
/**
     * peek()
     *
     * returns the next value in the queue without removing it.
     */peek(){if(this.head)return this.head.value;throw new sn}
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
 */class cn extends k{constructor(t="System Error"){super(t)}}
/**
 * PathException
 *
 * A general path error.
 */class an extends cn{constructor(t="Path Error"){super(t)}}
// A path instruction
!function(t){
// point to the home directory.
t[t.HomeDirectory=0]="HomeDirectory",
// point to the current directory
t[t.CurrentDirectory=1]="CurrentDirectory",
// Go back one step
t[t.BackStep=2]="BackStep"}(Xr||(Xr={}));
/**
 * Path
 *
 * A utility class for working with file and directory paths
 */
class un{
/**
     * Creates a Path instance.
     * @param value the value of the path.
     * @throws PathException when the path is invalid.
     */
constructor(t){const e=t.trim();if(!this.isValidPath(e))throw new an("Invalid Path: "+e);this._value=e.replace(/\\|\//g,v.sep)}
/**
     * FromSegments()
     *
     * Creates a Path from one or more segments.
     * @param segments the segnents of the path to create.
     * @returns the generated Path
     * @throws PathException when the segments are invalid.
     */static FromSegments(...t){try{const e=new nn;return un._BuildPath(t,e),new un(e.toArray().reverse().join(un.Separator))}catch(t){
// there was an error building the path.
throw t}}
/**
     * basename()
     *
     * gets the last portion of the path.
     */basename(){return new un(v.basename(this.toString()))}
/**
     * dirname()
     *
     * gets the directory name of the path.
     */dirname(){return new un(v.dirname(this.toString()))}equals(t){let e=!1;if(t instanceof un){const r=t;e=this.toString()===r.toString()}return e}
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
     */normalize(){return new un(v.normalize(this.toString()))}
/**
     * segments()
     *
     * returns an array consisting of the file segments.
     */segments(){return this.toString().split(un.Separator)}
/**
     * toNamespacedPath()
     *
     * gets an equivalent namespace-prefixed path.
     *
     * This method is meaningful only on Windows systems. On POSIX systems,
     * the method is non-operational and always returns path without modifications.
     */toNamespacedPath(){return new un(v.toNamespacedPath(this.toString()))}toString(){return this._value}
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
const e="win32"===process.platform;return!un.RESTRICTED.test(t)&&((!e||!un.WINDOWS_RESTRICTED.test(t))&&!un.POSIX_RESTRICTED.test(t))}
/**
     * _BuildPath()
     *
     * Creates a valid path string from the provided segments.
     * @param segments the segments to process.
     * @note The built path will be in reverse order.
     * @note This function needs to be redone to improve performance.
     * @throws PathException when the path is invalid.
     */static _BuildPath(t,e){if(t.length>0){const r=e.isEmpty,n=un._NormalizeSegment(t[0]);let i;for(;!n.isEmpty;)if(i=n.remove(),"string"==typeof i)e.push(i);else switch(i){case Xr.BackStep:if(r)throw new an("Cannot backtrack from root backtrack from root directory.");e.pop();break;case Xr.HomeDirectory:if(!r)throw new an("You can only specify the home directory in the beginning of the path.");e.push("~");break;default:
// here we know it is a Current Directory instruction
r&&e.push(process.cwd())}t.shift(),un._BuildPath(t,e)}}
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
let e=t.toString().split(/(?<!([/\\])[/\\])[/\\](?![/\\])/g);e=e.filter((t=>null!=t));const r=new on;return e.forEach((t=>{".."===t?
// backstep
r.add(Xr.BackStep):"."==t?
// current directory.
r.add(Xr.CurrentDirectory):["~","/","\\"].includes(t)?
// home directory.
r.add(Xr.HomeDirectory):r.add(t)})),r}}un.RESTRICTED=/[\[\]#%&{}<>?\s\b\0$!'"@|‘“+^`]/g,un.POSIX_RESTRICTED=/[\\:]/g,un.WINDOWS_RESTRICTED=/[\/]/g,
/**
 * Delimiter()
 *
 * Provides the platform-specific path delimiter.
 * - Windows: ";"
 * - POSIX: ":"
 */
un.Delimiter=v.delimiter,
/**
 * Separator
 *
 * gets he platform-specific path segment separator.
 * - Windows: \
 * - POSIX: /
 */
un.Separator=v.sep;
/**
 * FileSystemEntryException
 *
 * A Generic FileSystemEntry error.
 */
class ln extends cn{constructor(t="FileSystem Entry Error"){super(t)}}
/**
 * FileSystemEntryNotFoundException
 *
 * An error indicating a FileSystem Entry was not found.
 */class fn extends ln{constructor(t="FileSystem Entry Not Found."){super(t)}}
/**
 * FileSystemEntry
 *
 * A generic object or entry in the file system.
 */class hn{
/**
     * Creates an instance of FileSystemEnty.
     * @param path the path of the entry.
     * @throws PathException when the path is invalid.
     * @throws FileSystemEntryNotFoundException when the entry does not exist.
     */
constructor(t,e){this._path=t instanceof un?t:new un(t),this.stats=e,this._deleted=null}
/**
     * ForPath()
     *
     * Creates a pointer to the specified FileSystem Entry.
     * @param path the path to the entry
     * @returns the instance of the file system entry.
     * @throws FileSystemEntryNotFoundException when the filesystem entry does not exist.
     * @throws FileSystemEntryException when some error occurs.
     */static async ForPath(t){if(!await hn.Exists(t))throw new fn;
// get the stats for the path
let e;try{e=await hn.GetStats(t)}catch(t){throw new ln(t.message)}return new hn(t,e)}
/**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */static async Create(t,e){throw new F}
/**
     * Exists()
     *
     * determines if the path exists.
     * @returns TRUE if the file exists. False it it does not.
     */static async Exists(t){try{return await hn.GetStats(t),!0}catch(t){return!1}}
/**
    * GetStats()
    *
    * gets the stats of the entry.
    * @throws FileSystemEntryException when the operation fails.
    * @returns FileSystemEntryStats containing stats about the entry.
    */static async GetStats(e){try{const r=await t(e.toString(),{bigint:!1});return{dev:r.dev,ino:r.ino,mode:r.mode,nlink:r.nlink,uid:r.uid,gid:r.gid,rdev:r.rdev,size:r.size,blksize:r.blksize,blocks:r.blocks,atimeMs:r.atimeMs,mtimeMs:r.mtimeMs,ctimeMs:r.ctimeMs,birthtimeMs:r.birthtimeMs,atime:_.FromDate(r.atime,O.UTC()),mtime:_.FromDate(r.mtime,O.UTC()),ctime:_.FromDate(r.ctime,O.UTC()),birthtime:_.FromDate(r.birthtime,O.UTC()),isBlockDevice:r.isBlockDevice(),isCharacterDevice:r.isCharacterDevice(),isDirectory:r.isDirectory(),isFIFO:r.isFIFO(),isFile:r.isFile(),isSocket:r.isSocket(),isSymbolicLink:r.isSymbolicLink()}}catch(t){const r=t.code="",n=t.message;throw r?new fn(`Entry ${e.toString()} not found.`):new ln(n)}}get createdOn(){var t;return null===(t=this.stats)||void 0===t?void 0:t.birthtime}get deletedOn(){return this._deleted}get isDeleted(){return null!=this.deletedOn}get isDirectory(){return this.stats.isDirectory}get isFile(){return this.stats.isFile}get isLink(){return this.stats.isSymbolicLink}name(){return this.path.basename().toString()}get path(){return this._path}get updatedOn(){return this.stats.mtime}
/**
     * delete()
     *
     * deletes the directory.
     * @param options delete options.
     */async delete(t){this._deleted=_.Now()}equals(t){let e=!1;if(t instanceof hn){const r=t;e=this.path.equals(r.path)&&this.createdOn.equals(r.createdOn)&&this.updatedOn.equals(r.updatedOn)}return e}serialize(){return JSON.stringify({})}}
/**
 * FileException
 *
 * A Generic File Exception.
 */class dn extends ln{constructor(t="File Error"){super(t)}}
/**
 * FileNotFoundException
 *
 * An exception indicates a file is not found.
 */class yn extends dn{constructor(t="File Not Found"){super(t)}}
/**
 * FileAlreadyExistsException
 *
 * an error indicating a file already exists.
 */class mn extends dn{constructor(t="File already exists"){super(t)}}
/**
 * File
 *
 * A File
 */class pn extends hn{
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
     */static async Create(t,r){if(await pn.Exists(t))throw new mn;
// create the file.
const n=t instanceof un?t:new un(t.toString());try{await e(n.toString(),"")}catch(t){throw new dn(t.message)}return pn.ForPath(n)}
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
     */static async ForPath(t){try{if(!await pn.Exists(t))throw new yn;
// get the stats
const e=await pn.GetStats(t);
// return the reference
return new pn(t,e)}catch(t){throw t instanceof ln?new dn(t.message):t}}
/**
     * copy()
     *
     * copies the directory to the specified path.
     * @param to the destination to copy the file to.
     * @param options copy options.
     * @throws FileException when the file is deleted.
     */async copy(t,e){
// resolve the arguments.
const n=t instanceof un?t:new un(t);let i;i=e?{mode:e.mode?e.mode:null,override:!!e.override&&e.override}:{mode:null,override:!1};
// make sure the destination file does not already exist.
if(await hn.Exists(n))throw new mn;
// make sure the file has not been deleted.
if(this.isDeleted)throw new dn;
// copy the file.
try{await r(this.path.toString(),n.toString(),i.mode)}catch(t){throw new dn(t.message)}}
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
try{await n(this.path.toString(),{force:e.force,recursive:e.recursive}),super.delete()}catch(t){throw new dn(t.message)}}equals(t){return t instanceof pn&&super.equals(t)}
/**
     * move()
     *
     * moves the filesystem entry to the specified path.
     * @param to the destination to move the filesystem entry to.
     * @param options move options.
     * @returns the copied FilSystem Entry.
     */async move(t,e){const r=t instanceof un?t:new un(t);let n;n=e?{override:!!e.override&&e.override}:{override:!1};
// make sure the destination is available.
const s=await hn.Exists(r);if(s)throw new mn;if(s&&!n.override)throw new mn;
// move the file.
try{return await i(this.path.toString(),r.toString()),await pn.ForPath(r)}catch(t){throw new dn(t.message)}}
/**
     * rename()
     *
     * renames the filesystem entry.
     * @param newName the new name of the directory.
     * @throws PathException when the new name is invalid.
     * @throws FileException when the operation encounters an error.
     */async rename(t){
// resolve the new file path.
const e=un.FromSegments(this.path.dirname(),t);
// rename the file.
try{return await i(this.path.toString(),e.toString()),await pn.ForPath(e)}catch(t){throw new dn(t.message)}}serialize(){return JSON.stringify({path:this.path.toString(),created_on:this.createdOn.toString(),updated_on:this.updatedOn.toString()})}}
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
t[t.FICLONE_FORCE=h.COPYFILE_FICLONE_FORCE]="FICLONE_FORCE"}(Kr||(Kr={})),function(t){t.File="file",t.Directory="dir",t.Junction="junction"}(Hr||(Hr={}));
/**
 * LinkException
 *
 * A General Link error
 */
class wn extends ln{constructor(t="Link Error"){super(t)}}
/**
 * LinkNotFoundException
 */class Sn extends wn{constructor(t="Link Not Found"){super(t)}}
/**
 * LinkAlreadyExistsException
 */class vn extends wn{constructor(t="Link already exists"){super(t)}}
/**
 * Link
 *
 * A Symbolic Link
 */class En extends hn{
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
if(await En.Exists(t))throw new vn;
// create the Link.
const i=t instanceof un?t:new un(t.toString()),o=e instanceof un?e:new un(e);let c;c=r?{type:r.type?r.type:Hr.File}:{type:Hr.File};try{await s(o.toString(),i.toString(),null===(n=c.type)||void 0===n?void 0:n.toString())}catch(t){throw new wn(t.message)}return await En.ForPath(i)}
/**
     * Exist()
     *
     * determines if the symbolic specified by the path exists.
     * @param path the path to check.
     * @returns TRUE if the directory exists. FALSE otherwise.
     * @throws DirectoryException if an error occurs performing the operation.
     */static async Exists(t){try{const e=await super.Exists(t),r=await En.GetStats(t);return e&&r.isSymbolicLink}catch(t){throw new wn(t.message)}}
/**
     * ForPath()
     *
     * Creates a reference to a directory specified by the path.
     * @param path the path to the directory.
     * @returns An instance of the directory.
     * @throws DirectoryNotFoundException when the directory is not found.
     * @throws DirectoryException when the operation fails.
     */static async ForPath(t){try{if(!await En.Exists(t))throw new Sn;
// get the stats
const e=await En.GetStats(t);
// return the reference
return new En(t,e)}catch(t){throw t instanceof ln?new wn(t.message):t}}
/**
     * delete()
     *
     * deletes the directory.
     * @returns the deleted directory.
     * @param options delete options.
     */async delete(t){
// delete the link.
try{await o(this.path.toString()),super.delete()}catch(t){throw new wn(t.message)}}equals(t){return t instanceof En&&super.equals(t)}
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
     */async target(){if(!this._target)try{const t=await c(this.path.toString());this._target=new un(t)}catch(t){throw new wn(t.message)}return this._target}}
/**
 * DirectoryException
 *
 * A general directory error.
 */class gn extends ln{constructor(t="Directory Error"){super(t)}}
/**
 * DirectoryNotFoundException
 *
 * An exception indicating a directory cannot be found.
 */class bn extends gn{constructor(t="Directory Not Found"){super(t)}}
/**
 * DirectoryAlreadyExistsException
 *
 * An exception indicating a directory already exists.
 */class kn extends gn{constructor(t="Directory Already Exists"){super(t)}}
/**
 * Directory
 *
 * A File system Directory.
 */class Fn extends hn{
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
     */static async Create(t,e){if(await Fn.Exists(t))throw new kn;
// create the directory.
const r=t instanceof un?t:new un(t.toString());try{await a(r.toString(),{recursive:!0})}catch(t){throw new gn(t.message)}return Fn.ForPath(r)}
/**
     * ForPath()
     *
     * Creates a reference to a directory specified by the path.
     * @param path the path to the directory.
     * @returns An instance of the directory.
     * @throws DirectoryNotFoundException when the directory is not found.
     * @throws DirectoryException when the operation fails.
     */static async ForPath(t){try{if(!await Fn.Exists(t))throw new bn;
// get the stats
const e=await Fn.GetStats(t);
// return the reference
return new Fn(t,e)}catch(t){throw t instanceof ln?new gn(t.message):t}}
/**
     * Current()
     *
     * Gets the current working directory.
     * @returns The current working directory.
     */static async Current(){return await Fn.ForPath(process.cwd())}
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
     */async convertToObjects(t){const e=new Array;let r;return await Promise.all(t.map((async t=>{const n=await hn.ForPath(t);r=n.stats.isDirectory?await Fn.ForPath(n.path):n.isFile?await pn.ForPath(n.path):await En.ForPath(n.path),e.push(r)}))),e}
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
const n=t instanceof un?t:new un(t.toString());if(await hn.Exists(n))throw new kn;
// copy the directory.
try{await T.copy(this.path.toString(),n.toString(),{recursive:r.recursive,overwrite:r.overwrite,errorOnExist:!0})}catch(t){
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
try{await l(this.path.toString(),{recursive:e.recursive,maxRetries:e.maxRetries,retryDelay:e.retryDelay}),await super.delete()}catch(t){throw new gn(t.message)}}equals(t){return t instanceof Fn&&super.equals(t)}
/**
     * move()
     *
     * moves the filesystem entry to the specified path.
     * @param to the destination to move the filesystem entry to.
     * @param options move options.
     * @returns the copied movable object.
     * @throws DirectoryAlreadyExistsException when the destination already exists.
     * @throws DirectoryException when the operation fails.
     */async move(t,e){const r=t instanceof un?t:new un(t);let n;n=e?{overwrite:!!e.overwrite&&e.overwrite}:{overwrite:!1};
// make sure the destination is available.
const i=await hn.Exists(r);if(i)throw new kn;if(i&&!n.overwrite)throw new kn;
// move the file.
try{return await T.move(this.path.toString(),r.toString(),{overwrite:n.overwrite}),await Fn.ForPath(r)}catch(t){throw new gn(t.message)}}
/**
     * rename()
     *
     * renames the filesystem entry.
     * @param newName the new name of the directory.
     */async rename(t){
// resolve the new file path.
const e=un.FromSegments(this.path.dirname(),t);
// rename the file.
try{return await i(this.path.toString(),e.toString()),Fn.ForPath(e)}catch(t){throw new gn(t.message)}}serialize(){return JSON.stringify({path:this.path.toString(),created_on:this.createdOn.toString(),updated_on:this.updatedOn.toString()})}}class _n extends cn{constructor(t="File Stream Error"){super(t)}}
/**
 * FileStreamDataException
 *
 * File Stream Data error
 */class On extends _n{constructor(t="Stream Data Error"){super(t)}}class xn{constructor(t,e){this.file=t,this.encoding=e}equals(t){let e=!1;if(t instanceof xn){const r=t;e=this.file.equals(r.file)}return e}toString(){return`Stream for file ${this.file.path.toString()}`}}
/**
 * FileReader
 *
 * A FileReader class
 */class Pn extends xn{
/**
     * Creates a FileReader stream.
     * @param file the file to read.
     * @param options options for reading a file.
     */
constructor(t,e={encoding:"utf-8"}){super(t,e.encoding),this._isClosed=!1,this._bytesRead=0,this._fileSize=t.stats.size,this._stream=d(this.file.path.toString(),{encoding:this.encoding,autoClose:!0}),this._stream.pause()}
/**
     * all()
     *
     * reads all the data in the stream.
     * @throws FileStreamException when the stream cannot be read (i.e. It was closed)
     */all(){if(this._isClosed)throw new _n;let t,e="";for(;t=this._stream.read();)e+=t.toString(this.encoding);return e}
/**
     * close()
     *
     * closes the file stream.
     */async close(){this._stream.close(),this._isClosed=!0}equals(t){let e=!1;if(t instanceof Pn){const r=t;e=super.equals(r)&&this.encoding===r.encoding}return e}
/**
     * hasNext()
     *
     * determines if there is still data left to be read.
     */async hasNext(){return this._bytesRead<this._fileSize}
/**
     * next()
     *
     * gets data from the buffer, of the specified size.
     * @param size the size of data to get in bytes.
     * @param encoding the encoding
     * @return the data.
     */async next(t=64){if(this._isClosed)throw new _n;t=t>Pn.MAX_BYTES?Pn.MAX_BYTES:t;const e=this._stream.read(t);if(e)return this._bytesRead+=t,e.toString(this.encoding);
// no data to read.
throw new On("No data to read")}}
// the maximum byte size supported is 1GiB
Pn.MAX_BYTES=1073741824;
/**
 * FileWriter
 *
 * A FileWriter
 */
class Dn extends xn{constructor(t,e={encoding:"utf-8",batch:{size:30}}){super(t,e.encoding),this._isClosed=!1,this._numWrites=0,this._stream=y(this.file.path.toString(),{encoding:this.encoding,autoClose:!0}),this._batchWrites=!!(e.batch&&e.batch.size>0),this._batchWrites?(this._stream.cork(),this._batchSize=Math.abs(e.batch.size),this._streamIsCorked=!0):(this._batchSize=null,this._streamIsCorked=!1)}
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
this._stream.write(t,(t=>{if(t)throw new On(t.message);this._numWrites++})),
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
 */class Nn extends cn{constructor(t="Process Error"){super(t)}}
/**
 * ProcessFailedException
 *
 * An Error indicating a process has failed.
 */class Tn extends Nn{constructor(t="Process exited with non-zero code",e=-1){super(t),this.code=e}}
/**
 * Process
 *
 * The process object
 */class Cn{constructor(t,e){this.childProcess=t,this._forked=e,this._isKilled=!1,this._exitCode=null,this.childProcess.on("exit",(t=>{this._exitCode=t}))}
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
let r;return r=e?{cwd:e.cwd,env:e.env?e.env:process.env}:e,new Promise(((e,n)=>{x(t,{cwd:r.cwd.toString(),env:r.env},((t,r)=>{t&&n(new Tn(t.message,t.code)),e(r)}))}))}
/**
     * Start()
     *
     * creates a new child process
     */static Start(t,e={cwd:process.cwd(),arguments:[],fork:!1,env:process.env,serializationType:"json"}){
// resolve options
let r,n;return r=e?{arguments:e.arguments?e.arguments:[],fork:!!e.fork&&e.fork,cwd:e.cwd?e.cwd:process.cwd(),env:e.env?e.env:process.env,serializationType:e.serializationType?e.serializationType:"json"}:{cwd:process.cwd(),arguments:[],fork:!1,env:process.env,serializationType:"json"},n=r.fork?P(t,{cwd:r.cwd.toString(),env:r.env,execArgv:r.arguments,serialization:r.serializationType}):D(t,r.arguments,{cwd:r.cwd.toString(),env:r.env,serialization:r.serializationType}),new Cn(n,r.fork)}
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
     */canBeMessaged(){return this.childProcess.connected}equals(t){let e=!1;if(t instanceof Cn){const r=t;e=this.id()===r.id()}return e}
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
     */kill(t="SIGTERM"){if(this._isKilled=this.childProcess.kill(t),!this._isKilled)throw new Nn("Failed to kill process with UD "+this.toString())}
/**
     * sendMessage()
     *
     * sends a message to the child process.
     * @throws ProcessException when the message cannot be sent, like if there is no connection to the child/parent process.
     */sendMessage(t){return new Promise(((e,r)=>{this.canBeMessaged()?this.childProcess.send(t,(t=>{t?r(new Nn(t.message)):e()})):r(new Nn("Message cannot be sent"))}))}toString(){return this.id().toString()}}export{Kr as CopyFileMode,Fn as Directory,kn as DirectoryAlreadyExistsException,gn as DirectoryException,bn as DirectoryNotFoundException,pn as File,mn as FileAlreadyExistsException,dn as FileException,yn as FileNotFoundException,Pn as FileReader,xn as FileStream,On as FileStreamDataException,_n as FileStreamException,hn as FileSystemEntry,ln as FileSystemEntryException,fn as FileSystemEntryNotFoundException,Dn as FileWriter,En as Link,vn as LinkAlreadyExistsException,wn as LinkException,Sn as LinkNotFoundException,Hr as LinkType,un as Path,an as PathException,Cn as Process,Nn as ProcessException,Tn as ProcessFailedException,cn as SystemException};
