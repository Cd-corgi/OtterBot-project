/**
 * My functions Handler, every main engine ends here, when i mention a fucntions i should use:
 * 
 * const { <function-name> } = require('<function-dir>');
 * 
 * They should be very few!
 */


 module.exports = {
    randomRange (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = {
    format(millis) {
        try {
            var s = Math.floor((millis / 1000) % 60);
            var m = Math.floor((millis / (1000 * 60)) % 60);
            var h = Math.floor((millis / (1000 * 60 * 60)) % 24);
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            s = s < 10 ? "0" + s : s;
            return h + ":" + m + ":" + s;
        } catch (e) {
            console.log(String(e.stack))
        }
    }
}