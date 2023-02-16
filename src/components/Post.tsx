import React, { ChangeEvent, FormEvent, useState } from "react";
import Comment from "./Comment";
import Avatar from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR";

type PostProps = {
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedAt: Date;
  content: {
    type: "paragraph" | "link" | "tag" | string;
    content: string;
  }[];
};

const Post = ({ author, content, publishedAt }: PostProps) => {
  const [comments, setComment] = useState(["Muito bom! ✌️"]);
  const [newCommentText, setNewcommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL '-' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleCreateNewComment = (event: FormEvent) => {
    event.preventDefault();

    setComment([...comments, newCommentText]);
    setNewcommentText("");
  };

  const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewcommentText(event.target.value);
  };

  const deleteComment = (commentToDelete: string) => {
    const commentWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComment(commentWithoutDeletedOne);
  };

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className="bg-zinc-800 rounded-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center gap-5">
          <Avatar src={author.avatarUrl} />

          <div className="">
            <h1 className="text-lg font-bold">{author.name}</h1>
            <span className="text-sm text-gray-300">{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
          className="text-sm text-gray-300"
        >
          {publishedDateRelativeToNow}
        </time>
      </div>

      <div className="my-8 text-sm font-bold tracking-wide space-y-3">
        {content.map((item, index) => {
          {
            if (item.type === "paragraph") {
              return <p key={index}>{item.content}</p>;
            } else if (item.type === "link") {
              return (
                <p key={index}>
                  <a
                    href="#"
                    className="text-green-700 hover:text-green-800 transition-all"
                  >
                    {item.content}
                  </a>
                </p>
              );
            }
          }
        })}
        <p className="space-x-4">
          {content.map((item, index) => {
            if (item.type === "tag") {
              return (
                <span
                  key={index}
                  className="text-green-700 hover:text-green-800 transition-all cursor-pointer"
                >
                  #{item.content}
                </span>
              );
            }
          })}
        </p>
      </div>

      <form
        onSubmit={handleCreateNewComment}
        className="border-t border-gray-500 flex flex-col items-start gap-3 py-4 group"
      >
        <span className="text-base font-bold text-gray-300">
          Deixe seu feedback
        </span>

        <textarea
          cols={30}
          rows={4}
          name="comment"
          onChange={handleNewCommentChange}
          value={newCommentText}
          placeholder="Coloqueu seu comentário"
          required
          className="bg-zinc-900 rounded-md border border-gray-600 p-4 font-semibold 
            w-full outline-none focus:border-green-400 transition-all"
        ></textarea>

        <footer className="invisible max-h-0 group-focus-within:visible group-focus-within:max-h-32 transition-all">
          <button
            type="submit"
            title=""
            className="py-4 px-6 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
            transition-all disabled:opacity-25"
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className="space-y-8">
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
};

export default Post;
