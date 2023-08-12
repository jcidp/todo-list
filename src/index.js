import "./style.css";
import {Task, Project} from  "./modules/factories";
import loadNav from "./components/nav";
import loadFooter from "./components/footer";
import loadMain from "./components/tasks";
import createElement from "./helpers/createElement";

const appController = (() => {
    let project_list = [];
    let current_project;

    const getProjectList = () => project_list;
    const getCurrentProject = () => current_project;

    const getProjectFromName = (name) => {
        return project_list.filter(project => {
            return project.getName() === name
        })[0];
    };

    const addProject = (project) => {
        project_list.push(project);
        changeCurrentProject(project);
    };

    const changeCurrentProject = (project) => current_project = project;

    const deleteProject = (project_name) => {
        project_list = project_list.filter(project => project.getName() != project_name);
        current_project = project_list.length ? project_list[0] : null;
    };

    //const addTaskToCurrentProject = (task) => current_project.addTask(task);
    //const deleteTaskFromCurrentProject = (task) => current_project.deleteTask(task);

    const initialSetup = () => {
        const my_project = Project("Today", []);
        addProject(my_project);
        changeCurrentProject(my_project);
    };

    const test = () => {
        addProject(Project("Project Test", []));
        const task1 = Task("Task1", "Desc1", new Date(), 1);
        const task2 = Task("Task2", "Desc2", new Date(), 2);
        current_project.addTask(task1);
        current_project.addTask(task2);
        current_project.addTask(Task("Task3", "Desc3", new Date(), 1));
        current_project.getTaskList()[2].toggleDone();
        current_project.addTask(Task("Task4", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse sed nisi lacus sed viverra tellus. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc.", new Date(), 3));
        current_project.addTask(Task("Task5", "Desc5", new Date(), 3));
        current_project.addTask(Task("Task6", "Desc6", new Date(), 3));
        current_project.setName("Cool Project Test");
        //deleteProject("Today");
        //addProject(Project("Project Test", []));
        //current_project.addTask(Task("Task7", "Desc7", new Date(), 3));
    };

    return {
        getProjectList,
        getCurrentProject,
        getProjectFromName,
        addProject,
        changeCurrentProject,
        deleteProject,
        //addTaskToCurrentProject,
        //deleteTaskFromCurrentProject,
        initialSetup,
        test,
    };
})();

const DOMController = (() => {
    const renderPage = () => {
        loadNav(appController.getProjectList(), appController.getCurrentProject().getName());
        loadMain(appController.getCurrentProject().getTaskList());
        loadFooter();
        addListeners();
    };

    const addListeners = () => {
        const newListBtn = document.querySelector(".new-list.new");
        newListBtn.addEventListener("click", createProject);

        const newTaskBtn = document.querySelector(".new-task.new");
        newTaskBtn.addEventListener("click", renderNewTaskPopup);

        const projects = document.querySelectorAll(".project-title");
        projects.forEach(project => project.addEventListener("click", selectProject));

        const tasks = document.querySelectorAll(".task");
        tasks.forEach(task => task.addEventListener("click", selectTask));

        const checks = document.querySelectorAll("input[type=checkbox]");
        checks.forEach(check => check.addEventListener("click", toggleTaskDone));

        const deletes = document.querySelectorAll("svg.delete");
        deletes.forEach(svg => svg.addEventListener("click", deleteTask));

        const projectEdits = document.querySelectorAll(".project-edit.pencil");
        projectEdits.forEach(editor => editor.addEventListener("click", editProject));
    };

    function toggleTaskDone(e) {
        const title = e.target.parentElement.nextSibling.textContent;
        appController.getCurrentProject().getTaskFromTitle(title).toggleDone();
    }

    function selectProject(e){
        const current_project = appController.getProjectFromName(e.target.textContent);
        appController.changeCurrentProject(current_project);
        deletePage();
        renderPage();
    }

    function createProject() {
        renderNewListPopup();
        document.querySelector(".new-list.add").addEventListener("click", addNewList);
        document.querySelector(".new-list.cancel").addEventListener("click", cancelNewList);
    }

    function editProject(e) {
        const name = e.target.closest(".project").firstChild.textContent;
        console.log(name);
        renderNewListPopup();
        document.querySelector(".new-list.add").addEventListener("click", editProject);
        document.querySelector(".new-list.cancel").addEventListener("click", cancelNewList);
    }

    function editProject(e) {
        e.preventDefault();
        const formData = document.forms["new-list"];
        const name = formData["name"].value;
        if (!name) return showError("Please include a name");
        if (appController.getProjectList().map(project => project.getName()).includes(name)) return showError("That list already exists");
    
        appController.addProject(Project(name, []));
    
        deletePage();
        renderPage();
    }

    function selectTask(e) {
        const target = e.target;
        if (!target.classList.contains("expand")) return;
        const parent = target.classList.contains("task") ? target :
            target.closest(".task");
        const description = [...parent.childNodes].filter(node => node.classList.contains("task-description"))[0];
        description.classList.toggle("hidden");
    }

    function renderNewListPopup() {
        const popup = createElement("div", "", ["new-list", "popup"]);
        const form = createElement("form", "", "", [
            ["name", "new-list"],
        ]);
        form.appendChild(createElement("p", "", ["new-list", "error"]));
        form.appendChild(createElement("input", "", ["new-list", "name"],[
            ["name", "name"],
            ["type", "text"],
            ["placeholder", "List name *"],
            ["minlength", "1"],
            ["autocomplete", "off"],
            //TODO: Add validation to avoid repeated names
        ]));

        const add = createElement("button", "Add", ["new-list", "add"]);
        form.appendChild(add);
        
        const cancel = createElement("button", "Cancel", ["new-list", "cancel"]);
        form.appendChild(cancel);

        popup.appendChild(form);
    
        document.querySelector("body").insertBefore(
            popup,
            document.querySelector("nav")
        );

        document.querySelector(".new-list.name").focus();
    }
    
    function cancelNewList(e) {
        e.preventDefault();
        document.querySelector("body").removeChild(
            document.querySelector(".new-list.popup")
        );
    }
    
    function addNewList(e) {
        e.preventDefault();
        const formData = document.forms["new-list"];
        const name = formData["name"].value;
        if (!name) return showError("Please include a name");
        if (appController.getProjectList().map(project => project.getName()).includes(name)) return showError("That list already exists");
    
        appController.addProject(Project(name, []));
    
        deletePage();
        renderPage();
    }

    function showError(error) {
        const errorEle = document.querySelector(".error");
        errorEle.textContent = error;
    }

    function renderNewTaskPopup() {
        const popup = createElement("div", "", ["new-task", "popup"]);
        const form = createElement("form", "", "", [
            ["name", "new-task"],
        ]);
        form.appendChild(createElement("p", "", ["new-task", "error"]));
        form.appendChild(createElement("input", "", ["new-task", "name"],[
            ["name", "name"],
            ["type", "text"],
            ["placeholder", "Task name *"],
            ["minlength", "1"],
            ["autocomplete", "off"],
            //TODO: Add validation to avoid repeated names
        ]));
        const date = createElement("label", "Due Date: *", "", [["for", "date"]]);
        date.appendChild(createElement("input", "", ["new-task", "date"],[
            ["name", "date"],
            ["type", "date"],
        ]));
        form.appendChild(date);

        const priorityInput = createElement("select", "", ["new-task", "priority"],[
            ["name", "priority"],
        ]);
        priorityInput.appendChild(createElement("option", "1", "", [
            ["value", "1"],
            ["selected", true]
        ]));
        priorityInput.appendChild(createElement("option", "2", "", [
            ["value", "2"]
        ]));
        priorityInput.appendChild(createElement("option", "3", "", [
            ["value", "3"]
        ]));
        const priority = createElement("label", "Priority: *", "", [["for", "priority"]]);
        priority.appendChild(priorityInput);
        form.appendChild(priority);

        form.appendChild(createElement("textarea", "", ["new-task", "description"],[
            ["name", "description"],
            ["placeholder", "Description"],
            ["autocomplete", "off"],
        ]));
        
        const add = createElement("button", "Add", ["new-task", "add"]);
        add.addEventListener("click", addNewTask);
        form.appendChild(add);

        const cancel = createElement("button", "Cancel", ["new-task", "cancel"]);
        cancel.addEventListener("click", cancelNewTask);
        form.appendChild(cancel);

        popup.appendChild(form);
    
        document.querySelector("body").insertBefore(
            popup,
            document.querySelector("nav")
        );

        document.querySelector(".new-task.name").focus();
    }

    function cancelNewTask(e) {
        e.preventDefault();
        document.querySelector("body").removeChild(
            document.querySelector(".new-task.popup")
        );
    }

    function addNewTask(e) {
        e.preventDefault();
        const formData = document.forms["new-task"];
        const name = formData["name"].value;
        if (!name) return showError("Please include a task name");
        if (appController.getCurrentProject().getTaskList().map(task => task.getTitle()).includes(name)) return showError("That task already exists");
        const date = formData["date"].value;
        if (!date) return showError("Please include a due date");
        const priority = formData["priority"].value;
        if (!priority) return showError("Please choose a priority");
        const description = formData["description"].value;

        appController.getCurrentProject().addTask(Task(name, description, new Date(date), priority));
        
        deletePage();
        renderPage();
    }

    function deleteTask(e) {
        const line = e.target.closest(".task-line");
        const title = [...line.childNodes].filter(child =>
            child.classList.contains("task-name"))[0].textContent;
        console.log(title);

        appController.getCurrentProject().deleteTask(title);

        deletePage();
        renderPage();
    }

    function deletePage() {
        const body = document.querySelector("body");
        let child = body.firstChild;
        while (child) {
            body.removeChild(child);
            child = body.firstChild;
        }
    }

    return {
        renderPage
    };
})();

appController.initialSetup();
appController.test();

DOMController.renderPage();

//document.querySelector(".new-task.new").click();

export default appController;

/*
    const test = () => {
        console.log(current_project.getName());
        addProject(Project("Project Test", []));
        const task1 = Task("Task1", "Desc1", new Date(), 1);
        const task2 = Task("Task2", "Desc2", new Date(), 2);
        console.log(current_project.getName());
        console.log(current_project.getTaskList().map(task => task.getTitle()));
        current_project.addTask(task1);
        current_project.addTask(task2);
        current_project.addTask(Task("Task3", "Desc3", new Date(), 1));
        console.log(current_project.getTaskList()[2].getDone());
        current_project.getTaskList()[2].toggleDone();
        console.log(current_project.getTaskList()[2].getDone());
        console.log(current_project.getTaskList().map(task => task.getTitle()));
        current_project.deleteTask(task2);
        current_project.addTask(Task("Task4", "Desc4", new Date(), 3));
        console.log(current_project.getTaskList().map(task => task.getTitle()));
        current_project.setName("Cool Project Test");
        console.log(current_project.getName());
        console.log(project_list.map(task => task.getName()));
        //deleteProject(current_project);
        //console.log(project_list.map(task => task.getName()));
        console.log(current_project.getName());
    };
*/