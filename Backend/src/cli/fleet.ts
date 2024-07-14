#!/usr/bin/env node
import { program } from 'commander';
import { createFleetHandler } from '../app/fleet/commands/createFleet/createFleetHandler';
import { CreateFleetCommand } from '../app/fleet/commands/createFleet/createFleetCommand';
import { RegisterVehicleCommand } from '../app/vehicle/commands/registerVehicle/registerVehicleCommand';
import { registerVehicleHandler } from '../app/vehicle/commands/registerVehicle/registerVehicleHandler';
import { ParkVehicleCommand } from '../app/vehicle/commands/parkVehicle/parkVehicleCommand';
import { parkVehicleHandler, ParkVehicleHandler } from '../app/vehicle/commands/parkVehicle/parkVehicleHandler';


async function main(): Promise<void> {

    program
        .command('create <userId>')
        .description('Create a new fleet')
        .action(async (userId) => {
            if (!userId) {
                console.error('User ID is required');
                return;
            }

            userId = Number(userId);

            if (Number.isNaN(userId)) {
                console.error('User ID must be a number');
                return;
            }

            const createFleetCommand: CreateFleetCommand = new CreateFleetCommand(
                userId
            )

            const result =
                await createFleetHandler.handle(createFleetCommand)

            if (!result.success) {
                console.error(result.error)
                return
            }

            console.log(
                `The fleet has been created, it has the following ID : ${result.data.getId()}`
            )

        });


    program
        .command('register-vehicle <fleetId> <vehiclePlateNumber>')
        .description('Register a vehicle to a fleet')
        .action(async (fleetId, vehiclePlateNumber) => {
            if (!fleetId) {
                console.error('Fleet ID is required');
                return;
            }

            if (!vehiclePlateNumber) {
                console.error('Vehicle plate number is required');
                return;
            }

            fleetId = Number(fleetId);

            if (Number.isNaN(fleetId)) {
                console.error('Fleet ID must be a number');
                return;
            }

            const registerVehicleCommand = new RegisterVehicleCommand(fleetId, vehiclePlateNumber)

            const result = await registerVehicleHandler.handle(
                registerVehicleCommand
            )

            if (!result.success) {
                console.error(result.error)
                return
            }

            console.log(
                `The vehicle with the plate number ${vehiclePlateNumber} has been registered in the fleet with the ID ${fleetId} !`
            )

        });


    program
        .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
        .description('Localize a vehicle')
        .action(async (fleetId, vehiclePlateNumber, lat, lng, alt) => {
            if (!fleetId) {
                console.error('Fleet ID is required');
                return;
            }

            if (!vehiclePlateNumber) {
                console.error('Vehicle plate number is required');
                return;
            }

            if (!lat) {
                console.error('Latitude is required');
                return;
            }

            if (!lng) {
                console.error('Longitude is required');
                return;
            }

            fleetId = Number(fleetId);
            lat = Number(lat);
            lng = Number(lng);

            if (Number.isNaN(fleetId)) {
                console.error('Fleet ID must be a number');
                return;
            }

            if (Number.isNaN(lat)) {
                console.error('Latitude must be a number');
                return;
            }

            if (Number.isNaN(lng)) {
                console.error('Longitude must be a number');
                return;
            }


            const parkVehicleIntoLocationCommand = new ParkVehicleCommand(
                fleetId,
                vehiclePlateNumber,
                lat,
                lng
            )

            const result = await parkVehicleHandler.handle(
                parkVehicleIntoLocationCommand
            )

            if (!result.success) {
                console.error(result.error)
                return
            }

            if (alt) {
                console.log(
                    `The vehicle with the plate number ${vehiclePlateNumber} has been parked at the following location: [ lat: ${lat} ; lng: ${lng} ; alt: ${alt} ] !`
                )
                return
            }

            console.log(
                `The vehicle with the plate number ${vehiclePlateNumber} has been parked at the following location: [ lat: ${lat} ; lng: ${lng} ] !`
            )
        });

    program.parse(process.argv);
}

main().catch((error) => {
    console.error('An error occurred:', error);
    process.exit(1);
})
