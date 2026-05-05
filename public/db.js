// Local Database - localStorage based
const DB_KEY = 'mcu_db';

const DEFAULT_DB = {
  rumahSakit: [
    { id: 'rs-1', nama: 'RS Mitra Keluarga Grand Wisata', alamat: 'Bekasi', telepon: '021-8261111' },
    { id: 'rs-2', nama: 'RS Mitra Keluarga Kemayoran', alamat: 'Jakarta Pusat', telepon: '021-6545555' },
    { id: 'rs-3', nama: 'RS Mitra Keluarga Kelapa Gading', alamat: 'Jakarta Utara', telepon: '021-4535555' }
  ],
  paketMCU: [
    { id: 'paket-1', nama: 'Paket 1 - Basic', rsId: 'rs-1', items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Laboratorium'], harga: '350000', keterangan: 'Pemeriksaan dasar screening' },
    { id: 'paket-2', nama: 'Paket 2 - Standard', rsId: 'rs-1', items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi'], harga: '750000', keterangan: 'Pemeriksaan standar karyawan' },
    { id: 'paket-3', nama: 'Paket 3 - Executive', rsId: 'rs-2', items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi', 'EKG'], harga: '1500000', keterangan: 'Pemeriksaan lengkap manajerial' },
    { id: 'paket-4', nama: 'Paket 4 - Comprehensive', rsId: 'rs-2', items: ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi', 'EKG', 'Tes Lainnya'], harga: '2500000', keterangan: 'Pemeriksaan paling lengkap' }
  ],
  peserta: [],
  settings: { namaRS: 'Mitra Keluarga', eventName: 'NextGen Mobile MCU' }
};

function getDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (!data.rumahSakit) data.rumahSakit = DEFAULT_DB.rumahSakit;
      if (!data.paketMCU || !data.paketMCU.length) data.paketMCU = DEFAULT_DB.paketMCU;
      if (!data.peserta) data.peserta = [];
      return data;
    }
  } catch (e) { console.error('DB error:', e); }
  return JSON.parse(JSON.stringify(DEFAULT_DB));
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// RS CRUD
function getAllRS() { return getDB().rumahSakit; }
function addRS(rs) { const db = getDB(); rs.id = 'rs-' + Date.now().toString(36); db.rumahSakit.push(rs); saveDB(db); return rs; }
function updateRS(rs) { const db = getDB(); const i = db.rumahSakit.findIndex(r => r.id === rs.id); if (i >= 0) { db.rumahSakit[i] = { ...db.rumahSakit[i], ...rs }; saveDB(db); return db.rumahSakit[i]; } return null; }
function deleteRS(id) { const db = getDB(); db.rumahSakit = db.rumahSakit.filter(r => r.id !== id); saveDB(db); }

// Paket CRUD
function getAllPaket() { return getDB().paketMCU; }
function getPaketByRS(rsId) { return getDB().paketMCU.filter(p => p.rsId === rsId || !p.rsId); }
function addPaket(p) { const db = getDB(); p.id = 'paket-' + Date.now().toString(36); db.paketMCU.push(p); saveDB(db); return p; }
function updatePaket(p) { const db = getDB(); const i = db.paketMCU.findIndex(x => x.id === p.id); if (i >= 0) { db.paketMCU[i] = { ...db.paketMCU[i], ...p }; saveDB(db); return db.paketMCU[i]; } return null; }
function deletePaket(id) { const db = getDB(); db.paketMCU = db.paketMCU.filter(p => p.id !== id); saveDB(db); }

// Peserta CRUD
function getAllPeserta() { return getDB().peserta; }
function addPeserta(p) {
  const db = getDB();
  p.id = 'MCU-' + new Date().getFullYear() + String(db.peserta.length + 1).padStart(5, '0');
  p.statusKehadiran = 'Belum Hadir';
  p.status = 'Terdaftar';
  p.waktuRegistrasi = null;
  p.foto = p.foto || '';
  p.qrCode = '';
  p.pemeriksaan = {
    pemeriksaanAwal: { status: 'Pending', data: null, waktu: null, petugas: '' },
    konsultasiMedis: { status: 'Pending', data: null, waktu: null, petugas: '' },
    konsultasiGizi: { status: 'Pending', data: null, waktu: null, petugas: '' },
    laboratorium: { status: 'Pending', data: null, waktu: null, petugas: '' },
    radiologi: { status: 'Pending', data: null, waktu: null, petugas: '' },
    ekg: { status: 'Pending', data: null, waktu: null, petugas: '' },
    tesLainnya: { status: 'Pending', data: null, waktu: null, petugas: '' }
  };
  p.kesimpulan = '';
  p.dokterReview = '';
  p.catatanDokter = '';
  p.tanggalDaftar = new Date().toISOString();
  db.peserta.push(p);
  saveDB(db);
  return p;
}
function addPesertaBulk(arr) {
  let added = 0, skipped = 0;
  const db = getDB();
  arr.forEach(item => {
    if (db.peserta.find(p => p.nik === item.nik)) { skipped++; return; }
    item.id = 'MCU-' + new Date().getFullYear() + String(db.peserta.length + added + 1).padStart(5, '0');
    item.statusKehadiran = 'Belum Hadir'; item.status = 'Terdaftar';
    item.waktuRegistrasi = null; item.foto = ''; item.qrCode = '';
    item.pemeriksaan = { pemeriksaanAwal:{status:'Pending',data:null,waktu:null,petugas:''}, konsultasiMedis:{status:'Pending',data:null,waktu:null,petugas:''}, konsultasiGizi:{status:'Pending',data:null,waktu:null,petugas:''}, laboratorium:{status:'Pending',data:null,waktu:null,petugas:''}, radiologi:{status:'Pending',data:null,waktu:null,petugas:''}, ekg:{status:'Pending',data:null,waktu:null,petugas:''}, tesLainnya:{status:'Pending',data:null,waktu:null,petugas:''} };
    item.kesimpulan = ''; item.dokterReview = ''; item.catatanDokter = '';
    item.tanggalDaftar = new Date().toISOString();
    db.peserta.push(item); added++;
  });
  saveDB(db);
  return { added, skipped };
}
function updatePeserta(id, updates) {
  const db = getDB();
  const i = db.peserta.findIndex(p => p.id === id);
  if (i < 0) return null;
  db.peserta[i] = { ...db.peserta[i], ...updates };
  saveDB(db);
  return db.peserta[i];
}
function registrasiPeserta(id, foto) {
  const db = getDB();
  const i = db.peserta.findIndex(p => p.id === id);
  if (i < 0) return null;
  db.peserta[i].statusKehadiran = 'Hadir';
  db.peserta[i].waktuRegistrasi = new Date().toISOString();
  db.peserta[i].foto = foto || db.peserta[i].foto;
  db.peserta[i].qrCode = db.peserta[i].id;
  db.peserta[i].status = 'Registrasi';
  saveDB(db);
  return db.peserta[i];
}
function deletePeserta(id) { const db = getDB(); db.peserta = db.peserta.filter(p => p.id !== id); saveDB(db); }
function savePemeriksaanUnit(pesertaId, unitKey, data, petugas) {
  const db = getDB();
  const i = db.peserta.findIndex(p => p.id === pesertaId);
  if (i < 0) return null;
  db.peserta[i].pemeriksaan[unitKey] = { status: 'Checked', data, waktu: new Date().toISOString(), petugas };
  // Update overall status
  const paket = db.paketMCU.find(pk => pk.id === db.peserta[i].paketMCU);
  if (paket) {
    const UK2 = {'Pemeriksaan Awal':'pemeriksaanAwal','Konsultasi Medis':'konsultasiMedis','Konsultasi Gizi':'konsultasiGizi','Laboratorium':'laboratorium','Radiologi':'radiologi','EKG':'ekg','Tes Lainnya':'tesLainnya'};
    const keys = paket.items.map(it => UK2[it]).filter(Boolean);
    const done = keys.filter(k => db.peserta[i].pemeriksaan[k] && db.peserta[i].pemeriksaan[k].status === 'Checked').length;
    db.peserta[i].status = done === keys.length ? 'Checked (Selesai)' : 'On Progress';
  }
  saveDB(db);
  return db.peserta[i];
}
function saveReview(pesertaId, kesimpulan, dokter, catatan) {
  const db = getDB();
  const i = db.peserta.findIndex(p => p.id === pesertaId);
  if (i < 0) return null;
  db.peserta[i].kesimpulan = kesimpulan;
  db.peserta[i].dokterReview = dokter;
  db.peserta[i].catatanDokter = catatan;
  db.peserta[i].waktuReview = new Date().toISOString();
  db.peserta[i].status = 'Selesai - ' + kesimpulan;
  saveDB(db);
  return db.peserta[i];
}
// Dashboard stats
function getDashStats() {
  const peserta = getAllPeserta();
  const total = peserta.length;
  const hadir = peserta.filter(p => p.statusKehadiran === 'Hadir').length;
  const checked = peserta.filter(p => p.status && p.status.startsWith('Checked')).length;
  const onProgress = peserta.filter(p => p.status === 'On Progress').length;
  const selesai = peserta.filter(p => p.status && p.status.startsWith('Selesai')).length;
  const pending = peserta.filter(p => p.status === 'Terdaftar' || p.status === 'Registrasi').length;
  return { total, hadir, tidakHadir: total - hadir, checked, onProgress, selesai, pending };
}
