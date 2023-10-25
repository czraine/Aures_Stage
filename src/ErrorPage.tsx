import { useRouteError } from "react-router-dom";
import React, { useState } from 'react';

export default function ErrorPage() {
    const [error, setError] = useState<{ statusText?: string, message?: string }>({}); // Explicitly type the error object

    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}