'use client';

import { useState } from "react";
import Image from "next/image";
import {useSession} from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation'

interface PromptCardProps {
  post: any; 
  handleTagClick?: (event: React.ChangeEvent<HTMLFormElement>) => void;
  handleEdit?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  handleDelete?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}


const PromptCard:React.FC<PromptCardProps> = ({post, handleTagClick, handleEdit, handleDelete}) => {

  const {data:session} = useSession()
  const pathName = usePathname();
  // const router = useRouter();

  const [copied, setCopied] = useState<string>("")

  const handleCopy = () =>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(post.createdAt));
  
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
                        
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>    
            <p className="font-inter text-[11px] text-gray-500">{formattedDate}</p>
          </div>
          
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={copied === post.prompt? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt=""
            width={12}
            height={12}
          />
        </div>

      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user?.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center  gap-4 border-t border-gray-100">
          <p className="font-inter text-sm green_gradient cursor-pointer" 
          onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" 
          onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard