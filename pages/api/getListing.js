import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async (req, res) => {

    // Run cors
    await cors(req, res)
    
    const contractAddress = `${process.env.CONTRACT_ADDRESS}`;
    const {type} = req.body;
    const URL = `https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/CELO/${contractAddress}/${type}`;
    const response = await fetch(
        URL,
        {
            method: 'GET',
            headers: {
              'x-api-key': `${process.env.TATUM_API_KEY}`
            }
          }
    )
    .then(response => response.json())
    .then(data => res.status(200).json({ data: data}))
}