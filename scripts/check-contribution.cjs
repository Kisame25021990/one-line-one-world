const fs = require('node:fs');
const vm = require('node:vm');
function validate(file, content) {
  if (!/^contributions\/[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?\.js$/.test(file)) throw Error('Invalid contribution path');
  if (Buffer.byteLength(content, 'utf8') > 512 || !/^[^\r\n]+\n?$/.test(content) || !content.trim()) throw Error('Expected one physical line of at most 512 bytes');
  new vm.Script(`(function(api){\n${content}\n})`, {filename:file});
}
if (require.main === module) { const file=process.argv[2]; validate(file,fs.readFileSync(file,'utf8')); console.log('Valid syntax:',file); }
module.exports = {validate};
