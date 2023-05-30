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
        this.radioAreaEl = this.inputContainerEl.querySelector('#radio-area');
        this.filterRadioBtnEls = this.radioAreaEl.querySelectorAll('input[name="filter"');
    }

    addEvent() {
        this.addBtnEl.addEventListener("click", this.onClickAddBtn.bind(this));
        this.todoListEl.addEventListener("click", this.onClickTodoList.bind(this));
        this.addRadioBtnEvent();
    }

    addRadioBtnEvent() {
        for(const filterRadioBtnEl of this.filterRadioBtnEls) {
            filterRadioBtnEl.addEventListener('click', this.onClickRadioBtn.bind(this));
        }
    }

    onClickRadioBtn(event) {
        const { value } = event.target;
        console.log(value);
        this.filterTodo(value);
    }

    filterTodo(status) {
        const todoDivEls = this.todoListEl.querySelectorAll('div.todo');
        for(const todoDivEl of todoDivEls) {
            switch(status) {
                case 'ALL':
                    todoDivEl.style.display = 'flex';
                    break;
                case 'DONE':
                    todoDivEl.style.display = todoDivEl.classList.contains('done') ? 'flex' : 'none';
                    break;
                case 'TODO':
                    todoDivEl.style.display = todoDivEl.classList.contains('done') ? 'none' : 'flex';
                break;
            }
        }
    }

    onClickTodoList(event) {
        const {target} = event;
        // 주어진 CSS 선택자와 일치하는 요소를 찾을 때까지, 
        // 자기 자신을 포함해 위쪽(부모 방향, 문서 루트까지)으로 문서 트리
        const btn = target.closest('button');
        if(!btn) {
            return;
        }
        if(btn.matches('#delete-btn')) { //querySelector
            this.deleteTodo(target);
        } else if(btn.matches('#edit-btn')) {
            this.editTodo(target);
        } else if(btn.matches('#save-btn')) {
            this.saveTodo(target);
        } else if(btn.matches('#complete-btn')) {
            this.completeTodo(target);
        }
    }

    completeTodo(target) {
        const todoDiv = target.closest('.todo');
        todoDiv.classList.toggle('done');
    }

    saveTodo(target) {
        const todoDiv = target.closest('.todo');
        todoDiv.classList.remove('edit');
        const todoInputEl = todoDiv.querySelector('input');
        todoInputEl.readOnly = true;
    }

    editTodo(target) {
        const todoDiv = target.closest('.todo');
        const todoInputEl = todoDiv.querySelector('input');
        todoInputEl.readOnly = false;
        todoInputEl.focus();
        todoDiv.classList.add('edit');
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