// Checks that every option the site forms can send maps to a valid RD Station list option.
// Run: npm run check:rd  (Node 22.6+ for --experimental-strip-types)
import {
  dailyFlowOptions,
  deadlines,
  foodSegments,
  kioskOptions,
  states,
  tabOptions,
  turnstileOptions,
  unitOptions,
} from '../src/data/lead-forms.ts';
import { rdListOptions, toRdListValue } from '../src/utils/rdStation.ts';

const cases: [string, string[]][] = [
  ['segmento', foodSegments],
  ['prazo', deadlines],
  ['estado', [...states, '', 'XX']],
  ['unidades', unitOptions],
  ['catracas', turnstileOptions],
  ['totens', kioskOptions],
  ['comandas', tabOptions],
  ['fluxo', dailyFlowOptions],
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
// These site selects must offer exactly the RD options, 1:1.
const oneToOne: [string, string[]][] = [
  ['prazo', deadlines],
  ['unidades', unitOptions],
  ['catracas', turnstileOptions],
  ['totens', kioskOptions],
  ['comandas', tabOptions],
  ['fluxo', dailyFlowOptions],
];
for (const [field, siteOptions] of oneToOne) {
  if (JSON.stringify(siteOptions) !== JSON.stringify(rdListOptions[field])) {
    failures++;
    console.error(`✗ ${field}: opções do site diferentes das do RD`);
  }
}

if (failures) {
  console.error(`\n${failures} valor(es) inválido(s) para o RD.`);
  process.exit(1);
}
console.log('✓ Todos os campos de lista do site batem com as opções do RD.');
