export const ctrlWrapper = (conroller) => {
    return async (req, res, next) => {
        try {
            await conroller (req, res, next);
        } catch(err) {
            next(err);
        }
    };
};
