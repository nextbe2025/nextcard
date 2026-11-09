// Checks that every option the site forms can send maps to a valid RD Station list option.
// Run: npm run check:rd  (Node 22.6+ for --experimental-strip-types)
import { deadlines, foodSegments, states } from '../src/data/lead-forms.ts';
import { rdListOptions, toRdListValue } from '../src/utils/rdStation.ts';

const cases: [string, string[]][] = [
  ['segmento', foodSegments],
  ['prazo', deadlines],
  ['estado', [...states, '', 'XX']],
];

let failures = 0;
for (const [field, values] of cases) {
  for (const value of values) {
    const sent = toRdListValue[field](value);
    if (sent === undefined || !rdListOptions[field].includes(sent)) {
      failures++;
      console.error(`✗ ${field}: "${value}" → ${JSON.stringify(sent)} (fora da lista do RD)`);
    }
  }
}
// The site must offer every deadline RD has, 1:1.
for (const option of rdListOptions.prazo) {
  if (!deadlines.includes(option)) {
    failures++;
    console.error(`✗ prazo: opção do RD "${option}" não existe no site`);
  }
}

if (failures) {
  console.error(`\n${failures} valor(es) inválido(s) para o RD.`);
  process.exit(1);
}
console.log('✓ Todos os valores de segmento, prazo e estado batem com as listas do RD.');
