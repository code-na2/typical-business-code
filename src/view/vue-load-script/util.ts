export function loadScript(src, callback) {
    let script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback && callback();
        }, false);
    }
    head.appendChild(script);
}
