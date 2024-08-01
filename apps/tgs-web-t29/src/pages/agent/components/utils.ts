export function formatNumber(num?: number): number {
    if (num === undefined) return 0;

    // 使用 toFixed(2) 來確保小數點後兩位
    let formatted = num.toFixed(2);
    
    // 如果格式化後的數字末尾是 .00，則刪除
    if (formatted.endsWith('.00')) {
        formatted = formatted.slice(0, -3);
    }
    
    // 如果格式化後的數字末尾是 .X0，則刪除多餘的 0
    else if (formatted.endsWith('0')) {
        formatted = formatted.slice(0, -1);
    }
    
    return Number(formatted);
}