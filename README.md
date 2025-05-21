
---

# 📡 Endpoint API & Contoh POST Request

## 1. Genre (`/genres`)
### `POST /genres`
Membuat genre baru.

```json
{
  "nama": "Romance",
  "deskripsi": "Cerita cinta dan hubungan emosional"
}
```

> 💡 `deskripsi` bersifat opsional

| Method | Endpoint       | Deskripsi                     |
|--------|----------------|-------------------------------|
| GET    | `/genres`      | Dapatkan semua genre          |
| GET    | `/genres/:id`  | Dapatkan genre berdasarkan ID |
| PUT    | `/genres/:id`  | Perbarui genre                |
| DELETE | `/genres/:id`  | Hapus genre                   |

---

## 2. Buku (`/books`)
### `POST /books`
Membuat buku baru dengan relasi ke genre (Many-to-Many).

```json
{
  "genreIds": [1, 2],
  "judul": "Love at School",
  "alt_judul": "School Love Story",
  "cover": "https://example.com/cover.jpg",
  "author": "Jane Doe",
  "artist": "Art Doe",
  "synopsis": "A school love story with emotional twists...",
  "status": "Ongoing",
  "type": "Manga"
}
```

> 💡 `alt_judul`, `synopsis`, `status`, dan `type` bersifat opsional

| Method | Endpoint              | Deskripsi                              | Parameter Opsional (Query)       |
|--------|-----------------------|----------------------------------------|----------------------------------|
| GET    | `/books`              | Dapatkan semua buku dengan pagination  | `page` (default: 1), `limit` (default: 10) |
| GET    | `/books/:id`          | Dapatkan buku berdasarkan ID           | -                                |
| GET    | `/books/search?genreIds=1,2` | Cari buku berdasarkan genre IDs | -                                |
| PUT    | `/books/:id`          | Perbarui buku                          | -                                |
| DELETE | `/books/:id`          | Hapus buku                             | -                                |

> 💡 Parameter `page` menentukan nomor halaman, dan `limit` menentukan jumlah item per halaman. Contoh: `/books?page=2&limit=5`.

---

## 3. Chapter (`/chapters`)
### `POST /chapters`
Membuat chapter baru terkait dengan suatu buku.

```json
{
  "bookId": 1,
  "chapter": 1,
  "volume": 1,
  "nama": "The Beginning",
  "thumbnail": "https://example.com/thumb.jpg",
  "isigambar": "Image data content...",
  "isitext": "Text content of the chapter..."
}
```

> 💡 `volume`, `thumbnail`, `isigambar`, dan `isitext` bersifat opsional

| Method | Endpoint               | Deskripsi                        | Parameter Opsional (Query)       |
|--------|------------------------|----------------------------------|----------------------------------|
| GET    | `/chapters`            | Dapatkan semua chapter dengan pagination | `page` (default: 1), `limit` (default: 10) |
| GET    | `/chapters/:id`        | Dapatkan chapter berdasarkan ID  | -                                |
| PUT    | `/chapters/:id`        | Perbarui chapter                 | -                                |
| DELETE | `/chapters/:id`        | Hapus chapter                    | -                                |

> 💡 Parameter `page` menentukan nomor halaman, dan `limit` menentukan jumlah item per halaman. Contoh: `/chapters?page=2&limit=5`.

---
