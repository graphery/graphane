function sourceFormat (source) {
  let transformed = source;
  transformed     = transformed.replace(/\n/g, '');
  transformed     = transformed.replace(/\s\s+/g, ' ');
  transformed     = transformed.replace(/>\s</g, '><');
  let n           = 0;
  let i           = 0;
  while (n < transformed.length) {
    if (transformed[n] === '<') {
      if (transformed[n + 1] === '/') {
        i -= 2;
        transformed = transformed.slice(0, n) + '\n' + ' '.repeat(i) + transformed.slice(n);
        n += i + 1
      } else {
        transformed = transformed.slice(0, n) + '\n' + ' '.repeat(i) + transformed.slice(n);
        n += i + 1
        i += 2;
      }
    }
    n++;
  }
  transformed     = transformed.replace(/</g, "&lt;");
  return transformed;
}