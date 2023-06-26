import User from '../models/User.js'
import Jwt  from 'jsonwebtoken';

export const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) return res.status(401).json({error: 'Authorization token required'});

    const token = authorization.split(' ')[1];

    try {
      const {_id} = Jwt.verify(token, `${process.env.JWT_SECRET}`);
      req.user = await User.findOne({_id}).select('id');
      next();
    } catch (err) {
        res.status(401).json({error: 'Not Authorized '});
        next(err);
    }
}