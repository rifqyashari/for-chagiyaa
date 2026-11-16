# Website Chagiyaa

## Struktur proyek
- `index.html` — struktur dan konten halaman.
- `css/style.css` — seluruh aturan tampilan dan animasi.
- `js/script.js` — interaksi, countdown, galeri, Lumi, dan musik.
- `assets/images/` — tempat menyimpan gambar proyek.
- `assets/music/` — tempat menyimpan file audio jika nanti diperlukan.

## Menjalankan di VS Code
1. Buka folder `FOR-CHAGIYAA` di Visual Studio Code.
2. Pastikan ekstensi Live Server terpasang.
3. Klik kanan `index.html` lalu pilih **Open with Live Server**.

Catatan:
- Foto yang dipilih melalui galeri saat ini hanya ditampilkan sementara di browser dan tidak otomatis tersimpan ke server.
- Pesan rahasia dengan kata kunci `chagiyaa` hanya pengunci tampilan di sisi browser, bukan sistem keamanan sungguhan.
- Countdown memakai tanggal Januari 2027 dan pilihan tanggal 11–20.

## Penyempurnaan UI/UX
- Indikator progres saat menggulir halaman.
- Tombol kembali ke atas.
- Animasi reveal saat bagian halaman masuk ke layar.
- Penanda navigasi untuk bagian yang sedang dibaca.
- Lightbox untuk memperbesar foto galeri.
- Dukungan pengaturan `prefers-reduced-motion`.

## Penyimpanan personalisasi lokal
- Foto galeri disimpan di IndexedDB browser pada perangkat yang digunakan (maksimal 10 MB per foto).
- Teks profil, isi surat yang dapat diedit, tanda tangan, dan pilihan tanggal countdown disimpan di localStorage.
- Data lokal tidak otomatis ikut terunggah ke GitHub atau berpindah ke perangkat/browser lain.
- Menghapus data situs dari pengaturan browser dapat menghapus foto dan personalisasi lokal.
