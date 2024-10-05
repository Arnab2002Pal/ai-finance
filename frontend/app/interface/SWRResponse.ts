interface SWRResponse <T>{
    data: T | undefined;
    error: any
    isValidating: boolean
}