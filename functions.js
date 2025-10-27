import { createInterface } from "readline/promises";
import { rekening } from "./data.js";
import { table } from "console-table-without-index";

export const inputUser = createInterface({
  input: process.stdin,
  output: process.stdout
});

// fungsi ini menerima input sebagai pertanyaan, dan mengambil hasilnya sebagai return
export async function ambilInput(pertanyaan) {
  const jawaban = await inputUser.question(pertanyaan);
  return jawaban;
}

export async function lihatRekening(){
    let status = 0
    do {
        console.log("1. Lihat Satu Rekening\n2. Lihat Semua Rekening")
        status = Number(await ambilInput("Masukkan pilihan anda [1/2]\n== "))
        if(status !== 1 && status !== 2){
            console.log("Tidak ada di Pilihan")
            status=0
        }
    } while (status==0);

    // menampilkan status berdasarkan pilihan user
    switch (status){
        // user pilih satu 
        case 1: 
            let tujuanIdRek = Number(await ambilInput("Masukkan ID Rekening yang Ingin Dilihat == "))
            let tujuanRek = rekening.find(rek => rek.id == tujuanIdRek)
            if(!tujuanRek){
                console.log("Rekening tidak Tercatat di Database")
                return
            }
            let {id, nama, noHP, email, statusDibekukan, nominal, tanggalDaftar} = tujuanRek
            console.log({id, nama, noHP, email, statusDibekukan, nominal, tanggalDaftar})
        break
        // user pilih semua
        case 2:
            rekening.forEach(rek => {
                let {id, nama, noHP, email, statusDibekukan, nominal, tanggalDaftar} = rek
                console.log({id, nama, noHP, email, statusDibekukan, nominal, tanggalDaftar})
            });
        break
    }
}

export async function buatRekeningBaru() {
    let namaNasabah = await ambilInput("Masukkan Nama Nasabah == ")
    let noHPNasabah = await ambilInput("Masukkan Nomor HP Nasabah == ")
    let emailNasabah = await ambilInput("Masukkan Email Nasabah == ")

    let nominalAwal = 0
    let tanyaStatusNominal = true
    let tanyaNominal = false

    do {
        let inputStatusNominal = await ambilInput("\nOpsi :\n1. Ya\n2. Tidak\nIngin Input Nominal Awal ? [1/2]\n== ")
        if (inputStatusNominal != 1 && inputStatusNominal != 2){
            console.log("Tidak ada Di Pilihan")
        } else {
            if (inputStatusNominal == 1) {
                tanyaNominal = true
                // tanyaStatusNominal = false
            }
            else if (inputStatusNominal == 2) {
                tanyaNominal = false
                // tanyaStatusNominal = false
            }
            tanyaStatusNominal = false
        }
    } while (tanyaStatusNominal)

    if (tanyaNominal){
        nominalAwal = Number(await ambilInput("Masukkan Nominal Awal == "))
    }

    if (!namaNasabah || !noHPNasabah || !emailNasabah || isNaN(nominalAwal)) {
        console.log("\nInput Tidak Valid. Rekening Gagal Dibuat!\n")
        return
    }

    const idBaru = rekening.length > 0 ? rekening[rekening.length - 1].id + 1 : 1

    let rekeningBaruNasabah = {
        id: idBaru,
        nama: namaNasabah,
        noHP: noHPNasabah,
        email: emailNasabah,
        statusDibekukan: false,
        nominal: nominalAwal,
        tanggalDaftar: new Date().toDateString(),
        mutasiRekening: []
    }

    if(tanyaNominal){
        let mutasiBaru = {
            jenis: "masuk",
            idMutasi: 1,
            nominal: nominalAwal,
            waktu: new Date().toDateString()
        }
        rekeningBaruNasabah.mutasiRekening.push(mutasiBaru)
    }

    rekening.push(rekeningBaruNasabah)
    console.log("\nRekening Baru telah Ditambahkan!\n")
}

export async function lihatMutasiRekening(){
    // ambil input id dari rekening yang dicari
    const idRek = Number(await ambilInput("Masukkan ID Rekening yang ingin Diperlihatkan Mutasi Rekeningnya\n== "))

    // point rekeningnya
    const rekTujuan = rekening.find(rek => rek.id == idRek)

    // cek histori mutasi
    if (rekTujuan.mutasiRekening.length == 0){
        console.log("\nBelum Ada Mutasi pada Rekening Ini\n")
        return
    }

    // perlihatkan semua mutasi
    console.log(`\nMutasi Rekening: ${rekTujuan.nama}`);
    console.log(table(rekTujuan.mutasiRekening))
}

export async function hapusRekening(){
    // PROTEKSI
    let status = 0
    do {
        console.log("\n1. Iya\n2. Tidak")
        status = await ambilInput("Apakah Anda Benar Ingin Melanjutkan ? [1/2] (default: 2)\n== ")
        if(status == 2){return}
    } while (status != 1);

    // ambil input id rekening
    let idRekeningTujuan = await ambilInput("Masukkan ID Rekening yang Ingin Dihapus == ")

    // point rekeningnya
    let indexTujuan = rekening.findIndex(rek => rek.id == idRekeningTujuan)

    // cek ada atau tidak rekeningnya
    if (indexTujuan === -1) {
        console.log("ID tidak ditemukan!");
        return
    }

    // hapus rekening
    rekening.splice(indexTujuan,1)
    console.log("\nRekening Client Berhasil Dihapus!\n")
}

export async function updateDataRekening(){
    // ambil input id rekening tujuan
    let idTujuan = Number(await ambilInput("Masukkan ID Rekening yang Ingin Diperbarui\n== "))

    if(!rekening.find(rek => rek.id == idTujuan)){
        console.log("\nRekening yang Dicari Tidak Tercatat dalam Database\n")
    }

    console.log("Opsi Pembaruan Data:\n")
    console.log("1. Nama\n2. Nomor HP\n3. Email\n4. Status Dibekukan (buka kunci)\n")
    
    // ambil input pilihan user
    let valueTujuan = Number(await ambilInput("masukkan Data yang Ingin Diperbarui (1/2/...)\n== "))
    switch (valueTujuan){
        case 1: valueTujuan="nama"; break;
        case 2: valueTujuan="noHP"; break;
        case 3: valueTujuan="email"; break;
        case 4: valueTujuan="statusDibekukan"; break;
        default: console.log("Tidak ada di pilihan"); break
    }
    
    // point rekening
    let rekeningTujuan = rekening.find(rek => rek.id == idTujuan)
    
    // eksekusi hasil pilihan user
    if (valueTujuan == 'statusDibekukan'){
        bukaKunciBekuRekening(idTujuan)
    } else {
        let dataBaru = await ambilInput("masukkan Data Baru\n== ")
        rekeningTujuan[valueTujuan] = dataBaru
    }
    console.log("\nPerubahan Data Berhasil!\n")
}

export async function transferUang(){
    // ambil input id rek pengirim dan penerima
    let idrekPengirim = await ambilInput("Masukkan ID Rekening Pengirim == ")
    let idrekPenerima = await ambilInput("Masukkan ID Rekening Penerima == ")
    let nominalTransfer = Number(await ambilInput("Masukkan Nominal yang Ingin Dikirim == "))
    let rekPengirim = rekening.find(rek => rek.id == idrekPengirim)
    let rekPenerima = rekening.find(rek => rek.id == idrekPenerima)

    // cek statusDibekukan
    if(cekStatusDibekukan(rekPengirim)){
        console.log("Rekening Pengirim Dibekukan")
        return
    }
    if(cekStatusDibekukan(rekPenerima)){
        console.log("Rekening Penerima Dibekukan")
        return
    }

    // proteksi ganda
    if (rekPengirim.nominal < nominalTransfer) {
        console.log("Saldo pengirim tidak cukup")
        return
    }

    // catat mutasi & update saldo
    inputMutasiRekening(idrekPengirim, 'keluar', nominalTransfer)
    inputMutasiRekening(idrekPenerima, 'masuk', nominalTransfer)
};

export function inputMutasiRekening(idRek, jenisMutasi, nominalMutasi){
    //  pengecekan
    let jenisMutasiBaru = null
    if (!typeof jenisMutasi === 'string'){
        return
    } jenisMutasiBaru = jenisMutasi.toLowerCase()
    const nominalMutasiBaru = Number(nominalMutasi)

    if(jenisMutasiBaru != "masuk" && jenisMutasiBaru != "keluar"){
        console.log("Jenis mutasi tidak diketahui")
        return
    }

    // cari rekening target
    let rekeningTarget = rekening.find(rek => rek.id == idRek)

    if (!rekeningTarget) {
        console.log("Rekening tidak ditemukan")
        return
    }

    if (jenisMutasiBaru === 'keluar' && rekeningTarget.nominal < nominalMutasiBaru) {
        console.log("Saldo tidak mencukupi")
        return
    }

    // buat object mutasi
    let idMutasiTerakhir

    if(!rekeningTarget.mutasiRekening.length == 0){
        idMutasiTerakhir = rekeningTarget.mutasiRekening[rekeningTarget.mutasiRekening.length -1].idMutasi + 1
    } else {
        idMutasiTerakhir = 1
    }

    let objectBaruMutasiRekening = {
        jenis: jenisMutasiBaru,
        idMutasi: idMutasiTerakhir,
        nominal: nominalMutasiBaru,
        waktu: new Date().toString()
    }

    // masukkan mutasi baru
    rekeningTarget.mutasiRekening.push(objectBaruMutasiRekening)

    // update saldo
    if (jenisMutasiBaru == 'keluar') rekeningTarget.nominal -= nominalMutasiBaru
    else if (jenisMutasiBaru == 'masuk') rekeningTarget.nominal += nominalMutasiBaru

    console.log("\nInput Mutasi Baru Berhasil!\n")
}

export async function tarikUang(){
    // ambil input id rekening
    let idRek = Number(await ambilInput("Masukkan ID Rekening Nasabah yang Ingin Ambil Uang == "))

    // cek status Dibekukan
    if(cekStatusDibekukan(idRek)){
        console.log("Rekening Nasabah Dibekukan, Tidak Bisa Dilakukan Penarikan")
        return
    }

    // point rekening tujuan
    let rekeningTujuan = rekening.find(rek => rek.id == idRek)

    // tanya nominal
    let inputNominal = await ambilInput("Masukkan Nominal yang Ingin Diambil == ")
    let nominalTarik = Number(inputNominal)

    // proteksi ganda cek nominal
    if(rekeningTujuan.nominal < nominalTarik){
        console.log("Nominal pada Rekening Nasabah Tidak Mencukupi")
        return
    }

    // catat mutasi & update saldo
    inputMutasiRekening(idRek, 'keluar', nominalTarik)

};

export async function setorUang(){
    // ambil input id rekening
    let cariIdRek = await ambilInput("Masukkan ID Rekening Nasabah yang Ingin Ambil Uang == ")
    let idRek = Number(cariIdRek)

    // cek status Dibekukan
    if(cekStatusDibekukan(idRek)){
        console.log("Rekening Nasabah Dibekukan, Tidak Bisa Dilakukan Pemasukan")
        return
    }

    // tanya nominal
    let inputNominal = await ambilInput("Masukkan Nominal yang Ingin Dimasukkan == ")
    let nominalTarik = Number(inputNominal)

    // catat mutasi & update saldo
    inputMutasiRekening(idRek, 'masuk', nominalTarik)
};

export async function bekukanRekening(){
    // PROTEKSI
    let status = 0
    do {
        console.log("[ALERT]\n1. Iya\n2. Tidak")
        status = await ambilInput("Apakah Anda Benar Ingin Melanjutkan ? [1/2] (default: 2)\n== ")
        if(status == 2 || status == ''){return}
    } while (status != 1);

    // ambil input id rekening
    let idTujuan = Number(await ambilInput("Masukkan ID Rekening yang Ingin Dibekukan\n== "))

    // point rekening
    let rekeningTujuan = rekening.find(rek => rek.id == idTujuan)

    // bekukan rekening
    rekeningTujuan.statusDibekukan = true

    console.log(`\nRekening dengan ID ${idTujuan} berhasil dibekukan!\n`)
}

export function bukaKunciBekuRekening(ID) {
    // cari rekeningnya
    let rekeningTujuan = rekening.find(rek => rek.id == ID)

    // buka kunci beku rekening
    rekeningTujuan.statusDibekukan = false
}

export function cekStatusDibekukan(ID){
    // cari rekeningnya
    let rekeningTujuan = rekening.find(rek => rek.id == ID)
    
    if (rekeningTujuan){
        return rekeningTujuan.statusDibekukan //true or false
    }
}
