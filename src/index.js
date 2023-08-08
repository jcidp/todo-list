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

    const deleteProject = (project) => {
        project_list = project_list.filter(current_project => current_project != project);
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
        //current_project.addTask(Task("Task7", "Desc7", new Date(), 3));
        current_project.setName("Cool Project Test");
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
        newListBtn.addEventListener("click", renderNewListPopup);

        const projects = document.querySelectorAll(".project-title");
        projects.forEach(project => project.addEventListener("click", selectProject));
    };

    function selectProject(e){
        const current_project = appController.getProjectFromName(e.target.textContent);
        appController.changeCurrentProject(current_project);
        deletePage();
        renderPage();
    }

    function renderNewListPopup() {
        const popup = createElement("div", "", ["list", "popup"]);
        popup.appendChild(createElement("input", "", ["new-list", "name"],[
            ["type", "text"],
            ["autofocus", true],
            ["minlength", "1"],
            //TODO: Add validation to avoid repeated names
        ]));
        const cancel = createElement("button", "Cancel", ["new-list", "cancel"]);
        cancel.addEventListener("click", cancelNewList);
        popup.appendChild(cancel);
    
    
        const add = createElement("button", "Add", ["new-list", "add"]);
        add.addEventListener("click", addNewList);
        popup.appendChild(add);
    
        document.querySelector("nav").insertBefore(
            popup,
            document.querySelector(".new-list.new")
        );
    }
    
    function cancelNewList() {
        document.querySelector("nav").removeChild(
            document.querySelector(".list.popup")
        );
    }
    
    function addNewList() {
        const name = document.querySelector(".new-list.name").value;
        console.log(name);
    
        appController.addProject(Project(name, []));
    
        deletePage();
        renderPage();
    }

    function deletePage() {
        const body = document.querySelector("body");
        body.removeChild(document.querySelector("nav"));
        body.removeChild(document.querySelector("main"));
        body.removeChild(document.querySelector("footer"));
    }

    return {
        renderPage
    };
})();

appController.initialSetup();
appController.test();

DOMController.renderPage();

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