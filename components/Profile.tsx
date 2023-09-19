import React from "react";
import PromptCard from "./PromptCard";
import { PostProps, ProfileProps } from "@types";

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{name ? `${name} profile` : ""}</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post: PostProps) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
