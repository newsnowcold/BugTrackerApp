import { Injectable } from '@angular/core';
declare var $:any;
declare var moment:any;

@Injectable()
export class HandyDandyTools {
      // helper methods
    public utcToLocalTime(timeString: string, format?: string) {
        var defaultFormat = 'MM/DD/YYYY h:mm a';
        if (!timeString) return;

        var utcDate = new Date(timeString.replace('T', ' ') + ' UTC');

        var localTime = new Date(utcDate.toString());
        
        if (format) {
            defaultFormat = format;
        }

        return moment(localTime).format(defaultFormat);
    }

    public copyObj (obj: any) {
        return <any> JSON.parse(JSON.stringify(obj));
    }
}