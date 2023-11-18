function addBox(building, container, start) {
    var boxLink = createElement("a");
    var boxDiv = createElement("div");
    boxDiv.className = "box";
    boxDiv.setAttribute("data-start", start);
    boxDiv.setAttribute("data-end", start + building.duration);
    boxDiv.id = building.buildingId;
    boxDiv.style.left = building.positionStart.x + "px";
    boxDiv.style.top = building.positionStart.y + "px";
    boxDiv.style.width = building.positionStart.width + "px";
    boxDiv.style.height = building.positionStart.height + "px";

    // Calculate the difference in X and Y positions
    const deltaX = building.positionEnd.x - building.positionStart.x;
    const deltaY = building.positionEnd.y - building.positionStart.y;

    // Calculate the scaling factor (assuming the size of the container changes)
    const startWidth = building.positionStart.width;
    const startHeight = building.positionStart.height;
    const endWidth = building.positionEnd.width;
    const endHeight = building.positionEnd.height;

    const scaleX = endWidth / startWidth;
    const scaleY = endHeight / startHeight;

    // Update the animation keyframes
    const keyframes = `
        @keyframes moveContainer_${building.buildingId} {
            from {
                transform: translate(0, 0) scale(1);
            }
            to {
                transform: translate(${deltaX}px, ${deltaY}px) scale(${scaleX}px, ${scaleY}px);
            }
        }
    `;

    document.styleSheets[1].insertRule(keyframes, 0);

    // Update the animation class for the box
    boxDiv.style.animation = `moveContainer_${building.buildingId} linear infinite`;

    container.appendChild(boxLink);
    boxLink.appendChild(boxDiv);
}

function updateInfoBox(infoBox, description, title) {
    var h2Element = infoBox.querySelector('h2');
    var pElement = infoBox.querySelector('p');
    
    h2Element.innerHTML = title;
    pElement.innerHTML = description;
}

function createElement(elementType) {
    return document.createElement(elementType);
}