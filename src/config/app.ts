export const APP = {
  title: '何食べて生きてこ',
  description: ' 今日食べたものを気軽につぶやくことができるSNSアプリケーションです',

  // つぶやきを行うときに食べた時間帯を選択できるセレクトボックス
  meals: [
    { id: 1, name: '朝ごはん' },
    { id: 2, name: '昼ごはん' },
    { id: 3, name: '夜ごはん' },
    { id: 4, name: '夜食' },
    { id: 5, name: '昼食' },
  ],
} as const;
