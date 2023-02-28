const manageContentBtn = document.getElementById('manage-content');
const userId = document.querySelector('#userid').innerText;

manageContentBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  document.location.replace(`/managecontent/${userId}`);
});