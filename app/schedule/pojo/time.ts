export class Time {
    private _hour: number = 0;
    private _minute: number = 0;

    constructor(hour: number, minute: number) {
        this._hour = hour;
        this._minute = minute;
    }

    compare(time: Time){
        if( this.hour < time.hour ) return -1
        if( this.hour > time.hour ) return 1
        if( this.minute < time.minute) return -1
        if( this.minute > time.minute) return 1
        return 0
    }

    static now(){
        const date = new Date();
        return new Time(date.getHours(), date.getMinutes());
    }

    addMinutes(minutes: number){
        this.minute += minutes;
        const deltaHours = Math.floor(this.minute / 60);
        this.minute -= deltaHours * 60;
        this.hour += deltaHours;
    }

    get hour(): number {
        return this._hour;
    }

    set hour(value: number) {
        this._hour = value;
    }

    get minute(): number {
        return this._minute;
    }

    set minute(value: number) {
        this._minute = value;
    }
}