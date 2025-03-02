import { Suspense } from "react";
import { cn } from "@/lib/utils";

const LinkedInIcon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-6 h-6 text-blue-600", className)}
    {...props}
  >
    <path d="M4.98 3.5C4.98 2.12 6.07 1 7.48 1c1.4 0 2.5 1.12 2.5 2.5S8.88 6 7.48 6C6.07 6 4.98 4.88 4.98 3.5zM3 8h9v12H3V8zm13.5 0h3V9.7c.6-1.1 2.1-2.2 3.5-2.2 3 0 3.5 2 3.5 4.5v7h-3v-6c0-1.5 0-3.5-2.5-3.5s-2.5 2-2.5 3.5v6h-3V8z" />
  </svg>
);

const Skeleton = ({ className, ...props }) => (
  <div className={cn("rounded-md bg-gray-200", className)} {...props} />
);

export const LinkedInPostSkeleton = ({ className, ...props }) => (
  <div className={cn("flex flex-col gap-2 p-4 border rounded-lg", className)} {...props}>
    <div className="flex items-center gap-2">
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="h-4 w-32" />
    </div>
    <Skeleton className="h-20 w-full" />
  </div>
);

export const LinkedInPostHeader = ({ post }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <a href={post.user.url} target="_blank" rel="noreferrer">
        <img
          src={post.user.profileImage}
          alt={post.user.name}
          className="w-10 h-10 rounded-full border"
        />
      </a>
      <div>
        <a
          href={post.user.url}
          target="_blank"
          rel="noreferrer"
          className="font-semibold"
        >
          {post.user.name}
        </a>
        <div className="text-sm text-gray-500">{post.user.headline}</div>
      </div>
    </div>
    <a href={post.url} target="_blank" rel="noreferrer">
      <LinkedInIcon />
    </a>
  </div>
);

export const LinkedInPostBody = ({ post }) => (
  <div className="text-sm text-gray-700">
    {post.content}
  </div>
);

export const LinkedInPostMedia = ({ post }) => (
  post.imageUrl ? (
    <img
      src={post.imageUrl}
      alt="LinkedIn Post Image"
      className="w-full rounded-lg border"
    />
  ) : null
);

export const LinkedInPost = ({ post, className, ...props }) => (
  <div className={cn("flex flex-col gap-2 p-4 border rounded-lg", className)} {...props}>
    <LinkedInPostHeader post={post} />
    <LinkedInPostBody post={post} />
    <LinkedInPostMedia post={post} />
  </div>
);

const extractPostId = (url) => {
  const match = url.match(/linkedin.com\/posts\/([^?]+)/);
  return match ? match[1] : null;
};

export const LinkedInPostCard = async ({ url, fallback = <LinkedInPostSkeleton />, onError, ...props }) => {
  const postId = extractPostId(url);
  if (!postId) return <LinkedInPostSkeleton {...props} />;

  const fetchLinkedInPost = async (id) => {
    try {
      const response = await fetch(`/api/linkedin/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      return await response.json();
    } catch (error) {
      if (onError) onError(error);
      console.error(error);
      return null;
    }
  };

  const post = await fetchLinkedInPost(postId);
  if (!post) return <LinkedInPostSkeleton {...props} />;
  return (
    <Suspense fallback={fallback}>
      <LinkedInPost post={post} {...props} />
    </Suspense>
  );
};
