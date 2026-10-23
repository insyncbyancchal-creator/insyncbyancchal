const { PATHS, LETTERS, DOT, STEM, FRAME, GUIDES, BY_TRANSFORM, GRID_STROKE } = require('./src/components/Preloader/preloader-data.js');

const INK = "#222220";
const EMERALD = "#0E5F3D";

function buildMarkup() {
  let defs = Object.entries(PATHS).map(([k, d]) => `<path id="p-${k}" d="${d}"/>`).join("");
  LETTERS.forEach(([id, , , cx, cw]) => {
    defs += `<clipPath id="clip-${id}"><rect x="${cx}" y="512" width="${cw}" height="192"/></clipPath>`;
  });

  const line = (cls, k, [x1, y1, x2, y2], stroke, w, extra = "") =>
    `<line class="${cls}" data-k="${k}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" ${extra}/>`;

  const guides = Object.entries(GUIDES)
    .map(([k, g]) => line("gd", k, g, INK, 1, 'stroke-opacity=".28" vector-effect="non-scaling-stroke"'))
    .join("");
  const letters = LETTERS.map(
    ([id, key, dx]) =>
      `<g clip-path="url(#clip-${id})"><g class="rise" data-k="${id}"><use href="#p-${key}" transform="translate(${dx} 0)" fill="${INK}"/></g></g>`
  ).join("");
  const grids = LETTERS.map(([id, , , , , x, y, w, h]) => {
    const cw3 = w / 3, ch3 = h / 3;
    const inner = [1, 2]
      .map(
        (i) =>
          `<line x1="${x + i * cw3}" y1="${y}" x2="${x + i * cw3}" y2="${y + h}"/><line x1="${x}" y1="${y + i * ch3}" x2="${x + w}" y2="${y + i * ch3}"/>`
      )
      .join("");
    return `<g class="grid" data-k="${id}" fill="none" stroke="${GRID_STROKE}" stroke-width="1" vector-effect="non-scaling-stroke" opacity="0"><rect x="${x}" y="${y}" width="${w}" height="${h}"/>${inner}</g>`;
  }).join("");
  const frame = Object.entries(FRAME).map(([k, f]) => line("fl", k, f, EMERALD, 4.5)).join("");

  return `<defs>${defs}</defs>
      <g id="guides">${guides}</g>
      <g id="grids">${grids}</g>
      <g id="letters">${letters}</g>
      <g id="by"><use href="#p-by" transform="${BY_TRANSFORM}" fill="${INK}"/></g>
      <g id="ifill"><rect id="stem" x="${STEM.x}" y="${STEM.y + STEM.h}" width="${STEM.w}" height="0" fill="${EMERALD}"/>
                    <rect id="dot" x="${DOT.x}" y="${DOT.y + DOT.h}" width="${DOT.w}" height="0" fill="${EMERALD}"/></g>
      <g id="frame">${frame}</g>`;
}

const markup = buildMarkup();
console.log("Markup generated successfully, length:", markup.length);
console.log("Sample markup start:", markup.slice(0, 200));
