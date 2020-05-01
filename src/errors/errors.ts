class ApplicationError {

    statusCode: number;
    message: string;
    reason: string;
    timestamp: Date;

    constructor(statusCode: number, rsn?: string) {
        this.statusCode = statusCode;
        this.message = 'An unexpected error ocurred.';
        this.timestamp = new Date();
        rsn ? (this.reason = rsn) : this.reason = 'Unspecified reason.';
    }

    setMessage(message:string) {
        this.message = message;
    }
}

//throws error if value does not exist (resource not found)
class DataNotFoundError extends ApplicationError {

    constructor(reason?: string) {
        super(404, reason);
        super.setMessage('No data found.');
    }
}

//throws error if requested value does not exist
class BadRequestError extends ApplicationError {

    constructor(reason?: string) {
        super(400, reason);
        super.setMessage('Invalid parameters provided');
    }
}

//throws error if data could not save (conflict)
class DataSaveError extends ApplicationError {

    constructor(reason?: string) {
        super(409, reason);
        super.setMessage('Could not save Data');
    }
}

export {
    DataNotFoundError,
    BadRequestError,
    DataSaveError
}
