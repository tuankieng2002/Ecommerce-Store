// create token and saving that in cookies
//https://stackoverflow.com/questions/14176432/cant-set-cookie-expires-or-maxage-in-node-js-using-express-3-0
const sendToken = (user, statusCode, res) => {

    const token = user.getJwtToken();

    // Options for cookies
    const options = {
        expires: new Date(
            ////10 * 365 * 24 * 60 * 60 * 1000 === 315360000000, or 10 years in milliseconds
            //Number(new Date()) + 315360000000
            //Date.now() + (30*24*3600000)//set 1month
            //Date.now() + (24 * 60 * 60 * 1000)//set 1day
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000//set 5day
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
}

module.exports = sendToken;