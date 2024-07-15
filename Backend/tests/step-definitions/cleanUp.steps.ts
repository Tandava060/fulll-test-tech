import { After } from '@cucumber/cucumber'
import { vehicleRepository } from '../../src/infra/repositories/vehicleRepository'
import { fleetRepository } from '../../src/infra/repositories/fleetRepository'
import { TESTUSERID, TESTUSERID2, TESTVEHICLEPLATE } from '../constants'

After(async () => {
    await cleanUpDatabase()
})

async function cleanUpDatabase() {
    await vehicleRepository.deleteByPlateNumber(TESTVEHICLEPLATE)
    await fleetRepository.deleteByOwnerId(TESTUSERID)
    await fleetRepository.deleteByOwnerId(TESTUSERID2)
}