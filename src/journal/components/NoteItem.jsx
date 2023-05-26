import { TurnedInNot, Delete, MoreVert } from "@mui/icons-material"
import { Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice";
import { useState } from "react";
import { startDeletingNote } from "../../store/journal/thunks";

export const NoteItem = ({ note }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch();

    const handleDelete = () => {
        // ! delete note
        dispatch(startDeletingNote());
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <Grid item>
                    <div>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                            style: {
                                maxHeight: 48 * 4.5,
                                width: '20ch',
                            },
                            }}
                        >    
                            <MenuItem onClick={handleDelete}>
                                Delete
                            </MenuItem>   
                        </Menu>
                    </div>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
