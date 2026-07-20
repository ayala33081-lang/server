export const currentDate = (req,res,next) => {
    req.currentDate=new Date();
    next();
};

export const printDate = (req, res, next) => {
    if(req.method==='GET') console.log(`GET request at: ${req.currentDate}`);
    next();
};