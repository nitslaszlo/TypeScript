import Fakt from "./fakt";

describe("FaktTeszt", () => {
    let instance: Fakt;

    beforeEach(() => {
        instance = new Fakt(1);
    });

    it("InstanceOf()", async () => {
        expect(instance).toBeInstanceOf(Fakt);
    });

    it("1! = 1", async () => {
        expect(instance.res).toBe(1);
    });

    it("3! = 6", async () => {
        expect(new Fakt(3).res).toBe(6);
    });

    it("5! = 120", async () => {
        expect(new Fakt(5).res).toBe(120);
    });

    it("21! = 51090942171709440000", async () => {
        expect(new Fakt(21).res).toBe(51090942171709440000);
    });

    it("21! textFull -> 21! = 1*2*3*4*5*6*7*8*9*10*11*12*13*14*15*16*17*18*19*20*21", async () => {
        expect(new Fakt(21).textFull).toBe("21! = 1*2*3*4*5*6*7*8*9*10*11*12*13*14*15*16*17*18*19*20*21");
    });
});
