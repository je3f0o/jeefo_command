/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : update_version.js
* Created at  : 2019-10-31
* Updated at  : 2019-10-31
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const fs = require("fs").promises;

const root_dir = process.cwd();

const save_json = async (filepath, json) => {
    const data = JSON.stringify(json, null, 4);
    await fs.writeFile(filepath, data, "utf8");
};

(async () => {
    const pkg = require(`${ root_dir }/package`);
    let [major, middle, miner] = pkg.version.split('.');
    pkg.version = `${ major }.${ middle }.${ Number(miner) + 1 }`;
    await save_json(`${ root_dir }/package.json`, pkg);
})();
