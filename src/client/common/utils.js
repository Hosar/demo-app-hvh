
class Utils {
    static strConvert(str) {
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&apos;/g, '\'');
        str = str.replace(/&#039;/g, '\'');
        return str;
    }
}

export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation)
            reject(new Error('Browser do not support geolocation'));

        navigator.geolocation.getCurrentPosition(position => {
            resolve(position.coords);
        }, e => {
            console.error(e);
            reject(e);
        });
    });
};

export default Utils;