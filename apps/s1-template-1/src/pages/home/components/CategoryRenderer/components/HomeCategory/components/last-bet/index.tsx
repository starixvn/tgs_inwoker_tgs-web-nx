import { HubConnection } from '@microsoft/signalr';
import { LastBetDto } from '@tgs-web-nx/types';
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

interface AnimationProps {
    $isNew: boolean;
  }

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    max-height: 300px;
`;

const TableWrapper = styled.table`
    width: 100%;
    border-collapse: collapse;
    max-height: 300px;
`;

const TableHeader = styled.th`
    padding: 10px;
    border: 1px solid #ddd;
`;

const TableRow = styled.tr<AnimationProps>`
   ${({ $isNew }) =>
        $isNew &&
        css`
            animation: ${fadeIn} 0.5s ease-in;
        `}
`;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
`;

interface LastBetsType {
    connection: HubConnection | undefined;
}

const LastBets: React.FC<LastBetsType> = (props: LastBetsType) => {
    const { connection } = props;
    const [betList, setBetList] = useState<LastBetDto[]>([]);

    // useEffect(() => {
    //     if (!connection) return;

    //     connection.start().catch(err => console.error(err.toString()));

    //     connection.on('ReceiveLastBet', (item: LastBetDto) => {
    //         setBetList(items => {
    //             const updatedMessages = [item, ...items]; 
    
    //             return updatedMessages.slice(0, 10); 
    //         });
    //     });


    //     return () => {
    //         connection.off('ReceiveLastBet');
    //         connection.stop();
    //     };
    // }, [connection]);

    return (
        <TableContainer>
            <TableWrapper>
                <thead>
                    <tr>
                        <TableHeader>Player Name</TableHeader>
                        <TableHeader>Bet Amount</TableHeader>
                        <TableHeader>Game ID</TableHeader>
                        <TableHeader>Game Provider Code</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {betList.map((item, index) => (
                        <TableRow key={item.id} $isNew={index === 0}>
                            <TableCell>{item.playerName}</TableCell>
                            <TableCell>{item.betAmount}</TableCell>
                            <TableCell>{item.gameId}</TableCell>
                            <TableCell>{item.gameProviderCode}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </TableWrapper>
        </TableContainer>
    );
};

export default LastBets;
