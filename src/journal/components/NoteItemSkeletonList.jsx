import { Avatar, Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const NoteItemSkeletonList = () => {
    return (
        <>
            {
                [1, 2, 3, 4, 5].map((a) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', paddingX: '1rem' }} key={a}>
                            <Box sx={{ margin: 1 }}>
                                <Skeleton variant="circular">
                                    <Avatar />
                                </Skeleton>
                            </Box>
                            <Box sx={{ width: '100%', height: '4rem'}}>
                                <Skeleton width="100%" height= '100%' />
                            </Box>
                    </Box>
                ))
            }
        </>
    );
}
