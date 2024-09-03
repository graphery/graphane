function sourceFormat (source) {
  let transformed = source;
  transformed     = transformed.replace(/\n/g, '');
  transformed     = transformed.replace(/\s\s+/g, ' ');
  transformed     = transformed.replace(/>\s</g, '><');
  let n           = 0;
  let i           = 0;
  let command     = '';
  while (n < transformed.length) {
    if (transformed[n] === '<') {
      const current = transformed.substring(n).match(/\w+/g)[0];
      if (transformed[n + 1] === '/') {
        i -= 2;
        if (current !== command) {
          transformed = transformed.slice(0, n) + '\n' + ' '.repeat(i) + transformed.slice(n);
          n += i + 1
        }
      } else {
        command = current;
        transformed = transformed.slice(0, n) + '\n' + ' '.repeat(i) + transformed.slice(n);
        n += i + 1
        i += 2;
      }
    } else if (transformed[n - 1] === '/' && transformed[n] === '>') {
      i -= 2;
    }
    n++;
  }
  return transformed.replace(/</g, "&lt;");
}