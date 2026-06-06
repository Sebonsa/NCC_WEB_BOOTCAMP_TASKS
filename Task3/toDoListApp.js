const form = document.querySelector('.form')
const ul = document.querySelector('.ul');
ul.classList.add('ul');
const input = document.querySelector('.input')

const removeElement = el => {
    el.remove();
};

form.onsubmit = (e) => {
    e.preventDefault()

    if (input.value.trim() === "") return;

    const li = document.createElement('li')
    li.classList.add('li');
    const taskText = document.createElement('span');
    taskText.innerText = input.value;
    taskText.onclick = () => {
    taskText.classList.toggle('completed');
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = removeElement.bind(null, li);

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    // li.onclick = removeElement.bind(null, li)
    input.value = '';

}