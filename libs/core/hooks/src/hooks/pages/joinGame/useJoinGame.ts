import { useState } from "react";
import { GameService } from "@tgs-web-nx/core";

export function useJoinGame() {
    const [isLoading, setIsLoading] = useState(false);
    const [isMaintenance, setIsMaintenance] = useState(false);


    const handleJoinGame = async (gameId: number, gpCode: string) => {
        setIsLoading(true);
        const joinGameRes = await GameService.JoinGame(gameId, gpCode);

        if (joinGameRes.IsSuccess) {
            window.open(joinGameRes.data.url, import.meta.env.VITE_GAME_WINDOW_NAME)?.focus();
        } else {
            handleJoinGameMaintenance();
        }
        setIsLoading(false);
    };

    const handleJoinGameMaintenance = () => {
        setIsMaintenance(true);
        setIsLoading(false);
    };

    if (isMaintenance) {
        window.open(window.location.origin + "/maintenance?isGameMaintenance=true", import.meta.env.VITE_GAME_WINDOW_NAME)?.focus();
    }

    return {
        isLoading,
        handleJoinGame
    };
}
