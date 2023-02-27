const goBackBtn = document.getElementById('go-back');

goBackBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.location.replace('/');
});