/**
 * A function that accept name and password params and change it to random format
 */
export function generateToken(name: string, password: string) {
  return name
    .concat(password)
    .concat("tvsXWWAFjLAnl+b9WGTFTlAcRWXWdBoBG3rzQEg4HA0=")
    .split("")
    .reverse()
    .join("");
}
