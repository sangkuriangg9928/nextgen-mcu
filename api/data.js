// Shared data layer - JSON file storage di /tmp untuk Vercel
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join('/tmp', 'mcu-db.json');

const DEFAULT_DB = {
  peserta: [],
  rumahSakit: [
    { id: 'rs-1', nama: 'RS Mitra Keluarga Grand Wisata', alamat: 'Bekasi', telepon: '' },
    { id: 'rs-2', nama: 'RS Mitra Keluarga Kemayoran', alamat: 'Jakarta Pusat', telepon: '' },
    { id: 'rs-3', nama: 'RS Mitra Keluarga Kelapa Gading', alamat: 'Jakarta Utara', telepon: '' }
  ],
  paketMCU: [
    {
      id: 'paket-1',
      nama: 'Paket 1 - Basic',
      items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Laboratorium'],
      harga: '350000',
      keterangan: 'Pemeriksaan dasar untuk screening awal'
    },
    {
      id: 'paket-2',
      nama: 'Paket 2 - Standard',
      items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi'],
      harga: '750000',
      keterangan: 'Pemeriksaan standar untuk karyawan'
    },
    {
      id: 'paket-3',
      nama: 'Paket 3 - Executive',
      items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi', 'EKG'],
      harga: '1500000',
      keterangan: 'Pemeriksaan lengkap untuk level manajerial'
    },
    {
      id: 'paket-4',
      nama: 'Paket 4 - Comprehensive',
      items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi', 'EKG', 'Tes Lainnya'],
      harga: '2500000',
      keterangan: 'Pemeriksaan paling lengkap termasuk tes tambahan'
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
      const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      let changed = false;
      if (!data.paketMCU || !data.paketMCU.length) {
        data.paketMCU = JSON.parse(JSON.stringify(DEFAULT_DB.paketMCU));
        changed = true;
      }
      if (!data.rumahSakit) {
        data.rumahSakit = JSON.parse(JSON.stringify(DEFAULT_DB.rumahSakit));
        changed = true;
      }
      if (!data.peserta) { data.peserta = []; changed = true; }
      if (!data.settings) { data.settings = DEFAULT_DB.settings; changed = true; }
      if (changed) writeDB(data);
      return data;
    }
  } catch (e) {
    console.error('DB read error:', e);
  }
  const fresh = JSON.parse(JSON.stringify(DEFAULT_DB));
  writeDB(fresh);
  return fresh;
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
