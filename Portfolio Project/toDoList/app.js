let add = document.querySelector("form button");
let session = document.querySelector("section");
add.addEventListener("click", (e) => {
  // prevent form being submitted
  e.preventDefault();

  //   console.log(e.target.parentElement);

  // get input data value
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  // do the  alert for user can't input the empty value about our setting
  if (todoText === "") {
    alert("Please Enter sone text !");
    return; // 如果這個條件有達成 ， 下方程式也就不用執行了!
  }
  // create a todoList :
  let todoList = document.createElement("div");
  // 新增 div.todo
  todoList.classList.add("todo");
  // 新增 p.todo-text
  let text = document.createElement("p");
  text.classList.add("todo-text");
  // 在抓取資料放入 <p class="todo-text">
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + "/" + todoDate;

  //設定所有抓取所需的抓取資訊之後，放入 todoList (div)
  todoList.appendChild(text);
  todoList.appendChild(time);

  // 加入 svg顯示圖標  create  green check and red trash
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

  completeButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.addEventListener("animationend", () => {
      // remove from Local Storage
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
      todoItem.remove();
    });
    // 按下垃圾桶 刪除資料
    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  todoList.appendChild(completeButton);
  todoList.appendChild(trashButton);
  todoList.style.animation = "scaleUp 0.3s forwards";

  //    create an  object (property and method)
  let myTodo = { todoText: todoText, todoMonth: todoMonth, todoDate: todoDate };

  // store data into on array of object
  myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }
  console.log(JSON.parse(localStorage.getItem("list")));

  // 當送出第一個資料成下方的清單 清空原先的輸入框 clear text inpute
  form.children[0].value = "";

  session.appendChild(todoList);
});

loadData();

function loadData() {
  // load data in brower of localStorage
  let myList = localStorage.getItem("list");
  if (myList != null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item) => {
      // in browser exist sonm data in todo list under this websit html <section> through localstorage
      let todo = document.createElement("div");
      todo.classList.add("todo");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerHTML = item.todoText;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerHTML = item.todoMonth + "/" + item.todoDate;
      todo.appendChild(text);
      todo.appendChild(time);

      // 加入 svg顯示圖標  create  green check and red trash
      let completeButton = document.createElement("button");
      completeButton.classList.add("complete");
      completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

      completeButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
      });

      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

      trashButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend", () => {
          // remove from Local Storage
          let text = todoItem.children[0].innerText;
          let myListArray = JSON.parse(localStorage.getItem("list"));
          myListArray.forEach((item, index) => {
            if (item.todoText == text) {
              myListArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myListArray));
            }
          });
          todoItem.remove();
        });
        // 按下垃圾桶 刪除資料
        todoItem.style.animation = "scaleDown 0.3s forwards";
      });

      todo.appendChild(completeButton);
      todo.appendChild(trashButton);
      session.appendChild(todo);
    });
  }
}

//  mergeSort 演算法
function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
      if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
  }
}

let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", () => {
  // sort data
  let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(sortedArray));

  // remove data
  let len = session.children.length;
  for (let i = 0; i < len; i++) {
    session.children[0].remove();
  }

  // load data
  loadData();
});
