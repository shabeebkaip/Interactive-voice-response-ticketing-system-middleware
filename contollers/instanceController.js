import axios from "axios";
import { defaultData } from "../constant.js";

const createTicket = async (req, res) => {
  try {
    const { fName, lName, category } = req.query;

    if (!fName || !lName || !category) {
      return res.status(400).json({
        message: "Please provide first name, last name, and category",
      });
    }

    const ticketNumber = await generateInstance(req);

    return res.status(200).json({
      message: "Ticket created successfully",
      ticketNumber,
    });
  } catch (error) {
    console.error("Error creating ticket:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const generateInstance = async (req) => {
  try {
    const { authToken } = req;
    const baseUrl = process.env.BASE_URL;
    const { fName, lName, category } = req.query;

    if (!baseUrl || !authToken) {
      throw new Error("Base URL or auth token is missing");
    }

    if (!defaultData[category]) {
      throw new Error("Invalid category provided");
    }

    const payload = {
      ...defaultData[category],
      First_Name: fName,
      Last_Name: lName,
      category: category,
    };
    const response = await axios.post(
      `${baseUrl}/arsys/v1/entry/HPD:IncidentInterface_Create?fields=values(Incident Number)`,
      { values: payload },
      {
        headers: {
          Authorization: `AR JWT ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data?.["Incident Number"] || "Unknown Ticket Number";
  } catch (error) {
    console.error("Error generating ticket instance:", error.message);
    throw error;
  }
};

export { createTicket };
