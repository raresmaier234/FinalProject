import React from "react";
import classNames from "classnames";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { makeStyles } from "@mui/styles";
import { Autocomplete, FormControl, FormHelperText, InputLabel, TextField, Typography } from "@mui/material";

import { overrideEnterBehavior } from "../../../utils/app-functions";

const useStyles = makeStyles(
    (theme) => ({
        error: {
            fontSize: 10,
            lineHeight: "12px",
            fontWeight: 500,
            fontStyle: "normal",
            color: "red",
            margin: 0,
        },
        label: {
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "15px",
            color: theme.palette.dark.main,
            marginBottom: 5,
        },
        root: {
            "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
                // Default transform is "translate(14px, 20px) scale(1)""
                // This lines up the label with the initial cursor position in the input
                // after changing its padding-left.
                transform: "translate(34px, 20px) scale(1);",
            },
        },
        inputRoot: {
            "& input": {
                fontSize: 12,
                fontFamily: "Montserrat",
                fontStyle: "normal",
                color: theme.palette.dark.main,
                fontWeight: "600",
                lineHeight: "15px",
            },
            // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
            '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
                // Default left padding is 6px
                padding: "0 7px 0 7px",
            },
            "& .MuiAutocomplete-input": {
                width: "100%",
            },
            '&[class*="MuiOutlinedInput-root"]': {
                padding: 0,
                paddingRight: "65px !important",
            },
        },
        input: {
            fontSize: 12,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            color: theme.palette.dark.main,
            fontWeight: "600",
            lineHeight: "15px",
            backgroundColor: "#fff",
        },
        disabledInput: {
            backgroundColor: "rgba(97, 97, 97, 0.1) !important",
        },
        value: {
            fontWeight: "600 !important",
            padding: "5px 0px",
            color: theme.palette.grey["800"],
            minHeight: "15px",
            maxWidth: "100%",
            wordBreak: "break-all",
        },
        row: {
            fontSize: 14,
        },
        highlightRow: {
            fontSize: 32,
        },
    }),
    { name: "CustomDropdownStyles" }
);

const StyledDropdown = ({
    activeLabel,
    label,
    required,
    className,
    value,
    onChange,
    width,
    error,
    helperText,
    errorClassName,
    options,
    disabled,
    inputClassName,
    displayField = "name",
    inputColorClass,
    labelClassName,
    viewMode,
    viewModeClassName,
    placeholder = "Cauta...",
    compareObjects = false,
    customOptionLabel,
}) => {
    const classes = useStyles(useStyles);

    return (
        <div>
            {activeLabel && (
                <InputLabel required={required} className={labelClassName ? labelClassName : classes.label}>
                    {label}
                </InputLabel>
            )}
            {!viewMode ? (
                <FormControl style={{ width: width }} className={className}>
                    <Autocomplete
                        disabled={!!disabled}
                        popupIcon={<KeyboardArrowDownIcon />}
                        value={value}
                        onChange={onChange}
                        id="search-dropdown"
                        options={options}
                        defaultValue={value}
                        getOptionLabel={(option) => {
                            return displayField ? option[displayField] || "" : option?.name || "";
                        }}
                        isOptionEqualToValue={(o, v) =>
                            o.id && v.id && !compareObjects ? o.id === v.id : o.id === v.id && o[displayField] === v[displayField]
                        }
                        classes={{
                            root: classes.root,
                            inputRoot:
                                classes.inputRoot +
                                " " +
                                (inputClassName ? inputClassName : classes.input) +
                                " " +
                                (inputColorClass ? inputColorClass : "") +
                                " " +
                                (disabled ? classes.disabledInput : ""),
                        }}
                        style={{ width: width }}
                        renderInput={(params) => (
                            <TextField
                                onKeyDown={overrideEnterBehavior}
                                required={!!required}
                                className={inputClassName}
                                {...params}
                                placeholder={placeholder}
                                variant="outlined"
                                disabled={!!disabled}
                            />
                        )}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} className={classNames(props.className, classes.row)} key={`${option.id}-${option[displayField]}`}>
                                    {customOptionLabel ? customOptionLabel(props, option) : displayField ? option[displayField] || "" : option?.name || ""}
                                </li>
                            );
                        }}
                    />
                    {helperText && (
                        <FormHelperText classes={{ root: classNames(classes.error, errorClassName) }} error={error}>
                            {helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            ) : (
                <Typography variant={"h6"} className={`${classes.value} ${viewModeClassName || ""}`}>
                    {(value && value[displayField]) || "-"}
                </Typography>
            )}
        </div>
    );
};

export default StyledDropdown;