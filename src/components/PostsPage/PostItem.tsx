import React from 'react';

type Props = {
  name: string;
  term: {
    name: string;
  };
  post: string;
};

const PostItem: React.FC<Props> = ({ name, term, post }) => {
  return (
    <div className="border rounded-md p-4 my-5">
      <div>
        <a href={name}>{name}</a>
        <a href={term.name}>{term.name}</a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post }} />
    </div>
  );
};

export default PostItem;
