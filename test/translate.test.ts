import {translateText} from "../src/translate";

test("translateText 저장", async () => {
    const test = await translateText("테스트")
    console.log(test)
})