import {execSync} from "child_process";
import {join} from "path";

const [year, day] = process.argv.slice(2);

const dayString = parseInt(day) < 10 ? `0${day}` : `${day}`;
process.env["SWC_NODE_PROJECT"] = "./tsconfig.json";
execSync(`node --import ./register.js ${join(year, `day${dayString}`, "index.ts")}`, {stdio: "inherit"});
