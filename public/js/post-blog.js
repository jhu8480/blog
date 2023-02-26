const blog_title = document.getElementById('blog_title');
const blog_body = document.getElementById('blog_body');
const user_id = parseInt(document.getElementById('userid').innerText);

const postBtn = document.getElementById('post-btn');

postBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const reqBody = {
    blog_title: blog_title.value,
    blog_body: blog_body.value,
    user_id
  }

  if (blog_title.value === '' || blog_body.value === '') {
    alert('You must post blog with a title and a body');
    return;
  }
  
  const data = await fetch('/api/blog', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: { 'Content-Type': 'application/json' }
  });
  const response = await data.json();

  if (response.status === 'success') {
    document.querySelector('.writing-blog').classList.add('hidden');
    document.querySelector('#blog_title').value = '';
    document.querySelector('#blog_body').value = '';
    document.location.replace('/');
  } else {
    alert('Something went wrong, please try again');
    return;
  }
});