import {Component} from "react";

class NextRepeatDateConverter extends Component{

    static getStringOfNextRepeatDate(date) {
        let repeatThough = new Date(date) - new Date();
        if(repeatThough < 0) {
            repeatThough = "now"
        } else if (repeatThough < 48 * 1000 * 60 * 60) {
            repeatThough = Math.ceil(repeatThough / 1000 / 60 / 60) + "h";
        } else {
            repeatThough = Math.ceil(repeatThough / 1000 / 60 / 60 / 24) + "d";
        }
        return repeatThough;
    }

    static getNextRepeatDateOfString(string) {
        let date = new Date();
        if(string.match(/^\d{1,3}[dh]/)) {
            let interval = parseInt(string.toString());
            let timeUnit = string.toString().replace(/\d/gm, "");
            alert(string);
            if (timeUnit === "d") {
                date.setDate(date.getDate() + interval);
            } else {
                date.setHours(date.getHours() + interval);
            }
            alert(date);
        }
        return date;
    }

}
export default NextRepeatDateConverter