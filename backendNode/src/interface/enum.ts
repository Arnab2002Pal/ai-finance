export enum Error_Message {
    GPT_ERROR = "GPT call failed",
    INVALID_TOKEN = "Invalid token provided",
    NO_TOKEN = "No token provided",
    SERVER_ERROR = "An error occurred on the server",
    NOT_FOUND = "The requested resource was not found",
    UNAUTHORIZED = "Unauthorized to access this resource",
    FORBIDDEN = "You are not authorized to perform this action",
    NOT_ALLOWED = "This action is not allowed",
    TOO_MANY_REQUESTS = "Too many requests, please try again later",
    NOT_ACCEPTABLE = "The requested resource is not acceptable",
    CONFLICT = "A conflict occurred while processing the request",
    LENGTH_REQUIRED = "The request body must contain a valid content length",
    PRECONDITION_FAILED = "One or more precondition requirements for this request were not met",
}

export enum RiskTolerance {
    Conservative = "Conservative",
    Moderate = "Moderate",
    Aggressive = "Aggressive",
}