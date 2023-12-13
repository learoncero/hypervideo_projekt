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
                left: ${building.positionStart.x}px;
                top: ${building.positionStart.y}px;
                width: ${building.positionStart.width}px;
                height: ${building.positionStart.height}px;
            }
            100% {
                left: ${building.positionEnd.x}px;
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
    var pElement = infoBox.querySelector('p');

    // Clear previous styles to avoid conflicts
    imgElement.style.width = "";
    imgElement.style.height = "";
    imgElement.style.objectFit = "";
    // Hide the image initially
    imgElement.style.display = "none";

    h2Element.innerHTML = title;
    imgElement.src = image;
    imgElement.alt = title + " Image";

    // Wait for the image to load before checking its dimensions
    imgElement.onload = function() {
        // Check if the image is wider than it is tall
        if (imgElement.naturalWidth > imgElement.naturalHeight) {
            imgElement.style.width = "250px";
            imgElement.style.height = "150px";
        } else {
            // Image is taller than it is wide
            imgElement.style.height = "200px";
            imgElement.style.width = "150px";
        }

        imgElement.style.objectFit = "cover";
        // Show the image after styles are applied
        imgElement.style.display = "block";

        pElement.innerHTML = "<br>" + description;
    };
}

function createElement(elementType) {
    return document.createElement(elementType);
}

// Function to remove keyframes rule by buildingId name
function removeKeyframesRule(buildingId) {
    const styleSheet = document.styleSheets[1]; // Update index if needed

    // Find the index of the rule with the specified name
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        const rule = styleSheet.cssRules[i];
        if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === `moveContainer_${buildingId}`){
            // Delete the rule at the found index
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