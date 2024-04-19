import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';


export default function CardRent({ name, description, price, location, photos }) {
    return (
        <Card sx={{ width: "100%" }}>
            <div>
                <Typography level="title-lg">{name}</Typography>
                <Typography level="body-sm">{description}</Typography>
                <Typography level="body-sm">{location}</Typography>
                <IconButton
                    aria-label="bookmark Bahamas Islands"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                >
                    <BookmarkAdd />
                </IconButton>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                    src={photos}
                    srcSet={photos}
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body-xs">Price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        {price}
                    </Typography>
                </div>
                <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                >
                    Explore
                </Button>
            </CardContent>
        </Card>
    );
}