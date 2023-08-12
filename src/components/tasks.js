import createElement from "../helpers/createElement";
import renderLinkIcon from "../helpers/renderSVG";
import format from "date-fns/format";

export default loadMain;

function loadMain(tasks) {
    const main = document.createElement("main");
    const container = createElement("div", "", ["task-container"]);
    tasks.forEach(task => {
        const task_container = createElement("div", "", ["task", "expand"]);
        const task_line = createElement("div", "", ["task-line", "expand"]);

        const task_data = createElement("div", "", ["task-data", "expand"]);
        const check = createElement("input", "", "",[
            ["type", "checkbox"]
        ]);
        if (task.getDone()) check.checked = true;
        task_data.appendChild(check);
        task_data.appendChild(
            createElement("p", task.getPriority(), ["priority", `p${task.getPriority()}`, "expand"])
        );
        task_data.appendChild(
            createElement("p", format(task.getDueDate(), "MMM dd"), ["task-due-date", "expand"])
        );
        task_line.appendChild(task_data);

        task_line.appendChild(
            createElement("p", task.getTitle(), ["task-name", "expand"])
        );

        const svgs = createElement("div", "", ["task-svg"]);
        svgs.appendChild(renderLinkIcon("pencil", "0 0 24 24", "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", "task-edit"));
        svgs.appendChild(renderLinkIcon("delete", "0 0 24 24", "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z", "task-edit"));
        task_line.appendChild(svgs);

        task_container.appendChild(task_line);
        task_container.appendChild(
            createElement("p", task.getDescription(), ["task-description", "expand", "hidden"])
        );
        container.appendChild(task_container);
    });
    main.appendChild(container);
    main.appendChild(createElement("button", "+ New Task", ["new-task", "new"]));

    // const button_container = createElement("div", "", ["button-container"]);
    // button_container.appendChild(createElement("button", "+ New Task"));
    // main.appendChild(button_container);

    document.querySelector("body").appendChild(main);
}

