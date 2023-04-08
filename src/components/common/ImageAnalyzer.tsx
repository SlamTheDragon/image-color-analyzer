import React, { useEffect, useState } from 'react';

interface Props {
    imageUrl: string;
}

const ImageAnalyzer: React.FC<Props> = ({ imageUrl }) => {
    const [averageRedValue, setAverageRedValue] = useState<number | null>(null);
    const [averageGreenValue, setAverageGreenValue] = useState<number | null>(null);
    const [averageBlueValue, setAverageBlueValue] = useState<number | null>(null);

    useEffect(() => {
        // Load the image
        const img = document.createElement('img');
        img.src = imageUrl;

        // Wait for the image to load before processing
        img.onload = () => {
            // Create a canvas element to draw the image onto
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // Draw the image onto the canvas
                ctx.drawImage(img, 0, 0);

                // Get the image data from the canvas
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixelData = imageData.data;

                // Loop through each pixel and calculate the average value for each color channel
                let totalRed = 0;
                let totalGreen = 0;
                let totalBlue = 0;

                for (let i = 0; i < pixelData.length; i += 4) {
                    const r = pixelData[i];
                    const g = pixelData[i + 1];
                    const b = pixelData[i + 2];

                    totalRed += r;
                    totalGreen += g;
                    totalBlue += b;
                }

                const numPixels = pixelData.length / 4;

                const averageRed = Math.round(totalRed / numPixels);
                const averageGreen = Math.round(totalGreen / numPixels);
                const averageBlue = Math.round(totalBlue / numPixels);

                setAverageRedValue(averageRed);
                setAverageGreenValue(averageGreen);
                setAverageBlueValue(averageBlue);
            }
        };
    }, [imageUrl]);

    return (
        <div>
            <div>Average <span style={{ backgroundColor: "#" + averageRedValue?.toString(16) + "0000" }}>Red</span> Value: {averageRedValue?.toString(16)}</div>
            <div>Average <span style={{ backgroundColor: "#00" + averageGreenValue?.toString(16) + "00" }}>Green</span> Value: {averageGreenValue?.toString(16)}</div>
            <div>Average <span style={{ backgroundColor: "#0000" + averageBlueValue?.toString(16) + "" }}>Blue</span> Value: {averageBlueValue?.toString(16)}</div>
            <div style={{ padding: 100, backgroundColor: "#" + averageRedValue?.toString(16) + averageGreenValue?.toString(16) + averageBlueValue?.toString(16) }}></div>
        </div>
    );
};

export default ImageAnalyzer;