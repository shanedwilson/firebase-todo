import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../db/apiKeys.json';
// import authHelpers from '../Auth/auth';

const printTasks = (tasksArray) => {
  let domString = '';
  tasksArray.forEach((task) => {
    domString += `
    <div class="col-3">
      <div class="card mt-5">
        <div class="card-body">
          <h5 class="card-title">${task.task}</h5>
          <div>
            Completed?
            <input type="checkbox" aria-label="Checkbox for completed task">
          </div>
        </div>
        <div class="card-footer text-muted">
          <button class="delete-btn btn-xs btn-light delete-btn float-left" data-delete-id=${task.id}>
            <img class="delete-img" src="https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/trash-icon-14-256.png">
          </button>
          <button class="edit-btn btn-xs btn-light delete-btn float-right" data-edit-id=${task.id}>
            <img class="edit-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvky5A7hhi5PtxaTg30CYVUQLIHzD_IdkXCHwfBAf0K2_mCs6Uag">
          </button>
        </div>
      </div>
    </div>
    `;
  });
  $('#tasks').html(domString);
};

const tasksPage = () => {
  axios.get(`${apiKeys.firebaseKeys.databaseURL}/tasks.json`)
    .then((results) => {
      const tasksObject = results.data;
      const tasksArray = [];
      if (tasksObject !== null) {
        Object.keys(tasksObject).forEach((taskId) => {
          tasksObject[taskId].id = taskId;
          tasksArray.push(tasksObject[taskId]);
        });
      }
      printTasks(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  axios.delete(`${apiKeys.firebaseKeys.databaseURL}/tasks/${idToDelete}.json`)
    .then(() => {
      tasksPage();
    })
    .catch((error) => {
      console.error('error in deleting friend', error);
    });
};

$('body').on('click', '.delete-btn', deleteTask);

export default { tasksPage };
