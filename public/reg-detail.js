// Form Registrasi Peserta MCU - Detail View
function getCurrentUserName(){try{const u=JSON.parse(localStorage.getItem('mcu_user')||'{}');return u.nama||'Admin';}catch(e){return 'Admin';}}
function openRegDetail(id){
  const p=getAllPeserta().find(x=>x.id===id);
  if(!p)return toast('Peserta tidak ditemukan');
  const items=getPI(p.paketMCU);
  const noCase=p.noCase||String(Math.floor(Math.random()*9000)+1000);
  const qrUrl='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(p.id);
  const now=new Date();
  const tglReg=p.waktuRegistrasi?new Date(p.waktuRegistrasi).toLocaleDateString('id-ID')+', '+new Date(p.waktuRegistrasi).toLocaleTimeString('id-ID'):now.toLocaleDateString('id-ID')+', '+now.toLocaleTimeString('id-ID');
  const stBadge=p.statusKehadiran==='Hadir'?'<span style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;background:rgba(5,150,105,.1);color:#059669">Sudah Registrasi</span>':'<span style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;background:rgba(245,158,11,.1);color:#F59E0B">Belum Registrasi</span>';
  
  const sec=document.getElementById('p-registrasi');
  if(!sec._origHTML)sec._origHTML=sec.innerHTML;
  
  const inputStyle='width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:8px;font-size:13px;font-family:inherit;background:#f8fafc;outline:none;box-sizing:border-box';
  const labelStyle='font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:6px';
  
  sec.innerHTML=`
<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
  <button onclick="closeRegDetail()" style="width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="fas fa-arrow-left" style="font-size:12px;color:var(--text-muted)"></i></button>
  <div><h2 style="font-size:18px;font-weight:800;margin:0">Form Registrasi Peserta MCU</h2><p style="font-size:12px;color:var(--text-muted);margin:0">Isi kelengkapan data kedatangan peserta</p></div>
  <div style="margin-left:auto">${stBadge}</div>
</div>
<div style="display:flex;gap:24px;align-items:flex-start;max-width:820px;margin:0 auto">
  <!-- LEFT: Foto & QR -->
  <div style="width:200px;flex-shrink:0">
    <div style="border:2px dashed var(--border);border-radius:12px;padding:20px;text-align:center;margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:8px">FOTO PESERTA</div>
      <div id="regFotoArea" style="width:120px;height:140px;margin:0 auto 12px;background:#f4f6f9;border-radius:8px;display:flex;align-items:center;justify-content:center;border:1px dashed #ccd5e0">${p.foto?`<img src="${p.foto}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">`:'<div style="text-align:center;color:#a0aec0;font-size:10px"><i class="fas fa-camera" style="font-size:24px;display:block;margin-bottom:4px"></i>Belum ada foto</div>'}</div>
      <div style="display:flex;gap:6px;justify-content:center"><button onclick="openRegCamera()" style="padding:6px 12px;border:1px solid var(--border);border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit"><i class="fas fa-camera"></i> Kamera</button><button onclick="document.getElementById('regFotoInput').click()" style="padding:6px 12px;border:1px solid var(--border);border-radius:6px;font-size:11px;cursor:pointer;background:#fff;font-family:inherit"><i class="fas fa-upload"></i> Upload</button></div>
      <input type="file" id="regFotoInput" accept="image/*" style="display:none" onchange="handleRegDetailFoto(event,'${p.id}')">
      <div style="font-size:9px;color:var(--text-muted);margin-top:8px">Ambil foto via webcam atau upload file gambar dari perangkat Anda.</div>
    </div>
    <div style="border:1.5px solid var(--border);border-radius:12px;padding:16px;text-align:center">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:8px">IDENTIFIKASI QR</div>
      <img src="${qrUrl}" style="width:120px;height:120px;margin-bottom:8px">
      <div style="font-size:9px;color:var(--text-muted)">QR Code otomatis di-generate berdasarkan ID pasien.</div>
    </div>
  </div>
  <!-- RIGHT: Form -->
  <div style="flex:1;min-width:0">
    <!-- Section 1: Rekam Medis Dasar -->
    <h3 style="font-size:15px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px"><i class="fas fa-file-medical" style="color:var(--g1)"></i> 1. Rekam Medis Dasar</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
      <div><label style="${labelStyle}">PATIENT ID</label><input value="${p.id}" readonly style="${inputStyle}"></div>
      <div><label style="${labelStyle}">NO. CASE</label><input value="${noCase}" readonly style="${inputStyle}"></div>
    </div>
    <div style="margin-bottom:12px"><label style="${labelStyle}">NAMA PESERTA</label><input id="regNama" value="${p.nama}" style="${inputStyle};font-weight:700;font-size:15px"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
      <div><label style="${labelStyle}">JENIS KELAMIN</label><input value="${p.jenisKelamin||'Laki-laki'}" readonly style="${inputStyle}"></div>
      <div><label style="${labelStyle}">TGL. LAHIR</label><input value="${p.tanggalLahir||''}" readonly style="${inputStyle}"></div>
    </div>
    <div style="margin-bottom:20px"><label style="${labelStyle}">NIK (KTP) *</label><input id="regNIK" value="${p.nik||''}" style="${inputStyle}"></div>

    <!-- Section 2: Kontak & Perusahaan -->
    <h3 style="font-size:15px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px"><i class="fas fa-building" style="color:var(--g1)"></i> 2. Informasi Kontak & Perusahaan</h3>
    <div style="margin-bottom:12px"><label style="${labelStyle}">PERUSAHAAN ASAL</label><div style="padding:11px 14px;border-radius:8px;background:rgba(5,150,105,.06);border:1.5px solid rgba(5,150,105,.2);font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px"><i class="fas fa-building" style="color:#059669"></i>${p.perusahaan||'-'}</div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
      <div><label style="${labelStyle}">NO. KARYAWAN</label><input id="regNoKar" value="${p.noKaryawan||'EMP-'+String(Math.floor(Math.random()*900)+100)}" style="${inputStyle}"></div>
      <div><label style="${labelStyle}">DEPARTEMEN *</label><input id="regDept" value="${p.departemen||'HRD'}" style="${inputStyle}"></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
      <div><label style="${labelStyle}">NO. TELEPON / HP *</label><input id="regTelp" value="${p.telepon||''}" style="${inputStyle}"></div>
      <div><label style="${labelStyle}">TELP PERUSAHAAN</label><input id="regTelpPer" value="${p.telpPerusahaan||''}" style="${inputStyle}"></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
      <div><label style="${labelStyle}">KLINIK</label><input id="regKlinik" value="${p.klinik||'Klinik B'}" style="${inputStyle}"></div>
      <div><label style="${labelStyle}">UNIT</label><input id="regUnit" value="${p.unit||'Unit Lab'}" style="${inputStyle}"></div>
    </div>
    <div style="margin-bottom:12px"><label style="${labelStyle}">EMPLOYEE RESPONSIBLE</label><input id="regEmpResp" value="${p.empResp||'Rasya'}" style="${inputStyle}"></div>
    <div style="margin-bottom:20px"><label style="${labelStyle}">ALAMAT LENGKAP *</label><textarea id="regAlamat" rows="2" style="${inputStyle};resize:vertical">${p.alamat||''}</textarea></div>

    <!-- Section 3: Pendaftaran MCU -->
    <h3 style="font-size:15px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px"><i class="fas fa-calendar-check" style="color:var(--g1)"></i> 3. Pendaftaran MCU & Catatan Khusus</h3>
    <div style="margin-bottom:12px"><label style="${labelStyle}">TGL. TERDAFTAR MCU</label><div style="display:flex;align-items:center;gap:8px;padding:11px 14px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc"><i class="fas fa-calendar" style="color:var(--text-muted)"></i><span style="font-size:13px">${p.tanggalDaftar?p.tanggalDaftar.split('T')[0]:now.toISOString().split('T')[0]}</span></div></div>
    <div style="margin-bottom:12px"><label style="${labelStyle}">PAKET MCU DIKELUARKAN</label><div style="display:flex;align-items:center;gap:12px"><div style="border-left:4px solid #F59E0B;padding-left:12px"><div style="font-size:16px;font-weight:800">${getPN(p.paketMCU)}</div></div><button onclick="showPaketItems('${p.paketMCU}')" style="padding:8px 16px;border:1.5px solid var(--border);border-radius:8px;font-size:12px;cursor:pointer;background:#fff;font-family:inherit;box-shadow:0 2px 8px rgba(0,0,0,.08)">Cek Rincian Item Paket</button></div></div>
    <div style="margin-bottom:20px"><label style="${labelStyle}">CATATAN PENDAFTARAN TAMBAHAN</label><textarea id="regCatatan" rows="3" placeholder="Tambahkan catatan khusus seperti keluhan, riwayat alergi, atau request pelayanan dari peserta..." style="${inputStyle};resize:vertical">${p.catatanReg||''}</textarea></div>

    <!-- Section 4: Finalisasi -->
    <h3 style="font-size:15px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px"><i class="fas fa-user-check" style="color:var(--g1)"></i> 4. Informasi Finalisasi Registrasi</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
      <div><label style="${labelStyle}">PETUGAS PENDAFTARAN</label><div style="padding:11px 14px;border-radius:8px;background:rgba(5,150,105,.06);border:1.5px solid rgba(5,150,105,.2);font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px"><i class="fas fa-user-check" style="color:#059669"></i>${getCurrentUserName()}</div></div>
      <div><label style="${labelStyle}">TGL / JAM REGISTRASI</label><div style="padding:11px 14px;border-radius:8px;background:rgba(5,150,105,.06);border:1.5px solid rgba(5,150,105,.2);font-size:13px;display:flex;align-items:center;gap:6px"><i class="fas fa-clock" style="color:#059669"></i>${tglReg}</div></div>
    </div>

    <!-- Action Buttons -->
    <div style="display:flex;gap:12px;align-items:center;padding-top:16px;border-top:1px solid var(--border)">
      <button onclick="resetRegForm('${p.id}')" style="padding:10px 20px;border:1.5px solid var(--border);border-radius:8px;font-size:13px;cursor:pointer;background:#fff;font-family:inherit">Reset</button>
      <button onclick="openRegDoc('${p.id}')" style="padding:10px 20px;background:#059669;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">View Cetak Form</button>
      <button onclick="saveRegDetail('${p.id}')" style="padding:10px 20px;background:var(--g1);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-left:auto"><i class="fas fa-save" style="margin-right:4px"></i> Simpan Data</button>
    </div>
  </div>
</div>`;
}

function closeRegDetail(){
  const sec=document.getElementById('p-registrasi');
  if(sec._origHTML){sec.innerHTML=sec._origHTML;sec._origHTML=null;}
  rReg();
}

function saveRegDetail(id){
  const all=getAllPeserta();
  const idx=all.findIndex(x=>x.id===id);
  if(idx<0)return;
  const p=all[idx];
  p.nik=document.getElementById('regNIK').value;
  p.telepon=document.getElementById('regTelp').value;
  p.departemen=document.getElementById('regDept').value;
  p.noKaryawan=document.getElementById('regNoKar').value;
  p.alamat=document.getElementById('regAlamat').value;
  p.klinik=document.getElementById('regKlinik').value;
  p.unit=document.getElementById('regUnit').value;
  p.empResp=document.getElementById('regEmpResp').value;
  p.catatanReg=document.getElementById('regCatatan').value;
  p.statusKehadiran='Hadir';
  if(!p.waktuRegistrasi)p.waktuRegistrasi=new Date().toISOString();
  localStorage.setItem('mcu_db',JSON.stringify({...JSON.parse(localStorage.getItem('mcu_db')||'{}'),peserta:all}));
  toast('Data registrasi tersimpan');
  openRegDetail(id);// refresh
}

function resetRegForm(id){
  if(!confirm('Reset form registrasi?'))return;
  openRegDetail(id);
}

function handleRegDetailFoto(e,id){
  const f=e.target.files[0];if(!f)return;
  const reader=new FileReader();
  reader.onload=function(ev){
    const all=getAllPeserta();
    const idx=all.findIndex(x=>x.id===id);
    if(idx>=0){all[idx].foto=ev.target.result;localStorage.setItem('mcu_db',JSON.stringify({...JSON.parse(localStorage.getItem('mcu_db')||'{}'),peserta:all}));}
    document.getElementById('regFotoArea').innerHTML=`<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">`;
    toast('Foto berhasil diupload');
  };
  reader.readAsDataURL(f);
}

function showPaketItems(paketId){
  const pakets=getAllPaketMCU();
  const p=pakets.find(x=>x.id===paketId);
  const items=p?p.items:getPI(paketId);
  const nama=p?p.nama:getPN(paketId);
  let overlay=document.getElementById('paketItemsOverlay');
  if(!overlay){overlay=document.createElement('div');overlay.id='paketItemsOverlay';document.body.appendChild(overlay);}
  overlay.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:9999;display:flex;align-items:center;justify-content:center';
  overlay.innerHTML=`<div style="background:#fff;border-radius:12px;width:90%;max-width:420px;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 8px 32px rgba(0,0,0,.15)"><div style="padding:20px 24px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e0e6ef"><h3 style="font-size:16px;font-weight:700;margin:0">Rincian Item Paket MCU</h3><button onclick="document.getElementById('paketItemsOverlay').style.display='none'" style="background:none;border:none;font-size:18px;cursor:pointer;color:#718096">&times;</button></div><div style="padding:20px 24px;overflow-y:auto;flex:1"><div style="font-size:10px;color:#718096;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">NAMA PAKET</div><div style="font-size:16px;font-weight:700;color:#1a3a6b;margin-bottom:16px">${nama}</div><div style="border:1.5px solid #e0e6ef;border-radius:8px;overflow:hidden"><div style="padding:8px 14px;background:#f8f9fb;font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #e0e6ef">ITEM PEMERIKSAAN</div>${items.map((it,i)=>`<div style="padding:12px 14px;border-bottom:1px solid #f0f2f5;display:flex;gap:10px;align-items:flex-start"><span style="font-size:12px;color:#718096;min-width:20px">${i+1}.</span><div><div style="font-size:13px;font-weight:600;color:#1a3a6b">${it}</div><div style="font-size:10px;color:#a0aec0">ITM-${String(i+1).padStart(2,'0')}</div></div></div>`).join('')}</div></div><div style="padding:16px 24px;border-top:1px solid #e0e6ef;text-align:right"><button onclick="document.getElementById('paketItemsOverlay').style.display='none'" style="padding:8px 20px;background:#1a3a6b;color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer">Tutup</button></div></div>`;
}
