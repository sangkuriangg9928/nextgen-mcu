// NextGen Mobile MCU - App Logic
const API = '/api';
let D = []; // peserta data
let dash = {};
let curUnit = 'Pemeriksaan Awal';
let curPemId = null;
let curRevId = null;

const UK = {'Pemeriksaan Awal':'pemeriksaanAwal','Konsultasi Medis':'konsultasiMedis','Konsultasi Gizi':'konsultasiGizi','Laboratorium':'laboratorium','Radiologi':'radiologi','EKG':'ekg','Tes Lainnya':'tesLainnya'};
const PN = {'paket-1':'Paket 1 - Basic','paket-2':'Paket 2 - Standard','paket-3':'Paket 3 - Executive','paket-4':'Paket 4 - Comprehensive'};
const PI = {'paket-1':['Pemeriksaan Awal','Konsultasi Medis','Laboratorium'],'paket-2':['Pemeriksaan Awal','Konsultasi Medis','Konsultasi Gizi','Laboratorium','Radiologi'],'paket-3':['Pemeriksaan Awal','Konsultasi Medis','Konsultasi Gizi','Laboratorium','Radiologi','EKG'],'paket-4':['Pemeriksaan Awal','Konsultasi Medis','Konsultasi Gizi','Laboratorium','Radiologi','EKG','Tes Lainnya']};
const UL = {pemeriksaanAwal:'Pemeriksaan Awal',konsultasiMedis:'Konsultasi Medis',konsultasiGizi:'Konsultasi Gizi',laboratorium:'Laboratorium',radiologi:'Radiologi',ekg:'EKG',tesLainnya:'Tes Lainnya'};

// API helper
async function api(ep, m='GET', b=null){
  const o={method:m,headers:{'Content-Type':'application/json'}};
  if(b)o.body=JSON.stringify(b);
  const r=await fetch(API+ep,o);return r.json();
}
async function loadD(){D=await api('/peserta');return D;}
async function loadDash(){dash=await api('/dashboard');return dash;}

// Utils
function fdt(iso){if(!iso)return'-';const d=new Date(iso);return d.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})+' '+d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});}
function sbg(st){
  if(!st)return'<span class="bg bg-g">-</span>';
  if(st.startsWith('Checked')||st.startsWith('Selesai'))return'<span class="bg bg-s">'+st+'</span>';
  if(st==='On Progress')return'<span class="bg bg-i">'+st+'</span>';
  if(st==='Registrasi')return'<span class="bg bg-w">'+st+'</span>';
  if(st==='Terdaftar')return'<span class="bg bg-g">'+st+'</span>';
  return'<span class="bg bg-g">'+st+'</span>';
}
function toast(msg){const t=document.getElementById('toast');document.getElementById('toastInner').textContent=msg;t.style.display='block';setTimeout(()=>{t.style.display='none';},3000);}
function openM(id){document.getElementById(id).classList.add('show');}
function closeM(id){document.getElementById(id).classList.remove('show');}
function refreshData(){showPage(document.querySelector('.nv.act').dataset.page);}

// Clock
setInterval(()=>{const n=new Date();document.getElementById('liveTime').textContent=n.toLocaleTimeString('id-ID')+' | '+n.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});},1000);

// Navigation
const PT={'dashboard':'Dashboard Monitoring','master':'Master Data Peserta','registrasi':'Registrasi Ulang Peserta','kehadiran':'Monitoring Kehadiran','pemeriksaan':'Input Pemeriksaan','tracking':'Tracking Mandiri Peserta','review':'Review Hasil Dokter','laporan':'Laporan Hasil MCU'};

function showPage(p){
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('act'));
  document.querySelectorAll('.nv').forEach(n=>n.classList.remove('act'));
  document.getElementById('p-'+p).classList.add('act');
  document.querySelector('.nv[data-page="'+p+'"]').classList.add('act');
  document.getElementById('pageTitle').textContent=PT[p]||'';
  if(p==='dashboard')rDash();
  else if(p==='master')rMaster();
  else if(p==='registrasi')rReg();
  else if(p==='kehadiran')rKeh();
  else if(p==='pemeriksaan')rPem();
  else if(p==='tracking')rTrack();
  else if(p==='review')rRev();
  else if(p==='laporan')rLap();
}

// ========== DASHBOARD (Step 3+7) ==========
async function rDash(){
  await loadD();const d=await loadDash();
  document.getElementById('dashStats').innerHTML=
    '<div class="sc"><div class="sl">Total Peserta</div><div class="sv">'+d.summary.totalPeserta+'</div><div class="ss">Terdaftar</div></div>'+
    '<div class="sc ac"><div class="sl">Registered (Hadir)</div><div class="sv">'+d.summary.registered+'</div><div class="ss">Sudah registrasi</div></div>'+
    '<div class="sc su"><div class="sl">Checked (Selesai)</div><div class="sv">'+d.summary.checked+'</div><div class="ss">Pemeriksaan selesai</div></div>'+
    '<div class="sc wa"><div class="sl">On Progress</div><div class="sv">'+d.summary.onProgress+'</div><div class="ss">Sedang diperiksa</div></div>'+
    '<div class="sc da"><div class="sl">Pending</div><div class="sv">'+d.summary.pending+'</div><div class="ss">Belum diperiksa</div></div>';
  let ph='';
  ['paket-1','paket-2','paket-3','paket-4'].forEach(pk=>{
    const s=d.paketStats[pk]||{total:0,selesai:0,progress:0};
    ph+='<div class="pp"><div class="pl"><span>'+PN[pk]+'</span><span>'+s.progress+'% ('+s.selesai+'/'+s.total+')</span></div><div class="pb"><div class="pf bl" style="width:'+s.progress+'%"></div></div></div>';
  });
  document.getElementById('paketProg').innerHTML=ph;
  const kh=d.kehadiran;const hp=kh.total>0?Math.round((kh.hadir/kh.total)*100):0;
  document.getElementById('kehChart').innerHTML=
    '<div style="text-align:center;margin-bottom:20px"><div style="font-size:48px;font-weight:800;color:var(--primary)">'+hp+'%</div><div style="font-size:13px;color:var(--g500)">Tingkat Kehadiran</div></div>'+
    '<div style="display:flex;justify-content:space-around;text-align:center"><div><div style="font-size:24px;font-weight:700;color:var(--success)">'+kh.hadir+'</div><div style="font-size:11px;color:var(--g500)">Hadir</div></div><div><div style="font-size:24px;font-weight:700;color:var(--danger)">'+kh.tidakHadir+'</div><div style="font-size:11px;color:var(--g500)">Tidak Hadir</div></div><div><div style="font-size:24px;font-weight:700;color:var(--g600)">'+kh.total+'</div><div style="font-size:11px;color:var(--g500)">Total</div></div></div>';
  let uh='';
  Object.entries(d.unitStats).forEach(([k,v])=>{
    const t=v.checked+v.onProgress+v.pending;const pc=t>0?Math.round((v.checked/t)*100):0;
    uh+='<tr><td><strong>'+(UL[k]||k)+'</strong></td><td><span class="bg bg-s">'+v.checked+'</span></td><td><span class="bg bg-i">'+v.onProgress+'</span></td><td><span class="bg bg-g">'+v.pending+'</span></td><td><div class="pb" style="width:120px;display:inline-block"><div class="pf gr" style="width:'+pc+'%"></div></div> <small>'+pc+'%</small></td></tr>';
  });
  document.querySelector('#unitTbl tbody').innerHTML=uh;
}

// ========== MASTER DATA (Step 1) ==========
async function rMaster(){await loadD();rPT(D);}
function rPT(data){
  const tb=document.getElementById('pesertaTb');const em=document.getElementById('emptyP');
  document.getElementById('totalPC').textContent=data.length+' peserta';
  if(!data.length){tb.innerHTML='';em.style.display='block';return;}
  em.style.display='none';
  tb.innerHTML=data.map((p,i)=>'<tr><td>'+(i+1)+'</td><td><strong>'+p.id+'</strong></td><td>'+p.nama+'</td><td>'+p.nik+'</td><td>'+(p.perusahaan||'-')+'</td><td><span class="bg bg-i">'+(PN[p.paketMCU]||p.paketMCU)+'</span></td><td>'+sbg(p.status)+'</td><td><button class="btn btn-o btn-sm" onclick="showDet(\''+p.id+'\')"><i class="fas fa-eye"></i></button> <button class="btn btn-d btn-sm" onclick="delP(\''+p.id+'\')"><i class="fas fa-trash"></i></button></td></tr>').join('');
}
function srcP(){const q=document.getElementById('srcPeserta').value.toLowerCase();rPT(D.filter(p=>p.nama.toLowerCase().includes(q)||p.nik.includes(q)||(p.perusahaan||'').toLowerCase().includes(q)));}
function showAddM(){['fNama','fNIK','fTgl','fJK','fAlm','fTlp','fEm','fPer','fJab','fDep'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});document.getElementById('fPak').value='paket-1';openM('mAdd');}
async function saveP(){
  const n=document.getElementById('fNama').value.trim();const k=document.getElementById('fNIK').value.trim();
  if(!n||!k)return toast('Nama dan NIK wajib diisi');
  const r=await api('/peserta','POST',{nama:n,nik:k,tanggalLahir:document.getElementById('fTgl').value,jenisKelamin:document.getElementById('fJK').value,alamat:document.getElementById('fAlm').value,telepon:document.getElementById('fTlp').value,email:document.getElementById('fEm').value,perusahaan:document.getElementById('fPer').value,jabatan:document.getElementById('fJab').value,departemen:document.getElementById('fDep').value,paketMCU:document.getElementById('fPak').value});
  if(r.error)return toast(r.error);
  toast('Peserta ditambahkan: '+r.nama);closeM('mAdd');rMaster();
}
async function delP(id){if(!confirm('Hapus peserta ini?'))return;const r=await api('/peserta?id='+id,'DELETE');toast(r.message||'Dihapus');rMaster();}

// Excel upload handler
function handleExcel(e){
  const f=e.target.files[0];if(!f)return;
  const reader=new FileReader();
  reader.onload=async function(ev){
    try{
      const text=ev.target.result;const lines=text.split('\n').filter(l=>l.trim());
      if(lines.length<2)return toast('File kosong atau format salah');
      const headers=lines[0].split(',').map(h=>h.trim().toLowerCase());
      const data=[];
      for(let i=1;i<lines.length;i++){
        const vals=lines[i].split(',').map(v=>v.trim());
        const obj={};
        headers.forEach((h,idx)=>{
          if(h.includes('nama'))obj.nama=vals[idx]||'';
          else if(h.includes('nik'))obj.nik=vals[idx]||'';
          else if(h.includes('lahir'))obj.tanggalLahir=vals[idx]||'';
          else if(h.includes('kelamin')||h.includes('jk'))obj.jenisKelamin=vals[idx]||'';
          else if(h.includes('alamat'))obj.alamat=vals[idx]||'';
          else if(h.includes('telp')||h.includes('hp'))obj.telepon=vals[idx]||'';
          else if(h.includes('email'))obj.email=vals[idx]||'';
          else if(h.includes('perusahaan')||h.includes('company'))obj.perusahaan=vals[idx]||'';
          else if(h.includes('jabatan'))obj.jabatan=vals[idx]||'';
          else if(h.includes('paket'))obj.paketMCU=vals[idx]||'paket-1';
        });
        if(obj.nama&&obj.nik)data.push(obj);
      }
      if(!data.length)return toast('Tidak ada data valid ditemukan');
      const r=await api('/peserta','POST',data);
      toast(r.message||'Import selesai');rMaster();
    }catch(err){toast('Error parsing file: '+err.message);}
  };
  reader.readAsText(f);
}
function dlTemplate(){
  const csv='nama,nik,tanggalLahir,jenisKelamin,alamat,telepon,email,perusahaan,jabatan,departemen,paketMCU\nJohn Doe,1234567890123456,1990-01-15,Laki-laki,Jakarta,08123456789,john@mail.com,PT ABC,Staff,IT,paket-2';
  const blob=new Blob([csv],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='template-mcu.csv';a.click();
}

// ========== REGISTRASI (Step 2) ==========
async function rReg(){await loadD();rRT(D);}
function rRT(data){
  document.getElementById('regTb').innerHTML=data.map(p=>'<tr><td><strong>'+p.id+'</strong></td><td>'+p.nama+'</td><td>'+(p.perusahaan||'-')+'</td><td><span class="bg bg-i">'+(PN[p.paketMCU]||p.paketMCU)+'</span></td><td>'+(p.statusKehadiran==='Hadir'?'<span class="bg bg-s">Hadir</span>':'<span class="bg bg-g">Belum Hadir</span>')+'</td><td>'+(p.waktuRegistrasi?fdt(p.waktuRegistrasi):'-')+'</td><td>'+(p.statusKehadiran!=='Hadir'?'<button class="btn btn-s btn-sm" onclick="regP(\''+p.id+'\')"><i class="fas fa-check"></i> Registrasi</button>':'<span style="color:var(--success);font-weight:600"><i class="fas fa-check-circle"></i> Terdaftar</span>')+'</td></tr>').join('');
}
function srcReg(){const q=document.getElementById('srcReg').value.toLowerCase();rRT(D.filter(p=>p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)));}
async function regP(id){
  const qr='QR-'+id+'-'+Date.now().toString(36).toUpperCase();
  const r=await api('/peserta','PUT',{id,action:'registrasi',qrCode:qr});
  if(r.error)return toast(r.error);
  toast('Registrasi berhasil: '+r.nama+' | QR: '+r.qrCode);rReg();
}

// ========== KEHADIRAN (Step 3) ==========
let kehF='semua';
async function rKeh(){
  await loadD();
  const h=D.filter(p=>p.statusKehadiran==='Hadir').length;const t=D.length;
  document.getElementById('kehStats').innerHTML=
    '<div class="sc"><div class="sl">Total Peserta</div><div class="sv">'+t+'</div></div>'+
    '<div class="sc su"><div class="sl">Hadir</div><div class="sv">'+h+'</div></div>'+
    '<div class="sc da"><div class="sl">Tidak Hadir</div><div class="sv">'+(t-h)+'</div></div>';
  fKeh(kehF);
}
function fKeh(f){
  kehF=f;let data=D;
  if(f!=='semua')data=data.filter(p=>p.statusKehadiran===f);
  document.getElementById('kehTb').innerHTML=data.map(p=>'<tr><td><strong>'+p.id+'</strong></td><td>'+p.nama+'</td><td>'+(p.perusahaan||'-')+'</td><td><span class="bg bg-i">'+(PN[p.paketMCU]||p.paketMCU)+'</span></td><td>'+(p.statusKehadiran==='Hadir'?'<span class="sd grn"></span>Hadir':'<span class="sd gry"></span>Belum Hadir')+'</td><td>'+(p.waktuRegistrasi?fdt(p.waktuRegistrasi):'-')+'</td></tr>').join('');
}

// ========== PEMERIKSAAN (Step 4-5) ==========
async function rPem(){await loadD();switchUnit(curUnit);}
function switchUnit(u){
  curUnit=u;
  document.querySelectorAll('.utb').forEach(b=>{b.classList.remove('act');if(b.textContent===u)b.classList.add('act');});
  const key=UK[u];
  // Filter peserta yang paketnya include unit ini dan sudah hadir
  const data=D.filter(p=>{
    const items=PI[p.paketMCU]||PI['paket-1'];
    return items.includes(u)&&p.statusKehadiran==='Hadir';
  });
  document.getElementById('pemTb').innerHTML=data.map(p=>{
    const st=p.pemeriksaan&&p.pemeriksaan[key]?p.pemeriksaan[key].status:'Pending';
    return'<tr><td><strong>'+p.id+'</strong></td><td>'+p.nama+'</td><td><span class="bg bg-i">'+(PN[p.paketMCU]||p.paketMCU)+'</span></td><td>'+sbg(st)+'</td><td><button class="btn btn-p btn-sm" onclick="openPem(\''+p.id+'\',\''+u+'\')"><i class="fas fa-edit"></i> Input</button> <button class="btn btn-o btn-sm" onclick="showDet(\''+p.id+'\')"><i class="fas fa-eye"></i></button></td></tr>';
  }).join('');
}
function srcPem(){const q=document.getElementById('srcPem').value.toLowerCase();const key=UK[curUnit];const data=D.filter(p=>{const items=PI[p.paketMCU]||PI['paket-1'];return items.includes(curUnit)&&p.statusKehadiran==='Hadir'&&(p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q));});document.getElementById('pemTb').innerHTML=data.map(p=>{const st=p.pemeriksaan&&p.pemeriksaan[key]?p.pemeriksaan[key].status:'Pending';return'<tr><td><strong>'+p.id+'</strong></td><td>'+p.nama+'</td><td><span class="bg bg-i">'+(PN[p.paketMCU]||p.paketMCU)+'</span></td><td>'+sbg(st)+'</td><td><button class="btn btn-p btn-sm" onclick="openPem(\''+p.id+'\',\''+curUnit+'\')"><i class="fas fa-edit"></i> Input</button></td></tr>';}).join('');}

function openPem(id,unit){
  curPemId=id;curUnit=unit;
  const p=D.find(x=>x.id===id);if(!p)return;
  document.getElementById('mPemTitle').textContent='Input '+unit+' - '+p.nama;
  let html='<input type="hidden" id="pemUnit" value="'+unit+'">';
  if(unit==='Pemeriksaan Awal'){
    html+='<div class="fg"><div class="fi"><label>Tekanan Darah Sistol (mmHg)</label><input type="number" id="pSistol"></div><div class="fi"><label>Tekanan Darah Diastol (mmHg)</label><input type="number" id="pDiastol"></div><div class="fi"><label>Nadi (x/menit)</label><input type="number" id="pNadi"></div><div class="fi"><label>Suhu (C)</label><input type="number" step="0.1" id="pSuhu"></div><div class="fi"><label>Respirasi (x/menit)</label><input type="number" id="pResp"></div><div class="fi"><label>Tinggi Badan (cm)</label><input type="number" id="pTB"></div><div class="fi"><label>Berat Badan (kg)</label><input type="number" step="0.1" id="pBB"></div><div class="fi"><label>Petugas</label><input type="text" id="pPetugas"></div></div>';
  }else if(unit==='Konsultasi Medis'){
    html+='<div class="fg"><div class="fi"><label>Dokter Pemeriksa</label><input type="text" id="pDokter"></div><div class="fi"><label>Riwayat Penyakit</label><textarea id="pRiwayat"></textarea></div><div class="fi"><label>Keluhan Saat Ini</label><textarea id="pKeluhan"></textarea></div><div class="fi"><label>Pemeriksaan Fisik</label><textarea id="pFisik"></textarea></div><div class="fi"><label>Diagnosis</label><textarea id="pDiagnosis"></textarea></div><div class="fi"><label>Rekomendasi</label><textarea id="pRekom"></textarea></div></div>';
  }else if(unit==='Konsultasi Gizi'){
    html+='<div class="fg"><div class="fi"><label>Ahli Gizi</label><input type="text" id="pAhliGizi"></div><div class="fi"><label>Status Gizi</label><select id="pStatusGizi"><option>Normal</option><option>Underweight</option><option>Overweight</option><option>Obesitas</option></select></div><div class="fi"><label>Pola Makan</label><textarea id="pPolaMakan"></textarea></div><div class="fi"><label>Rekomendasi Diet</label><textarea id="pDiet"></textarea></div></div>';
  }else if(unit==='Laboratorium'){
    html+='<div class="fg"><div class="fi"><label>Gula Darah Puasa (mg/dL)</label><input type="number" id="pGDP"></div><div class="fi"><label>Kolesterol Total (mg/dL)</label><input type="number" id="pKol"></div><div class="fi"><label>Hemoglobin (g/dL)</label><input type="number" step="0.1" id="pHb"></div><div class="fi"><label>Asam Urat (mg/dL)</label><input type="number" step="0.1" id="pAU"></div><div class="fi"><label>SGOT</label><input type="number" id="pSGOT"></div><div class="fi"><label>SGPT</label><input type="number" id="pSGPT"></div><div class="fi"><label>Kreatinin</label><input type="number" step="0.1" id="pKreat"></div><div class="fi"><label>Ureum</label><input type="number" id="pUreum"></div><div class="fi"><label>Petugas Lab</label><input type="text" id="pPetugasLab"></div></div>';
  }else if(unit==='Radiologi'){
    html+='<div class="fg"><div class="fi"><label>Jenis Pemeriksaan</label><select id="pJenisRad"><option>Rontgen Thorax</option><option>USG Abdomen</option><option>Rontgen + USG</option></select></div><div class="fi"><label>Hasil</label><textarea id="pHasilRad"></textarea></div><div class="fi"><label>Kesan</label><textarea id="pKesanRad"></textarea></div><div class="fi"><label>Radiolog</label><input type="text" id="pRadiolog"></div></div>';
  }else if(unit==='EKG'){
    html+='<div class="fg"><div class="fi"><label>Irama</label><select id="pIrama"><option>Sinus Rhythm</option><option>Sinus Tachycardia</option><option>Sinus Bradycardia</option><option>Atrial Fibrillation</option><option>Lainnya</option></select></div><div class="fi"><label>Heart Rate (bpm)</label><input type="number" id="pHR"></div><div class="fi"><label>Hasil EKG</label><textarea id="pHasilEKG"></textarea></div><div class="fi"><label>Kesan</label><textarea id="pKesanEKG"></textarea></div><div class="fi"><label>Petugas</label><input type="text" id="pPetugasEKG"></div></div>';
  }else{
    html+='<div class="fg"><div class="fi"><label>Jenis Tes</label><input type="text" id="pJenisTes"></div><div class="fi"><label>Hasil</label><textarea id="pHasilTes"></textarea></div><div class="fi"><label>Catatan</label><textarea id="pCatatanTes"></textarea></div><div class="fi"><label>Petugas</label><input type="text" id="pPetugasTes"></div></div>';
  }
  document.getElementById('mPemBody').innerHTML=html;
  openM('mPem');
}

async function savePem(){
  const unit=document.getElementById('pemUnit').value;
  let data={};let petugas='';
  if(unit==='Pemeriksaan Awal'){
    data={sistol:gv('pSistol'),diastol:gv('pDiastol'),nadi:gv('pNadi'),suhu:gv('pSuhu'),respirasi:gv('pResp'),tinggiBadan:gv('pTB'),beratBadan:gv('pBB')};petugas=gv('pPetugas');
  }else if(unit==='Konsultasi Medis'){
    data={dokter:gv('pDokter'),riwayatPenyakit:gv('pRiwayat'),keluhan:gv('pKeluhan'),pemeriksaanFisik:gv('pFisik'),diagnosis:gv('pDiagnosis'),rekomendasi:gv('pRekom')};petugas=gv('pDokter');
  }else if(unit==='Konsultasi Gizi'){
    data={ahliGizi:gv('pAhliGizi'),statusGizi:gv('pStatusGizi'),polaMakan:gv('pPolaMakan'),rekomendasiDiet:gv('pDiet')};petugas=gv('pAhliGizi');
  }else if(unit==='Laboratorium'){
    data={gulaDarahPuasa:gv('pGDP'),kolesterol:gv('pKol'),hemoglobin:gv('pHb'),asamUrat:gv('pAU'),sgot:gv('pSGOT'),sgpt:gv('pSGPT'),kreatinin:gv('pKreat'),ureum:gv('pUreum')};petugas=gv('pPetugasLab');
  }else if(unit==='Radiologi'){
    data={jenisPemeriksaan:gv('pJenisRad'),hasil:gv('pHasilRad'),kesan:gv('pKesanRad'),radiolog:gv('pRadiolog')};petugas=gv('pRadiolog');
  }else if(unit==='EKG'){
    data={irama:gv('pIrama'),heartRate:gv('pHR'),hasil:gv('pHasilEKG'),kesan:gv('pKesanEKG')};petugas=gv('pPetugasEKG');
  }else{
    data={jenisTes:gv('pJenisTes'),hasil:gv('pHasilTes'),catatan:gv('pCatatanTes')};petugas=gv('pPetugasTes');
  }
  const r=await api('/pemeriksaan','POST',{pesertaId:curPemId,unit:unit,data:data,petugas:petugas});
  if(r.error)return toast(r.error);
  toast(r.message||'Pemeriksaan disimpan');closeM('mPem');rPem();
}
function gv(id){const e=document.getElementById(id);return e?e.value:'';}

// ========== TRACKING (Step 6) ==========
async function rTrack(){await loadD();document.getElementById('trackRes').innerHTML='<div class="es"><i class="fas fa-route"></i><h3>Tracking Peserta</h3><p>Cari peserta untuk melihat progress pemeriksaan</p></div>';}
function srcTrack(){
  const q=document.getElementById('srcTrack').value.toLowerCase();
  if(!q){document.getElementById('trackRes').innerHTML='<div class="es"><i class="fas fa-route"></i><h3>Tracking Peserta</h3><p>Cari peserta untuk melihat progress pemeriksaan</p></div>';return;}
  const found=D.filter(p=>p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q));
  if(!found.length){document.getElementById('trackRes').innerHTML='<div class="es"><i class="fas fa-search"></i><h3>Tidak ditemukan</h3><p>Peserta tidak ditemukan</p></div>';return;}
  let html='';
  found.forEach(p=>{
    const items=PI[p.paketMCU]||PI['paket-1'];
    const checked=items.filter(it=>{const k=UK[it];return p.pemeriksaan&&p.pemeriksaan[k]&&p.pemeriksaan[k].status==='Checked';}).length;
    const pct=Math.round((checked/items.length)*100);
    html+='<div class="cd" style="margin-bottom:16px"><div class="cd-h"><h3>'+p.nama+' ('+p.id+')</h3><span class="bg bg-i">'+(PN[p.paketMCU]||'')+'</span></div><div class="cd-b">';
    html+='<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:4px"><span>Progress Keseluruhan</span><span>'+pct+'% ('+checked+'/'+items.length+')</span></div><div class="pb"><div class="pf bl" style="width:'+pct+'%"></div></div></div>';
    items.forEach(it=>{
      const k=UK[it];const st=p.pemeriksaan&&p.pemeriksaan[k]?p.pemeriksaan[k].status:'Pending';
      const ic=st==='Checked'?'ck':st==='On Progress'?'pr':'pd';
      const icon=st==='Checked'?'fa-check':st==='On Progress'?'fa-spinner':'fa-clock';
      const waktu=p.pemeriksaan&&p.pemeriksaan[k]&&p.pemeriksaan[k].waktu?fdt(p.pemeriksaan[k].waktu):'Menunggu';
      html+='<div class="tk"><div class="tk-i '+ic+'"><i class="fas '+icon+'"></i></div><div class="tk-t"><h4>'+it+'</h4><p>'+waktu+(p.pemeriksaan&&p.pemeriksaan[k]&&p.pemeriksaan[k].petugas?' | Petugas: '+p.pemeriksaan[k].petugas:'')+'</p></div><div>'+sbg(st)+'</div></div>';
    });
    html+='</div></div>';
  });
  document.getElementById('trackRes').innerHTML=html;
}

// ========== REVIEW DOKTER (Step 8) ==========
async function rRev(){
  await loadD();
  const data=D.filter(p=>p.statusKehadiran==='Hadir');
  document.getElementById('revTb').innerHTML=data.map(p=>'<tr><td><strong>'+p.id+'</strong></td><td>'+p.nama+'</td><td><span class="bg bg-i">'+(PN[p.paketMCU]||'')+'</span></td><td>'+sbg(p.status)+'</td><td>'+(p.kesimpulan?'<span class="bg '+(p.kesimpulan==='Fit'?'bg-s':p.kesimpulan==='Unfit'?'bg-d':'bg-w')+'">'+p.kesimpulan+'</span>':'<span class="bg bg-g">Belum</span>')+'</td><td><button class="btn btn-p btn-sm" onclick="openRev(\''+p.id+'\')"><i class="fas fa-user-md"></i> Review</button> <button class="btn btn-o btn-sm" onclick="showDet(\''+p.id+'\')"><i class="fas fa-eye"></i></button></td></tr>').join('');
}
function srcRev(){const q=document.getElementById('srcRev').value.toLowerCase();const data=D.filter(p=>p.statusKehadiran==='Hadir'&&(p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)));document.getElementById('revTb').innerHTML=data.map(p=>'<tr><td><strong>'+p.id+'</strong></td><td>'+p.nama+'</td><td><span class="bg bg-i">'+(PN[p.paketMCU]||'')+'</span></td><td>'+sbg(p.status)+'</td><td>'+(p.kesimpulan?p.kesimpulan:'Belum')+'</td><td><button class="btn btn-p btn-sm" onclick="openRev(\''+p.id+'\')"><i class="fas fa-user-md"></i> Review</button></td></tr>').join('');}

function openRev(id){
  curRevId=id;const p=D.find(x=>x.id===id);if(!p)return;
  document.getElementById('mRevTitle').textContent='Review - '+p.nama;
  let html='<h4 style="margin-bottom:16px;color:var(--g600)">Ringkasan Pemeriksaan</h4>';
  const items=PI[p.paketMCU]||PI['paket-1'];
  items.forEach(it=>{
    const k=UK[it];const d=p.pemeriksaan&&p.pemeriksaan[k]?p.pemeriksaan[k]:{status:'Pending',data:null};
    html+='<div style="border:1px solid var(--g200);border-radius:var(--rs);padding:12px;margin-bottom:8px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><strong style="font-size:13px">'+it+'</strong>'+sbg(d.status)+'</div>';
    if(d.data){
      html+='<div style="font-size:12px;color:var(--g500)">';
      Object.entries(d.data).forEach(([key,val])=>{if(val)html+=key+': <strong>'+val+'</strong> | ';});
      html+='</div>';
    }
    html+='</div>';
  });
  html+='<hr style="margin:20px 0;border:none;border-top:1px solid var(--g200)">';
  html+='<div class="fg"><div class="fi"><label>Kesimpulan MCU</label><select id="rKesp"><option value="">Pilih Kesimpulan</option><option value="Fit">Fit - Layak Kerja</option><option value="Fit dengan Catatan">Fit dengan Catatan</option><option value="Unfit">Unfit - Tidak Layak Kerja</option><option value="Pending">Pending - Perlu Pemeriksaan Lanjutan</option></select></div><div class="fi"><label>Dokter Pemeriksa</label><input type="text" id="rDokter" value="'+(p.dokterReview||'')+'"></div></div>';
  html+='<div class="fi"><label>Catatan Dokter</label><textarea id="rCatatan">'+(p.catatanDokter||'')+'</textarea></div>';
  if(p.kesimpulan)document.querySelector('#rKesp')&&(document.querySelector('#rKesp').value=p.kesimpulan);
  document.getElementById('mRevBody').innerHTML=html;
  openM('mRev');
  if(p.kesimpulan){setTimeout(()=>{const sel=document.getElementById('rKesp');if(sel)sel.value=p.kesimpulan;},50);}
}
async function saveRev(){
  const r=await api('/pemeriksaan','PUT',{pesertaId:curRevId,kesimpulan:gv('rKesp'),dokter:gv('rDokter'),catatan:gv('rCatatan')});
  if(r.error)return toast(r.error);
  toast(r.message||'Review disimpan');closeM('mRev');rRev();
}

// ========== LAPORAN (Step 9) ==========
async function rLap(){
  await loadD();
  const data=D.filter(p=>p.kesimpulan);
  document.getElementById('lapTb').innerHTML=data.map(p=>'<tr><td><strong>'+p.id+'</strong></td><td>'+p.nama+'</td><td>'+(p.perusahaan||'-')+'</td><td><span class="bg '+(p.kesimpulan==='Fit'?'bg-s':p.kesimpulan==='Unfit'?'bg-d':'bg-w')+'">'+p.kesimpulan+'</span></td><td>'+(p.dokterReview||'-')+'</td><td><button class="btn btn-p btn-sm" onclick="printPDF(\''+p.id+'\')"><i class="fas fa-file-pdf"></i> PDF</button> <button class="btn btn-o btn-sm" onclick="showDet(\''+p.id+'\')"><i class="fas fa-eye"></i></button></td></tr>').join('');
  if(!data.length)document.getElementById('lapTb').innerHTML='<tr><td colspan="6" style="text-align:center;color:var(--g400);padding:40px">Belum ada peserta yang sudah di-review dokter</td></tr>';
}
function srcLap(){const q=document.getElementById('srcLap').value.toLowerCase();const data=D.filter(p=>p.kesimpulan&&(p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)));document.getElementById('lapTb').innerHTML=data.map(p=>'<tr><td><strong>'+p.id+'</strong></td><td>'+p.nama+'</td><td>'+(p.perusahaan||'-')+'</td><td>'+p.kesimpulan+'</td><td>'+(p.dokterReview||'-')+'</td><td><button class="btn btn-p btn-sm" onclick="printPDF(\''+p.id+'\')"><i class="fas fa-file-pdf"></i> PDF</button></td></tr>').join('');}

function printPDF(id){
  const p=D.find(x=>x.id===id);if(!p)return;
  const items=PI[p.paketMCU]||PI['paket-1'];
  let rows='';
  items.forEach(it=>{
    const k=UK[it];const d=p.pemeriksaan&&p.pemeriksaan[k]?p.pemeriksaan[k]:{status:'Pending',data:null};
    let detail='-';
    if(d.data){detail=Object.entries(d.data).filter(([_,v])=>v).map(([k2,v])=>k2+': '+v).join(', ');}
    rows+='<tr><td style="border:1px solid #ddd;padding:8px">'+it+'</td><td style="border:1px solid #ddd;padding:8px">'+d.status+'</td><td style="border:1px solid #ddd;padding:8px;font-size:11px">'+detail+'</td></tr>';
  });
  const w=window.open('','_blank');
  w.document.write('<html><head><title>Laporan MCU - '+p.nama+'</title><style>body{font-family:Arial,sans-serif;padding:40px;color:#333}h1{color:#0052CC;font-size:20px}h2{font-size:16px;margin-top:24px;color:#344563}table{width:100%;border-collapse:collapse;margin-top:12px}th{background:#f4f5f7;padding:10px;text-align:left;border:1px solid #ddd;font-size:12px}td{padding:8px;border:1px solid #ddd;font-size:12px}.header{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0052CC;padding-bottom:16px;margin-bottom:24px}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.info-item{font-size:13px}.info-item span{font-weight:700}.kesp{font-size:18px;font-weight:700;padding:12px;border-radius:8px;text-align:center;margin-top:16px}</style></head><body>');
  w.document.write('<div class="header"><div><h1>LAPORAN HASIL MEDICAL CHECK UP</h1><p style="color:#6B778C;font-size:13px">NextGen Mobile MCU - Mitra Keluarga</p></div><div style="text-align:right"><p style="font-size:13px">Tanggal: '+new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})+'</p><p style="font-size:13px">No: '+p.id+'</p></div></div>');
  w.document.write('<h2>Data Peserta</h2><div class="info-grid"><div class="info-item">Nama: <span>'+p.nama+'</span></div><div class="info-item">NIK: <span>'+p.nik+'</span></div><div class="info-item">Perusahaan: <span>'+(p.perusahaan||'-')+'</span></div><div class="info-item">Jabatan: <span>'+(p.jabatan||'-')+'</span></div><div class="info-item">Jenis Kelamin: <span>'+(p.jenisKelamin||'-')+'</span></div><div class="info-item">Tanggal Lahir: <span>'+(p.tanggalLahir||'-')+'</span></div><div class="info-item">Paket: <span>'+(PN[p.paketMCU]||'')+'</span></div></div>');
  w.document.write('<h2>Hasil Pemeriksaan</h2><table><thead><tr><th>Unit</th><th>Status</th><th>Detail</th></tr></thead><tbody>'+rows+'</tbody></table>');
  const kColor=p.kesimpulan==='Fit'?'#36B37E':p.kesimpulan==='Unfit'?'#FF5630':'#FFAB00';
  const kBg=p.kesimpulan==='Fit'?'#E3FCEF':p.kesimpulan==='Unfit'?'#FFEBE6':'#FFFAE6';
  w.document.write('<h2>Kesimpulan</h2><div class="kesp" style="background:'+kBg+';color:'+kColor+'">'+p.kesimpulan+'</div>');
  if(p.catatanDokter)w.document.write('<p style="margin-top:12px;font-size:13px"><strong>Catatan Dokter:</strong> '+p.catatanDokter+'</p>');
  w.document.write('<div style="margin-top:40px;display:flex;justify-content:space-between"><div style="text-align:center"><p style="margin-bottom:60px">Peserta,</p><p style="border-top:1px solid #333;padding-top:4px;font-weight:700">'+p.nama+'</p></div><div style="text-align:center"><p style="margin-bottom:60px">Dokter Pemeriksa,</p><p style="border-top:1px solid #333;padding-top:4px;font-weight:700">'+(p.dokterReview||'_______________')+'</p></div></div>');
  w.document.write('</body></html>');
  w.document.close();
  setTimeout(()=>w.print(),500);
}
function generateAll(){
  const data=D.filter(p=>p.kesimpulan);
  if(!data.length)return toast('Belum ada peserta yang sudah di-review');
  data.forEach((p,i)=>setTimeout(()=>printPDF(p.id),i*1000));
  toast('Generating '+data.length+' laporan PDF...');
}

// ========== DETAIL MODAL ==========
function showDet(id){
  const p=D.find(x=>x.id===id);if(!p)return;
  document.getElementById('mDetTitle').textContent='Detail - '+p.nama;
  const items=PI[p.paketMCU]||PI['paket-1'];
  const checked=items.filter(it=>{const k=UK[it];return p.pemeriksaan&&p.pemeriksaan[k]&&p.pemeriksaan[k].status==='Checked';}).length;
  const pct=Math.round((checked/items.length)*100);
  let html='<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">';
  html+='<div><strong style="font-size:12px;color:var(--g500)">ID</strong><p>'+p.id+'</p></div>';
  html+='<div><strong style="font-size:12px;color:var(--g500)">NIK</strong><p>'+p.nik+'</p></div>';
  html+='<div><strong style="font-size:12px;color:var(--g500)">Perusahaan</strong><p>'+(p.perusahaan||'-')+'</p></div>';
  html+='<div><strong style="font-size:12px;color:var(--g500)">Paket</strong><p>'+(PN[p.paketMCU]||'')+'</p></div>';
  html+='<div><strong style="font-size:12px;color:var(--g500)">Status</strong><p>'+sbg(p.status)+'</p></div>';
  html+='<div><strong style="font-size:12px;color:var(--g500)">Kehadiran</strong><p>'+(p.statusKehadiran||'-')+'</p></div>';
  html+='</div>';
  html+='<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:4px"><span>Progress</span><span>'+pct+'%</span></div><div class="pb"><div class="pf bl" style="width:'+pct+'%"></div></div></div>';
  items.forEach(it=>{
    const k=UK[it];const st=p.pemeriksaan&&p.pemeriksaan[k]?p.pemeriksaan[k].status:'Pending';
    const ic=st==='Checked'?'ck':st==='On Progress'?'pr':'pd';
    const icon=st==='Checked'?'fa-check':st==='On Progress'?'fa-spinner':'fa-clock';
    html+='<div class="tk"><div class="tk-i '+ic+'"><i class="fas '+icon+'"></i></div><div class="tk-t"><h4>'+it+'</h4><p>Status: '+st+'</p></div></div>';
  });
  if(p.kesimpulan){
    html+='<div style="margin-top:16px;padding:16px;border-radius:var(--rs);background:'+(p.kesimpulan==='Fit'?'var(--success-light)':p.kesimpulan==='Unfit'?'var(--danger-light)':'var(--warning-light)')+';text-align:center"><strong style="font-size:16px">'+p.kesimpulan+'</strong>';
    if(p.dokterReview)html+='<p style="font-size:12px;margin-top:4px">Dokter: '+p.dokterReview+'</p>';
    html+='</div>';
  }
  document.getElementById('mDetBody').innerHTML=html;
  openM('mDet');
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded',()=>{showPage('dashboard');});
