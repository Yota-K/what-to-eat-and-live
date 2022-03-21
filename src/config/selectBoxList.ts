// つぶやきを行うときに食べた時間帯を選択できるセレクトボックス
export const meals = [
  { id: 1, name: '朝ごはん' },
  { id: 2, name: '昼ごはん' },
  { id: 3, name: '夜ごはん' },
  { id: 4, name: '夜食' },
  { id: 5, name: '間食' },
];

export type Meals = '朝ごはん' | '昼ごはん' | '夜ごはん' | '夜食' | '間食';
