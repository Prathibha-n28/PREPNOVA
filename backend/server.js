require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors =require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const app = express();

const PORT = process.env.PORT||5000;
app.use(express.json());
app.use(cors());
function authenticateToken(req, res, next) {

    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(403).json({
            message: "Invalid or expired token."
        });

    }
}
app.get("/", function(req, res) {
    res.send("PREPNOVA Backend is working! 🚀");
});
app.get("/profile", authenticateToken, async function(req, res) {

    try {

        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user: user
        });

    } catch (error) {

        res.status(500).json({
            message: "Unable to fetch profile"
        });

    }

});
app.put("/progress", authenticateToken, async function(req, res) {

    try {

        const { progress } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.progress = progress;

        await user.save();

        res.status(200).json({
            message: "Progress saved successfully! ✅"
        });

    } catch (error) {

        res.status(500).json({
            message: "Unable to save progress"
        });

    }

});
app.get("/progress", authenticateToken, async function(req, res) {

    try {

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            progress: user.progress
        });

    } catch (error) {

        res.status(500).json({
            message: "Unable to load progress"
        });

    }

});
app.post("/signup", async function(req, res) {

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup successful! 🎉"
        });

    } catch (error) {
        res.status(500).json({
            message: "Signup failed",
            error: error.message
        });
    }

});

mongoose.connect(process.env.MONGODB_URI)
    .then(function() {
        console.log("MongoDB connected successfully! ✅");
    })
    .catch(function(error) {
        console.log("MongoDB connection failed ❌");
        console.log(error.message);
    });

app.listen(PORT,"0.0.0.0" ,function() {
    console.log(`PREPNOVA backend running on port ${PORT}`);
});
app.post("/login", async function(req, res) {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);

        res.status(200).json({
            message: "Login successful! 🎉", token: token
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed"
        });
    }

});

