let form = document.getElementById("form");
let ul = document.getElementById("ul");
let keys = Object.keys(localStorage);
let btn = document.getElementById("btns");

// Add previous expenses from localstorage
// for (let i = 0; i < keys.length; ++i) {
//   let exp = localStorage.getItem(keys[i]);
//   exp = JSON.parse(exp);
//   let li = document.createElement("li");
//   li.style.color = "white";
//   li.style.display = "inline";
//   let inputs = document.getElementsByClassName("form-control");
//   let category = document.getElementById("category");
//   li.innerText = `${exp.amount} - ${exp.description} - ${exp.category}`;
//   let dltButton = document.createElement("button");
//   let editBtn = document.createElement("button");
//   editBtn.id = "ebtn";
//   editBtn.innerText = "Edit";
//   dltButton.id = "dbtn";
//   dltButton.innerText = "Delete";
//   ul.appendChild(li);
//   ul.appendChild(editBtn);
//   ul.appendChild(dltButton);
//   ul.appendChild(document.createElement("br"));

//   // delete button functionality
//   dltButton.addEventListener("click", (e) => {
//     localStorage.removeItem(exp.description);
//     ul.removeChild(li);
//     ul.removeChild(dltButton);
//     ul.removeChild(editBtn);
//   });

//   //edit Button functionality
//   editBtn.addEventListener("click", () => {
//     ul.removeChild(li);
//     ul.removeChild(dltButton);
//     ul.removeChild(editBtn);

//     inputs[0].value = exp.amount;
//     inputs[1].value = exp.description;
//     category.value = exp.category;
//     localStorage.removeItem(exp.description);
//   });
// }

window.addEventListener("DOMContentLoaded", function () {
  axios.get("http://localhost:4000/get-expenses").then((result) => {
    for (const iterator of result.data) {
      showOnScreen(iterator);
    }
  });
});

function newContent() {
  axios
    .get("http://localhost:4000/get-expenses/")
    .then((res) => {
      ul.innerHTML = "";
      for (let i = 0; i < res.data.length; ++i) {
        showOnScreen(res.data[i]);
      }
    })
    .catch((err) => console.log(err));
}

function showOnScreen(expense) {
  let button = document.createElement("button");
  let editBtn = document.createElement("button");
  editBtn.id = "ebtn";
  editBtn.innerText = "Edit";
  button.id = "btn";
  button.innerText = "Delete";
  let li = document.createElement("li");
  li.innerText = `${expense.amount}  ${expense.description} ${expense.category}`;
  ul.appendChild(li);
  ul.appendChild(button);
  ul.appendChild(editBtn);
  ul.appendChild(document.createElement("br"));
  li.style.display = "inline";

  // delete button functionality
  button.addEventListener("click", (e) => {
    deleteData(expense, li, button, editBtn);
  });

  editBtn.addEventListener("click", () => {
    editData(expense, li, button, editBtn);
  });
}

function deleteData(expense, li, button, editBtn) {
  axios
    .delete(`http://localhost:4000/delete-expense/${expense.id}`)
    .then((res) => {
      ul.removeChild(li);
      ul.removeChild(button);
      ul.removeChild(editBtn);
      newContent();
    })
    .catch((err) => console.log(err));
}
let id;
function editData(expense, li, button, editBtn) {
  id = expense.id;
  axios
    .put(`http://localhost:4000/edit-expense/${expense.id}`)
    .then((res) => {
      let category = document.getElementById("category");
      let amount = document.getElementById("amt");
      let description = document.getElementById("des");
      let inputs = document.getElementsByClassName("form-control");

      btn.innerText = "Update Expense";
      amount.value = res.data.amount;
      description.value = res.data.description;
      category.value = res.data.category;
      //   ul.removeChild(li);
      //   ul.removeChild(button);
      //   ul.removeChild(editBtn);
      //   newContent();
    })
    .catch((err) => console.log(err));
}

// Add expenses from form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const amount = e.target.amount.value;
  const description = e.target.description.value;
  const category = e.target.category.value;

  const obj = {
    amount,
    description,
    category,
  };

  if (btn.innerText == "Update Expense") {
    axios
      .put(`http://localhost:4000/update-expense/${id}`, obj)
      .then((res) => {
        newContent();
        btn.innerText = "Add Expense";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .post("http://localhost:4000/add-expense/", obj)
      .then((res) => {
        newContent();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
// form.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     let inputs= document.getElementsByClassName('form-control');
//     let category=document.getElementById('category');
//     let dltButton=document.createElement('button');
//     let editBtn=document.createElement('button');
//     editBtn.id='ebtn';
//     editBtn.innerText='Edit';
//     dltButton.id='dbtn';
//     dltButton.innerText='Delete'

//     let expenses={
//         amount:inputs[0].value,
//         description:inputs[1].value,
//         category:category.value
//     }
//     let modifyExpense= JSON.stringify(expenses);
//     localStorage.setItem(inputs[1].value,modifyExpense);

//     let li =document.createElement('li');
//     li.style.color='white';
//     li.style.display='inline';
//     li.innerText=`${inputs[0].value} - ${inputs[1].value} - ${category.value}`

//     // delete button functionality
//    dltButton.addEventListener('click',(e)=>{
//     localStorage.removeItem(expenses.description);
//     ul.removeChild(li);
//     ul.removeChild(dltButton)
//     ul.removeChild(editBtn);
// })

//     //edit Button functionality
//     editBtn.addEventListener('click',()=>{
//     ul.removeChild(li);
//     ul.removeChild(dltButton);
//     ul.removeChild(editBtn);

//     inputs[0].value=expenses.amount;
//     inputs[1].value=expenses.description;
//     category.value=expenses.category;
//     localStorage.removeItem(expenses.description);
//   })

//     ul.appendChild(li);
//     ul.appendChild(editBtn);
//     ul.appendChild(dltButton);
//     ul.appendChild(document.createElement('br'))
// })
