import React from 'react';
import { parseISO, format } from 'date-fns';
import TermName from './TermName';

type Props = {
  userName: string;
  term: {
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
      <div>
        <a href={term.name} className="text-lg">
          <span className="inline-flex items-center">{TermName(term.name)}</span>
        </a>
        <time dateTime={time} className="text-sm align-text-bottom">
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
