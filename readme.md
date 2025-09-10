### 🚀 

# Otomatisasi Laporan NetSuite ke Email

### Deskripsi
Skrip ini adalah **Scheduled Script** yang dibuat untuk mengotomatisasi pengiriman laporan dari NetSuite. Dengan skrip ini, laporan yang berasal dari **Saved Search** dapat digenerasikan secara otomatis (dalam format CSV) dan dikirim langsung ke alamat email tim yang relevan sesuai jadwal yang ditentukan (misalnya, setiap hari atau setiap minggu).

---

### Fitur Utama
* **Penjadwalan Otomatis**: Skrip berjalan secara otomatis pada interval yang ditentukan.
* **Ekstraksi Data**: Mengambil data terbaru dari Saved Search.
* **Generasi File**: Secara otomatis membuat file laporan dalam format CSV.
* **Pengiriman Email**: Mengirimkan laporan sebagai lampiran email langsung ke *inbox* penerima.
* **Fleksibilitas Penerima**: Alamat email penerima dapat diatur melalui parameter skrip, sehingga tidak perlu mengedit kode untuk mengubahnya.

---

### Cara Kerja
1.  Skrip dijadwalkan untuk berjalan pada waktu yang ditentukan.
2.  Skrip memuat **Saved Search** yang telah ditentukan (`customsearch_ar_aging`).
3.  Hasil dari pencarian diiterasi dan digabungkan menjadi satu *string* berformat CSV.
4.  Skrip membuat file CSV dari *string* tersebut.
5.  Skrip mengambil daftar alamat email penerima dari **Script Parameter**.
6.  Sebuah email dikirimkan dengan file CSV yang sudah dibuat sebagai lampiran.

---

### Persyaratan
* Sebuah **Saved Search** di NetSuite yang sudah ada (dalam contoh ini, ID `customsearch_ar_aging`).
* Akses ke NetSuite untuk mengunggah dan melakukan *deployment* skrip.

---

### Instruksi Pemasangan (Deployment)

#### 1. Unggah Skrip
1.  Login ke akun NetSuite Anda.
2.  Navigasi ke **Customization > Scripting > Scripts > New**.
3.  Pilih file `.js` dari komputer Anda (berisi kode skrip ini) dan unggah.
4.  Setelah terunggah, beri nama dan ID yang sesuai untuk skrip Anda.

#### 2. Atur Deployment
1.  Dari halaman skrip yang baru diunggah, klik tab **Deploy Script**.
2.  Pilih **Scheduled** sebagai tipe deployment.
3.  Pada tab **Parameters**, buat **Custom Parameter** baru dengan detail berikut:
    * **ID**: `custscript_report_recipients`
    * **Name**: `Report Recipients`
4.  Pada kolom **Value** di parameter yang baru dibuat, masukkan alamat email penerima yang dipisahkan oleh koma tanpa spasi.
    * **Contoh**: `finance@company.com,manager@company.com`
5.  Pada tab **Schedules**, atur jadwal kapan skrip akan berjalan (misalnya, setiap Senin jam 07:00).
6.  Simpan *deployment* skrip.

---

### Kustomisasi
* **Mengubah Saved Search**: Ganti ID `'customsearch_ar_aging'` pada baris `mySearch` dengan ID Saved Search yang ingin Anda gunakan.
* **Mengubah Konten CSV**: Sesuaikan kode di dalam `mySearch.run().each()` untuk mengambil kolom-kolom data yang berbeda dari Saved Search Anda.
