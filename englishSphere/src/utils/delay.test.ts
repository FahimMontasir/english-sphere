import { describe, it, expect } from "@jest/globals"
import { delay } from "./delay"

describe("delay function", () => {
  it("should wait for the specified duration", async () => {
    // Arrange
    const delayDuration = 1000 // 1 second

    // Act
    const startTime = Date.now()
    await delay(delayDuration)
    const endTime = Date.now()

    // Assert
    const elapsedTime = endTime - startTime
    expect(elapsedTime).toBeGreaterThanOrEqual(delayDuration)
  })
})
