function buildingAlreadyAdded(building, addedBuildings) {
    return addedBuildings.some(addedBuilding => addedBuilding === building);
}

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

    const keyframes = `
        @keyframes moveContainer_${building.buildingId} {
            0% {
                left: ${building.positionStart.x+50}px;
                top: ${building.positionStart.y}px;
                width: ${building.positionStart.width}px;
                height: ${building.positionStart.height}px;
            }
            100% {
                left: ${building.positionEnd.x+50}px;
                top: ${building.positionEnd.y}px;
                width: ${building.positionEnd.width}px;
                height: ${building.positionEnd.height}px;
            }
        }
    `;

    document.styleSheets[1].insertRule(keyframes, 0);

    // Update the animation class for the box
    boxDiv.style.animationName = `moveContainer_${building.buildingId}`;
    boxDiv.style.animationDuration = `${building.duration}s`;
    boxDiv.style.animationIterationCount = '1';
    boxDiv.style.animationTimingFunction = 'linear';
    boxDiv.style.animationPlayState = 'running';

    container.appendChild(boxLink);
    boxLink.appendChild(boxDiv);
}

function updateInfoBox(infoBox, description, title, image) {
    var h2Element = infoBox.querySelector('h2');
    var imgElement = infoBox.querySelector('img');

    var pElement = infoBox.querySelector('div');

    // Clear previous styles to avoid conflicts
    imgElement.style.width = "";
    imgElement.style.height = "";
    imgElement.style.objectFit = "";
    imgElement.style.display = "none";
  
    h2Element.innerHTML = title;
    imgElement.src = image;
    imgElement.alt = title + " Image";

    imgElement.onload = function() {
        if (imgElement.naturalWidth > imgElement.naturalHeight) {
            imgElement.style.width = "250px";
            imgElement.style.height = "150px";
        } else {
            imgElement.style.height = "200px";
            imgElement.style.width = "150px";
        }

        imgElement.style.objectFit = "cover";
        imgElement.style.display = "block";

        pElement.innerHTML = "<br>" + description;
    };
}

function createElement(elementType) {
    return document.createElement(elementType);
}

function removeKeyframesRule(buildingId) {
    const styleSheet = document.styleSheets[1];

    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
        if (rule.name === `moveContainer_${buildingId}`){
            styleSheet.deleteRule(i);
            break;
        }
    }
}

function playOrPauseBoxes(isPlaying) {
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
      if (isPlaying) {
        box.style.animationPlayState = "running";
      } else {
        box.style.animationPlayState = "paused";
      }
    });
}



/*  Function to log keyframes for a specific animation name
function logKeyframes(styleSheet) {
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
            console.log(rule.cssText);
    }
} */