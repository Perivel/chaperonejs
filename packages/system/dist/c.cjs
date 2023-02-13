"use strict";var t=require("fs/promises"),e=require("fs"),r=require("constants"),n=require("stream"),i=require("util"),s=require("assert"),o=require("path"),c=require("@chaperone/util"),a=require("child_process");function u(t){var e=Object.create(null);return t&&Object.keys(t).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:function(){return t[r]}})}})),e.default=t,Object.freeze(e)}var l=u(o),f="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},h={},d={get exports(){return h},set exports(t){h=t}},p={},y={fromCallback:function(t){return Object.defineProperty((function(...e){if("function"!=typeof e[e.length-1])return new Promise(((r,n)=>{t.call(this,...e,((t,e)=>null!=t?n(t):r(e)))}));t.apply(this,e)}),"name",{value:t.name})},fromPromise:function(t){return Object.defineProperty((function(...e){const r=e[e.length-1];if("function"!=typeof r)return t.apply(this,e);t.apply(this,e.slice(0,-1)).then((t=>r(null,t)),r)}),"name",{value:t.name})}},m=r,w=process.cwd,S=null,v=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return S||(S=w.call(process)),S};try{process.cwd()}catch(t){}
// This check is needed until node.js 12 is required
if("function"==typeof process.chdir){var E=process.chdir;process.chdir=function(t){S=null,E.call(process,t)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,E)}var g=function(t){
// (re-)implement some things that are known busted or missing.
// lchmod, broken prior to 0.6.2
// back-port the fix here.
m.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&function(t){t.lchmod=function(e,r,n){t.open(e,m.O_WRONLY|m.O_SYMLINK,r,(function(e,i){e?n&&n(e):
// prefer to return the chmod error, if one occurs,
// but still try to close, and report closing errors if they occur.
t.fchmod(i,r,(function(e){t.close(i,(function(t){n&&n(e||t)}))}))}))},t.lchmodSync=function(e,r){var n,i=t.openSync(e,m.O_WRONLY|m.O_SYMLINK,r),s=!0;
// prefer to return the chmod error, if one occurs,
// but still try to close, and report closing errors if they occur.
try{n=t.fchmodSync(i,r),s=!1}finally{if(s)try{t.closeSync(i)}catch(t){}else t.closeSync(i)}return n}}(t);
// lutimes implementation, or no-op
t.lutimes||function(t){m.hasOwnProperty("O_SYMLINK")&&t.futimes?(t.lutimes=function(e,r,n,i){t.open(e,m.O_SYMLINK,(function(e,s){e?i&&i(e):t.futimes(s,r,n,(function(e){t.close(s,(function(t){i&&i(e||t)}))}))}))},t.lutimesSync=function(e,r,n){var i,s=t.openSync(e,m.O_SYMLINK),o=!0;try{i=t.futimesSync(s,r,n),o=!1}finally{if(o)try{t.closeSync(s)}catch(t){}else t.closeSync(s)}return i}):t.futimes&&(t.lutimes=function(t,e,r,n){n&&process.nextTick(n)},t.lutimesSync=function(){})}(t);
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
"win32"===v&&(t.rename="function"!=typeof t.rename?t.rename:function(e){function r(r,n,i){var s=Date.now(),o=0;e(r,n,(function c(a){if(a&&("EACCES"===a.code||"EPERM"===a.code)&&Date.now()-s<6e4)return setTimeout((function(){t.stat(n,(function(t,s){t&&"ENOENT"===t.code?e(r,n,c):i(a)}))}),o),void(o<100&&(o+=10));i&&i(a)}))}return Object.setPrototypeOf&&Object.setPrototypeOf(r,e),r}(t.rename));
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
return Object.setPrototypeOf&&Object.setPrototypeOf(r,e),r}(t.read),t.readSync="function"!=typeof t.readSync?t.readSync:(a=t.readSync,function(e,r,n,i,s){for(var o=0;;)try{return a.call(t,e,r,n,i,s)}catch(t){if("EAGAIN"===t.code&&o<10){o++;continue}throw t}});var a};var k=n.Stream,b=function(t){return{ReadStream:function e(r,n){if(!(this instanceof e))return new e(r,n);k.call(this);var i=this;this.path=r,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,/*=0666*/
this.bufferSize=65536,n=n||{};for(
// Mixin options into this
var s=Object.keys(n),o=0,c=s.length;o<c;o++){var a=s[o];this[a]=n[a]}this.encoding&&this.setEncoding(this.encoding);if(void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(void 0===this.end)this.end=1/0;else if("number"!=typeof this.end)throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}if(null!==this.fd)return void process.nextTick((function(){i._read()}));t.open(this.path,this.flags,this.mode,(function(t,e){if(t)return i.emit("error",t),void(i.readable=!1);i.fd=e,i.emit("open",e),i._read()}))},WriteStream:function e(r,n){if(!(this instanceof e))return new e(r,n);k.call(this),this.path=r,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,/*=0666*/
this.bytesWritten=0,n=n||{};for(
// Mixin options into this
var i=Object.keys(n),s=0,o=i.length;s<o;s++){var c=i[s];this[c]=n[c]}if(void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],null===this.fd&&(this._open=t.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}};var x=function(t){if(null===t||"object"!=typeof t)return t;if(t instanceof Object)var e={__proto__:_(t)};else e=Object.create(null);return Object.getOwnPropertyNames(t).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e},_=Object.getPrototypeOf||function(t){return t.__proto__};var F,O,D=e,N=g,P=b,T=x,C=i;function L(t,e){Object.defineProperty(t,F,{get:function(){return e}})}
/* istanbul ignore else - node 0.x polyfill */
"function"==typeof Symbol&&"function"==typeof Symbol.for?(F=Symbol.for("graceful-fs.queue"),
// This is used in testing by future versions
O=Symbol.for("graceful-fs.previous")):(F="___graceful-fs.queue",O="___graceful-fs.previous");var I=function(){};
// Once time initialization
if(C.debuglog?I=C.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(I=function(){var t=C.format.apply(C,arguments);t="GFS4: "+t.split(/\n/).join("\nGFS4: "),console.error(t)}),!D[F]){
// This queue can be shared by multiple loaded instances
var R=f[F]||[];L(D,R),
// Patch fs.close/closeSync to shared queue version, because we need
// to retry() whenever a close happens *anywhere* in the program.
// This is essential when multiple graceful-fs instances are
// in play at the same time.
D.close=function(t){function e(e,r){return t.call(D,e,(function(t){
// This function uses the graceful-fs shared queue
t||A(),"function"==typeof r&&r.apply(this,arguments)}))}return Object.defineProperty(e,O,{value:t}),e}(D.close),D.closeSync=function(t){function e(e){
// This function uses the graceful-fs shared queue
t.apply(D,arguments),A()}return Object.defineProperty(e,O,{value:t}),e}(D.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",(function(){I(D[F]),s.equal(D[F].length,0)}))}f[F]||L(f,D[F]);var M,z=j(T(D));function j(t){
// Everything that references the open() function needs to be in here
N(t),t.gracefulify=j,t.createReadStream=function(e,r){return new t.ReadStream(e,r)},t.createWriteStream=function(e,r){return new t.WriteStream(e,r)};var e=t.readFile;t.readFile=function(t,r,n){"function"==typeof r&&(n=r,r=null);return function t(r,n,i,s){return e(r,n,(function(e){!e||"EMFILE"!==e.code&&"ENFILE"!==e.code?"function"==typeof i&&i.apply(this,arguments):q([t,[r,n,i],e,s||Date.now(),Date.now()])}))}(t,r,n)};var r=t.writeFile;t.writeFile=function(t,e,n,i){"function"==typeof n&&(i=n,n=null);return function t(e,n,i,s,o){return r(e,n,i,(function(r){!r||"EMFILE"!==r.code&&"ENFILE"!==r.code?"function"==typeof s&&s.apply(this,arguments):q([t,[e,n,i,s],r,o||Date.now(),Date.now()])}))}(t,e,n,i)};var n=t.appendFile;n&&(t.appendFile=function(t,e,r,i){"function"==typeof r&&(i=r,r=null);return function t(e,r,i,s,o){return n(e,r,i,(function(n){!n||"EMFILE"!==n.code&&"ENFILE"!==n.code?"function"==typeof s&&s.apply(this,arguments):q([t,[e,r,i,s],n,o||Date.now(),Date.now()])}))}(t,e,r,i)});var i=t.copyFile;i&&(t.copyFile=function(t,e,r,n){"function"==typeof r&&(n=r,r=0);return function t(e,r,n,s,o){return i(e,r,n,(function(i){!i||"EMFILE"!==i.code&&"ENFILE"!==i.code?"function"==typeof s&&s.apply(this,arguments):q([t,[e,r,n,s],i,o||Date.now(),Date.now()])}))}(t,e,r,n)});var s=t.readdir;t.readdir=function(t,e,r){"function"==typeof e&&(r=e,e=null);var n=o.test(process.version)?function(t,e,r,n){return s(t,i(t,e,r,n))}:function(t,e,r,n){return s(t,e,i(t,e,r,n))};return n(t,e,r);function i(t,e,r,i){return function(s,o){!s||"EMFILE"!==s.code&&"ENFILE"!==s.code?(o&&o.sort&&o.sort(),"function"==typeof r&&r.call(this,s,o)):q([n,[t,e,r],s,i||Date.now(),Date.now()])}}};var o=/^v[0-5]\./;if("v0.8"===process.version.substr(0,4)){var c=P(t);h=c.ReadStream,d=c.WriteStream}var a=t.ReadStream;a&&(h.prototype=Object.create(a.prototype),h.prototype.open=function(){var t=this;y(t.path,t.flags,t.mode,(function(e,r){e?(t.autoClose&&t.destroy(),t.emit("error",e)):(t.fd=r,t.emit("open",r),t.read())}))});var u=t.WriteStream;u&&(d.prototype=Object.create(u.prototype),d.prototype.open=function(){var t=this;y(t.path,t.flags,t.mode,(function(e,r){e?(t.destroy(),t.emit("error",e)):(t.fd=r,t.emit("open",r))}))}),Object.defineProperty(t,"ReadStream",{get:function(){return h},set:function(t){h=t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"WriteStream",{get:function(){return d},set:function(t){d=t},enumerable:!0,configurable:!0});
// legacy names
var l=h;Object.defineProperty(t,"FileReadStream",{get:function(){return l},set:function(t){l=t},enumerable:!0,configurable:!0});var f=d;function h(t,e){return this instanceof h?(a.apply(this,arguments),this):h.apply(Object.create(h.prototype),arguments)}function d(t,e){return this instanceof d?(u.apply(this,arguments),this):d.apply(Object.create(d.prototype),arguments)}Object.defineProperty(t,"FileWriteStream",{get:function(){return f},set:function(t){f=t},enumerable:!0,configurable:!0});var p=t.open;function y(t,e,r,n){return"function"==typeof r&&(n=r,r=null),function t(e,r,n,i,s){return p(e,r,n,(function(o,c){!o||"EMFILE"!==o.code&&"ENFILE"!==o.code?"function"==typeof i&&i.apply(this,arguments):q([t,[e,r,n,i],o,s||Date.now(),Date.now()])}))}(t,e,r,n)}return t.open=y,t}function q(t){I("ENQUEUE",t[0].name,t[1]),D[F].push(t),B()}
// keep track of the timeout between retry() calls
// reset the startTime and lastTime to now
// this resets the start of the 60 second overall timeout as well as the
// delay between attempts so that we'll retry these jobs sooner
function A(){for(var t=Date.now(),e=0;e<D[F].length;++e)
// entries that are only a length of 2 are from an older version, don't
// bother modifying those since they'll be retried anyway.
D[F][e].length>2&&(D[F][e][3]=t,// startTime
D[F][e][4]=t);
// call retry to make sure we're actively processing the queue
B()}function B(){if(
// clear the timer and remove it to help prevent unintended concurrency
clearTimeout(M),M=void 0,0!==D[F].length){var t=D[F].shift(),e=t[0],r=t[1],n=t[2],i=t[3],s=t[4];
// if we don't have a startTime we have no way of knowing if we've waited
// long enough, so go ahead and retry this item now
if(void 0===i)I("RETRY",e.name,r),e.apply(null,r);else if(Date.now()-i>=6e4){
// it's been more than 60 seconds total, bail now
I("TIMEOUT",e.name,r);var o=r.pop();"function"==typeof o&&o.call(null,n)}else{
// the amount of time between the last attempt and right now
var c=Date.now()-s,a=Math.max(s-i,1);
// the amount of time between when we first tried, and when we last tried
// rounded up to at least 1
// it's been long enough since the last retry, do it again
c>=Math.min(1.2*a,100)?(I("RETRY",e.name,r),e.apply(null,r.concat([i]))):
// if we can't do this job yet, push it to the end of the queue
// and let the next iteration check again
D[F].push(t)}
// schedule our next run if one isn't already scheduled
void 0===M&&(M=setTimeout(B,0))}}process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!D.__patched&&(z=j(D),D.__patched=!0),function(t){
// This is adapted from https://github.com/normalize/mz
// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
const e=y.fromCallback,r=z,n=["access","appendFile","chmod","chown","close","copyFile","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","lchmod","lchown","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","symlink","truncate","unlink","utimes","writeFile"].filter((t=>"function"==typeof r[t]));
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
"function"==typeof r.realpath.native&&(t.realpath.native=e(r.realpath.native))}(p);var W={},J=t=>{const e=process.versions.node.split(".").map((t=>parseInt(t,10)));return t=t.split(".").map((t=>parseInt(t,10))),e[0]>t[0]||e[0]===t[0]&&(e[1]>t[1]||e[1]===t[1]&&e[2]>=t[2])};const $=p,Y=o,U=J("10.12.0"),V=t=>{if("win32"===process.platform){if(/[<>:"|?*]/.test(t.replace(Y.parse(t).root,""))){const e=new Error(`Path contains invalid characters: ${t}`);throw e.code="EINVAL",e}}},X=t=>("number"==typeof t&&(t={mode:t}),{mode:511,...t}),G=t=>{
// This replicates the exception of `fs.mkdir` with native the
// `recusive` option when run on an invalid drive under Windows.
const e=new Error(`operation not permitted, mkdir '${t}'`);return e.code="EPERM",e.errno=-4048,e.path=t,e.syscall="mkdir",e};W.makeDir=async(t,e)=>{if(V(t),e=X(e),U){const r=Y.resolve(t);return $.mkdir(r,{mode:e.mode,recursive:!0})}const r=async t=>{try{await $.mkdir(t,e.mode)}catch(e){if("EPERM"===e.code)throw e;if("ENOENT"===e.code){if(Y.dirname(t)===t)throw G(t);if(e.message.includes("null bytes"))throw e;return await r(Y.dirname(t)),r(t)}try{if(!(await $.stat(t)).isDirectory())
// This error is never exposed to the user
// it is caught below, and the original error is thrown
throw new Error("The path is not a directory")}catch{throw e}}};return r(Y.resolve(t))},W.makeDirSync=(t,e)=>{if(V(t),e=X(e),U){const r=Y.resolve(t);return $.mkdirSync(r,{mode:e.mode,recursive:!0})}const r=t=>{try{$.mkdirSync(t,e.mode)}catch(e){if("EPERM"===e.code)throw e;if("ENOENT"===e.code){if(Y.dirname(t)===t)throw G(t);if(e.message.includes("null bytes"))throw e;return r(Y.dirname(t)),r(t)}try{if(!$.statSync(t).isDirectory())
// This error is never exposed to the user
// it is caught below, and the original error is thrown
throw new Error("The path is not a directory")}catch{throw e}}};return r(Y.resolve(t))};const K=y.fromPromise,{makeDir:H,makeDirSync:Q}=W,Z=K(H);var tt={mkdirs:Z,mkdirsSync:Q,
// alias
mkdirp:Z,mkdirpSync:Q,ensureDir:Z,ensureDirSync:Q};const et=z;var rt=function(t,e,r,n){
// if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
et.open(t,"r+",((t,i)=>{if(t)return n(t);et.futimes(i,e,r,(t=>{et.close(i,(e=>{n&&n(t||e)}))}))}))},nt=function(t,e,r){const n=et.openSync(t,"r+");return et.futimesSync(n,e,r),et.closeSync(n)};const it=p,st=o,ot=i,ct=J("10.5.0"),at=t=>ct?it.stat(t,{bigint:!0}):it.stat(t),ut=t=>ct?it.statSync(t,{bigint:!0}):it.statSync(t);function lt(t,e){return Promise.all([at(t),at(e).catch((t=>{if("ENOENT"===t.code)return null;throw t}))]).then((([t,e])=>({srcStat:t,destStat:e})))}function ft(t,e){if(e.ino&&e.dev&&e.ino===t.ino&&e.dev===t.dev){if(ct||e.ino<Number.MAX_SAFE_INTEGER)
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
function ht(t,e){const r=st.resolve(t).split(st.sep).filter((t=>t)),n=st.resolve(e).split(st.sep).filter((t=>t));return r.reduce(((t,e,r)=>t&&n[r]===e),!0)}function dt(t,e,r){return`Cannot ${r} '${t}' to a subdirectory of itself, '${e}'.`}var pt={checkPaths:function(t,e,r,n){ot.callbackify(lt)(t,e,((i,s)=>{if(i)return n(i);const{srcStat:o,destStat:c}=s;return c&&ft(o,c)?n(new Error("Source and destination must not be the same.")):o.isDirectory()&&ht(t,e)?n(new Error(dt(t,e,r))):n(null,{srcStat:o,destStat:c})}))},checkPathsSync:function(t,e,r){const{srcStat:n,destStat:i}=function(t,e){let r;const n=ut(t);try{r=ut(e)}catch(t){if("ENOENT"===t.code)return{srcStat:n,destStat:null};throw t}return{srcStat:n,destStat:r}}(t,e);if(i&&ft(n,i))throw new Error("Source and destination must not be the same.");if(n.isDirectory()&&ht(t,e))throw new Error(dt(t,e,r));return{srcStat:n,destStat:i}}
// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
,checkParentPaths:function t(e,r,n,i,s){const o=st.resolve(st.dirname(e)),c=st.resolve(st.dirname(n));if(c===o||c===st.parse(c).root)return s();const a=(o,a)=>o?"ENOENT"===o.code?s():s(o):ft(r,a)?s(new Error(dt(e,n,i))):t(e,r,c,i,s);ct?it.stat(c,{bigint:!0},a):it.stat(c,a)},checkParentPathsSync:function t(e,r,n,i){const s=st.resolve(st.dirname(e)),o=st.resolve(st.dirname(n));if(o===s||o===st.parse(o).root)return;let c;try{c=ut(o)}catch(t){if("ENOENT"===t.code)return;throw t}if(ft(r,c))throw new Error(dt(e,n,i));return t(e,r,o,i)},isSrcSubdir:ht};const yt=z,mt=o,wt=tt.mkdirsSync,St=nt,vt=pt;function Et(t,e,r,n){if(!n.filter||n.filter(e,r))return function(t,e,r,n){const i=n.dereference?yt.statSync:yt.lstatSync,s=i(e);if(s.isDirectory())return function(t,e,r,n,i){if(!e)return function(t,e,r,n){return yt.mkdirSync(r),bt(e,r,n),kt(r,t)}(t.mode,r,n,i);if(e&&!e.isDirectory())throw new Error(`Cannot overwrite non-directory '${n}' with directory '${r}'.`);return bt(r,n,i)}(s,t,e,r,n);if(s.isFile()||s.isCharacterDevice()||s.isBlockDevice())return function(t,e,r,n,i){return e?function(t,e,r,n){if(n.overwrite)return yt.unlinkSync(r),gt(t,e,r,n);if(n.errorOnExist)throw new Error(`'${r}' already exists`)}(t,r,n,i):gt(t,r,n,i)}(s,t,e,r,n);if(s.isSymbolicLink())return function(t,e,r,n){let i=yt.readlinkSync(e);n.dereference&&(i=mt.resolve(process.cwd(),i));if(t){let t;try{t=yt.readlinkSync(r)}catch(t){
// dest exists and is a regular file or directory,
// Windows may throw UNKNOWN error. If dest already exists,
// fs throws error anyway, so no need to guard against it here.
if("EINVAL"===t.code||"UNKNOWN"===t.code)return yt.symlinkSync(i,r);throw t}if(n.dereference&&(t=mt.resolve(process.cwd(),t)),vt.isSrcSubdir(i,t))throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${t}'.`);
// prevent copy if src is a subdir of dest since unlinking
// dest in this case would result in removing src contents
// and therefore a broken symlink would be created.
if(yt.statSync(r).isDirectory()&&vt.isSrcSubdir(t,i))throw new Error(`Cannot overwrite '${t}' with '${i}'.`);return function(t,e){return yt.unlinkSync(e),yt.symlinkSync(t,e)}(i,r)}return yt.symlinkSync(i,r)}(t,e,r,n)}(t,e,r,n)}function gt(t,e,r,n){return yt.copyFileSync(e,r),n.preserveTimestamps&&function(t,e,r){
// Make sure the file is writable before setting the timestamp
// otherwise open fails with EPERM when invoked with 'r+'
// (through utimes call)
(function(t){return 0==(128&t)})(t)&&function(t,e){kt(t,128|e)}(r,t);(function(t,e){
// The initial srcStat.atime cannot be trusted
// because it is modified by the read(2) system call
// (See https://nodejs.org/api/fs.html#fs_stat_time_values)
const r=yt.statSync(t);St(e,r.atime,r.mtime)})(e,r)}(t.mode,e,r),kt(r,t.mode)}function kt(t,e){return yt.chmodSync(t,e)}function bt(t,e,r){yt.readdirSync(t).forEach((n=>function(t,e,r,n){const i=mt.join(e,t),s=mt.join(r,t),{destStat:o}=vt.checkPathsSync(i,s,"copy");return Et(o,i,s,n)}(n,t,e,r)))}var xt={copySync:function(t,e,r){"function"==typeof r&&(r={filter:r}),(r=r||{}).clobber=!("clobber"in r)||!!r.clobber,// default to true for now
r.overwrite="overwrite"in r?!!r.overwrite:r.clobber,// overwrite falls back to clobber
// Warn about using preserveTimestamps on 32-bit node
r.preserveTimestamps&&"ia32"===process.arch&&console.warn("fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269");const{srcStat:n,destStat:i}=vt.checkPathsSync(t,e,"copy");return vt.checkParentPathsSync(t,n,e,"copy"),function(t,e,r,n){if(n.filter&&!n.filter(e,r))return;const i=mt.dirname(r);yt.existsSync(i)||wt(i);return Et(t,e,r,n)}(i,t,e,r)}};const _t=y.fromPromise,Ft=p;var Ot={pathExists:_t((function(t){return Ft.access(t).then((()=>!0)).catch((()=>!1))})),pathExistsSync:Ft.existsSync};const Dt=z,Nt=o,Pt=tt.mkdirs,Tt=Ot.pathExists,Ct=rt,Lt=pt;function It(t,e,r,n,i){const s=Nt.dirname(r);Tt(s,((o,c)=>o?i(o):c?Mt(t,e,r,n,i):void Pt(s,(s=>s?i(s):Mt(t,e,r,n,i)))))}function Rt(t,e,r,n,i,s){Promise.resolve(i.filter(r,n)).then((o=>o?t(e,r,n,i,s):s()),(t=>s(t)))}function Mt(t,e,r,n,i){return n.filter?Rt(zt,t,e,r,n,i):zt(t,e,r,n,i)}function zt(t,e,r,n,i){(n.dereference?Dt.stat:Dt.lstat)(e,((s,o)=>s?i(s):o.isDirectory()?function(t,e,r,n,i,s){if(!e)return function(t,e,r,n,i){Dt.mkdir(r,(s=>{if(s)return i(s);Bt(e,r,n,(e=>e?i(e):At(r,t,i)))}))}(t.mode,r,n,i,s);if(e&&!e.isDirectory())return s(new Error(`Cannot overwrite non-directory '${n}' with directory '${r}'.`));return Bt(r,n,i,s)}(o,t,e,r,n,i):o.isFile()||o.isCharacterDevice()||o.isBlockDevice()?function(t,e,r,n,i,s){return e?function(t,e,r,n,i){if(!n.overwrite)return n.errorOnExist?i(new Error(`'${r}' already exists`)):i();Dt.unlink(r,(s=>s?i(s):jt(t,e,r,n,i)))}(t,r,n,i,s):jt(t,r,n,i,s)}(o,t,e,r,n,i):o.isSymbolicLink()?function(t,e,r,n,i){Dt.readlink(e,((e,s)=>e?i(e):(n.dereference&&(s=Nt.resolve(process.cwd(),s)),t?void Dt.readlink(r,((e,o)=>e?
// dest exists and is a regular file or directory,
// Windows may throw UNKNOWN error. If dest already exists,
// fs throws error anyway, so no need to guard against it here.
"EINVAL"===e.code||"UNKNOWN"===e.code?Dt.symlink(s,r,i):i(e):(n.dereference&&(o=Nt.resolve(process.cwd(),o)),Lt.isSrcSubdir(s,o)?i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${o}'.`)):
// do not copy if src is a subdir of dest since unlinking
// dest in this case would result in removing src contents
// and therefore a broken symlink would be created.
t.isDirectory()&&Lt.isSrcSubdir(o,s)?i(new Error(`Cannot overwrite '${o}' with '${s}'.`)):function(t,e,r){Dt.unlink(e,(n=>n?r(n):Dt.symlink(t,e,r)))}(s,r,i)))):Dt.symlink(s,r,i))))}(t,e,r,n,i):void 0))}function jt(t,e,r,n,i){Dt.copyFile(e,r,(s=>s?i(s):n.preserveTimestamps?function(t,e,r,n){
// Make sure the file is writable before setting the timestamp
// otherwise open fails with EPERM when invoked with 'r+'
// (through utimes call)
if(function(t){return 0==(128&t)}(t))return function(t,e,r){return At(t,128|e,r)}(r,t,(i=>i?n(i):qt(t,e,r,n)));return qt(t,e,r,n)}(t.mode,e,r,i):At(r,t.mode,i)))}function qt(t,e,r,n){!function(t,e,r){
// The initial srcStat.atime cannot be trusted
// because it is modified by the read(2) system call
// (See https://nodejs.org/api/fs.html#fs_stat_time_values)
Dt.stat(t,((t,n)=>t?r(t):Ct(e,n.atime,n.mtime,r)))}(e,r,(e=>e?n(e):At(r,t,n)))}function At(t,e,r){return Dt.chmod(t,e,r)}function Bt(t,e,r,n){Dt.readdir(t,((i,s)=>i?n(i):Wt(s,t,e,r,n)))}function Wt(t,e,r,n,i){const s=t.pop();return s?function(t,e,r,n,i,s){const o=Nt.join(r,e),c=Nt.join(n,e);Lt.checkPaths(o,c,"copy",((e,a)=>{if(e)return s(e);const{destStat:u}=a;Mt(u,o,c,i,(e=>e?s(e):Wt(t,r,n,i,s)))}))}(t,s,e,r,n,i):i()}var Jt=function(t,e,r,n){"function"!=typeof r||n?"function"==typeof r&&(r={filter:r}):(n=r,r={}),n=n||function(){},(r=r||{}).clobber=!("clobber"in r)||!!r.clobber,// default to true for now
r.overwrite="overwrite"in r?!!r.overwrite:r.clobber,// overwrite falls back to clobber
// Warn about using preserveTimestamps on 32-bit node
r.preserveTimestamps&&"ia32"===process.arch&&console.warn("fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269"),Lt.checkPaths(t,e,"copy",((i,s)=>{if(i)return n(i);const{srcStat:o,destStat:c}=s;Lt.checkParentPaths(t,o,e,"copy",(i=>i?n(i):r.filter?Rt(It,c,t,e,r,n):It(c,t,e,r,n)))}))};var $t={copy:(0,y.fromCallback)(Jt)};const Yt=z,Ut=o,Vt=s,Xt="win32"===process.platform;function Gt(t){["unlink","chmod","stat","lstat","rmdir","readdir"].forEach((e=>{t[e]=t[e]||Yt[e],t[e+="Sync"]=t[e]||Yt[e]})),t.maxBusyTries=t.maxBusyTries||3}function Kt(t,e,r){let n=0;"function"==typeof e&&(r=e,e={}),Vt(t,"rimraf: missing path"),Vt.strictEqual(typeof t,"string","rimraf: path should be a string"),Vt.strictEqual(typeof r,"function","rimraf: callback function required"),Vt(e,"rimraf: invalid options argument provided"),Vt.strictEqual(typeof e,"object","rimraf: options should be object"),Gt(e),Ht(t,e,(function i(s){if(s){if(("EBUSY"===s.code||"ENOTEMPTY"===s.code||"EPERM"===s.code)&&n<e.maxBusyTries){n++;
// try again, with the same exact callback as this one.
return setTimeout((()=>Ht(t,e,i)),100*n)}
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
function Ht(t,e,r){Vt(t),Vt(e),Vt("function"==typeof r),
// sunos lets the root user unlink directories, which is... weird.
// so we have to lstat here and make sure it's not a dir.
e.lstat(t,((n,i)=>n&&"ENOENT"===n.code?r(null):
// Windows can EPERM on stat.  Life is suffering.
n&&"EPERM"===n.code&&Xt?Qt(t,e,n,r):i&&i.isDirectory()?te(t,e,n,r):void e.unlink(t,(n=>{if(n){if("ENOENT"===n.code)return r(null);if("EPERM"===n.code)return Xt?Qt(t,e,n,r):te(t,e,n,r);if("EISDIR"===n.code)return te(t,e,n,r)}return r(n)}))))}function Qt(t,e,r,n){Vt(t),Vt(e),Vt("function"==typeof n),e.chmod(t,438,(i=>{i?n("ENOENT"===i.code?null:r):e.stat(t,((i,s)=>{i?n("ENOENT"===i.code?null:r):s.isDirectory()?te(t,e,r,n):e.unlink(t,n)}))}))}function Zt(t,e,r){let n;Vt(t),Vt(e);try{e.chmodSync(t,438)}catch(t){if("ENOENT"===t.code)return;throw r}try{n=e.statSync(t)}catch(t){if("ENOENT"===t.code)return;throw r}n.isDirectory()?re(t,e,r):e.unlinkSync(t)}function te(t,e,r,n){Vt(t),Vt(e),Vt("function"==typeof n),
// try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
// if we guessed wrong, and it's not a directory, then
// raise the original error.
e.rmdir(t,(i=>{!i||"ENOTEMPTY"!==i.code&&"EEXIST"!==i.code&&"EPERM"!==i.code?i&&"ENOTDIR"===i.code?n(r):n(i):function(t,e,r){Vt(t),Vt(e),Vt("function"==typeof r),e.readdir(t,((n,i)=>{if(n)return r(n);let s,o=i.length;if(0===o)return e.rmdir(t,r);i.forEach((n=>{Kt(Ut.join(t,n),e,(n=>{if(!s)return n?r(s=n):void(0==--o&&e.rmdir(t,r))}))}))}))}
// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
(t,e,n)}))}function ee(t,e){let r;Gt(e=e||{}),Vt(t,"rimraf: missing path"),Vt.strictEqual(typeof t,"string","rimraf: path should be a string"),Vt(e,"rimraf: missing options"),Vt.strictEqual(typeof e,"object","rimraf: options should be object");try{r=e.lstatSync(t)}catch(r){if("ENOENT"===r.code)return;
// Windows can EPERM on stat.  Life is suffering.
"EPERM"===r.code&&Xt&&Zt(t,e,r)}try{
// sunos lets the root user unlink directories, which is... weird.
r&&r.isDirectory()?re(t,e,null):e.unlinkSync(t)}catch(r){if("ENOENT"===r.code)return;if("EPERM"===r.code)return Xt?Zt(t,e,r):re(t,e,r);if("EISDIR"!==r.code)throw r;re(t,e,r)}}function re(t,e,r){Vt(t),Vt(e);try{e.rmdirSync(t)}catch(n){if("ENOTDIR"===n.code)throw r;if("ENOTEMPTY"===n.code||"EEXIST"===n.code||"EPERM"===n.code)!function(t,e){if(Vt(t),Vt(e),e.readdirSync(t).forEach((r=>ee(Ut.join(t,r),e))),!Xt){return e.rmdirSync(t,e)}{
// We only end up here once we got ENOTEMPTY at least once, and
// at this point, we are guaranteed to have removed all the kids.
// So, we know that it won't be ENOENT or ENOTDIR or anything else.
// try really hard to delete stuff on windows, because it has a
// PROFOUNDLY annoying habit of not closing handles promptly when
// files are deleted, resulting in spurious ENOTEMPTY errors.
const r=Date.now();do{try{return e.rmdirSync(t,e)}catch{}}while(Date.now()-r<500);// give up after 500ms
}}(t,e);else if("ENOENT"!==n.code)throw n}}var ne=Kt;Kt.sync=ee;const ie=ne;var se={remove:(0,y.fromCallback)(ie),removeSync:ie.sync};const oe=y.fromCallback,ce=z,ae=o,ue=tt,le=se,fe=oe((function(t,e){e=e||function(){},ce.readdir(t,((r,n)=>{if(r)return ue.mkdirs(t,e);n=n.map((e=>ae.join(t,e))),function t(){const r=n.pop();if(!r)return e();le.remove(r,(r=>{if(r)return e(r);t()}))}()}))}));function he(t){let e;try{e=ce.readdirSync(t)}catch{return ue.mkdirsSync(t)}e.forEach((e=>{e=ae.join(t,e),le.removeSync(e)}))}var de={emptyDirSync:he,emptydirSync:he,emptyDir:fe,emptydir:fe};const pe=y.fromCallback,ye=o,me=z,we=tt;var Se={createFile:pe((function(t,e){function r(){me.writeFile(t,"",(t=>{if(t)return e(t);e()}))}me.stat(t,((n,i)=>{// eslint-disable-line handle-callback-err
if(!n&&i.isFile())return e();const s=ye.dirname(t);me.stat(s,((t,n)=>{if(t)
// if the directory doesn't exist, make it
return"ENOENT"===t.code?we.mkdirs(s,(t=>{if(t)return e(t);r()})):e(t);n.isDirectory()?r():
// parent is not a directory
// This is just to cause an internal ENOTDIR error to be thrown
me.readdir(s,(t=>{if(t)return e(t)}))}))}))})),createFileSync:function(t){let e;try{e=me.statSync(t)}catch{}if(e&&e.isFile())return;const r=ye.dirname(t);try{me.statSync(r).isDirectory()||
// parent is not a directory
// This is just to cause an internal ENOTDIR error to be thrown
me.readdirSync(r)}catch(t){
// If the stat call above failed because the directory doesn't exist, create it
if(!t||"ENOENT"!==t.code)throw t;we.mkdirsSync(r)}me.writeFileSync(t,"")}};const ve=y.fromCallback,Ee=o,ge=z,ke=tt,be=Ot.pathExists;var xe={createLink:ve((function(t,e,r){function n(t,e){ge.link(t,e,(t=>{if(t)return r(t);r(null)}))}be(e,((i,s)=>i?r(i):s?r(null):void ge.lstat(t,(i=>{if(i)return i.message=i.message.replace("lstat","ensureLink"),r(i);const s=Ee.dirname(e);be(s,((i,o)=>i?r(i):o?n(t,e):void ke.mkdirs(s,(i=>{if(i)return r(i);n(t,e)}))))}))))})),createLinkSync:function(t,e){if(ge.existsSync(e))return;try{ge.lstatSync(t)}catch(t){throw t.message=t.message.replace("lstat","ensureLink"),t}const r=Ee.dirname(e);return ge.existsSync(r)||ke.mkdirsSync(r),ge.linkSync(t,e)}};const _e=o,Fe=z,Oe=Ot.pathExists;var De={symlinkPaths:
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
function(t,e,r){if(_e.isAbsolute(t))return Fe.lstat(t,(e=>e?(e.message=e.message.replace("lstat","ensureSymlink"),r(e)):r(null,{toCwd:t,toDst:t})));{const n=_e.dirname(e),i=_e.join(n,t);return Oe(i,((e,s)=>e?r(e):s?r(null,{toCwd:i,toDst:t}):Fe.lstat(t,(e=>e?(e.message=e.message.replace("lstat","ensureSymlink"),r(e)):r(null,{toCwd:t,toDst:_e.relative(n,t)})))))}},symlinkPathsSync:function(t,e){let r;if(_e.isAbsolute(t)){if(r=Fe.existsSync(t),!r)throw new Error("absolute srcpath does not exist");return{toCwd:t,toDst:t}}{const n=_e.dirname(e),i=_e.join(n,t);if(r=Fe.existsSync(i),r)return{toCwd:i,toDst:t};if(r=Fe.existsSync(t),!r)throw new Error("relative srcpath does not exist");return{toCwd:t,toDst:_e.relative(n,t)}}}};const Ne=z;var Pe={symlinkType:function(t,e,r){if(r="function"==typeof e?e:r,e="function"!=typeof e&&e)return r(null,e);Ne.lstat(t,((t,n)=>{if(t)return r(null,"file");e=n&&n.isDirectory()?"dir":"file",r(null,e)}))},symlinkTypeSync:function(t,e){let r;if(e)return e;try{r=Ne.lstatSync(t)}catch{return"file"}return r&&r.isDirectory()?"dir":"file"}};const Te=y.fromCallback,Ce=o,Le=z,Ie=tt.mkdirs,Re=tt.mkdirsSync,Me=De.symlinkPaths,ze=De.symlinkPathsSync,je=Pe.symlinkType,qe=Pe.symlinkTypeSync,Ae=Ot.pathExists;var Be={createSymlink:Te((function(t,e,r,n){n="function"==typeof r?r:n,r="function"!=typeof r&&r,Ae(e,((i,s)=>i?n(i):s?n(null):void Me(t,e,((i,s)=>{if(i)return n(i);t=s.toDst,je(s.toCwd,r,((r,i)=>{if(r)return n(r);const s=Ce.dirname(e);Ae(s,((r,o)=>r?n(r):o?Le.symlink(t,e,i,n):void Ie(s,(r=>{if(r)return n(r);Le.symlink(t,e,i,n)}))))}))}))))})),createSymlinkSync:function(t,e,r){if(Le.existsSync(e))return;const n=ze(t,e);t=n.toDst,r=qe(n.toCwd,r);const i=Ce.dirname(e);return Le.existsSync(i)||Re(i),Le.symlinkSync(t,e,r)}};var We={
// file
createFile:Se.createFile,createFileSync:Se.createFileSync,ensureFile:Se.createFile,ensureFileSync:Se.createFileSync,
// link
createLink:xe.createLink,createLinkSync:xe.createLinkSync,ensureLink:xe.createLink,ensureLinkSync:xe.createLinkSync,
// symlink
createSymlink:Be.createSymlink,createSymlinkSync:Be.createSymlinkSync,ensureSymlink:Be.createSymlink,ensureSymlinkSync:Be.createSymlinkSync};var Je={stringify:function(t,{EOL:e="\n",finalEOL:r=!0,replacer:n=null,spaces:i}={}){const s=r?e:"";return JSON.stringify(t,n,i).replace(/\n/g,e)+s},stripBom:function(t){
// we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
return Buffer.isBuffer(t)&&(t=t.toString("utf8")),t.replace(/^\uFEFF/,"")}};let $e;try{$e=z}catch(t){$e=e}const Ye=y,{stringify:Ue,stripBom:Ve}=Je;const Xe=Ye.fromPromise((async function(t,e={}){"string"==typeof e&&(e={encoding:e});const r=e.fs||$e,n=!("throws"in e)||e.throws;let i,s=await Ye.fromCallback(r.readFile)(t,e);s=Ve(s);try{i=JSON.parse(s,e?e.reviver:null)}catch(e){if(n)throw e.message=`${t}: ${e.message}`,e;return null}return i}));const Ge=Ye.fromPromise((async function(t,e,r={}){const n=r.fs||$e,i=Ue(e,r);await Ye.fromCallback(n.writeFile)(t,i,r)}));const Ke={readFile:Xe,readFileSync:function(t,e={}){"string"==typeof e&&(e={encoding:e});const r=e.fs||$e,n=!("throws"in e)||e.throws;try{let n=r.readFileSync(t,e);return n=Ve(n),JSON.parse(n,e.reviver)}catch(e){if(n)throw e.message=`${t}: ${e.message}`,e;return null}},writeFile:Ge,writeFileSync:function(t,e,r={}){const n=r.fs||$e,i=Ue(e,r);
// not sure if fs.writeFileSync returns anything, but just in case
return n.writeFileSync(t,i,r)}};var He={
// jsonfile exports
readJson:Ke.readFile,readJsonSync:Ke.readFileSync,writeJson:Ke.writeFile,writeJsonSync:Ke.writeFileSync};const Qe=y.fromCallback,Ze=z,tr=o,er=tt,rr=Ot.pathExists;var nr={outputFile:Qe((function(t,e,r,n){"function"==typeof r&&(n=r,r="utf8");const i=tr.dirname(t);rr(i,((s,o)=>s?n(s):o?Ze.writeFile(t,e,r,n):void er.mkdirs(i,(i=>{if(i)return n(i);Ze.writeFile(t,e,r,n)}))))})),outputFileSync:function(t,...e){const r=tr.dirname(t);if(Ze.existsSync(r))return Ze.writeFileSync(t,...e);er.mkdirsSync(r),Ze.writeFileSync(t,...e)}};const{stringify:ir}=Je,{outputFile:sr}=nr;var or=async function(t,e,r={}){const n=ir(e,r);await sr(t,n,r)};const{stringify:cr}=Je,{outputFileSync:ar}=nr;var ur=function(t,e,r){const n=cr(e,r);ar(t,n,r)};const lr=y.fromPromise,fr=He;fr.outputJson=lr(or),fr.outputJsonSync=ur,
// aliases
fr.outputJSON=fr.outputJson,fr.outputJSONSync=fr.outputJsonSync,fr.writeJSON=fr.writeJson,fr.writeJSONSync=fr.writeJsonSync,fr.readJSON=fr.readJson,fr.readJSONSync=fr.readJsonSync;var hr=fr;const dr=z,pr=o,yr=xt.copySync,mr=se.removeSync,wr=tt.mkdirpSync,Sr=pt;function vr(t,e,r){try{dr.renameSync(t,e)}catch(n){if("EXDEV"!==n.code)throw n;return function(t,e,r){const n={overwrite:r,errorOnExist:!0};return yr(t,e,n),mr(t)}(t,e,r)}}var Er={moveSync:function(t,e,r){const n=(r=r||{}).overwrite||r.clobber||!1,{srcStat:i}=Sr.checkPathsSync(t,e,"move");return Sr.checkParentPathsSync(t,i,e,"move"),wr(pr.dirname(e)),function(t,e,r){if(r)return mr(e),vr(t,e,r);if(dr.existsSync(e))throw new Error("dest already exists.");return vr(t,e,r)}(t,e,n)}};const gr=z,kr=o,br=$t.copy,xr=se.remove,_r=tt.mkdirp,Fr=Ot.pathExists,Or=pt;function Dr(t,e,r,n){gr.rename(t,e,(i=>i?"EXDEV"!==i.code?n(i):function(t,e,r,n){const i={overwrite:r,errorOnExist:!0};br(t,e,i,(e=>e?n(e):xr(t,n)))}(t,e,r,n):n()))}var Nr=function(t,e,r,n){"function"==typeof r&&(n=r,r={});const i=r.overwrite||r.clobber||!1;Or.checkPaths(t,e,"move",((r,s)=>{if(r)return n(r);const{srcStat:o}=s;Or.checkParentPaths(t,o,e,"move",(r=>{if(r)return n(r);_r(kr.dirname(e),(r=>r?n(r):function(t,e,r,n){if(r)return xr(e,(i=>i?n(i):Dr(t,e,r,n)));Fr(e,((i,s)=>i?n(i):s?n(new Error("dest already exists.")):Dr(t,e,r,n)))}(t,e,i,n)))}))}))};var Pr,Tr,Cr,Lr={move:(0,y.fromCallback)(Nr)};!function(t){t.exports={
// Export promiseified graceful-fs:
...p,
// Export extra methods:
...xt,...$t,...de,...We,...hr,...tt,...Er,...Lr,...nr,...Ot,...se};
// Export fs.promises as a getter property so that we don't trigger
// ExperimentalWarning before fs.promises is actually accessed.
const r=e;Object.getOwnPropertyDescriptor(r,"promises")&&Object.defineProperty(t.exports,"promises",{get:()=>r.promises})}(d);
/**
 * Collection
 *
 * A Generic collection class
 */
class Ir{_size;constructor(){this._size=0}get size(){return this._size}
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
 */class Rr extends c.BaseException{constructor(t="Collection error"){super(t)}}
/**
 * Node
 *
 * A Generic Node.
 */class Mr{value;_next;compare;constructor(t,e=null,r=null){this.value=t,this._next=e,this.compare=r||((t,e)=>(t.length,e.length,t>e?1:t<e?-1:0))}get hasNext(){return null!==this.next}get next(){return this._next}set next(t){this._next=t}compareTo(t){let e;switch(this.compare(this.value,t)){case-1:e=c.ComparisonResult.Less;break;case 1:e=c.ComparisonResult.Greater;break;default:e=c.ComparisonResult.Same}return e}}
/**
 * StackException
 *
 * A stack error.
 */class zr extends Rr{constructor(t="Stack exception"){super(t)}}
/**
 * Stack
 *
 * A stack.
 */class jr extends Ir{top;compareFn;constructor(t=null){super(),this.top=null,this.compareFn=t
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
     */containsValue(t,e){return!!t&&(t.compareTo(e)===c.ComparisonResult.Same||this.containsValue(t.next,e))}
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
throw new zr;return this.top.value}
/**
     * pop()
     *
     * removes the next value in the stack.
     * @throws StackException when attempting to pop while the stack is empty.
     */pop(){if(this.isEmpty)
// nothing to pop
throw new zr;{const t=this.top.value;return this.top=this.top.next,this.setSize(this.size-1),t
/**
     * push()
     *
     * adds an item to the top of the stack.
     * @param item the item to add to the stack.
     */}}push(t){const e=new Mr(t,this.top,this.compareFn);this.top=e,this.setSize(this.size+1)}
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
 */class qr extends Rr{constructor(t="Queue error"){super(t)}}
/**
 * Queue
 *
 * A Queue.
 */class Ar extends Ir{head;tail;compareFn;constructor(t=null){super(),this.head=null,this.tail=null,this.compareFn=t
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
     */containsValue(t,e){return!!t&&(t.compareTo(e)===c.ComparisonResult.Same||this.containsValue(t.next,e))}
/**
     * dequeue()
     *
     * removes an item from the queue.
     * @returns the removed value.
     * @throws QueueException when the queue is empty.
     */dequeue(){if(this.head){const t=this.head.value;return this.head=this.head.next,this.head||(this.tail=null),this.setSize(this.size-1),t}
// nothing to remove.
throw new qr}
/**
     * enqueu()
     *
     * adds the value to the queue
     * @param value the value to add to the queue.
     */enqueue(t){const e=new Mr(t,null,this.compareFn);this.tail&&(this.tail.next=e),this.tail=e,this.head||(this.head=e),this.setSize(this.size+1)}
/**
     * peek()
     *
     * returns the next value in the queue without removing it.
     */peek(){if(this.head)return this.head.value;throw new qr}
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
 */class Br extends c.BaseException{constructor(t="System Error"){super(t)}}
/**
 * PathException
 *
 * A general path error.
 */class Wr extends Br{constructor(t=""){super("Path Error"+(t?": "+t:""))}}
// A path instruction
!function(t){
// point to the home directory.
t[t.HomeDirectory=0]="HomeDirectory",
// point to the current directory
t[t.CurrentDirectory=1]="CurrentDirectory",
// Go back one step
t[t.BackStep=2]="BackStep"}(Pr||(Pr={}));
/**
 * Path
 *
 * A utility class for working with file and directory paths
 */
class Jr{
/**
     * Creates a Path instance.
     * @param value the value of the path.
     * @throws PathException when the path is invalid.
     */
constructor(t){const e=t.trim();if(!this.isValidPath(e))throw new Wr("Invalid Path: "+e);this._value=e.replace(/\\|\//g,l.sep)}
/**
     * FromSegments()
     *
     * Creates a Path from one or more segments.
     * @param segments the segnents of the path to create.
     * @returns the generated Path
     * @throws PathException when the segments are invalid.
     */static FromSegments(...t){try{const e=new jr;return Jr._BuildPath(t,e),new Jr(e.toArray().reverse().join(Jr.Separator))}catch(t){
// there was an error building the path.
throw t}}
/**
     * basename()
     *
     * gets the last portion of the path.
     */basename(){return new Jr(l.basename(this.toString()))}
/**
     * dirname()
     *
     * gets the directory name of the path.
     */dirname(){return new Jr(l.dirname(this.toString()))}equals(t){let e=!1;if(t instanceof Jr){const r=t;e=this.toString()===r.toString()}return e}
/**
     * extension()
     *
     * gets the extension of the path.
     */extension(){return l.extname(this.toString())}
/**
    * isAbsolute()
    *
    * determines if path is an absolute path
    */isAbsolute(){return l.isAbsolute(this.toString())}
/**
     * normalize()
     *
     * normalizes the given path, resolving '..' and '.' segments.
     */normalize(){return new Jr(l.normalize(this.toString()))}
/**
     * segments()
     *
     * returns an array consisting of the file segments.
     */segments(){return this.toString().split(Jr.Separator)}
/**
     * toNamespacedPath()
     *
     * gets an equivalent namespace-prefixed path.
     *
     * This method is meaningful only on Windows systems. On POSIX systems,
     * the method is non-operational and always returns path without modifications.
     */toNamespacedPath(){return new Jr(l.toNamespacedPath(this.toString()))}toString(){return this._value}
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
const e="win32"===process.platform;return!Jr.RESTRICTED.test(t)&&((!e||!Jr.WINDOWS_RESTRICTED.test(t))&&!Jr.POSIX_RESTRICTED.test(t))}
/**
     * _BuildPath()
     *
     * Creates a valid path string from the provided segments.
     * @param segments the segments to process.
     * @note The built path will be in reverse order.
     * @note This function needs to be redone to improve performance.
     * @throws PathException when the path is invalid.
     */static _BuildPath(t,e){if(t.length>0){const r=e.isEmpty,n=Jr._NormalizeSegment(t[0]);let i;for(;!n.isEmpty;)if(i=n.remove(),"string"==typeof i)e.push(i);else switch(i){case Pr.BackStep:if(r)throw new Wr("Cannot backtrack from root backtrack from root directory.");e.pop();break;case Pr.HomeDirectory:if(!r)throw new Wr("You can only specify the home directory in the beginning of the path.");e.push("~");break;default:
// here we know it is a Current Directory instruction
r&&e.push(process.cwd())}t.shift(),Jr._BuildPath(t,e)}}
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
let e=t.toString().split(/(?<!([/\\])[/\\])[/\\](?![/\\])/g);e=e.filter((t=>null!=t));const r=new Ar;return e.forEach((t=>{".."===t?
// backstep
r.add(Pr.BackStep):"."==t?
// current directory.
r.add(Pr.CurrentDirectory):["~","/","\\"].includes(t)?
// home directory.
r.add(Pr.HomeDirectory):r.add(t)})),r}}Jr.RESTRICTED=/[\[\]#%&{}<>?\s\b\0$!'"@|‘“+^`]/g,Jr.POSIX_RESTRICTED=/[\\:]/g,Jr.WINDOWS_RESTRICTED=/[\/]/g,
/**
 * Delimiter()
 *
 * Provides the platform-specific path delimiter.
 * - Windows: ";"
 * - POSIX: ":"
 */
Jr.Delimiter=l.delimiter,
/**
 * Separator
 *
 * gets he platform-specific path segment separator.
 * - Windows: \
 * - POSIX: /
 */
Jr.Separator=l.sep;
/**
 * FileSystemEntryException
 *
 * A Generic FileSystemEntry error.
 */
class $r extends Br{constructor(t=""){super("FileSystem Entry Error"+(t?": "+t:""))}}
/**
 * FileSystemEntryNotFoundException
 *
 * An error indicating a FileSystem Entry was not found.
 */class Yr extends $r{constructor(t="FileSystem Entry Not Found."){super(t)}}
/**
 * FileSystemEntry
 *
 * A generic object or entry in the file system.
 */class Ur{
/**
     * Creates an instance of FileSystemEnty.
     * @param path the path of the entry.
     * @throws PathException when the path is invalid.
     * @throws FileSystemEntryNotFoundException when the entry does not exist.
     */
constructor(t){this._path=t instanceof Jr?t:new Jr(t),
// make sure the path exists.
this.pathExists(this.path()).then((t=>{if(!t)
// path does not exist.
throw new Yr})),this._created=null,this._updated=null,this._deleted=null,this._stats=null}
/**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */static async Create(t,e){throw new c.MethodUndefinedException}createdOn(){let t=null;return this._stats?t=this._created:this.stats().then((e=>{this._created=e.birthtime,t=this._created})),t}
/**
     * delete()
     *
     * deletes the directory.
     * @param options delete options.
     */async delete(t){

}deletedOn(){return this._deleted}equals(t){let e=!1;if(t instanceof Ur){const r=t;e=this.path().equals(r.path())&&this.createdOn().equals(r.createdOn())&&this.updatedOn().equals(r.updatedOn())}return e}
/**
     * isDeleted()
     *
     * determines if the entry is deleted.
     */isDeleted(){return null!==this.deletedOn()}
/**
     * isDirectory()
     *
     * determines if the entry is a directory.
     * @returns TRUE if the entry is a directory. FALSE otherwise.
     * @throws FileSystemEntryException when the operation fails.
     */async isDirectory(){return(await this.stats()).isDirectory}
/**
     * isFile()
     *
     * determines if the entry is a file.
     * @returns TRUE if the entry is a file. FALSE otherwise.
     * @throws FileSystemEntryException when the operation fails.
     */async isFile(){return(await this.stats()).isFile}
/**
     * isLink()
     *
     * determines if the entry is a link.
     * @returns TRUE if the entry is a link. FALSE otherwise.
     * @throws FileSystemEntryException when the operation fails.
     */async isLink(){return(await this.stats()).isSymbolicLink}
/**
     * path()
     *
     * returns the path.
     * @returns the path.
     */path(){return this._path}
/**
     * pathExists()
     *
     * determines if the path exists.
     * @returns TRUE if the file exists. False it it does not.
     */async pathExists(r){try{return await t.access(r.toString(),e.constants.F_OK),!0}catch(t){return!1}}
/**
     * stats()
     *
     * gets the stats of the entry.
     * @throws FileSystemEntryException when the operation fails.
     */async stats(){if(this._stats)return this._stats;try{const e=await t.stat(this.path().toString(),{bigint:!1});return this._stats={dev:e.dev,ino:e.ino,mode:e.mode,nlink:e.nlink,uid:e.uid,gid:e.gid,rdev:e.rdev,size:e.size,blksize:e.blksize,blocks:e.blocks,atimeMs:e.atimeMs,mtimeMs:e.mtimeMs,ctimeMs:e.ctimeMs,birthtimeMs:e.birthtimeMs,atime:c.DateTime.FromDate(e.atime,c.Timezone.UTC()),mtime:c.DateTime.FromDate(e.mtime,c.Timezone.UTC()),ctime:c.DateTime.FromDate(e.ctime,c.Timezone.UTC()),birthtime:c.DateTime.FromDate(e.birthtime,c.Timezone.UTC()),isBlockDevice:e.isBlockDevice(),isCharacterDevice:e.isCharacterDevice(),isDirectory:e.isDirectory(),isFIFO:e.isFIFO(),isFile:e.isFile(),isSocket:e.isSocket(),isSymbolicLink:e.isSymbolicLink()},this._stats}catch(t){throw new $r(t.message)}}serialize(){return JSON.stringify({})}
/**
     * setDeleted()
     *
     * marks the entry as deleted.
     */setDeleted(){this._deleted=c.DateTime.Now()}updatedOn(){let t=null;return this._stats?t=this._created:this.stats().then((e=>{this._created=e.ctime,t=this._created})),t}}
/**
 * FileException
 *
 * A Generic File Exception.
 */class Vr extends $r{constructor(t=""){super("File Error"+(t?": "+t:""))}}
/**
 * FileNotFoundException
 *
 * An exception indicates a file is not found.
 */class Xr extends Vr{constructor(t="File Not Found"){super(t)}}
/**
 * FileAlreadyExistsException
 *
 * an error indicating a file already exists.
 */class Gr extends Vr{constructor(t="File already exists"){super(t)}}
/**
 * File
 *
 * A File
 */class Kr extends Ur{
/**
     * Creates a file instance.
     * @param path the path to the file.
     * @throws FileNotFoundException when the file is not found.
     * @throws PathException when the path is invalid.
     */
constructor(t){try{super(t)}catch(t){throw t instanceof Yr?new Xr:t}super.stats().then((t=>{if(!t.isFile)throw new Xr}))}
/**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */static async Create(e,r){
// make sure the file does not already exists.
try{throw new Kr(e),new Gr}catch(t){if(t instanceof Gr)throw t}
// create the file.
const n=e instanceof Jr?e:new Jr(e.toString());try{await t.writeFile(n.toString(),"")}catch(t){throw new Vr(t.message)}return new Kr(n)}
/**
     * copy()
     *
     * copies the directory to the specified path.
     * @param to the destination to copy the file to.
     * @param options copy options.
     * @throws FileException when the file is deleted.
     */async copy(e,r){
// resolve the arguments.
const n=e instanceof Jr?e:new Jr(e);let i;i=r?{mode:r.mode?r.mode:null,override:!!r.override&&r.override}:{mode:null,override:!1};
// make sure the destination file does not already exist.
let s=!1;try{
// this line should fail if the file does not exist.
new Kr(n),s=!0}catch(t){s=!1}if(s&&!i.override)throw new Gr;
// make sure the file has not been deleted.
if(this.isDeleted())throw new Vr;
// copy the file.
try{await t.copyFile(this.path().toString(),n.toString(),i.mode)}catch(t){throw new Vr(t.message)}}
/**
     * delete()
     *
     * deletes the directory.
     * @returns the deleted directory.
     * @param options delete options.
     */async delete(e){
// resolve options
let r;r=e?{recursive:!!e.recursive&&e.recursive,force:!!e.force&&e.force}:{recursive:!1,force:!1};
// delete the file.
try{await t.rm(this.path().toString(),{force:r.force,recursive:r.recursive}),this.setDeleted()}catch(t){throw new Vr(t.message)}}equals(t){return t instanceof Kr&&super.equals(t)}
/**
     * move()
     *
     * moves the filesystem entry to the specified path.
     * @param to the destination to move the filesystem entry to.
     * @param options move options.
     * @returns the copied FilSystem Entry.
     */async move(e,r){const n=e instanceof Jr?e:new Jr(e);let i;i=r?{override:!!r.override&&r.override}:{override:!1};
// make sure the destination is available.
let s=!1;try{new Kr(n),s=!0}catch(t){s=!1}if(s&&!i.override)throw new Gr;
// move the file.
try{return await t.rename(this.path().toString(),n.toString()),new Kr(n)}catch(t){throw new Vr(t.message)}}
/**
     * rename()
     *
     * renames the filesystem entry.
     * @param newName the new name of the directory.
     * @throws PathException when the new name is invalid.
     * @throws FileException when the operation encounters an error.
     */async rename(e){
// resolve the new file path.
const r=Jr.FromSegments(this.path().dirname(),e);
// rename the file.
try{return await t.rename(this.path().toString(),r.toString()),new Kr(r)}catch(t){throw new Vr(t.message)}}serialize(){return JSON.stringify({path:this.path().toString(),created_on:this.createdOn().toString(),updated_on:this.updatedOn().toString()})}}
// file enums
exports.CopyFileMode=void 0,
/**
     * If present, the copy operation will fail with an error if the destination path already exists.
     * COPYFILE_EXCL = constants.COPYFILE_EXCL,
    */
(Tr=exports.CopyFileMode||(exports.CopyFileMode={}))[Tr.EXCL=e.constants.COPYFILE_EXCL]="EXCL",
// If present, the copy operation will attempt to create a copy-on-write reflink. If the underlying
// platform does not support copy-on-write, then a fallback copy mechanism is used.
Tr[Tr.FICLONE=e.constants.COPYFILE_FICLONE]="FICLONE",
// If present, the copy operation will attempt to create a copy-on-write reflink. If the underlying platform
// does not support copy-on-write, then the operation will fail with an error.
Tr[Tr.FICLONE_FORCE=e.constants.COPYFILE_FICLONE_FORCE]="FICLONE_FORCE",
// link enums
/**
 * LinkType
 *
 * A link type.
 */
exports.LinkType=void 0,(Cr=exports.LinkType||(exports.LinkType={})).File="file",Cr.Directory="dir",Cr.Junction="junction";
/**
 * LinkException
 *
 * A General Link error
 */
class Hr extends $r{constructor(t="Link Error"){super("Link Error"+(t?": "+t:""))}}
/**
 * LinkNotFoundException
 */class Qr extends Hr{constructor(t="Link Not Found"){super(t)}}
/**
 * LinkAlreadyExistsException
 */class Zr extends Hr{constructor(t="Link already exists"){super(t)}}
/**
 * Link
 *
 * A Symbolic Link
 */class tn extends Ur{
/**
     * Creates a file instance.
     * @param path the path to the file.
     * @throws FileNotFoundException when the file is not found.
     * @throws PathException when the path is invalid.
     */
constructor(t){try{super(t),this._target=null}catch(t){throw t instanceof Yr?new Qr:t}super.stats().then((t=>{if(!t.isSymbolicLink)throw new Qr}))}
/**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */static async Create(e,r,n){var i;
// make sure the file does not already exists.
try{throw new tn(e),new Zr}catch(t){if(t instanceof Zr)throw t}
// create the Link.
const s=e instanceof Jr?e:new Jr(e.toString()),o=r instanceof Jr?r:new Jr(r);let c;c=n?{type:n.type?n.type:exports.LinkType.File}:{type:exports.LinkType.File};try{await t.symlink(o.toString(),s.toString(),null===(i=c.type)||void 0===i?void 0:i.toString())}catch(t){throw new Hr(t.message)}return new tn(s)}
/**
     * delete()
     *
     * deletes the directory.
     * @returns the deleted directory.
     * @param options delete options.
     */async delete(e){
// delete the link.
try{await t.unlink(this.path().toString()),this.setDeleted()}catch(t){throw new Hr(t.message)}}equals(t){return t instanceof tn&&super.equals(t)}
/**
     * isValid()
     *
     * determines if the target of the link exists.
     */async isValid(){let t=!1;try{t=null!==await this.target()}catch(t){}return t}serialize(){return JSON.stringify({path:this.path().toString(),created_on:this.createdOn().toString(),updated_on:this.updatedOn().toString()})}
/**
     * target()
     *
     * gets the target object of the link.
     * @throws LinkException when the operation fails.
     * @returns the path targeted by the link.
     */async target(){if(!this._target)try{const e=await t.readlink(this.path().toString());this._target=new Jr(e)}catch(t){throw new Hr(t.message)}return this._target}}
/**
 * DirectoryException
 *
 * A general directory error.
 */class en extends $r{constructor(t=""){super("Directory Error"+(t?": "+t:""))}}
/**
 * DirectoryNotFoundException
 *
 * An exception indicating a directory cannot be found.
 */class rn extends en{constructor(t="Directory Not Found"){super(t)}}
/**
 * DirectoryAlreadyExistsException
 *
 * An exception indicating a directory already exists.
 */class nn extends en{constructor(t="Directory Already Exists"){super(t)}}
/**
 * Directory
 *
 * A File system Directory.
 */class sn extends Ur{
/**
     * Creates a reference to a directory.
     * @param path the directory path.
     * @throws DirectoryNotFoundExeption when the directory is not found.
     */
constructor(t){try{super(t)}catch(t){throw t instanceof Yr?new rn:t}super.stats().then((t=>{if(!t.isDirectory)throw new rn}))}
/**
     * Create()
     *
     * creates a FileSystem Entry instance.
     * @param path The path of the resource to create.
     * @returns the created FileSystem Entry.
     */static async Create(e,r){
// make sure the file does not already exists.
try{throw new sn(e),new nn}catch(t){if(t instanceof nn)throw t}
// create the file.
const n=e instanceof Jr?e:new Jr(e.toString());try{await t.mkdir(n.toString(),{recursive:!0,mode:""})}catch(t){throw new en(t.message)}return new sn(n)}
/**
     * Current()
     *
     * Gets the current working directory.
     * @returns The current working directory.
     */static Current(){return new sn(process.cwd())}
/**
     * contents()
     *
     * gets the contents of the directory.
     */async contents(){try{const e=await t.readdir(this.path().toString());return await this.convertToObjects(e)}catch(t){throw new en}}
/**
     * convertToObjects()
     *
     * converts a list of paths into the corresponding objects.
     * @param paths a list of file paths to convert.
     * @returns a list of objects.
     */async convertToObjects(t){const e=new Array;let r;return await Promise.all(t.map((async t=>{const n=new Ur(t);r=await n.isDirectory()?new sn(n.path()):await n.isFile()?new Kr(n.path()):new tn(n.path()),e.push(r)}))),e}
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
const n=t instanceof Jr?t:new Jr(t.toString());let i=!1;try{new sn(n),i=!0}catch(t){i=!1}if(i)throw new nn;
// copy the directory.
try{await h.copy(this.path().toString(),n.toString(),{recursive:r.recursive,overwrite:r.overwrite,errorOnExist:!0})}catch(t){
// an error occured.
throw new en(t.message)}}
/**
     * delete()
     *
     * deletes the directory.
     * @param options delete options.
     * @throws DirectoryException when the operation fails.
     */async delete(e){
// resolve options
let r;r=e?{recursive:!!e.recursive&&e.recursive,maxRetries:e.maxRetries?e.maxRetries:3,retryDelay:e.retryDelay?e.retryDelay:2e3}:{recursive:!1,maxRetries:3,retryDelay:2e3};
// delete the file.
try{await t.rmdir(this.path().toString(),{recursive:r.recursive,maxRetries:r.maxRetries,retryDelay:r.retryDelay}),this.setDeleted()}catch(t){throw new en(t.message)}}equals(t){return t instanceof sn&&super.equals(t)}
/**
     * move()
     *
     * moves the filesystem entry to the specified path.
     * @param to the destination to move the filesystem entry to.
     * @param options move options.
     * @returns the copied movable object.
     * @throws DirectoryAlreadyExistsException when the destination already exists.
     * @throws DirectoryException when the operation fails.
     */async move(t,e){const r=t instanceof Jr?t:new Jr(t);let n;n=e?{overwrite:!!e.overwrite&&e.overwrite}:{overwrite:!1};
// make sure the destination is available.
let i=!1;try{new sn(r),i=!0}catch(t){i=!1}if(i&&!n.overwrite)throw new nn;
// move the file.
try{return await h.move(this.path().toString(),r.toString(),{overwrite:n.overwrite}),new sn(r)}catch(t){throw new en(t.message)}}
/**
     * rename()
     *
     * renames the filesystem entry.
     * @param newName the new name of the directory.
     */async rename(e){
// resolve the new file path.
const r=Jr.FromSegments(this.path().dirname(),e);
// rename the file.
try{return await t.rename(this.path().toString(),r.toString()),new sn(r)}catch(t){throw new en(t.message)}}serialize(){return JSON.stringify({path:this.path().toString(),created_on:this.createdOn().toString(),updated_on:this.updatedOn().toString()})}}class on extends Br{constructor(t=""){super("File Stream Error"+(t?": "+t:""))}}
/**
 * FileStreamDataException
 *
 * File Stream Data error
 */class cn extends on{constructor(t="Stream Data Error"){super(t)}}class an{constructor(t){this._file=t}
/**
     * file()
     *
     * the source file of the stream.
     */file(){return this._file}equals(t){let e=!1;if(t instanceof an){const r=t;e=this.file().equals(r.file())}return e}toString(){return`Stream for file ${this.file().path().toString()}`}}
/**
 * FileReader
 *
 * A FileReader class
 */class un extends an{
/**
     * Creates a FileReader stream.
     * @param file the file to read.
     * @param options options for reading a file.
     */
constructor(t,r={encoding:"utf-8"}){super(t),this._encoding=r.encoding,this._isClosed=!1,this._bytesRead=0,this._fileSize=null,this._stream=e.createReadStream(this.file().path().toString(),{encoding:this._encoding,autoClose:!0}),this._stream.pause()}
/**
     * all()
     *
     * reads all the data in the stream.
     * @throws FileStreamException when the stream cannot be read (i.e. It was closed)
     */all(){if(this._isClosed)throw new on;let t,e="";for(;t=this._stream.read();)e+=t.toString(this.encoding());return e}
/**
     * close()
     *
     * closes the file stream.
     */async close(){this._stream.close(),this._isClosed=!0}
/**
     * encoding()
     *
     * the stream encoding.
     */encoding(){return this._encoding}equals(t){let e=!1;if(t instanceof un){const r=t;e=super.equals(r)&&this.encoding()===r.encoding()}return e}
/**
     * hasNext()
     *
     * determines if there is still data left to be read.
     */async hasNext(){if(!this._fileSize){const t=await this.file().stats();this._fileSize=t.size}return this._bytesRead<this._fileSize}
/**
     * next()
     *
     * gets data from the buffer, of the specified size.
     * @param size the size of data to get in bytes.
     * @param encoding the encoding
     * @return the data.
     */async next(t=64){if(this._isClosed)throw new on;if(!this._fileSize){const t=await this.file().stats();this._fileSize=t.size}t=t>un.MAX_BYTES?un.MAX_BYTES:t;const e=this._stream.read(t);if(e)return this._bytesRead+=t,e.toString(this.encoding());
// no data to read.
throw new cn}}
// the maximum byte size supported is 1GiB
un.MAX_BYTES=1073741824;
/**
 * ProcessException
 *
 * A generic process error
 */
class ln extends Br{constructor(t=""){super(t="Process Error"+(t?": "+t:""))}}
/**
 * ProcessFailedException
 *
 * An Error indicating a process has failed.
 */class fn extends ln{constructor(t="Process exited with non-zero code",e=-1){super(t),this.code=e}}
/**
 * Process
 *
 * The process object
 */class hn{constructor(t,e){this.childProcess=t,this._forked=e,this._isKilled=!1,this._exitCode=null,this.childProcess.on("exit",(t=>{this._exitCode=t}))}
/**
     * Run()
     *
     * runs a command.
     * @param cmd the command to run
     * @param options command options.
     * @returns the output of the process.
     * @throws ProcessFailedException when the process exits with a non-zero exit code.
     */static Run(t,e={cwd:sn.Current().path(),env:process.env}){
// resolve the options.
let r;return r=e?{cwd:e.cwd,env:e.env?e.env:process.env}:e,new Promise(((e,n)=>{a.exec(t,{cwd:r.cwd.toString(),env:r.env},((t,r)=>{t&&n(new fn(t.message,t.code)),e(r)}))}))}
/**
     * Start()
     *
     * creates a new child process
     */static Start(t,e={cwd:sn.Current().path(),arguments:[],fork:!1,env:process.env,serializationType:"json"}){
// resolve options
let r,n;return r=e?{arguments:e.arguments?e.arguments:[],fork:!!e.fork&&e.fork,cwd:e.cwd?e.cwd:sn.Current().path(),env:e.env?e.env:process.env,serializationType:e.serializationType?e.serializationType:"json"}:{cwd:sn.Current().path(),arguments:[],fork:!1,env:process.env,serializationType:"json"},n=r.fork?a.fork(t,{cwd:r.cwd.toString(),env:r.env,execArgv:r.arguments,serialization:r.serializationType}):a.spawn(t,r.arguments,{cwd:r.cwd.toString(),env:r.env,serialization:r.serializationType}),new hn(n,r.fork)}
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
     */canBeMessaged(){return this.childProcess.connected}equals(t){let e=!1;if(t instanceof hn){const r=t;e=this.id()===r.id()}return e}
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
     */kill(t="SIGTERM"){if(this._isKilled=this.childProcess.kill(t),!this._isKilled)throw new ln("Failed to kill process with UD "+this.toString())}
/**
     * sendMessage()
     *
     * sends a message to the child process.
     * @throws ProcessException when the message cannot be sent, like if there is no connection to the child/parent process.
     */sendMessage(t){return new Promise(((e,r)=>{this.canBeMessaged()?this.childProcess.send(t,(t=>{t?r(new ln(t.message)):e()})):r(new ln("Message cannot be sent"))}))}toString(){return this.id().toString()}}exports.Directory=sn,exports.DirectoryAlreadyExistsException=nn,exports.DirectoryException=en,exports.DirectoryNotFoundException=rn,exports.File=Kr,exports.FileAlreadyExistsException=Gr,exports.FileException=Vr,exports.FileNotFoundException=Xr,exports.FileReader=un,exports.FileStream=an,exports.FileStreamDataException=cn,exports.FileStreamException=on,exports.FileSystemEntry=Ur,exports.FileSystemEntryException=$r,exports.FileSystemEntryNotFoundException=Yr,exports.FileWriter=
/**
 * FileWriter
 *
 * A FileWriter
 */
class extends an{constructor(t,r={encoding:"utf-8",batch:{size:30}}){super(t),this._isClosed=!1,this._numWrites=0,this._encoding=r.encoding,this._stream=e.createWriteStream(this.file().path().toString(),{encoding:this._encoding,autoClose:!0}),this._batchWrites=!!(r.batch&&r.batch.size>0),this._batchWrites?(this._stream.cork(),this._batchSize=Math.abs(r.batch.size),this._streamIsCorked=!0):(this._batchSize=null,this._streamIsCorked=!1)}
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
     */async write(t){if(this._isClosed)throw new on;
// write the data
this._stream.write(t,(t=>{if(t)throw new cn(t.message);this._numWrites++})),
// determine if the batch is full.
this._batchWrites&&this._batchIsFull()&&this._flush()}
/**
     * writeLine()
     *
     * writes a line of data to the file.
     * @param x the data to write to te file.
     */async writeLine(t){await this.write(`${t}\n`)}},exports.Link=tn,exports.LinkAlreadyExistsException=Zr,exports.LinkException=Hr,exports.LinkNotFoundException=Qr,exports.Path=Jr,exports.PathException=Wr,exports.Process=hn,exports.ProcessException=ln,exports.ProcessFailedException=fn,exports.SystemException=Br;
