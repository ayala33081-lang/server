/**
 * מידלוואר שמקבל 4 פרמטרים
 * נועד לטיפול בשגיאות
 * @param {{ status?: number, message?: string, stack?: string, type?: string }} err נתוני השגיאה
 * @param {import("express").Request} req נתוני הבקשה
 * @param {import("express").Response} res נתוני התגובה
 * @param {import("express").NextFunction} next פונקציה למעבר למידלוואר הבא
 */
export const errorHandler = (err, req, res, next) => {
    const { status = 500, type = 'server error', message = 'General Server Error' } = err;

    const error4Client = {
        type: type,                                                
       message: message,                                          
       stack: process.env.NODE_ENV === 'development' ? err.stack : '...'   };

    res.status(status).json({ error: error4Client });
};