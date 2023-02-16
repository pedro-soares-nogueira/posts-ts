import { ThumbsUp, Trash } from "phosphor-react";
import React, { useState } from "react";
import Avatar from "./Avatar";

type CommentProps = {
  content: string;
  onDeleteComment: (comment: string) => void;
};

const Comment = ({ content, onDeleteComment }: CommentProps) => {
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeCount = () => {
    setLikeCount((state) => {
      return likeCount + 1;
    });
  };

  const hadleDeleteComment = () => {
    onDeleteComment(content);
  };
  return (
    <div>
      <div className="flex flex-row items-start justify-start gap-4">
        <Avatar hasBorder={false} src="https://github.com/ngrpedro.png" />
        <div className="flex-1">
          <div className="bg-zinc-600 rounded-lg p-4">
            <header className="flex items-start justify-between">
              <div>
                <h1 className="text-sm font-semibold text-gray-200">
                  Pedro Soares
                </h1>
                <time
                  title="11 maio 2022 - 08:13h"
                  dateTime="2022-05-11 80:13:50"
                  className="text-[12px] text-gray-300"
                >
                  Cerca de 1h atrás
                </time>
              </div>
              <button onClick={hadleDeleteComment} title="Deletar comentário">
                <Trash
                  size={18}
                  className="text-gray-200 hover:text-red-400 transition-all"
                />
              </button>
            </header>

            <p>{content}</p>
          </div>
          <footer>
            <button
              onClick={handleLikeCount}
              className={`flex items-center justify-center gap-2 text-sm mt-4 hover:text-green-300 transition-all ${
                likeCount > 0 && `text-green-800`
              }`}
            >
              <ThumbsUp size={18} />
              Curtir
              <span className="before:content-['\2022']"> {likeCount}</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Comment;
