const newBlogBtn = document.querySelector('#write-new-blog');
const blogBlock = document.querySelector('.writing-blog');
const leaveBtn = document.querySelector('#leave-btn');
const blogTitle = document.getElementById('blog_title');
const blogBody = document.getElementById('blog_body');

newBlogBtn.addEventListener('click', (e) => {
  e.preventDefault();
  blogBlock.classList.remove('hidden');
});

leaveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  blogBlock.classList.add('hidden');
  blogTitle.value = '';
  blogBody.value = '';
})