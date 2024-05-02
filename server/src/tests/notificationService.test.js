const { it } = require("node:test");
const notificationSerivce = require("../application/services/cardService");

test("notifyUser", () => {
    it("should notify a user at the time", () => {
        const userId = 1;
        const time = "12:00";
        notificationSerivce.notifyUser = jest.fn().mockReturnValue(true);
        const notification = notificationSerivce.notifyUser(userId, time);
        expect(notification).toBe(true);
    });

    it("should not notify", () => {
        const userId = 1;
        const time = "10:00";
        notificationSerivce.notifyUser = jest.fn().mockReturnValue(false);
        const notification = notificationSerivce.notifyUser(userId, time);
        expect(notification).toBe(false);
    });
});

