# 🍵 Matchabih - Premium Japanese Matcha E-Commerce

Matchabih adalah platform e-commerce premium yang dikhususkan untuk produk Matcha Jepang berkualitas tinggi. Dibangun dengan estetika "Zen" yang modern, platform ini memberikan pengalaman belanja yang tenang, mewah, dan responsif.

## ✨ Fitur Utama

*   **🎨 Desain Modern & Premium**: Menggunakan palet warna kurasi "Warm Cream" (latar belakang) dan "Deep Espresso" (aksen/teks) untuk menciptakan kesan eksklusif dan tenang.
*   **🌓 Dark Mode Support**: Dukungan tema gelap yang dioptimalkan untuk kenyamanan mata tanpa mengurangi estetika premium.
*   **✨ Animasi Interaktif**: Menggunakan **Framer Motion** untuk transisi halaman yang halus, efek hover yang elegan, dan elemen UI yang terasa hidup.
*   **📱 Responsif**: Tata letak yang dioptimalkan sepenuhnya untuk berbagai perangkat, mulai dari desktop layar lebar hingga smartphone.
*   **🛍️ Pengalaman Belanja Lengkap**:
    *   Katalog produk dengan filter dan pencarian.
    *   Sistem keranjang belanja (Cart) yang instan.
    *   Halaman Checkout multi-step yang intuitif.
*   **🔐 Autentikasi Modern**: Integrasi **NextAuth.js** untuk login yang aman melalui Google OAuth atau email/password.
*   **👤 Portal Pelanggan**: Halaman profil untuk mengelola data akun, pesanan, dan wishlist.
*   **🇮🇩 Konten Lokal**: Seluruh antarmuka dan konten disajikan dalam Bahasa Indonesia yang profesional.

## 🛠️ Teknologi yang Digunakan

### Core Stack
*   **Next.js (App Router)**: Framework React untuk performa maksimal, SEO-friendly, dan routing modern.
*   **TypeScript**: Menjamin keamanan data dan kemudahan pengembangan kode.
*   **Prisma ORM**: Manajemen database yang handal untuk PostgreSQL.
*   **PostgreSQL**: Database relasional untuk menyimpan data produk, pengguna, dan pesanan.

### Styling & UI
*   **Tailwind CSS**: Framework CSS utility-first untuk integrasi desain yang sangat presisi.
*   **Framer Motion**: Library animasi untuk menciptakan pengalaman pengguna yang *fluid*.
*   **Lucide React**: Koleksi icon yang konsisten, bersih, dan modern.
*   **Next/Image**: Optimasi gambar otomatis untuk waktu pemuatan yang sangat cepat.

### Auth & State
*   **NextAuth.js**: Solusi autentikasi lengkap dan aman (Support Google OAuth).
*   **Zustand**: State management yang ringan untuk menangani logika keranjang belanja (Cart).
*   **Bcrypt.js**: Enkripsi password untuk keamanan tingkat lanjut.

## 🚀 Cara Menjalankan Project

1.  **Clone Repository**
    ```bash
    git clone https://github.com/your-username/matchabih.git
    cd matchabih
    ```

2.  **Install Dependensi**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Buat file `.env` di root folder dan isi sesuai dengan `.env.example`.

4.  **Jalankan Database (Docker)**
    ```bash
    docker-compose up -d
    ```

5.  **Migrasi Database & Seeding**
    ```bash
    npx prisma migrate dev
    npx prisma db seed
    ```

6.  **Jalankan Mode Pengembangan**
    ```bash
    npm run dev
    ```

---

Matchabih - *Bringing the heart of Uji, Japan to your cup.* 🍃
