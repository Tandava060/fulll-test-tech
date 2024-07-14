import { Given } from '@cucumber/cucumber'
import { CreateFleetCommand } from '../../src/app/fleet/commands/createFleet/createFleetCommand'
import { createFleetHandler } from '../../src/app/fleet/commands/createFleet/createFleetHandler'
import { RegisterVehicleCommand } from '../../src/app/vehicle/commands/registerVehicle/registerVehicleCommand'
import { registerVehicleHandler } from '../../src/app/vehicle/commands/registerVehicle/registerVehicleHandler'

const USERID: number = 20
const VEHICLEPLATE = 'ABC123'

Given('my fleet', async function () {
    try {
        const createFleetCommand: CreateFleetCommand = new CreateFleetCommand(
            USERID
        )

        const fleetResult = await createFleetHandler.handle(createFleetCommand)
        if (!fleetResult.success) {
            this.error = fleetResult.error
        } else {
            this.fleet = fleetResult.data
            this.fleetId = fleetResult.data?.getId()
        }
    } catch (error) {
        this.error = error
    }
})

Given('a vehicle', async function () {
    this.vehicleNumber = VEHICLEPLATE
})

Given('I have registered this vehicle into my fleet', async function () {
    try {
        const registerVehicleCommand: RegisterVehicleCommand =
            new RegisterVehicleCommand(this.fleetId, this.vehicleNumber)
        const vehicleResult = await registerVehicleHandler.handle(
            registerVehicleCommand
        )

        if (!vehicleResult.success) {
            this.error = vehicleResult.error
        } else {
            this.vehicle = vehicleResult.data
        }
    } catch (error) {
        this.error = error
    }
})
