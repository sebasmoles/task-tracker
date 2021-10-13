<template>
    <div v-if="task.updateMode">
        <div class="task" :class="{ 'reminder': task.reminder }">
        <h3>
            <input class="task-input margin-bottom" type="text" v-model="task.text" placeholder="Add task">
            <div class="buttons">
                <i @click="onUpdate" class="fas fa-check-circle"></i>
                <i @click="$emit('delete-task', task.id)" class="fas fa-times"></i>
            </div>
        </h3>
        <input class="task-input" type="text" v-model="task.day" placeholder="Add Day & Time">
    </div> 
    </div>
    
    <div v-else @dblclick="$emit('toggle-reminder', task.id)" class="task" :class="{ 'reminder': task.reminder }">
        <h3>
            {{  task.text }}
            <div class="buttons">
                <i @click="$emit('toggle-update-mode', task.id)" class="fas fa-edit"></i>
                <i @click="$emit('delete-task', task.id)" class="fas fa-times"></i>
            </div>
        </h3>
        <p>{{ task.day }}</p>
    </div> 
</template>

<script>
    export default {
        name: 'Task',
        props: {
            task: Object
        },
        methods: {
            onUpdate () {
                if(!this.task.text) {
                    alert('Please add a task');
                    return;
                }

                if(!this.task.day) {
                    alert('Please add a date');
                    return;
                }
                
                const taskToUpdate = {
                    id:   this.task.id,
                    text: this.task.text,
                    day:  this.task.day,
                    reminder: this.task.reminder,
                    updateMode: false
                }
                
                this.$emit('update-task', taskToUpdate);           
            }
        }
    }
</script>

<style scoped> 
    .fas {
        color: grey;
        margin-left: 10px;
    }

    .fas:hover {
        color: blue;
    }

    .fa-check-circle {
        color: blue;
    }

    .task {
        background: #f4f4f4;
        margin: 5px;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 5px;
    }

    .task:hover {
        background: white;
    }

    .task.reminder {
        border-left: 5px solid blue;
    }

    .task h3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .buttons {
        min-width: 55px;
    }

    .task-input {
        font-family: 'Poppins', sans-serif;
        padding: 5px;
        width: 100%;
        font-size: 18px;
        border-radius: 5px;
        border: 1px solid lightgray;
    }

    .margin-bottom {
        margin-bottom: 8px;
    }

</style>