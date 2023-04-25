import '@fortawesome/fontawesome-free/js/all.min.js'
import "../scss/style.scss"

class TodoList {
    constructor() {
        this.assignElement();
        this.addEvent();
    }

    assignElement() {
        this.inputContainerEl = document.getElementById("input-container");
        this.inputAreaEl = this.inputContainerEl.querySelector("#input-area");
        this.todoInputEl = this.inputAreaEl.querySelector("#todo-input");
        this.addBtnEl = this.inputAreaEl.querySelector("#add-btn");
        this.todoContainerEl = document.getElementById('todo-container');
        this.todoListEl = this.todoContainerEl.querySelector("#todo-list");
    }

    addEvent() {
        this.addBtnEl.addEventListener("click", this.onClickAddBtn.bind(this));
        this.todoListEl.addEventListener("click", this.onClickTodoList.bind(this));
    }

    onClickTodoList(event) {
        const {target} = event;
        // 주어진 CSS 선택자와 일치하는 요소를 찾을 때까지, 
        // 자기 자신을 포함해 위쪽(부모 방향, 문서 루트까지)으로 문서 트리
        const btn = target.closest('button');
        if(btn.matches('#delete-btn')) { //querySelector
            this.deleteTodo(target);
        }
    }

    deleteTodo(target) {
        const todoDiv = target.closest('.todo');
        todoDiv.addEventListener('transitionend', () => {
            todoDiv.remove();
        }); 
        todoDiv.classList.add('delete');
    }

    onClickAddBtn() {
        if(this.todoInputEl.value.length === 0) {
            alert("내용을 입력해주세요.");
            return;
        }

        this.createTodoElement(this.todoInputEl.value);
    }

    createTodoElement(value) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const todoContent = document.createElement("input");
        todoContent.value = value;
        todoContent.readOnly = true;
        todoContent.classList.add('todo-item');
        const fragment = new DocumentFragment();
        fragment.appendChild(todoContent);
        fragment.appendChild(
            this.createButton('complete-btn', 'complete-btn', ['fas', 'fa-check']),
        );
        fragment.appendChild(
            this.createButton('edit-btn', 'edit-btn', ['fas', 'fa-edit']),
        );
        fragment.appendChild(
            this.createButton('delete-btn', 'delete-btn', ['fas', 'fa-trash']),
        );
        fragment.appendChild(
            this.createButton('save-btn', 'save-btn', ['fas', 'fa-save']),
        );
        todoDiv.appendChild(fragment);
        this.todoListEl.appendChild(todoDiv);
        this.todoInputEl.value = '';
    }

    createButton(btnId, btnClassName, iconClassName) {
        const btn = document.createElement('button');
        const icon = document.createElement('i');
        icon.classList.add(...iconClassName);
        btn.appendChild(icon);
        btn.id = btnId;
        btn.classList.add(btnClassName);
        return btn;
    }
}

// dom이 완성됐을 때,
document.addEventListener("DOMContentLoaded", () => {
    const todoList = new TodoList();
})