import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice";

export const NoteItem = ({ note }) => {

    const dispatch = useDispatch();

    const handleSetActiveNote = () => {
		dispatch(setActiveNote(note))
	}

    return (
        <ListItem
            key={note.date}
            disablePadding
        >
            <ListItemButton onClick={handleSetActiveNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={note.title} sx={{ width: '100%' }}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
