import $ from 'jquery';

const formBuilder = () => {
  const form = `
  <div class="form-group">
    <label for="form-task-name">Task</label>
    <input type="text" class="form-control" id="form-friend-name" placeholder="John Smith">
  </div>
  `;
  return form;
};

const getTaskFromForm = () => {
  const task = {
    task: $('#form-task-name').val(),
    isCompleted: false,
  };
};