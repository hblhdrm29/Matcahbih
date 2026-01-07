# 🔐 Panduan Setup Google OAuth untuk Matchabih

## Langkah 1: Buka Google Cloud Console
1. Buka https://console.cloud.google.com
2. Login dengan akun Google Anda

## Langkah 2: Buat Project Baru
1. Klik dropdown project di pojok kiri atas (sebelah logo Google Cloud)
2. Klik **"New Project"**
3. Isi:
   - **Project name**: `Matchabih`
   - **Location**: Biarkan default
4. Klik **"Create"**
5. Tunggu project dibuat, lalu pilih project tersebut

## Langkah 3: Setup OAuth Consent Screen
1. Di sidebar kiri, cari **"APIs & Services"** > **"OAuth consent screen"**
2. Pilih **"External"** (untuk testing)
3. Klik **"Create"**
4. Isi form:
   - **App name**: `Matchabih`
   - **User support email**: Email Anda
   - **Developer contact email**: Email Anda
5. Klik **"Save and Continue"**
6. Di halaman **Scopes**, klik **"Save and Continue"** (skip)
7. Di halaman **Test users**, klik **"Save and Continue"** (skip)
8. Review dan klik **"Back to Dashboard"**

## Langkah 4: Buat OAuth Credentials
1. Di sidebar, klik **"Credentials"**
2. Klik **"+ CREATE CREDENTIALS"** > **"OAuth client ID"**
3. Pilih **"Web application"**
4. Isi:
   - **Name**: `Matchabih Web`
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000`
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
5. Klik **"Create"**

## Langkah 5: Simpan Credentials
Setelah create, akan muncul popup dengan:
- **Client ID**: `xxxx.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-xxxx`

**SIMPAN KEDUA NILAI INI!**

## Langkah 6: Update File .env
Buka file `.env` di project Matchabih dan tambahkan:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here
```

Untuk generate NEXTAUTH_SECRET, jalankan:
```bash
openssl rand -base64 32
```

Atau gunakan: `matchabih_secret_key_2024_very_secure`

---

## ✅ Selesai!
Setelah mengikuti langkah di atas, Google OAuth siap digunakan.
