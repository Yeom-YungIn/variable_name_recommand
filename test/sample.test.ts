import {sayHello} from "../index";

test("npm deploy test Say Hello", () => {
    const a = sayHello("1",1)
    expect(a).toBe("test")
})