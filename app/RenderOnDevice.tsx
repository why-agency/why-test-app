"use client";

import { useIsDesktop } from "@/hooks/useIsDesktop";
import { ReactNode } from "react";

export interface RenderOnDeviceProps {
    renderOn: "desktop" | "mobile";
    children: ReactNode;
}

export default function RenderOnDevice(props: RenderOnDeviceProps) {
    const isDesktop = useIsDesktop();
    const renderOnDesktop = props.renderOn === "desktop";

    return renderOnDesktop === isDesktop ? props.children : <></>;
}
