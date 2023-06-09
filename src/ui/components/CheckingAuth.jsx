import { Backdrop, CircularProgress } from "@mui/material"
import { useCheckAuth } from "../../hooks/useCheckAuth"

export const CheckingAuth = () => {

	const { status } = useCheckAuth();

    return (
		<Backdrop
			sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={status === 'checking'}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
    )
}
