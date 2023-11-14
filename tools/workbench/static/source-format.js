function sourceFormat (source) {
  let transformed = source;
  transformed     = transformed.replace(/\n/g, '');
  transformed     = transformed.replace(/\s\s+/g, ' ');
  transformed     = transformed.replace(/>\s</g, '><');
  let n           = 0;
  let i           = 0;
  let pre         = '';
  let ant         = '';
  while (n < transformed.length) {
    if (transformed[n] === '<') {
      const current = transformed.substring(n).match(/\w+/g)[0];
      if (transformed[n + 1] === '/') {
        i -= 2;
        if (current !== pre || pre === ant) {
          transformed = transformed.slice(0, n) + '\n' + ' '.repeat(i) + transformed.slice(n);
          n += i + 1
        }
      } else {
        ant         = pre;
        transformed = transformed.slice(0, n) + '\n' + ' '.repeat(i) + transformed.slice(n);
        n += i + 1
        i += 2;
      }
      pre = current;
    }
    n++;
  }
  transformed = transformed.replace(/</g, "&lt;");
  return transformed;
}