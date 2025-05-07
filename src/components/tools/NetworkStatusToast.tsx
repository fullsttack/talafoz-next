'use client';

import { useNetworkStatus } from "@/hooks/use-network-status";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function NetworkStatusToast() {
  const isOnline = useNetworkStatus();
  const wasOffline = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // در اولین رندر هیچ پیامی نمایش نده
    if (isFirstRender.current) {
      isFirstRender.current = false;
      wasOffline.current = !isOnline;
      return;
    }

    if (!isOnline) {
      toast.error("ارتباط اینترنت شما قطع شده است!");
      wasOffline.current = true;
    } else if (wasOffline.current) {
      // فقط اگر قبلاً آفلاین بودیم و حالا آنلاین شدیم پیام بده
      toast.success("اتصال اینترنت برقرار شد.");
      wasOffline.current = false;
    }
  }, [isOnline]);

  return null;
} 