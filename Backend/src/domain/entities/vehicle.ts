import { Result } from '../utility/result'
import { Location } from '../valueObjects/location'

export class Vehicle {
    private static counter: number = 0
    private id: number
    private plateNumber: string
    private location?: Location

    constructor(plateNumber: string) {
        Vehicle.counter++
        this.id = Vehicle.counter
        this.plateNumber = plateNumber
    }

    setLocation(location: Location): Result {
        if (this.location && this.location.equals(location)) {
            return Result.failure(
                'The vehicle is already parked in the indicated location'
            )
        }

        this.location = location
        return Result.success()
    }

    getLocation(): Location | null {
        return this.location
    }

    getPlateNumber(): string {
        return this.plateNumber
    }
}
