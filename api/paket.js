// API: Manajemen Paket MCU (CRUD)
const { readDB, writeDB, setCORS } = require('./data');

module.exports = (req, res) => {
  setCORS(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = readDB();

  // GET - List semua paket
  if (req.method === 'GET') {
    return res.json(db.paketMCU || []);
  }

  // POST - Tambah paket baru
  if (req.method === 'POST') {
    const { nama, items, harga, keterangan } = req.body;
    if (!nama || !items || !items.length) {
      return res.status(400).json({ error: 'Nama paket dan items wajib diisi' });
    }

    const id = 'paket-' + Date.now().toString(36);
    const newPaket = { id, nama, items, harga: harga || '', keterangan: keterangan || '' };
    db.paketMCU.push(newPaket);
    writeDB(db);
    return res.status(201).json(newPaket);
  }

  // PUT - Edit paket
  if (req.method === 'PUT') {
    const { id, nama, items, harga, keterangan } = req.body;
    if (!id) return res.status(400).json({ error: 'ID paket wajib' });

    const idx = db.paketMCU.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Paket tidak ditemukan' });

    if (nama) db.paketMCU[idx].nama = nama;
    if (items) db.paketMCU[idx].items = items;
    if (harga !== undefined) db.paketMCU[idx].harga = harga;
    if (keterangan !== undefined) db.paketMCU[idx].keterangan = keterangan;

    writeDB(db);
    return res.json(db.paketMCU[idx]);
  }

  // DELETE - Hapus paket
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'ID paket wajib' });

    const idx = db.paketMCU.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Paket tidak ditemukan' });

    const deleted = db.paketMCU.splice(idx, 1);
    writeDB(db);
    return res.json({ message: 'Paket dihapus', data: deleted[0] });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
