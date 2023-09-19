"use client";

import Profile from "@components/Profile";
import { PostProps } from "@types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const creator = searchParams.get("name");

  const [posts, setPosts] = useState<Array<PostProps>>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (params.id) fetchPosts();
  }, []);
  return (
    <Profile
      name={creator}
      desc={`Welcome to ${creator} page. Share Exceptional Prompts and Ignite Creativity in Others with their Imagination.`}
      data={posts}
    />
  );
};

export default UserProfile;
