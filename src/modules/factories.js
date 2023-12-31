import {format, add} from "date-fns";

const Task = (new_title, new_description, new_due_date, new_priority, new_done, new_created_at) => {
    let title = new_title;
    let description = new_description || "No description";
    let due_date = add(new_due_date, {hours: parseInt(format(new_due_date, "x")) * -1});
    let priority = new_priority;
    let done = new_done || false;
    let created_at = new_created_at || new Date();

    const getTitle = () => title;
    const setTitle = (new_title) => title = new_title;

    const getDescription = () => description;
    const setDescription = (new_description) => description = new_description || "No description";

    const getDueDate = () => due_date;
    const setDueDate = (new_due_date) => due_date = add(new_due_date, {hours: parseInt(format(new_due_date, "x")) * -1});

    const getPriority = () => priority;
    const setPriority = (new_priority) => priority = new_priority;

    const getDone = () => done;
    const toggleDone = () => done = done ? false : true;

    const getCreatedAt = () => created_at;

    return {
        getTitle,
        setTitle,
        getDescription,
        setDescription,
        getDueDate,
        setDueDate,
        getPriority,
        setPriority,
        getDone,
        toggleDone,
        getCreatedAt
    }
}

const Project = (initial_name, initial_task_list) => {
    let name = initial_name;
    let task_list = initial_task_list;

    const getName = () => name;
    const setName = (new_name) => name = new_name;
    
    const getTaskList = () => task_list;
    const addTask = (task) => task_list.push(task);
    const deleteTask = (task_title) => 
        task_list = task_list.filter(current_task => 
            current_task.getTitle() != task_title
        );

    const getTaskFromTitle = (title) =>
        task_list.filter(task => task.getTitle() === title)[0];

    return {
        getName,
        setName,
        getTaskList,
        addTask,
        deleteTask,
        getTaskFromTitle,
    };
}

export {Task, Project};