import registerModel from "../model/registerModel.js"
import bcrypt from "bcryptjs"
export const home = (req, res) => {
    res.send("heelo home")
}

export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const emailExist = await registerModel.findOne({ email });
        if (emailExist) {
            return res.status(400).send({ msg: "User already exists" });
        }
        const usernameExist = await registerModel.findOne({ username });
        if (usernameExist) {
            return res.status(400).send({ msg: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await registerModel.create({ name, username, email, password: hashedPassword });

        if (newUser) {
            return res.status(200).send({ msg: "User created successfully", Token: await newUser.generateToken(), user: newUser });
        }

    } catch (error) {
        console.log("Register error:", error);
        return res.status(500).send({ msg: "Internal server error" });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body
    const emailFind = await registerModel.findOne({ email })
    if (emailFind) {
        const compare = await bcrypt.compare(password, emailFind.password)
        if (compare) {
            res.status(200).send({ "msg": "login sucussful", "Token": await emailFind.generateToken() })
        }

    }



    else {
        res.status(400).send({ "msg": "user not exist" })
    }
}

export const userData = (req, res) => {
    try {
        const userDetails = req.user
        res.send({ userData: userDetails })
    } catch (error) {
        console.log('userData error', error)
    }
}