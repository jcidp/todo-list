import createElement from "../helpers/createElement";
import renderLinkIcon from "../helpers/renderSVG";

export default loadNav;

function loadNav(projects, current_project_name) {
    const nav = document.createElement("nav");
    const container = createElement("div", "", ["project-container"]);
    projects.forEach(project => {
        const project_container = createElement("div", "", ["project", "mobile-hide"]);
        const name = createElement("p", project.getName(), ["project-title"]);
        if (project.getName() === current_project_name) name.classList.add("current-project");
        project_container.appendChild(name);
        project_container.appendChild(renderLinkIcon("pencil", "0 0 24 24", "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", "project-edit"));
        
        if (project.getName() === current_project_name) return container.insertBefore(project_container, container.firstChild);
        container.appendChild(project_container);
    });
    nav.appendChild(container);
    nav.appendChild(createElement("button", "+ New Project", ["new-list", "new", "mobile-hide"]));

    document.querySelector("body").appendChild(nav);
}