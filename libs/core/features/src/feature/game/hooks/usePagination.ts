import { useState } from "react";

export function usePagination() {
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(45);

    const handleChangePageIndex = (pageIndex: number) => {
        setPageIndex(pageIndex);
    };

    const handleChangePageSize = (pageSize: number) => {
        setPageSize(pageSize);
    }

    return {
        pageIndex,
        handleChangePageIndex,
        pageSize,
        handleChangePageSize
    };
}
