const writeCommentBtn = document.querySelectorAll('.write-a-comment');
const addCommentButtons = document.querySelectorAll('.add-comment');
const cancelButtons = document.querySelectorAll('.give-up-comment');
const commentTitleInput = document.querySelectorAll('.comment_title');
const commentBodyInput = document.querySelectorAll('.article_comment');
const anchors = document.querySelectorAll('a[target]');
const viewCommentsBtn = document.querySelectorAll('.view-comments');
const closeViewComments = document.querySelectorAll('.close-view-comments');

writeCommentBtn.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target
      .parentElement
      .querySelector('.comment-input-area')
      .classList.remove('hidden');
  });
});

cancelButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.parentElement.classList.add('hidden');
  });
});

commentTitleInput.forEach((input) => {
  input.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

commentBodyInput.forEach((input) => {
  input.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

addCommentButtons.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const userId = parseInt(document.getElementById('userid').innerText);
    const articleId = e.target.closest('.blog-post-wrapper').querySelector('.articleid').innerText;
    const commentTitle = e.target.parentElement.querySelector('.comment_title').value;
    const commentBody = e.target.parentElement.querySelector('.article_comment').value;
    const newComment = {
      comment_title: commentTitle,
      comment_body: commentBody,
      user_id: userId,
      blog_id: parseInt(articleId)
    };

    if (commentTitle !== '' || commentBody !== '') {
      const data = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers:{ 'Content-Type': 'application/json' }
      });
      const response = await data.json();
      if (response.status === 'success') {
        e.target.parentElement.classList.add('hidden');
        e.target.parentElement.querySelector('.comment_title').value = '';
        e.target.parentElement.querySelector('.article_comment').value = '';
      }
    } else {
      alert('A comment must include a title and a body. Try again!')
    }
  });
});

anchors.forEach(a => {
  a.addEventListener('click', (e) => {
    e.stopPropagation();
  })
});

viewCommentsBtn.forEach((button) => {
  button.addEventListener('click',async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const commentsWrapper = e.target.parentElement.querySelector('.view-comments-wrapper');
    commentsWrapper.classList.remove('hidden');
    const articleid = e.target.parentElement.querySelector('h6 .articleid').innerText;
    const blogId = parseInt(articleid);
    const data = await fetch(`/api/comments/${blogId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const response = await data.json();
    const commentsListWrapper = e.target.parentElement.querySelector('.comments-list-wrapper');
    response.forEach((comment) => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment-div');
      commentDiv.innerHTML = `<h5>${comment.comment_title}</h5><h6>Created by ${comment.user.username}</h6><p>${comment.comment_body}</p>`;
      commentsListWrapper.appendChild(commentDiv);
    });
  });
    
});

closeViewComments.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.parentElement.classList.add('hidden');
    e.target.parentElement.querySelector('.comments-list-wrapper').innerHTML = '';
  })
});
