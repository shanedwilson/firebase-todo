import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import taskPage from '../TaskPage/taskPage';
import timestamp from '../../helpers/timestamp';

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
  const utcDate = timestamp.currentTime();
  const task = {
    task: $('#form-task-name').val(),
    created: utcDate,
    isCompleted: completeBoo,
  };
  return task;
};

const showAddForm = () => {
  const emptyTask = {
    task: '',
    created: '',
    isCompleted: '',
  };
  let domString = '<h2 class="mt-5">Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button class="mb-3" id="save-task">Save Task</button>';
  domString += '<button class="mb-3 ml-3 btn-danger" id="back-btn">Cancel</button>';
  $('#all-tasks').hide();
  $('#add-task').html(domString).show();
};

const addNewTask = () => {
  const newTask = getTaskFromForm();
  tasksData.addNewTask(newTask)
    .then(() => {
      $('#add-task').html('').hide();
      $('#all-tasks').show();
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
      const domString = `
      <div class="col-6 mx-auto">
        <div class="card text-white bg-secondary mt-5">
          <div class="card-body">
            <div class="input-group mb-2 mx-auto">  
              <input type="text" class="form-control edit-form-input" value="${singleTask.task}" id="edit-form-task-name">
            </div> 
            <div class="card-timestamp">Todo since: ${singleTask.created}</div>
            <div class="form-check">
              <input class="form-check-input completed-task" type="checkbox" id="edit-form-task-completed" value="${singleTask.isCompleted}" data-completed-id=${singleTask.id} data-completed-task=${singleTask.task}>
              <label class="form-check-label" for="defaultCheck1">
                Completed?
              </label>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button class="mb-3 btn-light float-left" id="edit-task" data-single-task-id="${singleTask.id}">Save Task</button>
            <button class="mb-3 btn-danger float-right" id="back-btn">Cancel</button>
          </div>
        </div>
      </div>
      `;
      $('#edit-div').html(domString).show();
      $('#all-tasks').hide();
      $('#edit-form-task-name').focus();
    });
};

const updateTask = (e) => {
  const taskId = e.target.dataset.singleTaskId;
  const completeBoo = JSON.parse($('#edit-form-task-completed').val().toLowerCase());
  const utcDate = timestamp.currentTime();
  const updatedTask = {
    task: $('#edit-form-task-name').val(),
    created: utcDate,
    isCompleted: completeBoo,
  };
  tasksData.updateTask(updatedTask, taskId)
    .then(() => {
      $('#edit-div').html('').hide();
      $('#all-tasks').show();
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
      const utcDate = timestamp.currentTime();
      const updatedTask = {
        task: singleTask.task,
        created: utcDate,
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

const refreshPage = () => {
  taskPage.tasksPage();
  $('#add-task').hide();
  $('#all-tasks').show();
  $('#navbar-button-new').show();
};

$('body').on('click', '#save-task', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);
$('body').on('change', '.completed-task', completeTask);
$('body').on('click', '#back-btn', refreshPage);

$('body').on('keyup', '#add-task', (e) => {
  if (e.keyCode === 13) {
    addNewTask();
  }
});

$('body').on('keyup', '#edit-div', (e) => {
  if (e.keyCode === 13) {
    updateTask(e);
  }
});

export default { showAddForm };
