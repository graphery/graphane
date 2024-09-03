const round = (n) => Math.round(n * 10000) / 10000;

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
 * @param {number} cx           - center x
 * @param {number} cy           - center y
 * @param {number} r            - radius
 * @param {number} angleDegrees - angle in degrees
 * @returns {{x : *, y : *}}
 */
function polar2cartesian (cx, cy, r, angleDegrees) {
  const angleRadians = degrees2radians(angleDegrees);
  return {
    x : round(cx + r * Math.cos(angleRadians)),
    y : round(cy + r * Math.sin(angleRadians))
  };
}

/**
 * Create an arc path
 * @param {number} cx        - center x
 * @param {number} cy        - center y
 * @param {number} r         - radius
 * @param {number} grades    - grades in degrees
 * @param {number} [start=0] - start position in degrees
 * @return {string}
 */
function arc (cx, cy, r, grades, start = 0) {
  start                 = Math.abs(start) >= 360 ? start % 360 : start;
  grades                = Math.abs(grades) > 360 ? grades % 360 : grades;
  grades                = Math.abs(grades) === 360 ? grades > 0 ? 359.9 : -359.9 : grades;
  let end               = start + grades;
  const dir             = grades > 0 ? 1 : 0;
  const largeArcFlag    = Math.abs(end - start) <= 180 ? 0 : 1;
  const startNormalized = start < 0 ? (360 + start) % 360 : start;
  let endNormalized     = end < 0 ? (360 + end) % 360 : end;
  const startPoint      = polar2cartesian(cx, cy, r, startNormalized);
  const endPoint        = polar2cartesian(cx, cy, r, endNormalized);
  return `M${ startPoint.x },${ startPoint.y }A${ r },${ r },0,${ largeArcFlag },${ dir },${ endPoint.x },${ endPoint.y }`;
}

/**
 * Create an arched bar shape with a path
 * @param {number} cx        - center x
 * @param {number} cy        - center y
 * @param {number} r         - radius
 * @param {number} width     - bar width
 * @param {number} grades    - grades in degrees
 * @param {number} [start=0] - start position in degrees
 * @returns {string}
 */
function barArc (cx, cy, r, width, grades, start = 0) {
  const sup = arc(cx, cy, r + (width / 2), grades, start);
  const inf = arc(cx, cy, r - (width / 2), -grades, start + grades);
  return sup + `L` + inf.substring(1) + `Z`;
}

/**
 * Create a circle slice shape with a path
 * @param {number} cx        - center x
 * @param {number} cy        - center y
 * @param {number} r         - radius
 * @param {number} grades    - grades in degrees
 * @param {number} [start=0] - start position in degrees
 * @returns {string}
 */
function circleSlice (cx, cy, r, grades, start = 0) {
  const sup = arc(cx, cy, r, grades, start);
  return sup + `L${ cx },${ cy }Z`;
}


/**
 * create a regular polygon shape with a path (no with a svg polygon)
 * @param {number} cx        - center x
 * @param {number} cy        - center y
 * @param {number} r         - radius
 * @param {number} sides     - sides
 * @param {number} [start=0] - initial angle
 */
function regularPolygon (cx, cy, r, sides, start = 0) {
  const angle = 360 / sides;
  let path    = '';
  for (let i = 0; i < sides; i++) {
    const coords = polar2cartesian(cx, cy, r, (angle * i) + start);
    path += `${ i ? 'L' : 'M' }${ coords.x },${ coords.y }`;
  }
  path += 'Z';
  return path;
}


/**
 * create a star shape with a path (no with a svg polygon)
 * @param {number} cx        - center x
 * @param {number} cy        - center y
 * @param {number} r1        - external radius
 * @param {number} r2        - internal radius
 * @param {number} sides     - sides
 * @param {number} [start=0] - initial angle
 */
function star (cx, cy, r1, r2, sides, start = 0) {
  const angle = 360 / sides;
  let path    = '';
  for (let i = 0; i < sides; i++) {
    const external = polar2cartesian(cx, cy, r1, (angle * i) + start);
    path += `${ i ? 'L' : 'M' }${ external.x },${ external.y }`;
    const internal = polar2cartesian(cx, cy, r2, (angle * i) + start + (angle / 2));
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

  if (setup.extendComposer) {
    setup.extendComposer({
      polar2cartesian,
      degrees2radians
    });
  }

  setup.extendPath({
    arc,
    barArc,
    circleSlice,
    regularPolygon,
    star,
    circle
  });

}