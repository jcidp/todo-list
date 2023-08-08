import createElement from "../helpers/createElement";
import renderLinkIcon from "../helpers/renderSVG";

export default loadNav;

function loadNav(projects, current_project_name) {
    const nav = document.createElement("nav");
    const container = createElement("div", "", ["project-container"]);
    projects.forEach(project => {
        const project_container = createElement("div", "", ["project"]);
        const name = createElement("p", project.getName(), ["project-title"]);
        if (project.getName() === current_project_name) name.classList.add("current-project");
        project_container.appendChild(name);
        //also, append the pencil svg to the container
        container.appendChild(project_container);
    });
    nav.appendChild(container);
    nav.appendChild(createElement("button", "+ New List", ["new-list", "new"]));

    // const button_container = createElement("div", "", ["button-container"]);
    // button_container.appendChild(createElement("button", "+ New List"));
    // nav.appendChild(button_container);

    document.querySelector("body").appendChild(nav);
}