import { spawn } from "child_process";

class CurlLauncher {
    constructor({ curlCommand }) {
        this._curlProcess = spawn(curlCommand, { shell: true });
        this.debug = false;
    }

    launch() {
        this._curlProcess.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
        });

        if (this.debug) {
            this._curlProcess.stderr.on("data", data => {
                console.error(`stderr: ${data}`);
            });

            this._curlProcess.on("close", code => {
                console.log(`child process exited with code ${code}`);
            });
        }
    }
}

export default CurlLauncher;