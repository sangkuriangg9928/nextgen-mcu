// API: Dashboard Monitoring / Command Center (Step 3 + Step 7)
const { readDB, setCORS } = require('./data');

module.exports = (req, res) => {
  setCORS(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const db = readDB();
  const peserta = db.peserta;
  const total = peserta.length;

  // Step 3: Monitoring Kehadiran
  const hadir = peserta.filter(p => p.statusKehadiran === 'Hadir').length;
  const tidakHadir = total - hadir;

  // Step 7: Status pemeriksaan
  const checked = peserta.filter(p => p.status && p.status.startsWith('Checked')).length;
  const onProgress = peserta.filter(p => p.status === 'On Progress').length;
  const selesaiReview = peserta.filter(p => p.status && p.status.startsWith('Selesai')).length;
  const pending = peserta.filter(p => p.status === 'Terdaftar' || p.status === 'Registrasi').length;

  // Progress per paket
  const paketStats = {};
  ['paket-1', 'paket-2', 'paket-3', 'paket-4'].forEach(paketId => {
    const pesertaPaket = peserta.filter(p => p.paketMCU === paketId);
    const totalPaket = pesertaPaket.length;
    const selesaiPaket = pesertaPaket.filter(p =>
      p.status && (p.status.startsWith('Checked') || p.status.startsWith('Selesai'))
    ).length;

    paketStats[paketId] = {
      total: totalPaket,
      selesai: selesaiPaket,
      progress: totalPaket > 0 ? Math.round((selesaiPaket / totalPaket) * 100) : 0
    };
  });

  // Progress per unit pemeriksaan
  const unitStats = {};
  const units = ['pemeriksaanAwal', 'konsultasiMedis', 'konsultasiGizi', 'laboratorium', 'radiologi', 'ekg', 'tesLainnya'];
  units.forEach(unit => {
    const checkedUnit = peserta.filter(p =>
      p.pemeriksaan && p.pemeriksaan[unit] && p.pemeriksaan[unit].status === 'Checked'
    ).length;
    const onProgressUnit = peserta.filter(p =>
      p.pemeriksaan && p.pemeriksaan[unit] && p.pemeriksaan[unit].status === 'On Progress'
    ).length;

    unitStats[unit] = {
      checked: checkedUnit,
      onProgress: onProgressUnit,
      pending: total - checkedUnit - onProgressUnit
    };
  });

  // Kesimpulan MCU
  const fitKerja = peserta.filter(p => p.kesimpulan === 'Fit').length;
  const fitCatatan = peserta.filter(p => p.kesimpulan === 'Fit dengan Catatan').length;
  const unfit = peserta.filter(p => p.kesimpulan === 'Unfit').length;
  const belumReview = peserta.filter(p => !p.kesimpulan || p.kesimpulan === '').length;

  return res.json({
    summary: {
      totalPeserta: total,
      registered: hadir,
      tidakHadir,
      checked,
      onProgress,
      selesaiReview,
      pending
    },
    kehadiran: { hadir, tidakHadir, total },
    paketStats,
    unitStats,
    kesimpulan: { fitKerja, fitCatatan, unfit, belumReview },
    lastUpdate: new Date().toISOString()
  });
};
