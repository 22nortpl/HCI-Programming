const now = new Date();
const year = now.getFullYear();
const month = now.getMonth()+1;
const date = now.getDate();

const todos = []; //배열 리터럴 표기법 
const titleInput = document.getElementById('todotitle');
const timeInput = document.getElementById('time');
const priorityInput = document.getElementById('priority');
const message = document.getElementById('message');
const todoList = document.getElementById('todoList');
const addBtn = document.getElementById('addBtn');
const sortPriorityBtn = document.getElementById('sortPriorityBtn');
const sortTimeBtn = document.getElementById('sortTimeBtn');
const todayDue = document.getElementById('todayDue');
const complete = document.getElementById('complete');
const remain = document.getElementById('remain');

document.getElementById("today").textContent = `${year}/${month}/${date}`;

function updateStats() {
  const count = todos.length;
  let completeCount = 0;
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i]; 
    if(todos[i].completed === true){
      completeCount++;
    }
  }

  todayDue.textContent = count;
  complete.textContent = completeCount;
  remain.textContent = count-completeCount;
}

function getBalanceColor(priority){
  if (priority == 5)
    return '#FF0000';
  else if (priority == 4)
    return '#FFA500';
  else if (priority == 3)
    return '#FFFF00';
  else if (priority == 2)
    return '#008000';
  else
    return '#0000FF'
}

function renderTodoList() {
  todoList.innerHTML = '';
    let num = todos.length;
    for (let index = 0; index < num; index++) {
      const todoSchedule = todos[index];
      const li = document.createElement('li');
                
      li.className = 'todo-item';
      li.style.borderLeftColor = getBalanceColor(todoSchedule.priority);

      if (todoSchedule.completed) {
        li.classList.add('completed');
    }
    const itemDiv = document.createElement('div');
    itemDiv.className = 'todo-info';

    const titleEl = document.createElement('strong');
    titleEl.textContent = todoSchedule.title;
                
    const othersEl = document.createElement('span');
    othersEl.innerHTML = ` 시간 : ${todoSchedule.time} | 중요도: ${todoSchedule.priority} | 상태: ${todoSchedule.completed}`+'     \n';

    const btnDiv = document.createElement('span');
    btnDiv.className = 'btns';
    const textSpan = document.createElement('span');
    textSpan.textContent = todoSchedule.todo;
    const completedBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    completedBtn.textContent = todoSchedule.completed ? '취소' : '완료';
    deleteBtn.textContent = '삭제';
    completedBtn.onclick = function() {
      todoSchedule.completed = !todoSchedule.completed;
      renderTodoList();
      updateStats();
    };
    deleteBtn.onclick = function() {
      const index = todos.findIndex(t => t.id === todoSchedule.id);
      todos.splice(index, 1);
      renderTodoList();
      updateStats();
    };

    li.appendChild(textSpan);
    btnDiv.appendChild(completedBtn);
    btnDiv.appendChild(deleteBtn);

    itemDiv.appendChild(titleEl); 
    itemDiv.appendChild(othersEl);
    itemDiv.appendChild(btnDiv);

    li.appendChild(itemDiv);
    todoList.appendChild(li);
  }
}

function addTodo() {
  const titleval = titleInput.value.trim();
  const timeval = timeInput.value.trim();
  // Date.now()를 사용하여 고유하고 간단한 ID 생성 가능
  const idval = Date.now();
                    
  const priorityval = Number(priorityInput.value);

  if (titleval.length === 0) {
    message.textContent = '할 일을 입력하세요.';
    return;
  }
  else if (timeval.length === 0) {
    message.textContent = '시간을 입력하세요.';
    return;
  }
  else if (priorityval === 0) {
    message.textContent = '중요도를 입력하세요.';
    return;
  }

  const todo = {
    id: idval,
    title: titleval,
    time: timeval,
    priority: priorityval,
    completed: false
  };
  todos.push(todo);

  //accountArrays[accountArrays.length] = acc; // OK
  renderTodoList();
  updateStats();

  titleInput.value = '';
  timeInput.value = '';
  priorityInput.value = 3;
  message.textContent = '할 일이 추가되었습니다.';
}


function sortByPriority() {
  todos.sort((a, b) => b.priority - a.priority);
  renderTodoList();
  updateStats();
  message.textContent = '중요도 높은 순으로 정렬되었습니다.';
}

function sortByTime() {
  todos.sort((a, b) => a.time.localeCompare(b.time));
  renderTodoList();
  updateStats();
  message.textContent = '시간 순으로 정렬되었습니다.';
}

addBtn.addEventListener('click', addTodo);
sortPriorityBtn.addEventListener('click', sortByPriority);
sortTimeBtn.addEventListener('click', sortByTime);

updateStats();


