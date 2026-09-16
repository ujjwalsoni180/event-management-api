const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// CREATE EVENT
router.post("/", async (req, res) => {
    try {
        const { name, description, dateTime, venue, maxCapacity } = req.body;

        // Required fields validation
        if (!name || !description || !dateTime || !venue || maxCapacity === undefined) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Capacity validation
        if (typeof maxCapacity !== "number" || maxCapacity <= 0) {
            return res.status(400).json({
                message: "Maximum capacity must be a positive number"
            });
        }

        // Date validation
        const eventDate = new Date(dateTime);

        if (isNaN(eventDate.getTime())) {
            return res.status(400).json({
                message: "Invalid date and time"
            });
        }

        // Past date validation
        if (eventDate < new Date()) {
            return res.status(400).json({
                message: "Event date cannot be in the past"
            });
        }

        const event = await Event.create({
            name,
            description,
            dateTime: eventDate,
            venue,
            maxCapacity
        });

        res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid event data"
        });
    }
});


// GET ALL EVENTS
router.get("/", async (req, res) => {
    try {
        const {
            search,
            venue,
            status,
            page = 1,
            limit = 10,
            sort = "dateTime"
        } = req.query;

        const filter = {};

        // Search by event name
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by venue
        if (venue) {
            filter.venue = {
                $regex: venue,
                $options: "i"
            };
        }

        // Filter by status
        if (status) {
            filter.status = status;
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({
                message: "Page and limit must be positive numbers"
            });
        }

        const skip = (pageNumber - 1) * limitNumber;

        const events = await Event.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber);

        const totalEvents = await Event.countDocuments(filter);

        res.status(200).json({
            message: "Events fetched successfully",
            totalEvents,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalEvents / limitNumber),
            events
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch events"
        });
    }
});


// GET SINGLE EVENT
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event fetched successfully",
            event
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid event ID"
        });
    }
});


// UPDATE EVENT
router.put("/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event updated successfully",
            event
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update event"
        });
    }
});


// DELETE EVENT
router.delete("/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid event ID"
        });
    }
});


module.exports = router;