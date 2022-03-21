import React from 'react';
import { parseISO, format } from 'date-fns';
import TermLinkButton from './TermLinkButton';

type Props = {
  userName: string;
  term: {
    slug: string;
    name: string;
  };
  createdAt: string;
  post: string;
};

const PostItem: React.FC<Props> = ({ userName, term, createdAt, post }) => {
  const dateFormatter = (createdAt: string) => {
    // TODO: 日本標準時になっていないので修正する
    const date = new Date(createdAt);
    const time = format(date, 'HH:ii');
    const yearAndDate = format(date, 'yyyy-MM-dd');

    return { time, yearAndDate };
  };

  const { time, yearAndDate } = dateFormatter(createdAt);

  return (
    <div className="border rounded-md p-4 my-5">
      <div className="mb-2">
        <TermLinkButton termLink={term.slug} termName={term.name} />
        <time dateTime={time} className="text-sm align-bottom">
          {time}
        </time>
      </div>
      <p dangerouslySetInnerHTML={{ __html: post }} />
      <div className="mt-3">
        <a href={userName} className="pr-2">
          {userName}
        </a>
        <time dateTime={yearAndDate} className="text-sm">
          {yearAndDate}
        </time>
      </div>
    </div>
  );
};

export default PostItem;
