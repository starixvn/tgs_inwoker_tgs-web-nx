import { useEffect, useState } from "react";
import { GameService } from "@tgs-web-nx/core";

export function useJoinGame() {
    const [isLoading, setIsLoading] = useState(false);
    const [isMaintenance, setIsMaintenance] = useState(false);


    const handleJoinGame = async (gameId: number, gpCode: string) => {
        setIsLoading(true);
        const joinGameRes = await GameService.JoinGame(gameId, gpCode);

        if (joinGameRes.IsSuccess) {
            window.open(joinGameRes.data.url, `${gameId}-${gpCode}`)?.focus();
        } else {
            window.open(window.location.origin + "/maintenance?isGameMaintenance=true", "maintenance-game")?.focus();
        }
        setIsLoading(false);
    };

    return {
        isLoading,
        handleJoinGame
    };
}
