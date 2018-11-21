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
            <h5 class="card-title">${task.task}</h5>
            <div>
              Completed?
              <input class="completed-task" type="checkbox" aria-label="Checkbox for completed task">
            </div>
          </div>
          <div class="card-footer text-muted">
            <button class="delete-btn btn-light delete-btn float-left" data-delete-id=${task.id}>
              <img class="delete-img" data-delete-id=${task.id} src="https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/trash-icon-14-256.png">
            </button>
            <button class="edit-btn btn-xs btn-light delete-btn float-right" data-edit-id=${task.id}>
              <img class="edit-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvky5A7hhi5PtxaTg30CYVUQLIHzD_IdkXCHwfBAf0K2_mCs6Uag">
            </button>
          </div>
        </div>
      </div>
      `;
      $('#tasks').html(domString);
    }
  });
};

const tasksPage = () => {
  tasksData.getAllTasks()
    .then((tasksArray) => {
      printTasks(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  console.log(idToDelete);
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
