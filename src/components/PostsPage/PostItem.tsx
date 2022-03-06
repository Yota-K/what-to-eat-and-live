import React from 'react';
import { Post } from '~/__generated__/graphql';

type Props = {
  users: Post['users'];
  terms: Post['terms'];
  post: Post['post'];
};

const PostItem: React.FC<Props> = ({ users, terms, post }) => {
  return (
    <div className="border rounded-md p-4 my-5">
      <div>
        <a href={users?.name}>{users?.name}</a>
        <a href={terms?.name}>{terms?.name}</a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post }} />
    </div>
  );
};

export default PostItem;
