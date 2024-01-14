"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { PostProps } from "@types";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState<Array<PostProps>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
       // @ts-ignore
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
  // @ts-ignore
    if (session?.user?.id) fetchPosts();
  // @ts-ignore
  }, [session?.user?.id]);

  const handleEdit = async (post: PostProps) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PostProps) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={"My"}
      desc="Welcome to your page. Share Exceptional Prompts and Ignite Creativity in Others with Your Imagination"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
