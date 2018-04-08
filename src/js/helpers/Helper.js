export default class Helper {

    // Generate new GUID
    guidGenerator() {
        function S4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4();
    }

    // Save item to localstorage
    setStorage(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    // Get item from localstorage
    getStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}