const round = (n) => Math.round(n * 100) / 100;

/**
 * Convert an angle from degrees to radians
 * @param {number} degrees
 * @returns {number}
 */
function degrees2radians (degrees) {
  return ((degrees - 90) * Math.PI) / 180;
}

/**
 * Return an x, y coordinates from an angular reference
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} radius
 * @param {number} angleDegrees
 * @returns {{x : *, y : *}}
 */
function polar2cartesian (centerX, centerY, radius, angleDegrees) {
  const angleRadians = degrees2radians(angleDegrees);
  return {
    x : round(centerX + radius * Math.cos(angleRadians)),
    y : round(centerY + radius * Math.sin(angleRadians))
  };
}

/**
 * Create an arc path
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} grades
 * @param {number} [start=0]
 * @return {string}
 */
function arc (x, y, radius, grades, start = 0) {
  start                 = Math.abs(start) >= 360 ? start % 360 : start;
  grades                = Math.abs(grades) > 360 ? grades % 360 : grades;
  let end               = start + grades;
  const dir             = grades > 0 ? 1 : 0;
  const largeArcFlag    = Math.abs(end - start) <= 180 ? 0 : 1;
  const startNormalized = start < 0 ? (360 + start) % 360 : start;
  let endNormalized     = grades < 0 ? (360 + end) % 360 : end;
  if (endNormalized === 360) {
    endNormalized = 359.9
  }
  const startPoint = polar2cartesian(x, y, radius, startNormalized);
  const endPoint   = polar2cartesian(x, y, radius, endNormalized);
  return `M${ startPoint.x },${ startPoint.y }A${ radius },${ radius },0,${ largeArcFlag },${ dir },${ endPoint.x },${ endPoint.y }`;
}

/**
 * Create an arched bar shape with a path
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} width
 * @param {number} startAngle
 * @param {number} endAngle
 * @returns {string}
 */
function barArc (x, y, radius, width, startAngle, endAngle) {
  const externalStart = polar2cartesian(x, y, radius, endAngle);
  const externalEnd   = polar2cartesian(x, y, radius, startAngle);
  const internalStart = polar2cartesian(x, y, radius - width, startAngle);
  const internalEnd   = polar2cartesian(x, y, radius - width, endAngle);
  const flag          = endAngle - startAngle <= 180 ? '0' : '1';
  return `M${ externalStart.x },${ externalStart.y }` +
         `A${ radius },${ radius },0,${ flag },0,${ externalEnd.x },${ externalEnd.y }` +
         `L${ internalStart.x },${ internalStart.y }` +
         `A${ radius - width },${ radius - width },0,${ flag },1,${ internalEnd.x },${ internalEnd.y }` +
         `Z`;
}

/**
 * create a regular polygon shape with a path (no with a svg polygon)
 * @param {number} cx    - center x
 * @param {number} cy    - center y
 * @param {number} r     - radius
 * @param {number} n     - sides
 * @param {number} [a=0] - initial angle
 */
function regularPolygon (cx, cy, r, n, a = 0) {
  const angle = 360 / n;
  let path    = '';
  for (let i = 0; i < n; i++) {
    const coords = polar2cartesian(cx, cy, r, (angle * i) + a);
    path += `${ i ? 'L' : 'M' }${ coords.x },${ coords.y }`;
  }
  path += 'Z';
  return path;
}


/**
 * create a star shape with a path (no with a svg polygon)
 * @param {number} cx    - center x
 * @param {number} cy    - center y
 * @param {number} r1    - external radius
 * @param {number} r2    - internal radius
 * @param {number} n     - sides
 * @param {number} [a=0] - initial angle
 */
function star (cx, cy, r1, r2, n, a = 0) {
  const angle = 360 / n;
  let path    = '';
  for (let i = 0; i < n; i++) {
    const external = polar2cartesian(cx, cy, r1, (angle * i) + a);
    path += `${ i ? 'L' : 'M' }${ external.x },${ external.y }`;
    const internal = polar2cartesian(cx, cy, r2, (angle * i) + a + (angle / 2));
    path += `L${ internal.x },${ internal.y }`;
  }
  path += 'Z';
  return path;
}

/**
 * create a circle shape with a path (no with a svg circle)
 * @param {number} cx    - center x
 * @param {number} cy    - center y
 * @param {number} r     - radius
 */
function circle (cx, cy, r) {
  return `M${ cx - r },${ cy }a${ r },${ r },0,1,0,${ r * 2 },0a${ r },${ r },0,1,0,-${ r * 2 },0`;
}

export function svgPlugin (setup) {

  setup.extendConstructor({
    polar2cartesian,
    degrees2radians
  });

  setup.extendPath({
    arc,
    barArc,
    regularPolygon,
    star,
    circle
  });
}