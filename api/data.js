// Shared data layer - JSON file storage di /tmp untuk Vercel
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join('/tmp', 'mcu-db.json');

const DEFAULT_DB = {
  peserta: [],
  paketMCU: [
    {
      id: 'paket-1',
      nama: 'Paket 1 - Basic',
      items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Laboratorium']
    },
    {
      id: 'paket-2',
      nama: 'Paket 2 - Standard',
      items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi']
    },
    {
      id: 'paket-3',
      nama: 'Paket 3 - Executive',
      items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi', 'EKG']
    },
    {
      id: 'paket-4',
      nama: 'Paket 4 - Comprehensive',
      items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi', 'EKG', 'Tes Lainnya']
    }
  ],
  settings: {
    namaRS: 'Mitra Keluarga',
    eventName: 'NextGen Mobile MCU'
  }
};

function readDB() {
  try {
    if (fs.existsSync(DB_PATH)) {
      return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('DB read error:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DB));
}

function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = { readDB, writeDB, setCORS, DEFAULT_DB };
