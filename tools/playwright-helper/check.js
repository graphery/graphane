const wait        = (t) => new Promise ((r) => setTimeout (r, t));
const WAIT_BEFORE = 500;


async function valueCheck (page, selector, val, imageBox) {
  await value(page, selector, val);
  await wait(WAIT_BEFORE);
  await check(page, imageBox);
}

async function rangeCheck (page, selector, keys, imageBox) {
  await range(page, selector, keys);
  await wait(WAIT_BEFORE);
  await check(page, imageBox);
}

async function inputCheck (page, selector, val, imageBox) {
  await input(page, selector, val);
  await wait(WAIT_BEFORE);
  await check(page, imageBox);
}

async function checkboxCheck (page, selector, imageBox) {
  await checkbox (page, selector);
  await wait(WAIT_BEFORE);
  await check(page, imageBox);
}

async function radioCheck (page, selector, imageBox) {
  await radio (page, selector);
  await wait(WAIT_BEFORE);
  await check(page, imageBox);
}

async function selectCheck (page, selector, val, imageBox) {
  await select(page, selector, val);
  await wait(WAIT_BEFORE);
  await check(page, imageBox);
}

async function value(page, selector, val) {
  await page.evaluate (({s, v}) => {
    document.querySelector (s).value = v;
    document.querySelector (s).dispatchEvent(new CustomEvent('input'))
  }, {s : selector, v : val})
}

async function range (page, selector, keys) {
  for (let i = keys.number; i--;) {
    await page.press (selector, keys.type);
  }
}

async function input (page, selector, val) {
  await page.fill (selector, val);
}

async function checkbox (page, selector) {
  await page.check (selector);
}

async function radio (page, selector) {
  await page.check (selector);
}

async function select (page, selector, val) {
  await page.selectOption (selector, val);
}

async function check(page, imageBox) {
  expect (await page.screenshot ({clip : imageBox})).toMatchImageSnapshot ();
}

module.exports = {
  check,
  valueCheck,
  rangeCheck,
  inputCheck,
  checkboxCheck,
  radioCheck,
  selectCheck,
  value,
  range,
  input,
  checkbox,
  radio,
  select
}