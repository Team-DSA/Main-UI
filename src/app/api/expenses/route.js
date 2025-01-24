"use server"
import { dbConnect } from "@/lib/mongo";
import Expense from "@/model/ExpenseModel.js";
import Vehicle from "@/model/VehicleModel.js"; // Assuming you have a Vehicle model
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect();
    try {
        const { userId, vehicleId, amount, date, description } = await request.json();
        console.log("Received data:", { userId, vehicleId, amount, date, description });

        const expense = new Expense({ user: userId, vehicle: vehicleId, amount, date, description });
        console.log("Created expense object:", expense);

        await expense.save();
        console.log("Expense saved successfully");

        // Update the vehicle with the new expense
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            { $push: { expenses: expense._id } },
            { new: true }
        ).populate('expenses');
        console.log("Updated vehicle:", updatedVehicle);

        return NextResponse.json({ expense, updatedVehicle }, { status: 201 });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const expenses = await Expense.find({ user: userId }).populate("vehicle");
        return NextResponse.json(expenses);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}