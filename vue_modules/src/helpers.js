function getNowDateString(){
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();

    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    return day + '/' + month + '/' + year + '/' + hours + ':' + minutes + ':' + seconds;
}

export {getNowDateString};