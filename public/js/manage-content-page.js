const goBackButton = document.querySelector('.goback');
const deleteBlogBtn = document.querySelectorAll('.delete-blog');
const deleteCommentBtn = document.querySelectorAll('.delete-comment');
const updateBlogBtn = document.querySelectorAll('.update-blog');
const updateCommentBtn = document.querySelectorAll('.update-comment');

goBackButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.location.replace('/');
});

updateBlogBtn.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});
deleteBlogBtn.forEach(button => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const idToDelete = parseInt(e.target.parentElement.querySelector('.blog-id').innerText);
    const data = await fetch(`/api/blog/${idToDelete}`, {
      method: 'DELETE'
    });
    const response = await data.json();
    if (response.status === 'success') {
      document.location.reload();
    } else {
      alert('Fail to delete, try again');
    }
  });
});

updateCommentBtn.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

deleteCommentBtn.forEach(button => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const idToDelete = parseInt(e.target.parentElement.querySelector('.comment-id').innerText);
    const data = await fetch(`/api/comments/${idToDelete}`, {
      method: 'DELETE'
    });
    const response = await data.json();
    if (response.status === 'success') {
      document.location.reload();
    } else {
      alert('Fail to delete, try again');
    }
  });
});