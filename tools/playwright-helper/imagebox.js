module.exports = (page, TAG) => {
  return page.evaluate ((tag) => {
    const icon                  = document.querySelector (tag);
    const {x, y, width, height} = icon.getBoundingClientRect ();
    return {x, y, width, height};
  }, TAG);
}