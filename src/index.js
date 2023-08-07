import "./style.css";
import {Task, Project} from  "./modules/factories";
import loadNav from "./components/nav";
import loadFooter from "./components/footer";
import loadMain from "./components/tasks";

const appController = (() => {
    let project_list = [];
    let current_project;

    const getProjectList = () => project_list;
    const getCurrentProject = () => current_project;

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
        addProject,
        changeCurrentProject,
        deleteProject,
        //addTaskToCurrentProject,
        //deleteTaskFromCurrentProject,
        initialSetup,
        test,
    }
})();

appController.initialSetup();
appController.test();

loadNav(appController.getProjectList());
loadMain(appController.getCurrentProject().getTaskList());
loadFooter();

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