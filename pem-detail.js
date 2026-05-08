// Pemeriksaan Medis Detail - Full Medical Examination Form
// Navigation items for the sidebar
const PEM_NAV=[
  {id:'A1',label:'R. Penyakit Sekarang',group:'A. ANAMNESA'},
  {id:'A2',label:'R. Penyakit Dahulu',group:'A. ANAMNESA'},
  {id:'A3',label:'R. Obat',group:'A. ANAMNESA'},
  {id:'A4',label:'R. Penyakit Keluarga',group:'A. ANAMNESA'},
  {id:'A5',label:'Kebiasaan',group:'A. ANAMNESA'},
  {id:'B1',label:'Status Generalis',group:'B. PEMERIKSAAN FISIK'},
  {id:'B2',label:'Mata',group:'B. PEMERIKSAAN FISIK'},
  {id:'B3',label:'Telinga',group:'B. PEMERIKSAAN FISIK'},
  {id:'B4',label:'Hidung',group:'B. PEMERIKSAAN FISIK'},
  {id:'B5',label:'Mulut',group:'B. PEMERIKSAAN FISIK'},
  {id:'B6',label:'Orofaring',group:'B. PEMERIKSAAN FISIK'},
  {id:'B7',label:'Kelenjar Tiroid',group:'B. PEMERIKSAAN FISIK'},
  {id:'B8',label:'KGB',group:'B. PEMERIKSAAN FISIK'},
  {id:'B9',label:'Kulit',group:'B. PEMERIKSAAN FISIK'},
  {id:'B10',label:'Kardiovaskuler',group:'B. PEMERIKSAAN FISIK'},
  {id:'B11',label:'Pernafasan',group:'B. PEMERIKSAAN FISIK'},
  {id:'B12',label:'Digestif',group:'B. PEMERIKSAAN FISIK'},
  {id:'B13',label:'Genitourinaria',group:'B. PEMERIKSAAN FISIK'},
  {id:'B14',label:'Ginekologi',group:'B. PEMERIKSAAN FISIK'},
  {id:'B15',label:'Alat Gerak',group:'B. PEMERIKSAAN FISIK'}
];

let pemDetailPatient=null;
let pemActiveNav='A1';

function openPemDetail(id){
  const p=getAllPeserta().find(x=>x.id===id);
  if(!p)return toast('Peserta tidak ditemukan');
  pemDetailPatient=p;
  pemActiveNav='A1';
  renderPemDetailPage();
}

function renderPemDetailPage(){
  const p=pemDetailPatient;if(!p)return;
  const sec=document.getElementById('p-pemeriksaan');
  const tglMCU=p.waktuRegistrasi?new Date(p.waktuRegistrasi).toLocaleDateString('id-ID'):new Date().toLocaleDateString('id-ID');
  const usia=p.tanggalLahir?Math.floor((new Date()-new Date(p.tanggalLahir))/(365.25*24*60*60*1000)):'-';
  const now=new Date();const jam=now.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
  
  sec.innerHTML=`
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
    <button onclick="rPem()" style="width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="fas fa-arrow-left" style="font-size:12px;color:var(--text-muted)"></i></button>
    <i class="fas fa-stethoscope" style="color:var(--g1);font-size:20px"></i>
    <div><h2 style="font-size:20px;font-weight:800;margin:0">Pemeriksaan Medis</h2><p style="font-size:12px;color:var(--text-muted);margin:0">Input Klinis Anamnesa, Fisik, dan Lampiran Hasil</p></div>
    <div style="margin-left:auto;display:flex;gap:8px"><span style="padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;background:rgba(26,58,107,.08);color:var(--g1)">STATUS: GENERALIS TERISI</span><button onclick="printPDF('${p.id}')" style="padding:8px 16px;background:var(--g1);color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit"><i class="fas fa-file-alt"></i> Laporan Final</button></div>
  </div>
  <!-- Case Header -->
  <div style="border:1.5px solid var(--border);border-radius:12px;padding:20px 24px;margin-bottom:20px">
    <h3 style="font-size:14px;font-weight:700;margin-bottom:16px">Case Header Pasien</h3>
    <div style="display:grid;grid-template-columns:120px 1fr 120px 1fr;gap:10px 16px;font-size:12px;align-items:center">
      <label style="font-weight:600;color:var(--text-muted)">PatientID</label><input value="${p.id}" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
      <label style="font-weight:600;color:var(--text-muted)">Perusahaan</label><input value="${p.perusahaan||'-'}" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
      <label style="font-weight:600;color:var(--text-muted)">No Rekam Medis</label><input value="" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
      <label style="font-weight:600;color:var(--text-muted)">Departemen</label><input value="${p.departemen||'HRD'}" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
      <label style="font-weight:600;color:var(--text-muted)">Nama Peserta</label><input value="${p.nama}" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
      <label style="font-weight:600;color:var(--text-muted)">NPK</label><input value="${p.npk||'EMP-'+String(Math.floor(Math.random()*999999)).padStart(6,'0')}" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
      <label style="font-weight:600;color:var(--text-muted)">Tgl Lahir</label><div style="display:flex;gap:4px;align-items:center"><input value="${p.tanggalLahir||'-'}" readonly style="padding:8px 8px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:11px;font-family:inherit;width:90px"><span style="font-size:10px;color:var(--text-muted)">Usia</span><input value="${usia}" readonly style="padding:8px 6px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:11px;width:30px;text-align:center"><span style="font-size:10px">Tahun</span></div>
      <label style="font-weight:600;color:var(--text-muted)">Klinik</label><input value="K0031" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
      <label style="font-weight:600;color:var(--text-muted)">Jns Kelamin</label><input value="${p.jenisKelamin||'LAKI-LAKI'}" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
      <label style="font-weight:600;color:var(--text-muted)">Unit</label><input value="MCU" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
      <label style="font-weight:600;color:var(--text-muted)">Tanggal</label><div style="display:flex;gap:4px;align-items:center"><input value="${tglMCU}" readonly style="padding:8px 8px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:11px;font-family:inherit;width:90px"><span style="font-size:10px">Pukul</span><input value="${jam}" readonly style="padding:8px 6px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:11px;width:50px;text-align:center"></div>
      <label style="font-weight:600;color:var(--text-muted)">Nama Petugas</label><input value="${p.dokterReview||'dr. Rasya Alvansyah'}" readonly style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">
    </div>
  </div>
  <!-- Tabs -->
  <div style="display:flex;gap:0;border-bottom:2px solid var(--border);margin-bottom:20px">
    <button id="pemTabUmum" onclick="switchPemTab('umum')" style="padding:12px 24px;border:none;background:none;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;color:var(--g1);border-bottom:2px solid var(--g1);margin-bottom:-2px"><i class="fas fa-heartbeat" style="margin-right:6px"></i>Pemeriksaan Umum</button>
    <button id="pemTabHasil" onclick="switchPemTab('hasil')" style="padding:12px 24px;border:none;background:none;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;color:var(--text-muted)"><i class="fas fa-file-alt" style="margin-right:6px"></i>Hasil & Lampiran</button>
  </div>
  <!-- Content -->
  <div id="pemTabContent" style="display:flex;gap:20px;align-items:flex-start">
    <div id="pemNavSidebar" style="width:220px;flex-shrink:0;border-right:2px solid var(--border);padding-right:16px;max-height:600px;overflow-y:auto"></div>
    <div id="pemFormArea" style="flex:1;min-width:0"></div>
  </div>`;
  renderPemNav();
  renderPemForm();
}

function switchPemTab(tab){
  const btnU=document.getElementById('pemTabUmum');
  const btnH=document.getElementById('pemTabHasil');
  if(tab==='umum'){
    btnU.style.color='var(--g1)';btnU.style.borderBottom='2px solid var(--g1)';
    btnH.style.color='var(--text-muted)';btnH.style.borderBottom='none';
    document.getElementById('pemTabContent').style.display='flex';
    renderPemNav();renderPemForm();
  }else{
    btnH.style.color='var(--g1)';btnH.style.borderBottom='2px solid var(--g1)';
    btnU.style.color='var(--text-muted)';btnU.style.borderBottom='none';
    document.getElementById('pemTabContent').innerHTML='<div style="flex:1;text-align:center;padding:60px"><i class="fas fa-file-upload" style="font-size:48px;color:var(--text-muted);opacity:.3;margin-bottom:16px;display:block"></i><h3 style="color:var(--text-muted)">Hasil & Lampiran</h3><p style="font-size:13px;color:var(--text-muted)">Upload file hasil lab, radiologi, dan lampiran lainnya</p></div>';
  }
}

function renderPemNav(){
  const nav=document.getElementById('pemNavSidebar');if(!nav)return;
  let html='<h4 style="font-size:13px;font-weight:700;margin-bottom:12px">Navigasi Pemeriksaan</h4>';
  let lastGroup='';
  PEM_NAV.forEach(item=>{
    if(item.group!==lastGroup){html+=`<div style="font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin:12px 0 6px;padding-top:8px;${lastGroup?'border-top:1px solid var(--border)':''}">${item.group}</div>`;lastGroup=item.group;}
    const isActive=pemActiveNav===item.id;
    html+=`<div onclick="pemActiveNav='${item.id}';renderPemNav();renderPemForm()" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;cursor:pointer;margin-bottom:2px;${isActive?'background:var(--g1);color:#fff':'color:var(--text)'}">
      <span style="font-size:11px;font-weight:700;${isActive?'color:#fff':'color:var(--text-muted)'}">${item.id}</span>
      <span style="font-size:12px;font-weight:${isActive?'700':'500'};flex:1">${item.label}</span>
      <i class="fas fa-check-circle" style="font-size:13px;${isActive?'color:#fff':'color:#059669'}"></i>
    </div>`;
  });
  nav.innerHTML=html;
}

function renderPemForm(){
  const area=document.getElementById('pemFormArea');if(!area)return;
  const p=pemDetailPatient;
  const saved=p.pemDetail||{};
  const data=saved[pemActiveNav]||{};
  const btnStyle='padding:10px 24px;background:#059669;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:6px';
  const resetStyle='padding:10px 20px;background:#fff;border:1.5px solid var(--border);border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:6px';
  const radioGroup=(name,opts,val)=>opts.map(o=>`<label style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:13px;cursor:pointer"><input type="radio" name="${name}" value="${o}" ${val===o?'checked':''} style="accent-color:var(--g1)"> ${o}</label>`).join('');
  const inputField=(id,val,ph,unit)=>`<div style="display:flex;align-items:center;gap:4px"><input id="${id}" value="${val||''}" placeholder="${ph||''}" style="padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;font-size:13px;font-family:inherit;width:100%;outline:none">${unit?`<span style="font-size:11px;color:var(--text-muted);white-space:nowrap">${unit}</span>`:''}</div>`;
  const textArea=(id,val,ph)=>`<textarea id="${id}" placeholder="${ph||''}" rows="4" style="width:100%;padding:12px 14px;border:1.5px solid var(--border);border-radius:8px;font-size:13px;font-family:inherit;resize:vertical;outline:none">${val||''}</textarea>`;
  const footer=`<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px"><button style="${resetStyle}" onclick="resetPemForm()"><i class="fas fa-redo"></i> Reset</button><button style="${btnStyle}" onclick="savePemSection()"><i class="fas fa-save"></i> Simpan ${pemActiveNav}</button></div>`;

  let html='<div style="border:1.5px solid var(--border);border-radius:12px;padding:28px 32px">';
  
  if(pemActiveNav==='A1'){
    html+=`<h3 style="font-size:18px;font-weight:700;margin-bottom:20px">Keluhan Utama</h3>${textArea('pemA1_keluhan',data.keluhan,'sakit kepala pusing, batuk dan pilek')}`;
  }else if(pemActiveNav==='A2'){
    const items=['Masa kanak-kanak','Penyakit lain','Kecelakaan','Dirawat di RS','Operasi'];
    html+=`<h3 style="font-size:18px;font-weight:700;margin-bottom:20px">Riwayat Penyakit Dahulu</h3>`;
    items.forEach((it,i)=>{
      const key='a2_'+i;const val=data[key]||'Tidak Ada';
      html+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border)"><strong style="font-size:14px">${it}</strong><div>${radioGroup('pem_'+key,['Tidak Ada','Ada'],val)}</div></div>`;
      if(val==='Ada')html+=`<div style="padding:8px 0 12px"><label style="font-size:11px;color:var(--text-muted)">Keterangan / Detail (Wajib Diisi)</label>${inputField('pemA2_det_'+i,data['a2_det_'+i]||'','')}</div>`;
    });
  }else if(pemActiveNav==='A3'){
    html+=`<h3 style="font-size:18px;font-weight:700;margin-bottom:20px">Riwayat Obat-obatan</h3><div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0"><strong style="font-size:14px">Sedang Konsumsi Obat?</strong><div>${radioGroup('pem_a3',['Tidak Ada','Ada'],data.konsumsi||'Tidak Ada')}</div></div><div style="margin-top:12px"><label style="font-size:11px;color:var(--text-muted)">Nama / Jenis Obat (Wajib Diisi)</label>${textArea('pemA3_obat',data.obat,'antibiotik saja')}</div>`;
  }else if(pemActiveNav==='A4'){
    const items=['Hipertensi','Diabetes','Stroke','Penyakit Jantung','Penyakit Ginjal','Penyakit Hati','Penyakit Tiroid','Gangguan Mental','Asma','Alergi','Kanker / Tumor','Lain-lain'];
    html+=`<h3 style="font-size:18px;font-weight:700;margin-bottom:20px">Riwayat Penyakit Keluarga</h3>`;
    items.forEach((it,i)=>{
      const key='a4_'+i;const val=data[key]||'Tidak Ada';
      html+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border)"><strong style="font-size:13px">${it}</strong><div>${radioGroup('pem_'+key,['Tidak Ada','Ada'],val)}</div></div>`;
      if(val==='Ada')html+=`<div style="padding:4px 0 8px"><label style="font-size:11px;color:var(--text-muted)">Keterangan / Detail (Wajib Diisi)</label>${inputField('pemA4_det_'+i,data['a4_det_'+i]||'','')}</div>`;
    });
  }else if(pemActiveNav==='A5'){
    const items=['Merokok / Vape','Alkohol','Kopi','Olahraga'];
    html+=`<h3 style="font-size:18px;font-weight:700;margin-bottom:20px">Kebiasaan</h3>`;
    items.forEach((it,i)=>{
      const key='a5_'+i;const val=data[key]||'Tidak Ada';
      html+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border)"><strong style="font-size:13px">${it}</strong><div>${radioGroup('pem_'+key,['Tidak Ada','Ada'],val)}</div></div>`;
      if(val==='Ada')html+=`<div style="padding:4px 0 8px"><label style="font-size:11px;color:var(--text-muted)">Keterangan / Detail (Wajib Diisi)</label>${inputField('pemA5_det_'+i,data['a5_det_'+i]||'','')}</div>`;
    });
  }else if(pemActiveNav==='B1'){
    html+=`<div style="border-left:4px solid #e11d48;padding-left:12px;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700">Tanda-tanda Vital</h3></div>
    <div style="background:#f8fafc;border:1.5px solid var(--border);border-radius:10px;padding:20px;margin-bottom:20px">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;margin-bottom:12px">TEKANAN DARAH (TENSI)</div>
      <div style="display:flex;gap:16px;margin-bottom:8px"><div style="flex:1"><label style="font-size:11px;color:var(--text-muted)">Sistolik</label>${inputField('pemB1_sis',data.sistolik||'110','','mmHg')}</div><div style="flex:1"><label style="font-size:11px;color:var(--text-muted)">Diastolik</label>${inputField('pemB1_dia',data.diastolik||'75','','mmHg')}</div></div>
      <div style="font-size:12px;margin-top:4px">Klasifikasi: <span style="padding:2px 10px;border:1px solid #059669;border-radius:4px;color:#059669;font-weight:600;font-size:11px">Normal</span></div>
    </div>
    <div style="display:flex;gap:16px;margin-bottom:16px"><div style="flex:1"><label style="font-size:11px;color:var(--text-muted)">Nadi</label>${inputField('pemB1_nadi',data.nadi||'80','','x/menit')}</div><div style="flex:1"><label style="font-size:11px;color:var(--text-muted)">Suhu (°C)</label>${inputField('pemB1_suhu',data.suhu||'37.2','','°C')}</div></div>
    <div style="margin-bottom:20px"><label style="font-size:11px;color:var(--text-muted)">Frekuensi Pernafasan</label>${inputField('pemB1_nafas',data.nafas||'20','','x/menit')}</div>
    <div style="border-left:4px solid var(--g1);padding-left:12px;margin:24px 0 16px"><h3 style="font-size:16px;font-weight:700">Antropometri & Tumbuh Kembang</h3></div>
    <div style="display:flex;gap:16px;margin-bottom:16px"><div style="flex:1"><label style="font-size:11px;color:var(--text-muted)">Tinggi Badan</label>${inputField('pemB1_tinggi',data.tinggi||'187','','cm')}</div><div style="flex:1"><label style="font-size:11px;color:var(--text-muted)">Berat Badan</label>${inputField('pemB1_berat',data.berat||'77','','kg')}</div></div>
    <div style="background:var(--g1);color:#fff;border-radius:10px;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;margin-bottom:20px"><div style="display:flex;align-items:center;gap:10px"><i class="fas fa-check-circle" style="font-size:18px"></i><div><div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;opacity:.7">CALCULATED BMI INDEX</div><div style="font-size:22px;font-weight:800;font-family:monospace">22.02</div></div></div><div style="text-align:right"><div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;opacity:.7">STATUS GIZI</div><div style="padding:4px 12px;border:1.5px solid #fff;border-radius:6px;font-size:12px;font-weight:700;margin-top:4px">Normal (Ideal)</div></div></div>
    <div style="border-left:4px solid var(--text-muted);padding-left:12px;margin-bottom:12px"><div style="font-size:12px;font-weight:700;text-transform:uppercase">CATATAN GENERALIS KHUSUS (OPSIONAL)</div></div>
    ${textArea('pemB1_catatan',data.catatan,'')}`;
  }else if(pemActiveNav==='B2'){
    html+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700">Mata</h3><span style="font-size:12px;color:var(--text-muted)">Pemeriksaan mata kiri dan kanan</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div><div style="text-align:center;padding:8px;background:#f8fafc;border-radius:8px;font-weight:600;margin-bottom:12px">Mata Kiri</div>
        <div style="font-size:11px;font-weight:700;margin-bottom:6px">VISUS</div>${radioGroup('pem_visL',['Tanpa Kacamata','Dengan Kacamata'],data.visL||'Dengan Kacamata')}<div style="margin:8px 0 12px">${inputField('pemB2_visLval',data.visLval||'3.4','')}</div>
        <div style="font-size:11px;font-weight:700;margin:12px 0 6px">REFRAKSI</div><label style="font-size:12px"><input type="checkbox" checked style="accent-color:var(--g1)"> Diperiksa</label><div style="margin:6px 0">${inputField('pemB2_refL',data.refL||'','cth: Tidak keruh')}</div>${radioGroup('pem_refLst',['Normal','Abnormal'],data.refLst||'Normal')}
        <div style="font-size:11px;font-weight:700;margin:12px 0 6px">TEST ISHIHARA</div><label style="font-size:12px"><input type="checkbox" checked style="accent-color:var(--g1)"> Diperiksa</label><div style="margin:6px 0">${radioGroup('pem_ishL',['Normal','Buta Warna Parsial','Buta Warna Total'],data.ishL||'Normal')}</div>
        <div style="font-size:11px;font-weight:700;margin:12px 0 6px">KATARAK</div>${radioGroup('pem_katL',['Tidak','Ya'],data.katL||'Tidak')}
      </div>
      <div><div style="text-align:center;padding:8px;background:#f8fafc;border-radius:8px;font-weight:600;margin-bottom:12px">Mata Kanan</div>
        <div style="font-size:11px;font-weight:700;margin-bottom:6px">VISUS</div>${radioGroup('pem_visR',['Tanpa Kacamata','Dengan Kacamata'],data.visR||'Dengan Kacamata')}<div style="margin:8px 0 12px">${inputField('pemB2_visRval',data.visRval||'3.5','')}</div>
        <div style="font-size:11px;font-weight:700;margin:12px 0 6px">REFRAKSI</div><label style="font-size:12px"><input type="checkbox" checked style="accent-color:var(--g1)"> Diperiksa</label><div style="margin:6px 0">${inputField('pemB2_refR',data.refR||'','cth: Tidak keruh')}</div>${radioGroup('pem_refRst',['Normal','Abnormal'],data.refRst||'Normal')}
        <div style="font-size:11px;font-weight:700;margin:12px 0 6px">TEST ISHIHARA</div><label style="font-size:12px"><input type="checkbox" checked style="accent-color:var(--g1)"> Diperiksa</label><div style="margin:6px 0">${radioGroup('pem_ishR',['Normal','Buta Warna Parsial','Buta Warna Total'],data.ishR||'Normal')}</div>
        <div style="font-size:11px;font-weight:700;margin:12px 0 6px">KATARAK</div>${radioGroup('pem_katR',['Tidak','Ya'],data.katR||'Tidak')}
      </div>
    </div>`;
  }else if(pemActiveNav==='B3'){
    html+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700">Telinga</h3><span style="font-size:12px;color:var(--text-muted)">Pemeriksaan telinga kiri dan kanan</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div><div style="text-align:center;padding:8px;background:#f8fafc;border-radius:8px;font-weight:600;margin-bottom:12px">Telinga Kiri</div>
        <div style="font-size:11px;font-weight:700;margin-bottom:8px">MEATUS ACUSTICUS EXTERNUS</div>${radioGroup('pem_maeL',['Normal','Serumen','Lain-Lain'],data.maeL||'Normal')}
        <div style="font-size:11px;font-weight:700;margin:16px 0 8px">MEMBRAN TIMPANI</div>${radioGroup('pem_mtL',['Utuh','Perforasi'],data.mtL||'Utuh')}
        <div style="font-size:11px;font-weight:700;margin:16px 0 8px">AURICULA</div>${radioGroup('pem_aurL',['Normal','Abnormal'],data.aurL||'Normal')}
        <div style="font-size:11px;font-weight:700;margin:16px 0 8px">KETERANGAN</div>${textArea('pemB3_ketL',data.ketL,'Keterangan telinga...')}
      </div>
      <div><div style="text-align:center;padding:8px;background:#f8fafc;border-radius:8px;font-weight:600;margin-bottom:12px">Telinga Kanan</div>
        <div style="font-size:11px;font-weight:700;margin-bottom:8px">MEATUS ACUSTICUS EXTERNUS</div>${radioGroup('pem_maeR',['Normal','Serumen','Lain-Lain'],data.maeR||'Normal')}
        <div style="font-size:11px;font-weight:700;margin:16px 0 8px">MEMBRAN TIMPANI</div>${radioGroup('pem_mtR',['Utuh','Perforasi'],data.mtR||'Utuh')}
        <div style="font-size:11px;font-weight:700;margin:16px 0 8px">AURICULA</div>${radioGroup('pem_aurR',['Normal','Abnormal'],data.aurR||'Normal')}
        <div style="font-size:11px;font-weight:700;margin:16px 0 8px">KETERANGAN</div>${textArea('pemB3_ketR',data.ketR,'Keterangan telinga...')}
      </div>
    </div>`;
  }else if(pemActiveNav==='B4'){
    html+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700">Hidung</h3><span style="font-size:12px;color:var(--text-muted)">Pemeriksaan rongga hidung</span></div>
    <div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid var(--border)"><strong style="font-size:13px;min-width:120px">Septum Nasi</strong>${radioGroup('pem_septum',['Normal','Deviasi'],data.septum||'Normal')}${inputField('pemB4_septumDet',data.septumDet||'','')}</div>
    <div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid var(--border)"><strong style="font-size:13px;min-width:120px">Massa</strong>${radioGroup('pem_massa',['(-) Tidak Ada','(+) Ada'],data.massa||'(-) Tidak Ada')}${inputField('pemB4_massaDet',data.massaDet||'','')}</div>
    <div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid var(--border)"><strong style="font-size:13px;min-width:120px">Konka</strong>${radioGroup('pem_konka',['Tidak Hiperemis','Hiperemis'],data.konka||'Tidak Hiperemis')}${inputField('pemB4_konkaDet',data.konkaDet||'','')}</div>
    <div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid var(--border)"><strong style="font-size:13px;min-width:120px">Sekret</strong>${radioGroup('pem_sekret',['(-) Tidak Ada','(+) Ada'],data.sekret||'(-) Tidak Ada')}${inputField('pemB4_sekretDet',data.sekretDet||'','')}</div>
    <div style="margin-top:16px"><div style="font-size:11px;font-weight:700;margin-bottom:8px">KETERANGAN</div>${textArea('pemB4_ket',data.ket,'Keterangan hidung...')}</div>`;
  }else if(pemActiveNav==='B5'){
    html+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700">Pemeriksaan Mulut</h3><span style="font-size:12px;color:var(--text-muted)">Pemeriksaan rongga mulut dan gigi</span></div>
    <div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid var(--border)"><strong style="font-size:13px;min-width:160px">Mulut / Oral Hygiene</strong>${radioGroup('pem_oral',['Baik','Cukup','Kurang'],data.oral||'Cukup')}</div>
    <div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid var(--border)"><strong style="font-size:13px;min-width:160px">Gigi</strong>${radioGroup('pem_gigi',['Normal','Abnormal'],data.gigi||'Normal')}${inputField('pemB5_gigiDet',data.gigiDet||'','')}</div>
    <div style="margin-top:16px"><div style="font-size:11px;font-weight:700;margin-bottom:8px">KETERANGAN</div>${textArea('pemB5_ket',data.ket,'Keterangan mulut...')}</div>`;
  }else{
    // Generic form for B6-B15
    const labels={B6:'Orofaring',B7:'Kelenjar Tiroid',B8:'Sistem Limfatik (KGB)',B9:'Kulit',B10:'Sistem Kardiovaskuler',B11:'Sistem Pernafasan',B12:'Sistem Digestif',B13:'Sistem Genitourinaria',B14:'Pemeriksaan Ginekologi',B15:'Sistem Alat Gerak'};
    const descs={B6:'Pemeriksaan tonsil dan mukosa orofaring',B7:'Pemeriksaan kelenjar tiroid',B8:'Pemeriksaan kelenjar getah bening',B9:'Pemeriksaan kulit / integumen',B10:'Pemeriksaan jantung dan pembuluh darah',B11:'Pemeriksaan paru dan saluran pernafasan',B12:'Pemeriksaan sistem pencernaan',B13:'Pemeriksaan sistem ginjal dan saluran kemih',B14:'Catatan pemeriksaan ginekologi',B15:'Pemeriksaan ekstremitas dan otot'};
    html+=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700">${labels[pemActiveNav]||pemActiveNav}</h3><span style="font-size:12px;color:var(--text-muted)">${descs[pemActiveNav]||''}</span></div>
    <div style="font-size:11px;font-weight:700;margin-bottom:8px">KETERANGAN</div>${textArea('pemGen_ket',data.ket,'Keterangan '+((labels[pemActiveNav]||'').toLowerCase())+'...')}`;
  }
  
  html+=footer+'</div>';
  area.innerHTML=html;
}

function savePemSection(){
  const p=pemDetailPatient;if(!p)return;
  if(!p.pemDetail)p.pemDetail={};
  // Collect form data based on active nav
  const data={};
  if(pemActiveNav==='A1'){
    const el=document.getElementById('pemA1_keluhan');if(el)data.keluhan=el.value;
  }else if(pemActiveNav==='B1'){
    ['sis','dia','nadi','suhu','nafas','tinggi','berat','catatan'].forEach(k=>{
      const map={sis:'pemB1_sis',dia:'pemB1_dia',nadi:'pemB1_nadi',suhu:'pemB1_suhu',nafas:'pemB1_nafas',tinggi:'pemB1_tinggi',berat:'pemB1_berat',catatan:'pemB1_catatan'};
      const el=document.getElementById(map[k]);if(el)data[k==='sis'?'sistolik':k==='dia'?'diastolik':k]=el.value;
    });
  }else{
    // Generic: collect all inputs/textareas/radios in form area
    const area=document.getElementById('pemFormArea');
    area.querySelectorAll('input[type="text"],input[type="number"],textarea').forEach(el=>{if(el.id)data[el.id]=el.value;});
    area.querySelectorAll('input[type="radio"]:checked').forEach(el=>{data[el.name]=el.value;});
  }
  p.pemDetail[pemActiveNav]=data;
  // Save to localStorage
  const all=getAllPeserta();
  const idx=all.findIndex(x=>x.id===p.id);
  if(idx>=0){all[idx]=p;localStorage.setItem('mcu_peserta',JSON.stringify(all));}
  toast('Data '+pemActiveNav+' tersimpan');
}

function resetPemForm(){
  const p=pemDetailPatient;if(!p)return;
  if(p.pemDetail)delete p.pemDetail[pemActiveNav];
  renderPemForm();
  toast('Form '+pemActiveNav+' direset');
}
