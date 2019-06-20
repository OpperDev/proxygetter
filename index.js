/*
  Project: proxygetter
  Version: 1.0
  Author: OpperDev
  Twitter: @OpperDev
  License: MIT
  GitHub: https://github/OpperDev/proxygetter
*/

const fetch = require('node-fetch'),
  cheerio = require('cheerio'),
  commander = require('commander'),
  path = require('path'),
  fs = require('fs');

commander
  .version('1.0.0')
  .option('-o, --output [file]', 'Change output', __dirname)
  .option('-m, --millis [millis]', 'Max millis', 500)
  .option('-t, --type [type]', 'Change proxy type')
  .option('-e, --exptype [type]', 'Change export type (available: json, txt)', 'json')
  .option('-p, --proxies-only [bool]', 'Get the proxies only', false)
  .parse(process.argv);


const between = function(str, first, last, index) {
  return str.match(first + "(.*)" + last)[index].trim();
};

module.exports = exports = function(options, callback) {
  let url = 'http://www.gatherproxy.com/embed/?t=&p=&c='
  if (options.type) {
    let type = options.type.charAt(0).toUpperCase() + options.type.slice(1).toLowerCase();
    if (type == 'Elite' || type == 'Anonymous' || type == 'Transparent')
      url = `http://www.gatherproxy.com/embed/?t=${type}&p=&c=`;
  }
  console.log('Ports and contry option is coming soon...');
  fetch(url)
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body);
      const proxies = [];
      $('script').each((i, elem) => {
        if (elem.children[0] && elem.children[0].data && /(.*)gp.insertPrx(.*)/g.test(elem.children[0].data)) {
          const proxy = JSON.parse(`{${between(elem.children[0].data, '{', '}', 1)}}`);
          if (options.millis && options.millis < proxy.PROXY_TIME) return;
          proxies.push({
            host: proxy.PROXY_IP,
            port: parseInt('0x' + proxy.PROXY_PORT, 16),
            time: proxy.PROXY_TIME,
            country: proxy.PROXY_COUNTRY,
            type: proxy.PROXY_TYPE
          });
        }
      });
      callback(proxies);
    });
};

console.log('Starting...');
module.exports({
  millis: commander.millis ? commander.millis : undefined,
  type: commander.type ? commander.type : undefined
}, proxies => {
  const { exptype, output, proxiesOnly } = commander;
  const newArr = [];
  proxies.forEach(proxy => {
    if (exptype == 'txt') newArr.push(`${proxy.host}:${proxy.port}`)
    else if (exptype == 'json') {
      if (proxiesOnly) newArr.push({host: proxy.host, port: proxy.port});
      else newArr.push(proxy);
    }
  });
  fs.writeFile(path.join(output, `proxies.${exptype}`),
    exptype == 'txt' ? newArr.join('\n') : exptype == 'json' ? JSON.stringify(newArr) : 'N/A',
      err => { if (err) throw err; });
});
