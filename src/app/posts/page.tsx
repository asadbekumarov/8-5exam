"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoPerson } from "react-icons/io5";
import { baseUrl } from "@/components/utils/url";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { AiTwotoneDislike } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface Post {
  _id: string;
  text: string;
  name: string;
  date: string;
  avatar?: string;
  likes: string[];
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPostText, setNewPostText] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get(`${baseUrl}posts`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });
        setPosts(response.data);
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setError(error.response?.data?.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [router]);

  const handleLike = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      await axios.put(
        `${baseUrl}posts/like/${postId}`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: [...post.likes, "liked"] }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const response = await axios.post(
        `${baseUrl}posts`,
        { text: newPostText },
        { headers: { "x-auth-token": token } }
      );

      setPosts([response.data, ...posts]);
      setNewPostText("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
 

  return (
    <div className="max-w-[800px] m-auto p-4 text-center">
      {loading && <div className="text-lg font-semibold">Loading...</div>}
      {error && (
        <div className="text-red-500 font-semibold">
          {error} <br />
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}
      {!loading && !error && (
        <>
          <h1 className="font-bold text-5xl text-start pb-11 text-[#17a2b8] pt-9">
            Posts
          </h1>
          <div className="flex items-center gap-2">
            <IoPerson className="text-2xl" />
            <p className="text-2xl">Welcome to the community</p>
          </div>
          <h2 className="bg-[#17a2b8] py-4 text-start text-white px-2 font-semibold">
            Say Something...
          </h2>
          <div className="flex flex-col gap-2">
            <input
              className="h-24 w-full text-start border px-2"
              placeholder="Create a Post"
              type="text"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <button
              className="bg-[#17a2b8] text-white px-4 py-2 rounded-md font-semibold"
              onClick={handleCreatePost}
            >
              Post
            </button>
          </div>
          <div>
            <div className="flex flex-col">
              {posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts available</p>
              ) : (
                <ul className="space-y-4">
                  {posts.map((post) => (
                    <li
                      key={post._id}
                      className="border rounded-lg p-4 shadow-md flex items-start gap-4 bg-white"
                    >
                      <img
                        src={post.avatar || "/default-avatar.png"}
                        alt={post.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-semibold">{post.name}</h3>
                          <p className="text-gray-500 text-xs">
                            {new Date(post.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-gray-700 mt-2">{post.text}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="flex items-center gap-1 bg-gray-200 p-1 rounded-md text-sm"
                            onClick={() => handleLike(post._id)}
                          >
                            <FaRegThumbsUp className="text-gray-600" />
                            {post.likes.length > 0 && (
                              <span>{post.likes.length}</span>
                            )}
                          </button>

                          <button
                            className="flex items-center gap-1 bg-gray-200 p-1 rounded-md text-sm"
                            onClick={() => handleUnlike(post._id)}
                          >
                            <AiTwotoneDislike className="text-gray-600" />
                          </button>
                          <button
                            className="bg-[#17a2b8] text-white px-3 py-1 rounded-md text-sm"
                            onClick={() => router.push(`/posts/${post._id}`)}
                          >
                            Discussion
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
