import React from 'react'
import { Button, Card } from "react-bootstrap"
import ProdsByCateg from './ProdsByCateg'; // Import the ProdsByCateg function
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

interface Category {
    id: any;
    name: any;
    image: any;
    userid: any;


}
export function CategoryItem({ id, name, image }: Category) {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleViewProductsClick = () => {
        navigate(`/product/${id}`);
    };
    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={image}
                height="200px"
                style={{ objectFit: "contain" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}    </span>
                </Card.Title>
                <div className="mt-auto">


                    <Button className="w-100" onClick={handleViewProductsClick}>
                        View Products
                    </Button>

                </div>
            </Card.Body>
        </Card>
    )
}

