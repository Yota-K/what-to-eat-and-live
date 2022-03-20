import { useQuery, useQueryClient } from 'react-query';

export const useQueryState = <T>(queryKey: string | string[], data?: T): [T, (arg: T) => T] => {
  // enabled falseに設定すると、フェッチを行う関数の呼び出しを抑制することができる
  const stateValue = useQuery<T>(queryKey, {
    enabled: false,
    ...(data !== undefined ? { initialData: data } : {}),
  }).data as T;

  const queryClient = useQueryClient();

  const setter = (arg: T) => queryClient.setQueryData(queryKey, arg);

  return [stateValue, setter];
};
