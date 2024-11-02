const round = (n) => Math.round(n * 10000) / 10000;

function degrees2radians (degrees) {
  return ((degrees - 90) * Math.PI) / 180;
}

function radians2cartesian (cx, cy, r, angleRadians) {
  return {
    x : round(cx + r * Math.cos(angleRadians)),
    y : round(cy + r * Math.sin(angleRadians))
  };
}

function polar2cartesian (cx, cy, r, angleDegrees) {
  const angleRadians = degrees2radians(angleDegrees);
  return radians2cartesian(cx, cy, r, angleRadians);
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
 * @param {number} cx - center x
 * @param {number} cy - center y
 * @param {number} r  - radius
 */
function circle (cx, cy, r) {
  return `M${ cx - r },${ cy }a${ r },${ r },0,1,0,${ r * 2 },0a${ r },${ r },0,1,0,-${ r * 2 },0`;
}


/**
 * Generates a path data string for an SVG spiral, starting at (cx + r1, cy) and ending at (cx + r2, cy).
 * The spiral is interpolated from start angle to end angle.
 *
 * @param {number} cx        - The x-coordinate of the spiral's center.
 * @param {number} cy        - The y-coordinate of the spiral's center.
 * @param {number} r1        - The initial radius of the spiral.
 * @param {number} r2        - The final radius of the spiral.
 * @param {number} [start=0] - The starting angle in degrees.
 * @param {number} [end=0]   - The ending angle in degrees.
 * @return {string} The generated SVG path data for the spiral.
 */
function spiral (cx, cy, r1, r2, start = 0, end = 360) {
  const steps                    = (end - start) / 10                   // Define the number of steps to smooth the spiral
  const deltaRadius              = (r2 - r1) / steps;                   // Increment of the radius per step
  const initialTheta             = degrees2radians(start);              // Convert start degrees to radians
  const finalTheta               = degrees2radians(end);                // Convert end degrees to radians
  const deltaTheta               = (finalTheta - initialTheta) / steps; // Angular increment per step
  const {x : init_x, y : init_y} = polar2cartesian(cx, cy, r1, start);  // Initial coordinates

  // Move the cursor to the starting point
  let d = `M${ init_x },${ init_y }`;

  for (let i = 1; i <= steps; i++) {
    const radius                     = r1 + i * deltaRadius;                      // Current radius (interpolating between initial_radius and final_radius)
    const theta                      = initialTheta + i * deltaTheta;             // Current angle
    const {x, y}                     = radians2cartesian(cx, cy, radius, theta);  // Current x and y coordinates of the point in the spiral
    const control_radius1            = r1 + (i - 0.33) * deltaRadius;             // Control point 1 at one-third of the step
    const control_theta1             = initialTheta + (i - 0.33) * deltaTheta;    // Angle at the first control point
    const {x : ctrl_x1, y : ctrl_y1} = radians2cartesian(cx, cy, control_radius1, control_theta1);
    const ctrl_r2                    = r1 + (i - 0.66) * deltaRadius;             // Control point 2 at two-thirds of the step
    const ctrl_theta2                = initialTheta + (i - 0.66) * deltaTheta;    // Angle at the second control point
    const {x : ctrl_x2, y : ctrl_y2} = radians2cartesian(cx, cy, ctrl_r2, ctrl_theta2);

    // Generate the cubic curve command (C)
    d += `C${ ctrl_x1 },${ ctrl_y1 },${ ctrl_x2 },${ ctrl_y2 },${ x },${ y }`;
  }

  return d;
}


function installer (setup) {

  // Path plugin
  setup.extendPath({
    regularPolygon,
    star,
    circle,
    spiral
  });

}

export default installer;