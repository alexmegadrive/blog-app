import React from "react";

const PostCard = ({ post }) => {
  console.log("post 123:", post);
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
};

export default PostCard;
