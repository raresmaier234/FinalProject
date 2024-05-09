import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import ImageSlider from '../../general-components/ImageSlider';
import { Link } from 'react-router-dom';

export default function CardRent({ id, name, description, price, location, photos, type }) {

    return (
        <Card sx={{ width: "100%", height: "500px" }}>
            <div>
                <Typography level="title-lg">{name}</Typography>
                <Typography level="body-sm">{type}</Typography>
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
            <AspectRatio height="400px" maxHeight="200px">
                <ImageSlider images={photos}></ImageSlider>
            </AspectRatio>
            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body-xs">Price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        {price} €
                    </Typography>
                </div>
                <Link to={`/${id}/${name}`}>
                    <Button
                        variant="solid"
                        size="md"
                        color="primary"
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Explore
                    </Button>
                </Link>

            </CardContent>
        </Card>
    );
}