<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label for="text">Task</label>
      <input type="text" v-model="text" id="text" name="text" placeholder="Add Task" autocomplete="off" />
    </div>
    <div class="form-control">
      <label for="day">Day & Time</label>
      <input
        type="text"
        name="day"
        id="day"
        v-model="day"
        autocomplete="off"
        placeholder="Add Day & Time"
      />
    </div>
    <div class="form-control form-control-check">
      <label for="checkbox">Set Reminder</label>
      <input id="checkbox" type="checkbox" v-model="reminder" name="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>  
</template>

<script>
    export default {
        name: 'AddTask',
        methods: {
          onSubmit(e) {
            e.preventDefault();

            if(!this.text) {
              alert('Please add a task');
              return;
            }

            if(!this.day) {
              alert('Please add a date');
              return;
            }

            const newTask = {
           //  id: Math.floor(Math.random() * 10000),  // Not ideal for a real app, beacause ids must be unique
               text: this.text,
               day: this.day,
               reminder: this.reminder,
               updateMode: false
            }

            this.$emit('add-task', newTask);

            this.cleanTaskForm();

          },
          cleanTaskForm() {
            this.text= '';
            this.day = '';
            this.reminder= true;
          }
        },
        data() {
          return {
            text: '',
            day: '',
            reminder: true,
            updateMode: false
          }
        }
    }
</script>

<style scoped>
  .add-form {
    margin-bottom: 40px;
  }
  .form-control {
    margin: 20px 0;
  }
  .form-control label {
    display: block;
  }
  .form-control input {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
  }
  .form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .form-control-check label {
    flex: 1;
  }
  .form-control-check input {
    flex: 2;
    height: 20px;
  }
</style>