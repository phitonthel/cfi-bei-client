import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../env';

export const unnominatePeers = async ({ reviewerId }) => {
    const response = await axios({
        method: 'DELETE',
        url: `${config.baseUrl}/ts-nomination/unnominate`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: { reviewerId } // Sending the data in request body
    });
    return response;
};
