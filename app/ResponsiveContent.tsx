import { CatData } from "@/types/types";
import Canvas from "./Canvas";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import CatGrid from "./CatGrid";
import CatGridMobile from "./CatGridMobile";

export interface ResponsiveContentProps {
    catData: CatData[];
}

export default function ResponsiveContent(props: ResponsiveContentProps) {
    const isDesktop = useIsDesktop();

    return <>{isDesktop ? <Canvas catData={props.catData} /> : <CatGridMobile catData={props.catData} />}</>;
}
