"use client";

import Form from "@components/Form";
import { PostProps } from "@types";
import { useSearchParams, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  //   State setters
  const [post, setPost] = useState<PostProps | { prompt: string; tag: string }>(
    { prompt: "", tag: "" }
  );
  const [submitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (promptId) {
        try {
          const response = await fetch(`/api/prompt/${promptId}`);
          const data = await response.json();

          setPost(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getPromptDetails();
  }, []);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleEdit}
    />
  );
};

export default UpdatePrompt;
