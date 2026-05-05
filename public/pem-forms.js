// Form Pemeriksaan Detail - Standar RS Nasional
// Setiap unit punya form spesifik dengan field lengkap

const PEM_FORMS = {
  'Konsultasi Dokter Umum MCU': {
    title: 'Pemeriksaan Umum & Vital Signs',
    icon: 'fa-user-md',
    fields: [
      { id:'sistol', label:'Tekanan Darah Sistol (mmHg)', type:'number', placeholder:'120', ref:'Normal: 90-120' },
      { id:'diastol', label:'Tekanan Darah Diastol (mmHg)', type:'number', placeholder:'80', ref:'Normal: 60-80' },
      { id:'nadi', label:'Denyut Nadi (x/menit)', type:'number', placeholder:'72', ref:'Normal: 60-100' },
      { id:'respirasi', label:'Respirasi / Nafas (x/menit)', type:'number', placeholder:'18', ref:'Normal: 12-20' },
      { id:'suhu', label:'Suhu Tubuh (Celcius)', type:'number', step:'0.1', placeholder:'36.5', ref:'Normal: 36.1-37.2' },
      { id:'tinggiBadan', label:'Tinggi Badan (cm)', type:'number', placeholder:'170' },
      { id:'beratBadan', label:'Berat Badan (kg)', type:'number', step:'0.1', placeholder:'65' },
      { id:'imt', label:'IMT (auto)', type:'text', readonly:true, placeholder:'Otomatis dihitung' },
      { id:'lingkarPerut', label:'Lingkar Perut (cm)', type:'number', placeholder:'80', ref:'Pria <90, Wanita <80' },
      { id:'keluhan', label:'Keluhan Utama', type:'textarea', placeholder:'Keluhan yang dirasakan saat ini' },
      { id:'riwayatPenyakit', label:'Riwayat Penyakit Dahulu', type:'textarea', placeholder:'Penyakit yang pernah diderita' },
      { id:'riwayatKeluarga', label:'Riwayat Penyakit Keluarga', type:'textarea', placeholder:'DM, Hipertensi, Jantung, dll' },
      { id:'riwayatAlergi', label:'Riwayat Alergi', type:'textarea', placeholder:'Obat, makanan, dll' },
      { id:'kebiasaan', label:'Kebiasaan (Merokok/Alkohol/Olahraga)', type:'textarea', placeholder:'Merokok: Ya/Tidak, Alkohol: Ya/Tidak, Olahraga: rutin/jarang' },
      { id:'pemFisikKepala', label:'Pemeriksaan Fisik - Kepala/Leher', type:'textarea', placeholder:'Konjungtiva, sklera, THT, tiroid' },
      { id:'pemFisikThorax', label:'Pemeriksaan Fisik - Thorax', type:'textarea', placeholder:'Cor: BJ I-II reguler, Pulmo: vesikuler' },
      { id:'pemFisikAbdomen', label:'Pemeriksaan Fisik - Abdomen', type:'textarea', placeholder:'Supel, nyeri tekan (-), hepar/lien tidak teraba' },
      { id:'pemFisikEkstremitas', label:'Pemeriksaan Fisik - Ekstremitas', type:'textarea', placeholder:'Edema (-/-), akral hangat' },
      { id:'petugas', label:'Dokter Pemeriksa', type:'text', placeholder:'Nama dokter' }
    ]
  },
  'Darah Lengkap': {
    title: 'Pemeriksaan Hematologi Lengkap',
    icon: 'fa-tint',
    fields: [
      { id:'hemoglobin', label:'Hemoglobin (g/dL)', type:'number', step:'0.1', placeholder:'14.0', ref:'P: 13-17, W: 12-15' },
      { id:'leukosit', label:'Leukosit (/uL)', type:'number', placeholder:'7500', ref:'Normal: 4000-11000' },
      { id:'trombosit', label:'Trombosit (/uL)', type:'number', placeholder:'250000', ref:'Normal: 150000-400000' },
      { id:'hematokrit', label:'Hematokrit (%)', type:'number', step:'0.1', placeholder:'42', ref:'P: 40-54, W: 36-47' },
      { id:'eritrosit', label:'Eritrosit (juta/uL)', type:'number', step:'0.01', placeholder:'4.8', ref:'P: 4.5-5.5, W: 4.0-5.0' },
      { id:'mcv', label:'MCV (fL)', type:'number', step:'0.1', placeholder:'85', ref:'Normal: 80-100' },
      { id:'mch', label:'MCH (pg)', type:'number', step:'0.1', placeholder:'28', ref:'Normal: 27-31' },
      { id:'mchc', label:'MCHC (g/dL)', type:'number', step:'0.1', placeholder:'33', ref:'Normal: 32-36' },
      { id:'led', label:'LED (mm/jam)', type:'number', placeholder:'10', ref:'P: 0-15, W: 0-20' },
      { id:'diffCount', label:'Hitung Jenis (Basofil/Eosinofil/Batang/Segmen/Limfosit/Monosit)', type:'text', placeholder:'0/2/3/60/30/5' },
      { id:'petugas', label:'Analis Laboratorium', type:'text', placeholder:'Nama analis' }
    ]
  },
  'Urine Lengkap': {
    title: 'Pemeriksaan Urinalisis',
    icon: 'fa-flask',
    fields: [
      { id:'warna', label:'Warna', type:'select', options:['Kuning Jernih','Kuning','Kuning Pekat','Merah','Keruh'] },
      { id:'ph', label:'pH', type:'number', step:'0.1', placeholder:'6.0', ref:'Normal: 4.5-8.0' },
      { id:'bj', label:'Berat Jenis', type:'number', step:'0.001', placeholder:'1.015', ref:'Normal: 1.005-1.030' },
      { id:'protein', label:'Protein', type:'select', options:['Negatif','Trace','+1','+2','+3'] },
      { id:'glukosa', label:'Glukosa', type:'select', options:['Negatif','Trace','+1','+2','+3','+4'] },
      { id:'bilirubin', label:'Bilirubin', type:'select', options:['Negatif','+1','+2','+3'] },
      { id:'urobilinogen', label:'Urobilinogen', type:'select', options:['Normal','Meningkat'] },
      { id:'keton', label:'Keton', type:'select', options:['Negatif','Trace','+1','+2','+3'] },
      { id:'darah', label:'Darah/Hb', type:'select', options:['Negatif','Trace','+1','+2','+3'] },
      { id:'leukositUrine', label:'Leukosit (/LPB)', type:'text', placeholder:'0-5' },
      { id:'eritrositUrine', label:'Eritrosit (/LPB)', type:'text', placeholder:'0-2' },
      { id:'epitel', label:'Epitel', type:'select', options:['Negatif','+','++','+++'] },
      { id:'bakteri', label:'Bakteri', type:'select', options:['Negatif','+','++','+++'] },
      { id:'petugas', label:'Analis', type:'text', placeholder:'Nama analis' }
    ]
  },
  'Gula Darah Puasa': {
    title: 'Pemeriksaan Gula Darah',
    icon: 'fa-candy-cane',
    fields: [
      { id:'gdp', label:'Gula Darah Puasa (mg/dL)', type:'number', placeholder:'95', ref:'Normal: 70-100, Pre-DM: 100-125, DM: >126' },
      { id:'gd2jpp', label:'Gula Darah 2 Jam PP (mg/dL)', type:'number', placeholder:'120', ref:'Normal: <140, Pre-DM: 140-199, DM: >200' },
      { id:'hba1c', label:'HbA1c (%)', type:'number', step:'0.1', placeholder:'5.5', ref:'Normal: <5.7, Pre-DM: 5.7-6.4, DM: >6.5' },
      { id:'petugas', label:'Analis', type:'text', placeholder:'Nama analis' }
    ]
  },
  'SGOT': { title:'SGOT', icon:'fa-liver', fields:[
    { id:'sgot', label:'SGOT/AST (U/L)', type:'number', placeholder:'25', ref:'Normal: <35 U/L' },
    { id:'petugas', label:'Analis', type:'text' }
  ]},
  'SGPT': { title:'SGPT', icon:'fa-liver', fields:[
    { id:'sgpt', label:'SGPT/ALT (U/L)', type:'number', placeholder:'28', ref:'Normal: <40 U/L' },
    { id:'petugas', label:'Analis', type:'text' }
  ]},
  'Ureum': { title:'Ureum', icon:'fa-kidneys', fields:[
    { id:'ureum', label:'Ureum (mg/dL)', type:'number', placeholder:'25', ref:'Normal: 15-40 mg/dL' },
    { id:'petugas', label:'Analis', type:'text' }
  ]},
  'Kreatinin': { title:'Kreatinin', icon:'fa-kidneys', fields:[
    { id:'kreatinin', label:'Kreatinin (mg/dL)', type:'number', step:'0.1', placeholder:'0.9', ref:'P: 0.7-1.3, W: 0.6-1.1' },
    { id:'petugas', label:'Analis', type:'text' }
  ]},
  'Kolesterol Total': { title:'Profil Lipid', icon:'fa-heart', fields:[
    { id:'kolTotal', label:'Kolesterol Total (mg/dL)', type:'number', placeholder:'180', ref:'Normal: <200, Borderline: 200-239, Tinggi: >240' },
    { id:'kolHDL', label:'HDL (mg/dL)', type:'number', placeholder:'50', ref:'P: >40, W: >50' },
    { id:'kolLDL', label:'LDL (mg/dL)', type:'number', placeholder:'100', ref:'Optimal: <100, Normal: 100-129' },
    { id:'trigliserida', label:'Trigliserida (mg/dL)', type:'number', placeholder:'120', ref:'Normal: <150' },
    { id:'petugas', label:'Analis', type:'text' }
  ]},
  'Asam Urat': { title:'Asam Urat', icon:'fa-bone', fields:[
    { id:'asamUrat', label:'Asam Urat (mg/dL)', type:'number', step:'0.1', placeholder:'5.5', ref:'P: 3.4-7.0, W: 2.4-5.7' },
    { id:'petugas', label:'Analis', type:'text' }
  ]},
  'Thorax AP/PA': { title:'Rontgen Thorax', icon:'fa-x-ray', fields:[
    { id:'cor', label:'Cor (Jantung)', type:'textarea', placeholder:'CTR <50%, bentuk dan ukuran normal' },
    { id:'pulmo', label:'Pulmo (Paru)', type:'textarea', placeholder:'Corakan bronkovaskular normal, tidak tampak infiltrat' },
    { id:'sinus', label:'Sinus Costophrenicus', type:'select', options:['Tajam','Tumpul Kanan','Tumpul Kiri','Tumpul Bilateral'] },
    { id:'tulang', label:'Tulang-tulang', type:'textarea', placeholder:'Intak, tidak tampak fraktur' },
    { id:'kesan', label:'Kesan', type:'textarea', placeholder:'Cor dan pulmo dalam batas normal' },
    { id:'petugas', label:'Radiolog', type:'text', placeholder:'dr. Radiolog' }
  ]},
  'EKG': { title:'Elektrokardiografi', icon:'fa-heartbeat', fields:[
    { id:'irama', label:'Irama', type:'select', options:['Sinus Rhythm','Sinus Tachycardia','Sinus Bradycardia','Atrial Fibrillation','Atrial Flutter','VT','SVT','AV Block'] },
    { id:'hr', label:'Heart Rate (bpm)', type:'number', placeholder:'72', ref:'Normal: 60-100' },
    { id:'axis', label:'Axis', type:'select', options:['Normal','LAD (Left Axis Deviation)','RAD (Right Axis Deviation)'] },
    { id:'gelP', label:'Gelombang P', type:'text', placeholder:'Normal' },
    { id:'prInterval', label:'PR Interval', type:'text', placeholder:'0.12-0.20 detik' },
    { id:'qrs', label:'QRS Complex', type:'text', placeholder:'<0.12 detik, normal' },
    { id:'stSegment', label:'ST Segment', type:'select', options:['Isoelektrik (Normal)','ST Elevasi','ST Depresi'] },
    { id:'gelT', label:'Gelombang T', type:'text', placeholder:'Normal/Inverted' },
    { id:'kesan', label:'Kesan', type:'textarea', placeholder:'Sinus rhythm, dalam batas normal' },
    { id:'petugas', label:'Petugas', type:'text' }
  ]},
  'USG Abdomen': { title:'USG Abdomen', icon:'fa-wave-square', fields:[
    { id:'hepar', label:'Hepar', type:'textarea', placeholder:'Ukuran normal, parenkim homogen, tidak tampak nodul/massa' },
    { id:'vesicaFelea', label:'Vesica Felea (Kandung Empedu)', type:'textarea', placeholder:'Dinding tidak menebal, tidak tampak batu' },
    { id:'pankreas', label:'Pankreas', type:'textarea', placeholder:'Ukuran normal, tidak tampak massa' },
    { id:'lien', label:'Lien (Limpa)', type:'textarea', placeholder:'Ukuran normal, parenkim homogen' },
    { id:'renDextra', label:'Ren Dextra (Ginjal Kanan)', type:'textarea', placeholder:'Ukuran normal, tidak tampak batu/hidronefrosis' },
    { id:'renSinistra', label:'Ren Sinistra (Ginjal Kiri)', type:'textarea', placeholder:'Ukuran normal, tidak tampak batu/hidronefrosis' },
    { id:'vesicaUrinaria', label:'Vesica Urinaria (Kandung Kemih)', type:'textarea', placeholder:'Dinding tidak menebal, tidak tampak batu' },
    { id:'kesan', label:'Kesan', type:'textarea', placeholder:'Organ-organ abdomen dalam batas normal' },
    { id:'petugas', label:'Dokter Radiologi', type:'text' }
  ]},
  'Treadmill': { title:'Treadmill Test (Uji Latih Jantung)', icon:'fa-running', fields:[
    { id:'protokol', label:'Protokol', type:'select', options:['Bruce','Modified Bruce','Naughton'] },
    { id:'durasi', label:'Durasi (menit)', type:'number', placeholder:'9' },
    { id:'mets', label:'METs Achieved', type:'number', step:'0.1', placeholder:'10' },
    { id:'hrMax', label:'HR Maksimal (bpm)', type:'number', placeholder:'165' },
    { id:'hrTarget', label:'% Target HR', type:'number', placeholder:'85' },
    { id:'tdLatihan', label:'TD saat Latihan', type:'text', placeholder:'160/90 mmHg' },
    { id:'respons', label:'Respons', type:'select', options:['Normal','Abnormal - ST Depresi','Abnormal - Aritmia','Inkonklusif'] },
    { id:'kesan', label:'Kesan', type:'textarea', placeholder:'Tes latih jantung normal / abnormal' },
    { id:'petugas', label:'Dokter', type:'text' }
  ]},
  'Visus Mata': { title:'Pemeriksaan Mata', icon:'fa-eye', fields:[
    { id:'visusKanan', label:'Visus Mata Kanan (OD)', type:'text', placeholder:'6/6' },
    { id:'visusKiri', label:'Visus Mata Kiri (OS)', type:'text', placeholder:'6/6' },
    { id:'koreksi', label:'Koreksi (jika pakai kacamata)', type:'text', placeholder:'OD: S-1.00, OS: S-0.75' },
    { id:'butaWarna', label:'Buta Warna', type:'select', options:['Normal (Tidak Buta Warna)','Buta Warna Parsial','Buta Warna Total'] },
    { id:'tonometri', label:'Tekanan Intraokuler (mmHg)', type:'text', placeholder:'OD: 15, OS: 14 (Normal: 10-21)' },
    { id:'funduskopi', label:'Funduskopi', type:'textarea', placeholder:'Papil bulat, batas tegas, CDR 0.3' },
    { id:'petugas', label:'Dokter Mata / Refraksionis', type:'text' }
  ]},
  'Audiometri': { title:'Pemeriksaan Pendengaran', icon:'fa-deaf', fields:[
    { id:'telingaKanan', label:'Telinga Kanan (dB)', type:'text', placeholder:'Normal (<25 dB)' },
    { id:'telingaKiri', label:'Telinga Kiri (dB)', type:'text', placeholder:'Normal (<25 dB)' },
    { id:'kesan', label:'Kesan', type:'select', options:['Normal','Tuli Konduktif Ringan','Tuli Sensorineural Ringan','Tuli Campuran'] },
    { id:'petugas', label:'Petugas', type:'text' }
  ]},
  'HBsAg': { title:'Hepatitis B Surface Antigen', icon:'fa-virus', fields:[
    { id:'hasil', label:'HBsAg', type:'select', options:['Non-Reaktif (Negatif)','Reaktif (Positif)'] },
    { id:'petugas', label:'Analis', type:'text' }
  ]},
  'Anti HBs': { title:'Anti HBs (Antibodi Hepatitis B)', icon:'fa-shield-virus', fields:[
    { id:'hasil', label:'Anti HBs (mIU/mL)', type:'number', placeholder:'100', ref:'Protektif: >10 mIU/mL' },
    { id:'interpretasi', label:'Interpretasi', type:'select', options:['Protektif (>10)','Tidak Protektif (<10)'] },
    { id:'petugas', label:'Analis', type:'text' }
  ]}
};

// Generate form HTML dari config
function generatePemForm(unit) {
  const config = PEM_FORMS[unit];
  if (!config) {
    return `<div class="fg"><div class="fi"><label>Hasil ${unit}</label><textarea id="pf_hasil" rows="3" placeholder="Masukkan hasil pemeriksaan"></textarea></div><div class="fi"><label>Catatan</label><textarea id="pf_catatan" rows="2"></textarea></div><div class="fi"><label>Petugas</label><input type="text" id="pf_petugas"></div></div>`;
  }
  let html = `<div style="margin-bottom:16px;padding:12px 16px;background:var(--bg);border-radius:var(--rs);display:flex;align-items:center;gap:12px"><i class="fas ${config.icon}" style="font-size:20px;color:var(--p1)"></i><div><strong style="font-size:14px">${config.title}</strong></div></div>`;
  html += '<div class="fg">';
  config.fields.forEach(f => {
    html += `<div class="fi"><label>${f.label}</label>`;
    if (f.type === 'textarea') {
      html += `<textarea id="pf_${f.id}" rows="2" placeholder="${f.placeholder||''}">${f.value||''}</textarea>`;
    } else if (f.type === 'select') {
      html += `<select id="pf_${f.id}">${(f.options||[]).map(o=>`<option>${o}</option>`).join('')}</select>`;
    } else {
      html += `<input type="${f.type}" id="pf_${f.id}" placeholder="${f.placeholder||''}" ${f.step?'step="'+f.step+'"':''} ${f.readonly?'readonly':''}>`;
    }
    if (f.ref) html += `<small style="color:var(--text-muted);font-size:10px;margin-top:4px;display:block">${f.ref}</small>`;
    html += '</div>';
  });
  html += '</div>';
  return html;
}

// Collect form data
function collectPemData(unit) {
  const config = PEM_FORMS[unit];
  const data = {};
  if (!config) {
    data.hasil = gv('pf_hasil');
    data.catatan = gv('pf_catatan');
    return { data, petugas: gv('pf_petugas') };
  }
  let hasilParts = [];
  let petugas = '';
  config.fields.forEach(f => {
    const val = gv('pf_' + f.id);
    if (val) data[f.id] = val;
    if (f.id === 'petugas') petugas = val;
    else if (val && f.label && !f.id.startsWith('pem')) hasilParts.push(f.label.split('(')[0].trim() + ': ' + val);
  });
  data.hasil = hasilParts.slice(0, 5).join(', ');
  return { data, petugas };
}

// Auto-analyze results
function analyzeResults(peserta) {
  const findings = [];
  const pem = peserta.pemeriksaan || {};

  // Check vital signs
  const konsul = pem['Konsultasi Dokter Umum MCU'];
  if (konsul && konsul.data) {
    const d = konsul.data;
    if (d.sistol && parseInt(d.sistol) > 140) findings.push({ item: 'Tekanan Darah', status: 'Abnormal', detail: `Sistol ${d.sistol} mmHg (Tinggi)` });
    if (d.diastol && parseInt(d.diastol) > 90) findings.push({ item: 'Tekanan Darah', status: 'Abnormal', detail: `Diastol ${d.diastol} mmHg (Tinggi)` });
    if (d.beratBadan && d.tinggiBadan) {
      const bmi = (parseFloat(d.beratBadan) / Math.pow(parseFloat(d.tinggiBadan)/100, 2)).toFixed(1);
      if (bmi > 25) findings.push({ item: 'BMI', status: 'Abnormal', detail: `BMI ${bmi} (Overweight/Obesitas)` });
      else if (bmi < 18.5) findings.push({ item: 'BMI', status: 'Abnormal', detail: `BMI ${bmi} (Underweight)` });
    }
  }

  // Check lab
  const gdp = pem['Gula Darah Puasa'];
  if (gdp && gdp.data && gdp.data.gdp) {
    const v = parseFloat(gdp.data.gdp);
    if (v > 126) findings.push({ item: 'Gula Darah Puasa', status: 'Abnormal', detail: `${v} mg/dL (Diabetes)` });
    else if (v > 100) findings.push({ item: 'Gula Darah Puasa', status: 'Borderline', detail: `${v} mg/dL (Pre-Diabetes)` });
  }

  const kol = pem['Kolesterol Total'];
  if (kol && kol.data && kol.data.kolTotal) {
    const v = parseFloat(kol.data.kolTotal);
    if (v > 240) findings.push({ item: 'Kolesterol Total', status: 'Abnormal', detail: `${v} mg/dL (Tinggi)` });
    else if (v > 200) findings.push({ item: 'Kolesterol Total', status: 'Borderline', detail: `${v} mg/dL (Borderline)` });
  }

  const au = pem['Asam Urat'];
  if (au && au.data && au.data.asamUrat) {
    const v = parseFloat(au.data.asamUrat);
    if (v > 7) findings.push({ item: 'Asam Urat', status: 'Abnormal', detail: `${v} mg/dL (Tinggi)` });
  }

  const sgot = pem['SGOT'];
  if (sgot && sgot.data && sgot.data.sgot) {
    if (parseFloat(sgot.data.sgot) > 35) findings.push({ item: 'SGOT', status: 'Abnormal', detail: `${sgot.data.sgot} U/L (Tinggi)` });
  }

  const sgpt = pem['SGPT'];
  if (sgpt && sgpt.data && sgpt.data.sgpt) {
    if (parseFloat(sgpt.data.sgpt) > 40) findings.push({ item: 'SGPT', status: 'Abnormal', detail: `${sgpt.data.sgpt} U/L (Tinggi)` });
  }

  // Suggestion
  const abnormal = findings.filter(f => f.status === 'Abnormal').length;
  const borderline = findings.filter(f => f.status === 'Borderline').length;
  let suggestion = 'Fit - Layak Kerja';
  if (abnormal >= 3) suggestion = 'Unfit - Tidak Layak Kerja';
  else if (abnormal >= 1 || borderline >= 2) suggestion = 'Fit dengan Catatan';

  return { findings, suggestion, abnormal, borderline };
}
