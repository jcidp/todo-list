import "./style.css";

const taskFactory = (title, description, due_date, priority) => {
    return {
        title,
        description,
        due_date,
        priority,
        done: false,
        created_at: new Date(),
    }
}

const projectFactory = (name, task_list) => {
    return {
        name,
        task_list,
    }
}

const appController = (() => {
    
})();

const myTask = taskFactory("Print book", "Print the book I need to print", new Date(), 1);
console.log(myTask.title);
console.log(myTask.title = "Cool new title");
console.log(myTask.title);
console.log(myTask.created_at);
console.log(myTask);