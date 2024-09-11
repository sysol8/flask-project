// sidebar logic (toggle/collapse) 

const sidebar = document.getElementById('sidebar');

const saveSidebarState = (isCollapsed) => {
    localStorage.setItem('collapsed', isCollapsed);
};

const applySidebarState = () => {
    const isCollapsed = localStorage.getItem('collapsed');
    if (isCollapsed) {
        sidebar.style.width = isCollapsed;
    }
};

const toggleSidebar = () => {
    sidebar.classList.toggle('collapsed');
};

window.addEventListener('load', () => {
    applySidebarState();
});

document.getElementById('menu-btn').addEventListener('click', toggleSidebar);

// task dialog

/* const taskDialogOpen = () => {
    const taskDialog = document.getElementById('task-dialog');
    taskDialog.showModal();
};

document.getElementById('close-dialog-btn').addEventListener('click', () => {
    const taskDialog = document.getElementById('task-dialog');
    taskDialog.close();
});

const taskForm = document.getElementById('task-form');

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskName = document.getElementById('input-name').value;
    const taskDescription = document.getElementById('input-description').value;

    const newTask = new Task(taskName, taskDescription);

    const taskGrid = document.querySelector('.task-grid');
    taskGrid.appendChild(newTask.render());

    const taskDialog = document.getElementById('task-dialog');
    taskDialog.close();

    taskForm.reset();
});

class Task {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.element = null; 
        this.isEditing = false; 
    }

    render() {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <div class="task-content">
                <h3 class="task-name">${this.name}</h3>
                <p class="task-description">${this.description}</p>
            </div>
            <div class="task-actions">
                <button class="edit-btn"><i class="bi bi-pencil-square"></i></button>
                <button class="delete-btn"><i class="bi bi-trash"></i></button>
            </div>
        `;

        this.element = taskCard;

        taskCard.querySelector('.edit-btn').addEventListener('click', () => this.toggleEditMode());
        taskCard.querySelector('.delete-btn').addEventListener('click', () => this.delete());

        return taskCard;
    }

    toggleEditMode() {
        const editBtnIcon = this.element.querySelector('.edit-btn i');

        if (this.isEditing) {
            const nameInput = this.element.querySelector('.task-name-input');
            const descriptionTextarea = this.element.querySelector('.task-description-textarea');

            this.name = nameInput.value;
            this.description = descriptionTextarea.value;

            this.element.querySelector('.task-content').innerHTML = `
                <h3 class="task-name">${this.name}</h3>
                <p class="task-description">${this.description}</p>
            `;

            editBtnIcon.classList.replace('bi-check', 'bi-pencil-square');

            this.isEditing = false;
        } else {
            this.element.querySelector('.task-content').innerHTML = `
                <input type="text" class="task-name-input" value="${this.name}">
                <textarea class="task-description-textarea">${this.description}</textarea>
            `;

            editBtnIcon.classList.replace('bi-pencil-square', 'bi-check');

            this.isEditing = true;
        }
    }

    delete() {
        if (this.element) {
            this.element.remove();
        }
    }
} */

// auth
