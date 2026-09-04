export interface PortfolioContent {
  nav: {
    about: string;
    skills: string;
    education: string;
    contact: string;
  };
  hero: {
    kicker: string;
    greeting: string;
    role: string;
    copy: string;
    aboutCta: string;
    explore: string;
  };
  about: {
    label: string;
    title: string;
    lead: string;
    body: string;
  };
  skills: {
    label: string;
    title: string;
    copy: string;
  };
  education: {
    label: string;
    title: string;
    degree: string;
    present: string;
    education: string;
    achievement: string;
    activity: string;
    runnerUp: string;
    workshop: string;
    participant: string;
  };
  contact: {
    label: string;
    eyebrow: string;
    title: string;
    copy: string;
    cta: string;
  };
  footer: {
    built: string;
    top: string;
  };
  controls: {
    pause: string;
    play: string;
    menuOpen: string;
    menuClose: string;
  };
}

export const content = {
  th: {
    nav: {
      about: "เกี่ยวกับ",
      skills: "ทักษะ",
      education: "การศึกษา",
      contact: "ติดต่อ",
    },
    hero: {
      kicker: "วิทยาการคอมพิวเตอร์ · การพัฒนาซอฟต์แวร์",
      greeting: "สวัสดี ผม Thanon",
      role: "นักพัฒนาซอฟต์แวร์",
      copy: "มุ่งเน้นการพัฒนาเว็บสมัยใหม่ ผมชอบสร้างประสบการณ์ดิจิทัลที่สะอาดตา รองรับทุกหน้าจอ และลื่นไหล",
      aboutCta: "รู้จักผมมากขึ้น",
      explore: "เลื่อนเพื่อสำรวจ",
    },
    about: {
      label: "01 / เกี่ยวกับ",
      title: "ช่างสงสัยโดยธรรมชาติ ลงมือทำอย่างมีแบบแผน",
      lead: "ผมเป็นนักศึกษาวิทยาการคอมพิวเตอร์ที่ Rangsit University และกำลังมุ่งพัฒนาทักษะด้านเว็บและซอฟต์แวร์",
      body: "ผมชอบเปลี่ยนไอเดียให้เป็นผลิตภัณฑ์ดิจิทัลที่ใช้งานได้จริง ตั้งแต่การออกแบบ interface และประสบการณ์บน mobile ไปจนถึงระบบ backend และ data",
    },
    skills: {
      label: "02 / เทคโนโลยี",
      title: "เครื่องมือที่ผมใช้สร้างสรรค์",
      copy: "ชุดเครื่องมือที่พัฒนาจากโปรเจกต์ด้าน web, mobile, backend และ data",
    },
    education: {
      label: "03 / การศึกษาและกิจกรรม",
      title: "เรียนรู้ แล้วลงมือทำ",
      degree: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
      present: "ปัจจุบัน",
      education: "การศึกษา",
      achievement: "ผลงาน",
      activity: "กิจกรรม",
      runnerUp: "รางวัลรองชนะเลิศอันดับ 2",
      workshop: "เวิร์กช็อป",
      participant: "ผู้เข้าร่วมเวิร์กช็อปสำหรับนักพัฒนา",
    },
    contact: {
      label: "04 / ติดต่อ",
      eyebrow: "มีไอเดียหรือโอกาสที่อยากพูดคุยไหม",
      title: "มาสร้างสิ่งที่มีความหมายไปด้วยกัน",
      copy: "ผมยินดีเสมอที่จะเรียนรู้ ร่วมงาน และพูดคุยเกี่ยวกับผลิตภัณฑ์ดิจิทัลที่เป็นประโยชน์",
      cta: "ติดต่อผม",
    },
    footer: {
      built: "ออกแบบและพัฒนาด้วย Astro",
      top: "กลับด้านบน",
    },
    controls: {
      pause: "หยุดการเคลื่อนไหว",
      play: "เล่นการเคลื่อนไหว",
      menuOpen: "เปิดเมนูนำทาง",
      menuClose: "ปิดเมนูนำทาง",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      kicker: "Computer Science · Software Development",
      greeting: "Hi, I'm Thanon.",
      role: "Software Developer",
      copy: "Focused on modern web development. I enjoy building clean, responsive, and interactive digital experiences.",
      aboutCta: "About me",
      explore: "Scroll to explore",
    },
    about: {
      label: "01 / About",
      title: "Curious by nature. Practical by design.",
      lead: "I'm a Computer Science student at Rangsit University with a growing focus on web and software development.",
      body: "I like turning ideas into dependable digital products, exploring the whole path from interface and mobile experiences to backend systems and data.",
    },
    skills: {
      label: "02 / Tech Stack",
      title: "Tools I build with.",
      copy: "A practical toolkit shaped by web, mobile, backend, and data projects.",
    },
    education: {
      label: "03 / Education & Activities",
      title: "Learning, then doing.",
      degree: "Bachelor of Science in Computer Science",
      present: "Present",
      education: "Education",
      achievement: "Achievement",
      activity: "Activity",
      runnerUp: "Second runner-up",
      workshop: "Workshop",
      participant: "Developer workshop participant",
    },
    contact: {
      label: "04 / Contact",
      eyebrow: "Have an idea or opportunity?",
      title: "Let's build something meaningful.",
      copy: "I'm always open to learning, collaborating, and talking about useful digital products.",
      cta: "Get in touch",
    },
    footer: {
      built: "Designed & built with Astro",
      top: "Back to top",
    },
    controls: {
      pause: "Pause motion",
      play: "Play motion",
      menuOpen: "Open navigation menu",
      menuClose: "Close navigation menu",
    },
  },
} as const satisfies Record<"th" | "en", PortfolioContent>;

export type Language = keyof typeof content;
