import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'
import { RegisterVehicleCommand } from '../../src/app/vehicle/commands/registerVehicle/registerVehicleCommand'
import { registerVehicleHandler } from '../../src/app/vehicle/commands/registerVehicle/registerVehicleHandler'
import { CreateFleetCommand } from '../../src/app/fleet/commands/createFleet/createFleetCommand'
import { createFleetHandler } from '../../src/app/fleet/commands/createFleet/createFleetHandler'
import { isVehicleInFleetQueryHandler } from '../../src/app/fleet/queries/IsVehicleInFleetQueryHandler'
import { IsVehicleInFleetQuery } from '../../src/app/fleet/queries/IsVehicleInFleetQuery'
import { TESTUSERID2, TESTVEHICLEPLATE } from '../constants'



Given('the fleet of another user', async function () {
    try {
        const createFleetCommand: CreateFleetCommand = new CreateFleetCommand(
            TESTUSERID2
        )

        const result = await createFleetHandler.handle(createFleetCommand)

        if (!result.success) {
            this.error = result.error
        } else {
            this.fleetId2 = result.data?.getId()
        }
    } catch (error) {
        this.error = error
    }
})

Given(
    "this vehicle has been registered into the other user's fleet",
    async function () {
        try {
            const registerVehicleCommand: RegisterVehicleCommand =
                new RegisterVehicleCommand(this.fleetId2, TESTVEHICLEPLATE)
            const result = await registerVehicleHandler.handle(
                registerVehicleCommand
            )
            if (!result.success) {
                this.error = result.error
            } else {
                this.vehicle = result.data
            }
        } catch (error) {
            this.error = error
        }
    }
)

When('I register this vehicle into my fleet', async function () {
    try {
        const registerVehicleCommand: RegisterVehicleCommand =
            new RegisterVehicleCommand(this.fleetId, TESTVEHICLEPLATE)
        const result = await registerVehicleHandler.handle(
            registerVehicleCommand
        )
        if (!result.success) {
            this.error = result.error
        } else {
            this.vehicle = result.data
        }
    } catch (error) {
        this.error = error
    }
})

When('I try to register this vehicle into my fleet', async function () {
    try {
        const registerVehicleCommand: RegisterVehicleCommand =
            new RegisterVehicleCommand(this.fleetId, TESTVEHICLEPLATE)
        const result = await registerVehicleHandler.handle(
            registerVehicleCommand
        )
        if (!result.success) {
            this.error = result.error
        }
    } catch (error) {
        this.error = error
    }
})

Then('this vehicle should be part of my vehicle fleet', async function () {
    const result = await isVehicleInFleetQueryHandler.handle(
        new IsVehicleInFleetQuery(
            this.fleet.getId(),
            this.vehicle.getPlateNumber()
        )
    )
    if (!result.success) {
        this.error = result.error
    }

    const isVehicleInFleet: boolean = result.data ? result.data : false

    assert.strictEqual(isVehicleInFleet, true)
})

Then(
    'I should be informed this this vehicle has already been registered into my fleet',
    function () {
        assert.strictEqual(this.error, 'The vehicle is already in the fleet')
    }
)
