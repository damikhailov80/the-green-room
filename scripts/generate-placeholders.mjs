import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageNames = [
  'monstera',
  'snake-plant',
  'peace-lily',
  'rubber-plant',
  'fiddle-leaf-fig',
  'zz-plant',
  'pothos',
  'bird-of-paradise',
  'calathea',
  'chinese-evergreen',
  'philodendron-birkin',
  'aloe-vera',
  'jade-plant',
  'echeveria',
  'string-of-pearls',
  'white-pot',
  'sage-pot',
  'macrame',
  'terracotta',
  'plant-stand',
];

const colors = [
  '#dcfce7', // green-100
  '#bbf7d0', // green-200
  '#86efac', // green-300
  '#f0fdf4', // green-50
  '#d1fae5', // emerald-100
];

const svgTemplate = (name, color) => `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="${color}"/>
  <g transform="translate(400, 320)">
    <!-- Simple plant icon -->
    <path d="M 0,-80 Q -40,-120 -60,-140 Q -40,-100 -30,-80 L -10,-20 Z" fill="#166534" opacity="0.3"/>
    <path d="M 0,-80 Q 40,-120 60,-140 Q 40,-100 30,-80 L 10,-20 Z" fill="#166534" opacity="0.3"/>
    <path d="M 0,-80 Q 0,-140 0,-160 Q 0,-120 0,-100 L 0,-20 Z" fill="#166534" opacity="0.4"/>
    <rect x="-4" y="-20" width="8" height="120" fill="#15803d" rx="2"/>
  </g>
  <text x="400" y="550" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="#166534" font-weight="600">${name}</text>
</svg>`;

const outputDir = join(__dirname, '../public/images/plants');

imageNames.forEach((name, index) => {
  const color = colors[index % colors.length];
  const svg = svgTemplate(name, color);
  const filename = `${name}.svg`;
  const filepath = join(outputDir, filename);
  writeFileSync(filepath, svg);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All placeholder images created!');

