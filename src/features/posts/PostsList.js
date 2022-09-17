import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import TimeAgo from "./TimeAgo";

import React from "react";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  // put new one at first
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  //   Find the Author
  const PostAuthorName = (userId) => {
    const author = users.find((user) => user.id === userId);

    return <span>by {author ? author.name : "Unknow author"}</span>;
  };

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        {PostAuthorName(post.userId)}
        <TimeAgo timestamp={post.date} />
      </p>
    </article>
  ));

  return (
    <div>
      <section>
        <h2>Posts</h2>
        {renderedPosts}
      </section>
    </div>
  );
};

export default PostsList;
