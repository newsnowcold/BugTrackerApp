import { Injectable } from '@angular/core';
declare var $:any;
declare var moment:any;

@Injectable()
export class HandyDandyTools {
      // helper methods
    public utcToLocalTime(timeString) {
        if (!timeString) return;

        var utcDate = new Date(timeString.replace('T', ' ')),
            offset = new Date().getTimezoneOffset(),
            timeZoneDiff = offset + utcDate.getTimezoneOffset();
    
        var localTime = new Date(utcDate.getTime() + (timeZoneDiff * 60 * 1000));

        return moment(localTime).format('MM/DD/YYYY h:mm a');
    }
}