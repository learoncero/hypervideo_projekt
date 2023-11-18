function addBox(building, container, start) {
    var boxLink = createElement("a");
    var boxDiv = createElement("div");
    boxDiv.className = "box";
    boxDiv.setAttribute("data-start", start);
    boxDiv.setAttribute("data-end", start + building.duration);
    boxDiv.id = building.buildingId;
    boxDiv.style.left = building.position.x + "px";
    boxDiv.style.top = building.position.y + "px";
    boxDiv.style.width = building.position.width + "px";
    boxDiv.style.height = building.position.height + "px";

    container.appendChild(boxLink);
    boxLink.appendChild(boxDiv);
}

function updateInfoBox(infoBox, description) { 
    infoBox.innerHTML = description;
}

function createElement(elementType) {
    return document.createElement(elementType);
}

