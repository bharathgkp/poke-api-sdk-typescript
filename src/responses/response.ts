/* eslint-disable @typescript-eslint/no-explicit-any */

export default interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
}
