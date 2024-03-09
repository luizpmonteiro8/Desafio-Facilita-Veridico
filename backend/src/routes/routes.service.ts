import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Pool, PoolConfig } from 'pg';
import { RoutesDto } from './dto/routes.dto';

@Injectable()
export class RoutesService {
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    const databaseConfig: PoolConfig = {
      user: this.configService.get<string>('database.user'),
      host: this.configService.get<string>('database.host'),
      database: this.configService.get<string>('database.database'),
      password: this.configService.get<string>('database.password'),
      port: this.configService.get<number>('database.port'),
    };

    const sslEnabled = process.env.DB_SSLENABLED;

    if (sslEnabled == 'true') {
      databaseConfig.ssl = { rejectUnauthorized: false };
    }

    this.pool = new Pool(databaseConfig);
  }
  async calculateRoutes(routesDto: RoutesDto) {
    try {
      const tableName = 'customers';

      //select all custumer
      const query = `SELECT * FROM ${tableName}`;
      const result = await this.pool.query(query);

      const destinationsCustomer = result.rows;
      const destinationsCustomerLatLong = [];

      //lat e long origin
      const { origin } = routesDto;
      const originAddress =
        origin.street + ',' + origin.number + ',' + origin.city;

      const resultOrigin = await this.getLatLong(originAddress);
      console.log('lat origin: ', resultOrigin.lat);
      console.log('long origin: ', resultOrigin.long);

      for (const destination of destinationsCustomer) {
        const destinationAddress =
          destination.street +
          ',' +
          destination.number +
          ',' +
          destination.city +
          ',' +
          destination.state;

        console.log('name: ', destination.name);

        const resultDestination = await this.getLatLong(destinationAddress);

        const distance = await this.calculateHaversineDistance(
          resultOrigin.lat,
          resultOrigin.long,
          resultDestination.lat,
          resultDestination.long,
        );

        console.log(
          'lat:',
          resultDestination.lat,
          ':',
          'long:',
          resultDestination.long,
          ':',
          distance,
        );

        destinationsCustomerLatLong.push({
          costumerId: destination.id,
          customerName: destination.name,
          customerStreet: destination.street,
          customerNumber: destination.number,
          customerComplement: destination.complement,
          customerDistrict: destination.district,
          customerCity: destination.city,
          customerState: destination.state,
          ...resultDestination,
          distance,
        });
      }

      destinationsCustomerLatLong.sort((a, b) => a.distance - b.distance);

      return {
        resultOrigin: resultOrigin,
        destinationsCustomerLatLong: destinationsCustomerLatLong,
      };
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error);
    }
  }

  getLatLong = async (destinationAddress: string) => {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${destinationAddress}`;
    const response = await axios.get(nominatimUrl, { timeout: 60000 });

    const lat = response.data[0].lat;
    const long = response.data[0].lon;

    return { lat, long };
  };

  calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers

    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}
