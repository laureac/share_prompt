"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { PostProps, PromptCardListProps } from "@types";

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: PostProps) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<Array<PostProps>>([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  // Search function by tag, prompt or username
  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const isNotNullOrUndefined =
      Array.isArray(allPosts) &&
      allPosts.every((item) => item !== null && item !== undefined);

    if (isNotNullOrUndefined) {
      const escapedInput = searchText.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regexPattern = new RegExp(escapedInput, "i");
      const matchingPosts = allPosts.filter(
        (post) =>
          regexPattern.test(post?.tag) ||
          regexPattern.test(post?.prompt) ||
          regexPattern.test(post?.creator?.username)
      );

      setSearchedResults(matchingPosts);
    }
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleInputChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
