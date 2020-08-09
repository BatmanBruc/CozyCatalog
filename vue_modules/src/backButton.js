window.stackForBack = [];

function backButton() {
    if (stackForBack.length > 0) {
        stackForBack.pop()();
        return false;
    }
}

export default backButton;