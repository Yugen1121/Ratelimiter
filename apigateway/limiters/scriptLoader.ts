import fs from "fs";
import path from "path";
import { redisClient } from "../services/redis";


const shacache = new Map<string, string>();

async function loadScript(fileName: string): Promise<string>{
    if (shacache.has(fileName)) return shacache.get(fileName)!;
    const scriptPath = path.join(__dirname, "scripts", fileName);
    const script = fs.readFileSync(scriptPath, "utf-8")

    const sha = await redisClient.scriptLoad(script)

    shacache.set(fileName, sha)
    return sha;
}


export async function runScript(
    filename: string,
    keys: string[],
    args: (string | number)[]
){
    const sha = await loadScript(filename)
    try{
        return await redisClient.evalsha(
            sha,
            {
                keys,
                arguments: args.map(String)
            }
        )
    }
    catch(error: any){
        if (error?.message?.includes("NOSCRIPT")){
            const sha2 = loadScript(filename);
            return await redisClient.evalsha(
                sha2,
                {
                    arguments: args.map(String)
                }
            )
        }
        throw error;
    }
}

