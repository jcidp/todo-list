const createElement = (element, content, classes, attributes) => {
    const ele = document.createElement(element);
    if (content) ele.textContent = content;
    if (classes && classes.length) classes.forEach(my_class => ele.classList.add(my_class));
    if (attributes) attributes.forEach(attribute => ele.setAttribute(attribute[0], attribute[1]));
    return ele;
};

export default createElement;