import React from 'react';
import "@styles/global.css";

export const metadata = {
    title: "Placeam",
    description: "Buy and Sell"
} 

const layout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <main>
                {children}
            </main>
        </body>
    </html>
  )
};

export default layout;
