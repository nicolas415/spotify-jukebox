import { Button, ButtonProps } from "@mui/material";

export function ButtonBig(props: ButtonProps) {
    return (
        <Button
            {...props}
            variant="contained"
            size='large'
            sx={{ padding: 0, minWidth: '0px', width: '17em', fontSize: '1.2em', height: "4em", fontWeight: 'bold',
                '&:disabled': { backgroundColor: 'lightgrey'}
            }}
        />
    )
}