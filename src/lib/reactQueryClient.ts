import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // デフォルトだと3回まで失敗してもフェッチをする設定になっている
      retry: false,
      // デフォルトだとユーザーがブラウザのコンポーネントにフォーカスを当てた時に自動でフェッチが動くようになっている
      refetchOnWindowFocus: false,
    },
  },
});
