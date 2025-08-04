import React from 'react'

interface CommentProps {}

const Comment: React.FC<CommentProps> = ({}) => {
  return (
    <div className="comment">
      <p className="comment-text">This is a comment.</p>
      <span className="comment-author">Author Name</span>
    </div>
  )
}

export default Comment
