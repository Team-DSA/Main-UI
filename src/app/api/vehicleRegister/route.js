import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/UserModel";
import Vehicle from "@/model/VehicleModel";
import { NextResponse } from "next/server";
import { userVehiclesInSession } from "@/app/dashboard/page";

export async function POST(request) {
    try {
        await dbConnect();
        console.log('Processing vehicle registration');

        const { userId, make, model, year, vin } = await request.json();

        if (!userId || !make || !model || !year || !vin) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const vehicle = new Vehicle({ user: userId, make, model, year, vin });
        await vehicle.save();

        // Fetch the user from the database
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Update user's vehicle list
        user.vehicles.push(vehicle._id);

        userVehiclesInSession.push(vehicle._id)
        console.log('userVehicleInSession',userVehiclesInSession)
        await user.save();

        return NextResponse.json(vehicle, { status: 201 });
    } catch (err) {
        console.error('Error during vehicle registration:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await dbConnect();

        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const user = await User.findById(userId).populate('vehicles');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ vehicles: user.vehicles });
    } catch (err) {
        console.error('Error fetching user vehicles:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}