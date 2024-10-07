import { GameService } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import { StatusCodeEnum } from "@tgs-web-nx/constants";
import { useState } from "react";

export function useJoinGame() {
    const [isLoading, setIsLoading] = useState(false);
    const { goToLogin } = useAuth();

    const handleJoinGame = async (gameId: number, gpCode: string) => {
        setIsLoading(true);
        const joinGameRes = await GameService.JoinGame(gameId, gpCode);

        if (joinGameRes.code === StatusCodeEnum.Unauthenticated) {
            goToLogin();
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            if (joinGameRes.IsSuccess) {
            setTimeout(() => {
                window.open(joinGameRes.data.url, `${gameId}-${gpCode}`)?.focus();
            })
            } else {
                window.open(window.location.origin + "/maintenance?isGameMaintenance=true", "maintenance-game")?.focus();
            }
        }, 1)

        setIsLoading(false);
    };

    return {
        isLoading,
        handleJoinGame
    };
}
