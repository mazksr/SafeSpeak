# Panduan Penggunaan API Safespeak

API ini digunakan untuk memprediksi apakah sebuah komentar mengandung ujaran kebencian atau bahasa kasar, serta memberikan label terkait.

## Endpoint

**URL**:  
`https://api.safespeak.info/predict`  

**Metode HTTP**:  
`POST`

## Struktur Permintaan

Permintaan harus dikirim dalam format JSON dengan field berikut:

```json
{
  "comment": "Teks komentar yang ingin diprediksi"
}```

## Struktur Respons
Respons akan berisi hasil prediksi dalam bentuk JSON dengan dua bagian utama:
1. message: Array nilai prediksi untuk setiap label.
2. isPositive: Boolean yang menunjukkan apakah komentar bersifat positif atau tidak.

Contoh Respons:
```json
{
  "message": [
    1.0,
    1.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    1.0,
    0.0,
    0.0
  ],
  "isPositive": false
}```

### Label Klasifikasi

| Indeks | Label                                      | Deskripsi                                |
|--------|-------------------------------------------|------------------------------------------|
| 0      | Ujaran Kebencian                          | Komentar mengandung ujaran kebencian     |
| 1      | Bahasa Kasar                              | Komentar mengandung bahasa kasar         |
| 2      | Ujaran Kebencian Individu                 | Ujaran kebencian terhadap individu       |
| 3      | Ujaran Kebencian Grup                     | Ujaran kebencian terhadap grup           |
| 4      | Ujaran Kebencian Berdasarkan Agama        | Ujaran kebencian terkait agama           |
| 5      | Ujaran Kebencian Berdasarkan Ras          | Ujaran kebencian terkait ras             |
| 6      | Ujaran Kebencian Berdasarkan Fisik        | Ujaran kebencian terkait fisik           |
| 7      | Ujaran Kebencian Berdasarkan Gender       | Ujaran kebencian terkait gender          |
| 8      | Ujaran Kebencian Lainnya                  | Ujaran kebencian lainnya                 |
| 9      | Ujaran Kebencian Lemah                    | Tingkat kebencian rendah                 |
| 10     | Ujaran Kebencian Sedang                   | Tingkat kebencian sedang                 |
| 11     | Ujaran Kebencian Kuat                     | Tingkat kebencian tinggi                 |
