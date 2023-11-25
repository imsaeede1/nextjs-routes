export const dynamicParams = true;
async function fetchPost(postId) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    // { catch: "force-catch " }
    { next: { revalidate: 60 } }
  );
  const post = await res.json();
  return post;
}

const PostDetail = async ({ params }) => {
  const post = await fetchPost(params.postId);
  if (!post.id) throw new Error("post not found");
  return (
    <div>
      <p> post number of {params.postId}</p>
      <p>post title - {post.title}</p>
      <p>post title - {post.body}</p>
    </div>
  );
};

export default PostDetail;

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts.slice(0, 4).map((post) => ({
    postId: post.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const post = await fetchPost(params.postId);
  return {
    title: post.title,
  };
}
