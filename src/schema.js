/* The contribution is parsed as JSON data, never executed as JavaScript. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OneLineSchema = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function parse(text) {
    if (typeof text !== 'string' || text.length > 240 || !/^const contribution = \{[^\r\n]*\};\n?$/.test(text)) throw new Error('Expected one line: const contribution = {...};');
    const obj = JSON.parse(text.slice('const contribution = '.length).trim().slice(0, -1));
    if (!obj || Array.isArray(obj) || Object.keys(obj).sort().join(',') !== 'color,label,type,x,y') throw new Error('Expected exactly type, x, y, color, label');
    if (obj.type !== 'star' || !Number.isInteger(obj.x) || !Number.isInteger(obj.y) || obj.x < 5 || obj.x > 95 || obj.y < 5 || obj.y > 95) throw new Error('Expected a star with x and y between 5 and 95');
    if (typeof obj.color !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(obj.color)) throw new Error('Expected a 6-digit hex color');
    if (typeof obj.label !== 'string' || obj.label.length < 1 || obj.label.length > 48 || /[\u0000-\u001f\u007f]/.test(obj.label)) throw new Error('Expected a label of 1–48 printable characters');
    return obj;
  }
  return { parse };
});
