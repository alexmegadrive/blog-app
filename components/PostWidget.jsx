import React from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "@/services";

const PostWidget = async ({ categories, slug }) => {
  let relatedPosts = [];

  if (slug) {
    relatedPosts = await getSimilarPosts(categories, slug);
  } else {
    relatedPosts = await getRecentPosts();
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center mt-5">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              className="align-middle rounded-full"
              height="60px"
              width="60px"
              alt={post.title}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.created).format("MMM DD, YYYY")}
            </p>
            <Link
              className="text-md"
              key={post.title}
              href={`/post/${post.slug}`}
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
