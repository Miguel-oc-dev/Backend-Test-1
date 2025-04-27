import axios from 'axios';

export const getPlaceDetails = async (placeId: string) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
        console.log('Respuesta de Google: ', response.data);
        throw new Error('Error al obtener información...');
    }

    const location = response.data.result.geometry.location;
    const address = response.data.result.formatted_address;

    return {
        address,
        latitude: location.lat,
        longitude: location.lng
    };
};