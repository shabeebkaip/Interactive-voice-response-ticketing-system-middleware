import axios from "axios";

const validateUser = async (req, res, next) => {
  try {
    const { baseUrl, userName, password } = process.env;

    // Validate required environment variables
    if (!baseUrl || !userName || !password) {
      return res
        .status(400)
        .json({ message: "Base URL, username, or password not provided" });
    }

    try {
      // Authenticate the user and retrieve the token
      const response = await axios.post(
        `${baseUrl}/jwt/login`,
        { username: userName, password: password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Attach the token to the request object
      req.authToken = response.data;
      next();
    } catch (axiosError) {
      res.status(500).json({
        message: "Error authenticating user",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default validateUser;
