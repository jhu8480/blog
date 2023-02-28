const goBackButton = document.querySelector('.goback');
const deleteBlogBtn = document.querySelectorAll('.delete-blog');
const deleteCommentBtn = document.querySelectorAll('.delete-comment');
const updateBlogBtn = document.querySelectorAll('.update-blog');
const updateCommentBtn = document.querySelectorAll('.update-comment');
const leaveBtn = document.getElementById('leave-btn');
const postBtn = document.getElementById('post-btn');

const saveNewCommentBtn = document.getElementById('post-comment-btn');

const userId = parseInt(document.getElementById('user-id-container').innerText);
const updateCommentBlock = document.querySelector('.update-comment-block');
const closeCommentBlockBtn = document.getElementById('close-btn');
closeCommentBlockBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  updateCommentBlock.classList.add('hide');
});


let blogIdToUpdate;
let commentIdToUpdate;
let commentBlogIdToUpdate;

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
    const data = await fetch(`/api/blog/article/${blogIdToUpdate}`, {
      method: 'GET'
    });
    const response = await data.json();
    if (response.blog_title && response.blog_body) {
      document.getElementById('blog_title').value = response.blog_title;
      document.getElementById('blog_body').value = response.blog_body;
    }
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
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateCommentBlock.classList.remove('hide');
    commentIdToUpdate = parseInt(e.target.parentElement.querySelector('.comment-id').innerText);
    document.getElementById('comment-id-container').innerText = commentIdToUpdate;
    commentBlogIdToUpdate = parseInt(e.target.parentElement.querySelector('.comment_blog_id').innerText);
    document.querySelector('.comment-blog-id-container').innerText = commentBlogIdToUpdate;
    const data = await fetch(`/api/comments/comment/${commentIdToUpdate}`, {
      method: 'GET'
    });
    const response = await data.json();
    if (response) {
      document.querySelector('#new-comment-title').value = response.comment_title;
      document.querySelector('#new-comment-body').value = response.comment_body;
    }
  });
});

saveNewCommentBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const newCommentTitle = document.getElementById('new-comment-title').value;
  const newCommentBody = document.getElementById('new-comment-body').value;
  const newObject = {
    comment_title: newCommentTitle,
    comment_body: newCommentBody,
    user_id: userId,
    blog_id: commentBlogIdToUpdate
  }

  console.log(newObject);

  const data = await fetch(`/api/comments/${commentIdToUpdate}`, {
    method: 'PUT',
    body: JSON.stringify(newObject),
    headers: { 'Content-Type': 'application/json' }
  });
  const response = await data.json();
  if (response.status === 'success') {
    document.querySelector('.update-comment-block').classList.add('hide');
    document.location.reload();
  } else {
    alert('Fail to update, please try again');
  }
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