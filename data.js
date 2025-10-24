let rekening = [
    {
        id:1,
        nama:"John Doe",
        noHP: "081234567890",
        email: "john.doe@email.com",
        statusDibekukan: false,
        nominal: 90000,
        tanggalDaftar: 'Sun Oct 19 2025',
        mutasiRekening: [
            {
                jenis:"masuk",
                idMutasi:1,
                nominal:10000,
                waktu:""
            },
            {
                jenis:"keluar",
                idMutasi:2,
                nominal:10000,
                waktu:""
            }
        ]
    },
    {
        id:2,
        nama:"Scarlet Doe",
        noHP: "081234567891",
        email: "scarlet.doe@email.com", 
        statusDibekukan: false,
        nominal: 100000,
        tanggalDaftar:new Date().toDateString(),
        mutasiRekening: []  
    }
]

export { rekening }

