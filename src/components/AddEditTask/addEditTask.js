import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';
import taskPage from '../TaskPage/taskPage';

const formBuilder = (task) => {
  const form = `
  <div class="form-group form-row">
    <label for="form-task-name" class="col-sm-2">New Task</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" value="${task.name}" id="form-task-name" placeholder="Sample Task">
    </div>
  </div>
  `;
  return form;
};

const getTaskFromForm = () => {
  const task = {
    task: $('#form-task-name').val(),
    isCompleted: false,
  };
  console.log(task);
  return task;
};

const showAddForm = () => {
  const emptyTask = {
    task: '',
    isCompleted: '',
  };
  let domString = '<h2>Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button id="save-task">Save New Task</button>';
  $('#add-edit-task').html(domString).show();
  $('#tasks').hide();
  $('#completed').hide();
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

$('body').on('click', '#save-task', addNewTask);


export default { showAddForm };
