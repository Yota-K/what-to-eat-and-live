import React, { useEffect } from 'react';
import { useQueryState } from '~/lib/hook/useQuery';

const Tweet = () => {
  const [tweetData, setTweetData] = useQueryState<{ tweet: string }>('tweetData', {
    tweet: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetData({
      ...tweetData,
      tweet: e.target.value,
    });
  };

  useEffect(() => {
    setTweetData({
      ...tweetData,
      tweet: tweetData.tweet,
    });

    console.log(tweetData.tweet);
  }, [tweetData]);

  return (
    <>
      <div className="border rounded-md p-4">
        <textarea
          placeholder="今日食べたものをツイートしましょう。"
          onChange={handleChange}
          value={tweetData.tweet}
          className="w-full h-24 text-xl resize-none"
        ></textarea>
        <div className="border-b border-gray-300 mt-2 mb-6"></div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 text-white p-2 rounded-3xl disabled:opacity-50 disabled:pointer-events-none"
            disabled={tweetData.tweet ? false : true}
          >
            ツイートする
          </button>
        </div>
      </div>
    </>
  );
};

export default Tweet;
