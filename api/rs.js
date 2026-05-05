// API: Master Rumah Sakit
const { readDB, writeDB, setCORS } = require('./data');

module.exports = (req, res) => {
  setCORS(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = readDB();

  if (req.method === 'GET') {
    return res.json(db.rumahSakit || []);
  }

  if (req.method === 'POST') {
    const { nama, alamat, telepon } = req.body;
    if (!nama) return res.status(400).json({ error: 'Nama RS wajib diisi' });
    const id = 'rs-' + Date.now().toString(36);
    const rs = { id, nama, alamat: alamat || '', telepon: telepon || '' };
    db.rumahSakit.push(rs);
    writeDB(db);
    return res.status(201).json(rs);
  }

  if (req.method === 'PUT') {
    const { id, nama, alamat, telepon } = req.body;
    if (!id) return res.status(400).json({ error: 'ID wajib' });
    const idx = db.rumahSakit.findIndex(r => r.id === id);
    if (idx === -1) return res.status(404).json({ error: 'RS tidak ditemukan' });
    if (nama) db.rumahSakit[idx].nama = nama;
    if (alamat !== undefined) db.rumahSakit[idx].alamat = alamat;
    if (telepon !== undefined) db.rumahSakit[idx].telepon = telepon;
    writeDB(db);
    return res.json(db.rumahSakit[idx]);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'ID wajib' });
    const idx = db.rumahSakit.findIndex(r => r.id === id);
    if (idx === -1) return res.status(404).json({ error: 'RS tidak ditemukan' });
    const deleted = db.rumahSakit.splice(idx, 1);
    writeDB(db);
    return res.json({ message: 'RS dihapus', data: deleted[0] });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
