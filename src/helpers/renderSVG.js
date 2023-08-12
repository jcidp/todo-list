export default renderLinkIcon;

function renderLinkIcon(name, viewBox, path_d, my_class) {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    const title = document.createElement("title");
    title.textContent = name;
    iconSvg.appendChild(title);
    
    iconSvg.setAttribute('viewBox', viewBox);
    
    iconPath.setAttribute('d', path_d);
    
    iconSvg.appendChild(iconPath);

    if (name === "pencil" || name === "delete") iconSvg.classList.add(name);
    if (my_class) iconSvg.classList.add(my_class);

    return iconSvg;
    }