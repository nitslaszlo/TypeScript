export default class Fakt {
    private _num: number;
    public get res(): number {
        let f = 1;
        for (let i = 2; i <= this._num; i++) {
            f = f * i;
        }
        return f;
    }

    public get textFull(): string {
        let ki = `${this._num}! = 1`;
        for (let i = 2; i <= this._num; i++) {
            ki += `*${i}`;
        }
        return ki;
    }

    public get textShort(): string {
        return `${this._num}!`;
    }

    public constructor(num: number) {
        this._num = num;
    }
}
