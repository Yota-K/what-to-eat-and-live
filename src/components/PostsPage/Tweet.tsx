import React, { useState, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { CreatePostMutation, CreatePostMutationVariables, useCreatePostMutation } from '~/__generated__/graphql';
import SelectBox from '~/components/PostsPage/SelectBox';
import { useQueryState } from '~/lib/hook/useQuery';
import { graphqlClient } from '~/lib/graphqlClient';
import { TweetData } from '~/types/TweetData';
import { meals } from '~/config/selectBoxList';

const Tweet = () => {
  const [selected, setSelected] = useState(meals[0]);
  const textareaEl = useRef<HTMLTextAreaElement>(null);

  // TODO: useStateでいけそうだったらあとでリファクタ
  const [tweetData, setTweetData] = useQueryState<TweetData>('tweetData', {
    tweet: '',
    term: {
      id: 1,
      name: '朝ごはん',
    },
  });
  const { tweet } = tweetData;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetData({
      ...tweetData,
      tweet: e.target.value,
    });
  };

  // つぶやきを行う
  const queryClient = useQueryClient();
  const { mutate } = useCreatePostMutation<Error>(graphqlClient, {
    onSuccess: (data: CreatePostMutation, _variables: CreatePostMutationVariables, _context: unknown) => {
      queryClient.invalidateQueries('GetPosts');
    },
  });

  const submitTweet = () => {
    if (!textareaEl.current) return;

    setTweetData({
      ...tweetData,
      tweet: '',
      term: {
        id: 1,
        name: '朝ごはん',
      },
    });

    textareaEl.current.value = '';
    setSelected(meals[0]);

    mutate({ body: tweetData.tweet, termId: tweetData.term.id });
  };

  return (
    <>
      <div className="border rounded-md p-4">
        <textarea
          placeholder="今日食べたものをツイートしましょう。"
          onChange={handleChange}
          className="w-full h-24 text-xl resize-none"
          ref={textareaEl}
        ></textarea>
        <div className="border-b border-gray-300 mt-2 mb-6"></div>
        <div className="relative flex items-center justify-end">
          <SelectBox meals={meals} selected={selected} setSelected={setSelected} />
          <button
            className="bg-blue-500 text-white p-2 rounded-3xl disabled:opacity-50 disabled:pointer-events-none"
            disabled={tweet ? false : true}
            onClick={submitTweet}
          >
            ツイートする
          </button>
        </div>
      </div>
    </>
  );
};

export default Tweet;
