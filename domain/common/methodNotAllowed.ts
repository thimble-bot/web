import { NextApiRequest, NextApiResponse } from 'next';

const methodNotAllowed = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(405).json({
    ok: false,
    error: 'Method not allowed.'
  });
};

export default methodNotAllowed;
