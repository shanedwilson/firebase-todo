import $ from 'jquery';

const formBuilder = () => {
  const form = `
  <div class="form-group form-row">
    <label for="form-task-name" class="col-sm-2">New Task</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="form-friend-name" placeholder="Sample Task">
    </div>    
  </div>
  `;
  $('#new-task').html(form);
};

// const getTaskFromForm = () => {
//   const task = {
//     task: $('#form-task-name').val(),
//     isCompleted: false,
//   };
// };

export default { formBuilder };
