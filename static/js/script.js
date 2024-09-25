const sidebar = document.getElementById('sidebar');

const toggleSidebar = () => {
    const isCollapsed = sidebar.classList.toggle('collapsed');
};

document.getElementById('menu-btn').addEventListener('click', toggleSidebar);

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  if (link.pathname === activePage) {
    link.classList.add('active');

    const icon = link.querySelector('i');

    if (icon) {
      if (icon.id === 'home-icon') {
        icon.classList.replace('bi-house-door', 'bi-house-door-fill');
      } else if (icon.id === 'tasks-icon') {
        icon.classList.replace('bi-file-earmark', 'bi-file-earmark-fill');
      } else if (icon.id === 'messenger-icon') {
        icon.classList.replace('bi-envelope', 'bi-envelope-fill');
      } else if (icon.id === 'calendar-icon') {
        icon.classList.replace('bi-calendar', 'bi-calendar-fill');
      }
    }
  }
});

document.querySelector('nav i').classList.contains('active')

document.getElementById('show-login-dialog')?.addEventListener('click', function () {
    document.getElementById('auth-dialog').showModal();
});

document.getElementById('logout-btn')?.addEventListener('click', function () {
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = '/logout';
    document.body.appendChild(form);
    form.submit();
});

const showTaskDialog = () => {
    const taskDialog = document.getElementById('task-dialog')
    taskDialog.showModal()
};

document.getElementById('close-dialog-btn').addEventListener('click', () => {
    document.getElementById('task-dialog').close();
});

document.getElementById('task-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const taskName = document.getElementById('input-name').value;
    const taskDescription = document.getElementById('input-description').value;
    const taskStatus = document.getElementById('status-select').value;

    const taskData = {
        name: taskName,
        description: taskDescription,
        status: taskStatus
    };

    fetch('/tasks/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        addTaskCard(data.name, data.description, data.status);
        document.getElementById('task-dialog').close();
        document.getElementById('task-form').reset();
    })
    .catch(error => console.error('Error:', error));
});

const addTaskCard = (name, description, status) => {
    const taskGrid = document.querySelector('.task-grid');
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.innerHTML = `
        <div class="task-content">
            <h3>${name}</h3>
            <p>${description}</p>
            <p><strong>Status:</strong> ${status}</p>
        </div>
    `;
    taskGrid.appendChild(taskCard);
};