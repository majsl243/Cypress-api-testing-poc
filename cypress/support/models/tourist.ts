import { Factory } from "request-payload-factory";

export class Tourist {
    @Factory((faker) => faker.name.fullName())
    tourist_name: string;

    @Factory((faker) => faker.internet.email())
    tourist_email: string;

    @Factory((faker) => faker.address.streetAddress(true))
    tourist_location: string;
}