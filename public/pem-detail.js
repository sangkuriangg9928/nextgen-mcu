// Pemeriksaan Medis Detail - Full Medical Examination Form (In-Page View)
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
  const sec=document.getElementById('p-pemeriksaan');
  if(!sec._origHTML)sec._origHTML=sec.innerHTML;
  renderPemDetailPage();
}

function closePemDetail(){
  const sec=document.getElementById('p-pemeriksaan');
  if(sec._origHTML){sec.innerHTML=sec._origHTML;sec._origHTML=null;}
  rPem();
}

function renderPemDetailPage(){
  const p=pemDetailPatient;if(!p)return;
  const sec=document.getElementById('p-pemeriksaan');
  const tglMCU=p.waktuRegistrasi?new Date(p.waktuRegistrasi).toLocaleDateString('id-ID'):new Date().toLocaleDateString('id-ID');
  const now=new Date();
  const jam=now.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
  const usiaCalc=p.tanggalLahir?(function(){const bd=new Date(p.tanggalLahir);let y=now.getFullYear()-bd.getFullYear();let m=now.getMonth()-bd.getMonth();if(m<0){y--;m+=12;}return{tahun:y,bulan:m};})():{tahun:'-',bulan:'-'};
  const fotoHTML=p.foto?'<img src="'+p.foto+'" style="width:100%;height:100%;object-fit:cover;border-radius:10px">':'<div style="width:100%;height:100%;background:#f4f6f9;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#a0aec0;text-align:center;border:1.5px dashed #ccd5e0">TIDAK ADA<br>FOTO</div>';

  sec.innerHTML=''+
  '<div style="max-width:960px;margin:0 auto">'+
  '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
    '<button onclick="closePemDetail()" style="width:36px;height:36px;border-radius:50%;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="fas fa-arrow-left" style="font-size:13px;color:#64748b"></i></button>'+
    '<i class="fas fa-stethoscope" style="color:#1a3a6b;font-size:20px"></i>'+
    '<div><h2 style="font-size:20px;font-weight:800;margin:0;color:#1a3a6b">Pemeriksaan Medis</h2><p style="font-size:12px;color:#64748b;margin:0">Input Klinis Anamnesa, Fisik, dan Lampiran Hasil</p></div>'+
    '<div style="margin-left:auto;display:flex;gap:10px;align-items:center">'+
      '<span style="padding:7px 16px;border-radius:8px;font-size:11px;font-weight:700;background:rgba(26,58,107,.08);color:#1a3a6b;letter-spacing:.3px">STATUS: GENERALIS TERISI</span>'+
      '<button onclick="openLaporanFinal(\''+p.id+'\')" style="padding:9px 18px;background:#1a3a6b;color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px"><i class="fas fa-file-alt"></i> Laporan Final</button>'+
    '</div>'+
  '</div>'+
  '<div style="border:1.5px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:20px;background:#fff">'+
    '<h3 style="font-size:14px;font-weight:700;margin-bottom:16px;color:#1a3a6b"><i class="fas fa-id-card" style="margin-right:8px;color:#1a3a6b"></i>Case Header Pasien</h3>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:16px;align-items:center">'+
      '<div style="display:grid;grid-template-columns:130px 1fr;gap:8px 12px;font-size:12px;align-items:center">'+
        '<label style="font-weight:600;color:#64748b">PatientID</label><input value="'+p.id+'" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit;color:#1a3a6b;font-weight:600">'+
        '<label style="font-weight:600;color:#64748b">No Rekam Medis</label><input value="-" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">'+
        '<label style="font-weight:600;color:#64748b">Nama Peserta</label><input value="'+p.nama+'" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit;font-weight:700;color:#1a3a6b">'+
        '<label style="font-weight:600;color:#64748b">Tgl Lahir</label><div style="display:flex;gap:6px;align-items:center"><input value="'+(p.tanggalLahir||'-')+'" readonly style="padding:8px 8px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:11px;font-family:inherit;width:100px"><span style="font-size:10px;color:#64748b;white-space:nowrap">Usia '+usiaCalc.tahun+' Tahun '+usiaCalc.bulan+' Bulan</span></div>'+
        '<label style="font-weight:600;color:#64748b">Jns Kelamin</label><input value="'+(p.jenisKelamin||'LAKI-LAKI')+'" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">'+
        '<label style="font-weight:600;color:#64748b">Tanggal</label><div style="display:flex;gap:6px;align-items:center"><input value="'+tglMCU+'" readonly style="padding:8px 8px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:11px;font-family:inherit;width:100px"><span style="font-size:10px;color:#64748b">Pukul</span><input value="'+jam+'" readonly style="padding:8px 6px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:11px;width:55px;text-align:center"></div>'+
      '</div>'+
      '<div style="display:grid;grid-template-columns:120px 1fr;gap:8px 12px;font-size:12px;align-items:center">'+
        '<label style="font-weight:600;color:#64748b">Perusahaan</label><input value="'+(p.perusahaan||'-')+'" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">'+
        '<label style="font-weight:600;color:#64748b">Departemen</label><input value="'+(p.departemen||'HRD')+'" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">'+
        '<label style="font-weight:600;color:#64748b">NPK (No Karyawan)</label><input value="'+(p.noKaryawan||p.npk||'-')+'" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">'+
        '<label style="font-weight:600;color:#64748b">Klinik</label><input value="K0031" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">'+
        '<label style="font-weight:600;color:#64748b">Unit</label><input value="MCU" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">'+
        '<label style="font-weight:600;color:#64748b">Nama Petugas</label><input value="'+(p.dokterReview||'dr. Rasya Alvansyah')+'" readonly style="padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:12px;font-family:inherit">'+
      '</div>'+
      '<div style="width:120px;height:150px;flex-shrink:0;display:flex;align-items:center;justify-content:center">'+fotoHTML+'</div>'+
    '</div>'+
  '</div>'+
  '<div style="display:flex;gap:0;border-bottom:2px solid #e2e8f0;margin-bottom:20px">'+
    '<button id="pemTabUmum" onclick="switchPemTab(\'umum\')" style="padding:12px 24px;border:none;background:none;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;color:#1a3a6b;border-bottom:2.5px solid #1a3a6b;margin-bottom:-2px"><i class="fas fa-heartbeat" style="margin-right:6px"></i>Pemeriksaan Umum</button>'+
    '<button id="pemTabHasil" onclick="switchPemTab(\'hasil\')" style="padding:12px 24px;border:none;background:none;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;color:#64748b"><i class="fas fa-file-alt" style="margin-right:6px"></i>Hasil &amp; Lampiran</button>'+
  '</div>'+
  '<div id="pemTabContent" style="display:flex;gap:0;align-items:flex-start">'+
    '<div id="pemNavSidebar" style="width:250px;flex-shrink:0;background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:16px;max-height:650px;overflow-y:auto"></div>'+
    '<div id="pemFormArea" style="flex:1;min-width:0;margin-left:20px"></div>'+
  '</div>'+
  '</div>';
  renderPemNav();
  renderPemForm();
}

function switchPemTab(tab){
  var btnU=document.getElementById('pemTabUmum');
  var btnH=document.getElementById('pemTabHasil');
  if(tab==='umum'){
    btnU.style.color='#1a3a6b';btnU.style.borderBottom='2.5px solid #1a3a6b';btnU.style.fontWeight='700';
    btnH.style.color='#64748b';btnH.style.borderBottom='none';btnH.style.fontWeight='600';
    document.getElementById('pemTabContent').innerHTML='<div id="pemNavSidebar" style="width:250px;flex-shrink:0;background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:16px;max-height:650px;overflow-y:auto"></div><div id="pemFormArea" style="flex:1;min-width:0;margin-left:20px"></div>';
    renderPemNav();renderPemForm();
  }else{
    btnH.style.color='#1a3a6b';btnH.style.borderBottom='2.5px solid #1a3a6b';btnH.style.fontWeight='700';
    btnU.style.color='#64748b';btnU.style.borderBottom='none';btnU.style.fontWeight='600';
    renderHasilLampiran();
  }
}

function renderHasilLampiran(){
  var p=pemDetailPatient;if(!p)return;
  var hasilData=p.hasilLampiran||{};
  var categories=[
    {id:'GIZI',label:'Status Gizi',code:'GIZI',showAntro:true},
    {id:'TENSI',label:'Tekanan Darah',code:'TENSI',showVital:true},
    {id:'FISIK',label:'Pemeriksaan Fisik',code:'FISIK',showAntro:true,showVital:true},
    {id:'LAB',label:'Laboratorium',code:'LAB'},
    {id:'RAD',label:'Radiologi / Thorax',code:'RAD'},
    {id:'EKG',label:'Treadmill / Jantung',code:'EKG'},
    {id:'MATA',label:'Mata / Visus',code:'MATA'},
    {id:'THT',label:'Audiometri / THT',code:'THT'},
    {id:'GIGI',label:'Gigi & Mulut',code:'GIGI'},
    {id:'LAIN',label:'Pemeriksaan Lainnya',code:'LAIN'}
  ];
  var vitalData=p.pemDetail&&p.pemDetail.B1?p.pemDetail.B1:{};
  var html='<div style="flex:1">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;padding:18px 24px;background:linear-gradient(135deg,#f8fafc,#eef2ff);border-radius:12px;border:1.5px solid #e2e8f0"><i class="fas fa-clipboard-list" style="font-size:20px;color:#1a3a6b"></i><div><h3 style="font-size:16px;font-weight:800;margin:0;color:#1a3a6b">Workstation Hasil Medis</h3><p style="font-size:12px;color:#64748b;margin:2px 0 0">Unggah dokumen hasil dari vendor / alat eksternal. Harap simpan catatan dokter secara berkala per kategori.</p></div></div>';
  categories.forEach(function(cat){
    var catData=hasilData[cat.id]||{};
    var files=catData.files||[];
    html+='<div style="border:2px solid #e2e8f0;border-radius:14px;padding:24px;margin-bottom:20px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.03)">'+
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:18px"><div style="width:4px;height:22px;background:#1a3a6b;border-radius:2px"></div><h4 style="font-size:16px;font-weight:800;color:#1a3a6b;margin:0">'+cat.label+'</h4><span style="font-size:11px;color:#94a3b8;font-weight:500">('+cat.code+')</span></div>'+
      '<div style="display:flex;gap:20px;align-items:flex-start">';
    // Left side - data + textareas
    html+='<div style="flex:1">';
    if(cat.showAntro){
      html+='<div style="background:linear-gradient(135deg,#eef2ff,#e0e7ff);border:1.5px solid #c7d2fe;border-radius:12px;padding:16px;margin-bottom:14px">'+
        '<div style="font-size:11px;font-weight:800;color:#4338ca;text-transform:uppercase;margin-bottom:12px;letter-spacing:.5px"><i class="fas fa-running" style="margin-right:6px"></i> DATA ANTROPOMETRI (B1)</div>'+
        '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
          '<div style="background:#fff;border:1.5px solid #c7d2fe;border-radius:8px;padding:10px 16px;text-align:center"><div style="font-size:9px;color:#64748b;text-transform:uppercase;margin-bottom:2px">TINGGI BADAN</div><div style="font-size:20px;font-weight:800;color:#1a3a6b">'+(vitalData.tinggi||'187')+' <span style="font-size:11px;font-weight:400;color:#64748b">cm</span></div></div>'+
          '<div style="background:#fff;border:1.5px solid #c7d2fe;border-radius:8px;padding:10px 16px;text-align:center"><div style="font-size:9px;color:#64748b;text-transform:uppercase;margin-bottom:2px">BERAT BADAN</div><div style="font-size:20px;font-weight:800;color:#1a3a6b">'+(vitalData.berat||'77')+' <span style="font-size:11px;font-weight:400;color:#64748b">kg</span></div></div>'+
          '<div style="background:#fff;border:1.5px solid #c7d2fe;border-radius:8px;padding:10px 16px;text-align:center"><div style="font-size:9px;color:#64748b;text-transform:uppercase;margin-bottom:2px">BMI</div><div style="font-size:20px;font-weight:800;color:#1a3a6b">'+(vitalData.tinggi&&vitalData.berat?(parseFloat(vitalData.berat)/Math.pow(parseFloat(vitalData.tinggi)/100,2)).toFixed(2):'22.02')+'</div></div>'+
          '<div style="background:#fff;border:1.5px solid #c7d2fe;border-radius:8px;padding:10px 16px;text-align:center"><div style="font-size:9px;color:#64748b;text-transform:uppercase;margin-bottom:2px">STATUS GIZI</div><div style="font-size:14px;font-weight:700;color:#059669">Normal (Ideal)</div></div>'+
        '</div></div>';
    }
    if(cat.showVital){
      html+='<div style="background:linear-gradient(135deg,#fef2f2,#ffe4e6);border:1.5px solid #fecaca;border-radius:12px;padding:16px;margin-bottom:14px">'+
        '<div style="font-size:11px;font-weight:800;color:#dc2626;text-transform:uppercase;margin-bottom:12px;letter-spacing:.5px"><i class="fas fa-heartbeat" style="margin-right:6px"></i> DATA TANDA VITAL (B1)</div>'+
        '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
          '<div style="background:#fff;border:1.5px solid #fecaca;border-radius:8px;padding:10px 16px;text-align:center"><div style="font-size:9px;color:#64748b;text-transform:uppercase;margin-bottom:2px">TEKANAN DARAH</div><div style="font-size:20px;font-weight:800;color:#1a3a6b">'+(vitalData.sistolik||'110')+'/'+(vitalData.diastolik||'75')+' <span style="font-size:11px;font-weight:400;color:#64748b">mmHg</span></div></div>'+
          '<div style="background:#fff;border:1.5px solid #fecaca;border-radius:8px;padding:10px 16px;text-align:center"><div style="font-size:9px;color:#64748b;text-transform:uppercase;margin-bottom:2px">NADI / PULSE</div><div style="font-size:20px;font-weight:800;color:#1a3a6b">'+(vitalData.nadi||'80')+' <span style="font-size:11px;font-weight:400;color:#64748b">x/mnt</span></div></div>'+
          '<div style="background:#fff;border:1.5px solid #fecaca;border-radius:8px;padding:10px 16px;text-align:center"><div style="font-size:9px;color:#64748b;text-transform:uppercase;margin-bottom:2px">KLASIFIKASI</div><div style="font-size:14px;font-weight:700;color:#059669">Normal</div></div>'+
        '</div></div>';
    }
    html+='<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:800;text-transform:uppercase;color:#1a3a6b;margin-bottom:8px;letter-spacing:.3px">KESIMPULAN OBJEKTIF (VENDOR / ALAT)</div><textarea id="hasil_obj_'+cat.id+'" rows="3" style="width:100%;padding:12px 14px;border:2px solid #cbd5e1;border-radius:10px;font-size:13px;font-family:inherit;resize:vertical;outline:none;background:#fff" placeholder="Ketik kesimpulan hasil '+cat.label+' di sini...">'+(catData.objektif||'')+'</textarea></div>'+
      '<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:800;text-transform:uppercase;color:#1a3a6b;margin-bottom:8px;letter-spacing:.3px">CATATAN DOKTER / SPESIALIS</div><textarea id="hasil_cat_'+cat.id+'" rows="3" style="width:100%;padding:12px 14px;border:2px solid #cbd5e1;border-radius:10px;font-size:13px;font-family:inherit;resize:vertical;outline:none;background:#fff" placeholder="Ketik catatan klinis dokter untuk area '+cat.label+' di sini...">'+(catData.catatan||'')+'</textarea></div>'+
      '<div style="text-align:right"><button onclick="simpanHasilCatatan(\''+cat.id+'\')" style="padding:10px 20px;background:#fff;border:2px solid #1a3a6b;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;color:#1a3a6b"><i class="fas fa-save" style="margin-right:6px"></i> Simpan Catatan</button></div>';
    html+='</div>';
    // Right side - dokumen hasil
    html+='<div style="width:280px;flex-shrink:0">'+
      '<div style="font-size:11px;font-weight:800;text-transform:uppercase;color:#1a3a6b;margin-bottom:8px;letter-spacing:.3px">DOKUMEN HASIL</div>'+
      '<div style="border:2px solid #e2e8f0;border-radius:10px;padding:12px;margin-bottom:12px;min-height:60px;background:#f8fafc">';
    if(files.length){
      files.forEach(function(f,fi){
        html+='<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border:1.5px solid #e2e8f0;border-radius:8px;margin-bottom:6px;font-size:11px;background:#fff"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#334155;font-weight:500">'+f.name+'</span><div style="display:flex;gap:6px;margin-left:8px"><i class="fas fa-check-circle" style="color:#059669;font-size:13px"></i><i class="fas fa-eye" style="color:#3b82f6;font-size:13px;cursor:pointer"></i><i class="fas fa-trash" style="color:#ef4444;font-size:13px;cursor:pointer" onclick="removeHasilFile(\''+cat.id+'\','+fi+')"></i></div></div>';
      });
    }else{
      html+='<div style="text-align:center;padding:12px;font-size:12px;color:#94a3b8"><i class="fas fa-folder-open" style="font-size:20px;display:block;margin-bottom:6px;opacity:.5"></i>Belum ada file</div>';
    }
    html+='</div>'+
      '<div style="display:flex;gap:8px"><button onclick="uploadHasilFile(\''+cat.id+'\',\'pdf\')" style="flex:1;padding:10px;border:2px solid #e2e8f0;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;background:#fff;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px"><i class="fas fa-file-pdf" style="color:#ef4444"></i> Upload PDF</button><button onclick="uploadHasilFile(\''+cat.id+'\',\'image\')" style="flex:1;padding:10px;border:2px solid #e2e8f0;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;background:#fff;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px"><i class="fas fa-image" style="color:#3b82f6"></i> Upload Image</button></div>'+
    '</div>';
    html+='</div></div>';
  });
  html+='</div>';
  document.getElementById('pemTabContent').innerHTML=html;
}

function simpanHasilCatatan(catId){
  var p=pemDetailPatient;if(!p)return;
  if(!p.hasilLampiran)p.hasilLampiran={};
  if(!p.hasilLampiran[catId])p.hasilLampiran[catId]={files:[]};
  var objEl=document.getElementById('hasil_obj_'+catId);
  var catEl=document.getElementById('hasil_cat_'+catId);
  if(objEl)p.hasilLampiran[catId].objektif=objEl.value;
  if(catEl)p.hasilLampiran[catId].catatan=catEl.value;
  var all=getAllPeserta();
  var idx=all.findIndex(function(x){return x.id===p.id;});
  if(idx>=0){all[idx]=p;localStorage.setItem('mcu_db',JSON.stringify(Object.assign({},JSON.parse(localStorage.getItem('mcu_db')||'{}'),{peserta:all})));}
  toast('Catatan '+catId+' tersimpan');
}

function uploadHasilFile(catId,type){
  var input=document.createElement('input');
  input.type='file';
  input.accept=type==='pdf'?'.pdf':'image/*';
  input.onchange=function(e){
    var file=e.target.files[0];if(!file)return;
    var p=pemDetailPatient;if(!p)return;
    if(!p.hasilLampiran)p.hasilLampiran={};
    if(!p.hasilLampiran[catId])p.hasilLampiran[catId]={files:[]};
    p.hasilLampiran[catId].files.push({name:file.name,type:file.type,size:file.size,uploadedAt:new Date().toISOString()});
    var all=getAllPeserta();
    var idx=all.findIndex(function(x){return x.id===p.id;});
    if(idx>=0){all[idx]=p;localStorage.setItem('mcu_db',JSON.stringify(Object.assign({},JSON.parse(localStorage.getItem('mcu_db')||'{}'),{peserta:all})));}
    toast('File "'+file.name+'" berhasil diupload');
    renderHasilLampiran();
  };
  input.click();
}

function removeHasilFile(catId,fileIdx){
  var p=pemDetailPatient;if(!p)return;
  if(p.hasilLampiran&&p.hasilLampiran[catId]&&p.hasilLampiran[catId].files){
    p.hasilLampiran[catId].files.splice(fileIdx,1);
    var all=getAllPeserta();
    var idx=all.findIndex(function(x){return x.id===p.id;});
    if(idx>=0){all[idx]=p;localStorage.setItem('mcu_db',JSON.stringify(Object.assign({},JSON.parse(localStorage.getItem('mcu_db')||'{}'),{peserta:all})));}
    renderHasilLampiran();
    toast('File dihapus');
  }
}

function renderPemNav(){
  var nav=document.getElementById('pemNavSidebar');if(!nav)return;
  var p=pemDetailPatient;
  var html='<h4 style="font-size:13px;font-weight:700;margin-bottom:14px;color:#1a3a6b"><i class="fas fa-list" style="margin-right:6px;font-size:11px"></i>Navigasi Pemeriksaan</h4>';
  var lastGroup='';
  PEM_NAV.forEach(function(item){
    if(item.group!==lastGroup){
      html+='<div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.5px;margin:'+(lastGroup?'14px':'4px')+' 0 8px;padding-top:'+(lastGroup?'10px':'0')+';'+(lastGroup?'border-top:1px solid #e2e8f0':'')+'">'+item.group+'</div>';
      lastGroup=item.group;
    }
    var isActive=pemActiveNav===item.id;
    var hasSaved=p&&p.pemDetail&&p.pemDetail[item.id];
    html+='<div onclick="pemActiveNav=\''+item.id+'\';renderPemNav();renderPemForm()" style="display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:8px;cursor:pointer;margin-bottom:3px;transition:all .15s;'+(isActive?'background:#1a3a6b;color:#fff;border-left:4px solid #f59e0b;padding-left:8px':'border-left:4px solid transparent;padding-left:8px')+'">'+
      '<span style="font-size:11px;font-weight:700;min-width:22px;'+(isActive?'color:#f59e0b':'color:#64748b')+'">'+item.id+'</span>'+
      '<span style="font-size:12px;font-weight:'+(isActive?'700':'500')+';flex:1;'+(isActive?'color:#fff':'color:#334155')+'">'+item.label+'</span>'+
      '<i class="fas fa-check-circle" style="font-size:12px;'+(isActive?'color:#fff':hasSaved?'color:#059669':'color:#cbd5e1')+'"></i>'+
    '</div>';
  });
  nav.innerHTML=html;
}

function renderPemForm(){
  var area=document.getElementById('pemFormArea');if(!area)return;
  var p=pemDetailPatient;
  var saved=p.pemDetail||{};
  var data=saved[pemActiveNav]||{};
  var btnStyle='padding:10px 24px;background:#059669;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:6px';
  var resetStyle='padding:10px 20px;background:#fff;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:6px';
  var radioGroup=function(name,opts,val){return opts.map(function(o){return '<label style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:13px;cursor:pointer"><input type="radio" name="'+name+'" value="'+o+'" '+(val===o?'checked':'')+' style="accent-color:#1a3a6b"> '+o+'</label>';}).join('');};
  var inputField=function(id,val,ph,unit){return '<div style="display:flex;align-items:center;gap:4px"><input id="'+id+'" value="'+(val||'')+'" placeholder="'+(ph||'')+'" style="padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;font-family:inherit;width:100%;outline:none">'+(unit?'<span style="font-size:11px;color:#64748b;white-space:nowrap">'+unit+'</span>':'')+'</div>';};
  var textArea=function(id,val,ph){return '<textarea id="'+id+'" placeholder="'+(ph||'')+'" rows="4" style="width:100%;padding:12px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;font-family:inherit;resize:vertical;outline:none">'+(val||'')+'</textarea>';};
  var footer='<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0"><button style="'+resetStyle+'" onclick="resetPemForm()"><i class="fas fa-redo"></i> Reset</button><button style="'+btnStyle+'" onclick="savePemSection()"><i class="fas fa-save"></i> Simpan '+pemActiveNav+'</button></div>';

  var html='<div style="border:1.5px solid #e2e8f0;border-radius:12px;padding:28px 32px;background:#fff">';
  
  if(pemActiveNav==='A1'){
    html+='<h3 style="font-size:18px;font-weight:700;margin-bottom:20px;color:#1a3a6b">Keluhan Utama</h3>'+textArea('pemA1_keluhan',data.keluhan,'Tuliskan keluhan utama pasien, misal: sakit kepala, pusing, batuk dan pilek...');
  }else if(pemActiveNav==='A2'){
    var items=['Masa kanak-kanak','Penyakit lain','Kecelakaan','Dirawat di RS','Operasi'];
    html+='<h3 style="font-size:18px;font-weight:700;margin-bottom:20px;color:#1a3a6b">Riwayat Penyakit Dahulu</h3>';
    items.forEach(function(it,i){
      var key='a2_'+i;var val=data[key]||'Tidak Ada';
      html+='<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid #e2e8f0"><strong style="font-size:14px;color:#334155">'+it+'</strong><div>'+radioGroup('pem_'+key,['Tidak Ada','Ada'],val)+'</div></div>';
      if(val==='Ada')html+='<div style="padding:8px 0 12px"><label style="font-size:11px;color:#64748b">Keterangan / Detail (Wajib Diisi)</label>'+inputField('pemA2_det_'+i,data['a2_det_'+i]||'','')+'</div>';
    });
  }else if(pemActiveNav==='A3'){
    html+='<h3 style="font-size:18px;font-weight:700;margin-bottom:20px;color:#1a3a6b">Riwayat Obat-obatan</h3><div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0"><strong style="font-size:14px;color:#334155">Sedang Konsumsi Obat?</strong><div>'+radioGroup('pem_a3',['Tidak Ada','Ada'],data.konsumsi||'Tidak Ada')+'</div></div><div style="margin-top:12px"><label style="font-size:11px;color:#64748b">Nama / Jenis Obat (Wajib Diisi)</label>'+textArea('pemA3_obat',data.obat,'antibiotik saja')+'</div>';
  }else if(pemActiveNav==='A4'){
    var items=['Hipertensi','Diabetes','Stroke','Penyakit Jantung','Penyakit Ginjal','Penyakit Hati','Penyakit Tiroid','Gangguan Mental','Asma','Alergi','Kanker / Tumor','Lain-lain'];
    html+='<h3 style="font-size:18px;font-weight:700;margin-bottom:20px;color:#1a3a6b">Riwayat Penyakit Keluarga</h3>';
    items.forEach(function(it,i){
      var key='a4_'+i;var val=data[key]||'Tidak Ada';
      html+='<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #e2e8f0"><strong style="font-size:13px;color:#334155">'+it+'</strong><div>'+radioGroup('pem_'+key,['Tidak Ada','Ada'],val)+'</div></div>';
      if(val==='Ada')html+='<div style="padding:4px 0 8px"><label style="font-size:11px;color:#64748b">Keterangan / Detail (Wajib Diisi)</label>'+inputField('pemA4_det_'+i,data['a4_det_'+i]||'','')+'</div>';
    });
  }else if(pemActiveNav==='A5'){
    var items=['Merokok / Vape','Alkohol','Kopi','Olahraga'];
    html+='<h3 style="font-size:18px;font-weight:700;margin-bottom:20px;color:#1a3a6b">Kebiasaan</h3>';
    items.forEach(function(it,i){
      var key='a5_'+i;var val=data[key]||'Tidak Ada';
      html+='<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #e2e8f0"><strong style="font-size:13px;color:#334155">'+it+'</strong><div>'+radioGroup('pem_'+key,['Tidak Ada','Ada'],val)+'</div></div>';
      if(val==='Ada')html+='<div style="padding:4px 0 8px"><label style="font-size:11px;color:#64748b">Keterangan / Detail (Wajib Diisi)</label>'+inputField('pemA5_det_'+i,data['a5_det_'+i]||'','')+'</div>';
    });
  }else if(pemActiveNav==='B1'){
    html+='<div style="border-left:4px solid #e11d48;padding-left:12px;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700;color:#1a3a6b">Tanda-tanda Vital</h3></div>'+
    '<div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:20px">'+
      '<div style="font-size:12px;font-weight:700;text-transform:uppercase;margin-bottom:12px;color:#334155">TEKANAN DARAH (TENSI)</div>'+
      '<div style="display:flex;gap:16px;margin-bottom:8px"><div style="flex:1"><label style="font-size:11px;color:#64748b">Sistolik</label>'+inputField('pemB1_sis',data.sistolik||'110','','mmHg')+'</div><div style="flex:1"><label style="font-size:11px;color:#64748b">Diastolik</label>'+inputField('pemB1_dia',data.diastolik||'75','','mmHg')+'</div></div>'+
      '<div style="font-size:12px;margin-top:4px">Klasifikasi: <span style="padding:2px 10px;border:1px solid #059669;border-radius:4px;color:#059669;font-weight:600;font-size:11px">Normal</span></div>'+
    '</div>'+
    '<div style="display:flex;gap:16px;margin-bottom:16px"><div style="flex:1"><label style="font-size:11px;color:#64748b">Nadi</label>'+inputField('pemB1_nadi',data.nadi||'80','','x/menit')+'</div><div style="flex:1"><label style="font-size:11px;color:#64748b">Suhu (C)</label>'+inputField('pemB1_suhu',data.suhu||'37.2','','C')+'</div></div>'+
    '<div style="margin-bottom:20px"><label style="font-size:11px;color:#64748b">Frekuensi Pernafasan</label>'+inputField('pemB1_nafas',data.nafas||'20','','x/menit')+'</div>'+
    '<div style="border-left:4px solid #1a3a6b;padding-left:12px;margin:24px 0 16px"><h3 style="font-size:16px;font-weight:700;color:#1a3a6b">Antropometri &amp; Tumbuh Kembang</h3></div>'+
    '<div style="display:flex;gap:16px;margin-bottom:16px"><div style="flex:1"><label style="font-size:11px;color:#64748b">Tinggi Badan</label>'+inputField('pemB1_tinggi',data.tinggi||'187','','cm')+'</div><div style="flex:1"><label style="font-size:11px;color:#64748b">Berat Badan</label>'+inputField('pemB1_berat',data.berat||'77','','kg')+'</div></div>'+
    '<div style="background:#1a3a6b;color:#fff;border-radius:10px;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;margin-bottom:20px"><div style="display:flex;align-items:center;gap:10px"><i class="fas fa-check-circle" style="font-size:18px"></i><div><div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;opacity:.7">CALCULATED BMI INDEX</div><div id="pemBmiVal" style="font-size:22px;font-weight:800;font-family:monospace">22.02</div></div></div><div style="text-align:right"><div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;opacity:.7">STATUS GIZI</div><div id="pemBmiStatus" style="padding:4px 12px;border:1.5px solid #fff;border-radius:6px;font-size:12px;font-weight:700;margin-top:4px">Normal (Ideal)</div></div></div>'+
    '<div style="border-left:4px solid #64748b;padding-left:12px;margin-bottom:12px"><div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#334155">CATATAN GENERALIS KHUSUS (OPSIONAL)</div></div>'+
    textArea('pemB1_catatan',data.catatan,'');
  }else if(pemActiveNav==='B2'){
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700;color:#1a3a6b">Mata</h3><span style="font-size:12px;color:#64748b">Pemeriksaan mata kiri dan kanan</span></div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">'+
      '<div><div style="text-align:center;padding:8px;background:#f8fafc;border-radius:8px;font-weight:600;margin-bottom:12px;color:#1a3a6b">Mata Kiri</div>'+
        '<div style="font-size:11px;font-weight:700;margin-bottom:6px;color:#334155">VISUS</div>'+radioGroup('pem_visL',['Tanpa Kacamata','Dengan Kacamata'],data.visL||'Dengan Kacamata')+'<div style="margin:8px 0 12px">'+inputField('pemB2_visLval',data.visLval||'3.4','')+'</div>'+
        '<div style="font-size:11px;font-weight:700;margin:12px 0 6px;color:#334155">REFRAKSI</div><label style="font-size:12px"><input type="checkbox" checked style="accent-color:#1a3a6b"> Diperiksa</label><div style="margin:6px 0">'+inputField('pemB2_refL',data.refL||'','cth: Tidak keruh')+'</div>'+radioGroup('pem_refLst',['Normal','Abnormal'],data.refLst||'Normal')+
        '<div style="font-size:11px;font-weight:700;margin:12px 0 6px;color:#334155">TEST ISHIHARA</div><label style="font-size:12px"><input type="checkbox" checked style="accent-color:#1a3a6b"> Diperiksa</label><div style="margin:6px 0">'+radioGroup('pem_ishL',['Normal','Buta Warna Parsial','Buta Warna Total'],data.ishL||'Normal')+'</div>'+
        '<div style="font-size:11px;font-weight:700;margin:12px 0 6px;color:#334155">KATARAK</div>'+radioGroup('pem_katL',['Tidak','Ya'],data.katL||'Tidak')+
      '</div>'+
      '<div><div style="text-align:center;padding:8px;background:#f8fafc;border-radius:8px;font-weight:600;margin-bottom:12px;color:#1a3a6b">Mata Kanan</div>'+
        '<div style="font-size:11px;font-weight:700;margin-bottom:6px;color:#334155">VISUS</div>'+radioGroup('pem_visR',['Tanpa Kacamata','Dengan Kacamata'],data.visR||'Dengan Kacamata')+'<div style="margin:8px 0 12px">'+inputField('pemB2_visRval',data.visRval||'3.5','')+'</div>'+
        '<div style="font-size:11px;font-weight:700;margin:12px 0 6px;color:#334155">REFRAKSI</div><label style="font-size:12px"><input type="checkbox" checked style="accent-color:#1a3a6b"> Diperiksa</label><div style="margin:6px 0">'+inputField('pemB2_refR',data.refR||'','cth: Tidak keruh')+'</div>'+radioGroup('pem_refRst',['Normal','Abnormal'],data.refRst||'Normal')+
        '<div style="font-size:11px;font-weight:700;margin:12px 0 6px;color:#334155">TEST ISHIHARA</div><label style="font-size:12px"><input type="checkbox" checked style="accent-color:#1a3a6b"> Diperiksa</label><div style="margin:6px 0">'+radioGroup('pem_ishR',['Normal','Buta Warna Parsial','Buta Warna Total'],data.ishR||'Normal')+'</div>'+
        '<div style="font-size:11px;font-weight:700;margin:12px 0 6px;color:#334155">KATARAK</div>'+radioGroup('pem_katR',['Tidak','Ya'],data.katR||'Tidak')+
      '</div>'+
    '</div>';
  }else if(pemActiveNav==='B3'){
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700;color:#1a3a6b">Telinga</h3><span style="font-size:12px;color:#64748b">Pemeriksaan telinga kiri dan kanan</span></div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">'+
      '<div><div style="text-align:center;padding:8px;background:#f8fafc;border-radius:8px;font-weight:600;margin-bottom:12px;color:#1a3a6b">Telinga Kiri</div>'+
        '<div style="font-size:11px;font-weight:700;margin-bottom:8px;color:#334155">MEATUS ACUSTICUS EXTERNUS</div>'+radioGroup('pem_maeL',['Normal','Serumen','Lain-Lain'],data.maeL||'Normal')+
        '<div style="font-size:11px;font-weight:700;margin:16px 0 8px;color:#334155">MEMBRAN TIMPANI</div>'+radioGroup('pem_mtL',['Utuh','Perforasi'],data.mtL||'Utuh')+
        '<div style="font-size:11px;font-weight:700;margin:16px 0 8px;color:#334155">AURICULA</div>'+radioGroup('pem_aurL',['Normal','Abnormal'],data.aurL||'Normal')+
        '<div style="font-size:11px;font-weight:700;margin:16px 0 8px;color:#334155">KETERANGAN</div>'+textArea('pemB3_ketL',data.ketL,'Keterangan telinga...')+
      '</div>'+
      '<div><div style="text-align:center;padding:8px;background:#f8fafc;border-radius:8px;font-weight:600;margin-bottom:12px;color:#1a3a6b">Telinga Kanan</div>'+
        '<div style="font-size:11px;font-weight:700;margin-bottom:8px;color:#334155">MEATUS ACUSTICUS EXTERNUS</div>'+radioGroup('pem_maeR',['Normal','Serumen','Lain-Lain'],data.maeR||'Normal')+
        '<div style="font-size:11px;font-weight:700;margin:16px 0 8px;color:#334155">MEMBRAN TIMPANI</div>'+radioGroup('pem_mtR',['Utuh','Perforasi'],data.mtR||'Utuh')+
        '<div style="font-size:11px;font-weight:700;margin:16px 0 8px;color:#334155">AURICULA</div>'+radioGroup('pem_aurR',['Normal','Abnormal'],data.aurR||'Normal')+
        '<div style="font-size:11px;font-weight:700;margin:16px 0 8px;color:#334155">KETERANGAN</div>'+textArea('pemB3_ketR',data.ketR,'Keterangan telinga...')+
      '</div>'+
    '</div>';
  }else if(pemActiveNav==='B4'){
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700;color:#1a3a6b">Hidung</h3><span style="font-size:12px;color:#64748b">Pemeriksaan rongga hidung</span></div>'+
    '<div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid #e2e8f0"><strong style="font-size:13px;min-width:120px;color:#334155">Septum Nasi</strong>'+radioGroup('pem_septum',['Normal','Deviasi'],data.septum||'Normal')+inputField('pemB4_septumDet',data.septumDet||'','')+'</div>'+
    '<div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid #e2e8f0"><strong style="font-size:13px;min-width:120px;color:#334155">Massa</strong>'+radioGroup('pem_massa',['(-) Tidak Ada','(+) Ada'],data.massa||'(-) Tidak Ada')+inputField('pemB4_massaDet',data.massaDet||'','')+'</div>'+
    '<div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid #e2e8f0"><strong style="font-size:13px;min-width:120px;color:#334155">Konka</strong>'+radioGroup('pem_konka',['Tidak Hiperemis','Hiperemis'],data.konka||'Tidak Hiperemis')+inputField('pemB4_konkaDet',data.konkaDet||'','')+'</div>'+
    '<div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid #e2e8f0"><strong style="font-size:13px;min-width:120px;color:#334155">Sekret</strong>'+radioGroup('pem_sekret',['(-) Tidak Ada','(+) Ada'],data.sekret||'(-) Tidak Ada')+inputField('pemB4_sekretDet',data.sekretDet||'','')+'</div>'+
    '<div style="margin-top:16px"><div style="font-size:11px;font-weight:700;margin-bottom:8px;color:#334155">KETERANGAN</div>'+textArea('pemB4_ket',data.ket,'Keterangan hidung...')+'</div>';
  }else if(pemActiveNav==='B5'){
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700;color:#1a3a6b">Pemeriksaan Mulut</h3><span style="font-size:12px;color:#64748b">Pemeriksaan rongga mulut dan gigi</span></div>'+
    '<div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid #e2e8f0"><strong style="font-size:13px;min-width:160px;color:#334155">Mulut / Oral Hygiene</strong>'+radioGroup('pem_oral',['Baik','Cukup','Kurang'],data.oral||'Cukup')+'</div>'+
    '<div style="display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid #e2e8f0"><strong style="font-size:13px;min-width:160px;color:#334155">Gigi</strong>'+radioGroup('pem_gigi',['Normal','Abnormal'],data.gigi||'Normal')+inputField('pemB5_gigiDet',data.gigiDet||'','')+'</div>'+
    '<div style="margin-top:16px"><div style="font-size:11px;font-weight:700;margin-bottom:8px;color:#334155">KETERANGAN</div>'+textArea('pemB5_ket',data.ket,'Keterangan mulut...')+'</div>';
  }else{
    var labels={B6:'Orofaring',B7:'Kelenjar Tiroid',B8:'Sistem Limfatik (KGB)',B9:'Kulit',B10:'Sistem Kardiovaskuler',B11:'Sistem Pernafasan',B12:'Sistem Digestif',B13:'Sistem Genitourinaria',B14:'Pemeriksaan Ginekologi',B15:'Sistem Alat Gerak'};
    var descs={B6:'Pemeriksaan tonsil dan mukosa orofaring',B7:'Pemeriksaan kelenjar tiroid',B8:'Pemeriksaan kelenjar getah bening',B9:'Pemeriksaan kulit / integumen',B10:'Pemeriksaan jantung dan pembuluh darah',B11:'Pemeriksaan paru dan saluran pernafasan',B12:'Pemeriksaan sistem pencernaan',B13:'Pemeriksaan sistem ginjal dan saluran kemih',B14:'Catatan pemeriksaan ginekologi',B15:'Pemeriksaan ekstremitas dan otot'};
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px"><h3 style="font-size:18px;font-weight:700;color:#1a3a6b">'+(labels[pemActiveNav]||pemActiveNav)+'</h3><span style="font-size:12px;color:#64748b">'+(descs[pemActiveNav]||'')+'</span></div>'+
    '<div style="font-size:11px;font-weight:700;margin-bottom:8px;color:#334155">KETERANGAN</div>'+textArea('pemGen_ket',data.ket,'Keterangan '+((labels[pemActiveNav]||'').toLowerCase())+'...');
  }
  
  html+=footer+'</div>';
  area.innerHTML=html;

  // BMI auto-calculation for B1
  if(pemActiveNav==='B1'){
    var tb=document.getElementById('pemB1_tinggi');
    var bb=document.getElementById('pemB1_berat');
    if(tb&&bb){
      var calcBmi=function(){
        var t=parseFloat(tb.value)/100;
        var b=parseFloat(bb.value);
        var bmiEl=document.getElementById('pemBmiVal');
        var statusEl=document.getElementById('pemBmiStatus');
        if(t>0&&b>0&&bmiEl&&statusEl){
          var v=(b/(t*t)).toFixed(2);
          var kat='Normal (Ideal)';
          if(v<18.5)kat='Underweight';else if(v>=25&&v<30)kat='Overweight';else if(v>=30)kat='Obesitas';
          bmiEl.textContent=v;
          statusEl.textContent=kat;
        }
      };
      tb.addEventListener('input',calcBmi);
      bb.addEventListener('input',calcBmi);
      calcBmi();
    }
  }
}

function savePemSection(){
  var p=pemDetailPatient;if(!p)return;
  if(!p.pemDetail)p.pemDetail={};
  var data={};
  if(pemActiveNav==='A1'){
    var el=document.getElementById('pemA1_keluhan');if(el)data.keluhan=el.value;
  }else if(pemActiveNav==='B1'){
    var map={sis:'pemB1_sis',dia:'pemB1_dia',nadi:'pemB1_nadi',suhu:'pemB1_suhu',nafas:'pemB1_nafas',tinggi:'pemB1_tinggi',berat:'pemB1_berat',catatan:'pemB1_catatan'};
    Object.keys(map).forEach(function(k){
      var el=document.getElementById(map[k]);
      if(el)data[k==='sis'?'sistolik':k==='dia'?'diastolik':k]=el.value;
    });
  }else{
    var area=document.getElementById('pemFormArea');
    area.querySelectorAll('input[type="text"],input[type="number"],textarea').forEach(function(el){if(el.id)data[el.id]=el.value;});
    area.querySelectorAll('input[type="radio"]:checked').forEach(function(el){data[el.name]=el.value;});
  }
  p.pemDetail[pemActiveNav]=data;
  var all=getAllPeserta();
  var idx=all.findIndex(function(x){return x.id===p.id;});
  if(idx>=0){all[idx]=p;localStorage.setItem('mcu_db',JSON.stringify(Object.assign({},JSON.parse(localStorage.getItem('mcu_db')||'{}'),{peserta:all})));}
  toast('Data '+pemActiveNav+' tersimpan');
  renderPemNav();
}

function resetPemForm(){
  var p=pemDetailPatient;if(!p)return;
  if(p.pemDetail)delete p.pemDetail[pemActiveNav];
  renderPemForm();
  renderPemNav();
  toast('Form '+pemActiveNav+' direset');
}

// Laporan Final - Detail view
function openLaporanFinal(id){
  var p=getAllPeserta().find(function(x){return x.id===id;});
  if(!p)return toast('Peserta tidak ditemukan');
  var sec=document.getElementById('p-pemeriksaan');
  if(!sec._origHTML)sec._origHTML=sec.innerHTML;
  var now=new Date();
  var usia=p.tanggalLahir?(function(){var bd=new Date(p.tanggalLahir);var y=now.getFullYear()-bd.getFullYear();var m=now.getMonth()-bd.getMonth();if(m<0){y--;m+=12;}return y+' Tahun '+m+' Bulan';})():'-';
  var tglMCU=p.tanggalDaftar?p.tanggalDaftar.split('T')[0]:now.toISOString().split('T')[0];
  var hasIdentitas=true;
  var hasAnamnesa=p.pemDetail&&(p.pemDetail.A1||p.pemDetail.A2||p.pemDetail.A3);
  var hasGeneralis=p.pemDetail&&p.pemDetail.B1;
  var hasFisik=p.pemDetail&&(p.pemDetail.B2||p.pemDetail.B3||p.pemDetail.B4||p.pemDetail.B5);
  var hasHasil=p.hasilLampiran&&Object.keys(p.hasilLampiran).length>0;
  var kelengkapan=[
    {label:'Identitas Pasien',icon:'fa-user',done:hasIdentitas},
    {label:'Anamnesa',icon:'fa-file-medical',done:hasAnamnesa},
    {label:'Pemeriksaan Generalis (B1)',icon:'fa-heartbeat',done:hasGeneralis},
    {label:'Pemeriksaan Fisik (B2-B15)',icon:'fa-stethoscope',done:hasFisik},
    {label:'Hasil & Lampiran',icon:'fa-file-alt',done:hasHasil}
  ];
  var kategori=[
    {label:'Status Gizi',icon:'fa-weight'},
    {label:'Tekanan Darah',icon:'fa-tint'},
    {label:'Pemeriksaan Fisik',icon:'fa-user-md'},
    {label:'Laboratorium',icon:'fa-flask'},
    {label:'Radiologi / Thorax',icon:'fa-x-ray'},
    {label:'Treadmill / Jantung / EKG',icon:'fa-heartbeat'},
    {label:'Mata / Visus',icon:'fa-eye'},
    {label:'Audiometri / THT',icon:'fa-deaf'},
    {label:'Gigi & Mulut',icon:'fa-tooth'}
  ];
  var siap=hasIdentitas&&hasAnamnesa&&hasGeneralis;
  sec.innerHTML='<div style="max-width:800px;margin:0 auto">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">'+
      '<button onclick="openPemDetail(\''+p.id+'\')" style="width:36px;height:36px;border-radius:50%;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="fas fa-arrow-left" style="font-size:13px;color:#64748b"></i></button>'+
      '<div><h2 style="font-size:20px;font-weight:800;margin:0;color:#1a3a6b">Detail Laporan MCU</h2><p style="font-size:12px;color:#64748b;margin:0">Review kelengkapan data sebelum cetak laporan final</p></div>'+
      '<div style="margin-left:auto"><span style="padding:7px 16px;border-radius:8px;font-size:11px;font-weight:700;'+(siap?'background:#ecfdf5;color:#059669;border:1.5px solid #a7f3d0':'background:#fef3c7;color:#d97706;border:1.5px solid #fde68a')+'">'+(siap?'SIAP DICETAK':'BELUM LENGKAP')+'</span></div>'+
    '</div>'+
    '<div style="border:1.5px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:20px;background:#fff">'+
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">'+
        '<div><div style="font-size:10px;color:#64748b;text-transform:uppercase">NAMA PESERTA</div><div style="font-size:14px;font-weight:700;color:#1a3a6b">'+p.nama+'</div></div>'+
        '<div><div style="font-size:10px;color:#64748b;text-transform:uppercase">PATIENT ID</div><div style="font-size:14px;font-weight:700;color:#1a3a6b">'+p.id+'</div></div>'+
        '<div><div style="font-size:10px;color:#64748b;text-transform:uppercase">JENIS KELAMIN</div><div style="font-size:14px;font-weight:700;color:#1a3a6b">'+(p.jenisKelamin||'Laki-laki')+'</div></div>'+
        '<div><div style="font-size:10px;color:#64748b;text-transform:uppercase">USIA</div><div style="font-size:14px;font-weight:700;color:#1a3a6b">'+usia+'</div></div>'+
        '<div><div style="font-size:10px;color:#64748b;text-transform:uppercase">PERUSAHAAN</div><div style="font-size:14px;font-weight:700;color:#1a3a6b">'+(p.perusahaan||'-')+'</div></div>'+
        '<div><div style="font-size:10px;color:#64748b;text-transform:uppercase">TANGGAL MCU</div><div style="font-size:14px;font-weight:700;color:#1a3a6b">'+tglMCU+'</div></div>'+
      '</div>'+
    '</div>'+
    '<div style="border:1.5px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:20px;background:#fff">'+
      '<h4 style="font-size:12px;font-weight:800;text-transform:uppercase;color:#1a3a6b;margin-bottom:16px;letter-spacing:.5px">KELENGKAPAN DATA LAPORAN</h4>'+
      kelengkapan.map(function(k){return '<div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #f1f5f9"><i class="fas '+k.icon+'" style="color:#94a3b8;font-size:14px;width:20px;text-align:center"></i><span style="flex:1;font-size:13px;font-weight:500;color:#334155">'+k.label+'</span><span style="display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;'+(k.done?'color:#059669':'color:#94a3b8')+'"><i class="fas fa-check-circle"></i> '+(k.done?'Terisi':'Belum')+'</span></div>';}).join('')+
    '</div>'+
    '<div style="border:1.5px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:24px;background:#fff">'+
      '<h4 style="font-size:12px;font-weight:800;text-transform:uppercase;color:#1a3a6b;margin-bottom:16px;letter-spacing:.5px">RINGKASAN HASIL PER KATEGORI</h4>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+
      kategori.map(function(k){var hasCat=p.hasilLampiran&&p.hasilLampiran[k.label.split(' ')[0].toUpperCase()];return '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid #f1f5f9;border-radius:8px"><i class="fas '+k.icon+'" style="color:#94a3b8;font-size:12px"></i><span style="flex:1;font-size:12px;color:#334155">'+k.label+'</span><i class="fas fa-check-circle" style="color:'+(hasCat?'#059669':'#cbd5e1')+';font-size:13px"></i></div>';}).join('')+
      '</div>'+
    '</div>'+
    '<div style="display:flex;gap:12px;margin-bottom:16px">'+
      '<button onclick="openPesertaDoc(\''+p.id+'\')" style="flex:1;padding:14px;background:#059669;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px"><i class="fas fa-eye"></i> Preview Laporan Final</button>'+
      '<button onclick="openPesertaDoc(\''+p.id+'\')" style="flex:1;padding:14px;background:#fff;color:#1a3a6b;border:2px solid #e2e8f0;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px"><i class="fas fa-print"></i> Print / Simpan PDF</button>'+
    '</div>'+
    '<div style="text-align:center"><a href="javascript:void(0)" onclick="openPemDetail(\''+p.id+'\')" style="font-size:12px;color:#1a3a6b;text-decoration:none">&larr; Kembali ke Pemeriksaan Medis (Input/Edit Data)</a></div>'+
  '</div>';
}
