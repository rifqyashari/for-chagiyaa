const lumiLines=[
 "Jangan lupa tersenyum hari ini, Chagiyaa. Senyummu seperti cahaya di tengah musim dingin. ❄",
 "Tahukah kamu? Bahkan salju yang paling lembut pun tidak seindah kebaikan hatimu. 💙",
 "Aku Lumi! Pemandu kecilmu. Ayo, masih ada kejutan yang menunggumu di halaman ini. 🦉",
 "Semoga setiap harimu sehangat pelukan dan seindah dunia yang tertutup salju.",
 "Psst... jangan lupa buka pesan rahasianya, ya. Ada sesuatu yang ingin disampaikan seseorang. 💌"
];
let lumiIndex=0;
function owlSayNext(){
 const bubble=document.getElementById('owl-bubble');
 lumiIndex=(lumiIndex+1)%lumiLines.length;
 bubble.innerHTML='<b>Lumi si Burung Hantu 🦉</b>'+lumiLines[lumiIndex]+'<br><button onclick="owlSayNext()">Lumi, katakan sesuatu</button>';
}
function openEnvelope(){
 const env=document.getElementById('envelope');
 env.classList.add('open');
 setTimeout(()=>{document.getElementById('opening').classList.add('dismissed');window.scrollTo({top:0,behavior:'smooth'});},550);
}
document.getElementById('envelope').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openEnvelope()}});
function makeSnow(){
 const flake=document.createElement('span');flake.className='snowflake';flake.textContent=['❄','✧','❅'][Math.floor(Math.random()*3)];
 flake.style.left=Math.random()*100+'vw';flake.style.opacity=(.45+Math.random()*.5).toFixed(2);flake.style.fontSize=(10+Math.random()*17)+'px';
 flake.style.setProperty('--drift',(Math.random()*120-60)+'px');flake.style.animationDuration=(6+Math.random()*7)+'s';
 document.body.appendChild(flake);setTimeout(()=>flake.remove(),14000);
}
setInterval(makeSnow,420);
for(let i=0;i<14;i++)setTimeout(makeSnow,i*170);
;
function updateCountdown() {
  const now = new Date();
  const target = new Date(2027, 0, 14, 0, 0, 0);

  let diff = target - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '♡';
    document.getElementById('hours').textContent = '♡';
    document.getElementById('minutes').textContent = '♡';
    document.getElementById('seconds').textContent = '♡';

    document.getElementById('count-note').textContent =
      'Hari istimewamu telah tiba. Selamat ulang tahun, Chagiyaa!';

    return;
  }

  const units = [
    Math.floor(diff / 86400000),
    Math.floor(diff / 3600000) % 24,
    Math.floor(diff / 60000) % 60,
    Math.floor(diff / 1000) % 60
  ];

  ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) => {
    document.getElementById(id).textContent =
      String(units[i]).padStart(2, '0');
  });

  document.getElementById('count-note').textContent =
    'Menuju 14 Januari 2027 ♡';
}
setInterval(updateCountdown,1000);updateCountdown();
function unlockSecret(){const key=document.getElementById('secret-key').value.trim().toLowerCase();if(key==='chagiyaa'){document.getElementById('secret-msg').classList.add('show')}else{alert('Kata kuncinya belum tepat. Coba lagi, ya ♡')}}
let audioCtx=null,oscillators=[],playing=false;

function toggleMusic() {
  const btn = document.getElementById('music-btn');
  const label = document.getElementById('music-label');

  // Membuat pemutar MP3 jika belum tersedia
  if (!window.chagiyaaMusicAudio) {
    window.chagiyaaMusicAudio = new Audio('assets/music/lagu-chagiyaa.mp3');
    window.chagiyaaMusicAudio.loop = true;
    window.chagiyaaMusicAudio.volume = 0.5;
  }

  const audio = window.chagiyaaMusicAudio;

  if (audio.paused) {
    audio.play()
      .then(() => {
        btn.textContent = 'Ⅱ';
        btn.setAttribute('aria-label', 'Jeda musik');
        label.textContent = 'Musik: menyala ♡';
      })
      .catch((error) => {
        console.error('Musik gagal diputar:', error);
        label.textContent = 'Musik gagal diputar';
      });
  } else {
    audio.pause();
    btn.textContent = '♫';
    btn.setAttribute('aria-label', 'Putar musik');
    label.textContent = 'Musik: mati';
  }
}



// ===== UI/UX POLISH: Winter Edition =====
document.addEventListener('DOMContentLoaded',()=>{
  // Progress bar: menunjukkan posisi pembacaan halaman.
  const progress=document.createElement('div');
  progress.className='scroll-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.appendChild(progress);

  // Tombol kembali ke atas.
  const topButton=document.createElement('button');
  topButton.className='back-to-top';
  topButton.type='button';
  topButton.textContent='↑';
  topButton.setAttribute('aria-label','Kembali ke atas');
  topButton.title='Kembali ke atas';
  document.body.appendChild(topButton);
  topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  const updateScrollUI=()=>{
    const maxScroll=document.documentElement.scrollHeight-window.innerHeight;
    const percent=maxScroll>0?(window.scrollY/maxScroll)*100:0;
    progress.style.width=percent+'%';
    topButton.classList.toggle('visible',window.scrollY>450);
  };
  window.addEventListener('scroll',updateScrollUI,{passive:true});
  updateScrollUI();

  // Efek reveal yang tetap ramah untuk perangkat tanpa dukungan observer.
  const revealTargets=document.querySelectorAll('main section,.hero-inner,.letter,.profile,.surprise,.secret');
  revealTargets.forEach(el=>el.classList.add('reveal'));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -35px 0px'});
    revealTargets.forEach(el=>observer.observe(el));
  }else{
    revealTargets.forEach(el=>el.classList.add('is-visible'));
  }

  // Penanda navigasi untuk bagian halaman yang sedang dibaca.
  const navLinks=[...document.querySelectorAll('nav a[href^="#"]')];
  const sections=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver' in window){
    const navObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          navLinks.forEach(link=>{
            const active=link.getAttribute('href')==='#'+entry.target.id;
            link.classList.toggle('active',active);
            if(active)link.setAttribute('aria-current','location');
            else link.removeAttribute('aria-current');
          });
        }
      });
    },{rootMargin:'-25% 0px -60% 0px'});
    sections.forEach(section=>navObserver.observe(section));
  }

  // Lightbox untuk memperbesar foto yang sudah dipilih di galeri.
  const lightbox=document.createElement('div');
  lightbox.className='photo-lightbox';
  lightbox.setAttribute('role','dialog');
  lightbox.setAttribute('aria-modal','true');
  lightbox.setAttribute('aria-label','Pratinjau foto');
  lightbox.innerHTML='<button class="lightbox-close" type="button" aria-label="Tutup foto">×</button><div><img alt="Foto galeri ukuran besar"><div class="lightbox-caption">Klik di luar foto atau tekan Escape untuk menutup</div></div>';
  document.body.appendChild(lightbox);
  const lightboxImage=lightbox.querySelector('img');
  const closeLightbox=()=>{
    lightbox.classList.remove('open');
    lightboxImage.removeAttribute('src');
  };
  lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
  lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeLightbox()});
  document.querySelectorAll('.photo').forEach(photo=>{
    photo.addEventListener('click',event=>{
      if(event.target.matches('input'))return;
      const image=photo.querySelector('img');
      if(!image||!image.src)return;
      event.preventDefault();
      lightboxImage.src=image.src;
      lightboxImage.alt='Foto galeri Chagiyaa';
      lightbox.classList.add('open');
    });
  });
});


// ===== LOCAL PERSONALIZATION & PHOTO STORAGE =====
const CHAGIYAA_DB_NAME='ChagiyaaWinterGallery';
const CHAGIYAA_DB_VERSION=1;
const CHAGIYAA_STORE='photos';

function openChagiyaaDB(){
  return new Promise((resolve,reject)=>{
    if(!('indexedDB' in window)){reject(new Error('Browser tidak mendukung penyimpanan foto lokal.'));return}
    const request=indexedDB.open(CHAGIYAA_DB_NAME,CHAGIYAA_DB_VERSION);
    request.onupgradeneeded=()=>{
      const db=request.result;
      if(!db.objectStoreNames.contains(CHAGIYAA_STORE))db.createObjectStore(CHAGIYAA_STORE);
    };
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error||new Error('Database foto tidak dapat dibuka.'));
  });
}

async function saveChagiyaaPhoto(slot,blob){
  const db=await openChagiyaaDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(CHAGIYAA_STORE,'readwrite');
    tx.objectStore(CHAGIYAA_STORE).put(blob,String(slot));
    tx.oncomplete=()=>{db.close();resolve()};
    tx.onerror=()=>{const error=tx.error;db.close();reject(error||new Error('Foto gagal disimpan.'))};
    tx.onabort=()=>{const error=tx.error;db.close();reject(error||new Error('Penyimpanan foto dibatalkan.'))};
  });
}

async function getChagiyaaPhotos(){
  const db=await openChagiyaaDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(CHAGIYAA_STORE,'readonly');
    const store=tx.objectStore(CHAGIYAA_STORE);
    const keysRequest=store.getAllKeys();
    const valuesRequest=store.getAll();
    tx.oncomplete=()=>{
      const photos={};
      keysRequest.result.forEach((key,index)=>photos[String(key)]=valuesRequest.result[index]);
      db.close();
      resolve(photos);
    };
    tx.onerror=()=>{const error=tx.error;db.close();reject(error||new Error('Foto tersimpan tidak dapat dibaca.'))};
  });
}

function showPhotoInSlot(box,blob){
  const oldUrl=box.dataset.objectUrl;
  if(oldUrl)URL.revokeObjectURL(oldUrl);
  const url=URL.createObjectURL(blob);
  box.dataset.objectUrl=url;
  let img=box.querySelector('img');
  if(!img){img=document.createElement('img');img.alt='Foto galeri Chagiyaa';box.appendChild(img)}
  img.src=url;
  const label=box.querySelector('span');
  if(label)label.style.display='none';
}

async function restoreChagiyaaPhotos(){
  const boxes=[...document.querySelectorAll('.photo')];
  try{
    const photos=await getChagiyaaPhotos();
    boxes.forEach((box,index)=>{
      const blob=photos[String(index)];
      if(blob)showPhotoInSlot(box,blob);
    });
  }catch(error){
    console.warn('Foto lokal belum dapat dipulihkan:',error);
  }
}

function initSavedPersonalization(){
  // Simpan teks yang diedit pengguna di browser yang sama.
  document.querySelectorAll('[contenteditable="true"][data-save-key]').forEach(el=>{
    const key='chagiyaa-text-'+el.dataset.saveKey;
    try{
      const saved=localStorage.getItem(key);
      if(saved!==null)el.innerHTML=saved;
      el.addEventListener('input',()=>{
        try{localStorage.setItem(key,el.innerHTML)}catch(error){console.warn('Teks belum dapat disimpan:',error)}
      });
    }catch(error){console.warn('Penyimpanan teks lokal tidak tersedia:',error)}
  });

  // Ingat tanggal ulang tahun yang dipilih.
  const day=document.getElementById('day');
  if(day){
    try{
      const savedDay=localStorage.getItem('chagiyaa-birthday-day');
      if(savedDay && Number(savedDay)>=11 && Number(savedDay)<=20)day.value=savedDay;
    }catch(error){console.warn('Preferensi tanggal tidak dapat dibaca:',error)}
    day.addEventListener('change',()=>{
      try{localStorage.setItem('chagiyaa-birthday-day',day.value)}catch(error){console.warn('Preferensi tanggal tidak dapat disimpan:',error)}
    });
    if(typeof updateCountdown==='function')updateCountdown();
  }
}

// Ganti fungsi galeri lama dengan versi yang menyimpan file gambar di IndexedDB.
async function loadPhoto(input){
  if(!input.files||!input.files[0])return;
  const file=input.files[0];
  const box=input.closest('.photo');
  const boxes=[...document.querySelectorAll('.photo')];
  const slot=boxes.indexOf(box);
  if(!file.type.startsWith('image/')){
    alert('Pilih file gambar, ya.');
    input.value='';
    return;
  }
  if(file.size>10*1024*1024){
    alert('Ukuran foto maksimal 10 MB. Silakan pilih foto yang lebih kecil.');
    input.value='';
    return;
  }
  try{
    await saveChagiyaaPhoto(slot,file);
    showPhotoInSlot(box,file);
  }catch(error){
    console.error(error);
    alert('Foto belum bisa disimpan oleh browser. Coba gunakan foto yang lebih kecil atau periksa ruang penyimpanan browser.');
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  initSavedPersonalization();
  restoreChagiyaaPhotos();
});
