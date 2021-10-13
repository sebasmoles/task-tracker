<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask" title="Task Tracker" :showAddTask="showAddTask" />
    <AddTask v-show="showAddTask" @add-task="addTask" ref="addTaskComponent" />
    <p v-if="errorMessage" class="error-message">{{errorMessage}}</p>
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" 
           @toggle-update-mode="toggleUpdateMode" 
           @update-task="updateTask" :tasks="tasks"/>
    <p class="tip-message">Tip: Double click a task to set/unset a reminder</p>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Tasks from './components/Tasks.vue';
  import AddTask from './components/AddTask.vue';

  export default {
    name: 'App',
    components: {
      Header,
      Tasks,
      AddTask
    },
    data () {
      return {
        tasks: [],
        showAddTask: false,
        errorMessage: ''
      }
    },
    methods: {
     async addTask(task) {
          const res = await fetch('api/tasks',  {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(task)
          });

          if (res.ok) {
              const data = await res.json();
              this.tasks = [...this.tasks, data];
              this.errorMessage = '';
              this.toggleAddTask();
          } else {
              alert('Error adding task');
          }
      },
      async deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            const res = await fetch(`api/tasks/${id}`, {
              method: 'DELETE'
            })

            if (res.ok) {
              this.tasks = this.tasks.filter((task) => task.id !== id);
              this.tasks.length === 0 ? (this.errorMessage = 'There are no tasks to show, please add one') : this.tasks;
            } else {
                alert('Error deleting task');
            }
        } 
      },
      async updateTask(task) {
        const res =  await fetch(`api/tasks/${task.id}`, {
              method: 'PUT',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(task)
            });

        res.ok ? (this.toggleUpdateMode(task.id)) : alert('Error updating task'); // Just for changing update mode on UI, besides testing
      },
      toggleUpdateMode(id) {
          this.tasks = this.tasks.map((task) => task.id === id ? { ...task, updateMode: !task.updateMode} : task);
      },
      async toggleReminder(id) {
        const taskToToggle = await this.fetchTask(id);
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder};

        const res =  await fetch(`api/tasks/${id}`, {
              method: 'PUT',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(updTask)
            });
        
        const data = await res.json();

        this.tasks = this.tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task);
      },
      toggleAddTask() {
        this.showAddTask = !this.showAddTask;
        this.$refs.addTaskComponent.cleanTaskForm();
      },
      async fetchTasks() {
        const res =  await fetch('api/tasks');
        if(res.ok) { 
          const data = await res.json();
          return data;
        }  else {
            this.errorMessage = "Something went wrong with the server";
        }
      },
      async fetchTask(id) {
        const res =  await fetch(`api/tasks/${id}`);
        const data = await res.json();
        return data;
      }      
    },
    async created() {
      this.tasks = await this.fetchTasks();
      this.tasks.length === 0 ? (this.errorMessage = 'There are no tasks to show, please add one') : this.tasks;
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
  }
  .container {
    max-width: 500px;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);  
  }
  .btn {
    display: inline-block;
    background: blue;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
    -webkit-appearance: none;
  }
  .btn:focus {
    outline: none;
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn-block {
    display: block;
    width: 100%;
  }
  .tip-message {
    margin-top: 30px;
    text-align: center;
  }

  /* Media queries and responsive design */
  @media only screen and (max-width: 600px) { 
      .container {
        box-shadow: none 
      }  
    };
</style>
