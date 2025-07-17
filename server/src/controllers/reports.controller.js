import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createReport = async (req, res) => {
  const { title, description, location, crimeType, date, anonymous } = req.body;
  let userId = null;

  // Check if user is authenticated
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (token && !anonymous) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (err) {
      // If token is invalid, continue as anonymous
      console.log("Invalid token, continuing as anonymous");
    }
  }

  try {
    const report = await prisma.report.create({
      data: {
        title,
        description,
        location,
        crimeType,
        date: new Date(date),
        anonymous,
        userId: anonymous ? null : userId,
      },
    });

    res.status(201).json({
      message: "Report created successfully",
      report,
    });
  } catch (err) {
    console.error("Error creating report:", err);
    res.status(500).json({ error: "Failed to create report" });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Format reports to protect anonymous users
    const formattedReports = reports.map(report => {
      if (report.anonymous) {
        return {
          ...report,
          userId: null,
          user: null
        };
      }
      return report;
    });

    res.json(formattedReports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

export const getUserReports = async (req, res) => {
  const userId = req.user.userId;

  try {
    const reports = await prisma.report.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(reports);
  } catch (err) {
    console.error("Error fetching user reports:", err);
    res.status(500).json({ error: "Failed to fetch user reports" });
  }
};

export const updateReportStatus = async (req, res) => {
  const { reportId } = req.params;
  const { status } = req.body;

  try {
    const report = await prisma.report.update({
      where: {
        id: reportId,
      },
      data: {
        status,
      },
    });

    res.json({
      message: "Report status updated",
      report,
    });
  } catch (err) {
    console.error("Error updating report status:", err);
    res.status(500).json({ error: "Failed to update report status" });
  }
};

export const deleteReport = async (req, res) => {
  const { reportId } = req.params;
  const userId = req.user.userId;
  const userRole = req.user.role;

  try {
    // Check if the report exists
    const report = await prisma.report.findUnique({
      where: {
        id: reportId,
      },
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Check if the user is the owner or an admin
    if (report.userId !== userId && userRole !== "ADMIN") {
      return res.status(403).json({ error: "Not authorized to delete this report" });
    }

    // Delete the report
    await prisma.report.delete({
      where: {
        id: reportId,
      },
    });

    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error("Error deleting report:", err);
    res.status(500).json({ error: "Failed to delete report" });
  }
};