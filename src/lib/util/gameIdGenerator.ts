import { customAlphabet } from "nanoid";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const customNanoId = customAlphabet(alphabet, 8);

export const gameIdGenerator = () => {
    const id = customNanoId();
    return id.substr(0, 4) + "-" + id.substr(4);
};
