# Thanon Portfolio

## ภาษาไทย

[ชมเว็บไซต์](https://fourls444.github.io/thanon-portfolio/)

เว็บไซต์พอร์ตโฟลิโอส่วนตัวแบบ static สองภาษา โดยใช้ภาษาไทยเป็นค่าเริ่มต้นและมีสวิตช์ TH/EN พร้อมธีม Midnight Cobalt

### เนื้อหาใน V1

V1 ประกอบด้วย Navbar, Hero, About, Tech Stack, Education & Activities, Contact และ Footer ส่วน Projects ตั้งใจยังไม่แสดงในเวอร์ชันนี้

### เทคโนโลยีของเว็บไซต์

เว็บไซต์ทำงานด้วย Astro, TypeScript, Tailwind CSS, Lenis และ CSS/vanilla JavaScript ใช้ไอคอนเทคโนโลยี WebP จากไฟล์ภายในโปรเจกต์ และเผยแพร่ผ่าน GitHub Pages ด้วย GitHub Actions

เทคโนโลยีที่แสดงในพอร์ต เช่น React หรือ Next.js คือทักษะของ Thanon ไม่ใช่ runtime dependency ของเว็บไซต์นี้

### เริ่มพัฒนา

ต้องติดตั้ง Node.js 24 และ npm ก่อนเริ่มใช้งาน

```sh
npm ci
npm run dev
```

ตรวจสอบและทดลอง production build:

```sh
npm test
npm run build
npm run preview
```

### แก้ไขเนื้อหา

- `src/data/profile.ts` ข้อมูลส่วนตัวและช่องทางติดต่อ
- `src/data/content.ts` เนื้อหาภาษาไทยและอังกฤษ
- `src/data/tech.ts` รายการเทคโนโลยี
- `src/data/projects.ts` ข้อมูลโปรเจกต์ที่สำรองไว้สำหรับ V2
- `public/icons/` ไอคอนเทคโนโลยีแบบ WebP

### การเผยแพร่

ตั้งค่า repository ที่ `Settings > Pages` ให้ Source เป็น `GitHub Actions` เมื่อ push หรือ merge เข้า `main` ไฟล์ `.github/workflows/deploy.yml` จะ build และ deploy โฟลเดอร์ `dist` โดยอัตโนมัติ

โปรเจกต์ใช้ base path `/thanon-portfolio` และสร้างเป็น static output จึงไม่มี server runtime แบบฟอร์มติดต่อเปิดโปรแกรมอีเมลผ่านลิงก์ `mailto:`

### แผน V2

V2 วางแผนเพิ่ม Featured Projects, Other Projects, ข้อมูลโปรเจกต์ และ animation หรือหน้ารายละเอียดโปรเจกต์ที่สมบูรณ์ขึ้น ฟีเจอร์เหล่านี้ยังไม่มีใน V1

## English

[View the live site](https://fourls444.github.io/thanon-portfolio/)

A static bilingual personal portfolio with Thai as the default language, a TH/EN switch, and a Midnight Cobalt theme.

### V1 content

V1 includes Navbar, Hero, About, Tech Stack, Education & Activities, Contact, and Footer. Projects are intentionally not displayed yet.

### Site stack

The site runs on Astro, TypeScript, Tailwind CSS, Lenis, and CSS/vanilla JavaScript. It uses local WebP technology icons and deploys to GitHub Pages through GitHub Actions.

Technologies shown in the portfolio, such as React or Next.js, represent Thanon's skills and are not runtime dependencies of this site.

### Development

Prerequisites: Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Verify and preview the production build:

```sh
npm test
npm run build
npm run preview
```

### Updating content

- `src/data/profile.ts` for profile and contact details
- `src/data/content.ts` for Thai and English copy
- `src/data/tech.ts` for the technology list
- `src/data/projects.ts` reserved for V2 project data
- `public/icons/` for local WebP technology icons

### Deployment

In the repository, set `Settings > Pages` source to `GitHub Actions`. Every push or merge to `main` automatically runs `.github/workflows/deploy.yml`, builds the site, and deploys `dist`.

The repository base path is `/thanon-portfolio`. Astro produces static output with no server runtime, and contact uses a `mailto:` link.

### V2 roadmap

V2 is planned to add Featured Projects, Other Projects, project data, and richer project animation or detail pages. These features are not part of V1.
