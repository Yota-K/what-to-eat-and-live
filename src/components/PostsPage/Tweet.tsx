import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { gql } from 'graphql-request';
import { Post } from '~/__generated__/graphql';
import { useQueryState } from '~/lib/hook/useQuery';
import SelectBox from '~/components/PostsPage/SelectBox';
import { TweetData } from '~/types/TweetData';
import { graphqlClient } from '~/lib/graphqlClient';

const Tweet = () => {
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

  useEffect(() => {
    if (tweetData.tweet !== '') {
      setTweetData({
        ...tweetData,
        tweet,
      });
    }
  }, [tweetData]);

  const create = async () => {
    const query = gql`
      mutation CreatePost($body: String!, $userId: Int!, $termId: Int!) {
        createPost(body: $body, userId: $userId, termId: $termId) {
          success
          message
        }
      }
    `;

    const res = await graphqlClient.request<{ success: boolean; message: string }>(query, {
      body: tweetData.tweet,
      userId: 1,
      termId: tweetData.term.id,
    });
    console.log(res);
    return {
      success: res.success,
      message: res.message,
    };
  };

  return (
    <>
      <div className="border rounded-md p-4">
        <textarea
          placeholder="今日食べたものをツイートしましょう。"
          onChange={handleChange}
          className="w-full h-24 text-xl resize-none"
        ></textarea>
        <div className="border-b border-gray-300 mt-2 mb-6"></div>
        <div className="relative flex items-center justify-end">
          <SelectBox />
          <button
            className="bg-blue-500 text-white p-2 rounded-3xl disabled:opacity-50 disabled:pointer-events-none"
            disabled={tweet ? false : true}
            onClick={create}
          >
            ツイートする
          </button>
        </div>
      </div>
    </>
  );
};

export default Tweet;
