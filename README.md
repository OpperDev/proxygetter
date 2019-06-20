# ProxyGetter
Simple nodejs api for getting proxy from gatherproxy.com
## How to use it?
### With command line :
```
node index.js
  option: -o, --output [file], Change output directory, default __dirname
  option: -m, --millis [millis], Max millis, default 500
  option: -t, --type [type], Change proxies types, [Elite, Transparent, Anonymous]
  option: -e, --exptype [type], Change export type (json/txt), default json
  option: -p, --proxies-only [bool], Get only hosts & ports instead of hosts, ports, times, country, type, only for json, default false
```
### With package :
First, you have to add the package to your project : `npm i @opperdev/proxygetter`
then you an use it like this:
```javascript
const proxyGetter = require('@opperdev/proxygetter');

proxyGetter({
	type: 'Elite',
	millis: 220
}, proxies => {
	console.log(proxies);
});
```
# License
MIT License

Copyright (c) 2019 OpperDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

-   © 2019  GitHub, Inc.
