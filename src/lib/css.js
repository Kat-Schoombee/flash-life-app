// css`` — a tagged-template / string helper that parses an inline CSS
// declaration string ("padding:6px 18px;background:#fff") into a React style
// object. This lets us reuse the Flash prototype's inline styles verbatim,
// keeping the port pixel-faithful. Also callable as css("...") with a string.

function camel(prop) {
  prop = prop.trim();
  if (prop.startsWith('--')) return prop; // CSS custom property — keep as-is
  const vendor = prop.startsWith('-'); // -webkit-, -moz-, -ms-, -o-
  const parts = prop.replace(/^-/, '').split('-');
  let out = parts
    .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join('');
  if (vendor) out = out.charAt(0).toUpperCase() + out.slice(1); // WebkitMaskImage
  return out;
}

export function parseStyle(str) {
  const obj = {};
  if (str == null) return obj;
  String(str)
    .split(';')
    .forEach((decl) => {
      if (!decl.trim()) return;
      const idx = decl.indexOf(':');
      if (idx === -1) return;
      const key = decl.slice(0, idx);
      const val = decl.slice(idx + 1).trim();
      if (!key.trim() || val === '') return;
      obj[camel(key)] = val;
    });
  return obj;
}

// Tagged-template usage: css`a:b;c:${x}` — or plain css("a:b").
export function css(strings, ...vals) {
  if (typeof strings === 'string') return parseStyle(strings);
  let out = '';
  strings.forEach((s, i) => {
    out += s + (i < vals.length && vals[i] != null ? vals[i] : '');
  });
  return parseStyle(out);
}

export default css;
