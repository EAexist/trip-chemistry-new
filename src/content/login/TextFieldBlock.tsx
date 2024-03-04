/* React */
import { ChangeEvent, useEffect } from "react";

/* React Packages */
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";

interface TextFieldBlockProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    getIsValueAllowed: (value: string) => boolean;
    helperText: string | ((value: string) => string);
    title?: string;
    note?: string;
    autoFocus?: boolean;
    className?: string;
};

function TextFieldBlock({
    value,
    setValue,
    getIsValueAllowed,
    helperText,
    title,
    note,
    autoFocus,
    className
}: TextFieldBlockProps) {

    /* Event Handlers */
    const handleClickDeleteAll = () => {
        setValue("");
    }

    return (
        <div className={`block__body flex ${className}`}>
            <h2 className="typography-body">
                {title}
            </h2>
            {
                note &&
                <p className="typography-note">
                    {note}
                </p>
            }
            <div>
                <TextField
                    variant="standard"
                    value={value}
                    autoFocus={autoFocus}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (getIsValueAllowed(event.target.value)) {
                            setValue(event.target.value);
                        }
                    }}
                    // placeholder={strings.searchFormPlaceholder}
                    InputProps={{
                        endAdornment: (
                            value.length > 0 &&
                            <InputAdornment position="end" sx={{ position: "absolute", right: 0 }}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickDeleteAll}
                                    edge="end"
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: { textAlign: 'center' },
                        className: "typography-label"
                    }}
                    fullWidth={true}
                    helperText={
                        typeof (helperText) === 'string'
                            ? helperText
                            : helperText(value)
                    }
                    FormHelperTextProps={{ sx: { textAlign: 'center' } }}
                />
            </div>
        </div>
    );
}
export default TextFieldBlock;