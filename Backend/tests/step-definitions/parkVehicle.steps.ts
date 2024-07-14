import assert from 'assert'
import { Given, When, Then } from '@cucumber/cucumber'
import { ParkVehicleCommand } from '../../src/app/vehicle/commands/parkVehicle/parkVehicleCommand'
import { parkVehicleHandler } from '../../src/app/vehicle/commands/parkVehicle/parkVehicleHandler'
import { Location } from '../../src/domain/valueObjects/location'
import { getVehicleLocationQueryHandler } from '../../src/app/vehicle/queries/getVehicleLocationQueryHandler'
import { GetVehicleLocationQuery } from '../../src/app/vehicle/queries/getVehicleLocationQuery'

Given('a location', function () {
    this.location = new Location(12, 14)
})

When('I park my vehicle at this location', async function () {
    try {
        const parkVehicleCommand: ParkVehicleCommand = new ParkVehicleCommand(
            this.fleet.getId(),
            this.vehicle.getPlateNumber(),
            this.location.latitude,
            this.location.longitude
        )
        const result = await parkVehicleHandler.handle(parkVehicleCommand)
        if (!result.success) {
            this.error = result.error
        }
    } catch (error) {
        this.error = error
    }
})

Given('my vehicle has been parked into this location', async function () {
    try {
        const parkVehicleCommand: ParkVehicleCommand = new ParkVehicleCommand(
            this.fleet.getId(),
            this.vehicle.getPlateNumber(),
            this.location.latitude,
            this.location.longitude
        )
        const result = await parkVehicleHandler.handle(parkVehicleCommand)
        if (!result.success) {
            this.error = result.error
        }
    } catch (error) {
        this.error = error
    }
})

When('I try to park my vehicle at this location', async function () {
    try {
        const parkVehicleCommand: ParkVehicleCommand = new ParkVehicleCommand(
            this.fleet.getId(),
            this.vehicle.getPlateNumber(),
            this.location.latitude,
            this.location.longitude
        )
        const result = await parkVehicleHandler.handle(parkVehicleCommand)
        if (!result.success) {
            this.error = result.error
        }
    } catch (error) {
        this.error = error
    }
})

Then(
    'the known location of my vehicle should verify this location',
    async function () {
        const result = await getVehicleLocationQueryHandler.handle(
            new GetVehicleLocationQuery(this.vehicleNumber)
        )
        if (!result.success) {
            this.error = result.error
        }
        const location: Location = result.data

        assert.strictEqual(location.equals(this.location), true)
    }
)

Then(
    'I should be informed that my vehicle is already parked at this location',
    function () {
        assert.strictEqual(
            this.error,
            'The vehicle is already parked in the indicated location'
        )
    }
)
