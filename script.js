
const expenseForm = document.getElementById("expenseForm");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const submitBtn = document.getElementById("submitBtn");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = -1;

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function displayExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");

        li.textContent = `${expense.amount} - ${expense.category} - ${expense.description} `;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Expense";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            deleteExpense(index);
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit Expense";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", () => {
            editExpense(index);
        });

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        expenseList.appendChild(li);
    });
}

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const description = descriptionInput.value.trim();
    const category = categoryInput.value;

    if (!Number.isFinite(amount) || amount <= 0 || !description) {
        alert("Enter valid expense details");
        return;
    }

    const expense = {
        amount: amount,
        description: description,
        category: category
    };

    if (editIndex === -1) {
        expenses.push(expense);
    } else {
        expenses[editIndex] = expense;
        editIndex = -1;
        submitBtn.textContent = "Add Expense";
    }

    saveToLocalStorage();
    displayExpenses();
    expenseForm.reset();
});

function deleteExpense(index) {
    expenses.splice(index, 1);

    saveToLocalStorage();
    displayExpenses();

    if (editIndex === index) {
        editIndex = -1;
        expenseForm.reset();
        submitBtn.textContent = "Add Expense";
    } else if (editIndex > index) {
        editIndex--;
    }
}

function editExpense(index) {
    const expense = expenses[index];

    amountInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categoryInput.value = expense.category;

    editIndex = index;
    submitBtn.textContent = "Update Expense";
}

displayExpenses();
