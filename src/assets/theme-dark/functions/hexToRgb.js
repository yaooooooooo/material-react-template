/**
  The hexToRgb() function helps you to change the hex color code to rgb
  using chroma-js library.
 */

import chroma from "chroma-js";

function hexToRgb(color) {
  return chroma(color).rgb().join(", ");
}

export default hexToRgb;
