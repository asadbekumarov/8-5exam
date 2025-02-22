// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { baseUrl } from "../../components/utils/url";

// interface Post {
//   _id: string;
//   text: string;
//   name: string;
//   avatar: string;
//   user: string;
//   likes: string[];
//   comments: any[];
//   date: string;
// }

// export default function PostList() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}posts`);
//         console.log("Fetched posts:", response.data);
//         setPosts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setError("Failed to load posts. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <div>Loading posts...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Post List</h1>
//       <div className="space-y-6">
//         {posts.map((post) => (
//           <div key={post._id} className="bg-white shadow-md rounded-lg p-6">
//             <div className="flex items-center mb-4">
//               <img
//                 src={post.avatar || "/placeholder.svg"}
//                 alt={post.name}
//                 className="w-12 h-12 rounded-full mr-4"
//               />
//               <div>
//                 <h2 className="text-xl font-semibold">{post.name}</h2>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(post.date).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//             <p className="text-gray-700 mb-4">{post.text}</p>
//             <div className="flex items-center space-x-4">
//               <span className="text-blue-500">{post.likes.length} Likes</span>
//               <span className="text-green-500">
//                 {post.comments.length} Comments
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
