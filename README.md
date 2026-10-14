# Misi Bintang Sukan — PJ Tahun 2: Manipulasi Alatan

Permainan pembelajaran berbahasa Melayu yang mesra telefon, tablet dan komputer. Dibina menggunakan HTML, CSS dan JavaScript biasa; tiada proses pemasangan atau framework diperlukan.

## Kandungan fail

- `index.html` — kandungan, nota, standard kurikulum, video dan kuiz.
- `style.css` — reka bentuk responsif, latar ceria, animasi dan paparan kemenangan.
- `script.js` — kuiz 8 soalan, sistem bintang, kesan bunyi dan bacaan suara melalui ciri Text-to-Speech peranti.

## Cara buka secara setempat

1. Muat turun dan ekstrak ZIP.
2. Buka `index.html` menggunakan pelayar moden (Chrome, Edge, Firefox atau Safari).
3. Isikan nama murid jika mahu.
4. Tekan **Bunyi: OFF** untuk mengaktifkan kesan bunyi dan suara. Pelayar mungkin meminta interaksi pengguna sebelum audio dimainkan.
5. Sambungan internet diperlukan untuk video YouTube dan fon web. Kuiz dan nota masih boleh digunakan tanpa video.

## Terbitkan di GitHub Pages

1. Log masuk ke GitHub dan pilih **New repository**.
2. Beri nama, contohnya `pj-tahun-2-manipulasi-alatan`. Untuk penggunaan mudah, pilih **Public**.
3. Muat naik `index.html`, `style.css`, `script.js` dan `README.md` ke direktori utama (root) repositori. Jangan letakkan `index.html` di dalam subfolder.
4. Buka **Settings → Pages**.
5. Di bawah **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch `main` dan folder `/(root)`, kemudian tekan **Save**.
7. Tunggu proses penerbitan selesai. Pautan laman akan dipaparkan di bahagian Pages, lazimnya dalam format `https://NAMA-PENGGUNA.github.io/NAMA-REPOSITORI/`.
8. Buka pautan tersebut pada telefon atau tablet untuk menguji semua butang, audio dan video.

## Standard kurikulum yang dirujuk

**DSKP KSSR Semakan 2017 Pendidikan Jasmani dan Pendidikan Kesihatan Tahun 2 — Aspek 1: Kemahiran Pergerakan**

- **SK 1.4 — Manipulasi Alatan:** Berkebolehan melakukan kemahiran manipulasi alatan dengan lakuan yang betul.
- **SP 1.4.1:** Melambung, menyambut, menggolek, menendang, menyerkap, melantun, membaling, menangkap, memukul dan mengelecek.
- **SP 1.4.2:** Menggolek bola pada satu jarak.
- **SP 1.4.3:** Membaling bola pada satu jarak.
- **SP 1.4.4:** Menangkap bola dengan serapan daya.
- **SP 1.4.5:** Menendang perlahan bola yang digolekkan dengan perlahan.
- **SP 1.4.6:** Menyerkap bola yang bergerak.
- **SP 1.4.7:** Memukul belon ke atas dan ke hadapan dengan menggunakan pemukul yang mempunyai permukaan luas seperti raket.
- **SP 1.4.8:** Memukul bola yang diletakkan di atas tee dengan menggunakan pemukul berbentuk silinder seperti bat sofbol.
- **SP 1.4.9:** Mengelecek bola menggunakan tangan.
- **SP 1.4.10:** Mengelecek bola menggunakan kaki.

Rujukan dokumen DSKP yang boleh dicapai melalui portal sekolah:
https://sites.google.com/moe-dl.edu.my/skbls-cloud-center/kurikulum/panitia-2024/pjpk/2-pjpk-dskp/2-1-pjpk-dskp

**Penting:** Standard di atas diringkaskan untuk membantu perancangan. Sila semak salinan DSKP rasmi KPM/sekolah sebelum menyalin teks ke dalam RPH atau dokumen rasmi. Kandungan kuiz ini menumpukan contoh asas membaling, menggolek, menendang, menangkap dan keselamatan.

## Video YouTube

- Manipulasi Alatan (Bahagian 2): https://www.youtube.com/watch?v=QrEdqFDW5_k
- Kemahiran Membaling: https://www.youtube.com/watch?v=vsXfARlXcbk

Video dihoskan oleh pihak ketiga dan ketersediaannya tertakluk kepada YouTube.

## Audio dan privasi

- Suara menggunakan `SpeechSynthesis` pada peranti. Suara Bahasa Melayu (`ms-MY`) akan digunakan jika tersedia; jika tidak, pelayar boleh menggunakan suara lalai yang tersedia.
- Kesan bunyi dijana oleh Web Audio API selepas pengguna mengaktifkan audio.
- Nama murid hanya disimpan dalam `sessionStorage` tab pelayar untuk sesi semasa dan tidak dihantar ke pelayan. Nama akan hilang apabila sesi tab tamat.
- Tiada akaun murid atau pangkalan data diperlukan.

## Kredit

Disediakan untuk sesi pembelajaran oleh **MUHAMAD SYAWALWAHED**, **SK (P) JALAN YAHYA AWAL**.
