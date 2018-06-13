function log(type, msg) {
    const now = new Date(Date.now());
    console.log([now.getFullYear(),
        now.getMonth()+1,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()] + " | " + type + " | " + msg);
}

function info(msg) {
    log("INFO", msg);
}

function err(msg) {
    log("ERR", msg);
}

export {info, err}