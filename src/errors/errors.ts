class ApplicationError {

    message: string;
    reason: string;

    constructor(rsn?: string) {
        this.message = 'An unexpected error ocurred.';
        rsn ? (this.reason = rsn) : this.reason = 'Unspecified reason.';
    }

    setMessage(message:string) {
        this.message = message;
    }
}

class DataNotFoundError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('No data found.');
    }
}

class BadRequestError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('Invalid parameters provided');
    }
}

class DataSaveError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('Could not save Data');
    }
}
