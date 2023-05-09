import { getPosts } from "@/services";

export default function About({ posts }) {
  console.log("posts1 :", posts);
  return <div>About</div>;
}
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  console.log("posts 2:", posts);
  return {
    props: { posts },
  };
}
