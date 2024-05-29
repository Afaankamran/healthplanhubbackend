const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const { PORT, CLIENT_URL } = require("../src/constants");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cookieparser());
app.use(passport.initialize());
//app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cors());
app.use("/api", authRoutes);


// 2) CORS Configuration
const whitelist = [
  'https://healthplanhub.vercel.app',
 
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
// 1) Middlewares
app.use(cors(corsOptions));


const appstart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server is not running", error);
  }
};

appstart();
