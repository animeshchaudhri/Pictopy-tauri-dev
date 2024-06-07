import React, { useState, useEffect } from 'react';

const Bassam: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        // Fetch images from API
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/images'); // Adjust the API endpoint as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            {images.map((imageName, index) => (
                <img key={index} src={`api/images/${imageName}`} alt={imageName} />
            ))}
        </div>
    );
};

export default Bassam;
