const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const port = 3000;
const router = express.Router();

const checkJwt = require("./auth.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// gelen post isteğine göre token üretilmesi işlemi
router.post("/login", (req, res, next) => {
    const { email } = req.body;
    const token = jwt.sign({ //token oluşturulması
        email: email,
        ad: "Burak",
        exp: Math.floor(Date.now() / 1000) + 60,
        issuer: "www.yayinci.com"
    }, 'secretKey'); //secret key
    res.send(token)

})

//middleware ile jwt kontrolü yapılması ve oluşan duruma göre işleme devam edilip edilmemesi
router.post("/posts", checkJwt, (req, res, next) => {
    res.send("Selam dünya")
})

router.get("/", (req, res, next) => {
    res.send("Çalışıyor")
})

app.use("/", router)
app.listen(port, () => {
    console.log(`server http://localhost:${port} unda calisiyor.`)
})