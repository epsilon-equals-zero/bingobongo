import { customAlphabet } from "nanoid";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const customNanoId = customAlphabet(alphabet, 8);

export const gameIdGenerator = () => {
    const id = customNanoId();
    return id.substring(0, 4) + "-" + id.substring(4);
};
