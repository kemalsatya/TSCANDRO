import * as fungsi from "./functions.js";

let statusBerjalan = true
do {
    console.log("\n===== Sistem Teller =====\n")
    console.log("Opsi Menu :")
    console.log("1. Lihat Data Rekening Nasabah")
    console.log("2. Lihat Data Mutasi Rekening Nasabah")
    console.log("3. Perbarui Data Rekening Nasabah")
    console.log("4. Transfer Uang Nasabah")
    console.log("5. Tarik Uang Nasabah")
    console.log("6. Setor Uang Nasabah")
    console.log("7. [KRUSIAL] Bekukan Rekening Nasabah")
    console.log("8. [KRUSIAL] Hapus Rekening Nasabah")
    console.log("9. KELUAR")

    // ambil input dari user
    let inputUser = Number(await fungsi.ambilInput("\nMasukkan Opsi Angka\n== "))

    // deteksi kesalahan input dari user
    if (inputUser < 0 || inputUser > 9){
        console.log("Tidak Ada Di Pilihan")
    }
    
    switch(inputUser){
        case 1: await fungsi.lihatRekening() 
            break
        case 2: await fungsi.lihatMutasiRekening()
            break
        case 3: await fungsi.updateDataRekening()
            break
        case 4: await fungsi.transferUang()
            break
        case 5: await fungsi.tarikUang()
            break
        case 6: await fungsi.setorUang()
            break
        case 7: await fungsi.bekukanRekening()
            break
        case 8: await fungsi.hapusRekening()
            break
        case 9: statusBerjalan = false
                console.log("\n\nKeluar dari Program ...")
            break
    }
} while (statusBerjalan);

fungsi.inputUser.close()

