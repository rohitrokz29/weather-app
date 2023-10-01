
const getData = async ({ location }) => {
    try {

        let { latitude, longitude, resolvedAddress, currentConditions } = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=current&key=${process.env.API_KEY}&contentType=json`)
            .then(res => res.json());
        return { latitude, longitude, resolvedAddress, currentConditions };
    } catch (error) {
        return { message: error.message }
    }
}
module.exports = {
    getData
}
