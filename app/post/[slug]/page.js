import React from "react";
import { getPosts, getPostDetails } from "@/services";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "@/components";

async function getPost(slug) {
  try {
    const post = await getPostDetails(slug);
    return post;
  } catch (error) {
    console.log(error);
  }
}

const PostDetails = async ({ params }) => {
  const post = await getPost(params.slug);
  if (!post) {
    return (
      <h1 className="text-center text-xl text-white">
        Error occured while loading post
      </h1>
    );
  }
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          {/* <AdjacentPosts slug={post.slug} createdAt={post.createdAt} /> */}
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
