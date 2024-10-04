import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/CommentSection.scss';

const CommentSection = ({ updateId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [expandedComments, setExpandedComments] = useState(null); // New state to manage expanded replies
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    fetchComments();
  }, [updateId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/comments/update/${updateId}`);
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleSubmitComment = async (e, parentCommentId = null) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          updateId,
          content: newComment,
          parentCommentId
        })
      });
      const data = await response.json();
      if (parentCommentId) {
        setComments(comments.map(comment => 
          comment._id === parentCommentId 
            ? { ...comment, replies: [...comment.replies, data] }
            : comment
        ));
      } else {
        setComments([data, ...comments]);
      }
      setNewComment('');
      setReplyingTo(null);
    } catch (err) {
      console.error("Failed to submit comment", err);
    }
  };

  const timeAgo = (timestamp) => {
    // ... (use the same timeAgo function from UpdateDetails)
  };

  const handleCancelReply = () => {
    setReplyingTo(null); // Collapse the input field
    setNewComment('');   // Clear the input field
  };

  const toggleReplies = (commentId) => {
    setExpandedComments(expandedComments === commentId ? null : commentId); // Toggle expanded replies
  };

  return (
<>
    <h3 style={{marginLeft: '30px', marginTop: '30px'}}>Comments</h3>

    <div className="comment-sect"> 
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <img src='../assets/user.png' alt="User avatar" />
              <span className="comment-author">{`${comment.user.firstName} ${comment.user.lastName}`}</span>
              <span className="comment-time">{timeAgo(comment.createdAt)}</span>
            </div>
            <p className="comment-content">{comment.content}</p>
            
            <button onClick={() => setReplyingTo(comment._id)}>Reply</button>
            
            {replyingTo === comment._id && (
              <form onSubmit={(e) => handleSubmitComment(e, comment._id)}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a reply..."
                />
                <div className="reply-actions">
                  <button type="submit">Post Reply</button>
                  <button type="button" onClick={handleCancelReply}>Cancel</button>
                </div>
              </form>
            )}

            {comment.replies.length > 0 && (
              <div className="replies">
                <button onClick={() => toggleReplies(comment._id)}>
                  {expandedComments === comment._id ? 'Hide Replies' : `View ${comment.replies.length} Replies`}
                </button>
                {expandedComments === comment._id && comment.replies.map((reply) => (
                  <div key={reply._id} className="reply">
                    <div className="comment-header">
                      <img src='../assets/user.png' alt="User avatar" />
                      <span className="comment-author">{`${reply.user.firstName} ${reply.user.lastName}`}</span>
                      <span className="comment-time">{timeAgo(reply.createdAt)}</span>
                    </div>
                    <p className="comment-content">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    <form onSubmit={(e) => handleSubmitComment(e)}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment and start a thread..."
        />
        <button type="submit">Post Comment</button>
      </form>
    </>
  );
};

export default CommentSection;