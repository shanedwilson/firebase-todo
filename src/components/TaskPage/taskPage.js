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
          <button class="btn-xs btn-danger delete-btn float-left" data-delete-id=${task.id}>X</button>
          <h5 class="card-title">${task.task}</h5>
          <div>
            Completed?
            <input type="checkbox" aria-label="Checkbox for completed task">
          </div>
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

export default { tasksPage };
