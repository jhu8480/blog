const writeCommentBtn = document.querySelectorAll('.write-a-comment');
const addCommentButtons = document.querySelectorAll('.add-comment');
const cancelButtons = document.querySelectorAll('.give-up-comment');
const commentTitleInput = document.querySelectorAll('.comment_title');
const commentBodyInput = document.querySelectorAll('.article_comment');

writeCommentBtn.forEach((button) => {
  addEventListener('click', (e) => {
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
      }
    } else {
      alert('A comment must include a title and a body. Try again!')
    }
  });
});

