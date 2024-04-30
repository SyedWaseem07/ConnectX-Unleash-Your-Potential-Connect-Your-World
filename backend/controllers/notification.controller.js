// Model
import { Notification } from "../models/notification.model.js"

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ to: req.user._id })
        .populate({
            path: "from",
            select: "username profileImg"
        })

        await Notification.updateMany({ to: req.user._id }, { read: true });

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getting notifications");
        res.status(500).json({ error: "Internal server error"});
    }
}
const deleteNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({ to: req.user._id });
        res.status(200).json({ message: "Notifications deleted successfully"});
    } catch (error) {
        console.log("Error in getting notifications");
        res.status(500).json({ error: "Internal server error"});
    }
}

export {
    getNotifications,
    deleteNotifications
}