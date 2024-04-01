import { useMemo } from "react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";

function mergeMediaQuery(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith("@media") && typeof value === "object") {
            // Merge properties from the inner object with the main object
            for (const [innerKey, innerValue] of Object.entries(value)) {
                obj[innerKey] = { ...obj[innerKey], [key]: { ...innerValue } };
            }
            delete obj[key]; // Remove the "@media" key after merging
        }
    }
    return obj;
}

const useClasses = (stylesElement, props) => {
    const theme = useTheme();

    return useMemo(() => {
        const rawClasses = typeof stylesElement === "function" ? stylesElement(theme, props?.params) : stylesElement;
        const prepared = {};
        const rawClassesMerged = mergeMediaQuery(rawClasses);

        Object.entries(rawClassesMerged).forEach(([key, value = {}]) => {
            prepared[key] = css(value, process.env.NEXT_PUBLIC_SHOW_CLASSNAMES === "true" ? { label: (props?.name ? props.name + "-" : "") + key } : undefined);
        });

        return prepared;
    }, [props?.name, props?.params, stylesElement, theme]);
};

export default useClasses;
