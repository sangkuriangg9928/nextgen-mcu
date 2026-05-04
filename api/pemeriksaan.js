// API: Pemeriksaan per Unit (Step 4-5) + Review Dokter (Step 8)
const { readDB, writeDB, setCORS } = require('./data');

module.exports = (req, res) => {
  setCORS(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = readDB();

  // POST - Input hasil pemeriksaan per unit
  if (req.method === 'POST') {
    const { pesertaId, unit, data: hasilData, petugas } = req.body;

    if (!pesertaId || !unit) {
      return res.status(400).json({ error: 'pesertaId dan unit wajib diisi' });
    }

    const idx = db.peserta.findIndex(p => p.id === pesertaId);
    if (idx === -1) return res.status(404).json({ error: 'Peserta tidak ditemukan' });

    const unitKey = unitToKey(unit);
    if (!unitKey) return res.status(400).json({ error: 'Unit tidak valid' });

    // Update pemeriksaan unit
    db.peserta[idx].pemeriksaan[unitKey] = {
      status: 'Checked',
      data: hasilData || {},
      waktu: new Date().toISOString(),
      petugas: petugas || ''
    };

    // Update overall status
    db.peserta[idx].status = calculateOverallStatus(db.peserta[idx]);

    writeDB(db);
    return res.json({
      message: `Pemeriksaan ${unit} untuk ${db.peserta[idx].nama} berhasil disimpan`,
      peserta: db.peserta[idx]
    });
  }

  // PUT - Review dokter (Step 8)
  if (req.method === 'PUT') {
    const { pesertaId, kesimpulan, dokter, catatan } = req.body;

    if (!pesertaId) return res.status(400).json({ error: 'pesertaId wajib diisi' });

    const idx = db.peserta.findIndex(p => p.id === pesertaId);
    if (idx === -1) return res.status(404).json({ error: 'Peserta tidak ditemukan' });

    db.peserta[idx].kesimpulan = kesimpulan || '';
    db.peserta[idx].dokterReview = dokter || '';
    db.peserta[idx].waktuReview = new Date().toISOString();
    db.peserta[idx].catatanDokter = catatan || '';
    db.peserta[idx].status = 'Selesai - ' + (kesimpulan || 'Reviewed');

    writeDB(db);
    return res.json({
      message: `Review dokter untuk ${db.peserta[idx].nama} berhasil disimpan`,
      peserta: db.peserta[idx]
    });
  }

  // GET - Ambil data pemeriksaan peserta
  if (req.method === 'GET') {
    const { pesertaId, unit } = req.query;

    if (!pesertaId) return res.status(400).json({ error: 'pesertaId wajib diisi' });

    const peserta = db.peserta.find(p => p.id === pesertaId);
    if (!peserta) return res.status(404).json({ error: 'Peserta tidak ditemukan' });

    if (unit) {
      const unitKey = unitToKey(unit);
      if (!unitKey) return res.status(400).json({ error: 'Unit tidak valid' });
      return res.json(peserta.pemeriksaan[unitKey]);
    }

    return res.json(peserta.pemeriksaan);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

function unitToKey(unit) {
  const map = {
    'Pemeriksaan Awal': 'pemeriksaanAwal',
    'Konsultasi Medis': 'konsultasiMedis',
    'Konsultasi Gizi': 'konsultasiGizi',
    'Laboratorium': 'laboratorium',
    'Radiologi': 'radiologi',
    'EKG': 'ekg',
    'Tes Lainnya': 'tesLainnya'
  };
  return map[unit] || null;
}

function calculateOverallStatus(peserta) {
  const pem = peserta.pemeriksaan;
  const paketItems = getPaketItems(peserta.paketMCU);

  const allKeys = paketItems.map(item => unitToKey(item)).filter(Boolean);
  const checkedCount = allKeys.filter(k => pem[k] && pem[k].status === 'Checked').length;
  const totalCount = allKeys.length;

  if (checkedCount === 0) return 'Registrasi';
  if (checkedCount === totalCount) return 'Checked (Selesai)';
  return 'On Progress';
}

function getPaketItems(paketId) {
  const pakets = {
    'paket-1': ['Pemeriksaan Awal', 'Konsultasi Medis', 'Laboratorium'],
    'paket-2': ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi'],
    'paket-3': ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi', 'EKG'],
    'paket-4': ['Pemeriksaan Awal', 'Konsultasi Medis', 'Konsultasi Gizi', 'Laboratorium', 'Radiologi', 'EKG', 'Tes Lainnya']
  };
  return pakets[paketId] || pakets['paket-1'];
}
