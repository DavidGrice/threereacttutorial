import pointData from '../data/Final_data.json';

export const fetchPointDataLocal = () => {
    try {
        const response = pointData;
        return response;
    } catch ( error ) {
        console.log("unable to load local data");
    }
}