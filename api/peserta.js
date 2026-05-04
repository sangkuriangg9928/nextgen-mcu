// API: Master Data Peserta + Registrasi
const { readDB, writeDB, setCORS } = require('./data');

module.exports = (req, res) => {
  setCORS(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = readDB();

  // GET - List / search / single
  if (req.method === 'GET') {
    const { id, search, status } = req.query;

    if (id) {
      const p = db.peserta.find(x => x.id === id);
      if (!p) return res.status(404).json({ error: 'Peserta tidak ditemukan' });
      return res.json(p);
    }

    let result = db.peserta;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.nama.toLowerCase().includes(q) ||
        p.nik.includes(q) ||
        (p.perusahaan || '').toLowerCase().includes(q) ||
        (p.nomorPeserta || '').toLowerCase().includes(q)
      );
    }

    if (status) {
      result = result.filter(p => p.statusKehadiran === status);
    }

    return res.json(result);
  }

  // POST - Import / tambah peserta (Step 1: Master Data)
  if (req.method === 'POST') {
    const body = req.body;

    // Bulk import dari Excel
    if (Array.isArray(body)) {
      const added = [];
      const skipped = [];

      body.forEach(item => {
        const exists = db.peserta.find(p => p.nik === item.nik);
        if (exists) {
          skipped.push(item.nik);
          return;
        }

        const peserta = createPeserta(item, db.peserta.length + added.length + 1);
        db.peserta.push(peserta);
        added.push(peserta);
      });

      writeDB(db);
      return res.status(201).json({
        message: `${added.length} peserta ditambahkan, ${skipped.length} dilewati (duplikat)`,
        added: added.length,
        skipped: skipped.length
      });
    }

    // Single add
    if (!body.nama || !body.nik) {
      return res.status(400).json({ error: 'Nama dan NIK wajib diisi' });
    }

    const exists = db.peserta.find(p => p.nik === body.nik);
    if (exists) {
      return res.status(400).json({ error: 'NIK sudah terdaftar' });
    }

    const peserta = createPeserta(body, db.peserta.length + 1);
    db.peserta.push(peserta);
    writeDB(db);
    return res.status(201).json(peserta);
  }

  // PUT - Update peserta / registrasi ulang (Step 2)
  if (req.method === 'PUT') {
    const body = req.body;
    const idx = db.peserta.findIndex(p => p.id === body.id);
    if (idx === -1) return res.status(404).json({ error: 'Peserta tidak ditemukan' });

    // Registrasi ulang kehadiran
    if (body.action === 'registrasi') {
      db.peserta[idx].statusKehadiran = 'Hadir';
      db.peserta[idx].waktuRegistrasi = new Date().toISOString();
      db.peserta[idx].foto = body.foto || '';
      db.peserta[idx].qrCode = body.qrCode || generateQR(db.peserta[idx].id);
      db.peserta[idx].status = 'Registrasi';
    } else {
      // Update data biasa
      const { id, action, ...updates } = body;
      db.peserta[idx] = { ...db.peserta[idx], ...updates };
    }

    writeDB(db);
    return res.json(db.peserta[idx]);
  }

  // DELETE
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const idx = db.peserta.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Peserta tidak ditemukan' });

    const deleted = db.peserta.splice(idx, 1);
    writeDB(db);
    return res.json({ message: 'Peserta dihapus', data: deleted[0] });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

function createPeserta(data, seq) {
  const now = new Date();
  const id = 'MCU-' + now.getFullYear() + String(seq).padStart(5, '0');

  return {
    id,
    nomorPeserta: id,
    nama: data.nama,
    nik: data.nik,
    tanggalLahir: data.tanggalLahir || '',
    jenisKelamin: data.jenisKelamin || '',
    alamat: data.alamat || '',
    telepon: data.telepon || '',
    email: data.email || '',
    perusahaan: data.perusahaan || '',
    jabatan: data.jabatan || '',
    departemen: data.departemen || '',
    paketMCU: data.paketMCU || 'paket-1',
    // Status tracking
    statusKehadiran: 'Belum Hadir',
    status: 'Terdaftar',
    waktuRegistrasi: null,
    foto: '',
    qrCode: '',
    // Pemeriksaan per unit
    pemeriksaan: {
      pemeriksaanAwal: { status: 'Pending', data: null, waktu: null, petugas: '' },
      konsultasiMedis: { status: 'Pending', data: null, waktu: null, petugas: '' },
      konsultasiGizi: { status: 'Pending', data: null, waktu: null, petugas: '' },
      laboratorium: { status: 'Pending', data: null, waktu: null, petugas: '' },
      radiologi: { status: 'Pending', data: null, waktu: null, petugas: '' },
      ekg: { status: 'Pending', data: null, waktu: null, petugas: '' },
      tesLainnya: { status: 'Pending', data: null, waktu: null, petugas: '' }
    },
    // Hasil akhir
    kesimpulan: '',
    dokterReview: '',
    waktuReview: null,
    catatanDokter: '',
    tanggalDaftar: now.toISOString()
  };
}

function generateQR(id) {
  return `QR-${id}-${Date.now().toString(36).toUpperCase()}`;
}
