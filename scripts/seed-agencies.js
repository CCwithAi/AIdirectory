import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the agency data
import { agencyData } from '../src/components/AgencyData.js';

// Add createdAt timestamp to each agency
const agenciesWithTimestamp = agencyData.map(agency => ({
  ...agency,
  createdAt: new Date('2025-01-01T00:00:00.000Z').toISOString()
}));

// Write to data/agencies.json
const dataPath = path.join(__dirname, '..', 'data', 'agencies.json');
fs.writeFileSync(dataPath, JSON.stringify(agenciesWithTimestamp, null, 2), 'utf8');

console.log(`✅ Successfully seeded ${agenciesWithTimestamp.length} agencies to data/agencies.json`);
