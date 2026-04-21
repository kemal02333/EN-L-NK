import { Student, Task, Activity } from './types';

export const STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Caner Yıldız',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOJhCyy57zV6xpgzISZHau49CgSr6oHmqD-57hrbrs6bYF3FBKk9qj-q1I6mps5LZBDdGOfgSHP6XEAScQI3PQSJCSEiyoax9n8jhjcXYy5ZGgQpZ0d7GYn9wb77UFX2MNhFRIyfRE_f5VnbBvCyqfTerkNBUgi0zri_1Po4DcPp-TQmDFUUT2U6OCneNAegR8ApGpq-9y9r78f8qZ_Qk2rcBAs9mFXVvll_tVe4jI5bhohSwo46amIHjyb_IOOP5P3LE7_yZLo8b9',
    status: 'active',
    lastSeen: '2 dk önce',
    currentTask: 'Fen Bilimleri Projesi üzerinde çalışıyor',
    class: '10-A',
    isLocked: false,
    visitedSites: [
      { url: 'eba.gov.tr', time: '14:20', icon: 'school' },
      { url: 'wikipedia.org', time: '13:45', icon: 'globe' },
      { url: 'youtube.com', time: '12:10', icon: 'video' }
    ]
  },
  {
    id: '2',
    name: 'Elif Demir',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKhjb1yXbudVJXujDa1J7hx34mu1EdoFMhLNm5HkRrOHI9fhFJLtWqc_PN2X0GbipNAM_j9ji0wZaI5O89ugpe_eYKVvmfOrnbbZPBcF_cwlfWuMDtUoybspvZw9XLjp56sIZFaMws1xUgSxwR-dzraltAg9I1u1u1sHMsftLZnFlaFHEZiQh9TSZ7cXd2_7wJR8yXw0u85boy8y1zhXtq-_0d1is92-3AiTRkascTBsYHSdNV9ava7n96vC0ajWwTOoSsGwrDEKbR',
    status: 'active',
    lastSeen: 'Şimdi',
    currentTask: 'Matematik Testi - 3. Bölüm',
    class: '10-A',
    isLocked: true,
    visitedSites: [
      { url: 'khanacademy.org', time: '10:00', icon: 'school' },
      { url: 'google.com', time: '09:30', icon: 'search' }
    ]
  },
  {
    id: '3',
    name: 'Merve Kaya',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJzSWATOSZD015IQ4kjDMxkjSiE6783jFtVEjHNR3YXA1NSspuArqTw7o84QyPX76aQOPI1Nf1JhGryAhIbzIUPuGKJ6dcgRI-y4fpOA1HxBSLYBVo3wsw35W88ANHKUZLAUVgyg9IPEkSGfOT0bahluGT3nqx7jugbGxNYSDMR_KTTWfV4QrS1wmrw8axcEW82InJuR4YURa6vTaOKU_I-g6tp45U8lnui2atwYq4v9B8Nu0rEjfi8R4yA0rHN8wxCa8APk7UXljM',
    status: 'passive',
    lastSeen: '45 dk önce',
    currentTask: 'Okuma Ödevi: Küçük Prens',
    class: '10-A',
    isLocked: false,
    visitedSites: [
      { url: 'tr.wikipedia.org', time: '17:20', icon: 'globe' }
    ]
  }
];

export const TASKS: Task[] = [
  {
    id: 't1',
    title: 'İleri Düzey Fonksiyonlar',
    class: '12. Sınıf - Fen Şubesi',
    category: 'Matematik',
    progress: 65,
    submissions: 18,
    status: 'critical',
    dueDate: '2 gün kaldı'
  },
  {
    id: 't2',
    title: 'Modern Türk Edebiyatı',
    class: '11. Sınıf - Eşit Ağırlık',
    category: 'Türkçe',
    progress: 30,
    submissions: 9,
    status: 'normal',
    dueDate: '1 hafta kaldı'
  },
  {
    id: 't3',
    title: 'Hücre Bölünmesi Deneyi',
    class: '10. Sınıf - Fen Şubesi',
    category: 'Fen Bilimleri',
    progress: 100,
    submissions: 24,
    status: 'completed',
    dueDate: 'Dün kapandı'
  }
];

export const ACTIVITIES: Activity[] = [
  { id: 'a1', time: '14:20', title: 'Eba Giriş Yapıldı', subtitle: 'Matematik Ödevi', type: 'login' },
  { id: 'a2', time: '08:45', title: 'Okul Alanına Giriş', subtitle: 'Bahçelievler', type: 'location' },
  { id: 'a3', time: '08:10', title: 'Cihaz Kilidi Açıldı', subtitle: 'Ev', type: 'device' }
];

export const CATEGORIES = ['Matematik', 'Türkçe', 'Fen Bilimleri', 'Sosyal Bilgiler', 'Yabancı Dil'];
