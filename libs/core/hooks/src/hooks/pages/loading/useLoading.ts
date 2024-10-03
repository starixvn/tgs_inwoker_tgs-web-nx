import { useState } from "react";

export function useLoading() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoading = (loading: boolean) => {
        setIsLoading(loading);
    };

    return {
        isLoading,
        handleLoading
    };
}