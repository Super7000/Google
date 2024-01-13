class Settings {
    constructor() {
        this.settings = {};
    }

    addSetting(name = "", value = "") {
        this.editSetting(name, value);
    }

    editSetting(name = "", value = "") {
        let key = name;
        this.retrieveSettings();
        this.settings[key] = value;
        this.storeSettings();
    }

    storeSettings() {
        try {
            let stringDataOfSettings = JSON.stringify(this.settings);
            localStorage.setItem("settings", `${stringDataOfSettings}`)
        } catch (err) {
            console.log("An error occured when storing settings");
        }
    }

    retrieveSettings() {
        try {
            this.settings = JSON.parse(localStorage.getItem("settings"));
        } catch (err) {
            console.log("An error occured when retrieveing settings");
        }
        if (this.settings == null || this.settings == "") {
            this.settings = {};
        }
        return this.settings;
    }

    has(name) {
        this.retrieveSettings();
        if (this.settings[name] == null || this.settings[name] == "") {
            return false;
        }
        return true;
    }

    get(name) {
        return this.retrieveSettings[name];
    }

    deleteSettings() {
        localStorage.removeItem("settings");
        this.retrieveSettings();
    }

    deleteSetting(name) {
        this.retrieveSettings();
        delete this.settings[name];
        this.storeSettings();
    }
}