import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import taskPage from '../TaskPage/taskPage';

const formBuilder = (task) => {
  const form = `
  <div class="form-group mt-5">
    <div class="input-group mb-2 mx-auto">
      <div class="input-group-prepend">
        <div class="input-group-text">Task</div>
      </div>    
        <input type="text" class="form-control" value="${task.task}" id="form-task-name" placeholder="Sample Task">
    </div> 
    <div class="input-group mb-2 mx-auto">
      <div class="input-group-prepend">
        <div class="input-group-text">Completed?</div>
      </div>   
        <input type="text" class="form-control" value="${task.isCompleted}" id="form-task-completed" placeholder="True/False">
    </div>    
  </div>
  `;
  return form;
};

const getTaskFromForm = () => {
  const completeBoo = JSON.parse($('#form-task-completed').val().toLowerCase());
  const task = {
    task: $('#form-task-name').val(),
    isCompleted: completeBoo,
  };
  return task;
};

const showAddForm = () => {
  const emptyTask = {
    task: '',
    isCompleted: '',
  };
  let domString = '<h2 class="mt-5">Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button class="mb-3" id="save-task">Save Task</button>';
  $('#all-tasks').hide();
  $('#add-edit-task').html(domString).show();
};

const addNewTask = () => {
  const newTask = getTaskFromForm();
  tasksData.addNewTask(newTask)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#tasks').show();
      $('#completed').show();
      taskPage.tasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  tasksData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h2 class="mt-5">Edit Task</h2>';
      domString += formBuilder(singleTask);
      domString += `<button class="mb-3" id="edit-task" data-single-task-id="${singleTask.id}">Save Task</button>`;
      $('#add-edit-task').html(domString).show();
      $('#all-tasks').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateTask = (e) => {
  const updatedTask = getTaskFromForm();
  const taskId = e.target.dataset.singleTaskdId;
  tasksData.updateTask(updatedTask, taskId)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#completed').show();
      taskPage.tasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const completeTask = (e) => {
  const taskId = e.target.dataset.completedId;
  tasksData.getSingleTask(taskId)
    .then((singleTask) => {
      const updatedTask = {
        task: singleTask.task,
        isCompleted: e.target.checked,
      };
      tasksData.updateTask(updatedTask, taskId)
        .then(() => {
          $('#tasks').html('');
          $('#completed').html('');
          taskPage.tasksPage();
        });
    })
    .catch((error) => {
      console.error('error in getting single for completed', error);
    });
};

$('body').on('click', '#save-task', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);
$('body').on('click', completeTask);

export default { showAddForm };
