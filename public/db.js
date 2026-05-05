// Local Database - localStorage based
const DB_KEY = 'mcu_db';

const DEFAULT_DB = {
  rumahSakit: [
    { id: 'rs-1', nama: 'RS Mitra Keluarga Gading Serpong', alamat: 'Tangerang', telepon: '' },
    { id: 'rs-2', nama: 'RS Mitra Keluarga Tegal', alamat: 'Tegal', telepon: '' },
    { id: 'rs-3', nama: 'RS Mitra Keluarga Waru', alamat: 'Sidoarjo', telepon: '' },
    { id: 'rs-4', nama: 'RS Mitra Keluarga Kemayoran', alamat: 'Jakarta Pusat', telepon: '' },
    { id: 'rs-5', nama: 'RS Mitra Keluarga Kelapa Gading', alamat: 'Jakarta Utara', telepon: '' },
    { id: 'rs-6', nama: 'RS Mitra Keluarga Bekasi Timur', alamat: 'Bekasi', telepon: '' }
  ],
  paketMCU: [
    { id: 'paket-1', nama: 'MCU Basic', rsId: 'rs-1', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Ureum','Kreatinin','SGOT','SGPT','Gula Darah Puasa','Kolesterol Total','Asam Urat','Thorax AP/PA'], harga: '450000', keterangan: 'Pemeriksaan dasar screening' },
    { id: 'paket-2', nama: 'MCU Basic Plus', rsId: 'rs-1', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','Urine Lengkap','Thorax AP/PA','EKG','USG Abdomen','Treadmill','HBsAg','Anti HBs','Visus Mata','Audiometri'], harga: '1950000', keterangan: 'Pemeriksaan standar lengkap' },
    { id: 'paket-3', nama: 'Pre-Employment Advance', rsId: 'rs-1', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','Kolesterol Total','Asam Urat','Urine Lengkap','Thorax AP/PA','EKG','Visus Mata'], harga: '1440000', keterangan: 'MCU untuk masuk kerja' },
    { id: 'paket-4', nama: 'MCU Pasangan (Pria)', rsId: 'rs-1', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Golongan Darah/Rhesus','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','HBsAg','Anti HBs','VDRL','Analisa Sperma','Thorax AP/PA'], harga: '3650000', keterangan: 'MCU pra-nikah pria' },
    { id: 'paket-5', nama: 'MCU Pasangan (Wanita)', rsId: 'rs-1', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Golongan Darah/Rhesus','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','HBsAg','Anti HBs','VDRL','TORCH','Pap Smear','USG Abdomen','Thorax AP/PA'], harga: '4700000', keterangan: 'MCU pra-nikah wanita' },
    { id: 'paket-6', nama: 'Cardio Advance Health', rsId: 'rs-2', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','Gula Darah 2 Jam PP','HbA1c','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','EKG','Treadmill','Echocardiography','Thorax AP/PA'], harga: '2550000', keterangan: 'Pemeriksaan jantung lengkap' },
    { id: 'paket-7', nama: 'Classic Health', rsId: 'rs-2', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','EKG','Thorax AP/PA','USG Abdomen'], harga: '1500000', keterangan: 'Pemeriksaan klasik standar' },
    { id: 'paket-8', nama: 'Imperial Executive - Pria', rsId: 'rs-2', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','HbA1c','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','PSA','EKG','Treadmill','Thorax AP/PA','USG Abdomen','Echocardiography','Spirometri','Audiometri','Visus Mata','HBsAg','Anti HBs'], harga: '3700000', keterangan: 'Executive pria lengkap' },
    { id: 'paket-9', nama: 'Imperial Executive - Wanita', rsId: 'rs-2', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','HbA1c','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','Pap Smear','USG Mammae','EKG','Treadmill','Thorax AP/PA','USG Abdomen','Echocardiography','Spirometri','Audiometri','Visus Mata','HBsAg','Anti HBs','CA 125','CA 15-3','Thyroid (TSH)'], harga: '5050000', keterangan: 'Executive wanita lengkap' },
    { id: 'paket-10', nama: 'Pre-Employment', rsId: 'rs-2', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Thorax AP/PA','Urine Narkoba'], harga: '550000', keterangan: 'MCU masuk kerja basic' },
    { id: 'paket-11', nama: 'MCU Pelaut', rsId: 'rs-2', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','Kolesterol Total','Asam Urat','HBsAg','Anti HIV','VDRL','Thorax AP/PA','EKG','Visus Mata'], harga: '800000', keterangan: 'MCU khusus pelaut' },
    { id: 'paket-12', nama: 'MCU Anggrek', rsId: 'rs-3', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Gula Darah Puasa','Kolesterol Total','Asam Urat','Thorax AP/PA','EKG','Visus Mata'], harga: '550000', keterangan: 'Paket dasar Waru' },
    { id: 'paket-13', nama: 'MCU Brassia', rsId: 'rs-3', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','HBsAg','Thorax AP/PA','EKG','USG Abdomen','Visus Mata'], harga: '1250000', keterangan: 'Paket menengah Waru' },
    { id: 'paket-14', nama: 'MCU Chryssant (Pria)', rsId: 'rs-3', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','HbA1c','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','PSA','HBsAg','Thorax AP/PA','EKG','Treadmill','USG Abdomen','Visus Mata'], harga: '3500000', keterangan: 'Executive pria Waru' },
    { id: 'paket-15', nama: 'MCU Daisy (Wanita)', rsId: 'rs-3', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Ureum','Kreatinin','Gula Darah Puasa','HbA1c','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','Pap Smear','HBsAg','Thorax AP/PA','EKG','Treadmill','USG Abdomen','Visus Mata'], harga: '3500000', keterangan: 'Executive wanita Waru' },
    { id: 'paket-16', nama: 'Royal Executive - Pria', rsId: 'rs-2', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Gamma GT','Ureum','Kreatinin','Gula Darah Puasa','HbA1c','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','PSA','CEA','AFP','EKG','Treadmill','Echocardiography','Thorax AP/PA','USG Abdomen','Spirometri','Audiometri','Visus Mata','HBsAg','Anti HBs','Anti HIV','Thyroid (TSH)'], harga: '4900000', keterangan: 'Royal executive pria' },
    { id: 'paket-17', nama: 'Royal Executive - Wanita', rsId: 'rs-2', items: ['Konsultasi Dokter Umum MCU','Darah Lengkap','Urine Lengkap','SGPT','SGOT','Gamma GT','Ureum','Kreatinin','Gula Darah Puasa','HbA1c','Kolesterol Total','Kolesterol HDL','Kolesterol LDL','Trigliserida','Asam Urat','CA 125','CA 15-3','CEA','AFP','Pap Smear','USG Mammae','EKG','Treadmill','Echocardiography','Thorax AP/PA','USG Abdomen','Spirometri','Audiometri','Visus Mata','HBsAg','Anti HBs','Anti HIV','Thyroid (TSH)','Bone Densitometry'], harga: '6250000', keterangan: 'Royal executive wanita' }
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
