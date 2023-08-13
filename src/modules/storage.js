export {storageAvailable, populateStorage};

function storageAvailable() {
    let storage;
    try {
        storage = window["localStorage"];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === "QuotaExceededError" ||
            // Firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

const populateStorage = (project_list, current_project) => {
    let obj = {};
    project_list.forEach(project => {
        let project_obj = {};
        project.getTaskList().forEach(task => {
            let task_obj = {};
            task_obj.title = task.getTitle();
            task_obj.description = task.getDescription();
            task_obj.due_date = task.getDueDate();
            task_obj.priority = task.getPriority();
            task_obj.done = task.getDone();
            task_obj.created_at = task.getCreatedAt();
            project_obj[task.getTitle()] = task_obj;
        });
        obj[project.getName()] = project_obj;
    });
    localStorage.setItem("localProjectList", JSON.stringify(obj));
    localStorage.setItem("lastActiveProject", current_project.getName());
};