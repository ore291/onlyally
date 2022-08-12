import { BsHeart, BsHeartFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import CommentReplies from "./CommentReplies";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCommentRepliesStart } from "../../store/slices/commentsSlice";

const Comment = ({ comment, index, post }) => {
  const dispatch = useDispatch();

  const handleCommentActiveIndex = (index) => {
    setCommentActiveIndex(index);
  };

  const showCommentReplySection = (event, post_id, post_comment_id) => {
    dispatch(
      fetchCommentRepliesStart({
        post_id: post_id,
        post_comment_id: post_comment_id,
      })
    );
  };

  const [commentActiveIndex, setCommentActiveIndex] = useState(null);

  return (
    <div className="flex items-center justify-between text-sm mx-2">
      <div className=" flex justify-start  items-center  basis-[10%]">
        <Link href={`/${comment.user_unique_id}`} passHref>
          <div className="relative w-12 h-12 rounded-full  mr-1">
            <Image
              src={
                comment.user_picture !== ""
                  ? comment.user_picture
                  : "https://cms.onlyally.com/placeholder.jpeg"
              }
              alt="side-img"
              objectFit="cover"
              layout="fill"
              className="rounded-full"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-center space-y-2 basis-[85%]">
        <p className="font-extrabold">{comment.user_displayname}</p>{" "}
        <span
          dangerouslySetInnerHTML={{
            __html: comment.comment != undefined ? comment.comment : "",
          }}
          className="comment-message"
        ></span>
        <div className="flex items-center space-x-3 text-gray-500">
          <span>{comment.created}</span>
          <div className="flex items-center space-x-1">
            <span>50</span>
            <BsHeartFill className="hover:fill-pink-500 text-pink-500" />
          </div>
          {commentActiveIndex != index ? (
            <a
              to="#"
              onClick={(event) => {
                showCommentReplySection(
                  event,
                  post.post_id,
                  comment.post_comment_id
                );
                handleCommentActiveIndex(index);
              }}
            >
              <p>
                {comment.total_comment_replies > 0 ? (
                  <>{comment.total_comment_replies} Replies</>
                ) : (
                  <>Reply</>
                )}{" "}
              </p>
            </a>
          ) : (
            <a
              to="#"
              onClick={(event) => {
                handleCommentActiveIndex(null);
              }}
            >
              <p>Hide</p>
            </a>
          )}
          {/* <p className="ml-3 cursor-pointer"> Reply</p> */}
        </div>
        <CommentReplies
          key="index"
          comment={comment}
          currentIndex={index}
          commentActiveIndex={commentActiveIndex}
        />
      </div>
      <div className="basis-[5%] hover:cursor-pointer hover:text-gray-400">
        <BsHeart />
      </div>
    </div>
  );
};

export default Comment;
