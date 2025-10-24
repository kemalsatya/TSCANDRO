# Sistem Teller Bank
> *Project ini dibuat untuk memenuhi tugas Mini Project TSC Backend Basic*

## Gambaran Umum 
Project ini secara sederhana menyimulasikan sistem yang digunakan oleh seorang Teller Bank untuk mengakomodir kebutuhan nasabahnya. Teller dapat melihat, memperbarui, dan memproses data rekening nasabah.
Program tidak dijalankan melalui GUI, melainkan berjalan di _Command Line Interface (CLI)_ melalui terminal. Untuk mendukung project ini, digunakanlah bahasa pemrograman **Javascript** dengan **Node Js** sebagai environmentnya.

## Struktur File Project
📁 KemalSatyaWibowo_2410512056_SistemTellerBank/
├── main.js              # Program utama sistem teller
├── functions.js         # Kumpulan fungsi utama CRUD sistem teller
├── data.js              # Sumber data nasabah 
├── package-lock.json    # File pengunci versi library
├── package.json         # Informasi dependensi dan konfigurasi 
└── README.md            # Dokumentasi proyek

## Format Data 
Data berupa rekening nasabah disimpan dalam sebuah object di dalam variabel array `rekening` pada file data.js. Struktur dari seiap data rekening nasabah dibuat dengan struktur sebagai berikut :

{
    id: `number`,                       # ID dari setiap rekening nasabah
    nama:`string`,                      # Nama nasabah
    noHP: `string`,                     # Nomor HP nasabah
    email: `string`,                    # Email nasabah
    statusDibekukan: `boolean`,         # Status true apabila rekening dibekukan
    nominal: `number`,                  # Jumlah saldo nasabah
    tanggalDaftar: `string`,            # Tanggal pembuatan rekening
    mutasiRekening: `array` [           # Daftar riwayat cashflow 
        {
            jenis: `string`,            # Catatan transaksi _masuk/keluar_ 
            idMutasi: `number`,         # ID dari transaksi mutasi
            nominal: `number`,          # Nominal transaksi
            waktu: `string`             # Waktu transaksi 
        }
    ]  
}

## Fungsi-fungsi
Pada project ini, terdapat 12 fungsi yang telah dibuat. Terdapat delapan fungsi yang berinteraksi langsung dengan user dan empat fungsi yang berjalan tanpa user sebagai triggernya. Berikut adalah daftar fungsi-fungsinya :
- ambilInput
- lihatRekening
- lihatMutasiRekening
- hapusRekening
- updateDataRekening
- transferUang
- inputMutasiRekening
- tarikUang
- setorUang
- bekukanRekening
- bukaKunciBekuRekening
- cekStatusDibekukan

### Penjabaran Fungsi
Beragam fungsi yang digunakan pada proyek ini berada di dalam file functions.js yang diexport kedalam file main.js. Adapun fungsi-fungsi yang digunakan beserta penjelasannya, dapat diperhatikan penjabarannya sebagai berikut :

- ambilInput(`pertanyaan`)
Fungsi ini digunakan untuk memberikan kemudahan dalam penulisan kode untuk mengambil input dari user melalui terminal. 
Untuk memenuhi kebutuhan itu, fungsi ini menggunakan async/await dengan penggunaan modul readline/promises. Fungsi ini membutuhkan `pertanyaan` dalam bentuk string sebagai parameternya dan mengembalikan sebuah string dari input user.
Untuk penggunaan fungsi ini, diperlukan sebuah variabel sebagai wadah pengembalian string. Contoh penggunaannya adalah sebagai berikut :
```
let variable = await ambilInput("Berikan Pertanyaan")
```

- lihatRekening()
Fungsi ini digunakan untuk melihat informasi rekening nasabah. Dalam prosesnya, fungsi ini akan memberikan opsi kepada user untuk melihat informasi satu rekening saja atau melihat informasi dari keseluruhan rekening yang tercatat tanpa menampilkan data mutasi di file data.js. 

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await lihatRekening()
```

- lihatMutasiRekening()
Fungsi ini digunakan untuk melihat mutasi dari rekening yang diinginkan oleh user. Apabila ID rekening yang diinputkan user valid, maka program akan menampilkan informasi transaksi yang tercatat dalam rekening tersebut.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await lihatMutasiRekening()
```

- hapusRekening()
Fungsi ini digunakan untuk menghapus rekening yang tersimpan dalam data.js. 
Pada prosesnya, fungsi ini akan meminta konfirmasi untuk melanjutkan sebagai langkah pencegahan dari potensi terhapusnya rekening nasabah. Selain itu, apabila ID rekening yang diinputkan user valid, maka rekening tujuan akan dihapus dalam array rekening.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await hapusRekening()
```

- updateDataRekening()
Fungsi ini digunakan oleh user untuk mengganti data yang ada di dalam sebuah rekening nasabah. 
Opsi perubahan data yang diputuskan dalam proyek ini adalah data berupa Nama, Nomor HP, Email, dan Status Dibekukan. Perubahan Status Dibekukan yang dilakukan pada fungsi ini dilakukan dengan mengubah nilai dari true menjadi false.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await updateDataRekening()
```

- transferUang()
Secara singkat, fungsi ini digunakan untuk mentransfer uang dari rekening pengirim ke rekening penerima.
Dalam prosesnya, fungsi ini memanggil fungsi cekStatusDibekukan() untuk mengetahui apakah rekening tersebut dalam status dibekukan yang menentukan apakah proses akan dilanjutkan atau tidak. Selain itu, fungsi ini juga memanggil fungsi `inputMutasiRekening(_idRek_, _jenisMutasi_, _nominalMutasi_)` untuk mencatatkan transaksi ke dalam mutasi rekening dari masing-masing pengirim dan penerima. Setelah itu, dilakukan pembaruan jumlah nominal dari kedua rekening.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await inputMutasiRekening(`idRek`, `jenisMutasi`, `nominalMutasi`)
```

- inputMutasiRekening(`idRek`, `jenisMutasi`, `nominalMutasi`)
Fungsi ini dibuat untuk memberikan modularitas pada fungsi-fungsi yang melakukan hal serupa, yaitu membuat mutasi rekening baru untuk sebuah rekening. Fungsi ini juga digunakan untuk memberikan kemudahan dalam pembacaan dan penulisan kode.
Untuk menjalankan fungsi ini, dibutuhkan beberapa parameter yaitu `idRek`, `jenisMutasi`, `nominalMutasi`. Dalam prosesnya, dilakukan pengecekan pada rekening dan juga nominal yang ingin dicatat. Setelah itu, sebuah object dibuat sebagai catatan mutasi baru yang nantinya akan dilakukan push ke dalam variabel rekening. Langkah terakhir yang dilakukan adalah pembaruan pada nominal rekening.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await inputMutasiRekening(`idRek`, `jenisMutasi`, `nominalMutasi`)
```

- setorUang()
Secara singkat, fungsi ini menyimulasikan user yang menambah tabungan dalam rekeningnya dengan praktik penambahan pada jumlah nominal rekening nasabah.
Dalam prosesnya, fungsi ini memanggil fungsi cekStatusDibekukan() untuk mengetahui apakah rekening tersebut dalam status dibekukan yang menentukan apakah proses akan dilanjutkan atau tidak. Selain itu, fungsi ini juga akan memanggil fungsi `inputMutasiRekening(_idRek_, _jenisMutasi_, _nominalMutasi_)` untuk mencatatkan transaksi masuk pada rekeningnya.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await setorUang()
```

- tarikUang()
Secara singkat, fungsi ini menyimulasikan user yang ingin mengambil uang dari rekeningnya. Fungsi ini akan mengurangi nominal uang rekening nasabah sejumlah uang yang diinginkan oleh user.
Fungsi ini memanggil fungsi cekStatusDibekukan() untuk mengetahui apakah rekening tersebut dalam status dibekukan yang menentukan apakah proses akan dilanjutkan atau tidak. Selain itu, diakukan pemanggilan pada fungsi `inputMutasiRekening(_idRek_, _jenisMutasi_, _nominalMutasi_)` untuk mencatatkan detail transaksi pada bagian mutasi rekening nasabah.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await tarikUang()
```

- bekukanRekening()
Fungsi ini digunakan untuk mengubah status rekening nasabah menjadi dibekukan. Hal ini akan berdampak pada rekening yang dibatasi aksesnya untuk mengubah jumlah nominal di rekeningnya seperti penarikan, penyetoran dan pentransferan. Sebelum proses tersebut, program memunculkan pesan sebagai konfirmasi apakah pross pembekuan rekening akan dilanjutkan.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await bekukanRekening()
```
- bukaKunciBekukanRekening(`ID`)
Fungsi ini digunakan untuk mengembalikan status pembekuan rekening. Dengan begitu, user akan mendapat akses pada jumlah nominal pada rekeningnya.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await bukaKunciBekukanRekening(`ID`)
```

- cekStatusDibekukan(`ID`)
Fungsi ini digunakan untuk memberikan pengembalian berupa status dibekukannya dari sebuah rekening. Untuk melakukan hal itu, fungsi ini membutuhkan `ID` sebagai parameter dan mengembalikan status dibekukannya rekening tersebut saat ini dalam bentuk tipe data boolean.

Contoh penggunaan fungsi ini adalah sebagai berikut :
```
await cekStatusDibekukan(`ID`)
```

## Cara Penggunaan
Untuk menjalankan program ini, berikut perintah yang dapat digunakan :
```
npm install
node main.js
```
> [!NOTE]
> Proyek ini menggunakan library `console-table-without-index` untuk menampilkan data dalam format tabel pada terminal.
>Library tersebut akan terpasang secara otomatis saat menjalankan `npm install`.