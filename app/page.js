import { PostCard, PostWidget, Categories } from "@/components";
import { getPosts } from "@/services";

async function getData() {
  return (await getPosts()) || [];
}

export default async function Home() {
  const posts = await getData();

  return (
    <div className="container mx-auto px-10 mb-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8  ">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const posts = (await getPosts()) || [];
//   return {
//     props: { posts },
//   };
// }
