// NextGen Mobile MCU - App v3.0 (localStorage)
let D=[],curUnit='Konsultasi Dokter Umum MCU',curPemId=null,curRevId=null;
const UK={'Pemeriksaan Awal':'pemeriksaanAwal','Konsultasi Medis':'konsultasiMedis','Konsultasi Gizi':'konsultasiGizi','Laboratorium':'laboratorium','Radiologi':'radiologi','EKG':'ekg','Tes Lainnya':'tesLainnya'};
const PN_FALLBACK={'paket-1':'Paket 1 - Basic','paket-2':'Paket 2 - Standard','paket-3':'Paket 3 - Executive','paket-4':'Paket 4 - Comprehensive'};
const UL={pemeriksaanAwal:'Pemeriksaan Awal',konsultasiMedis:'Konsultasi Medis',konsultasiGizi:'Konsultasi Gizi',laboratorium:'Laboratorium',radiologi:'Radiologi',ekg:'EKG',tesLainnya:'Tes Lainnya'};
function getPN(id){const p=getAllPaket().find(x=>x.id===id);return p?p.nama:(PN_FALLBACK[id]||id);}
function getPI(id){const p=getAllPaket().find(x=>x.id===id);return p?p.items:['Pemeriksaan Awal','Konsultasi Medis','Laboratorium'];}

function fdt(iso){if(!iso)return'-';const d=new Date(iso);return d.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})+' '+d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});}
function sbg(st){if(!st)return'<span class="bg bg-g">-</span>';if(st.startsWith('Checked')||st.startsWith('Selesai'))return'<span class="bg bg-s"><i class="fas fa-check-circle"></i> '+st+'</span>';if(st==='On Progress')return'<span class="bg bg-i"><i class="fas fa-circle-notch fa-spin"></i> '+st+'</span>';if(st==='Registrasi')return'<span class="bg bg-p"><i class="fas fa-user-check"></i> '+st+'</span>';return'<span class="bg bg-g">'+st+'</span>';}
function toast(msg){const t=document.getElementById('toast');document.getElementById('toastInner').textContent=msg;t.style.display='block';setTimeout(()=>{t.style.display='none';},3500);}
function openM(id){document.getElementById(id).classList.add('show');}
function closeM(id){document.getElementById(id).classList.remove('show');}
function refreshData(){const act=document.querySelector('.nv.act');if(act)showPage(act.dataset.page);else rDash();}
function gv(id){const e=document.getElementById(id);return e?e.value:'';}
setInterval(()=>{const n=new Date();const el=document.getElementById('liveTime');if(el)el.textContent=n.toLocaleTimeString('id-ID')+' | '+n.toLocaleDateString('id-ID',{weekday:'short',day:'numeric',month:'short',year:'numeric'});},1000);

const PT={'dashboard':'Dashboard Monitoring','master':'Master Data Peserta','rs':'Master Rumah Sakit','paket':'Manajemen Paket MCU','registrasi':'Registrasi','kehadiran':'Monitoring Kehadiran','pemeriksaan':'Input Pemeriksaan','tracking':'Tracking Peserta','review':'Review Dokter','laporan':'Laporan MCU'};
function showPage(p){document.querySelectorAll('.sec').forEach(s=>s.classList.remove('act'));const sec=document.getElementById('p-'+p);if(sec)sec.classList.add('act');document.querySelectorAll('.nv').forEach(n=>n.classList.remove('act'));const nv=document.querySelector('.nv[data-page="'+p+'"]');if(nv)nv.classList.add('act');D=getAllPeserta();if(p==='dashboard')rDash();else if(p==='master')rMaster();else if(p==='rs')rRS();else if(p==='paket')rPaket();else if(p==='registrasi')rReg();else if(p==='kehadiran')rKeh();else if(p==='pemeriksaan')rPem();else if(p==='tracking')rTrack();else if(p==='review')rRev();else if(p==='laporan')rLap();}

// ===== DASHBOARD =====
function rDash(){const s=getDashStats();const pakets=getAllPaket();const rs=getAllRS();D=getAllPeserta();
  const sel=document.getElementById('dashInstitusi');if(sel)sel.innerHTML=rs.map(r=>`<option value="${r.id}">${r.nama}</option>`).join('');
  const pct=s.total>0?Math.round(((s.checked+s.selesai)/s.total)*100):0;
  document.getElementById('dashStats').innerHTML=`<div style="padding:16px;border:1.5px solid var(--border);border-radius:var(--rs)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:11px;font-weight:700;color:var(--text-muted)">TOTAL PESERTA</span><i class="fas fa-users" style="color:#1a3a6b;font-size:16px"></i></div><div style="font-size:28px;font-weight:900">${s.total}</div><div style="font-size:11px;color:var(--text-muted)">org</div></div><div style="padding:16px;border:1.5px solid var(--border);border-radius:var(--rs)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:11px;font-weight:700;color:var(--text-muted)">REGISTRASI</span><i class="fas fa-user-check" style="color:#3B82F6;font-size:16px"></i></div><div style="font-size:28px;font-weight:900;color:#3B82F6">${s.hadir}</div><div style="font-size:11px;color:var(--text-muted)">org</div></div><div style="padding:16px;border:1.5px solid var(--border);border-radius:var(--rs)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:11px;font-weight:700;color:var(--text-muted)">ON CHECK</span><i class="fas fa-heartbeat" style="color:#F59E0B;font-size:16px"></i></div><div style="font-size:28px;font-weight:900;color:#F59E0B">${s.onProgress}</div><div style="font-size:11px;color:var(--text-muted)">org</div></div><div style="padding:16px;border:1.5px solid var(--border);border-radius:var(--rs)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:11px;font-weight:700;color:var(--text-muted)">SELESAI</span><i class="fas fa-check-circle" style="color:#10B981;font-size:16px"></i></div><div style="font-size:28px;font-weight:900;color:#10B981">${s.checked+s.selesai}</div><div style="font-size:11px;color:var(--text-muted)">org</div></div><div style="padding:16px;border:1.5px solid var(--border);border-radius:var(--rs)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:11px;font-weight:700;color:var(--text-muted)">DITUNDA</span><i class="fas fa-exclamation-triangle" style="color:#F97316;font-size:16px"></i></div><div style="font-size:28px;font-weight:900;color:#F97316">${s.pending}</div><div style="font-size:11px;color:var(--text-muted)">org</div></div><div style="padding:16px;border:1.5px solid var(--border);border-radius:var(--rs)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:11px;font-weight:700;color:var(--text-muted)">PROGRESS</span><i class="fas fa-chart-line" style="color:#8B5CF6;font-size:16px"></i></div><div style="font-size:28px;font-weight:900;color:#8B5CF6">${pct}</div><div style="font-size:11px;color:var(--text-muted)">%</div></div>`;
  const now=new Date();document.getElementById('dashInfoBar').innerHTML=`<span><i class="fas fa-calendar"></i> Tgl MCU: <strong>${now.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</strong></span><span>|</span><span><i class="fas fa-hospital"></i> Institusi: <strong>${rs.length>0?rs[0].nama:'Mitra Keluarga'}</strong></span><span>|</span><span><i class="fas fa-building"></i> Perusahaan: <strong>${[...new Set(D.map(p=>p.perusahaan).filter(Boolean))].length} tergabung</strong></span><span>|</span><span><i class="fas fa-box"></i> Paket Aktif: <strong>${pakets.length} paket</strong></span><span>|</span><span><i class="fas fa-clock"></i> Diperbarui: <strong>${now.toLocaleTimeString('id-ID')}</strong></span>`;
  document.getElementById('dashStasiunCount').textContent=pakets.length+' Stasiun';
}

// ===== RUMAH SAKIT =====
function rRS(){const data=getAllRS();const pakets=getAllPaket();document.getElementById('rsTb').innerHTML=data.map(r=>{const cnt=pakets.filter(p=>p.rsId===r.id).length;return`<tr><td><strong>${r.nama}</strong></td><td>${r.alamat||'-'}</td><td>${r.telepon||'-'}</td><td><span class="bg bg-p">${cnt} paket</span></td><td><button class="btn btn-o btn-sm" onclick="editRS('${r.id}')"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delRSx('${r.id}')"><i class="fas fa-trash"></i></button></td></tr>`;}).join('')||'<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--text-muted)">Belum ada RS</td></tr>';}
function showAddRS(){document.getElementById('mRSTitle').textContent='Tambah Rumah Sakit';document.getElementById('frsId').value='';document.getElementById('frsNama').value='';document.getElementById('frsAlamat').value='';document.getElementById('frsTelp').value='';openM('mRS');}
function editRS(id){const r=getAllRS().find(x=>x.id===id);if(!r)return;document.getElementById('mRSTitle').textContent='Edit RS';document.getElementById('frsId').value=r.id;document.getElementById('frsNama').value=r.nama;document.getElementById('frsAlamat').value=r.alamat||'';document.getElementById('frsTelp').value=r.telepon||'';openM('mRS');}
function saveRS(){const nama=gv('frsNama').trim();if(!nama)return toast('Nama RS wajib');const id=gv('frsId');if(id){updateRS({id,nama,alamat:gv('frsAlamat'),telepon:gv('frsTelp')});toast('RS diupdate');}else{addRS({nama,alamat:gv('frsAlamat'),telepon:gv('frsTelp')});toast('RS ditambahkan');}closeM('mRS');rRS();}
function delRSx(id){if(!confirm('Hapus RS ini?'))return;deleteRS(id);toast('RS dihapus');rRS();}

// ===== PAKET MCU =====
let paketItems=[];
function rPaket(){const data=getAllPaket();const rsList=getAllRS();document.getElementById('paketList').innerHTML=data.length?data.map(p=>{const rs=rsList.find(r=>r.id===p.rsId);return`<div class="tk" style="flex-direction:column;align-items:stretch;padding:20px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><div><h4 style="font-size:15px;margin-bottom:4px">${p.nama}</h4><p style="font-size:12px;color:var(--text-muted)">${rs?'<i class="fas fa-hospital"></i> '+rs.nama+' | ':''}${p.keterangan||''}</p></div><div style="display:flex;gap:8px">${p.harga?`<span class="bg bg-p">Rp ${Number(p.harga).toLocaleString('id-ID')}</span>`:''}<button class="btn btn-o btn-sm" onclick="editPaketx('${p.id}')"><i class="fas fa-edit"></i></button><button class="btn btn-d btn-sm" onclick="delPaketx('${p.id}')"><i class="fas fa-trash"></i></button></div></div><div style="display:flex;flex-wrap:wrap;gap:6px">${p.items.map(it=>`<span style="padding:5px 12px;background:var(--bg);border-radius:20px;font-size:11px;font-weight:600;color:var(--text-light)">${it}</span>`).join('')}</div></div>`;}).join(''):'<div class="es"><i class="fas fa-box-open"></i><h3>Belum ada paket</h3></div>';}
function showAddPaket(){document.getElementById('mPaketTitle').textContent='Tambah Paket MCU';document.getElementById('fpId').value='';document.getElementById('fpNama').value='';document.getElementById('fpHarga').value='';document.getElementById('fpKet').value='';loadRSOpts('fpRS','');paketItems=['Pemeriksaan Awal','Konsultasi Medis','Laboratorium'];renderPI();openM('mPaket');}
function editPaketx(id){const p=getAllPaket().find(x=>x.id===id);if(!p)return;document.getElementById('mPaketTitle').textContent='Edit Paket';document.getElementById('fpId').value=p.id;document.getElementById('fpNama').value=p.nama;document.getElementById('fpHarga').value=p.harga||'';document.getElementById('fpKet').value=p.keterangan||'';loadRSOpts('fpRS',p.rsId||'');paketItems=[...p.items];renderPI();openM('mPaket');}
function renderPI(){document.getElementById('fpItems').innerHTML=paketItems.map((it,i)=>`<span style="padding:6px 12px;background:linear-gradient(135deg,rgba(26,58,107,.08),rgba(13,45,90,.08));border:1px solid rgba(26,58,107,.2);border-radius:20px;font-size:12px;font-weight:600;color:var(--p1);display:inline-flex;align-items:center;gap:6px">${it}<button onclick="paketItems.splice(${i},1);renderPI();" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:11px"><i class="fas fa-times"></i></button></span>`).join('');}
function addPaketItem(){const v=document.getElementById('fpNewItem').value.trim();if(!v)return;if(paketItems.includes(v))return toast('Sudah ada');paketItems.push(v);document.getElementById('fpNewItem').value='';renderPI();}
function savePaket(){const nama=gv('fpNama').trim();if(!nama)return toast('Nama paket wajib');if(!paketItems.length)return toast('Min 1 item');const id=gv('fpId');const obj={nama,items:paketItems,harga:gv('fpHarga'),keterangan:gv('fpKet'),rsId:gv('fpRS')};if(id){obj.id=id;updatePaket(obj);toast('Paket diupdate');}else{addPaket(obj);toast('Paket ditambahkan');}closeM('mPaket');rPaket();}
function delPaketx(id){if(!confirm('Hapus paket?'))return;deletePaket(id);toast('Dihapus');rPaket();}
function loadRSOpts(selId,val){const rs=getAllRS();const sel=document.getElementById(selId);if(sel){sel.innerHTML='<option value="">-- Semua RS --</option>'+rs.map(r=>`<option value="${r.id}"${r.id===val?' selected':''}>${r.nama}</option>`).join('');}}
function rReg(){D=getAllPeserta();loadRSOpts('rRS','');filterPaketByRS();regModeBaru();rRegToday();}
function rMaster(){D=getAllPeserta();renderUsers();}
function rPT(data){const tb=document.getElementById('pesertaTb');const em=document.getElementById('emptyP');document.getElementById('totalPC').textContent=data.length+' Peserta Terdaftar';if(!data.length){tb.innerHTML='';em.style.display='block';return;}em.style.display='none';tb.innerHTML=data.map((p,i)=>{const initial=p.nama?p.nama.charAt(0).toUpperCase():'?';const colors=['#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#06B6D4'];const color=colors[i%colors.length];const gender=p.jenisKelamin==='Perempuan'?'PEREMPUAN':'LAKI-LAKI';const tglLahir=p.tanggalLahir?new Date(p.tanggalLahir).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}):'-';return`<tr><td><div style="display:flex;align-items:center;gap:10px"><div style="width:34px;height:34px;border-radius:50%;background:${color}20;color:${color};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">${initial}</div><div><div style="font-weight:700;font-size:13px">${p.nama}</div><div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.3px">${gender}</div></div></div></td><td><span style="font-family:monospace;font-size:12px;color:var(--g1);font-weight:600">${p.id}</span></td><td style="font-size:12px">${tglLahir}</td><td><div style="font-size:11px;color:var(--text-muted)">TELP 1</div><div style="font-size:12px">${p.telepon||'-'}</div></td><td style="font-size:12px;color:var(--text-light)">${p.alamat||'-'}</td><td><span style="padding:4px 10px;border-radius:20px;font-size:10px;font-weight:700;background:rgba(5,150,105,.1);color:#059669">● AKTIF</span></td><td><button class="btn btn-o btn-sm" onclick="showDet('${p.id}')"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delPx('${p.id}')"><i class="fas fa-trash"></i></button></td></tr>`}).join('');}
function srcP(){const q=document.getElementById('srcPeserta').value.toLowerCase();rPT(D.filter(p=>p.nama.toLowerCase().includes(q)||p.nik.includes(q)||(p.perusahaan||'').toLowerCase().includes(q)));}
function showAddM(){['fNama','fNIK','fTgl','fJK','fAlm','fTlp','fEm','fPer','fJab','fDep'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});document.getElementById('fJenis').value='Perusahaan';const pakets=getAllPaket();document.getElementById('fPak').innerHTML=pakets.map(p=>`<option value="${p.id}">${p.nama}</option>`).join('');openM('mAdd');}
function saveP(){const n=gv('fNama').trim(),k=gv('fNIK').trim();if(!n||!k)return toast('Nama dan NIK wajib');const r=addPeserta({nama:n,nik:k,tanggalLahir:gv('fTgl'),jenisKelamin:gv('fJK'),alamat:gv('fAlm'),telepon:gv('fTlp'),email:gv('fEm'),perusahaan:gv('fPer'),jabatan:gv('fJab'),departemen:gv('fDep'),paketMCU:gv('fPak'),jenisMCU:gv('fJenis')});toast('Peserta ditambahkan: '+r.nama);closeM('mAdd');rMaster();}
function delPx(id){if(!confirm('Hapus?'))return;deletePeserta(id);toast('Dihapus');rMaster();}

// Excel upload
let pendingImport=[];
function handleFileUpload(e){const f=e.target.files[0];if(!f)return;const ext=f.name.split('.').pop().toLowerCase();if(ext==='csv'){const reader=new FileReader();reader.onload=ev=>parseCSV(ev.target.result);reader.readAsText(f);}else{const reader=new FileReader();reader.onload=ev=>{try{const wb=XLSX.read(ev.target.result,{type:'array'});const ws=wb.Sheets[wb.SheetNames[0]];parseExcelJSON(XLSX.utils.sheet_to_json(ws,{defval:''}));}catch(err){toast('Error: '+err.message);}};reader.readAsArrayBuffer(f);}}
function parseCSV(text){const lines=text.split('\n').filter(l=>l.trim());if(lines.length<2)return toast('File kosong');const headers=lines[0].split(',').map(h=>h.trim().toLowerCase());const data=[];for(let i=1;i<lines.length;i++){const vals=lines[i].split(',').map(v=>v.trim());const obj={};headers.forEach((h,idx)=>{if(h.includes('nama'))obj.nama=vals[idx];else if(h.includes('nik'))obj.nik=vals[idx];else if(h.includes('perusahaan'))obj.perusahaan=vals[idx];else if(h.includes('paket'))obj.paketMCU=vals[idx]||'paket-1';});if(obj.nama&&obj.nik)data.push(obj);}showPreview(data);}
function parseExcelJSON(json){const data=[];json.forEach(row=>{const obj={};Object.entries(row).forEach(([k,v])=>{const kl=k.toLowerCase();if(kl.includes('nama'))obj.nama=String(v);else if(kl.includes('nik'))obj.nik=String(v);else if(kl.includes('perusahaan'))obj.perusahaan=String(v);else if(kl.includes('paket'))obj.paketMCU=String(v)||'paket-1';});if(obj.nama&&obj.nik)data.push(obj);});showPreview(data);}
function showPreview(data){if(!data.length)return toast('Tidak ada data valid');pendingImport=data;document.getElementById('previewArea').style.display='block';document.getElementById('importResult').style.display='none';document.getElementById('previewCount').textContent=data.length+' data';document.getElementById('previewTb').innerHTML=data.map(p=>`<tr><td>${p.nama}</td><td>${p.nik}</td><td>${p.perusahaan||'-'}</td><td>${p.paketMCU||'paket-1'}</td><td><span class="bg bg-i">Siap</span></td></tr>`).join('');}
function cancelImport(){pendingImport=[];document.getElementById('previewArea').style.display='none';}
function confirmImport(){if(!pendingImport.length)return;const r=addPesertaBulk(pendingImport);document.getElementById('previewArea').style.display='none';document.getElementById('importResult').style.display='block';document.getElementById('importMsg').textContent='Import Berhasil';document.getElementById('importDetail').textContent=r.added+' ditambahkan, '+r.skipped+' dilewati (duplikat)';pendingImport=[];rMaster();}
function dlTemplate(){if(typeof XLSX!=='undefined'){const ws=XLSX.utils.aoa_to_sheet([['nama','nik','perusahaan','paketMCU'],['Budi Santoso','3201234567890001','PT Mitra','paket-2']]);const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Template');XLSX.writeFile(wb,'template-mcu.xlsx');}else{const csv='nama,nik,perusahaan,paketMCU\nBudi,320123,PT X,paket-1';const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='template.csv';a.click();}}

// ===== REGISTRASI =====
let regFoto=null,camStream=null;
function rReg(){D=getAllPeserta();const rs=getAllRS();document.getElementById('regInstitusi').innerHTML='<option value="">Semua RS</option>'+rs.map(r=>`<option value="${r.id}">${r.nama}</option>`).join('');const h=D.filter(p=>p.statusKehadiran==='Hadir').length;document.getElementById('regStatTotal').textContent=D.length;document.getElementById('regStatDone').textContent=h;document.getElementById('regStatPending').textContent=D.length-h;filterReg();}
function filterReg(){const q=(gv('regSearch')||'').toLowerCase();const pid=(gv('regPatientId')||'').toLowerCase();const inst=gv('regInstitusi');let data=D;if(q)data=data.filter(p=>p.nama.toLowerCase().includes(q)||p.nik.includes(q)||(p.perusahaan||'').toLowerCase().includes(q));if(pid)data=data.filter(p=>p.id.toLowerCase().includes(pid));document.getElementById('regTb').innerHTML=data.map(p=>{const stColor=p.statusKehadiran==='Hadir'?'#36B37E':'#FF8B00';const stText=p.statusKehadiran==='Hadir'?'Sudah Registrasi':'Belum Registrasi';return`<tr style="cursor:pointer" onclick="openRegForm('${p.id}')"><td><strong style="color:#1a3a6b">${p.id}</strong></td><td><div style="font-weight:600">${p.nama}</div><div style="font-size:11px;color:var(--text-muted)">${p.jenisKelamin||'-'} &bull; ${p.tanggalLahir||'-'}</div></td><td>${p.perusahaan?'<i class="fas fa-building" style="color:var(--text-muted);margin-right:4px"></i>'+p.perusahaan:'-'}</td><td>${getPN(p.paketMCU)}</td><td><span style="color:${stColor};font-weight:700;font-size:12px">${stText}</span></td></tr>`;}).join('');}
function openRegForm(id){const p=D.find(x=>x.id===id);if(!p)return;if(p.statusKehadiran==='Hadir'){toast(p.nama+' sudah registrasi');return;}if(confirm('Registrasi '+p.nama+'?')){registrasiPeserta(id,'');D=getAllPeserta();rReg();toast('Registrasi berhasil: '+p.nama);}}
function regModeBaru(){document.getElementById('btnRegBaru').className='btn btn-p btn-sm';document.getElementById('btnRegExist').className='btn btn-o btn-sm';document.getElementById('regSearchExist').style.display='none';document.getElementById('rExistId').value='';clearRegForm();}
function regModeExist(){document.getElementById('btnRegBaru').className='btn btn-o btn-sm';document.getElementById('btnRegExist').className='btn btn-p btn-sm';document.getElementById('regSearchExist').style.display='block';srcRegExist2();}
function clearRegForm(){['rNama','rNIK','rTgl','rTlp','rPer'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});document.getElementById('rJK').value='';document.getElementById('rJenis').value='Perusahaan';document.getElementById('rPerDiv').style.display='';regFoto=null;document.getElementById('regFotoPreview').innerHTML='<i class="fas fa-user" style="font-size:48px;color:var(--text-muted)"></i>';}
function togglePerusahaan(){document.getElementById('rPerDiv').style.display=gv('rJenis')==='Mandiri'?'none':'';}
function filterPaketByRS(){const rsId=gv('rRS');let pakets=getAllPaket();if(rsId){const filtered=pakets.filter(p=>p.rsId===rsId);if(filtered.length)pakets=filtered;}document.getElementById('rPak').innerHTML=pakets.map(p=>`<option value="${p.id}">${p.nama} - Rp ${Number(p.harga||0).toLocaleString('id-ID')}</option>`).join('');}
function srcRegExist2(){const q=(gv('srcRegExist')||'').toLowerCase();const data=D.filter(p=>p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)).slice(0,10);document.getElementById('regExistTb').innerHTML=data.map(p=>`<tr><td><strong style="color:var(--p1)">${p.id}</strong></td><td>${p.nama}</td><td>${p.perusahaan||'-'}</td><td><button class="btn btn-p btn-sm" onclick="fillFromExist('${p.id}')"><i class="fas fa-check"></i></button></td></tr>`).join('');}
function fillFromExist(id){const p=D.find(x=>x.id===id);if(!p)return;document.getElementById('rExistId').value=p.id;document.getElementById('rNama').value=p.nama;document.getElementById('rNIK').value=p.nik;document.getElementById('rTlp').value=p.telepon||'';document.getElementById('rPer').value=p.perusahaan||'';document.getElementById('rJenis').value=p.jenisMCU||'Perusahaan';togglePerusahaan();toast('Data dimuat: '+p.nama);}
function openRegCamera(){openM('mCamera');document.getElementById('camName').textContent=gv('rNama')||'Peserta';document.getElementById('camPreview').style.display='none';document.getElementById('btnRetake').style.display='none';document.getElementById('btnConfirmPhoto').style.display='none';document.getElementById('camVideo').style.display='block';if(!navigator.mediaDevices){toast('Kamera tidak tersedia');closeM('mCamera');return;}navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:640},height:{ideal:480}}}).then(s=>{camStream=s;document.getElementById('camVideo').srcObject=s;}).catch(e=>{toast('Gagal: '+e.message);closeM('mCamera');});}
function capturePhoto(){const v=document.getElementById('camVideo'),c=document.getElementById('camCanvas');c.width=v.videoWidth||640;c.height=v.videoHeight||480;c.getContext('2d').drawImage(v,0,0);regFoto=c.toDataURL('image/jpeg',0.8);document.getElementById('camImg').src=regFoto;document.getElementById('camPreview').style.display='block';document.getElementById('camVideo').style.display='none';document.getElementById('btnRetake').style.display='inline-flex';document.getElementById('btnConfirmPhoto').style.display='inline-flex';}
function retakePhoto(){regFoto=null;document.getElementById('camPreview').style.display='none';document.getElementById('camVideo').style.display='block';document.getElementById('btnRetake').style.display='none';document.getElementById('btnConfirmPhoto').style.display='none';}
function confirmPhoto(){if(camStream){camStream.getTracks().forEach(t=>t.stop());camStream=null;}closeM('mCamera');document.getElementById('regFotoPreview').innerHTML=`<img src="${regFoto}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r)">`;}
function closeCam(){if(camStream){camStream.getTracks().forEach(t=>t.stop());camStream=null;}closeM('mCamera');}
function handleRegFoto(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{regFoto=ev.target.result;document.getElementById('regFotoPreview').innerHTML=`<img src="${regFoto}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r)">`;};r.readAsDataURL(f);}
function simpanRegistrasi(){const nama=gv('rNama').trim(),nik=gv('rNIK').trim();if(!nama||!nik)return toast('Nama dan NIK wajib');const existId=gv('rExistId');let peserta;if(existId){registrasiPeserta(existId,regFoto);peserta=getAllPeserta().find(p=>p.id===existId);}else{
  // Cek duplikat NIK
  const existing=getAllPeserta().find(p=>p.nik===nik);
  if(existing){toast('NIK sudah terdaftar. Gunakan "Dari Master Data".');return;}
  peserta=addPeserta({nama,nik,tanggalLahir:gv('rTgl'),jenisKelamin:gv('rJK'),telepon:gv('rTlp'),perusahaan:gv('rJenis')==='Mandiri'?'':gv('rPer'),paketMCU:gv('rPak')||'paket-1',jenisMCU:gv('rJenis'),foto:regFoto||''});registrasiPeserta(peserta.id,regFoto);}
  const pid=existId||peserta.id;const pNama=peserta?peserta.nama:nama;const pFoto=regFoto||peserta.foto||'';
  // Generate QR
  if(typeof QRCode!=='undefined'&&QRCode.toDataURL){
    QRCode.toDataURL(pid,{width:200,margin:2},function(err,url){showRegResult(pid,pNama,pFoto,url||'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(pid));});
  }else{showRegResult(pid,pNama,pFoto,'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(pid));}
  clearRegForm();D=getAllPeserta();rRegToday();toast('Registrasi berhasil');}
function showRegResult(pid,nama,foto,qrImg){
  document.getElementById('regQRResult').style.display='block';
  document.getElementById('regQRBody').innerHTML=`<div style="display:flex;align-items:center;gap:24px;justify-content:center;flex-wrap:wrap"><div>${foto?`<img src="${foto}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid var(--success)">`:'<div style="width:120px;height:120px;border-radius:50%;background:var(--bg);display:flex;align-items:center;justify-content:center"><i class="fas fa-user" style="font-size:40px;color:var(--text-muted)"></i></div>'}</div><div style="text-align:left"><h3>${nama}</h3><p style="color:var(--text-muted);font-size:13px">ID: ${pid}</p><div class="bg bg-s" style="margin-top:8px"><i class="fas fa-check-circle"></i> REGISTRASI</div></div><div>${qrImg?`<img src="${qrImg}" style="width:160px;height:160px" id="qrImgResult">`:'<p style="color:var(--text-muted)">QR tidak tersedia</p>'}</div></div>`;
}
function printQR(){const body=document.getElementById('regQRBody');if(!body)return;const w=window.open('','_blank');w.document.write(`<html><head><title>QR Code Peserta</title><style>body{font-family:Arial,sans-serif;padding:40px;text-align:center}img{max-width:100%}.container{display:flex;align-items:center;gap:24px;justify-content:center;flex-wrap:wrap}h3{margin:0}p{color:#666;font-size:13px;margin:4px 0}.badge{background:#E3FCEF;color:#00C853;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;display:inline-block;margin-top:8px}</style></head><body>${body.innerHTML}</body></html>`);w.document.close();setTimeout(()=>w.print(),500);}
function rRegToday(){const today=new Date().toISOString().split('T')[0];const done=D.filter(p=>p.waktuRegistrasi&&p.waktuRegistrasi.startsWith(today));document.getElementById('regTodayCount').textContent=done.length+' hari ini';document.getElementById('regTodayTb').innerHTML=done.map(p=>`<tr><td><strong style="color:var(--p1)">${p.id}</strong></td><td>${p.nama}</td><td><span class="bg ${p.jenisMCU==='Mandiri'?'bg-w':'bg-i'}">${p.jenisMCU||'-'}</span></td><td>${p.foto?`<img src="${p.foto}" style="width:32px;height:32px;border-radius:50%;object-fit:cover">`:'<span class="bg bg-g">-</span>'}</td><td><span id="qrt-${p.id}"></span></td><td>${fdt(p.waktuRegistrasi)}</td></tr>`).join('');done.forEach(p=>{if(typeof QRCode!=='undefined'){QRCode.toDataURL(p.id,{width:32,margin:0},function(err,url){const el=document.getElementById('qrt-'+p.id);if(el&&url)el.innerHTML=`<img src="${url}" style="width:32px;height:32px">`;});}});}

// ===== KEHADIRAN (Daftar Peserta) =====
function rKeh(){D=getAllPeserta();const units=getAllUnits();const sel=document.getElementById('kehInstitusi');if(sel)sel.innerHTML='<option value="">Semua Institusi</option>'+units.map(u=>`<option value="${u.nama}">${u.nama}</option>`).join('');document.getElementById('kehTotal').textContent=D.length;document.getElementById('kehRowCount').textContent='Menampilkan '+D.length+' baris';fKeh('semua');}
function filterKeh(){const q=gv('kehSearch').toLowerCase();const data=D.filter(p=>p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)||(p.perusahaan||'').toLowerCase().includes(q));renderKehTable(data);}
function fKeh(f){let data=D;if(f==='Hadir')data=data.filter(p=>p.statusKehadiran==='Hadir');else if(f==='Belum Hadir')data=data.filter(p=>p.statusKehadiran!=='Hadir');renderKehTable(data);}
function renderKehTable(data){document.getElementById('kehTotal').textContent=data.length;document.getElementById('kehRowCount').textContent='Menampilkan '+data.length+' baris';document.getElementById('kehTb').innerHTML=data.map(p=>{const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const stColor=p.statusKehadiran==='Hadir'?'#059669':'#6B7280';const noCase=p.noCase||String(Math.floor(Math.random()*9000)+1000);const tglMCU=p.tanggalDaftar?p.tanggalDaftar.split('T')[0]:'-';return`<tr><td style="font-size:11px">${tglMCU}</td><td><a href="javascript:void(0)" onclick="openPesertaDoc('${p.id}')" style="font-family:monospace;font-size:11px;color:#1a3a6b;text-decoration:none;cursor:pointer;font-weight:600">${p.id}</a></td><td><a href="javascript:void(0)" onclick="openPesertaDoc('${p.id}')" style="font-weight:600;color:#1a3a6b;text-decoration:none;cursor:pointer;font-size:12px">${p.nama}</a><div style="font-size:10px;color:var(--text-muted)">${p.perusahaan||'-'}</div></td><td style="font-size:11px">${p.jenisKelamin==='Perempuan'?'P':'L'}</td><td style="font-size:11px">${p.institusi||'Mitra Keluarga'}</td><td style="font-size:11px">${p.noKaryawan||'EMP-'+String(Math.floor(Math.random()*900)+100)}</td><td style="font-size:11px">${p.telepon||'-'}</td><td style="font-size:11px;color:var(--text-muted)">${noCase}</td><td><button class="btn btn-o btn-sm" onclick="openPesertaDoc('${p.id}')" style="padding:3px 6px" title="Dokumen"><i class="fas fa-file-alt"></i></button></td><td style="font-size:11px;font-weight:600;color:#1a3a6b">${checked}/${items.length}</td><td><span style="font-size:10px;font-weight:600;color:${stColor}">${p.statusKehadiran==='Hadir'?'Sudah Registrasi':'Belum Registrasi'}</span></td><td style="white-space:nowrap"><button class="btn btn-o btn-sm" onclick="showDet('${p.id}')" style="padding:3px 6px"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delPx('${p.id}')" style="padding:3px 6px"><i class="fas fa-trash"></i></button></td></tr>`;}).join('');}
function openAddPesertaFull(){const units=getAllUnits();const pakets=getAllPaketMCU();document.getElementById('fInstitusi').innerHTML='<option>-- Pilih --</option>'+units.map(u=>`<option value="${u.nama}">${u.nama}</option>`).join('');document.getElementById('fPak').innerHTML=pakets.map(p=>`<option value="${p.id}">${p.nama}</option>`).join('');document.getElementById('fPatientId').value='PA-'+String(Math.floor(Math.random()*9000)+1000)+'-'+String(Math.floor(Math.random()*9000)+1000);openM('mAdd');}
function showAddPeserta(){openAddPesertaFull();}
// Document view for peserta
function openPesertaDoc(id){const p=getAllPeserta().find(x=>x.id===id);if(!p)return;const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const noCase=p.noCase||String(Math.floor(Math.random()*9000)+1000);const tglMCU=p.tanggalDaftar?p.tanggalDaftar.split('T')[0]:new Date().toISOString().split('T')[0];const now=new Date();const generated=now.toLocaleDateString('id-ID')+', '+now.toLocaleTimeString('id-ID');const docNo=String(Math.floor(Math.random()*9000000)+1000000);const usia=p.tanggalLahir?Math.floor((now-new Date(p.tanggalLahir))/(365.25*24*60*60*1000))+' Tahun '+Math.floor(((now-new Date(p.tanggalLahir))%(365.25*24*60*60*1000))/(30.44*24*60*60*1000))+' Bulan':'-';const qrUrl='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(p.id);const fotoHTML=p.foto?`<img src="${p.foto}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">`:`<div style="width:100%;height:100%;background:#f4f6f9;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#a0aec0;text-align:center;border:1px dashed #ccd5e0;line-height:1.4">TIDAK ADA<br>FOTO</div>`;
// Render in fullscreen overlay
let overlay=document.getElementById('docOverlay');if(!overlay){overlay=document.createElement('div');overlay.id='docOverlay';document.body.appendChild(overlay);}
overlay.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:#e8ecf4;overflow:hidden;display:flex;flex-direction:column';
const iframeHTML=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:'Segoe UI',Arial,sans-serif;margin:0;padding:30px;background:#e8ecf4;color:#1a3a6b}.doc{max-width:720px;margin:0 auto;background:#fff;padding:52px 56px;box-shadow:0 4px 24px rgba(0,0,0,.08);border-radius:4px;line-height:1.5}table{width:100%;border-collapse:collapse}.lbl{font-size:10px;color:#718096;text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px}.val{font-size:13px;font-weight:700;color:#1a3a6b}</style></head><body><div class="doc">
<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px"><div style="display:flex;align-items:center;gap:10px"><svg width="44" height="44" viewBox="0 0 40 40"><circle cx="20" cy="12" r="8" fill="#00B4D8"/><circle cx="14" cy="26" r="7" fill="#FF6B9D"/><circle cx="26" cy="26" r="7" fill="#FFD600"/></svg><div><div style="font-size:20px;font-weight:800;color:#1a3a6b;line-height:1.15">Mitra</div><div style="font-size:20px;font-weight:800;color:#1a3a6b;line-height:1.15">Keluarga</div></div></div><img src="${qrUrl}" style="width:80px;height:80px"></div>
<h2 style="font-size:16px;font-weight:900;color:#1a3a6b;margin:0 0 4px">DATA PESERTA MEDICAL CHECK UP</h2>
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px"><span style="font-size:11px;color:#718096;font-family:monospace">Doc No: ${docNo} • Tanggal: ${tglMCU}</span><span style="font-family:monospace;font-size:12px;font-weight:700;color:#1a3a6b;background:#e8f0fe;padding:5px 14px;border-radius:4px;border:1px solid #c5d7f2">${p.id}</span></div>
<div style="border:1.5px solid #e0e6ef;border-radius:10px;padding:20px;margin-bottom:20px;display:flex;gap:20px"><div style="width:90px;height:110px;flex-shrink:0">${fotoHTML}</div><div style="flex:1"><div class="lbl">NAMA PESERTA</div><div style="font-size:18px;font-weight:800;color:#1a3a6b;margin-bottom:14px">${p.nama.toUpperCase()}</div><table><tr><td style="padding:6px 0;width:45%"><div class="lbl">PATIENT ID</div><div class="val">${p.id}</div></td><td style="padding:6px 0"><div class="lbl">JENIS KELAMIN / UMUR</div><div class="val">${(p.jenisKelamin||'LAKI-LAKI').toUpperCase()} / ${usia}</div></td></tr><tr><td style="padding:6px 0"><div class="lbl">NO. TELEPON / HP</div><div class="val">${p.telepon||'-'}</div></td><td style="padding:6px 0"><div class="lbl">PERUSAHAAN / INSTITUSI</div><div class="val">${p.perusahaan||'-'}</div></td></tr><tr><td style="padding:6px 0"><div class="lbl">NO. KARYAWAN</div><div class="val">${p.noKaryawan||'EMP-'+String(Math.floor(Math.random()*900)+100)}</div></td><td style="padding:6px 0"><div class="lbl">NO. CASE</div><div class="val">${noCase}</div></td></tr></table></div></div>
<table style="margin-bottom:24px;border:1px solid #e0e6ef;border-radius:8px"><tr><td style="padding:12px 14px;width:25%"><div class="lbl">PAKET MCU</div><div class="val" style="font-size:12px">${getPN(p.paketMCU)}</div></td><td style="padding:12px 14px;border-left:1px solid #e0e6ef"><div class="lbl">BATCH / CABANG</div><div class="val" style="font-size:12px;color:#2563eb">${p.institusi||'Mitra Keluarga'}</div></td><td style="padding:12px 14px;border-left:1px solid #e0e6ef"><div class="lbl">STATUS</div><div class="val" style="font-size:12px">${p.statusKehadiran==='Hadir'?'SUDAH REGISTRASI':'BELUM'}</div></td><td style="padding:12px 14px;border-left:1px solid #e0e6ef"><div class="lbl">TANGGAL MCU</div><div class="val" style="font-size:12px">${tglMCU}</div></td></tr></table>
<div style="background:#1a3a6b;color:#fff;padding:10px 16px;display:flex;align-items:center;justify-content:space-between"><strong style="font-size:12px">DAFTAR ITEM PEMERIKSAAN</strong><div><span style="padding:3px 10px;border:1px solid rgba(255,255,255,.4);border-radius:4px;font-size:10px;margin-right:8px">${getPN(p.paketMCU)}</span><span style="font-size:10px;opacity:.8">${checked}/${items.length} Selesai</span></div></div>
<table style="font-size:12px"><thead><tr style="background:#f8f9fb"><th style="padding:10px 8px;border:1px solid #e0e6ef;text-align:center;width:50px">No.</th><th style="padding:10px 8px;border:1px solid #e0e6ef">Item Pemeriksaan</th><th style="padding:10px 8px;border:1px solid #e0e6ef;text-align:center;width:60px">Status Check</th><th style="padding:10px 8px;border:1px solid #e0e6ef;width:100px">Petugas</th><th style="padding:10px 8px;border:1px solid #e0e6ef;width:90px">Tgl / Jam</th></tr></thead><tbody>${items.map((it,i)=>{const d=p.pemeriksaan&&p.pemeriksaan[it]?p.pemeriksaan[it]:{};const isDone=d.status==='Checked';return`<tr><td style="padding:10px 8px;border:1px solid #e0e6ef;text-align:center">${i+1}</td><td style="padding:10px 8px;border:1px solid #e0e6ef">${it}</td><td style="padding:10px 8px;border:1px solid #e0e6ef;text-align:center;font-size:16px">${isDone?'☑':'☐'}</td><td style="padding:10px 8px;border:1px solid #e0e6ef;font-size:10px;color:#718096">${isDone?(p.dokterReview||''):''}</td><td style="padding:10px 8px;border:1px solid #e0e6ef;font-size:10px;color:#718096">${isDone?tglMCU:''}</td></tr>`;}).join('')}</tbody></table>
<div style="display:flex;justify-content:space-between;margin-top:44px;font-size:11px"><div style="text-align:center;min-width:160px"><div style="border-top:1px solid #1a3a6b;margin-top:50px;padding-top:6px;font-weight:600">Tanda Tangan Peserta</div></div><div style="text-align:center;min-width:160px"><div style="border-top:1px solid #1a3a6b;margin-top:50px;padding-top:6px;font-weight:600">Petugas MCU</div></div><div style="text-align:center;min-width:160px"><div style="border-top:1px solid #1a3a6b;margin-top:50px;padding-top:6px;font-weight:600">Koordinator MCU</div></div></div>
<div style="margin-top:16px;font-size:9px;color:#a0aec0">MCU System — Mitra Keluarga<span style="float:right">Dicetak: ${generated}</span></div>
</div></body></html>`;
overlay.innerHTML=`<div style="padding:12px 24px;display:flex;justify-content:flex-end;gap:8px;background:#fff;border-bottom:1px solid #e0e6ef;flex-shrink:0"><button onclick="document.getElementById('docOverlay').style.display='none'" style="padding:8px 16px;background:#fff;border:1px solid #ddd;border-radius:6px;font-size:12px;cursor:pointer">Kembali</button><button onclick="document.getElementById('docOverlay').style.display='none'" style="padding:8px 16px;background:#fff;border:1px solid #ddd;border-radius:6px;font-size:12px;cursor:pointer">Tutup</button><button onclick="document.getElementById('docIframe').contentWindow.print()" style="padding:8px 16px;background:#1a3a6b;color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer"><i class="fas fa-print"></i> Cetak Dokumen</button></div><iframe id="docIframe" style="flex:1;border:none;width:100%"></iframe>`;
const iframe=overlay.querySelector('#docIframe');iframe.contentDocument.open();iframe.contentDocument.write(iframeHTML);iframe.contentDocument.close();}

// ===== PEMERIKSAAN =====
function rPem(){D=getAllPeserta();const units=getAllUnits();const sel=document.getElementById('pemInstitusi');if(sel)sel.innerHTML='<option value="">Semua Institusi</option>'+units.map(u=>`<option value="${u.nama}">${u.nama}</option>`).join('');renderPemTable(D.filter(p=>p.statusKehadiran==='Hadir'));}
function renderPemTable(data){document.getElementById('pemTb').innerHTML=data.length?data.map((p,i)=>{const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const stText=checked>=items.length?'SELESAI':checked>0?'GENERALIS TERISI':'BELUM';const stColor=stText==='SELESAI'?'#059669':stText==='GENERALIS TERISI'?'#1a3a6b':'#6B7280';return`<tr><td>${i+1}</td><td style="font-family:monospace;font-size:12px;color:var(--text-muted)">${p.id}</td><td><a href="javascript:void(0)" onclick="openPemDetail('${p.id}')" style="font-weight:600;color:var(--g1);text-decoration:none;cursor:pointer">${p.nama}</a></td><td style="font-size:12px">${p.perusahaan||'-'}</td><td style="font-size:12px">${getPN(p.paketMCU)}</td><td><span style="color:#059669;font-size:12px;font-weight:600">${p.waktuRegistrasi?'Sudah Registrasi':'-'}</span></td><td><span style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:700;background:${stColor}15;color:${stColor}">${stText}</span></td></tr>`;}).join(''):'<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)"><i class="fas fa-stethoscope" style="font-size:32px;display:block;margin-bottom:12px;opacity:.3"></i>Data antrean kosong<br><small>Pastikan tanggal dan institusi sudah benar, lalu klik Muat Ulang.</small></td></tr>';}
function srcPem2(){const q=gv('srcPem').toLowerCase();const data=D.filter(p=>p.statusKehadiran==='Hadir'&&(p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)||(p.perusahaan||'').toLowerCase().includes(q)));renderPemTable(data);}
function openPemDetail(id){const p=D.find(x=>x.id===id);if(!p)return;const items=getPI(p.paketMCU);document.getElementById('mPemTitle').textContent='Pemeriksaan - '+p.nama;let h=`<div style="margin-bottom:20px;padding:16px;background:var(--bg);border-radius:var(--rs)"><strong>${p.nama}</strong> | ${p.id} | ${getPN(p.paketMCU)}</div><p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Pilih item pemeriksaan untuk input hasil:</p>`;items.forEach(it=>{const st=p.pemeriksaan&&p.pemeriksaan[it]?p.pemeriksaan[it].status:'Pending';const color=st==='Checked'?'#36B37E':'#FF8B00';h+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--border);border-radius:var(--rs);margin-bottom:8px"><div><strong style="font-size:13px">${it}</strong><div style="font-size:11px;color:${color}">${st}</div></div><button class="btn btn-p btn-sm" onclick="closeM('mPem');openPem('${p.id}','${it}')"><i class="fas fa-edit"></i> Input</button></div>`;});document.getElementById('mPemBody').innerHTML=h;openM('mPem');}
function openPem(id,unit){curPemId=id;curUnit=unit;const p=D.find(x=>x.id===id);if(!p)return;document.getElementById('mPemTitle').textContent=unit+' - '+p.nama;const formHTML=generatePemForm(unit);document.getElementById('mPemBody').innerHTML='<input type="hidden" id="pemUnit" value="'+unit+'">'+formHTML;openM('mPem');
  if(unit==='Konsultasi Dokter Umum MCU'){const tb=document.getElementById('pf_tinggiBadan');const bb=document.getElementById('pf_beratBadan');const imt=document.getElementById('pf_imt');if(tb&&bb&&imt){const calc=()=>{const t=parseFloat(tb.value)/100;const b=parseFloat(bb.value);if(t>0&&b>0){const v=(b/(t*t)).toFixed(1);let kat='';if(v<18.5)kat='Underweight';else if(v<25)kat='Normal';else if(v<30)kat='Overweight';else kat='Obesitas';imt.value=v+' ('+kat+')';}};tb.addEventListener('input',calc);bb.addEventListener('input',calc);}}}
function savePem(){const unit=gv('pemUnit');const {data,petugas}=collectPemData(unit);savePemeriksaanUnit(curPemId,unit,data,petugas);toast(unit+' disimpan');closeM('mPem');D=getAllPeserta();rPem();}

// ===== TRACKING =====
function rTrack(){D=getAllPeserta();const rs=getAllRS();const sel=document.getElementById('trackInstitusi');if(sel)sel.innerHTML='<option value="">Semua Institusi</option>'+rs.map(r=>`<option value="${r.id}">${r.nama}</option>`).join('');const hadir=D.filter(p=>p.statusKehadiran==='Hadir');document.getElementById('trackCount').textContent='Menampilkan '+hadir.length+' antrean';renderTrackTable(hadir);document.getElementById('trackRes').innerHTML='';}
function renderTrackTable(data){document.getElementById('trackTb').innerHTML=data.length?data.map((p,i)=>{const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const pct=items.length>0?Math.round(checked/items.length*100):0;const stColor=pct===100?'#36B37E':pct>0?'#3B82F6':'#FF8B00';const stText=pct===100?'Selesai':pct>0?checked+'/'+items.length+' ('+pct+'%)':'Menunggu';return`<tr style="cursor:pointer" onclick="showTrackDetail('${p.id}')"><td>${i+1}</td><td><strong style="color:#1a3a6b">${p.id}</strong></td><td><div style="font-weight:600">${p.nama}</div><div style="font-size:11px;color:var(--text-muted)">${p.jenisKelamin||''}</div></td><td>${p.perusahaan||'-'}</td><td>${getPN(p.paketMCU)}</td><td><div style="display:flex;align-items:center;gap:8px"><div class="pb" style="width:60px;height:6px"><div class="pf bl" style="width:${pct}%"></div></div><span style="color:${stColor};font-weight:700;font-size:12px">${stText}</span></div></td></tr>`;}).join(''):'<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)"><i class="fas fa-map-marker-alt" style="font-size:32px;display:block;margin-bottom:12px;opacity:.3"></i>Belum ada pasien yang siap diproses<br><small>Pastikan sudah ada pasien yang minimal ter-registrasi.</small></td></tr>';}
function srcTrack2(){const q=gv('srcTrack').toLowerCase();if(!q){rTrack();return;}const data=D.filter(p=>p.statusKehadiran==='Hadir'&&(p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)||(p.perusahaan||'').toLowerCase().includes(q)));document.getElementById('trackCount').textContent='Menampilkan '+data.length+' antrean';renderTrackTable(data);}
function showTrackDetail(id){const p=D.find(x=>x.id===id);if(!p)return;const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const pct=items.length>0?Math.round(checked/items.length*100):0;const nextItem=items.find(it=>!p.pemeriksaan||!p.pemeriksaan[it]||p.pemeriksaan[it].status!=='Checked');
  let html=`<div class="cd"><div class="cd-b" style="padding:28px"><div style="display:flex;align-items:center;gap:16px;margin-bottom:20px"><img src="${p.foto||'https://ui-avatars.com/api/?name='+encodeURIComponent(p.nama)+'&size=60&background=1a3a6b&color=fff'}" style="width:56px;height:56px;border-radius:50%;object-fit:cover"><div><h3 style="margin-bottom:2px">${p.nama}</h3><p style="font-size:12px;color:var(--text-muted)">${getPN(p.paketMCU)} | ${p.id}</p></div></div>`;
  html+=`<div style="margin-bottom:20px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:8px"><span>Progress Journey</span><span style="color:#1a3a6b">${pct}% (${checked}/${items.length})</span></div><div class="pb" style="height:10px"><div class="pf bl" style="width:${pct}%"></div></div></div>`;
  items.forEach(it=>{const st=p.pemeriksaan&&p.pemeriksaan[it]?p.pemeriksaan[it].status:'Pending';const color=st==='Checked'?'#36B37E':'#FF8B00';const icon=st==='Checked'?'fa-check-circle':'fa-clock';html+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--border);border-radius:var(--rs);margin-bottom:8px"><div style="display:flex;align-items:center;gap:12px"><i class="fas ${icon}" style="color:${color};font-size:16px"></i><strong style="font-size:13px">${it}</strong></div><span style="color:${color};font-size:12px;font-weight:600">${st}</span></div>`;});
  if(nextItem){html+=`<div style="margin-top:20px;padding:16px;background:rgba(26,58,107,.04);border-radius:var(--rs);border:1px solid rgba(26,58,107,.1)"><div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">Langkah Selanjutnya:</div><div style="font-size:14px;font-weight:700;color:#1a3a6b"><i class="fas fa-arrow-right" style="margin-right:8px"></i>${nextItem}</div></div>`;}else if(pct===100){html+=`<div style="margin-top:20px;padding:16px;background:rgba(54,179,126,.06);border-radius:var(--rs);text-align:center;border:1px solid rgba(54,179,126,.2)"><div style="font-size:14px;font-weight:700;color:#36B37E"><i class="fas fa-check-circle" style="margin-right:8px"></i>Semua Pemeriksaan Selesai</div></div>`;}
  html+=`</div></div>`;document.getElementById('trackRes').innerHTML=html;}

// ===== REVIEW =====
function rRev(){D=getAllPeserta();const rs=getAllRS();const sel=document.getElementById('revInstitusi');if(sel)sel.innerHTML='<option>-- Wajib Pilih --</option>'+rs.map(r=>`<option value="${r.id}">${r.nama}</option>`).join('');const el=document.getElementById('revResult');if(el)el.innerHTML='';}
function srcRev2(){}
function cekStatusManual(){const q=(document.getElementById('srcRev').value||'').trim();if(!q)return toast('Masukkan Patient ID');const p=D.find(x=>x.id===q||x.id.includes(q)||x.nama.toLowerCase().includes(q.toLowerCase()));if(!p)return toast('Peserta tidak ditemukan');showStatusResult(p);}
function showStatusResult(p){const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const pct=items.length>0?Math.round(checked/items.length*100):0;const nextItem=items.find(it=>!p.pemeriksaan||!p.pemeriksaan[it]||p.pemeriksaan[it].status!=='Checked');let html=`<div style="border:1.5px solid var(--border);border-radius:var(--rs);padding:24px;text-align:left"><div style="display:flex;align-items:center;gap:16px;margin-bottom:20px"><img src="${p.foto||'https://ui-avatars.com/api/?name='+encodeURIComponent(p.nama)+'&size=60&background=1a3a6b&color=fff'}" style="width:56px;height:56px;border-radius:50%;object-fit:cover"><div><h3>${p.nama}</h3><p style="font-size:12px;color:var(--text-muted)">${p.id} | ${getPN(p.paketMCU)}</p></div></div><div style="margin-bottom:20px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:8px"><span>Progress</span><span>${pct}% (${checked}/${items.length})</span></div><div class="pb" style="height:10px"><div class="pf bl" style="width:${pct}%"></div></div></div>`;items.forEach(it=>{const st=p.pemeriksaan&&p.pemeriksaan[it]?p.pemeriksaan[it].status:'Pending';const color=st==='Checked'?'#36B37E':'#999';const icon=st==='Checked'?'fa-check-circle':'fa-clock';html+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)"><div style="display:flex;align-items:center;gap:10px"><i class="fas ${icon}" style="color:${color}"></i><span style="font-size:13px">${it}</span></div><span style="font-size:12px;color:${color};font-weight:600">${st}</span></div>`;});if(nextItem){html+=`<div style="margin-top:16px;padding:12px;background:rgba(26,58,107,.04);border-radius:var(--rs)"><strong style="font-size:12px;color:#1a3a6b"><i class="fas fa-arrow-right"></i> Selanjutnya: ${nextItem}</strong></div>`;}html+='</div>';document.getElementById('revResult').innerHTML=html;}
function openRev(id){curRevId=id;const p=D.find(x=>x.id===id);if(!p)return;document.getElementById('mRevTitle').textContent='Review - '+p.nama;const items=getPI(p.paketMCU);const analysis=analyzeResults(p);
  let html='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px"><div style="padding:12px;background:var(--bg);border-radius:var(--rs)"><small style="color:var(--text-muted)">Peserta</small><div style="font-weight:700">${p.nama}</div><div style="font-size:12px;color:var(--text-muted)">${p.id} | ${p.perusahaan||"Mandiri"}</div></div><div style="padding:12px;background:var(--bg);border-radius:var(--rs)"><small style="color:var(--text-muted)">Paket</small><div style="font-weight:700">${getPN(p.paketMCU)}</div></div></div>';
  // Ringkasan pemeriksaan
  html+='<h4 style="font-size:13px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px">Ringkasan Hasil Pemeriksaan</h4>';
  items.forEach(it=>{const d=p.pemeriksaan&&p.pemeriksaan[it]?p.pemeriksaan[it]:{status:'Pending',data:null};html+=`<div style="border:1.5px solid var(--border);border-radius:var(--rs);padding:12px 16px;margin-bottom:8px"><div style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:13px">${it}</strong>${sbg(d.status)}</div>${d.data&&d.data.hasil?`<div style="font-size:12px;color:var(--text-light);margin-top:6px">${d.data.hasil}</div>`:''}</div>`;});
  // Auto-analisis
  if(analysis.findings.length){html+=`<h4 style="font-size:13px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin:20px 0 12px">Temuan Otomatis (Auto-Analisis)</h4>`;analysis.findings.forEach(f=>{const bg=f.status==='Abnormal'?'var(--danger-bg)':'var(--warning-bg)';const cl=f.status==='Abnormal'?'var(--danger)':'var(--warning)';html+=`<div style="padding:10px 14px;background:${bg};border-radius:var(--rs);margin-bottom:6px;display:flex;align-items:center;gap:10px"><i class="fas fa-exclamation-triangle" style="color:${cl}"></i><div><strong style="font-size:12px;color:${cl}">${f.item}</strong><div style="font-size:11px;color:var(--text-muted)">${f.detail}</div></div></div>`;});html+=`<div style="padding:12px;background:var(--info-bg);border-radius:var(--rs);margin-top:12px"><strong style="font-size:12px;color:var(--info)">Saran Sistem: ${analysis.suggestion}</strong></div>`;}
  // Form kesimpulan dokter
  html+=`<hr style="margin:24px 0;border:none;border-top:1px solid var(--border)"><h4 style="font-size:13px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px">Kesimpulan Dokter</h4><div class="fg"><div class="fi"><label>Kesimpulan MCU</label><select id="rKesp"><option value="">Pilih Kesimpulan</option><option value="Fit">Fit - Layak Kerja</option><option value="Fit dengan Catatan">Fit dengan Catatan</option><option value="Unfit">Unfit - Tidak Layak Kerja</option><option value="Temporary Unfit">Temporary Unfit - Perlu Pemeriksaan Lanjutan</option></select></div><div class="fi"><label>Dokter Pemeriksa</label><input type="text" id="rDok" value="${p.dokterReview||''}"></div></div><div class="fi" style="margin-top:16px"><label>Catatan / Rekomendasi Dokter</label><textarea id="rCat" rows="4" placeholder="Catatan medis, rekomendasi, saran follow-up...">${p.catatanDokter||''}</textarea></div>`;
  document.getElementById('mRevBody').innerHTML=html;openM('mRev');if(p.kesimpulan)setTimeout(()=>{document.getElementById('rKesp').value=p.kesimpulan;},50);}
function saveRev(){if(!gv('rKesp'))return toast('Pilih kesimpulan dulu');saveReview(curRevId,gv('rKesp'),gv('rDok'),gv('rCat'));toast('Review disimpan');closeM('mRev');D=getAllPeserta();rRev();}

// ===== LAPORAN =====
function rLap(){D=getAllPeserta();
  // Populate institusi dropdown from units
  const units=getAllUnits();const lapSel=document.getElementById('lapInstitusi');
  if(lapSel&&lapSel.options.length<=1){lapSel.innerHTML='<option value="">Semua Institusi</option>'+units.map(u=>`<option value="${u.nama}">${u.nama}</option>`).join('');}
  const data=D.filter(p=>p.pemeriksaan||p.kesimpulan);const el=document.getElementById('lapFooter');if(el)el.textContent='Menampilkan '+data.length+' data laporan';if(!data.length){document.getElementById('lapTb').innerHTML='<tr><td colspan="8" style="text-align:center;padding:50px;color:var(--text-muted)"><div style="margin-bottom:8px"><i class="fas fa-file-alt" style="font-size:32px;opacity:.4"></i></div>Data laporan kosong<br><span style="font-size:11px">Pastikan tanggal dan institusi sudah benar.</span></td></tr>';return;}document.getElementById('lapTb').innerHTML=data.map((p,i)=>{const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const stPem=checked>=items.length?'SELESAI':checked>0?'GENERALIS TERISI':'BELUM';const stPemColor=stPem==='SELESAI'?'#059669':stPem==='GENERALIS TERISI'?'#1a3a6b':'#6B7280';const stLap=p.kesimpulan?'Siap Dicetak':'Parsial';const stLapColor=stLap==='Siap Dicetak'?'#059669':'#F59E0B';return`<tr><td>${i+1}</td><td style="font-family:monospace;font-size:12px;color:var(--text-muted)">${p.id}</td><td><a href="javascript:void(0)" onclick="openLapDetail('${p.id}')" style="font-weight:600;color:var(--g1);text-decoration:none;cursor:pointer">${p.nama}</a></td><td style="font-size:12px">${p.perusahaan||'-'}</td><td style="font-size:12px">${getPN(p.paketMCU)}</td><td><span style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:700;background:${stPemColor}15;color:${stPemColor}">${stPem}</span></td><td><span style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:700;background:${stLapColor}15;color:${stLapColor}">${stLap}</span></td><td style="white-space:nowrap"><button class="btn btn-o btn-sm" onclick="openLapDetail('${p.id}')" title="Preview"><i class="fas fa-eye"></i></button> <button class="btn btn-o btn-sm" onclick="printPDF('${p.id}')" title="Print"><i class="fas fa-print"></i></button> <button class="btn btn-o btn-sm" onclick="printPDF('${p.id}')" title="Simpan"><i class="fas fa-download"></i></button></td></tr>`}).join('');}
function srcLap2(){const q=gv('srcLap').toLowerCase();const data=D.filter(p=>(p.pemeriksaan||p.kesimpulan)&&(p.nama.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)||(p.perusahaan||'').toLowerCase().includes(q)));const el=document.getElementById('lapFooter');if(el)el.textContent='Menampilkan '+data.length+' data laporan';document.getElementById('lapTb').innerHTML=data.map((p,i)=>{const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const stPem=checked>=items.length?'SELESAI':checked>0?'GENERALIS TERISI':'BELUM';const stPemColor=stPem==='SELESAI'?'#059669':stPem==='GENERALIS TERISI'?'#1a3a6b':'#6B7280';const stLap=p.kesimpulan?'Siap Dicetak':'Parsial';const stLapColor=stLap==='Siap Dicetak'?'#059669':'#F59E0B';return`<tr><td>${i+1}</td><td style="font-family:monospace;font-size:12px;color:var(--text-muted)">${p.id}</td><td><a href="javascript:void(0)" onclick="openLapDetail('${p.id}')" style="font-weight:600;color:var(--g1);text-decoration:none;cursor:pointer">${p.nama}</a></td><td style="font-size:12px">${p.perusahaan||'-'}</td><td style="font-size:12px">${getPN(p.paketMCU)}</td><td><span style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:700;background:${stPemColor}15;color:${stPemColor}">${stPem}</span></td><td><span style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:700;background:${stLapColor}15;color:${stLapColor}">${stLap}</span></td><td style="white-space:nowrap"><button class="btn btn-o btn-sm" onclick="openLapDetail('${p.id}')" title="Preview"><i class="fas fa-eye"></i></button> <button class="btn btn-o btn-sm" onclick="printPDF('${p.id}')" title="Print"><i class="fas fa-print"></i></button> <button class="btn btn-o btn-sm" onclick="printPDF('${p.id}')" title="Simpan"><i class="fas fa-download"></i></button></td></tr>`}).join('');}
// Detail Laporan MCU (in-page view)
function openLapDetail(id){const p=D.find(x=>x.id===id);if(!p)return;const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const stLap=p.kesimpulan?'SIAP DICETAK':'PARSIAL';const stLapColor=p.kesimpulan?'#059669':'#F59E0B';const tglMCU=p.waktuRegistrasi?new Date(p.waktuRegistrasi).toLocaleDateString('id-ID'):new Date().toLocaleDateString('id-ID');const usia=p.tanggalLahir?Math.floor((new Date()-new Date(p.tanggalLahir))/(365.25*24*60*60*1000))+' Tahun':'-';
const kelengkapan=['Identitas Pasien','Anamnesa','Pemeriksaan Generalis (B1)','Pemeriksaan Fisik (B2-B13)','Hasil & Lampiran'];
const ringkasan=['Status Gizi','Tekanan Darah','Pemeriksaan Fisik','Laboratorium','Radiologi / Thorax','Treadmill / Jantung / EKG','Mata / Visus','Audiometri / THT','Gigi & Mulut'];
let kelHTML=kelengkapan.map(k=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border)"><div style="display:flex;align-items:center;gap:10px"><i class="fas fa-check-circle" style="color:#059669"></i><span style="font-size:13px">${k}</span></div><span style="font-size:11px;color:#059669;font-weight:600">Terisi</span></div>`).join('');
let ringHTML=ringkasan.map(r=>`<div style="display:flex;align-items:center;gap:8px;padding:8px 0"><i class="fas fa-circle" style="font-size:6px;color:var(--g1)"></i><span style="font-size:12px;flex:1">${r}</span><i class="fas fa-check-circle" style="color:#059669;font-size:14px"></i></div>`).join('');
// Store original HTML and replace
const sec=document.getElementById('p-laporan');
if(!sec._origHTML)sec._origHTML=sec.innerHTML;
sec.innerHTML=`
<div style="max-width:800px;margin:0 auto">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px"><button onclick="closeLapDetail()" style="width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="fas fa-arrow-left" style="font-size:12px;color:var(--text-muted)"></i></button><div><h2 style="font-size:20px;font-weight:800;margin:0">Detail Laporan MCU</h2><p style="font-size:12px;color:var(--text-muted);margin:2px 0 0">Review kelengkapan data dan cetak laporan final.</p></div><span style="margin-left:auto;padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;background:${stLapColor}15;color:${stLapColor}">${stLap}</span></div>
  <!-- Patient Info Card -->
  <div style="background:linear-gradient(135deg,#1a3a6b,#0d2d5a);border-radius:14px;padding:20px 24px;color:#fff;margin-bottom:24px;display:flex;gap:24px;flex-wrap:wrap">
    <div><div style="font-size:10px;opacity:.6;text-transform:uppercase;letter-spacing:.5px">NAMA PESERTA</div><div style="font-size:16px;font-weight:700;margin-top:2px">${p.nama}</div></div>
    <div><div style="font-size:10px;opacity:.6;text-transform:uppercase;letter-spacing:.5px">PATIENT ID</div><div style="font-size:14px;font-weight:600;margin-top:2px;font-family:monospace">${p.id}</div></div>
    <div><div style="font-size:10px;opacity:.6;text-transform:uppercase;letter-spacing:.5px">USIA</div><div style="font-size:14px;font-weight:600;margin-top:2px">${usia}</div></div>
    <div><div style="font-size:10px;opacity:.6;text-transform:uppercase;letter-spacing:.5px">PERUSAHAAN</div><div style="font-size:14px;font-weight:600;margin-top:2px">${p.perusahaan||'-'}</div></div>
    <div><div style="font-size:10px;opacity:.6;text-transform:uppercase;letter-spacing:.5px">TANGGAL MCU</div><div style="font-size:14px;font-weight:600;margin-top:2px">${tglMCU}</div></div>
  </div>
  <!-- Kelengkapan Data -->
  <div style="border:1.5px solid var(--border);border-radius:14px;padding:20px;margin-bottom:24px">
    <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:12px">KELENGKAPAN DATA LAPORAN</h3>
    ${kelHTML}
  </div>
  <!-- Ringkasan Hasil -->
  <div style="border:1.5px solid var(--border);border-radius:14px;padding:20px;margin-bottom:24px">
    <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:12px">RINGKASAN HASIL PER KATEGORI</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 24px">${ringHTML}</div>
  </div>
  <!-- Action Buttons -->
  <div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px">
    <button onclick="printPDF('${p.id}')" style="padding:14px 32px;background:#059669;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:8px"><i class="fas fa-eye"></i> Preview Laporan Final</button>
    <button onclick="printPDF('${p.id}')" style="padding:14px 32px;background:#fff;color:var(--text);border:1.5px solid var(--border);border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:8px"><i class="fas fa-print"></i> Print / Simpan PDF</button>
  </div>
  <div style="text-align:center"><a href="javascript:void(0)" onclick="closeLapDetail()" style="font-size:12px;color:var(--g1);text-decoration:none">← Kembali ke Pemeriksaan Medis (Input/Edit Data)</a></div>
</div>`;}
function closeLapDetail(){const sec=document.getElementById('p-laporan');if(sec._origHTML){sec.innerHTML=sec._origHTML;sec._origHTML=null;}rLap();}
function printPDF(id){const p=D.find(x=>x.id===id);if(!p)return;const items=getPI(p.paketMCU);const now=new Date();const tglLaporan=now.toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});const tglMCU=p.waktuRegistrasi?new Date(p.waktuRegistrasi).toLocaleDateString('id-ID'):(now.toLocaleDateString('id-ID'));const usia=p.tanggalLahir?Math.floor((now-new Date(p.tanggalLahir))/(365.25*24*60*60*1000))+' Tahun':'-';
const secStyle='background:#1a2744;color:#fff;padding:10px 16px;font-size:14px;font-weight:700;border-radius:4px;margin:24px 0 12px';
const tblStyle='width:100%;border-collapse:collapse;margin-bottom:8px';
const tdL='padding:10px 14px;border-bottom:1px solid #e8ecf4;font-size:13px;font-weight:600;color:#1a3a6b;width:35%';
const tdR='padding:10px 14px;border-bottom:1px solid #e8ecf4;font-size:13px;color:#333';
// Build pemeriksaan fisik rows
let pemFisikHTML='';if(p.pemeriksaan){const gen=p.pemeriksaan['Pemeriksaan Awal']||p.pemeriksaan['Pemeriksaan Tanda Vital & Fisik Dokter']||p.pemeriksaan['Pemeriksaan Tanda Vital & Fisik Dokter Spesialis'];if(gen&&gen.data){const d=gen.data;pemFisikHTML=`<table style="${tblStyle}">${d.sistolik?`<tr><td style="${tdL}">Tekanan Darah Sistolik</td><td style="${tdR}">${d.sistolik} mmHg</td></tr>`:''} ${d.diastolik?`<tr><td style="${tdL}">Tekanan Darah Diastolik</td><td style="${tdR}">${d.diastolik} mmHg</td></tr>`:''} ${d.nadi?`<tr><td style="${tdL}">Nadi</td><td style="${tdR}">${d.nadi} x/menit</td></tr>`:''} ${d.suhu?`<tr><td style="${tdL}">Suhu</td><td style="${tdR}">${d.suhu} °C</td></tr>`:''} ${d.tinggi?`<tr><td style="${tdL}">Tinggi Badan</td><td style="${tdR}">${d.tinggi} cm</td></tr>`:''} ${d.berat?`<tr><td style="${tdL}">Berat Badan</td><td style="${tdR}">${d.berat} kg</td></tr>`:''}</table>`;}}
// Build lampiran
let lampiranHTML='';items.forEach(it=>{const d=p.pemeriksaan&&p.pemeriksaan[it]?p.pemeriksaan[it]:{};if(d.data){const kesimpulan=d.data.hasil||d.data.kesimpulan||'Baik';const catatan=d.data.catatan||'Baik';lampiranHTML+=`<div style="background:#f8fafc;border:1px solid #e8ecf4;border-radius:12px;padding:20px;margin-bottom:16px"><div style="${secStyle};margin-top:0">LAMPIRAN — ${it}</div><div style="background:#f1f5f9;border:1px solid #e8ecf4;border-radius:8px;padding:12px 16px;margin-bottom:10px"><div style="font-size:10px;color:#718096;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">KESIMPULAN</div><div style="font-size:13px">${kesimpulan}</div></div><div style="background:#f1f5f9;border:1px solid #e8ecf4;border-radius:8px;padding:12px 16px"><div style="font-size:10px;color:#718096;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">CATATAN DOKTER</div><div style="font-size:13px">${catatan}</div></div></div>`;}});
// Render in overlay
let overlay=document.getElementById('docOverlay');if(!overlay){overlay=document.createElement('div');overlay.id='docOverlay';document.body.appendChild(overlay);}
overlay.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:#e8ecf4;overflow-y:auto;display:block';
overlay.innerHTML=`<div style="position:sticky;top:0;z-index:10;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);padding:12px 24px;display:flex;justify-content:flex-end;gap:8px;border-bottom:1px solid #e0e6ef"><button onclick="document.getElementById('docOverlay').style.display='none'" style="padding:8px 16px;background:#fff;border:1px solid #ddd;border-radius:6px;font-size:12px;cursor:pointer;font-family:inherit">Tutup</button><button onclick="var c=document.getElementById('rptContent');var w=window.open('');if(w){w.document.write(c.innerHTML);w.document.close();w.print();}" style="padding:8px 16px;background:#1a3a6b;color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit"><i class="fas fa-print"></i> Cetak / Simpan PDF</button></div>
<div id="rptContent" style="max-width:720px;margin:30px auto;font-family:'Segoe UI',Arial,sans-serif;color:#1a3a6b">
<!-- PAGE 1: COVER -->
<div style="background:#fff;padding:52px 56px;box-shadow:0 2px 12px rgba(0,0,0,.06);border-radius:4px;margin-bottom:24px;min-height:900px;display:flex;flex-direction:column">
<div style="display:flex;justify-content:space-between;align-items:flex-start"><div style="display:flex;align-items:center;gap:10px"><svg width="44" height="44" viewBox="0 0 40 40"><circle cx="20" cy="12" r="8" fill="#00B4D8"/><circle cx="14" cy="26" r="7" fill="#FF6B9D"/><circle cx="26" cy="26" r="7" fill="#FFD600"/></svg><div><div style="font-size:20px;font-weight:800;line-height:1.15">Mitra</div><div style="font-size:20px;font-weight:800;line-height:1.15">Keluarga</div></div></div><div style="text-align:right;font-size:12px;color:#718096"><div>Mitra Keluarga Corporate</div><div>${tglLaporan}</div></div></div>
<div style="font-size:11px;color:#718096;margin-top:4px">MCU System — Laporan Final</div>
<hr style="border:none;border-top:3px solid #1a3a6b;margin:16px 0 0">
<div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center">
<h1 style="font-size:24px;font-weight:900;color:#1a3a6b;margin:0">LAPORAN HASIL</h1>
<h1 style="font-size:24px;font-weight:900;color:#1a3a6b;margin:4px 0 16px">MEDICAL CHECK UP</h1>
<div style="width:50px;height:3px;background:#1a3a6b;margin:0 auto 40px"></div>
<div style="border:1.5px solid #e0e6ef;border-radius:10px;padding:24px 32px;text-align:left;width:100%;max-width:420px">
<table style="width:100%;border-collapse:collapse"><tr><td style="${tdL}">Nama</td><td style="${tdR};font-weight:700">${p.nama}</td></tr><tr><td style="${tdL}">Jenis Kelamin</td><td style="${tdR}">${p.jenisKelamin||'-'}</td></tr><tr><td style="${tdL}">Usia</td><td style="${tdR}">${usia}</td></tr><tr><td style="${tdL}">NPK</td><td style="${tdR}">${p.npk||'EMP-'+String(Math.floor(Math.random()*999999)).padStart(6,'0')}</td></tr><tr><td style="${tdL}">Perusahaan</td><td style="${tdR}">${p.perusahaan||'-'}</td></tr><tr><td style="${tdL}">Departemen</td><td style="${tdR}">${p.departemen||'HRD'}</td></tr><tr><td style="${tdL}">Tanggal MCU</td><td style="${tdR}">${tglMCU}</td></tr></table>
</div></div>
<div style="text-align:center;font-size:9px;color:#a0aec0;margin-top:auto;padding-top:20px">Dokumen ini dicetak secara otomatis oleh MCU System — Mitra Keluarga<br>ID: ${p.id} | Generated: ${now.toLocaleDateString('id-ID')}, ${now.toLocaleTimeString('id-ID')}</div>
</div>
<!-- PAGE 2+: CONTENT -->
<div style="background:#fff;padding:48px 52px;box-shadow:0 2px 12px rgba(0,0,0,.06);border-radius:4px;margin-bottom:24px">
<div style="${secStyle}">I. IDENTITAS PASIEN</div>
<table style="${tblStyle}"><tr><td style="${tdL}">Nama Lengkap</td><td style="${tdR}">${p.nama}</td></tr><tr><td style="${tdL}">Patient ID</td><td style="${tdR}">${p.id}</td></tr><tr><td style="${tdL}">NIK</td><td style="${tdR}">${p.nik||'-'}</td></tr><tr><td style="${tdL}">Tanggal Lahir</td><td style="${tdR}">${p.tanggalLahir||'-'}</td></tr><tr><td style="${tdL}">Usia</td><td style="${tdR}">${usia}</td></tr><tr><td style="${tdL}">Jenis Kelamin</td><td style="${tdR}">${p.jenisKelamin||'-'}</td></tr><tr><td style="${tdL}">Perusahaan</td><td style="${tdR}">${p.perusahaan||'-'}</td></tr><tr><td style="${tdL}">Departemen</td><td style="${tdR}">${p.departemen||'-'}</td></tr><tr><td style="${tdL}">Tanggal MCU</td><td style="${tdR}">${tglMCU}</td></tr><tr><td style="${tdL}">Dokter Pemeriksa</td><td style="${tdR}">${p.dokterReview||'dr. Rasya Alvansyah'}</td></tr></table>
<div style="${secStyle}">II. ANAMNESA</div>
<table style="${tblStyle}"><tr><td style="${tdL}">Riwayat Penyakit Sekarang</td><td style="${tdR}">${p.pemDetail&&p.pemDetail.A1&&p.pemDetail.A1.keluhan?p.pemDetail.A1.keluhan:'-'}</td></tr><tr><td style="${tdL}">Riwayat Penyakit Dahulu</td><td style="${tdR}">-</td></tr><tr><td style="${tdL}">Riwayat Obat</td><td style="${tdR}">-</td></tr><tr><td style="${tdL}">Riwayat Penyakit Keluarga</td><td style="${tdR}">-</td></tr><tr><td style="${tdL}">Kebiasaan</td><td style="${tdR}">-</td></tr></table>
${pemFisikHTML?`<div style="${secStyle}">III. PEMERIKSAAN FISIK</div>${pemFisikHTML}`:`<div style="${secStyle}">III. PEMERIKSAAN FISIK</div><p style="font-size:12px;color:#718096;padding:12px;border:1px solid #e8ecf4;border-radius:8px">Data pemeriksaan fisik belum tersedia</p>`}
<div style="${secStyle}">IV. KESIMPULAN PEMERIKSAAN FISIK</div>
<div style="border:1px solid #e8ecf4;border-radius:8px;padding:16px"><p style="font-size:13px;color:#333">${p.kesimpulanFisik||'Baik'}</p></div>
<div style="${secStyle}">V. KESIMPULAN</div>
<div style="border:1px solid #e8ecf4;border-radius:8px;padding:16px"><ul style="font-size:12px;line-height:2;padding-left:20px;color:#333"><li>Status Gizi: baik</li><li>Tekanan Darah: Baik</li><li>Pemeriksaan Fisik: Baik</li><li>Laboratorium: Baik</li><li>Radiologi / Thorax: Baik</li><li>Treadmill / Jantung / EKG: Baik</li><li>Mata / Visus: Baik</li><li>Audiometri / THT: Baik</li><li>Gigi & Mulut: Baik</li></ul></div>
<div style="${secStyle}">VI. SARAN</div>
<div style="border:1px solid #e8ecf4;border-radius:8px;padding:16px"><ul style="font-size:12px;line-height:2;padding-left:20px;color:#333"><li>Status Gizi: untuk gizi sangat baik dan sudah cukup</li><li>Tekanan Darah: Baik</li><li>Pemeriksaan Fisik: Baik</li><li>Laboratorium: Baik</li><li>Radiologi / Thorax: Baik</li><li>Treadmill / Jantung / EKG: Baik</li><li>Mata / Visus: Baik</li><li>Audiometri / THT: Baik</li><li>Gigi & Mulut: Baik</li></ul></div>
<div style="${secStyle}">VII. KRITERIA STATUS MCU</div>
<div style="border:1px solid #e8ecf4;border-radius:8px;padding:16px"><div style="font-size:13px;line-height:2.2;color:#333"><label style="display:flex;align-items:center;gap:8px"><input type="checkbox" ${p.kesimpulan==='Fit'?'checked':''} disabled> Fit / Layak Bekerja</label><label style="display:flex;align-items:center;gap:8px"><input type="checkbox" ${p.kesimpulan==='Fit dengan Catatan'?'checked':''} disabled> Fit dengan Catatan</label><label style="display:flex;align-items:center;gap:8px"><input type="checkbox" disabled> Temporarily Unfit</label><label style="display:flex;align-items:center;gap:8px"><input type="checkbox" ${p.kesimpulan==='Unfit'?'checked':''} disabled> Unfit</label></div><p style="font-size:11px;color:#718096;font-style:italic;margin-top:8px">*Diisi oleh dokter pemeriksa</p></div>
${lampiranHTML}
<div style="display:flex;justify-content:space-between;margin-top:40px;padding-top:20px"><div style="border:1px solid #e8ecf4;border-radius:8px;padding:16px 20px;min-width:200px"><div style="font-size:10px;color:#718096;text-transform:uppercase">TANGGAL LAPORAN</div><div style="font-size:14px;font-weight:700;margin-top:4px">${tglLaporan}</div><div style="font-size:11px;color:#718096;margin-top:2px">Tanggal MCU: ${tglMCU}</div></div><div style="text-align:center;min-width:180px"><div style="font-size:10px;color:#718096;text-transform:uppercase">DOKTER PEMERIKSA</div><div style="border-bottom:1px solid #333;margin-top:50px;margin-bottom:6px"></div><div style="font-size:13px;font-weight:700">${p.dokterReview||'dr. Rasya Alvansyah'}</div><div style="font-size:11px;color:#718096">Dokter Penanggung Jawab MCU</div></div></div>
</div></div>`;}
function generateAll(){const data=D.filter(p=>p.kesimpulan);if(!data.length)return toast('Belum ada');data.forEach((p,i)=>setTimeout(()=>printPDF(p.id),i*800));toast(data.length+' laporan di-generate');}
function exportCSV(){const data=D.filter(p=>p.kesimpulan);if(!data.length)return toast('Belum ada data');let csv='ID,Nama,NIK,JenisKelamin,Perusahaan,Paket,Kesimpulan,Dokter,Catatan\n';data.forEach(p=>{csv+=`"${p.id}","${p.nama}","${p.nik}","${p.jenisKelamin||''}","${p.perusahaan||''}","${getPN(p.paketMCU)}","${p.kesimpulan}","${p.dokterReview||''}","${(p.catatanDokter||'').replace(/"/g,"'")}"\n`;});const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='laporan-mcu-'+new Date().toISOString().split('T')[0]+'.csv';a.click();toast('CSV exported');}
function exportSAP(){const data=D.filter(p=>p.kesimpulan);if(!data.length)return toast('Belum ada data');const sapData=data.map(p=>({PATIENT_ID:p.id,PATIENT_NAME:p.nama,NIK:p.nik,GENDER:p.jenisKelamin||'',DOB:p.tanggalLahir||'',COMPANY:p.perusahaan||'',PACKAGE:getPN(p.paketMCU),MCU_TYPE:p.jenisMCU||'',CONCLUSION:p.kesimpulan,DOCTOR:p.dokterReview||'',NOTES:p.catatanDokter||'',REVIEW_DATE:p.waktuReview||'',SAP_STATUS:p.kesimpulan==='Fit'?'FIT':p.kesimpulan==='Unfit'?'UNFIT':'FIT_WITH_NOTES'}));const json=JSON.stringify(sapData,null,2);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([json],{type:'application/json'}));a.download='mcu-sap-export-'+new Date().toISOString().split('T')[0]+'.json';a.click();toast('SAP data exported');}

// ===== DETAIL =====
function showDet(id){const p=D.find(x=>x.id===id);if(!p)return;document.getElementById('mDetTitle').textContent=p.nama;const items=getPI(p.paketMCU);const checked=items.filter(it=>p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].status==='Checked').length;const pct=items.length>0?Math.round(checked/items.length*100):0;let html=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;padding:16px;background:var(--bg);border-radius:var(--rs)"><div><small style="color:var(--text-muted)">ID</small><div style="font-weight:700;color:var(--p1)">${p.id}</div></div><div><small style="color:var(--text-muted)">NIK</small><div>${p.nik}</div></div><div><small style="color:var(--text-muted)">Perusahaan</small><div>${p.perusahaan||'Mandiri'}</div></div><div><small style="color:var(--text-muted)">Status</small><div>${sbg(p.status)}</div></div></div>`;if(p.qrCode){html+=`<div style="text-align:center;margin-bottom:16px"><img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(p.id)}" style="width:120px;height:120px"></div>`;}html+=`<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:6px"><span>Progress Pemeriksaan</span><span style="color:var(--p1)">${pct}% (${checked}/${items.length})</span></div><div class="pb"><div class="pf bl" style="width:${pct}%"></div></div></div>`;items.forEach(it=>{const st=p.pemeriksaan&&p.pemeriksaan[it]?p.pemeriksaan[it].status:'Pending';const ic=st==='Checked'?'ck':'pd';const icon=st==='Checked'?'fa-check-circle':'fa-clock';const data=p.pemeriksaan&&p.pemeriksaan[it]&&p.pemeriksaan[it].data?p.pemeriksaan[it].data:null;html+=`<div class="tk"><div class="tk-i ${ic}"><i class="fas ${icon}"></i></div><div class="tk-t"><h4>${it}</h4><p>${st}${data&&data.hasil?' - '+data.hasil:''}</p></div></div>`;});if(p.kesimpulan){html+=`<div style="margin-top:16px;padding:16px;border-radius:var(--rs);background:${p.kesimpulan==='Fit'?'var(--success-bg)':'var(--warning-bg)'};text-align:center"><strong style="font-size:16px">${p.kesimpulan}</strong><br><small style="color:var(--text-muted)">Dokter: ${p.dokterReview||'-'}</small></div>`;}document.getElementById('mDetBody').innerHTML=html;openM('mDet');}

// ===== QR SCANNER =====
let html5QrScanner=null;
function openScanner(){openM('mScanner');document.getElementById('qrStatus').textContent='Klik tombol untuk mulai scan';document.getElementById('qrReader').innerHTML='';}
function closeScanner(){if(html5QrScanner){html5QrScanner.stop().catch(()=>{});html5QrScanner.clear();html5QrScanner=null;}closeM('mScanner');}
function startQRScan(){
  document.getElementById('qrStatus').textContent='Mendeteksi kamera...';
  if(typeof Html5Qrcode==='undefined'){toast('Library scanner tidak tersedia');return;}
  html5QrScanner=new Html5Qrcode('qrReader');
  Html5Qrcode.getCameras().then(cameras=>{
    if(!cameras||!cameras.length){document.getElementById('qrStatus').textContent='Tidak ada kamera terdeteksi';return;}
    const camId=cameras.length>1?cameras[1].id:cameras[0].id;
    document.getElementById('qrStatus').textContent='Scanning... Arahkan ke QR Code';
    document.getElementById('btnStartScan').style.display='none';
    html5QrScanner.start(camId,{fps:10,qrbox:{width:250,height:250}},onQRSuccess,()=>{}).catch(err=>{document.getElementById('qrStatus').textContent='Error: '+err;});
  }).catch(err=>{document.getElementById('qrStatus').textContent='Gagal akses kamera: '+err;});
}
function onQRSuccess(decodedText){
  if(html5QrScanner){html5QrScanner.stop().catch(()=>{});}
  document.getElementById('qrStatus').textContent='QR Terdeteksi: '+decodedText;
  document.getElementById('btnStartScan').style.display='inline-block';
  // Find peserta
  const p=D.find(x=>x.id===decodedText||x.qrCode===decodedText);
  if(p){closeScanner();showStatusResult(p);showTrackDetail(p.id);toast('Peserta ditemukan: '+p.nama);}else{toast('ID tidak ditemukan: '+decodedText);}
}
function resolveManualScan(){const val=(document.getElementById('scanManualInput').value||'').trim();if(!val)return toast('Masukkan ID peserta');const p=D.find(x=>x.id===val||x.id.includes(val)||x.nama.toLowerCase().includes(val.toLowerCase()));if(p){closeScanner();showStatusResult(p);toast('Peserta ditemukan: '+p.nama);}else{toast('Peserta tidak ditemukan');}}

// INIT
function checkLogin(){const user=localStorage.getItem('mcu_user');if(!user){document.getElementById('loginScreen').style.display='flex';document.querySelector('.app').style.display='none';}else{document.getElementById('loginScreen').style.display='none';document.querySelector('.app').style.display='flex';const u=JSON.parse(user);document.getElementById('homeUser').textContent=u.nama||'Admin';const au=document.getElementById('appUser');if(au)au.textContent=u.nama||'Admin';}}
function doLogin(){const user=(document.getElementById('loginUser').value||'').trim();const pass=(document.getElementById('loginPass').value||'');if(!user||!pass)return toast('Username dan password wajib diisi');
  const btn=document.getElementById('btnLogin');if(btn){btn.textContent='MEMPROSES...';btn.style.background='#6B7280';btn.disabled=true;}
  setTimeout(()=>{if((user==='admin'&&pass==='admin123')||(user==='dokter'&&pass==='dokter123')||(user==='perawat'&&pass==='perawat123')||(user==='Jordan'&&pass==='Jordan123')){localStorage.setItem('mcu_user',JSON.stringify({username:user,nama:user.charAt(0).toUpperCase()+user.slice(1),role:user}));checkLogin();toast('Login berhasil');}else{toast('Username atau password salah');if(btn){btn.textContent='LOG IN';btn.style.background='#1a3a6b';btn.disabled=false;}}},1500);}
function togglePass(){const p=document.getElementById('loginPass');const i=document.getElementById('passIcon');if(p.type==='password'){p.type='text';i.className='fas fa-eye-slash';}else{p.type='password';i.className='fas fa-eye';}}
function logoutUser(){localStorage.removeItem('mcu_user');checkLogin();}
function backToHome(){document.getElementById('homeScreen').style.display='block';document.getElementById('appContent').style.display='none';const sb=document.querySelector('.sb');if(sb)sb.style.display='none';const mn=document.querySelector('.mn');if(mn){mn.style.marginLeft='0';mn.style.background='transparent';}}
function enterModule(page){document.getElementById('homeScreen').style.display='none';document.getElementById('appContent').style.display='block';const sb=document.querySelector('.sb');if(sb)sb.style.display='none';const mn=document.querySelector('.mn');if(mn){mn.style.marginLeft='0';mn.style.background='';}showPage(page);}

// ===== MASTER DATA TABS =====
function switchMasterTab(tab){
  document.querySelectorAll('.master-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.master-nav-item').forEach(n=>n.classList.remove('active'));
  const el=document.getElementById('masterTab'+tab.charAt(0).toUpperCase()+tab.slice(1));
  if(el)el.classList.add('active');
  const navs=document.querySelectorAll('.master-nav-item');
  const tabs=['pengguna','level','rs','paket','tipeorder','gruporder','peserta','status'];
  const idx=tabs.indexOf(tab);
  if(idx>=0&&navs[idx])navs[idx].classList.add('active');
  if(tab==='pengguna')renderUsers();
  else if(tab==='level')renderLevels();
  else if(tab==='rs')renderUnits();
  else if(tab==='paket')renderPaketMCU();
  else if(tab==='tipeorder')renderTipeOrder();
  else if(tab==='gruporder')renderGrupOrder();
  else if(tab==='status')renderStatusAlur();
  else if(tab==='peserta'){D=getAllPeserta();rPT(D);}
}

// ===== USER MANAGEMENT =====
function getAllUsers(){return JSON.parse(localStorage.getItem('mcu_users')||'[]');}
function saveAllUsers(users){localStorage.setItem('mcu_users',JSON.stringify(users));}
function initDefaultUsers(){
  if(localStorage.getItem('mcu_users'))return;
  const defaults=[
    {id:'u1',nama:'Jordan',username:'jordan',password:'Jordan123',level:'Administrator',rs:'Mitra Keluarga Corporate',status:'Aktif'},
    {id:'u2',nama:'dr. Sri',username:'drsri',password:'drsri123',level:'Administrator',rs:'Akses Global',status:'Nonaktif'},
    {id:'u3',nama:'Citra',username:'citra',password:'citra123',level:'Administrator',rs:'Mitra Keluarga Corporate',status:'Aktif'},
    {id:'u4',nama:'joyce',username:'joyce',password:'joyce123',level:'Administrator',rs:'Mitra Keluarga Corporate',status:'Nonaktif'},
    {id:'u5',nama:'steve',username:'steve_mcu',password:'steve123',level:'Administrator',rs:'Mitra Keluarga Corporate',status:'Aktif'},
    {id:'u6',nama:'Ali',username:'ali',password:'ali123',level:'Administrator',rs:'Akses Global',status:'Aktif'},
    {id:'u7',nama:'Rasya Alvansyah',username:'rasya',password:'rasya123',level:'Administrator',rs:'Akses Global',status:'Aktif'}
  ];
  saveAllUsers(defaults);
}
function renderUsers(){
  initDefaultUsers();
  const users=getAllUsers();
  const q=(document.getElementById('srcUser')?document.getElementById('srcUser').value:'').toLowerCase();
  const filtered=q?users.filter(u=>u.nama.toLowerCase().includes(q)||u.username.toLowerCase().includes(q)):users;
  document.getElementById('userCount').textContent=filtered.length+' Pengguna';
  document.getElementById('userTb').innerHTML=filtered.map((u,i)=>{
    const stColor=u.status==='Aktif'?'#059669':'#6B7280';
    const stBg=u.status==='Aktif'?'rgba(5,150,105,.1)':'rgba(107,114,128,.1)';
    return `<tr>
      <td>${i+1}</td>
      <td><div style="font-weight:600">${u.nama}</div><div style="font-size:11px;color:var(--text-muted)">@${u.username}</div></td>
      <td><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:6px;height:6px;border-radius:50%;background:var(--g1)"></span>${u.level}</span></td>
      <td style="font-size:13px;color:var(--text-light)">${u.rs||'Akses Global'}</td>
      <td><span style="padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;background:${stBg};color:${stColor}">${u.status==='Aktif'?'● AKTIF':'● NONAKTIF'}</span></td>
      <td><button class="btn btn-o btn-sm" onclick="editUser('${u.id}')" title="Edit"><i class="fas fa-key"></i></button> <button class="btn btn-o btn-sm" onclick="editUser('${u.id}')" title="Edit"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delUser('${u.id}')" title="Hapus"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }).join('')||'<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--text-muted)">Belum ada pengguna</td></tr>';
}
function filterUsers(){renderUsers();}
function saveUser(){
  const nama=document.getElementById('fuNama').value.trim();
  const username=document.getElementById('fuUsername').value.trim();
  const password=document.getElementById('fuPassword').value;
  const level=document.getElementById('fuLevel').value;
  const rs=document.getElementById('fuRS').value;
  const editId=document.getElementById('fuId').value;
  if(!nama||!username||!password)return toast('Nama, username, dan password wajib diisi');
  if(password.length<6)return toast('Password minimal 6 karakter');
  if(!level)return toast('Pilih level akses');
  const users=getAllUsers();
  if(editId){
    const idx=users.findIndex(u=>u.id===editId);
    if(idx>=0){users[idx]={...users[idx],nama,username,password,level,rs};saveAllUsers(users);toast('Pengguna diupdate');}
  }else{
    const dup=users.find(u=>u.username===username);
    if(dup)return toast('Username sudah digunakan');
    users.push({id:'u'+Date.now(),nama,username,password,level,rs:rs||'Akses Global',status:'Aktif'});
    saveAllUsers(users);toast('Pengguna ditambahkan');
  }
  closeM('mUser');renderUsers();
  document.getElementById('fuNama').value='';document.getElementById('fuUsername').value='';document.getElementById('fuPassword').value='';document.getElementById('fuLevel').value='';document.getElementById('fuRS').value='Akses Global';document.getElementById('fuId').value='';
}
function editUser(id){
  const users=getAllUsers();const u=users.find(x=>x.id===id);if(!u)return;
  document.getElementById('fuId').value=u.id;
  document.getElementById('fuNama').value=u.nama;
  document.getElementById('fuUsername').value=u.username;
  document.getElementById('fuPassword').value=u.password;
  document.getElementById('fuLevel').value=u.level;
  document.getElementById('fuRS').value=u.rs||'Akses Global';
  openM('mUser');
}
function delUser(id){if(!confirm('Hapus pengguna ini?'))return;const users=getAllUsers().filter(u=>u.id!==id);saveAllUsers(users);toast('Pengguna dihapus');renderUsers();}

// ===== LEVEL AKSES MANAGEMENT =====
function getAllLevels(){return JSON.parse(localStorage.getItem('mcu_levels')||'[]');}
function saveAllLevels(levels){localStorage.setItem('mcu_levels',JSON.stringify(levels));}
function initDefaultLevels(){
  if(localStorage.getItem('mcu_levels'))return;
  const defaults=[
    {id:'lv1',kode:'ADMIN',nama:'Administrator',deskripsi:'Super akses semua modul (Master Data, Operasional, Medis)',status:'Aktif'},
    {id:'lv2',kode:'MEDIS',nama:'Tenaga Medis',deskripsi:'Akses modul Pemeriksaan Medis dan Laporan',status:'Aktif'},
    {id:'lv3',kode:'REGISTRASI',nama:'Petugas Pendaftaran',deskripsi:'Akses modul Pendaftaran',status:'Aktif'}
  ];
  saveAllLevels(defaults);
}
function renderLevels(){
  initDefaultLevels();
  const levels=getAllLevels();
  const q=(document.getElementById('srcLevel')?document.getElementById('srcLevel').value:'').toLowerCase();
  const filtered=q?levels.filter(l=>l.nama.toLowerCase().includes(q)||l.kode.toLowerCase().includes(q)):levels;
  document.getElementById('levelCount').textContent=filtered.length+' Level Akses';
  document.getElementById('levelTb').innerHTML=filtered.map((l,i)=>{
    return `<tr>
      <td>${i+1}</td>
      <td><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px">${l.kode}</div><div style="font-weight:700;font-size:14px">${l.nama}</div></td>
      <td style="font-size:13px;color:var(--text-light)">${l.deskripsi||'-'}</td>
      <td><span style="padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(5,150,105,.1);color:#059669">● AKTIF</span></td>
      <td><button class="btn btn-o btn-sm" onclick="editLevel('${l.id}')" title="Edit"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delLevel('${l.id}')" title="Hapus"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }).join('')||'<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--text-muted)">Belum ada level akses</td></tr>';
}
function filterLevels(){renderLevels();}
function saveLevel(){
  const kode=document.getElementById('flKode').value.trim().toUpperCase();
  const nama=document.getElementById('flNama').value.trim();
  const deskripsi=document.getElementById('flDesc').value.trim();
  const editId=document.getElementById('flId').value;
  if(!kode||!nama)return toast('Kode sistem dan nama level wajib diisi');
  const levels=getAllLevels();
  if(editId){
    const idx=levels.findIndex(l=>l.id===editId);
    if(idx>=0){levels[idx]={...levels[idx],kode,nama,deskripsi};saveAllLevels(levels);toast('Level diupdate');}
  }else{
    const dup=levels.find(l=>l.kode===kode);
    if(dup)return toast('Kode sistem sudah digunakan');
    levels.push({id:'lv'+Date.now(),kode,nama,deskripsi,status:'Aktif'});
    saveAllLevels(levels);toast('Level ditambahkan');
  }
  closeM('mLevel');renderLevels();
  document.getElementById('flKode').value='';document.getElementById('flNama').value='';document.getElementById('flDesc').value='';document.getElementById('flId').value='';
}
function editLevel(id){
  const levels=getAllLevels();const l=levels.find(x=>x.id===id);if(!l)return;
  document.getElementById('flId').value=l.id;
  document.getElementById('flKode').value=l.kode;
  document.getElementById('flNama').value=l.nama;
  document.getElementById('flDesc').value=l.deskripsi||'';
  openM('mLevel');
}
function delLevel(id){if(!confirm('Hapus level ini?'))return;const levels=getAllLevels().filter(l=>l.id!==id);saveAllLevels(levels);toast('Level dihapus');renderLevels();}

// ===== UNIT/RS MANAGEMENT =====
function getAllUnits(){return JSON.parse(localStorage.getItem('mcu_units')||'[]');}
function saveAllUnits(units){localStorage.setItem('mcu_units',JSON.stringify(units));}
function initDefaultUnits(){
  if(localStorage.getItem('mcu_units'))return;
  const defaults=[
    {id:'rs1',kode:'MK-CORPORATE',nama:'Mitra Keluarga Corporate',status:'Beroperasi'},
    {id:'rs2',kode:'MK-DELTAMAS',nama:'Mitra Keluarga Deltamas',status:'Beroperasi'},
    {id:'rs3',kode:'MK-CIKARANG',nama:'Mitra Keluarga Cikarang',status:'Beroperasi'},
    {id:'rs4',kode:'MK-BINTARO',nama:'Mitra Keluarga Bintaro',status:'Beroperasi'},
    {id:'rs5',kode:'MK-BINA-HUSADA',nama:'Mitra Keluarga Bina Husada',status:'Beroperasi'},
    {id:'rs6',kode:'MK-BEKASI-BARAT',nama:'Mitra Keluarga Bekasi Barat',status:'Beroperasi'},
    {id:'rs7',kode:'MIKA-BKS-TIMUR',nama:'Mitra Keluarga Bekasi Timur',status:'Beroperasi'},
    {id:'rs8',kode:'MK-KELAPA-GADING',nama:'Mitra Keluarga Kelapa Gading',status:'Beroperasi'},
    {id:'rs9',kode:'MK-KEMAYORAN',nama:'Mitra Keluarga Kemayoran',status:'Beroperasi'},
    {id:'rs10',kode:'MK-DEPOK',nama:'Mitra Keluarga Depok',status:'Beroperasi'}
  ];
  saveAllUnits(defaults);
}
function renderUnits(){
  initDefaultUnits();
  const units=getAllUnits();
  const q=(document.getElementById('srcRS2')?document.getElementById('srcRS2').value:'').toLowerCase();
  const filtered=q?units.filter(u=>u.nama.toLowerCase().includes(q)||u.kode.toLowerCase().includes(q)):units;
  document.getElementById('rsCount').textContent=filtered.length+' Lokasi';
  document.getElementById('rsTb2').innerHTML=filtered.map((u,i)=>{
    return `<tr>
      <td>${i+1}</td>
      <td><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px">${u.kode}</div><div style="font-weight:700;font-size:14px">${u.nama}</div></td>
      <td><span style="padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(5,150,105,.1);color:#059669">● BEROPERASI</span></td>
      <td><button class="btn btn-o btn-sm" onclick="editUnit('${u.id}')" title="Edit"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delUnit('${u.id}')" title="Hapus"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }).join('')||'<tr><td colspan="4" style="text-align:center;padding:30px;color:var(--text-muted)">Belum ada unit/RS</td></tr>';
}
function filterRS2(){renderUnits();}
function saveUnit(){
  const kode=document.getElementById('fuKodeUnit').value.trim().toUpperCase();
  const nama=document.getElementById('fuNamaUnit').value.trim();
  const editId=document.getElementById('fuUnitId').value;
  if(!kode||!nama)return toast('Kode unit dan nama institusi wajib diisi');
  const units=getAllUnits();
  if(editId){
    const idx=units.findIndex(u=>u.id===editId);
    if(idx>=0){units[idx]={...units[idx],kode,nama};saveAllUnits(units);toast('Unit/RS diupdate');}
  }else{
    const dup=units.find(u=>u.kode===kode);
    if(dup)return toast('Kode unit sudah digunakan');
    units.push({id:'rs'+Date.now(),kode,nama,status:'Beroperasi'});
    saveAllUnits(units);toast('Unit/RS ditambahkan');
  }
  closeM('mUnit');renderUnits();
  document.getElementById('fuKodeUnit').value='';document.getElementById('fuNamaUnit').value='';document.getElementById('fuUnitId').value='';
}
function editUnit(id){
  const units=getAllUnits();const u=units.find(x=>x.id===id);if(!u)return;
  document.getElementById('fuUnitId').value=u.id;
  document.getElementById('fuKodeUnit').value=u.kode;
  document.getElementById('fuNamaUnit').value=u.nama;
  openM('mUnit');
}
function delUnit(id){if(!confirm('Hapus unit/RS ini?'))return;const units=getAllUnits().filter(u=>u.id!==id);saveAllUnits(units);toast('Unit/RS dihapus');renderUnits();}

// ===== PAKET MCU MANAGEMENT (NEW) =====
function getAllPaketMCU(){return JSON.parse(localStorage.getItem('mcu_paket_mcu')||'[]');}
function saveAllPaketMCU(data){localStorage.setItem('mcu_paket_mcu',JSON.stringify(data));}
function initDefaultPaketMCU(){
  // Force update to v2 data
  if(localStorage.getItem('mcu_paket_mcu_v2')){}else{localStorage.removeItem('mcu_paket_mcu');localStorage.setItem('mcu_paket_mcu_v2','1');}
  if(localStorage.getItem('mcu_paket_mcu'))return;
  const defaults=[
    {id:'pkt1',kode:'MCU-B-01',nama:'MCU Karyawan Dasar (Basic)',items:['Pemeriksaan Tanda Vital & Fisik Dokter','Pengambilan Darah Rutin (Hematologi)','Pemeriksaan Urine Lengkap','Rontgen Thorax (Dada)'],status:'Aktif'},
    {id:'pkt2',kode:'MCU-EX-01',nama:'MCU Eksekutif Lengkap',items:['Pemeriksaan Tanda Vital & Fisik Dokter Spesialis','Pengambilan Darah Lengkap (Kimia Klinik)','Pemeriksaan Urine & Feses','Rontgen Thorax (Dada)','USG Abdomen Keseluruhan','Rekam Jantung Treadmill (ECG Stress)','Audiometri & Spirometri'],status:'Aktif'},
    {id:'pkt3',kode:'MCU-JT-01',nama:'MCU Khusus Jantung (Cardio)',items:['Pemeriksaan Tanda Vital & Fisik Dokter Jantung','Profil Lipid Darah & Gula Darah','Treadmill Test / EKG','Echocardiography (USG Jantung)'],status:'Aktif'},
    {id:'pkt4',kode:'MCU-CP-01',nama:'MCU Calon Karyawan (Pre-employment)',items:['Pemeriksaan Fisik Dasar','Pemeriksaan Buta Warna','Cek Darah Perifer Lengkap','Drug Test (Bebas Narkoba) 3 Parameter'],status:'Aktif'}
  ];
  saveAllPaketMCU(defaults);
}
let paket2Items=[];
function renderPaketMCU(){
  initDefaultPaketMCU();
  const pakets=getAllPaketMCU();
  const q=(document.getElementById('srcPaket2')?document.getElementById('srcPaket2').value:'').toLowerCase();
  const filtered=q?pakets.filter(p=>p.nama.toLowerCase().includes(q)||p.kode.toLowerCase().includes(q)):pakets;
  document.getElementById('paketCount').textContent=filtered.length+' Paket Aktif';
  document.getElementById('paketTb2').innerHTML=filtered.map((p,i)=>{
    return `<tr>
      <td>${i+1}</td>
      <td><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px">${p.kode}</div><div style="font-weight:700;font-size:14px">${p.nama}</div></td>
      <td><span style="padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(5,150,105,.1);color:#059669">● AKTIF</span></td>
      <td><button class="btn btn-o btn-sm" onclick="editPaket2('${p.id}')" title="Edit"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delPaket2('${p.id}')" title="Hapus"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }).join('')||'<tr><td colspan="4" style="text-align:center;padding:30px;color:var(--text-muted)">Belum ada paket</td></tr>';
}
function filterPaket2(){renderPaketMCU();}
function openAddPaket2(){
  document.getElementById('fp2Kode').value='';document.getElementById('fp2Nama').value='';document.getElementById('fp2Id').value='';
  paket2Items=[{nama:'',urutan:1,aktif:true}];
  renderPaket2Items();
  openM('mPaket2');
}
function renderPaket2Items(){
  document.getElementById('fp2Items').innerHTML=paket2Items.map((it,i)=>`
    <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f8fafc;border:1.5px solid var(--border);border-radius:10px">
      <i class="fas fa-grip-vertical" style="color:var(--text-muted);font-size:12px;cursor:grab"></i>
      <input type="text" value="${it.nama}" placeholder="Nama Pemeriksaan..." oninput="paket2Items[${i}].nama=this.value" style="flex:1;padding:8px 12px;border:none;background:transparent;font-size:13px;font-family:inherit;outline:none">
      <input type="number" value="${it.urutan}" min="1" style="width:40px;padding:6px;border:1.5px solid var(--border);border-radius:6px;font-size:12px;text-align:center;font-family:inherit" oninput="paket2Items[${i}].urutan=parseInt(this.value)||1">
      <input type="checkbox" ${it.aktif?'checked':''} onchange="paket2Items[${i}].aktif=this.checked" style="width:18px;height:18px;accent-color:var(--g1)">
      <button onclick="paket2Items.splice(${i},1);renderPaket2Items()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px;padding:4px">&times;</button>
    </div>
  `).join('');
}
function addPaket2Item(){
  paket2Items.push({nama:'',urutan:paket2Items.length+1,aktif:true});
  renderPaket2Items();
}
function savePaket2(){
  const kode=document.getElementById('fp2Kode').value.trim().toUpperCase();
  const nama=document.getElementById('fp2Nama').value.trim();
  const editId=document.getElementById('fp2Id').value;
  if(!kode||!nama)return toast('Kode dan nama paket wajib diisi');
  const items=paket2Items.filter(it=>it.nama.trim()).map(it=>it.nama.trim());
  if(!items.length)return toast('Minimal 1 item pemeriksaan');
  const pakets=getAllPaketMCU();
  if(editId){
    const idx=pakets.findIndex(p=>p.id===editId);
    if(idx>=0){pakets[idx]={...pakets[idx],kode,nama,items};saveAllPaketMCU(pakets);toast('Paket diupdate');}
  }else{
    const dup=pakets.find(p=>p.kode===kode);
    if(dup)return toast('Kode paket sudah digunakan');
    pakets.push({id:'pkt'+Date.now(),kode,nama,items,status:'Aktif'});
    saveAllPaketMCU(pakets);toast('Paket ditambahkan');
  }
  closeM('mPaket2');renderPaketMCU();
}
function editPaket2(id){
  const pakets=getAllPaketMCU();const p=pakets.find(x=>x.id===id);if(!p)return;
  document.getElementById('fp2Id').value=p.id;
  document.getElementById('fp2Kode').value=p.kode;
  document.getElementById('fp2Nama').value=p.nama;
  paket2Items=(p.items||[]).map((it,i)=>({nama:it,urutan:i+1,aktif:true}));
  if(!paket2Items.length)paket2Items=[{nama:'',urutan:1,aktif:true}];
  renderPaket2Items();
  openM('mPaket2');
}
function delPaket2(id){if(!confirm('Hapus paket ini?'))return;const pakets=getAllPaketMCU().filter(p=>p.id!==id);saveAllPaketMCU(pakets);toast('Paket dihapus');renderPaketMCU();}

// ===== TIPE ORDER MANAGEMENT =====
function getAllTipeOrder(){return JSON.parse(localStorage.getItem('mcu_tipe_order')||'[]');}
function saveAllTipeOrder(data){localStorage.setItem('mcu_tipe_order',JSON.stringify(data));}
function renderTipeOrder(){
  const tipes=getAllTipeOrder();
  const q=(document.getElementById('srcTipe')?document.getElementById('srcTipe').value:'').toLowerCase();
  const filtered=q?tipes.filter(t=>t.nama.toLowerCase().includes(q)||t.kode.toLowerCase().includes(q)):tipes;
  document.getElementById('tipeCount').textContent=filtered.length+' Tipe Order';
  document.getElementById('tipeTb').innerHTML=filtered.length?filtered.map((t,i)=>{
    return `<tr>
      <td>${i+1}</td>
      <td><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px">${t.kode}</div><div style="font-weight:700;font-size:14px">${t.nama}</div></td>
      <td style="font-size:13px;color:var(--text-light)">${t.deskripsi||'-'}</td>
      <td><span style="padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(5,150,105,.1);color:#059669">● AKTIF</span></td>
      <td><button class="btn btn-o btn-sm" onclick="editTipeOrder('${t.id}')" title="Edit"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delTipeOrder('${t.id}')" title="Hapus"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }).join(''):'<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--text-muted);font-style:italic">Data tidak ditemukan.</td></tr>';
}
function filterTipeOrder(){renderTipeOrder();}
function saveTipeOrder(){
  const kode=document.getElementById('ftKode').value.trim().toUpperCase();
  const nama=document.getElementById('ftNama').value.trim();
  const deskripsi=document.getElementById('ftDesc').value.trim();
  const editId=document.getElementById('ftId').value;
  if(!kode||!nama)return toast('Kode tipe dan nama wajib diisi');
  const tipes=getAllTipeOrder();
  if(editId){
    const idx=tipes.findIndex(t=>t.id===editId);
    if(idx>=0){tipes[idx]={...tipes[idx],kode,nama,deskripsi};saveAllTipeOrder(tipes);toast('Tipe order diupdate');}
  }else{
    const dup=tipes.find(t=>t.kode===kode);
    if(dup)return toast('Kode tipe sudah digunakan');
    tipes.push({id:'tp'+Date.now(),kode,nama,deskripsi,status:'Aktif'});
    saveAllTipeOrder(tipes);toast('Tipe order ditambahkan');
  }
  closeM('mTipe');renderTipeOrder();
  document.getElementById('ftKode').value='';document.getElementById('ftNama').value='';document.getElementById('ftDesc').value='';document.getElementById('ftId').value='';
}
function editTipeOrder(id){
  const tipes=getAllTipeOrder();const t=tipes.find(x=>x.id===id);if(!t)return;
  document.getElementById('ftId').value=t.id;
  document.getElementById('ftKode').value=t.kode;
  document.getElementById('ftNama').value=t.nama;
  document.getElementById('ftDesc').value=t.deskripsi||'';
  openM('mTipe');
}
function delTipeOrder(id){if(!confirm('Hapus tipe order ini?'))return;const tipes=getAllTipeOrder().filter(t=>t.id!==id);saveAllTipeOrder(tipes);toast('Tipe order dihapus');renderTipeOrder();}

// ===== GRUP ORDER MANAGEMENT =====
function getAllGrupOrder(){return JSON.parse(localStorage.getItem('mcu_grup_order')||'[]');}
function saveAllGrupOrder(data){localStorage.setItem('mcu_grup_order',JSON.stringify(data));}
function renderGrupOrder(){
  const grups=getAllGrupOrder();
  const q=(document.getElementById('srcGrup')?document.getElementById('srcGrup').value:'').toLowerCase();
  const filtered=q?grups.filter(g=>g.nama.toLowerCase().includes(q)||g.kode.toLowerCase().includes(q)):grups;
  document.getElementById('grupCount').textContent=filtered.length+' Group Order';
  document.getElementById('grupTb').innerHTML=filtered.length?filtered.map((g,i)=>{
    return `<tr>
      <td>${i+1}</td>
      <td><div style="font-weight:700;font-size:14px">${g.nama}</div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px">${g.kode}</div></td>
      <td style="font-size:13px;color:var(--text-light)">${g.tipe||'-'}</td>
      <td><span style="padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(5,150,105,.1);color:#059669">● AKTIF</span></td>
      <td><button class="btn btn-o btn-sm" onclick="editGrupOrder('${g.id}')" title="Edit"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delGrupOrder('${g.id}')" title="Hapus"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }).join(''):'<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--text-muted);font-style:italic">Data tidak ditemukan.</td></tr>';
}
function filterGrupOrder(){renderGrupOrder();}
function openAddGrup(){
  document.getElementById('fgKode').value='';document.getElementById('fgNama').value='';document.getElementById('fgDesc').value='';document.getElementById('fgId').value='';
  // Load tipe order options
  const tipes=getAllTipeOrder();
  document.getElementById('fgTipe').innerHTML='<option value="">-- Pilih --</option>'+tipes.map(t=>`<option value="${t.nama}">${t.nama}</option>`).join('');
  openM('mGrup');
}
function saveGrupOrder(){
  const kode=document.getElementById('fgKode').value.trim().toUpperCase();
  const tipe=document.getElementById('fgTipe').value;
  const nama=document.getElementById('fgNama').value.trim();
  const deskripsi=document.getElementById('fgDesc').value.trim();
  const editId=document.getElementById('fgId').value;
  if(!kode||!nama)return toast('Kode dan nama group wajib diisi');
  if(!tipe)return toast('Pilih tipe order');
  const grups=getAllGrupOrder();
  if(editId){
    const idx=grups.findIndex(g=>g.id===editId);
    if(idx>=0){grups[idx]={...grups[idx],kode,tipe,nama,deskripsi};saveAllGrupOrder(grups);toast('Group order diupdate');}
  }else{
    const dup=grups.find(g=>g.kode===kode);
    if(dup)return toast('Kode sudah digunakan');
    grups.push({id:'grp'+Date.now(),kode,tipe,nama,deskripsi,status:'Aktif'});
    saveAllGrupOrder(grups);toast('Group order ditambahkan');
  }
  closeM('mGrup');renderGrupOrder();
}
function editGrupOrder(id){
  const grups=getAllGrupOrder();const g=grups.find(x=>x.id===id);if(!g)return;
  document.getElementById('fgId').value=g.id;
  document.getElementById('fgKode').value=g.kode;
  document.getElementById('fgNama').value=g.nama;
  document.getElementById('fgDesc').value=g.deskripsi||'';
  const tipes=getAllTipeOrder();
  document.getElementById('fgTipe').innerHTML='<option value="">-- Pilih --</option>'+tipes.map(t=>`<option value="${t.nama}"${t.nama===g.tipe?' selected':''}>${t.nama}</option>`).join('');
  openM('mGrup');
}
function delGrupOrder(id){if(!confirm('Hapus group order ini?'))return;const grups=getAllGrupOrder().filter(g=>g.id!==id);saveAllGrupOrder(grups);toast('Group order dihapus');renderGrupOrder();}

// ===== STATUS & ALUR MANAGEMENT =====
function getAllStatusAlur(){return JSON.parse(localStorage.getItem('mcu_status_alur')||'[]');}
function saveAllStatusAlur(data){localStorage.setItem('mcu_status_alur',JSON.stringify(data));}
function initDefaultStatusAlur(){
  if(localStorage.getItem('mcu_status_alur'))return;
  const defaults=[
    {id:'st1',kode:'REG-NEW',label:'Belum Registrasi',kategori:'REGISTRASI',urutan:1,status:'Aktif'},
    {id:'st2',kode:'REG-DONE',label:'Sudah Registrasi',kategori:'REGISTRASI',urutan:2,status:'Aktif'},
    {id:'st3',kode:'REG-CANCEL',label:'Dibatalkan',kategori:'REGISTRASI',urutan:3,status:'Aktif'},
    {id:'st4',kode:'REG-FINISH',label:'Selesai',kategori:'REGISTRASI',urutan:4,status:'Aktif'},
    {id:'st5',kode:'EXAM-NEW',label:'Belum Mulai',kategori:'PEMERIKSAAN',urutan:1,status:'Aktif'},
    {id:'st6',kode:'EXAM-GEN',label:'Generalis Terisi',kategori:'PEMERIKSAAN',urutan:2,status:'Aktif'},
    {id:'st7',kode:'EXAM-DONE',label:'Selesai',kategori:'PEMERIKSAAN',urutan:3,status:'Aktif'},
    {id:'st8',kode:'JRN-WAIT',label:'Belum',kategori:'JOURNEY',urutan:1,status:'Aktif'},
    {id:'st9',kode:'JRN-HOLD',label:'Ditunda',kategori:'JOURNEY',urutan:2,status:'Aktif'},
    {id:'st10',kode:'JRN-DONE',label:'Selesai',kategori:'JOURNEY',urutan:3,status:'Aktif'},
    {id:'st11',kode:'RPT-DRAFT',label:'Draft',kategori:'LAPORAN',urutan:1,status:'Aktif'},
    {id:'st12',kode:'RPT-PARTIAL',label:'Parsial',kategori:'LAPORAN',urutan:2,status:'Aktif'},
    {id:'st13',kode:'RPT-READY',label:'Siap Dicetak',kategori:'LAPORAN',urutan:3,status:'Aktif'}
  ];
  saveAllStatusAlur(defaults);
}
function renderStatusAlur(){
  initDefaultStatusAlur();
  const statuses=getAllStatusAlur();
  const q=(document.getElementById('srcStatus')?document.getElementById('srcStatus').value:'').toLowerCase();
  const filtered=q?statuses.filter(s=>s.label.toLowerCase().includes(q)||s.kode.toLowerCase().includes(q)||s.kategori.toLowerCase().includes(q)):statuses;
  document.getElementById('statusCount').textContent=filtered.length+' Label Status';
  const katColors={'REGISTRASI':'#3B82F6','PEMERIKSAAN':'#8B5CF6','JOURNEY':'#F59E0B','LAPORAN':'#10B981'};
  document.getElementById('statusTb').innerHTML=filtered.map((s,i)=>{
    const color=katColors[s.kategori]||'#6B7280';
    return `<tr>
      <td>${i+1}</td>
      <td><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;font-family:monospace">${s.kode}</div><div style="font-weight:700;font-size:14px">${s.label}</div></td>
      <td><span style="padding:4px 12px;border-radius:6px;font-size:11px;font-weight:700;background:${color}15;color:${color};text-transform:uppercase;letter-spacing:.3px">${s.kategori}</span></td>
      <td style="text-align:center;font-weight:600">${s.urutan}</td>
      <td><span style="padding:4px 10px;border-radius:20px;font-size:10px;font-weight:700;background:rgba(5,150,105,.1);color:#059669">● AKTIF</span></td>
      <td><button class="btn btn-o btn-sm" onclick="editStatusAlur('${s.id}')" title="Edit"><i class="fas fa-edit"></i></button> <button class="btn btn-d btn-sm" onclick="delStatusAlur('${s.id}')" title="Hapus"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  }).join('')||'<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--text-muted);font-style:italic">Data tidak ditemukan.</td></tr>';
}
function filterStatusAlur(){renderStatusAlur();}
function saveStatusAlur(){
  const kategoriMap={'Registrasi (Front Office)':'REGISTRASI','Pemeriksaan (Medical Team)':'PEMERIKSAAN','Journey (Internal Log)':'JOURNEY','Laporan (Diagnostic Doc)':'LAPORAN'};
  const kategoriVal=document.getElementById('fsKategori').value;
  const kategori=kategoriMap[kategoriVal]||kategoriVal.toUpperCase();
  const kode=document.getElementById('fsKode').value.trim().toUpperCase();
  const urutan=parseInt(document.getElementById('fsUrutan').value)||0;
  const label=document.getElementById('fsLabel').value.trim();
  const editId=document.getElementById('fsId').value;
  if(!kode||!label)return toast('System code dan label status wajib diisi');
  const statuses=getAllStatusAlur();
  if(editId){
    const idx=statuses.findIndex(s=>s.id===editId);
    if(idx>=0){statuses[idx]={...statuses[idx],kode,label,kategori,urutan};saveAllStatusAlur(statuses);toast('Status diupdate');}
  }else{
    const dup=statuses.find(s=>s.kode===kode);
    if(dup)return toast('System code sudah digunakan');
    statuses.push({id:'st'+Date.now(),kode,label,kategori,urutan,status:'Aktif'});
    saveAllStatusAlur(statuses);toast('Status ditambahkan');
  }
  closeM('mStatus');renderStatusAlur();
  document.getElementById('fsKode').value='';document.getElementById('fsLabel').value='';document.getElementById('fsUrutan').value='0';document.getElementById('fsId').value='';
}
function editStatusAlur(id){
  const statuses=getAllStatusAlur();const s=statuses.find(x=>x.id===id);if(!s)return;
  document.getElementById('fsId').value=s.id;
  document.getElementById('fsKode').value=s.kode;
  document.getElementById('fsLabel').value=s.label;
  document.getElementById('fsUrutan').value=s.urutan;
  const katMap={'REGISTRASI':'Registrasi (Front Office)','PEMERIKSAAN':'Pemeriksaan (Medical Team)','JOURNEY':'Journey (Internal Log)','LAPORAN':'Laporan (Diagnostic Doc)'};
  document.getElementById('fsKategori').value=katMap[s.kategori]||'Registrasi (Front Office)';
  openM('mStatus');
}
function delStatusAlur(id){if(!confirm('Hapus status ini?'))return;const statuses=getAllStatusAlur().filter(s=>s.id!==id);saveAllStatusAlur(statuses);toast('Status dihapus');renderStatusAlur();}

document.addEventListener('DOMContentLoaded',()=>{checkLogin();const sb=document.querySelector('.sb');if(sb)sb.style.display='none';const mn=document.querySelector('.mn');if(mn){mn.style.marginLeft='0';mn.style.background='transparent';}initDefaultUsers();initDefaultLevels();initDefaultUnits();initDefaultPaketMCU();initDefaultStatusAlur();});
