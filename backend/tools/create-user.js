"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const user_1 = require("../src/models/user");
// take email from command line
const email = process.argv[2];
if (email === undefined) {
    console.error('usage: ts-node create-user.ts <email>');
    process.exit(1);
}
let passwordLen = Number(process.argv[3]);
if (Number.isNaN(passwordLen)) {
    passwordLen = 8;
}
// simple password generator
const generatePassword = (len = 8) => {
    const ranges = {
        digit: [48, 57],
        upper: [65, 90],
        lower: [97, 122],
        special1: [33, 47],
        special2: [58, 64],
        special3: [91, 96],
        special4: [123, 126],
    };
    const bytes = Array.from(crypto_1.default.randomBytes(len));
    return bytes
        .map((byte) => {
        for (const [, [min, max]] of Object.entries(ranges)) {
            if (byte >= min && byte <= max) {
                return String.fromCharCode(byte);
            }
        }
        // default: pick any from special{1..4}
        const modulo = byte % 16;
        return modulo < 15
            ? String.fromCharCode(33 + modulo)
            : String.fromCharCode(126);
    })
        .join('');
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const password = generatePassword(passwordLen);
        const { id } = yield (0, user_1.createUser)(email, password);
        console.log(`Inserted user with id ${id} and password ${password}`);
    });
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
