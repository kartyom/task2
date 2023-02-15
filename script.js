const newTodo = document.getElementById("write-name");

const list = document.getElementById("list");

const todoArray = [];

drowText();

function onDelete(index) {
  todoArray.splice(index, 1);

  render();
}

function render() {
  list.innerHTML = todoArray.reduce(
    (acc, todo, index) =>
      acc +
      `
    <div class="todo">
    <div class="task">
    ${todo}
    <button class="clear" data-open="true" onclick="onDelete(${index})">CLEAR</button>
    </div>
    </div>
    `
  );
}

function onEnter(event) {
  event.preventDefault();

  if (!newTodo.value) return;

  todoArray.push(newTodo.value);

  newTodo.value = "";

  render();
}

async function drowText() {
  let url = "https://jsonplaceholder.typicode.com/posts";
  let response = await fetch(url)
    .then((res) => res.json())
    .catch(console.error());

  for (let i = 0; i < response.length; i++) {
    todoArray.push(response[i].title);
    todoArray.push(response[i].body);
  }

  list.innerHTML = todoArray.reduce(
    (acc, todo, index) =>
      acc +
      `
    <div class="todo">
    <div class="task">
    ${todo}
    <button class="clear" data-open="true" onclick="onDelete(${index})">CLEAR</button>
    </div>
    </div>
    `
  );
}
