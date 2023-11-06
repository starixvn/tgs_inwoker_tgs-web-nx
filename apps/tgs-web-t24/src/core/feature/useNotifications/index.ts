import { useContext } from "react";
import { NotificationContext } from "@/core/feature/useNotifications/contexts/notificationContext";

export const useNotifications = () => useContext(NotificationContext);
