import createElement from "../helpers/createElement";
import renderLinkIcon from "../helpers/renderSVG";
import format from "date-fns/format";

export default loadMain;

function loadMain(tasks) {
    const main = document.createElement("main");
    const container = createElement("div", "", ["task-container"]);
    tasks.forEach(task => {
        const task_container = createElement("div", "", ["task"]);
        const one_liners = createElement("div", "", ["task-line"]);
        one_liners.appendChild(createElement("input", "", "",[
            ["type", "checkbox"]
        ]));
        one_liners.appendChild(
            createElement("p", task.getPriority(), ["priority", `p${task.getPriority()}`])
        );
        one_liners.appendChild(
            createElement("p", task.getTitle(), ["task-name"])
        );
        one_liners.appendChild(
            createElement("p", format(task.getDueDate(), "MMM d"), ["task-due-date"])
        );
        //TODO: append the pencil svg to the container
        //TODO: append the trash can svg to the container
        task_container.appendChild(one_liners);
        task_container.appendChild(
            createElement("p", task.getDescription(), ["task-description", "hidden"])
        );
        container.appendChild(task_container);
    });
    main.appendChild(container);
    main.appendChild(createElement("button", "+ New Task"));

    // const button_container = createElement("div", "", ["button-container"]);
    // button_container.appendChild(createElement("button", "+ New Task"));
    // main.appendChild(button_container);

    document.querySelector("body").appendChild(main);
}