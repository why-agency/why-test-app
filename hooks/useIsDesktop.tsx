import * as React from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import config from "../tailwind.config";

const fullConfig = resolveConfig(config);

const breakpoints = fullConfig.theme!.screens;

export function useIsDesktop() {
    const [value, setValue] = React.useState(true);

    React.useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setValue(event.matches);
        }

        const result = matchMedia(`(min-width: ${breakpoints.md})`);
        result.addEventListener("change", onChange);
        setValue(result.matches);

        return () => result.removeEventListener("change", onChange);
    }, []);

    return value;
}
