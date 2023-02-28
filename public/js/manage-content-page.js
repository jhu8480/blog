const goBackButton = document.querySelector('.goback');
const deleteBlogBtn = document.querySelectorAll('.delete-blog');
const deleteCommentBtn = document.querySelectorAll('.delete-comment');
const updateBlogBtn = document.querySelectorAll('.update-blog');
const updateCommentBtn = document.querySelectorAll('.update-comment');
const leaveBtn = document.getElementById('leave-btn');
const postBtn = document.getElementById('post-btn');
const userId = parseInt(document.getElementById('user-id-container').innerText);

let blogIdToUpdate;

postBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const newTitle = document.getElementById('blog_title').value;
  const newBody = document.getElementById('blog_body').value;
  const data = await fetch(`/api/blog/${blogIdToUpdate}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: blogIdToUpdate,
      blog_title: newTitle,
      blog_body: newBody,
      user_id: userId
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  const response = await data.json();
  if (response.status === 'success') {
    document.getElementById('blog_title').value = '';
    document.getElementById('blog_body').value = '';
    document.querySelector('.update-block').classList.add('hidden');
    document.location.reload();
  } else {
    alert('Fail to update, please try again');
  }
});

leaveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.update-block').classList.add('hidden');
});

goBackButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.location.replace('/');
});

updateBlogBtn.forEach(button => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('.update-block').classList.remove('hidden');
    blogIdToUpdate = e.target.parentElement.querySelector('.blog-id').innerText;
    document.getElementById('blog-id-container').innerText = blogIdToUpdate;
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