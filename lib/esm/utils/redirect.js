import Router from "next/router";
function getRedirectCode(codeOrPermanent) {
    if (typeof codeOrPermanent === "boolean") {
        return codeOrPermanent ? 308 : 307;
    }
    return codeOrPermanent;
}
export default function redirect({ res }, path, permanent = false) {
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
