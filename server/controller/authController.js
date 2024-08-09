import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'
import bcrypt from "bcrypt";
import config from '../config/config.js';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer  } = req.body

        //validations
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
          }

        const user = await userModel.findOne({ email })

        if (user) {
            return res.status(401).send({
                sucess: false,
                message: "Already Register Please Login"
            })
        }
        const hashpassword = await bcrypt.hash(password, 12)

        const userData = {
            name,
            email,
            password: hashpassword,
            phone,
            address,
            answer
        }

        await userModel.create(userData)

        res.status(200).send({
            success: true,
            message: "user register successfully",
            userData
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;


        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        let user = await userModel.findOne({ email: email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }

        let matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(404).send({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = JWT.sign(
            { _id: user._id }, config.PRIVATE_KEY
        )

        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                adddress: user.address,
                role:user.role
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
}


export const fotgotpassword = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Emai is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }

        const hashed = await bcrypt.hash(newPassword, 12)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
}