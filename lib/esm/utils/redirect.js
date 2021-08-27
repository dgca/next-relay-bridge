import Router from "next/router";
function getRedirectCode(codeOrPermanent) {
    if (typeof codeOrPermanent === "boolean") {
        return codeOrPermanent ? 308 : 307;
    }
    return codeOrPermanent;
}
export default function redirect(_a, path, permanent) {
    var res = _a.res;
    if (permanent === void 0) { permanent = false; }
    if (res) {
        res.writeHead(getRedirectCode(permanent), {
            Location: path,
        });
        res.end();
    }
    else {
        Router.replace(path);
    }
}
