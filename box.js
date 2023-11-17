function displayBox(boxID, start, end) {
    if ((video.currentTime >= start) && (!boxID.isVisible)) {
        boxID.style.display = "block";
        boxID.isVisible = true;
    }

    if (((video.currentTime >= end) || (video.currentTime <= start)) && (boxID.isVisible)) {
        boxID.style.display = "none";
        boxID.isVisible = false;
    }
}

function addBoxes(array, boxContainer) { 
}