"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [copy, setCopy] = useState("");

  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => setCopy(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex-1 flex justify-center items-start gap-3 cursor-pointer">
        <Image
          src={post.creator.image}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />

        <div className="flex flex-col">
          <h3 className="font-sathoshi font-semibold text-gray-900">
            {post.creator.username}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {post.creator.email}
          </p>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-sathoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleClick && handleTagClick}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
