import $ from 'jquery';
import tasksData from '../../helpers/data/tasksData';

const printTasks = (tasksArray) => {
  let domString = '';
  tasksArray.forEach((task) => {
    if (task.isCompleted === false) {
      domString += `
      <div class="col-3 mx-auto">
        <div class="card mt-5">
          <div class="card-body">
            <h5 class="card-title data-task-id=${task.task}">${task.task}</h5>
            <div class="form-check">
              <input class="form-check-input completed-task" type="checkbox" value="${task.isCompleted}" data-completed-id=${task.id} data-completed-task=${task.task}>
              <label class="form-check-label" for="defaultCheck1">
                Completed?
              </label>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button class="delete-btn btn-light delete-btn float-left" data-delete-id=${task.id}>
              <img class="delete-img" data-delete-id=${task.id} src="https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/trash-icon-14-256.png">
            </button>
            <button class="edit-btn btn-light edit-btn float-right" data-edit-id=${task.id}>
              <img class="edit-img" data-edit-id=${task.id} src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Blue_pencil.svg/2000px-Blue_pencil.svg.png">
            </button>
          </div>
        </div>
      </div>
      `;
      $('#tasks').html(domString);
    }
  });
};

const printCompletedTasks = (tasksArray) => {
  let domString = '';
  tasksArray.forEach((task) => {
    if (task.isCompleted === true) {
      domString += `
      <div class="col-3 mx-auto">
        <div class="card mt-5 data-task-id=${task.task}" id=${task.id}>
          <div class="card-body">
            <h5 class="card-title">${task.task}</h5>
            <div class="form-check">
              <input class="form-check-input completed-task" type="checkbox" value="${task.isCompleted}" data-completed-id=${task.id} checked data-completed-task=${task.task}>
              <label class="form-check-label" for="defaultCheck1">
                Completed?
              </label>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button class="delete-btn btn-light delete-btn float-left" data-delete-id=${task.id}>
              <img class="delete-img" data-delete-id=${task.id} src="https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/trash-icon-14-256.png">
            </button>
            <button class="edit-btn btn-light edit-btn float-right" data-edit-id=${task.id}>
              <img class="edit-img" data-edit-id=${task.id} src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Blue_pencil.svg/2000px-Blue_pencil.svg.png">
            </button>
          </div>
        </div>
      </div>
      `;
      $('#completed').html(domString);
    }
  });
};

const tasksPage = () => {
  tasksData.getAllTasks()
    .then((tasksArray) => {
      printTasks(tasksArray);
      printCompletedTasks(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  tasksData.deleteTaskData(idToDelete)
    .then(() => {
      tasksPage();
    })
    .catch((error) => {
      console.error('error in deleting friend', error);
    });
};

$('body').on('click', '.delete-btn', deleteTask);

export default { tasksPage };
