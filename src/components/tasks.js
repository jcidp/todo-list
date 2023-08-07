import createElement from "../helpers/createElement";
import renderLinkIcon from "../helpers/renderSVG";

export default loadMain;

function loadMain(tasks) {
    const main = document.createElement("main");
    const container = createElement("div", "", ["task-container"]);
    tasks.forEach(task => {
        const task_container = createElement("div", "", ["task"]);
        task_container.appendChild(createElement("input", "", "",[
            ["type", "checkbox"]
        ]));
        task_container.appendChild(
            createElement("p", task.getPriority(), ["priority"])
        );
        task_container.appendChild(
            createElement("p", task.getTitle(), ["task-name"])
        );
        task_container.appendChild(
            createElement("p", task.getDueDate(), ["task-due-date"])
        );
        //TODO: append the pencil svg to the container
        //TODO: append the trash can svg to the container
        container.appendChild(task_container);
    });
    main.appendChild(container);
    main.appendChild(createElement("button", "+ New Task"));

    document.querySelector("body").appendChild(main);
}