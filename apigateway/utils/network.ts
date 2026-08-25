export function getSubnetFromIp(ip: string){
    const clean = ip.replace("::ffff", "");
    const parts = clean.split(".")
    return parts.slice(0, 3).join(".")
}