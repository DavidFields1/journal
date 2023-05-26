import { Backdrop, CircularProgress } from "@mui/material"
import { useCheckAuth } from "../../hooks/useCheckAuth"

export const FetchingNotes = () => {

	const { fetchingNotes } = useCheckAuth();

    return (
		<Backdrop
			sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={fetchingNotes || false}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
    )
}
