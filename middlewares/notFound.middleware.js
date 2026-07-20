export const notFoundHandler = (req, res, next) => {
    const error = new Error(`הנתיב המבוקש ${req.originalUrl} לא נמצא בשרת`);   
    error.status = 404;
    error.type = 'Not Found';
    next(error);
};