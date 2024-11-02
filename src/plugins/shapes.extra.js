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

function installer (setup) {

  // Path plugin
  setup.extendPath({
    regularPolygon,
    star,
    circle
  });

}

export default installer;